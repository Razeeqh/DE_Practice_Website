/* ============================================================
   APP.JS — Main application logic
   ============================================================
   Screens: landing → select → exam → results
   State is held in `state` object.
   SQL runs via alasql (in-browser).
   Python runs via Skulpt (in-browser).
   PySpark is simulated via Skulpt + mock pyspark shim.
   ============================================================ */

/* ==================== STATE ==================== */
const state = {
  examSet: null,          // { python: [...10], pyspark: [...10], sql: [...10] }
  currentSubject: null,   // "python" | "pyspark" | "sql"
  currentIndex: 0,
  answers: {              // answers[subject][questionId] = { code, output, passed }
    python: {}, pyspark: {}, sql: {}
  },
  subjectDone: { python: false, pyspark: false, sql: false },
  hintsUsed: {            // hintsUsed[subject][questionId] = number of hints revealed
    python: {}, pyspark: {}, sql: {}
  },
  mode: null,             // "moderate" | "expert" | "invincible"
  timerMins: 0,           // 90 | 60 | 30
  timerRemaining: 0,      // seconds left
  timerStarted: false,
  timerInterval: null
};

/* ==================== SQL SCHEMA DEFINITIONS ==================== */
const SQL_SCHEMA_DEFS = [
  {
    name: "employees",
    cols: ["id INT","name STRING","department STRING","salary INT","dept_id INT"],
    rows: [[1,"Alice","Engineering",60000,1],[2,"Bob","Marketing",45000,2],[3,"Charlie","Engineering",90000,1],[4,"Diana","HR",55000,3]]
  },
  {
    name: "departments",
    cols: ["dept_id INT","dept_name STRING","location STRING"],
    rows: [[1,"Engineering","New York"],[2,"Marketing","London"],[3,"HR","Sydney"]]
  },
  {
    name: "orders",
    cols: ["order_id INT","emp_id INT","product_id INT","amount DECIMAL","order_date DATE","status STRING"],
    rows: [[101,1,10,2500.00,"2024-01-15","Completed"],[102,2,11,45.00,"2024-01-20","Completed"],[103,1,12,850.00,"2024-02-05","Pending"],[104,3,10,2500.00,"2024-02-10","Completed"],[105,4,13,25.00,"2024-02-15","Cancelled"],[106,2,11,45.00,"2024-03-01","Completed"]]
  },
  {
    name: "products",
    cols: ["product_id INT","product_name STRING","category STRING","unit_price DECIMAL"],
    rows: [[10,"Laptop Pro","Electronics",2500.00],[11,"Wireless Mouse","Electronics",45.00],[12,"Standing Desk","Furniture",850.00],[13,"Notebook Set","Stationery",25.00]]
  }
];

/* ==================== SCHEMA RENDERER ==================== */
function escHtmlAttr(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function renderSchemaHTML(schemas) {
  if (!schemas || !schemas.length) return "";
  let out = `<div class="schema-wrapper"><div class="schema-title">📊 Schema &amp; Sample Data</div><div class="schema-tables-list">`;
  for (const t of schemas) {
    const hdrs = t.cols.map(c => {
      const sp = c.indexOf(" ");
      const nm = sp>0 ? c.slice(0,sp) : c;
      const tp = sp>0 ? c.slice(sp+1) : "";
      return `<th><span class="sc-name">${escHtmlAttr(nm)}</span><span class="sc-type">${escHtmlAttr(tp)}</span></th>`;
    }).join("");
    const rows = (t.rows||[]).map(row=>
      "<tr>"+row.map(cell=>`<td>${cell===null?"<em>NULL</em>":escHtmlAttr(cell)}</td>`).join("")+"</tr>"
    ).join("");
    out += `<div class="schema-tbl"><div class="schema-tbl-name">${escHtmlAttr(t.name)}</div><div class="schema-tbl-scroll"><table class="schema-grid"><thead><tr>${hdrs}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }
  return out + "</div></div>";
}

/* ==================== TIMER ==================== */
function formatTime(s) {
  const m = Math.floor(s/60), sc = s%60;
  return String(m).padStart(2,"0")+":"+String(sc).padStart(2,"0");
}

function updateTimerDisplay() {
  const timeStr = formatTime(Math.max(0, state.timerRemaining));
  const timerEl = document.getElementById("timer-display");
  const examTimer= document.getElementById("exam-timer");
  const badge    = document.getElementById("select-timer-badge");
  if (timerEl) timerEl.textContent = timeStr;
  if (badge)   badge.textContent = "⏱ "+timeStr;
  [examTimer, badge].forEach(el => {
    if (!el) return;
    el.classList.remove("timer-warn","timer-danger");
    if (state.timerRemaining <= 300) el.classList.add("timer-danger");
    else if (state.timerRemaining <= 600) el.classList.add("timer-warn");
  });
}

function startTimer() {
  if (state.timerStarted || !state.timerMins) return;
  state.timerStarted = true;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timerRemaining = Math.max(0, state.timerRemaining - 1);
    updateTimerDisplay();
    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval); state.timerInterval = null;
      state.subjectDone = { python:true, pyspark:true, sql:true };
      setTimeout(showResults, 400);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
}

/* ==================== CodeMirror ==================== */
let editor = null;

function initEditor(mode) {
  const cmMode = mode === "sql" ? "text/x-sql" : "text/x-python";
  if (editor) {
    editor.toTextArea();
    editor = null;
  }
  editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: cmMode,
    theme: "dracula",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: {
      Tab: cm => cm.replaceSelection("    ")
    }
  });
  // Set editor height flex
  const wrapper = document.getElementById("editor-wrapper");
  editor.setSize("100%", wrapper.offsetHeight || 340);
}

/* ==================== SCREEN SWITCHING ==================== */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ==================== SQL SETUP ==================== */
function setupSQLTables() {
  try {
    alasql("DROP TABLE IF EXISTS employees");
    alasql("DROP TABLE IF EXISTS departments");
    alasql("DROP TABLE IF EXISTS orders");
    alasql("DROP TABLE IF EXISTS products");

    // employees
    alasql(`CREATE TABLE employees (id INT, name STRING, department STRING, salary INT, dept_id INT)`);
    alasql(`INSERT INTO employees VALUES
      (1,'Alice','Engineering',60000,1),
      (2,'Bob','Marketing',45000,2),
      (3,'Charlie','Engineering',90000,1),
      (4,'Diana','HR',55000,3)`);

    // departments
    alasql("CREATE TABLE departments (dept_id INT, dept_name STRING, location STRING)");
    alasql(`INSERT INTO departments VALUES
      (1,'Engineering','New York'),
      (2,'Marketing','London'),
      (3,'HR','Sydney')`);

    // products
    alasql("CREATE TABLE products (product_id INT, product_name STRING, category STRING, unit_price DECIMAL)");
    alasql(`INSERT INTO products VALUES
      (10,'Laptop Pro','Electronics',2500.00),
      (11,'Wireless Mouse','Electronics',45.00),
      (12,'Standing Desk','Furniture',850.00),
      (13,'Notebook Set','Stationery',25.00)`);

    // orders
    alasql("CREATE TABLE orders (order_id INT, emp_id INT, product_id INT, amount DECIMAL, order_date STRING, status STRING)");
    alasql(`INSERT INTO orders VALUES
      (101,1,10,2500.00,'2024-01-15','Completed'),
      (102,2,11,45.00,'2024-01-20','Completed'),
      (103,1,12,850.00,'2024-02-05','Pending'),
      (104,3,10,2500.00,'2024-02-10','Completed'),
      (105,4,13,25.00,'2024-02-15','Cancelled'),
      (106,2,11,45.00,'2024-03-01','Completed')`);
  } catch(e) { /* already exists */ }
}

/* ==================== RUN CODE ==================== */
async function runCode() {
  const subject = state.currentSubject;
  const code = editor.getValue();
  const outputEl = document.getElementById("code-output");
  const statusEl = document.getElementById("output-status");
  const submitBtn = document.getElementById("btn-submit-answer");
  const nextBtn = document.getElementById("btn-next-question");

  outputEl.className = "code-output";
  outputEl.textContent = "Running…";
  statusEl.textContent = "";
  statusEl.className = "output-status info";

  let result = { output: "", error: null };

  try {
    if (subject === "sql") {
      result = await runSQL(code);
    } else if (subject === "python") {
      result = await runPython(code);
    } else if (subject === "pyspark") {
      result = await runPySpark(code);
    }
  } catch (err) {
    result = { output: "", error: String(err) };
  }

  const displayOutput = result.error ? result.error : result.output;
  outputEl.textContent = displayOutput || "(no output)";
  outputEl.className = result.error ? "code-output error-out" : "code-output";

  if (!result.error) {
    // Validate
    const q = getCurrentQuestion();
    const validation = typeof q.validator === "function"
      ? q.validator(result.output)
      : matchExact(result.output, q.expectedOutput);

    if (validation.pass) {
      statusEl.textContent = "✓ PASS";
      statusEl.className = "output-status pass";
      outputEl.classList.add("pass-out");
    } else {
      statusEl.textContent = "✗ FAIL";
      statusEl.className = "output-status fail";
    }

    // Store answer
    const qid = q.id;
    state.answers[subject][qid] = {
      code, output: result.output, passed: validation.pass, message: validation.message
    };
    submitBtn.disabled = false;
    nextBtn.disabled = false;

    // Refresh hint UI (may show 🏆 badge after passing without hints)
    if (q.difficulty === "hard") loadHintUI(q);
  } else {
    statusEl.textContent = "✗ ERROR";
    statusEl.className = "output-status fail";
    submitBtn.disabled = true;
  }
}

/* ---- SQL runner ---- */
function runSQL(code) {
  return new Promise((resolve) => {
    setupSQLTables();
    try {
      const statements = code.split(";").map(s => s.trim()).filter(s => s.length > 0);
      let lastResult = null;
      for (const stmt of statements) {
        if (/^--/.test(stmt)) continue;
        const res = alasql(stmt + ";");
        if (Array.isArray(res)) lastResult = res;
      }
      if (!lastResult) { resolve({ output: "Query executed." }); return; }

      // Format result as plain text table
      if (lastResult.length === 0) { resolve({ output: "(no rows returned)" }); return; }
      const cols = Object.keys(lastResult[0]);
      const rows = lastResult.map(r => cols.map(c => r[c] === null ? "NULL" : String(r[c])).join(" | "));
      const header = cols.join(" | ");
      const sep = cols.map(c => "-".repeat(c.length + 2)).join("-|-");
      const output = [header, sep, ...rows].join("\n");
      resolve({ output });
    } catch (e) {
      resolve({ output: "", error: "SQL Error: " + e.message });
    }
  });
}

/* ---- Python runner via Skulpt ---- */
function runPython(code) {
  return new Promise((resolve) => {
    let output = "";
    Sk.configure({
      output: txt => { output += txt; },
      read: file => {
        if (Sk.builtinFiles?.files?.[file]) return Sk.builtinFiles.files[file];
        throw new Error("File not found: " + file);
      },
      execLimit: 10000
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody("<stdin>", false, code, true)
    ).then(() => {
      resolve({ output: output.trim() });
    }).catch(err => {
      resolve({ output: "", error: err.toString() });
    });
  });
}

/* ---- PySpark runner (Skulpt + mock shim) ---- */
function runPySpark(code) {
  // Inject a PySpark simulation shim before user code
  const shim = getPySparkShim();
  const fullCode = shim + "\n" + code;
  return new Promise((resolve) => {
    let output = "";
    Sk.configure({
      output: txt => { output += txt; },
      read: file => {
        if (Sk.builtinFiles?.files?.[file]) return Sk.builtinFiles.files[file];
        throw new Error("File not found: " + file);
      },
      execLimit: 20000
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody("<stdin>", false, fullCode, true)
    ).then(() => {
      resolve({ output: output.trim() });
    }).catch(err => {
      resolve({ output: "", error: "PySpark Sim Error: " + err.toString() });
    });
  });
}

/* ---- PySpark Python shim ---- */
function getPySparkShim() {
  return `
import sys

class _Row(dict):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        for k,v in kwargs.items():
            setattr(self, k, v)
    def __repr__(self):
        items = ", ".join(f"{k}={repr(v)}" for k,v in self.items())
        return f"Row({items})"

class _Schema:
    def __init__(self, fields=None):
        self.fields = fields or []
    def __repr__(self):
        lines = ["root"]
        for f in self.fields:
            lines.append(f" |-- {f['name']}: {f['type']} (nullable = true)")
        return "\\n".join(lines)

class _Column:
    def __init__(self, name, expr=None):
        self.name = name
        self.expr = expr or name
    def alias(self, new_name):
        c = _Column(new_name, self.expr)
        c._alias = new_name
        return c
    def __lt__(self, other): return _Column(self.name, f"{self.name}<{other}")
    def __le__(self, other): return _Column(self.name, f"{self.name}<={other}")
    def __gt__(self, other): return _Column(self.name, f"{self.name}>{other}")
    def __ge__(self, other): return _Column(self.name, f"{self.name}>={other}")
    def __eq__(self, other): return _Column(self.name, f"{self.name}=={other}")
    def __mul__(self, other): return _Column(self.name, f"{self.name}*{other}")
    def __repr__(self): return f"Column({self.name})"
    def isNull(self): return _Column(self.name, f"isnull({self.name})")
    def isNotNull(self): return _Column(self.name, f"notnull({self.name})")
    def desc(self): return _Column(self.name + "_desc", self.name + " DESC")
    def cast(self, dtype):
        d = str(dtype).lower().replace('type()','').replace('()','').strip()
        fn = 'int' if d in ('int','integer','integertype') else 'float' if d in ('float','double','floattype','doubletype') else 'str'
        return _Column(self.name, f"{fn}({self.expr})")
    def over(self, ws):
        import re as _re
        c = _Column(self.name, self.expr)
        m = _re.match(r"(\\w+)\\((.+)\\)", self.expr or "")
        if m: c._win_fn = m.group(1).lower(); c._win_col = m.group(2)
        else: c._win_fn = self.name; c._win_col = None
        c._win_n = None; c._win_default = None; c._window_spec = ws
        return c

class _WindowSpec:
    def __init__(self):
        self.partition_cols = []
        self.order_cols = []
        self.frame = None
    def partitionBy(self, *cols): self.partition_cols = list(cols); return self
    def orderBy(self, *cols): self.order_cols = list(cols); return self
    def rowsBetween(self, start, end): self.frame = (start, end); return self

class _WindowClass:
    unboundedPreceding = -float("inf")
    unboundedFollowing = float("inf")
    currentRow = 0
    @staticmethod
    def partitionBy(*cols):
        w = _WindowSpec()
        w.partition_cols = list(cols)
        return w
    @staticmethod
    def orderBy(*cols):
        w = _WindowSpec()
        w.order_cols = list(cols)
        return w

class Window:
    unboundedPreceding = -float("inf")
    unboundedFollowing = float("inf")
    currentRow = 0
    @staticmethod
    def partitionBy(*cols):
        w = _WindowSpec()
        w.partition_cols = list(cols)
        return w
    @staticmethod
    def orderBy(*cols):
        w = _WindowSpec()
        return w

def _col_name(c):
    if isinstance(c, str): return c
    if isinstance(c, _Column): return c.name.replace("_desc","")
    return str(c)

def _is_desc(c):
    if isinstance(c, _Column): return "_desc" in c.name or (c.expr and "DESC" in str(c.expr))
    return False

class _DataFrame:
    def __init__(self, data, columns):
        self._data = [dict(zip(columns, row)) if not isinstance(row, dict) else row for row in data]
        self._columns = list(columns)

    def printSchema(self):
        # infer types
        def infer(v):
            if isinstance(v, bool): return "boolean"
            if isinstance(v, int): return "long"
            if isinstance(v, float): return "double"
            return "string"
        lines = ["root"]
        for col in self._columns:
            sample = next((r[col] for r in self._data if r.get(col) is not None), None)
            t = infer(sample) if sample is not None else "string"
            lines.append(f" |-- {col}: {t} (nullable = true)")
        print("\\n".join(lines))

    def show(self, n=20, truncate=True):
        rows = self._data[:n]
        if not rows: print("(empty)"); return
        cols = self._columns
        width = {}
        for c in cols:
            width[c] = max(len(str(c)), max((len(str(r.get(c,""))) for r in rows), default=0))
            if truncate and width[c] > 20: width[c] = 20
        sep = "+" + "+".join("-"*(width[c]+2) for c in cols) + "+"
        header = "|" + "|".join(f" {str(c):<{width[c]}} " for c in cols) + "|"
        print(sep); print(header); print(sep)
        for r in rows:
            line = "|"
            for c in cols:
                val = str(r.get(c,""))
                if truncate and len(val) > width[c]: val = val[:width[c]-3] + "..."
                line += f" {val:<{width[c]}} |"
            print(line)
        print(sep)

    def select(self, *args):
        cols = [_col_name(a) for a in args]
        # handle alias
        rename = {}
        for a in args:
            if isinstance(a, _Column) and hasattr(a, "_alias"):
                rename[_col_name(a)] = a._alias
        new_data = []
        for r in self._data:
            row = {}
            for cn, a in zip(cols, args):
                actual_col = _col_name(a)
                if '.' in actual_col:
                    parts = actual_col.split('.', 1)
                    parent = r.get(parts[0])
                    val = parent.get(parts[1]) if isinstance(parent, dict) else None
                    row[rename.get(actual_col, parts[1])] = val
                elif actual_col in r:
                    row_key = rename.get(actual_col, actual_col)
                    row[row_key] = r[actual_col]
                else:
                    row[actual_col] = None
            new_data.append(row)
        new_cols = []
        for c in cols:
            if '.' in c: new_cols.append(rename.get(c, c.split('.',1)[1]))
            else: new_cols.append(rename.get(c, c))
        return _DataFrame(new_data, new_cols)

    def filter(self, condition):
        if isinstance(condition, _Column):
            expr = condition.expr
        else:
            expr = str(condition)
        # simple eval-based filter
        import re
        new_data = []
        for r in self._data:
            try:
                result = eval(expr, {}, r)
                if result: new_data.append(r)
            except: pass
        return _DataFrame(new_data, self._columns)

    def where(self, condition): return self.filter(condition)

    def withColumn(self, name, col_expr):
        if isinstance(col_expr, _WhenExpr):
            new_data = []
            for r in self._data:
                row = dict(r); row[name] = col_expr._eval(r); new_data.append(row)
            new_cols = self._columns + ([name] if name not in self._columns else [])
            return _DataFrame(new_data, new_cols)
        if isinstance(col_expr, _Column) and hasattr(col_expr, '_win_fn'):
            return self._apply_win_col(name, col_expr)
        if isinstance(col_expr, _Column) and hasattr(col_expr, '_udf_fn'):
            new_data = []
            for r in self._data:
                row = dict(r); row[name] = col_expr._udf_fn(r); new_data.append(row)
            new_cols = self._columns + ([name] if name not in self._columns else [])
            return _DataFrame(new_data, new_cols)
        if isinstance(col_expr, _Column) and hasattr(col_expr, '_explode_col'):
            src = col_expr._explode_col
            new_data = []
            for r in self._data:
                vals = r.get(src) or []
                if not isinstance(vals, list): vals = [vals]
                for item in vals:
                    nrow=dict(r); nrow[name]=item; new_data.append(nrow)
            new_cols = self._columns + ([name] if name not in self._columns else [])
            return _DataFrame(new_data, new_cols)
        if isinstance(col_expr, _Column) and hasattr(col_expr, '_explode_array_lits'):
            lits = col_expr._explode_array_lits
            vals = [eval(l.expr if isinstance(l,_Column) else repr(l), {}, {}) for l in lits]
            new_data = []
            for r in self._data:
                for item in vals:
                    nrow=dict(r); nrow[name]=item; new_data.append(nrow)
            new_cols = self._columns + ([name] if name not in self._columns else [])
            return _DataFrame(new_data, new_cols)
        if isinstance(col_expr, _Column) and hasattr(col_expr, '_from_json_col'):
            import json as _json
            src = col_expr._from_json_col
            new_data = []
            for r in self._data:
                row = dict(r)
                try: row[name] = _json.loads(r.get(src) or '{}')
                except: row[name] = {}
                new_data.append(row)
            new_cols = self._columns + ([name] if name not in self._columns else [])
            return _DataFrame(new_data, new_cols)
        expr = col_expr.expr if isinstance(col_expr, _Column) else str(col_expr)
        _str_ns = {'upper': lambda s: str(s).upper() if s is not None else s,
                   'lower': lambda s: str(s).lower() if s is not None else s,
                   'trim': lambda s: str(s).strip() if s is not None else s,
                   'ltrim': lambda s: str(s).lstrip() if s is not None else s,
                   'rtrim': lambda s: str(s).rstrip() if s is not None else s,
                   'abs': abs, '__builtins__': {}}
        new_data = []
        for r in self._data:
            row = dict(r)
            try: row[name] = eval(str(expr), _str_ns, row)
            except: row[name] = None
            new_data.append(row)
        new_cols = self._columns + ([name] if name not in self._columns else [])
        return _DataFrame(new_data, new_cols)

    def _apply_win_col(self, name, col_expr):
        import math
        fn = col_expr._win_fn
        wc = getattr(col_expr, '_win_col', None)
        wn = getattr(col_expr, '_win_n', None)
        wd = getattr(col_expr, '_win_default', None)
        ws = getattr(col_expr, '_window_spec', None)
        part_cols = list(ws.partition_cols) if ws and ws.partition_cols else []
        ord_cols = list(ws.order_cols) if ws and ws.order_cols else []
        frame = ws.frame if ws and ws.frame else None
        partitions = {}
        for i, r in enumerate(self._data):
            pkey = tuple(r.get(c) for c in part_cols)
            if pkey not in partitions: partitions[pkey] = []
            partitions[pkey].append((i, r))
        results = {}
        for pkey, indexed_rows in partitions.items():
            def sk(ir, _oc=ord_cols):
                _, row = ir; key = []
                for c in _oc:
                    is_d = _is_desc(c) if isinstance(c, _Column) else False
                    cn = _col_name(c); v = row.get(cn)
                    key.append(-(v if isinstance(v,(int,float)) else 0) if is_d and v is not None else (v if v is not None else ""))
                return key
            srows = sorted(indexed_rows, key=sk) if ord_cols else list(indexed_rows)
            nr = len(srows); dr = 0
            for pos,(orig_i,r) in enumerate(srows):
                cur_key = sk((orig_i,r))
                if fn == "row_number":
                    results[orig_i] = pos + 1
                elif fn == "rank":
                    results[orig_i] = 1 if pos==0 else (results[srows[pos-1][0]] if cur_key==sk(srows[pos-1]) else pos+1)
                elif fn == "dense_rank":
                    if pos==0: dr=1
                    elif cur_key!=sk(srows[pos-1]): dr+=1
                    results[orig_i] = dr
                elif fn == "lag":
                    n_l = wn if wn is not None else 1; pp = pos - n_l
                    results[orig_i] = srows[pp][1].get(wc) if pp>=0 else wd
                elif fn == "lead":
                    n_l = wn if wn is not None else 1; np_ = pos + n_l
                    results[orig_i] = srows[np_][1].get(wc) if np_<nr else wd
                elif fn == "ntile":
                    nt = wn if wn else 1
                    results[orig_i] = min(int(pos*nt/nr)+1, nt)
                elif fn in ("sum","avg","max","min","count"):
                    if frame:
                        sf,ef = frame[0],frame[1]
                        si = 0 if (math.isinf(sf) and sf<0) else max(0,pos+int(sf))
                        ei = nr-1 if (math.isinf(ef) and ef>0) else min(nr-1,pos+int(ef))
                    else: si,ei = 0,nr-1
                    vals = [srows[j][1].get(wc) for j in range(si,ei+1) if srows[j][1].get(wc) is not None]
                    if fn=="sum": results[orig_i]=sum(vals) if vals else 0
                    elif fn=="avg": results[orig_i]=sum(vals)/len(vals) if vals else 0
                    elif fn=="max": results[orig_i]=max(vals) if vals else None
                    elif fn=="min": results[orig_i]=min(vals) if vals else None
                    elif fn=="count": results[orig_i]=len(vals)
        new_data = []
        for i,r in enumerate(self._data):
            row = dict(r); row[name] = results.get(i); new_data.append(row)
        new_cols = self._columns + ([name] if name not in self._columns else [])
        return _DataFrame(new_data, new_cols)

    def drop(self, *cols):
        to_drop = set([_col_name(c) for c in cols])
        new_cols = [c for c in self._columns if c not in to_drop]
        new_data = [{k:v for k,v in r.items() if k not in to_drop} for r in self._data]
        return _DataFrame(new_data, new_cols)

    def dropna(self, subset=None):
        new_data = []
        for r in self._data:
            if subset:
                if all(r.get(c) is not None for c in subset): new_data.append(r)
            else:
                if all(v is not None for v in r.values()): new_data.append(r)
        return _DataFrame(new_data, self._columns)

    def fillna(self, value, subset=None):
        new_data = []
        for r in self._data:
            row = dict(r)
            cols = subset if subset else self._columns
            for c in cols:
                if row.get(c) is None: row[c] = value
            new_data.append(row)
        return _DataFrame(new_data, self._columns)

    def groupBy(self, *cols): return _GroupedData(self, [_col_name(c) for c in cols])
    def groupby(self, *cols): return self.groupBy(*cols)

    def join(self, other, on, how="inner"):
        on_col = _col_name(on) if not isinstance(on, list) else [_col_name(c) for c in on]
        if isinstance(on_col, str): on_col = [on_col]
        new_data = []
        for r1 in self._data:
            for r2 in other._data:
                if all(r1.get(c) == r2.get(c) for c in on_col):
                    merged = dict(r1)
                    for k,v in r2.items():
                        if k not in on_col: merged[k] = v
                    new_data.append(merged)
        all_cols = list(dict.fromkeys(self._columns + [c for c in other._columns if c not in on_col]))
        return _DataFrame(new_data, all_cols)

    def orderBy(self, *cols, **kwargs):
        sort_keys = []
        for c in cols:
            if isinstance(c, str): sort_keys.append((c, False))
            elif isinstance(c, _Column): sort_keys.append((_col_name(c), _is_desc(c)))
        def sort_row(r):
            return tuple((r.get(k) or 0) if not desc else -(r.get(k) or 0) for k,desc in sort_keys)
        sorted_data = sorted(self._data, key=sort_row)
        return _DataFrame(sorted_data, self._columns)

    def sort(self, *cols, **kwargs): return self.orderBy(*cols, **kwargs)

    def pivot(self, col): return _PivotData(self, col)

    def count(self): return len(self._data)

    def approxQuantile(self, col, percentiles, relErr):
        vals = sorted([r.get(col) for r in self._data if r.get(col) is not None])
        n = len(vals)
        if n == 0: return [None]*len(percentiles)
        result = []
        for p in percentiles:
            idx = int(p * (n-1))
            result.append(vals[idx])
        return result

    @property
    def columns(self): return self._columns

class _PivotData:
    def __init__(self, df, pivot_col):
        self._df = df; self._pivot_col = pivot_col
    def agg(self, *args): return self._df  # simplified

class _GroupedData:
    def __init__(self, df, keys):
        self._df = df; self._keys = keys

    def _aggregate(self, agg_map):
        groups = {}
        for r in self._df._data:
            gkey = tuple(r.get(k) for k in self._keys)
            if gkey not in groups: groups[gkey] = []
            groups[gkey].append(r)
        new_data = []
        for gkey, rows in groups.items():
            row = dict(zip(self._keys, gkey))
            for out_col, (agg_fn, src_col) in agg_map.items():
                vals = [r.get(src_col) for r in rows if r.get(src_col) is not None]
                if agg_fn == "sum": row[out_col] = sum(vals) if vals else 0
                elif agg_fn == "avg": row[out_col] = sum(vals)/len(vals) if vals else 0
                elif agg_fn == "count": row[out_col] = len(rows)
                elif agg_fn == "max": row[out_col] = max(vals) if vals else None
                elif agg_fn == "min": row[out_col] = min(vals) if vals else None
            new_data.append(row)
        new_cols = self._keys + list(agg_map.keys())
        return _DataFrame(new_data, new_cols)

    def agg(self, *args, **kwargs):
        agg_map = {}
        for a in args:
            if isinstance(a, _Column):
                expr = a.expr
                name = a._alias if hasattr(a, "_alias") else expr
                import re
                m = re.match(r"(sum|avg|count|max|min)\\((.+)\\)", expr, re.I)
                if m: agg_map[name] = (m.group(1).lower(), m.group(2))
        return self._aggregate(agg_map)

    def sum(self, col):
        agg_map = {f"sum({col})": ("sum", col)}
        return self._aggregate(agg_map)

    def count(self):
        agg_map = {"count": ("count", self._keys[0] if self._keys else self._df._columns[0])}
        return self._aggregate(agg_map)

    def avg(self, col): agg_map = {f"avg({col})": ("avg", col)}; return self._aggregate(agg_map)
    def max(self, col): agg_map = {f"max({col})": ("max", col)}; return self._aggregate(agg_map)
    def min(self, col): agg_map = {f"min({col})": ("min", col)}; return self._aggregate(agg_map)

    def pivot(self, col):
        # simplified pivot: just return grouped df
        pivot_vals = list(set(r.get(col) for r in self._df._data))
        def pivot_agg(agg_fn):
            import re as _re
            sc = _col_name(agg_fn)
            m2 = _re.match(r"\\w+\\((.+)\\)", sc)
            actual_col = m2.group(1) if m2 else sc
            groups = {}
            for r in self._df._data:
                gkey = tuple(r.get(k) for k in self._keys)
                pval = r.get(col)
                if gkey not in groups: groups[gkey] = {}
                groups[gkey][pval] = groups[gkey].get(pval, 0) + (r.get(actual_col) or 0)
            new_data = []
            for gkey, pvdict in groups.items():
                row = dict(zip(self._keys, gkey))
                for pv in sorted(pvdict.keys()): row[str(pv)] = pvdict[pv]
                new_data.append(row)
            new_cols = self._keys + [str(pv) for pv in sorted(pivot_vals)]
            return _DataFrame(new_data, new_cols)
        return type("_PivotHelper", (), {"agg": lambda self2, fn: pivot_agg(fn)})()

class _FunctionsModule:
    def col(self, name): return _Column(name)
    def lit(self, val): return _Column(f"__lit_{val}__", repr(val))
    def sum(self, c): n=_col_name(c); r=_Column(f"sum({n})"); r.expr=f"sum({n})"; return r
    def avg(self, c): n=_col_name(c); r=_Column(f"avg({n})"); r.expr=f"avg({n})"; return r
    def count(self, c): n=_col_name(c); r=_Column(f"count({n})"); r.expr=f"count({n})"; return r
    def max(self, c): n=_col_name(c); r=_Column(f"max({n})"); r.expr=f"max({n})"; return r
    def min(self, c): n=_col_name(c); r=_Column(f"min({n})"); r.expr=f"min({n})"; return r
    def row_number(self): return _WinFn("row_number")
    def rank(self): return _WinFn("rank")
    def dense_rank(self): return _WinFn("dense_rank")
    def lag(self, c, n=1, default=None): return _WinFn("lag", _col_name(c), n, default)
    def lead(self, c, n=1, default=None): return _WinFn("lead", _col_name(c), n, default)
    def ntile(self, n): return _WinFn("ntile", n=n)
    def when(self, condition, value): return _WhenExpr(condition, value)
    def udf(self, fn, returnType=None):
        def wrapper(*args):
            c_names = [_col_name(a) for a in args]
            def evaluate(row): return fn(*[row.get(cn) for cn in c_names])
            col = _Column("udf_result")
            col._udf_fn = evaluate
            col._udf_cols = c_names
            return col
        return wrapper
    def isnull(self, c): n=_col_name(c); return _Column(f"isnull({n})", f"({n} is None)")
    def isnotnull(self, c): n=_col_name(c); return _Column(f"isnotnull({n})", f"({n} is not None)")
    def broadcast(self, df): return df
    def upper(self, c): n=_col_name(c); r=_Column(f"upper({n})"); r.expr=f"upper({n})"; return r
    def lower(self, c): n=_col_name(c); r=_Column(f"lower({n})"); r.expr=f"lower({n})"; return r
    def trim(self, c): n=_col_name(c); r=_Column(f"trim({n})"); r.expr=f"trim({n})"; return r
    def ltrim(self, c): n=_col_name(c); r=_Column(f"ltrim({n})"); r.expr=f"ltrim({n})"; return r
    def rtrim(self, c): n=_col_name(c); r=_Column(f"rtrim({n})"); r.expr=f"rtrim({n})"; return r
    def abs(self, c): n=_col_name(c); r=_Column(f"abs({n})"); r.expr=f"abs({n})"; return r
    def rand(self, seed=None):
        r=_Column("rand_col"); r.expr="__import__('random').random()"; return r
    def explode(self, c):
        if isinstance(c, _Column) and hasattr(c, '_array_lits'):
            r=_Column("explode_arr"); r._explode_array_lits=c._array_lits; return r
        n=_col_name(c); r=_Column(f"explode({n})"); r._explode_col=n; return r
    def array(self, *cols):
        items = list(cols) if not (len(cols)==1 and isinstance(cols[0],list)) else cols[0]
        r=_Column("array_col"); r._array_lits=items; return r
    def from_json(self, c, schema):
        n=_col_name(c); r=_Column("from_json_col"); r._from_json_col=n; r._from_json_schema=schema; return r
    def coalesce(self, *cols):
        n=_col_name(cols[0]) if cols else "null"
        r=_Column(f"coalesce({n})"); r.expr=f"({n} if {n} is not None else None)"; return r

class _WhenExpr:
    def __init__(self, cond, val):
        self._cases = [(cond, val)]
        self._else_val = None
        self.name = "when_expr"
        self.expr = "when_expr"
    def when(self, cond, val): self._cases.append((cond, val)); return self
    def otherwise(self, val): self._else_val = val; return self
    def alias(self, name):
        c = _WhenExpr(None, None)
        c._cases = self._cases; c._else_val = self._else_val
        c.name = name; c.expr = name; c._alias = name
        return c
    def _eval(self, row):
        for cond, val in self._cases:
            if cond is None: continue
            cn = _col_name(cond)
            expr = cond.expr if isinstance(cond, _Column) else str(cond)
            try:
                res = eval(expr, {}, row)
                if res: return val
            except: pass
        return self._else_val

class _WinFn:
    def __init__(self, fn_name, col=None, n=None, default=None):
        self.fn_name = fn_name; self.col = col; self.n = n; self.default = default
        self.name = fn_name; self.expr = fn_name
        self._window = None
    def over(self, window_spec):
        c = _Column(self.fn_name)
        c._win_fn = self.fn_name; c._win_col = self.col
        c._win_n = self.n; c._win_default = self.default
        c._window_spec = window_spec
        return c
    def alias(self, n): self.name = n; return self

class _SparkContext:
    def setLogLevel(self, level): pass

class _SparkSession:
    def __init__(self):
        self.sparkContext = _SparkContext()
    def createDataFrame(self, data, schema=None):
        if isinstance(schema, list): cols = schema
        elif hasattr(schema, 'fields'): cols = [f.name for f in schema.fields]
        else: cols = [f"_{i}" for i in range(len(data[0]) if data else 0)]
        return _DataFrame(data, cols)

class _SparkSessionBuilder:
    def master(self, m): return self
    def appName(self, n): return self
    def config(self, *a, **kw): return self
    def getOrCreate(self): return _SparkSession()
    def enableHiveSupport(self): return self

class SparkSession:
    builder = _SparkSessionBuilder()

# pyspark module shims
class _PysparkSQL:
    SparkSession = SparkSession
    class functions(_FunctionsModule): pass
    class types:
        class StructType:
            def __init__(self, fields=None): self.fields = fields or []
        class StructField:
            def __init__(self, name, dtype, nullable=True): self.name=name; self.dtype=dtype
        class StringType: pass
        class IntegerType: pass
        class LongType: pass
        class DoubleType: pass
        class FloatType: pass
        class BooleanType: pass
    class window:
        Window = Window
        class WindowSpec: pass

# Make imports work
import sys
_f_inst = _FunctionsModule()

class _FakeMod:
    def __init__(self, d):
        for k,v in d.items(): setattr(self, k, v)

sys.modules["pyspark"] = _FakeMod({"sql": _FakeMod({
    "SparkSession": SparkSession,
    "functions": _f_inst,
    "types": _PysparkSQL.types,
    "window": _FakeMod({"Window": Window})
})})
sys.modules["pyspark.sql"] = _FakeMod({
    "SparkSession": SparkSession,
    "functions": _f_inst,
    "types": _PysparkSQL.types,
    "window": _FakeMod({"Window": Window})
})
sys.modules["pyspark.sql.functions"] = _f_inst
sys.modules["pyspark.sql.types"] = _PysparkSQL.types
sys.modules["pyspark.sql.window"] = _FakeMod({"Window": Window})

# Patch F module usage (from pyspark.sql import functions as F)
F = _f_inst
`;
}

/* ==================== QUESTION HELPERS ==================== */
function getCurrentQuestion() {
  return state.examSet[state.currentSubject][state.currentIndex];
}

function getDifficultyClass(d) {
  if (d === "easy") return "easy";
  if (d === "medium") return "medium";
  return "hard";
}

/* ==================== LOAD QUESTION INTO UI ==================== */
function loadQuestion(index) {
  state.currentIndex = index;
  const q = getCurrentQuestion();
  const subject = state.currentSubject;
  const total = state.examSet[subject].length;

  // Header
  document.getElementById("exam-subject-label").textContent =
    subject === "python" ? "🐍 Python" : subject === "pyspark" ? "⚡ PySpark" : "🗄️ SQL";
  const badge = document.getElementById("exam-difficulty-badge");
  badge.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
  badge.className = "difficulty-badge " + getDifficultyClass(q.difficulty);
  document.getElementById("exam-question-counter").textContent = `Q ${index + 1} / ${total}`;

  // Question panel
  document.getElementById("question-number").textContent = `Question ${index + 1}`;
  document.getElementById("question-text").textContent = q.description;
  const exBox = document.getElementById("question-example");
  exBox.textContent = q.example || "";
  exBox.style.display = q.example ? "block" : "none";

  // Schema display
  const schemaBox = document.getElementById("question-schema");
  if (subject === "sql") {
    schemaBox.innerHTML = renderSchemaHTML(SQL_SCHEMA_DEFS);
    schemaBox.classList.remove("hidden");
  } else if (q.schema && q.schema.length) {
    schemaBox.innerHTML = renderSchemaHTML(q.schema);
    schemaBox.classList.remove("hidden");
  } else {
    schemaBox.innerHTML = "";
    schemaBox.classList.add("hidden");
  }

  // Expected output
  const eoBox = document.getElementById("expected-output-box");
  const eoText = document.getElementById("expected-output-text");
  if (q.expectedOutput) {
    eoText.textContent = q.expectedOutput;
    eoBox.classList.remove("hidden");
  } else {
    eoBox.classList.add("hidden");
  }

  // Lang label
  document.getElementById("lang-label").textContent =
    subject === "sql" ? "SQL" : subject === "pyspark" ? "PySpark (Python)" : "Python";

  // Editor
  const savedAnswer = state.answers[subject][q.id];
  const codeToLoad = savedAnswer ? savedAnswer.code : q.starterCode;
  initEditor(subject === "sql" ? "sql" : "python");
  editor.setValue(codeToLoad);

  // Output
  const output = document.getElementById("code-output");
  const status = document.getElementById("output-status");
  if (savedAnswer) {
    output.textContent = savedAnswer.output || "(no output)";
    output.className = "code-output" + (savedAnswer.passed ? " pass-out" : "");
    status.textContent = savedAnswer.passed ? "✓ PASS" : "✗ FAIL";
    status.className = "output-status " + (savedAnswer.passed ? "pass" : "fail");
  } else {
    output.textContent = "-- Run your code to see the output --";
    output.className = "code-output";
    status.textContent = "";
    status.className = "output-status";
  }

  // Buttons
  document.getElementById("btn-prev-question").disabled = (index === 0);
  document.getElementById("btn-next-question").disabled = (index === total - 1);
  document.getElementById("btn-submit-answer").disabled = !savedAnswer;

  // Hint system
  loadHintUI(q);
}

/* ==================== HINT SYSTEM ==================== */
function loadHintUI(q) {
  const section = document.getElementById("hint-section");
  const btnHint  = document.getElementById("btn-hint");
  const remaining = document.getElementById("hint-remaining");
  const content  = document.getElementById("hint-content");
  const badge    = document.getElementById("hint-badge");

  if (q.difficulty !== "hard" || !q.hints || !q.hints.length) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");
  const sub = state.currentSubject;
  const used = state.hintsUsed[sub][q.id] || 0;
  const total = q.hints.length;
  const left = total - used;

  // Rebuild revealed hint list
  content.innerHTML = "";
  for (let i = 0; i < used; i++) {
    const li = document.createElement("div");
    li.className = "hint-item hint-item-" + (i + 1);
    li.innerHTML = `<span class="hint-num">Hint ${i+1}</span> ${q.hints[i]}`;
    content.appendChild(li);
  }

  btnHint.disabled = (left === 0);
  remaining.textContent = left === 0 ? "(no more)" : `(${left} left)`;

  // Show zero-hint badge if already passed without any hints
  const ans = state.answers[sub][q.id];
  badge.classList.add("hidden");
  if (ans && ans.passed && used === 0) {
    badge.textContent = "🏆 Solved without hints!";
    badge.classList.remove("hidden");
  }

  btnHint.onclick = () => {
    const curUsed = state.hintsUsed[sub][q.id] || 0;
    if (curUsed >= total) return;
    state.hintsUsed[sub][q.id] = curUsed + 1;
    loadHintUI(q);
    // Animate the new hint
    const items = content.querySelectorAll(".hint-item");
    const newest = items[items.length - 1];
    if (newest) { newest.classList.add("hint-pop"); setTimeout(() => newest.classList.remove("hint-pop"), 600); }
  };
}

/* ==================== SCORE CALCULATION ==================== */
function calcScores() {
  const result = {};
  ["python", "pyspark", "sql"].forEach(sub => {
    const qs = state.examSet[sub];
    let correct = 0;
    qs.forEach(q => {
      const a = state.answers[sub][q.id];
      if (a && a.passed) correct++;
    });
    result[sub] = { correct, total: qs.length };
  });
  return result;
}

/* ==================== SHOW RESULTS ==================== */
function showResults() {
  const scores = calcScores();
  const totalCorrect = scores.python.correct + scores.pyspark.correct + scores.sql.correct;
  const totalQ = 30;
  const pct = Math.round((totalCorrect / totalQ) * 100);

  document.getElementById("total-score-display").textContent = `${totalCorrect} / ${totalQ}  (${pct}%)`;

  ["python", "pyspark", "sql"].forEach(sub => {
    const { correct, total } = scores[sub];
    document.getElementById(`score-val-${sub}`).textContent = `${correct} / ${total}`;
    setTimeout(() => {
      document.getElementById(`score-bar-${sub}`).style.width = Math.round((correct / total) * 100) + "%";
    }, 300);
  });

  // Detail rows
  const detail = document.getElementById("results-detail");
  detail.innerHTML = "";
  ["python", "pyspark", "sql"].forEach(sub => {
    state.examSet[sub].forEach((q, i) => {
      const a = state.answers[sub][q.id];
      const passed = a && a.passed;
      const skipped = !a;
      const icon = skipped ? "⏭️" : passed ? "✅" : "❌";
      const statusText = skipped ? "Skipped" : passed ? "Correct" : "Incorrect";
      const statusClass = skipped ? "skipped" : passed ? "correct" : "incorrect";
      const subLabel = sub === "python" ? "🐍" : sub === "pyspark" ? "⚡" : "🗄️";
      detail.innerHTML += `
        <div class="result-row">
          <span class="result-icon">${icon}</span>
          <span class="result-subject">${subLabel} Q${i+1}</span>
          <span class="result-q">${q.title}</span>
          <span class="result-status ${statusClass}">${statusText}</span>
        </div>`;
    });
  });

  showScreen("screen-results");
}

/* ==================== REVIEW MODAL ==================== */
function showReview() {
  const body = document.getElementById("review-body");
  body.innerHTML = "";
  ["python", "pyspark", "sql"].forEach(sub => {
    state.examSet[sub].forEach((q, i) => {
      const a = state.answers[sub][q.id];
      const passed = a && a.passed;
      const skipped = !a;
      const cls = skipped ? "skipped" : passed ? "correct" : "incorrect";
      const label = skipped ? "Skipped" : passed ? "✓ Correct" : "✗ Incorrect";
      body.innerHTML += `
        <div class="review-item ${cls}">
          <div class="review-q">Q${i+1} [${sub.toUpperCase()}] ${q.title} — <em>${label}</em></div>
          ${a ? `<div class="review-answer-label">Your Code</div>
          <pre class="review-code ${passed ? "correct-code" : "incorrect-code"}">${escHtml(a.code)}</pre>
          <div class="review-answer-label">Output</div>
          <pre class="review-code">${escHtml(a.output)}</pre>` : `<div style="color:var(--warn);font-size:.85rem">Not attempted</div>`}
          <div class="review-answer-label">Expected Output</div>
          <pre class="review-code correct-code">${escHtml(q.expectedOutput)}</pre>
        </div>`;
    });
  });
  document.getElementById("review-modal").classList.remove("hidden");
}

function escHtml(str) {
  return (str || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* ==================== UPDATE SUBJECT PROGRESS ==================== */
function updateProgressSummary() {
  const visible = document.getElementById("subject-progress-summary");
  visible.classList.remove("hidden");
  ["python", "pyspark", "sql"].forEach(sub => {
    const el = document.getElementById(`prog-${sub}`);
    if (state.subjectDone[sub]) {
      const scores = calcScores();
      el.textContent = `${scores[sub].correct} / ${scores[sub].total} ✓`;
      el.style.color = "var(--accent2)";
    } else {
      const answered = Object.keys(state.answers[sub]).length;
      if (answered > 0) {
        el.textContent = `In progress (${answered}/10)`;
        el.style.color = "var(--warn)";
      } else {
        el.textContent = "Not started";
        el.style.color = "";
      }
    }
    // mark subject button
    const btn = document.querySelector(`.subject-btn[data-subject="${sub}"]`);
    if (btn) btn.classList.toggle("completed", state.subjectDone[sub]);
  });

  // Show final submit only if all 3 subjects are done
  const allDone = state.subjectDone.python && state.subjectDone.pyspark && state.subjectDone.sql;
  document.getElementById("btn-final-submit").classList.toggle("hidden", !allDone);
}

/* ==================== EVENT WIRING ==================== */
document.addEventListener("DOMContentLoaded", () => {

  // Landing → Mode selection
  document.getElementById("btn-start-exam").addEventListener("click", () => {
    showScreen("screen-mode");
  });

  // Mode card selection → Subject select
  document.querySelectorAll(".mode-card").forEach(card => {
    card.addEventListener("click", () => {
      state.mode = card.dataset.mode;
      state.timerMins = parseInt(card.dataset.mins);
      state.timerRemaining = state.timerMins * 60;
      state.timerStarted = false;
      stopTimer();
      state.examSet = buildExamSet();
      state.answers    = { python: {}, pyspark: {}, sql: {} };
      state.subjectDone = { python: false, pyspark: false, sql: false };
      state.hintsUsed  = { python: {}, pyspark: {}, sql: {} };
      // Show timer label
      const modeLabels = { moderate:"Moderate", expert:"Expert", invincible:"Invincible" };
      const lbl = document.getElementById("timer-mode-label");
      if (lbl) lbl.textContent = modeLabels[state.mode]||"";  
      document.getElementById("exam-timer").classList.remove("hidden");
      document.getElementById("select-timer-badge").classList.remove("hidden");
      updateTimerDisplay();
      updateProgressSummary();
      showScreen("screen-select");
    });
  });

  // Subject buttons
  document.querySelectorAll(".subject-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.currentSubject = btn.dataset.subject;
      state.currentIndex = 0;
      startTimer(); // no-op if already running
      showScreen("screen-exam");
      loadQuestion(0);
    });
  });

  // Back to select
  document.getElementById("btn-back-to-select").addEventListener("click", () => {
    updateProgressSummary();
    showScreen("screen-select");
    if (editor) { editor.toTextArea(); editor = null; }
  });

  // Run code
  document.getElementById("btn-run-code").addEventListener("click", runCode);

  // Reset code
  document.getElementById("btn-reset-code").addEventListener("click", () => {
    const q = getCurrentQuestion();
    editor.setValue(q.starterCode);
    document.getElementById("code-output").textContent = "-- Run your code to see the output --";
    document.getElementById("code-output").className = "code-output";
    document.getElementById("output-status").textContent = "";
    document.getElementById("btn-submit-answer").disabled = true;
  });

  // Submit answer
  document.getElementById("btn-submit-answer").addEventListener("click", () => {
    const q = getCurrentQuestion();
    const sub = state.currentSubject;
    // answer already stored in runCode
    // Check if this was the last unanswered question
    const answeredCount = Object.keys(state.answers[sub]).length;
    if (answeredCount >= 10) {
      state.subjectDone[sub] = true;
    }
    document.getElementById("btn-submit-answer").disabled = true;
    // Move to next if not at end, otherwise go back to select
    const total = state.examSet[sub].length;
    if (state.currentIndex < total - 1) {
      loadQuestion(state.currentIndex + 1);
    } else {
      state.subjectDone[sub] = true;
      updateProgressSummary();
      showScreen("screen-select");
      if (editor) { editor.toTextArea(); editor = null; }
    }
  });

  // Nav buttons
  document.getElementById("btn-prev-question").addEventListener("click", () => {
    if (state.currentIndex > 0) loadQuestion(state.currentIndex - 1);
  });
  document.getElementById("btn-next-question").addEventListener("click", () => {
    const total = state.examSet[state.currentSubject].length;
    if (state.currentIndex < total - 1) loadQuestion(state.currentIndex + 1);
  });

  // Final submit (results)
  document.getElementById("btn-final-submit").addEventListener("click", showResults);

  // Download Answer PDF
  document.getElementById("btn-download-answers").addEventListener("click", () => {
    if (!state.examSet) { alert("No exam data found. Please complete an exam first."); return; }
    generateAnswersPDF(state.examSet, state.answers);
  });

  // Download Theory PDF
  document.getElementById("btn-download-theory").addEventListener("click", () => {
    generateTheoryPDF();
  });

  // Retake
  document.getElementById("btn-retake").addEventListener("click", () => {
    stopTimer();
    state.timerStarted = false;
    state.timerRemaining = 0;
    state.mode = null; state.timerMins = 0;
    state.examSet = null;
    state.answers = { python: {}, pyspark: {}, sql: {} };
    state.subjectDone = { python: false, pyspark: false, sql: false };
    state.hintsUsed = { python: {}, pyspark: {}, sql: {} };
    document.getElementById("exam-timer").classList.add("hidden");
    document.getElementById("select-timer-badge").classList.add("hidden");
    if (editor) { editor.toTextArea(); editor = null; }
    showScreen("screen-mode");
  });

  // Review
  document.getElementById("btn-review").addEventListener("click", showReview);
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    document.getElementById("review-modal").classList.add("hidden");
  });
  document.querySelector(".modal-overlay").addEventListener("click", () => {
    document.getElementById("review-modal").classList.add("hidden");
  });

  // Keyboard shortcut: Ctrl+Enter to run
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      const examScreen = document.getElementById("screen-exam");
      if (examScreen.classList.contains("active")) runCode();
    }
  });
});

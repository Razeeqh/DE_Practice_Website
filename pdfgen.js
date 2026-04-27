/* ============================================================
   PDFGEN.JS — PDF Report Generator
   Uses jsPDF + autoTable
   1. generateAnswersPDF()  — 30 question answer sheet
   2. generateTheoryPDF()   — DE Interview Theory Guide (6-8 yrs)
   ============================================================ */

/* ==================== COLOUR PALETTE ==================== */
const PDF_COLORS = {
  darkBg:   [13,  17,  23],
  darkBg2:  [22,  27,  34],
  darkBg3:  [33,  38,  45],
  border:   [48,  54,  61],
  text:     [230, 237, 243],
  muted:    [139, 148, 158],
  accent:   [88,  166, 255],
  green:    [63,  185, 80],
  yellow:   [210, 153, 34],
  red:      [248, 81,  73],
  white:    [255, 255, 255],
  python:   [53,  114, 165],
  pyspark:  [226, 90,  28],
  sql:      [51,  103, 145],
};

/* ==================== UTILITY ==================== */
function getPDF() {
  const { jsPDF } = window.jspdf;
  return new jsPDF({ orientation:"portrait", unit:"mm", format:"a4", compress:true });
}

function rgb(arr) { return { r:arr[0], g:arr[1], b:arr[2] }; }

function addHeader(doc, title, sub) {
  // Dark header bar
  doc.setFillColor(...PDF_COLORS.darkBg);
  doc.rect(0, 0, 210, 22, "F");
  doc.setTextColor(...PDF_COLORS.accent);
  doc.setFontSize(13);
  doc.setFont("helvetica","bold");
  doc.text("DE Practice Platform", 14, 10);
  doc.setTextColor(...PDF_COLORS.muted);
  doc.setFontSize(8);
  doc.setFont("helvetica","normal");
  doc.text(sub || "", 14, 16);
  doc.setTextColor(...PDF_COLORS.white);
  doc.setFontSize(11);
  doc.setFont("helvetica","bold");
  doc.text(title, 210/2, 10, {align:"center"});
  doc.setTextColor(...PDF_COLORS.muted);
  doc.setFontSize(7);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 196, 10, {align:"right"});
  // Thin accent line
  doc.setDrawColor(...PDF_COLORS.accent);
  doc.setLineWidth(0.5);
  doc.line(0, 22, 210, 22);
}

function addPageHeader(doc, pageNum) {
  if (pageNum > 1) {
    doc.setFillColor(...PDF_COLORS.darkBg);
    doc.rect(0, 0, 210, 10, "F");
    doc.setTextColor(...PDF_COLORS.muted);
    doc.setFontSize(7);
    doc.text("DE Practice Platform", 14, 7);
    doc.text(`Page ${pageNum}`, 196, 7, {align:"right"});
  }
}

function addFooter(doc) {
  const pCount = doc.getNumberOfPages();
  for (let i=1;i<=pCount;i++) {
    doc.setPage(i);
    doc.setFillColor(...PDF_COLORS.darkBg2);
    doc.rect(0, 284, 210, 13, "F");
    doc.setDrawColor(...PDF_COLORS.border[0], PDF_COLORS.border[1], PDF_COLORS.border[2]);
    doc.setLineWidth(0.3);
    doc.line(0, 284, 210, 284);
    doc.setTextColor(...PDF_COLORS.muted);
    doc.setFontSize(7);
    doc.text("Data Engineering Practice Platform · Real MNC Interview Questions", 14, 291);
    doc.text(`Page ${i} of ${pCount}`, 196, 291, {align:"right"});
  }
}

function wrapText(doc, text, x, y, maxW, lineH, color) {
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(String(text||""), maxW);
  doc.text(lines, x, y);
  return y + lines.length * lineH;
}

function subjectColor(sub) {
  if (sub==="python")  return PDF_COLORS.python;
  if (sub==="pyspark") return PDF_COLORS.pyspark;
  return PDF_COLORS.sql;
}
function subjectLabel(sub) {
  if (sub==="python")  return "🐍 Python";
  if (sub==="pyspark") return "⚡ PySpark";
  return "🗄️ SQL";
}
function diffColor(d) {
  if (d==="easy")   return PDF_COLORS.green;
  if (d==="medium") return PDF_COLORS.yellow;
  return PDF_COLORS.red;
}

/* ==================== ANSWER SHEET PDF ==================== */
function generateAnswersPDF(examSet, answers) {
  const doc = getPDF();
  let pageNum = 1;
  let y = 28;
  const LM = 14; const RM = 196; const PW = RM - LM;
  const LH = 4.5;

  // ---- Cover page ----
  addHeader(doc, "Exam Answer Sheet", "All 30 questions with your answers & model solutions");

  doc.setFillColor(...PDF_COLORS.darkBg2);
  doc.rect(LM, y, PW, 14, "F");
  doc.setTextColor(...PDF_COLORS.accent);
  doc.setFontSize(10);
  doc.setFont("helvetica","bold");
  doc.text("EXAM RESULTS SUMMARY", LM+4, y+6);

  // Score row
  let totalCorrect = 0;
  const subjectScores = {};
  ["python","pyspark","sql"].forEach(sub=>{
    const qs = examSet[sub];
    let c = 0;
    qs.forEach(q=>{ if(answers[sub][q.id]?.passed) c++; });
    subjectScores[sub] = {correct:c, total:qs.length};
    totalCorrect += c;
  });

  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.text);
  doc.text(`Total: ${totalCorrect}/30  (${Math.round(totalCorrect/30*100)}%)`, LM+4, y+11);
  y += 18;

  // Score pills
  const cols = [["🐍 Python", subjectScores.python], ["⚡ PySpark", subjectScores.pyspark], ["🗄️ SQL", subjectScores.sql]];
  const colW = PW/3;
  cols.forEach(([ label, s ], i) => {
    const cx = LM + i * colW;
    doc.setFillColor(...PDF_COLORS.darkBg3);
    doc.roundedRect(cx, y, colW-2, 18, 2, 2, "F");
    doc.setTextColor(...PDF_COLORS.muted);
    doc.setFontSize(8);
    doc.text(label, cx+4, y+6);
    const c = s.color || PDF_COLORS.accent;
    doc.setTextColor(...PDF_COLORS.accent);
    doc.setFontSize(16);
    doc.setFont("helvetica","bold");
    doc.text(`${s.correct}/${s.total}`, cx+4, y+15);
  });
  y += 24;

  // Separator
  doc.setDrawColor(...PDF_COLORS.border[0],PDF_COLORS.border[1],PDF_COLORS.border[2]);
  doc.setLineWidth(0.3);
  doc.line(LM, y, RM, y);
  y += 6;

  // ---- Per-question detail ----
  let qOverall = 0;
  const SUBJECTS = ["python","pyspark","sql"];

  SUBJECTS.forEach(sub => {
    const qs = examSet[sub];
    qs.forEach((q, qi) => {
      qOverall++;
      const ans = answers[sub][q.id];
      const passed = ans?.passed;
      const skipped = !ans;

      // Check if we need a new page
      if (y > 250) {
        doc.addPage();
        pageNum++;
        doc.setFillColor(...PDF_COLORS.darkBg);
        doc.rect(0,0,210,10,"F");
        doc.setTextColor(...PDF_COLORS.muted);
        doc.setFontSize(7);
        doc.text("DE Practice Platform — Answer Sheet", 14, 7);
        doc.text(`Page ${pageNum}`, 196, 7, {align:"right"});
        y = 16;
      }

      // Question header bar
      const statusColor = skipped ? PDF_COLORS.yellow : passed ? PDF_COLORS.green : PDF_COLORS.red;
      const statusLabel = skipped ? "SKIPPED" : passed ? "✓ CORRECT" : "✗ INCORRECT";
      doc.setFillColor(...subjectColor(sub));
      doc.rect(LM, y, 3, 14, "F");
      doc.setFillColor(...PDF_COLORS.darkBg2);
      doc.rect(LM+3, y, PW-3, 14, "F");

      doc.setTextColor(...PDF_COLORS.muted);
      doc.setFontSize(7);
      doc.setFont("helvetica","normal");
      doc.text(`Q${qOverall}  ${subjectLabel(sub)} · ${q.difficulty.toUpperCase()}`, LM+6, y+5);

      doc.setTextColor(...PDF_COLORS.text);
      doc.setFontSize(9);
      doc.setFont("helvetica","bold");
      const titleLines = doc.splitTextToSize(q.title, PW-50);
      doc.text(titleLines, LM+6, y+11);

      // Status badge
      doc.setFillColor(...statusColor);
      doc.roundedRect(RM-32, y+3, 30, 8, 2, 2, "F");
      doc.setTextColor(...PDF_COLORS.darkBg);
      doc.setFontSize(7);
      doc.setFont("helvetica","bold");
      doc.text(statusLabel, RM-17, y+8, {align:"center"});

      y += 17;

      // Question description
      doc.setTextColor(...PDF_COLORS.muted);
      doc.setFontSize(7.5);
      doc.setFont("helvetica","normal");
      const descLines = doc.splitTextToSize(q.description.replace(/`/g,"'"), PW-4);
      doc.text(descLines, LM+4, y);
      y += descLines.length * LH + 2;

      // Expected Output box
      doc.setFillColor(...PDF_COLORS.darkBg3);
      doc.rect(LM, y, PW, 0, "F");
      doc.setTextColor(63,185,80);
      doc.setFontSize(7);
      doc.setFont("helvetica","bold");
      doc.text("EXPECTED OUTPUT:", LM+2, y+4);
      doc.setTextColor(...PDF_COLORS.text);
      doc.setFont("courier","normal");
      const expLines = doc.splitTextToSize(q.expectedOutput||"", PW-20);
      const expH = expLines.length * LH + 8;
      doc.setFillColor(...PDF_COLORS.darkBg3);
      doc.rect(LM, y, PW, expH, "F");
      doc.setTextColor(63,185,80);
      doc.setFontSize(7);
      doc.setFont("helvetica","bold");
      doc.text("EXPECTED OUTPUT:", LM+2, y+4);
      doc.setTextColor(...PDF_COLORS.text);
      doc.setFont("courier","normal");
      doc.text(expLines, LM+2, y+8);
      y += expH + 2;

      // Your Answer
      if (ans) {
        const codeLines = doc.splitTextToSize((ans.code||"").substring(0,800), PW-4);
        const codeH = Math.min(codeLines.length * LH + 8, 50);
        doc.setFillColor(13,20,30);
        doc.rect(LM, y, PW, codeH+2, "F");
        doc.setDrawColor(...statusColor);
        doc.setLineWidth(0.4);
        doc.rect(LM, y, PW, codeH+2, "S");
        doc.setTextColor(...PDF_COLORS.muted);
        doc.setFontSize(6.5);
        doc.setFont("helvetica","bold");
        doc.text("YOUR CODE:", LM+2, y+4);
        doc.setTextColor(...PDF_COLORS.text);
        doc.setFont("courier","normal");
        doc.setFontSize(6.5);
        doc.text(codeLines.slice(0, Math.floor(50/LH)), LM+2, y+8);
        y += codeH + 4;

        // Output
        doc.setFillColor(...PDF_COLORS.darkBg2);
        doc.rect(LM, y, PW, 12, "F");
        doc.setTextColor(...PDF_COLORS.muted);
        doc.setFontSize(6.5);
        doc.setFont("helvetica","bold");
        doc.text("YOUR OUTPUT:", LM+2, y+4);
        doc.setTextColor(...statusColor);
        doc.setFont("courier","normal");
        const outLines = doc.splitTextToSize((ans.output||"(empty)").substring(0,200), PW-30);
        doc.text(outLines.slice(0,2), LM+2, y+9);
        doc.setTextColor(...statusColor);
        doc.setFontSize(8);
        doc.setFont("helvetica","bold");
        doc.text(statusLabel, RM-2, y+9, {align:"right"});
        y += 14;
      } else {
        doc.setFillColor(...PDF_COLORS.darkBg3);
        doc.rect(LM, y, PW, 8, "F");
        doc.setTextColor(...PDF_COLORS.yellow);
        doc.setFontSize(7.5);
        doc.setFont("helvetica","italic");
        doc.text("Question not attempted", LM+4, y+5);
        y += 10;
      }

      // Divider
      doc.setDrawColor(...PDF_COLORS.border[0],PDF_COLORS.border[1],PDF_COLORS.border[2]);
      doc.setLineWidth(0.2);
      doc.line(LM, y, RM, y);
      y += 6;
    });
  });

  addFooter(doc);
  doc.save("DE_Exam_AnswerSheet.pdf");
}

/* ==================== THEORY GUIDE PDF ==================== */
function generateTheoryPDF() {
  const doc = getPDF();
  const LM = 14; const RM = 196; const PW = RM - LM;
  const LH = 5;
  let y = 28;
  let pageNum = 1;

  function ensureSpace(needed) {
    if (y + needed > 278) {
      doc.addPage();
      pageNum++;
      doc.setFillColor(...PDF_COLORS.darkBg);
      doc.rect(0,0,210,10,"F");
      doc.setTextColor(...PDF_COLORS.muted);
      doc.setFontSize(7);
      doc.setFont("helvetica","normal");
      doc.text("DE Interview Theory Guide — 6-8 Years Experience", 14, 7);
      doc.text(`Page ${pageNum}`, 196, 7, {align:"right"});
      y = 16;
    }
  }

  function sectionHeader(title, color) {
    ensureSpace(20);
    doc.setFillColor(...color);
    doc.rect(LM, y, PW, 10, "F");
    doc.setTextColor(...PDF_COLORS.white);
    doc.setFontSize(11);
    doc.setFont("helvetica","bold");
    doc.text(title, LM+4, y+7);
    y += 13;
  }

  function subHeader(title) {
    ensureSpace(14);
    doc.setFillColor(...PDF_COLORS.darkBg2);
    doc.rect(LM, y, PW, 8, "F");
    doc.setDrawColor(...PDF_COLORS.accent[0],PDF_COLORS.accent[1],PDF_COLORS.accent[2]);
    doc.setFillColor(...PDF_COLORS.accent);
    doc.rect(LM, y, 2, 8, "F");
    doc.setTextColor(...PDF_COLORS.accent);
    doc.setFontSize(9);
    doc.setFont("helvetica","bold");
    doc.text(title, LM+5, y+5.5);
    y += 11;
  }

  function para(text, indent) {
    const x = LM + (indent||0);
    const w = PW - (indent||0);
    const lines = doc.splitTextToSize(String(text), w);
    const needed = lines.length * LH;
    ensureSpace(needed + 2);
    doc.setTextColor(...PDF_COLORS.text);
    doc.setFontSize(8.5);
    doc.setFont("helvetica","normal");
    doc.text(lines, x, y);
    y += needed + 2;
  }

  function bullet(points, indent) {
    const x = LM + (indent||4);
    const w = PW - (indent||4) - 4;
    points.forEach(p => {
      const lines = doc.splitTextToSize("• " + p, w);
      ensureSpace(lines.length * LH + 1);
      doc.setTextColor(...PDF_COLORS.text);
      doc.setFontSize(8.5);
      doc.setFont("helvetica","normal");
      doc.text(lines, x, y);
      y += lines.length * LH + 0.5;
    });
    y += 1;
  }

  function codeBlock(code) {
    const lines = doc.splitTextToSize(code, PW-8);
    const h = lines.length * LH + 6;
    ensureSpace(h + 2);
    doc.setFillColor(10,14,20);
    doc.rect(LM, y, PW, h, "F");
    doc.setDrawColor(...PDF_COLORS.border[0],PDF_COLORS.border[1],PDF_COLORS.border[2]);
    doc.rect(LM, y, PW, h, "S");
    doc.setTextColor(166,227,161);
    doc.setFontSize(7.5);
    doc.setFont("courier","normal");
    doc.text(lines, LM+4, y+4.5);
    y += h + 4;
  }

  function keyValueTable(rows) {
    ensureSpace(rows.length * 7 + 4);
    rows.forEach(([k,v],i) => {
      const bg = i%2===0 ? PDF_COLORS.darkBg2 : PDF_COLORS.darkBg3;
      doc.setFillColor(...bg);
      doc.rect(LM, y, PW, 7, "F");
      doc.setTextColor(...PDF_COLORS.accent);
      doc.setFontSize(7.5);
      doc.setFont("helvetica","bold");
      doc.text(k, LM+3, y+4.5);
      doc.setTextColor(...PDF_COLORS.text);
      doc.setFont("helvetica","normal");
      const vLines = doc.splitTextToSize(v, PW-55);
      doc.text(vLines[0], LM+55, y+4.5);
      y += 7;
    });
    y += 3;
  }

  // ====================== COVER ======================
  addHeader(doc, "Data Engineering Interview Theory Guide", "6-8 Years Experience · MNC Level");

  doc.setFillColor(...PDF_COLORS.darkBg2);
  doc.rect(LM, y, PW, 40, "F");
  doc.setDrawColor(...PDF_COLORS.accent[0],PDF_COLORS.accent[1],PDF_COLORS.accent[2]);
  doc.setLineWidth(0.7);
  doc.rect(LM, y, PW, 40, "S");
  doc.setTextColor(...PDF_COLORS.accent);
  doc.setFontSize(14);
  doc.setFont("helvetica","bold");
  doc.text("Data Engineering", 210/2, y+12, {align:"center"});
  doc.text("Interview Theory Guide", 210/2, y+20, {align:"center"});
  doc.setTextColor(...PDF_COLORS.muted);
  doc.setFontSize(9);
  doc.setFont("helvetica","normal");
  doc.text("Apache Spark · Databricks · Snowflake · Delta Lake · Cloud Architecture", 210/2, y+28, {align:"center"});
  doc.text("Designed for Senior Data Engineers (6-8 years experience)", 210/2, y+35, {align:"center"});
  y += 48;

  // TOC
  doc.setTextColor(...PDF_COLORS.muted);
  doc.setFontSize(8);
  const toc = [
    "1. Apache Spark Architecture & Internals",
    "2. Spark Optimization Techniques",
    "3. Delta Lake & ACID Transactions",
    "4. Databricks Platform (Unity Catalog, DBFS, Service Principals)",
    "5. Snowflake Architecture",
    "6. Data Modeling & Medallion Architecture",
    "7. Streaming: Kafka & Spark Structured Streaming",
    "8. Cloud Data Platforms (AWS, Azure, GCP)",
    "9. Data Quality, Testing & Observability",
    "10. Performance Tuning & Cost Optimization",
    "11. Interview Q&A – 50 Must-Know Questions",
  ];
  toc.forEach(t => { doc.text(t, LM+4, y); y+=5; });
  y += 4;

  // ====================== SECTION 1: SPARK ARCHITECTURE ======================
  sectionHeader("1. Apache Spark Architecture & Internals", PDF_COLORS.python);

  subHeader("Core Architecture");
  para("Apache Spark follows a Master-Worker (Driver-Executor) architecture with a distributed computing model.");
  bullet([
    "Driver Program: Entry point. Creates SparkContext/SparkSession, builds DAG, coordinates with Cluster Manager.",
    "Cluster Manager: Allocates resources. Supported: YARN, Kubernetes, Mesos, Spark Standalone.",
    "Executors: JVM processes on worker nodes that run tasks and cache data. Each executor runs multiple tasks in parallel.",
    "Tasks: Smallest unit of work. One task per partition per stage.",
    "Partitions: Logical chunks of data distributed across executors.",
  ]);

  subHeader("DAG (Directed Acyclic Graph)");
  para("Spark uses a DAG scheduler to model computation as a graph of operations.");
  bullet([
    "Each RDD operation adds a node to the DAG.",
    "Lazy evaluation: transformations build the DAG but don't execute until an action is called.",
    "DAG Scheduler converts the logical plan to physical execution stages.",
    "Stages are divided by shuffle boundaries (wide transformations like groupBy, join, reduceByKey).",
    "Narrow transformations (map, filter) don't require data shuffle → stay in one stage.",
  ]);

  subHeader("Catalyst Optimizer");
  para("Catalyst is Spark SQL's extensible query optimizer that transforms a logical plan into an optimized physical plan.");
  bullet([
    "Phase 1 – Analysis: Resolve attribute references using the catalog.",
    "Phase 2 – Logical Optimization: Apply rules like constant folding, predicate pushdown, projection pruning.",
    "Phase 3 – Physical Planning: Select physical operators (e.g., SortMergeJoin vs BroadcastHashJoin).",
    "Phase 4 – Code Generation: Tungsten engine generates bytecode for CPU efficiency (Whole-Stage CodeGen).",
  ]);
  codeBlock("# View execution plan\ndf.explain(True)   # shows Parsed → Analyzed → Optimized → Physical plans");

  subHeader("Tungsten Engine");
  bullet([
    "Off-heap memory management to reduce GC overhead.",
    "Cache-aware computation (data structures optimized for CPU cache lines).",
    "Whole-stage code generation: collapses multiple operators into a single JIT-compiled function.",
  ]);

  // ====================== SECTION 2: SPARK OPTIMIZATION ======================
  sectionHeader("2. Spark Optimization Techniques", PDF_COLORS.pyspark);

  subHeader("Partitioning Strategies");
  bullet([
    "Default parallelism: spark.default.parallelism (for RDDs), spark.sql.shuffle.partitions (for DataFrames, default=200).",
    "repartition(n): Full shuffle. Increases or decreases partitions. Use when data is skewed.",
    "coalesce(n): Avoids full shuffle. Only reduces partitions. Preferred for reducing before write.",
    "Rule of thumb: 2-4 tasks per CPU core. Target 128MB-256MB per partition.",
  ]);
  codeBlock("# Tune shuffle partitions\nspark.conf.set('spark.sql.shuffle.partitions', '100')\n\n# Repartition by column for downstream operations\ndf = df.repartition(200, 'customer_id')");

  subHeader("Broadcast Joins");
  bullet([
    "When one side of a join is small (<= spark.sql.autoBroadcastJoinThreshold, default 10MB), Spark automatically broadcasts it.",
    "Broadcast avoids shuffle entirely — the small table is sent to every executor.",
    "Explicit hint: df.join(F.broadcast(small_df), 'key')",
    "Disable auto-broadcast: spark.conf.set('spark.sql.autoBroadcastJoinThreshold','-1')",
  ]);
  codeBlock("from pyspark.sql import functions as F\nresult = large_df.join(F.broadcast(dim_table), 'id')");

  subHeader("Data Skewness & Solutions");
  bullet([
    "Skew: One or few partitions have significantly more data than others → slow tasks, OOM errors.",
    "Detection: Spark UI → Stages → Task Duration distribution shows long tail tasks.",
    "Solution 1 – Salting: Add random salt key to skewed side; replicate small side by same range.",
    "Solution 2 – AQE (Adaptive Query Execution): spark.sql.adaptive.enabled=true. Auto-detects skew and splits partitions.",
    "Solution 3 – skewHint (Databricks): .hint('skew','key') to handle documented skew.",
    "Solution 4 – Increase shuffle partitions so hot keys spread across more tasks.",
  ]);
  codeBlock("# AQE – Spark 3.0+\nspark.conf.set('spark.sql.adaptive.enabled','true')\nspark.conf.set('spark.sql.adaptive.skewJoin.enabled','true')\n\n# Manual salting\nimport pyspark.sql.functions as F\nlarge = large.withColumn('salt',(F.rand()*N).cast('int'))\nsmall_rep = small.crossJoin(spark.range(N).toDF('salt'))\nresult = large.join(small_rep,['key','salt'])");

  subHeader("Caching & Persistence");
  bullet([
    "df.cache() = MEMORY_AND_DISK. Use for DataFrames used multiple times.",
    "df.persist(StorageLevel.MEMORY_ONLY) for frequently accessed, memory-fitting data.",
    "Unpersist with df.unpersist() to free memory when done.",
    "Use cache() after expensive transformations (joins, aggregations) used in multiple downstream paths.",
  ]);

  subHeader("Z-Ordering (Databricks Delta Lake)");
  bullet([
    "Z-Ordering co-locates related data in the same set of files to enable data skipping.",
    "Works on Delta tables: OPTIMIZE table_name ZORDER BY (col1, col2)",
    "Best for high-cardinality columns used in WHERE clauses: event_date, customer_id.",
    "Z-Order interleaves bit patterns of multiple columns for multi-dimensional data locality.",
    "Works with Delta's column statistics to skip files not containing queried values.",
    "Trade-off: Z-Order improves read performance but increases OPTIMIZE (write) time.",
  ]);
  codeBlock("-- SQL\nOPTIMIZE delta.`/path/to/table` ZORDER BY (event_date, customer_id)\n\n# Python (Delta)\nfrom delta.tables import DeltaTable\ndt = DeltaTable.forPath(spark, '/path/to/table')\ndt.optimize().executeZOrderBy('event_date','customer_id')");

  // ====================== SECTION 3: DELTA LAKE ======================
  sectionHeader("3. Delta Lake & ACID Transactions", [70,130,180]);

  subHeader("Delta Lake Core Concepts");
  bullet([
    "Delta Lake adds ACID transactions on top of Parquet files using a transaction log (_delta_log/).",
    "Transaction Log: JSON files tracking all commits, adds, removes — basis for time travel.",
    "ACID: Atomicity (all-or-nothing), Consistency, Isolation (snapshot isolation), Durability.",
    "Schema Enforcement: Writes that violate schema are rejected by default.",
    "Schema Evolution: ALTER TABLE or mergeSchema option to evolve schema safely.",
  ]);

  subHeader("Key Delta Operations");
  keyValueTable([
    ["MERGE (Upsert)", "Update matching rows, insert new rows, optionally delete in one atomic operation"],
    ["OPTIMIZE", "Compacts small files into larger Parquet files for faster reads"],
    ["ZORDER BY", "Co-locates related data to enable effective data skipping with file-level statistics"],
    ["VACUUM", "Removes old data files no longer referenced. Default retention: 7 days"],
    ["Time Travel", "Query historical versions: VERSION AS OF n or TIMESTAMP AS OF 'date'"],
    ["RESTORE", "Roll back table to a previous version or timestamp"],
    ["CDF (Change Data Feed)", "Track row-level changes (insert/update/delete) for incremental processing"],
  ]);
  codeBlock("-- MERGE example\nMERGE INTO target t\nUSING source s ON t.id = s.id\nWHEN MATCHED THEN UPDATE SET *\nWHEN NOT MATCHED THEN INSERT *\nWHEN NOT MATCHED BY SOURCE THEN DELETE;\n\n-- Time Travel\nSELECT * FROM table VERSION AS OF 5;\nSELECT * FROM table TIMESTAMP AS OF '2024-01-01';");

  subHeader("Medallion Architecture");
  bullet([
    "Bronze: Raw ingestion layer. Stores data as-is from source systems. Schema-on-read.",
    "Silver: Cleaned, deduplicated, conformed data. Joins and light transformations applied.",
    "Gold: Business-level aggregates, dimensional models, serving layer for BI/ML.",
    "Each layer is a Delta table; data flows Bronze→Silver→Gold via incremental pipelines.",
  ]);

  // ====================== SECTION 4: DATABRICKS ======================
  sectionHeader("4. Databricks Platform", [150,70,200]);

  subHeader("Unity Catalog");
  bullet([
    "Unified governance layer for all data assets (tables, volumes, models, files) across workspaces.",
    "3-level namespace: catalog.schema.table (e.g., prod.finance.transactions).",
    "Fine-grained access control: Column-level security, row-level filters, data masking.",
    "Lineage tracking: Automatic column-level lineage across notebooks, jobs, dashboards.",
    "Audit logs: All data access events captured for compliance.",
    "Replaces workspace-level Hive metastore — enables cross-workspace data sharing.",
  ]);

  subHeader("Service Principal Authentication vs Unity Catalog");
  bullet([
    "Service Principal: Azure AD / Entra ID application used for automated jobs and pipelines.",
    "Use SP for: CI/CD pipelines, scheduled jobs, external applications accessing Databricks APIs.",
    "With SP: Grant SP access to Unity Catalog resources (GRANT SELECT ON TABLE x TO sp_name).",
    "Unity Catalog centralises permissions — SPs authenticate via OAuth tokens, not personal PATs.",
    "Best practice: One SP per team/environment (dev/prod). Rotate secrets via Key Vault integration.",
  ]);
  codeBlock("# Mount using Service Principal (legacy - avoid with UC)\ndbutils.fs.mount(\n  source='abfss://container@storage.dfs.core.windows.net/',\n  mount_point='/mnt/datalake',\n  extra_configs={\n    'fs.azure.account.auth.type': 'OAuth',\n    'fs.azure.account.oauth.provider.type': '...ClientCredsTokenProvider',\n    'fs.azure.account.oauth2.client.id': '<app-id>',\n    'fs.azure.account.oauth2.client.secret': dbutils.secrets.get('scope','secret'),\n    'fs.azure.account.oauth2.client.endpoint': 'https://login.microsoftonline.com/<tenant>/oauth2/token'\n  }\n)");

  subHeader("DBFS vs Volumes (Unity Catalog)");
  bullet([
    "DBFS (Databricks File System): Virtual filesystem overlaying cloud storage. Legacy approach.",
    "DBFS paths: /dbfs/ or dbfs:/ — workspace-scoped, no Unity Catalog governance.",
    "Volumes (UC): First-class citizens in Unity Catalog. catalog.schema.volume path.",
    "Volumes support: External volumes (existing ADLS/S3) and managed volumes.",
    "Use Volumes for: Unstructured files, ML artifacts, CSV/JSON ingestion with UC governance.",
    "Migration: Move from DBFS mounts to External Volumes for UC compliance.",
  ]);
  codeBlock("# Unity Catalog Volume access\ndf = spark.read.csv('/Volumes/prod/raw/landing/data.csv')\n\n# dbutils with volumes\ndbutils.fs.ls('/Volumes/prod/raw/landing/')");

  subHeader("Delta Live Tables (DLT)");
  bullet([
    "Declarative ETL framework built on Delta Lake. Define pipelines as @dlt.table decorators.",
    "Automatic lineage, quality enforcement with CONSTRAINT, and incremental/full refresh modes.",
    "Supports STREAMING TABLE (incremental) and LIVE TABLE (materialised view).",
    "Auto-scaling: DLT manages cluster sizing based on data volume.",
  ]);

  // ====================== SECTION 5: SNOWFLAKE ======================
  sectionHeader("5. Snowflake Architecture", PDF_COLORS.sql);

  subHeader("Multi-Cluster Shared Data Architecture");
  bullet([
    "Layer 1 – Cloud Services: Authentication, query parsing, optimisation, transaction management, metadata.",
    "Layer 2 – Query Processing (Virtual Warehouses): MPP compute clusters that execute queries.",
    "Layer 3 – Database Storage: Compressed, columnar micro-partitions stored in cloud object storage (S3/ADLS/GCS).",
    "Compute and storage are fully decoupled — scale independently.",
  ]);

  subHeader("Virtual Warehouses");
  bullet([
    "Each VW is an independently-scalable MPP cluster (T-shirt sizes: XS→6XL).",
    "Multi-cluster: Auto-scale out/in additional clusters based on concurrency.",
    "Auto-suspend and Auto-resume: VW suspends after inactivity, resumes on next query.",
    "No charge while suspended. Charged per second (minimum 60 seconds) when running.",
  ]);

  subHeader("Micro-Partitions");
  bullet([
    "Snowflake automatically divides all data into immutable micro-partitions (50-500MB uncompressed).",
    "Columnar storage with statistical metadata per column per partition (min, max, null count).",
    "Partition Pruning: Query optimizer uses metadata to skip entire micro-partitions.",
    "No manual partitioning needed — Snowflake handles it automatically.",
    "Clustering Keys: For large tables, define clustering on frequently-queried columns to improve pruning.",
  ]);

  subHeader("Snowflake Key Features");
  keyValueTable([
    ["Time Travel",         "Query historical data up to 90 days (Enterprise). TIMESTAMP/OFFSET/STATEMENT syntax"],
    ["Fail-Safe",           "7-day disaster recovery window after Time Travel expires (non-queryable)"],
    ["Zero-Copy Clone",     "Instant clone of table/schema/DB sharing underlying storage — no data duplication"],
    ["Data Sharing",        "Share live data across accounts without copying — using Secure Views and listings"],
    ["Streams",             "CDC mechanism — captures DML changes (insert/update/delete) on table"],
    ["Tasks",               "Scheduled SQL/stored-procedure execution. Chain tasks for DAG-like pipelines"],
    ["Dynamic Data Masking","Policy-based column masking for PII protection based on user role"],
    ["Row Access Policies", "Row-level security — filter rows based on user/role mapping"],
    ["Search Optimization", "Point lookup speed-up for high-cardinality string/variant columns"],
  ]);
  codeBlock("-- Zero-copy clone\nCREATE TABLE sales_dev CLONE sales_prod;\n\n-- Stream + Task pipeline\nCREATE STREAM orders_stream ON TABLE orders;\nCREATE TASK process_orders\n  WAREHOUSE = compute_wh\n  SCHEDULE = '5 MINUTE'\n  WHEN SYSTEM$STREAM_HAS_DATA('orders_stream')\nAS\n  INSERT INTO orders_processed SELECT * FROM orders_stream WHERE METADATA$ACTION = 'INSERT';");

  // ====================== SECTION 6: DATA MODELING ======================
  sectionHeader("6. Data Modeling & Design Patterns", [100,160,80]);

  subHeader("SCD Types");
  bullet([
    "SCD Type 1 – Overwrite: No history kept. Simple UPDATE on change.",
    "SCD Type 2 – Full History: New row added per change. Adds effective_date, expiry_date, is_current flag.",
    "SCD Type 3 – Previous Value: Adds 'previous_value' column. Limited history.",
    "SCD Type 4: Separate history table. Current values in main table.",
    "SCD Type 6: Hybrid (1+2+3). Most complex, most flexible.",
  ]);

  subHeader("Kimball vs Inmon");
  keyValueTable([
    ["Kimball (Bottom-up)", "Star/Snowflake schemas. Data marts first. Easier for analysts. Denormalised."],
    ["Inmon (Top-down)",    "Enterprise-wide 3NF data warehouse first. Data marts downstream. Normalised."],
    ["Data Vault",          "Hub-Satellite-Link model. Highly scalable, auditable, insert-only. Complex queries."],
    ["One Big Table (OBT)", "Fully denormalised. Fast queries. High storage. Good for ML feature stores."],
  ]);

  // ====================== SECTION 7: STREAMING ======================
  sectionHeader("7. Kafka & Spark Structured Streaming", [200,100,50]);

  subHeader("Kafka Core Concepts");
  bullet([
    "Producer → Topic (partitioned) → Consumer Group pattern.",
    "Partition: ordered, immutable sequence of records. Basis for parallelism.",
    "Consumer Group: each partition consumed by exactly one consumer per group. Scale by adding consumers.",
    "Offsets: position in partition. Consumers commit offsets for exactly-once or at-least-once semantics.",
    "Retention: Configurable time/size based. Default 7 days.",
    "Log Compaction: Keep only the latest record per key (good for CDC/changelogs).",
  ]);

  subHeader("Spark Structured Streaming");
  bullet([
    "Treat a data stream as an unbounded table. New data = appending rows.",
    "Trigger modes: default (micro-batch), Trigger.ProcessingTime, Trigger.Once, Trigger.AvailableNow.",
    "Output modes: append, update, complete.",
    "Checkpointing: Saves query progress to fault-tolerant storage for exactly-once semantics.",
    "Watermarking: Handle late data: withWatermark('timestamp','10 minutes')",
    "State management: Stateful operations (groupBy, join) maintain state store per partition.",
  ]);
  codeBlock("df = spark.readStream.format('kafka')\\\n    .option('kafka.bootstrap.servers','broker:9092')\\\n    .option('subscribe','orders')\\\n    .load()\n\nresult = df.selectExpr('CAST(value AS STRING)')\\\n    .withWatermark('timestamp','10 minutes')\\\n    .groupBy(window('timestamp','5 minutes'),'status').count()\n\nresult.writeStream.format('delta')\\\n    .outputMode('update')\\\n    .option('checkpointLocation','/checkpoints/orders')\\\n    .start()");

  // ====================== SECTION 8: CLOUD PLATFORMS ======================
  sectionHeader("8. Cloud Data Platforms", [50,150,200]);

  subHeader("AWS Data Stack");
  bullet([
    "S3: Object storage. Foundation of AWS data lake. Versioning, lifecycle policies, intelligent tiering.",
    "Glue: Serverless ETL (PySpark). Glue Catalog = Hive metastore. Glue Crawlers auto-infer schema.",
    "Redshift: MPP data warehouse. Columnar storage. Spectrum for S3 query. RA3 nodes with managed storage.",
    "EMR: Managed Hadoop/Spark clusters. Good for complex ETL workloads.",
    "Athena: Serverless SQL over S3 using Presto. Pay-per-query. Good for ad-hoc analysis.",
    "Kinesis: Real-time streaming (Data Streams, Firehose, Analytics).",
    "Lake Formation: Centralised data lake governance and fine-grained access control.",
  ]);

  subHeader("Azure Data Stack");
  bullet([
    "ADLS Gen2: Hierarchical namespace S3-equivalent. Foundation for Azure Data Lake.",
    "Azure Databricks: Fully managed Databricks on Azure. Integrates with ADLS/Key Vault/AAD.",
    "Azure Synapse Analytics: All-in-one: SQL pools (Dedicated/Serverless), Spark pools, Pipelines.",
    "Azure Data Factory: Orchestration and ETL service. 90+ connectors. Integration Runtime.",
    "Azure Event Hubs: Kafka-compatible streaming ingestion (10M events/second).",
    "Azure Purview (Microsoft Purview): Data catalog, lineage, classification (= Azure's Unity Catalog equiv.).",
  ]);

  // ====================== SECTION 9: DATA QUALITY ======================
  sectionHeader("9. Data Quality, Testing & Observability", [180,120,20]);

  subHeader("Data Quality Dimensions");
  bullet([
    "Completeness: No unexpected NULLs or missing records.",
    "Accuracy: Values conform to expected ranges and business rules.",
    "Consistency: Same data looks the same across systems.",
    "Timeliness: Data arrives within expected SLA windows.",
    "Uniqueness: No duplicate rows on defined keys.",
    "Validity: Values match expected formats, enums, referential integrity.",
  ]);

  subHeader("Tools & Approaches");
  keyValueTable([
    ["Great Expectations", "Open-source data validation framework. Expectation suites, Data Docs, checkpoints"],
    ["dbt Tests",          "Built-in: unique, not_null, accepted_values, relationships. Custom SQL tests"],
    ["Delta Constraints",  "CONSTRAINT name CHECK(condition) enforced on write to Delta tables"],
    ["DLT Quality",        "CONSTRAINT in Delta Live Tables — quarantine or fail on violations"],
    ["Monte Carlo",        "ML-based data observability. Anomaly detection, lineage, incident management"],
    ["Soda",               "YAML-based data quality checks. Integrates with Airflow/dbt"],
  ]);

  // ====================== SECTION 10: PERFORMANCE ======================
  sectionHeader("10. Performance Tuning & Cost Optimization", [150,100,200]);

  subHeader("Spark Performance Checklist");
  bullet([
    "Enable AQE: spark.sql.adaptive.enabled=true (auto-optimises shuffle partitions, handles skew, converts to broadcast).",
    "Tune shuffle partitions: spark.sql.shuffle.partitions based on data volume (not always 200).",
    "Prefer DataFrame/SQL API over RDD (benefits from Catalyst + Tungsten).",
    "Avoid UDFs when SQL functions exist — UDFs bypass Catalyst optimisation.",
    "Use Pandas UDFs (Arrow-based) when Python UDFs are necessary.",
    "Avoid collect() on large DataFrames — brings all data to driver.",
    "Filter early (predicate pushdown) and select only needed columns (projection pushdown).",
    "Cache intermediate results used more than once.",
    "Partition by write key columns to enable partition pruning on read.",
  ]);

  subHeader("Snowflake Cost Optimization");
  bullet([
    "Right-size virtual warehouses: Start small, monitor queue/spill, scale up only when needed.",
    "Auto-suspend quickly: Set to 1-5 minutes for dev/test warehouses.",
    "Use clustering keys on large tables for aggressive partition pruning.",
    "Materialised Views: Pre-compute expensive queries, refreshed automatically.",
    "Result Cache: Snowflake caches query results 24 hours — identical queries cost 0 credits.",
    "Storage: Compress data. Use transient tables for temporary data (no Fail-Safe charges).",
    "Resource Monitors: Set credit alerts per warehouse/account to prevent surprise bills.",
  ]);

  // ====================== SECTION 11: Q&A ======================
  sectionHeader("11. Must-Know Interview Q&A (6-8 Years)", PDF_COLORS.red);

  const qas = [
    ["Q: What is the difference between repartition() and coalesce()?",
     "repartition(n) performs a full shuffle (expensive) and can increase or decrease partition count. coalesce(n) avoids full shuffle by merging partitions (cannot increase). Use coalesce before writing to reduce small files."],
    ["Q: Explain Spark's lazy evaluation. Why is it important?",
     "Transformations (filter, select, join) build a DAG but don't execute. Only actions (count, show, write) trigger execution. This allows Catalyst to optimise the full plan before execution — predicate pushdown, column pruning, join reordering."],
    ["Q: What is data skewness and how do you handle it?",
     "Skewness = uneven data distribution — some partitions have far more data. Symptoms: task stragglers in Spark UI. Solutions: (1) Salting + small-table replication, (2) AQE with skew join handling, (3) Increasing shuffle partitions, (4) Repartitioning by a better key."],
    ["Q: What is Z-Ordering in Delta Lake?",
     "Z-Ordering clusters data by interleaving bit values of multiple columns. OPTIMIZE ... ZORDER BY (col1, col2). Enables Delta to skip files not containing relevant values when filtering on those columns. Best for high-cardinality columns used in WHERE clauses."],
    ["Q: Broadcast join vs Sort-Merge join — when to use each?",
     "Broadcast join: one side < 10MB (default). No shuffle — small table sent to all executors. Best for fact-dimension joins. Sort-Merge join: both tables large. Both sides sorted and merged. Required for large-large joins. Force broadcast with F.broadcast() hint."],
    ["Q: What is Unity Catalog and how does it differ from Hive metastore?",
     "Unity Catalog is Databricks' unified governance layer. 3-level namespace (catalog.schema.table). Column-level security, row filters, automatic lineage, cross-workspace access, audit logs. Hive metastore is workspace-scoped, lacks column-level security and lineage."],
    ["Q: Explain Delta Lake's MERGE operation.",
     "MERGE performs an atomic upsert: WHEN MATCHED THEN UPDATE, WHEN NOT MATCHED THEN INSERT, WHEN NOT MATCHED BY SOURCE THEN DELETE. Uses the Delta transaction log to ensure atomicity. Commonly used for SCD Type 1, deduplication, CDC application."],
    ["Q: What are Snowflake Streams and Tasks?",
     "Streams track DML changes on a table (CDC). They capture inserts, updates, deletes with METADATA$ACTION column. Tasks are scheduled SQL/stored procedure jobs. Combine them: Task triggers when SYSTEM$STREAM_HAS_DATA() = true, consumes stream to build incremental pipelines."],
    ["Q: How does Snowflake's virtual warehouse pricing work?",
     "Billed by credit/second while running (minimum 60 seconds per start). Credits depend on warehouse size. Auto-suspend stops billing when idle. Use Resource Monitors to cap spend. Serverless features (Snowpipe, Tasks) billed separately per compute second."],
    ["Q: What is the Medallion Architecture?",
     "Bronze (raw) → Silver (cleansed/conformed) → Gold (business aggregates). Each layer is a Delta table. Bronze stores raw data as-is. Silver applies deduplication, type casting, joins. Gold contains aggregations and KPIs used by BI/ML. Enables incremental processing at each layer."],
    ["Q: Explain ACID in Delta Lake context.",
     "Atomicity: all files in a transaction commit or none do. Consistency: schema enforcement prevents bad writes. Isolation: concurrent readers/writers use snapshot isolation (no dirty reads). Durability: transaction log in durable storage — survives failures."],
    ["Q: How would you optimise a slow Spark job?",
     "1) Check Spark UI for skew, spill, GC. 2) Enable AQE. 3) Tune shuffle partitions. 4) Identify and broadcast small tables. 5) Cache reused DataFrames. 6) Partition by write key. 7) Avoid Python UDFs — use SQL/DataFrame API. 8) Increase executor memory if spilling."],
    ["Q: What is Change Data Capture (CDC) and how do you implement it?",
     "CDC captures row-level changes from source systems. Approaches: (1) Timestamp-based polling, (2) Log-based (Debezium reading DB transaction logs → Kafka), (3) Delta Lake CDF (spark.readStream.option('readChangeFeed','true')), (4) Snowflake Streams."],
    ["Q: Difference between watermark and window in Spark Streaming?",
     "Window: defines a time range for grouping events (tumbling, sliding, session). Watermark: defines how late data is tolerated before being dropped. withWatermark('ts','10 minutes') tells Spark to wait 10 minutes for late events before finalising a window result."],
    ["Q: What is Spark's Structured Streaming exactly-once guarantee?",
     "Achieved via checkpointing + idempotent sinks. Checkpoint stores offsets and state in persistent storage. On restart, Spark reprocesses from last committed offset. Sink must be idempotent (Delta Lake, Kafka with transactional producers). Output mode and trigger affect guarantee."],
    ["Q: How do you handle small files problem in Delta Lake?",
     "Small files reduce read performance (many file open/close operations). Solutions: (1) OPTIMIZE command to compact files (target 1GB Parquet). (2) Set spark.databricks.delta.optimizeWrite.enabled=true for automatic file sizing on write. (3) Auto Optimize on Delta tables. (4) Use coalesce before writing."],
  ];

  qas.forEach(([q, a], i) => {
    ensureSpace(25);
    // Question
    doc.setFillColor(...PDF_COLORS.darkBg2);
    doc.rect(LM, y, PW, 8, "F");
    doc.setFillColor(...PDF_COLORS.accent);
    doc.rect(LM, y, 2, 8, "F");
    doc.setTextColor(...PDF_COLORS.accent);
    doc.setFontSize(8);
    doc.setFont("helvetica","bold");
    const qLines = doc.splitTextToSize(q, PW-6);
    doc.text(qLines, LM+5, y+5);
    y += 8 + (qLines.length-1)*LH + 1;

    // Answer
    const aLines = doc.splitTextToSize(a, PW-6);
    const aH = aLines.length * LH + 4;
    ensureSpace(aH + 6);
    doc.setFillColor(...PDF_COLORS.darkBg3);
    doc.rect(LM, y, PW, aH, "F");
    doc.setTextColor(...PDF_COLORS.text);
    doc.setFontSize(8);
    doc.setFont("helvetica","normal");
    doc.text(aLines, LM+5, y+LH);
    y += aH + 6;
  });

  addFooter(doc);
  doc.save("DE_Interview_Theory_Guide.pdf");
}

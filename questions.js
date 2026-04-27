/* ============================================================
   QUESTION BANK — 100+ MNC real interview questions per subject
   Sources: FAANG, Databricks, Snowflake, Amazon, Microsoft,
   Google, Uber, LinkedIn, Netflix, LeetCode SQL50, StrataScratch,
   DataLemur, Apache Spark docs, Databricks Academy, open GitHub repos.
   Random 10 per subject drawn each exam session (3E/4M/3H mix).
   ============================================================ */

const QUESTIONS = {

/* =================== PYTHON =================== */
python: [
  // ---- EASY ----
  { id:"py_e1", subject:"python", difficulty:"easy", title:"Sum Without Built-in",
    description:`Write a function \`sum_list\` that sums a list of integers WITHOUT using built-in sum().`,
    example:`Input: [1,2,3,4,5]\nOutput: 15`,
    starterCode:`def sum_list(nums):\n    # your code\n    pass\n\nprint(sum_list([1,2,3,4,5]))`,
    expectedOutput:"15", validator:o=>matchExact(o,"15") },

  { id:"py_e2", subject:"python", difficulty:"easy", title:"Reverse a String",
    description:`Write a function \`reverse_string\` that returns a string reversed.`,
    example:`Input: "hello"\nOutput: "olleh"`,
    starterCode:`def reverse_string(s):\n    pass\n\nprint(reverse_string("hello"))`,
    expectedOutput:"olleh", validator:o=>matchExact(o,"olleh") },

  { id:"py_e3", subject:"python", difficulty:"easy", title:"Count Vowels",
    description:`Write \`count_vowels\` — count vowels (a,e,i,o,u, case-insensitive) in a string.`,
    example:`Input: "Hello World"\nOutput: 3`,
    starterCode:`def count_vowels(s):\n    pass\n\nprint(count_vowels("Hello World"))`,
    expectedOutput:"3", validator:o=>matchExact(o,"3") },

  { id:"py_e4", subject:"python", difficulty:"easy", title:"FizzBuzz 1-20",
    description:`Print 1-20. Multiples of 3 print "Fizz", 5 print "Buzz", both print "FizzBuzz".`,
    example:`1\n2\nFizz\n...\nFizzBuzz`,
    starterCode:`for i in range(1,21):\n    pass`,
    expectedOutput:"1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz",
    validator:o=>matchExact(o,"1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz") },

  { id:"py_e5", subject:"python", difficulty:"easy", title:"Find Maximum",
    description:`Write \`find_max\` returning max value from a list without using max().`,
    example:`Input: [3,1,4,1,5,9,2,6]\nOutput: 9`,
    starterCode:`def find_max(nums):\n    pass\n\nprint(find_max([3,1,4,1,5,9,2,6]))`,
    expectedOutput:"9", validator:o=>matchExact(o,"9") },

  { id:"py_e6", subject:"python", difficulty:"easy", title:"Palindrome Check",
    description:`Write \`is_palindrome\` — True if string reads same forwards/backwards (case-insensitive).`,
    example:`Input: "Racecar"\nOutput: True`,
    starterCode:`def is_palindrome(s):\n    pass\n\nprint(is_palindrome("Racecar"))`,
    expectedOutput:"True", validator:o=>matchExact(o,"True") },

  { id:"py_e7", subject:"python", difficulty:"easy", title:"Remove Duplicates",
    description:`Write \`remove_dupes\` that removes duplicates preserving order.`,
    example:`Input: [1,2,2,3,4,4,5]\nOutput: [1, 2, 3, 4, 5]`,
    starterCode:`def remove_dupes(lst):\n    pass\n\nprint(remove_dupes([1,2,2,3,4,4,5]))`,
    expectedOutput:"[1, 2, 3, 4, 5]", validator:o=>matchExact(o,"[1, 2, 3, 4, 5]") },

  { id:"py_e8", subject:"python", difficulty:"easy", title:"Check Anagram",
    description:`Write \`is_anagram\` — True if two strings are anagrams (case-insensitive).`,
    example:`Input: "listen", "silent"\nOutput: True`,
    starterCode:`def is_anagram(s1, s2):\n    pass\n\nprint(is_anagram("listen","silent"))`,
    expectedOutput:"True", validator:o=>matchExact(o,"True") },

  { id:"py_e9", subject:"python", difficulty:"easy", title:"Factorial Recursive",
    description:`Write recursive \`factorial(n)\` returning n!.`,
    example:`Input: 6\nOutput: 720`,
    starterCode:`def factorial(n):\n    pass\n\nprint(factorial(6))`,
    expectedOutput:"720", validator:o=>matchExact(o,"720") },

  { id:"py_e10", subject:"python", difficulty:"easy", title:"Count Words",
    description:`Write \`count_words\` counting total words in a sentence.`,
    example:`Input: "the quick brown fox"\nOutput: 4`,
    starterCode:`def count_words(s):\n    pass\n\nprint(count_words("the quick brown fox"))`,
    expectedOutput:"4", validator:o=>matchExact(o,"4") },

  { id:"py_e11", subject:"python", difficulty:"easy", title:"Square Each Element",
    description:`Write \`square_list\` using list comprehension — return squares of all elements.`,
    example:`Input: [1,2,3,4,5]\nOutput: [1, 4, 9, 16, 25]`,
    starterCode:`def square_list(nums):\n    return []\n\nprint(square_list([1,2,3,4,5]))`,
    expectedOutput:"[1, 4, 9, 16, 25]", validator:o=>matchExact(o,"[1, 4, 9, 16, 25]") },

  { id:"py_e12", subject:"python", difficulty:"easy", title:"Merge Two Dicts",
    description:`Write \`merge_dicts\` merging two dicts; duplicate keys take value from second dict.`,
    example:`Input: {"a":1,"b":2}, {"b":3,"c":4}\nOutput: {'a': 1, 'b': 3, 'c': 4}`,
    starterCode:`def merge_dicts(d1, d2):\n    pass\n\nprint(merge_dicts({"a":1,"b":2},{"b":3,"c":4}))`,
    expectedOutput:"{'a': 1, 'b': 3, 'c': 4}", validator:o=>matchExact(o,"{'a': 1, 'b': 3, 'c': 4}") },

  { id:"py_e13", subject:"python", difficulty:"easy", title:"Check Prime",
    description:`Write \`is_prime(n)\` returning True if n is prime.`,
    example:`is_prime(17) → True\nis_prime(4) → False`,
    starterCode:`def is_prime(n):\n    pass\n\nprint(is_prime(17))\nprint(is_prime(4))`,
    expectedOutput:"True\nFalse", validator:o=>matchExact(o,"True\nFalse") },

  { id:"py_e14", subject:"python", difficulty:"easy", title:"Second Largest",
    description:`Write \`second_largest\` returning the second largest unique value in a list.`,
    example:`Input: [3,1,4,1,5,9,2,6]\nOutput: 6`,
    starterCode:`def second_largest(nums):\n    pass\n\nprint(second_largest([3,1,4,1,5,9,2,6]))`,
    expectedOutput:"6", validator:o=>matchExact(o,"6") },

  // ---- MEDIUM ----
  { id:"py_m1", subject:"python", difficulty:"medium", title:"Two Sum",
    description:`Write \`two_sum\` returning indices [i,j] (i<j) of two numbers summing to target.`,
    example:`Input: [2,7,11,15], target=9\nOutput: [0, 1]`,
    starterCode:`def two_sum(nums, target):\n    pass\n\nprint(two_sum([2,7,11,15],9))`,
    expectedOutput:"[0, 1]", validator:o=>matchExact(o,"[0, 1]") },

  { id:"py_m2", subject:"python", difficulty:"medium", title:"Flatten Nested List",
    description:`Write \`flatten\` flattening one-level nested list without itertools.`,
    example:`Input: [[1,2],[3,4],[5]]\nOutput: [1, 2, 3, 4, 5]`,
    starterCode:`def flatten(lst):\n    pass\n\nprint(flatten([[1,2],[3,4],[5]]))`,
    expectedOutput:"[1, 2, 3, 4, 5]", validator:o=>matchExact(o,"[1, 2, 3, 4, 5]") },

  { id:"py_m3", subject:"python", difficulty:"medium", title:"Word Frequency Map",
    description:`Write \`word_freq\` returning sorted dict of word counts for "the cat sat on the mat".`,
    example:`Output: {'cat': 1, 'mat': 1, 'on': 1, 'sat': 1, 'the': 2}`,
    starterCode:`def word_freq(s):\n    pass\n\nresult = word_freq("the cat sat on the mat")\nprint(dict(sorted(result.items())))`,
    expectedOutput:"{'cat': 1, 'mat': 1, 'on': 1, 'sat': 1, 'the': 2}",
    validator:o=>matchExact(o,"{'cat': 1, 'mat': 1, 'on': 1, 'sat': 1, 'the': 2}") },

  { id:"py_m4", subject:"python", difficulty:"medium", title:"Even Squares",
    description:`Write \`even_squares\` using list comprehension — squares of even numbers only.`,
    example:`Input: [1,2,3,4,5,6]\nOutput: [4, 16, 36]`,
    starterCode:`def even_squares(nums):\n    return []\n\nprint(even_squares([1,2,3,4,5,6]))`,
    expectedOutput:"[4, 16, 36]", validator:o=>matchExact(o,"[4, 16, 36]") },

  { id:"py_m5", subject:"python", difficulty:"medium", title:"Group By Key",
    description:`Write \`group_by\` grouping list of (key,value) tuples into dict of lists.`,
    example:`Input: [("a",1),("b",2),("a",3),("b",4)]\nOutput: {'a': [1, 3], 'b': [2, 4]}`,
    starterCode:`def group_by(pairs):\n    pass\n\nprint(group_by([("a",1),("b",2),("a",3),("b",4)]))`,
    expectedOutput:"{'a': [1, 3], 'b': [2, 4]}", validator:o=>matchExact(o,"{'a': [1, 3], 'b': [2, 4]}") },

  { id:"py_m6", subject:"python", difficulty:"medium", title:"Top N Elements",
    description:`Write \`top_n\` returning N largest elements sorted descending.`,
    example:`Input: [4,1,7,2,9,3], n=3\nOutput: [9, 7, 4]`,
    starterCode:`def top_n(lst, n):\n    pass\n\nprint(top_n([4,1,7,2,9,3],3))`,
    expectedOutput:"[9, 7, 4]", validator:o=>matchExact(o,"[9, 7, 4]") },

  { id:"py_m7", subject:"python", difficulty:"medium", title:"Running Average",
    description:`Write \`running_avg\` returning list of running averages.`,
    example:`Input: [1,2,3,4,5]\nOutput: [1.0, 1.5, 2.0, 2.5, 3.0]`,
    starterCode:`def running_avg(nums):\n    pass\n\nprint(running_avg([1,2,3,4,5]))`,
    expectedOutput:"[1.0, 1.5, 2.0, 2.5, 3.0]", validator:o=>matchExact(o,"[1.0, 1.5, 2.0, 2.5, 3.0]") },

  { id:"py_m8", subject:"python", difficulty:"medium", title:"Rotate List by K",
    description:`Write \`rotate_list\` rotating list to right by K positions.`,
    example:`Input: [1,2,3,4,5], k=2\nOutput: [4, 5, 1, 2, 3]`,
    starterCode:`def rotate_list(lst, k):\n    pass\n\nprint(rotate_list([1,2,3,4,5],2))`,
    expectedOutput:"[4, 5, 1, 2, 3]", validator:o=>matchExact(o,"[4, 5, 1, 2, 3]") },

  { id:"py_m9", subject:"python", difficulty:"medium", title:"RLE Decode",
    description:`Write \`rle_decode\` decoding run-length encoded string e.g. "3a2b4c" → "aaabbcccc".`,
    example:`Input: "3a2b4c"\nOutput: "aaabbcccc"`,
    starterCode:`def rle_decode(s):\n    pass\n\nprint(rle_decode("3a2b4c"))`,
    expectedOutput:"aaabbcccc", validator:o=>matchExact(o,"aaabbcccc") },

  { id:"py_m10", subject:"python", difficulty:"medium", title:"Chunk List",
    description:`Write \`chunk_list\` splitting list into chunks of size n.`,
    example:`Input: [1,2,3,4,5,6,7], n=3\nOutput: [[1, 2, 3], [4, 5, 6], [7]]`,
    starterCode:`def chunk_list(lst, n):\n    pass\n\nprint(chunk_list([1,2,3,4,5,6,7],3))`,
    expectedOutput:"[[1, 2, 3], [4, 5, 6], [7]]", validator:o=>matchExact(o,"[[1, 2, 3], [4, 5, 6], [7]]") },

  { id:"py_m11", subject:"python", difficulty:"medium", title:"Transpose Matrix",
    description:`Write \`transpose\` transposing a 2D matrix.`,
    example:`Input: [[1,2,3],[4,5,6]]\nOutput: [[1, 4], [2, 5], [3, 6]]`,
    starterCode:`def transpose(matrix):\n    pass\n\nprint(transpose([[1,2,3],[4,5,6]]))`,
    expectedOutput:"[[1, 4], [2, 5], [3, 6]]", validator:o=>matchExact(o,"[[1, 4], [2, 5], [3, 6]]") },

  { id:"py_m12", subject:"python", difficulty:"medium", title:"Decorator – Validate Positive",
    description:`Write decorator \`validate_positive\` that prints "Invalid" if any arg is negative; else calls the function.\nDecorate \`apply_discount(price, pct)\` returning price*(1-pct/100).`,
    example:`apply_discount(100,20) → 80.0\napply_discount(-10,20) → Invalid`,
    starterCode:`def validate_positive(fn):\n    pass\n\n@validate_positive\ndef apply_discount(price, discount):\n    return price*(1-discount/100)\n\nprint(apply_discount(100,20))\napply_discount(-10,20)`,
    expectedOutput:"80.0\nInvalid", validator:o=>matchExact(o,"80.0\nInvalid") },

  { id:"py_m13", subject:"python", difficulty:"medium", title:"Deep Flatten",
    description:`Write \`deep_flatten\` recursively flattening any depth of nested lists.`,
    example:`Input: [1,[2,[3,[4]],5]]\nOutput: [1, 2, 3, 4, 5]`,
    starterCode:`def deep_flatten(lst):\n    pass\n\nprint(deep_flatten([1,[2,[3,[4]],5]]))`,
    expectedOutput:"[1, 2, 3, 4, 5]", validator:o=>matchExact(o,"[1, 2, 3, 4, 5]") },

  { id:"py_m14", subject:"python", difficulty:"medium", title:"Implement my_zip",
    description:`Implement \`my_zip\` zipping two lists into list of tuples (up to shorter length).`,
    example:`Input: [1,2,3], ['a','b','c']\nOutput: [(1, 'a'), (2, 'b'), (3, 'c')]`,
    starterCode:`def my_zip(l1, l2):\n    pass\n\nprint(my_zip([1,2,3],['a','b','c']))`,
    expectedOutput:"[(1, 'a'), (2, 'b'), (3, 'c')]", validator:o=>matchExact(o,"[(1, 'a'), (2, 'b'), (3, 'c')]") },

  { id:"py_m15", subject:"python", difficulty:"medium", title:"Frequency Sort",
    description:`Sort elements by frequency ascending. Ties broken by value ascending.`,
    example:`Input: [4,5,6,5,4,3]\nOutput: [3, 6, 4, 4, 5, 5]`,
    starterCode:`def freq_sort(nums):\n    pass\n\nprint(freq_sort([4,5,6,5,4,3]))`,
    expectedOutput:"[3, 6, 4, 4, 5, 5]", validator:o=>matchExact(o,"[3, 6, 4, 4, 5, 5]") },

  // ---- HARD ----
  { id:"py_h1", subject:"python", difficulty:"hard", title:"LRU Cache",
    description:`Implement \`LRUCache\` (capacity=2): get(key)→value or -1; put() evicts LRU on overflow.`,
    example:`put(1,1);put(2,2);get(1)→1;put(3,3) evicts 2;get(2)→-1;get(3)→3`,
    hints:[
      "Use an OrderedDict from collections — it remembers insertion order.",
      "On get(), move the key to end with move_to_end(key) to mark it recently used.",
      "On put(), if at capacity call self.cache.popitem(last=False) to evict the oldest."
    ],
    starterCode:`class LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass\n\nc=LRUCache(2)\nc.put(1,1);c.put(2,2)\nprint(c.get(1))\nc.put(3,3)\nprint(c.get(2))\nprint(c.get(3))`,
    expectedOutput:"1\n-1\n3", validator:o=>matchExact(o,"1\n-1\n3") },

  { id:"py_h2", subject:"python", difficulty:"hard", title:"Merge K Sorted",
    description:`Write \`merge_sorted\` merging k sorted lists into one sorted list without sorted().`,
    example:`Input: [[1,4,7],[2,5,8],[3,6,9]]\nOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    hints:[
      "Use a min-heap (heapq). Push the first element from each list with its list index.",
      "import heapq; push (value, list_idx, element_idx). Pop minimum each step.",
      "After popping (val, li, ei), push (lists[li][ei+1], li, ei+1) if the next element exists."
    ],
    starterCode:`def merge_sorted(lists):\n    pass\n\nprint(merge_sorted([[1,4,7],[2,5,8],[3,6,9]]))`,
    expectedOutput:"[1, 2, 3, 4, 5, 6, 7, 8, 9]", validator:o=>matchExact(o,"[1, 2, 3, 4, 5, 6, 7, 8, 9]") },

  { id:"py_h3", subject:"python", difficulty:"hard", title:"Generator – Fibonacci",
    description:`Write generator \`fib_gen(n)\` yielding first n Fibonacci numbers.`,
    example:`n=8 → [0, 1, 1, 2, 3, 5, 8, 13]`,
    hints:[
      "Use yield instead of return — the function keeps its state between calls.",
      "Start with a, b = 0, 1 and yield a inside a loop.",
      "Update with a, b = b, a+b each iteration to advance the sequence."
    ],
    starterCode:`def fib_gen(n):\n    pass\n\nprint(list(fib_gen(8)))`,
    expectedOutput:"[0, 1, 1, 2, 3, 5, 8, 13]", validator:o=>matchExact(o,"[0, 1, 1, 2, 3, 5, 8, 13]") },

  { id:"py_h4", subject:"python", difficulty:"hard", title:"Stair Climbing DP",
    description:`Write memoised \`count_ways(n)\` counting ways to climb n stairs (1 or 2 steps).`,
    example:`count_ways(10) → 89`,
    hints:[
      "Base cases: count_ways(0) = 1, count_ways(1) = 1.",
      "Recurrence: count_ways(n) = count_ways(n-1) + count_ways(n-2).",
      "The @lru_cache decorator is already there — just add the base cases and recursive call."
    ],
    starterCode:`from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef count_ways(n):\n    pass\n\nprint(count_ways(10))`,
    expectedOutput:"89", validator:o=>matchExact(o,"89") },

  { id:"py_h5", subject:"python", difficulty:"hard", title:"Context Manager",
    description:`Implement class \`Timer\` context manager. On exit print "Done". Compute sum(range(100)) inside the with block.`,
    example:`x = 4950\nDone`,
    hints:[
      "__enter__ is called on entering the 'with' block — return self or nothing.",
      "__exit__(self, exc_type, exc_val, exc_tb) is called on exit — print 'Done' there.",
      "Return False (or None) from __exit__ to not suppress exceptions."
    ],
    starterCode:`class Timer:\n    def __enter__(self):\n        pass\n    def __exit__(self, *args):\n        pass\n\nwith Timer():\n    x = sum(range(100))\n    print(x)`,
    expectedOutput:"4950\nDone", validator:o=>matchExact(o,"4950\nDone") },

  { id:"py_h6", subject:"python", difficulty:"hard", title:"Sliding Window Max",
    description:`Write \`sliding_window_max\` returning max of every window of size k.`,
    example:`Input: [1,3,-1,-3,5,3,6,7], k=3\nOutput: [3, 3, 5, 5, 6, 7]`,
    hints:[
      "Use a collections.deque to store indices. Keep the deque in decreasing order of values.",
      "Before adding index i, pop from the right while nums[deque[-1]] <= nums[i].",
      "The front of the deque (deque[0]) is always the max. Pop front if it's out of the window (i - deque[0] >= k)."
    ],
    starterCode:`def sliding_window_max(nums, k):\n    pass\n\nprint(sliding_window_max([1,3,-1,-3,5,3,6,7],3))`,
    expectedOutput:"[3, 3, 5, 5, 6, 7]", validator:o=>matchExact(o,"[3, 3, 5, 5, 6, 7]") },

  { id:"py_h7", subject:"python", difficulty:"hard", title:"MapReduce Simulation",
    description:`Implement \`map_reduce(data, map_fn, reduce_fn)\` applying map then folding with reduce.`,
    example:`map_reduce([1,2,3,4,5], x*2, a+b) → 30`,
    hints:[
      "Step 1: apply map_fn to each element — use Python's built-in map().",
      "Step 2: fold the mapped results with reduce_fn using functools.reduce.",
      "from functools import reduce; return reduce(reduce_fn, map(map_fn, data))."
    ],
    starterCode:`def map_reduce(data, map_fn, reduce_fn):\n    pass\n\nresult = map_reduce([1,2,3,4,5], lambda x:x*2, lambda a,b:a+b)\nprint(result)`,
    expectedOutput:"30", validator:o=>matchExact(o,"30") },

  { id:"py_h8", subject:"python", difficulty:"hard", title:"LCS Length",
    description:`Write \`lcs_length\` returning length of Longest Common Subsequence of two strings.`,
    example:`Input: "ABCBDAB", "BDCAB"\nOutput: 4`,
    hints:[
      "Build a 2D DP table dp[i][j] of size (len(s1)+1) × (len(s2)+1).",
      "If s1[i-1]==s2[j-1], then dp[i][j] = dp[i-1][j-1] + 1.",
      "Otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Return dp[-1][-1]."
    ],
    starterCode:`def lcs_length(s1, s2):\n    pass\n\nprint(lcs_length("ABCBDAB","BDCAB"))`,
    expectedOutput:"4", validator:o=>matchExact(o,"4") },

  { id:"py_h9", subject:"python", difficulty:"hard", title:"Batch Processor",
    description:`Write \`batch_process(records, batch_size, fn)\` processing records in batches, applying fn to each batch.`,
    example:`batch_process([1..10], 3, sum) → [6, 15, 24, 10]`,
    hints:[
      "Iterate with a step: for i in range(0, len(records), batch_size).",
      "Slice each batch: records[i : i+batch_size].",
      "Apply fn to each slice and collect results in a list: return [fn(records[i:i+batch_size]) for i in ...]."
    ],
    starterCode:`def batch_process(records, batch_size, fn):\n    pass\n\nresult = batch_process(list(range(1,11)), 3, sum)\nprint(result)`,
    expectedOutput:"[6, 15, 24, 10]", validator:o=>matchExact(o,"[6, 15, 24, 10]") },

  { id:"py_h10", subject:"python", difficulty:"hard", title:"Custom StepRange Iterator",
    description:`Implement class \`StepRange\` with __iter__ and __next__ iterating start to stop by step.`,
    example:`list(StepRange(0,10,3)) → [0, 3, 6, 9]`,
    hints:[
      "In __init__ store start, stop, step and set self.current = start.",
      "__iter__ should just return self.",
      "In __next__: if self.current >= self.stop raise StopIteration; else val=self.current; self.current+=self.step; return val."
    ],
    starterCode:`class StepRange:\n    def __init__(self, start, stop, step):\n        pass\n    def __iter__(self):\n        pass\n    def __next__(self):\n        pass\n\nprint(list(StepRange(0,10,3)))`,
    expectedOutput:"[0, 3, 6, 9]", validator:o=>matchExact(o,"[0, 3, 6, 9]") },

  { id:"py_h11", subject:"python", difficulty:"hard", title:"Floyd Cycle Detection",
    description:`Implement \`has_cycle(head)\` using Floyd's algorithm. Build linked list 1->2->3->4->2 (cycle).`,
    example:`has_cycle(head) → True`,
    hints:[
      "Use two pointers: slow moves 1 step, fast moves 2 steps per iteration.",
      "while fast and fast.next: slow=slow.next; fast=fast.next.next.",
      "If slow==fast at any point, there is a cycle — return True. If loop ends, return False."
    ],
    starterCode:`class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\ndef has_cycle(head):\n    pass\n\nn1=Node(1);n2=Node(2);n3=Node(3);n4=Node(4)\nn1.next=n2;n2.next=n3;n3.next=n4;n4.next=n2\nprint(has_cycle(n1))`,
    expectedOutput:"True", validator:o=>matchExact(o,"True") },

  { id:"py_h12", subject:"python", difficulty:"hard", title:"Functional Pipeline",
    description:`Write \`pipeline(*fns)\` returning function passing data through each fn in sequence.`,
    example:`p = pipeline(x*2, x+3, x**2)\np(5) → 169`,
    hints:[
      "You need to return a new function that applies each fn in order to the input.",
      "Use functools.reduce to chain the functions: reduce(lambda v, f: f(v), fns, x).",
      "Final result: return lambda x: reduce(lambda v,f: f(v), fns, x)."
    ],
    starterCode:`def pipeline(*fns):\n    pass\n\np = pipeline(lambda x:x*2, lambda x:x+3, lambda x:x**2)\nprint(p(5))`,
    expectedOutput:"169", validator:o=>matchExact(o,"169") },

  { id:"py_h13", subject:"python", difficulty:"hard", title:"Trie – Insert & Search",
    description:`Implement a Trie with insert and search methods. Insert: "apple","app". Search: "app"→True, "ap"→False.`,
    example:`search("app") → True\nsearch("ap") → False`,
    hints:[
      "self.root is a dict. Each node is also a dict. Use a special key like '#' to mark end of word.",
      "insert: node=self.root; for ch in word: node=node.setdefault(ch,{}); then node['#']=True.",
      "search: traverse chars into nested dicts; return True only if '#' is in the final node."
    ],
    starterCode:`class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word):\n        pass\n    def search(self, word):\n        pass\n\nt = Trie()\nt.insert("apple")\nt.insert("app")\nprint(t.search("app"))\nprint(t.search("ap"))`,
    expectedOutput:"True\nFalse", validator:o=>matchExact(o,"True\nFalse") },
],

/* =================== PYSPARK =================== */
pyspark: [
  // ---- EASY ----
  { id:"ps_e1", subject:"pyspark", difficulty:"easy", title:"Create DataFrame + printSchema",
    description:`Create a PySpark DataFrame from data below and print schema.\nData: [("Alice",30),("Bob",25),("Charlie",35)]\nColumns: name(string), age(long)`,
    example:`root\n |-- name: string\n |-- age: long`,
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Alice",30),("Bob",25),("Charlie",35)]\n# YOUR CODE HERE — create DataFrame with columns ["name","age"] and print schema`,
    expectedOutput:"root\n |-- name: string (nullable = true)\n |-- age: long (nullable = true)",
    validator:o=>matchExact(o,"root\n |-- name: string (nullable = true)\n |-- age: long (nullable = true)") },

  { id:"ps_e2", subject:"pyspark", difficulty:"easy", title:"Select & Filter",
    description:`Filter employees with salary > 50000. Show name and salary.`,
    example:`Alice 60000\nCharlie 75000`,
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Alice",60000),("Bob",45000),("Charlie",75000)]\ndf=spark.createDataFrame(data,["name","salary"])\n# YOUR CODE HERE — filter salary > 50000, select name and salary, show(truncate=False)`,
    expectedOutput:"Alice 60000\nCharlie 75000",
    validator:o=>matchTable(o,"Alice 60000\nCharlie 75000") },

  { id:"ps_e3", subject:"pyspark", difficulty:"easy", title:"GroupBy Sum",
    description:`Group by department, total sales as total_sales. Sort by department.`,
    example:`Finance 15000\nHR 12000\nIT 25000`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("IT",10000),("HR",5000),("IT",15000),("Finance",15000),("HR",7000)]\ndf=spark.createDataFrame(data,["department","sales"])\n# YOUR CODE HERE — groupBy department, sum sales as total_sales, orderBy department, show(truncate=False)`,
    expectedOutput:"Finance 15000\nHR 12000\nIT 25000",
    validator:o=>matchTable(o,"Finance 15000\nHR 12000\nIT 25000") },

  { id:"ps_e4", subject:"pyspark", difficulty:"easy", title:"Add Derived Column",
    description:`Add bonus column = salary * 0.10 and show DataFrame.`,
    example:`Alice 60000 6000.0\nBob 45000 4500.0`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndf=spark.createDataFrame([("Alice",60000),("Bob",45000)],["name","salary"])\n# YOUR CODE HERE — add column bonus = salary * 0.10 and show()`,
    expectedOutput:"Alice 60000 6000.0\nBob 45000 4500.0",
    validator:o=>matchTable(o,"Alice 60000 6000.0\nBob 45000 4500.0") },

  { id:"ps_e5", subject:"pyspark", difficulty:"easy", title:"Count Rows",
    description:`Print the count of a 5-row DataFrame.`,
    example:`Output: 5`,
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndf=spark.createDataFrame([("A",1),("B",2),("C",3),("D",4),("E",5)],["k","v"])\nprint(df.count())`,
    expectedOutput:"5", validator:o=>matchExact(o,"5") },

  { id:"ps_e6", subject:"pyspark", difficulty:"easy", title:"Rename Column",
    description:`Rename 'salary' to 'compensation' and show the DataFrame.`,
    example:`+-------+------------+`,
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndf=spark.createDataFrame([("Alice",60000),("Bob",45000)],["name","salary"])\n# YOUR CODE HERE — rename column salary to compensation and show()`,
    expectedOutput:"Alice 60000\nBob 45000",
    validator:o=>matchTable(o,"Alice 60000\nBob 45000") },

  { id:"ps_e7", subject:"pyspark", difficulty:"easy", title:"Drop Column",
    description:`Drop the 'age' column and print remaining columns.`,
    example:`['name', 'salary']`,
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndf=spark.createDataFrame([("Alice",30,60000)],["name","age","salary"])\nresult=df.drop("age")\nprint(result.columns)`,
    expectedOutput:"['name', 'salary']", validator:o=>matchExact(o,"['name', 'salary']") },

  { id:"ps_e8", subject:"pyspark", difficulty:"easy", title:"Distinct Count",
    description:`Remove duplicates and print distinct row count.`,
    example:`Output: 3`,
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("A",1),("B",2),("A",1),("C",3),("B",2)]\ndf=spark.createDataFrame(data,["k","v"])\nprint(df.distinct().count())`,
    expectedOutput:"3", validator:o=>matchExact(o,"3") },

  { id:"ps_e9", subject:"pyspark", difficulty:"easy", title:"OrderBy Multiple Columns",
    description:`Order the DataFrame by department ASC then salary DESC. Show result.`,
    example:`Engineering Alice 60000\nEngineering Charlie 90000 → Charlie then Alice after DESC sort`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Engineering","Alice",60000),("HR","Bob",55000),("Engineering","Charlie",90000)]\ndf=spark.createDataFrame(data,["dept","name","salary"])\n# YOUR CODE HERE — orderBy dept ASC, salary DESC, then show()`,
    expectedOutput:"Engineering Charlie 90000\nEngineering Alice 60000\nHR Bob 55000",
    validator:o=>matchTable(o,"Engineering Charlie 90000\nEngineering Alice 60000\nHR Bob 55000") },

  // ---- MEDIUM ----
  { id:"ps_m1", subject:"pyspark", difficulty:"medium", title:"Inner Join",
    description:`Inner join employees & departments on dept_id. Charlie has dept_id=99 which does not exist in departments, so he is excluded.\nShow name & dept_name for matched rows only.`,
    example:`Alice Engineering\nBob Marketing`,
    schema:[
      { name:"emp DataFrame", cols:["name STRING","dept_id INT"], rows:[["Alice",1],["Bob",2],["Charlie",99]] },
      { name:"dept DataFrame", cols:["dept_id INT","dept_name STRING"], rows:[[1,"Engineering"],[2,"Marketing"],[3,"HR"]] }
    ],
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\nemp=spark.createDataFrame([("Alice",1),("Bob",2),("Charlie",99)],["name","dept_id"])\ndept=spark.createDataFrame([(1,"Engineering"),(2,"Marketing"),(3,"HR")],["dept_id","dept_name"])\n# YOUR CODE HERE — inner join emp+dept on dept_id, then select name,dept_name and show(truncate=False)`,
    expectedOutput:"Alice Engineering\nBob Marketing",
    validator:o=>matchTable(o,"Alice Engineering\nBob Marketing") },

  { id:"ps_m2", subject:"pyspark", difficulty:"medium", title:"Window Row Number",
    description:`Add row_number rank within each department by salary DESC.\nResult should show all 3 employees with their rank within their dept (HR: Bob=1, IT: Charlie=1 Alice=2).`,
    example:`Charlie IT rank=1\nAlice IT rank=2`,
    schema:[
      { name:"employees DataFrame", cols:["dept STRING","name STRING","salary INT"], rows:[["IT","Alice",60000],["IT","Charlie",90000],["HR","Bob",55000]] }
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.window import Window\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("IT","Alice",60000),("IT","Charlie",90000),("HR","Bob",55000)]\ndf=spark.createDataFrame(data,["dept","name","salary"])\n# YOUR CODE HERE — window: partitionBy dept, orderBy salary DESC\n# add row_number() as rank, orderBy dept+rank, show(truncate=False)`,
    expectedOutput:"HR Bob 55000 1\nIT Charlie 90000 1\nIT Alice 60000 2",
    validator:o=>matchTable(o,"HR Bob 55000 1\nIT Charlie 90000 1\nIT Alice 60000 2") },

  { id:"ps_m3", subject:"pyspark", difficulty:"medium", title:"Handle Nulls",
    description:`Drop rows where name is null, fill null salary with 0. Show result.`,
    example:`Alice 60000\nBob 0`,
    starterCode:`from pyspark.sql import SparkSession\nfrom pyspark.sql.types import StructType,StructField,StringType,IntegerType\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\nschema=StructType([StructField("name",StringType()),StructField("salary",IntegerType())])\ndf=spark.createDataFrame([("Alice",60000),(None,45000),("Bob",None)],schema)\n# Step 1: drop rows where name is null (use dropna)\n# Step 2: fill null salary with 0 (use fillna)\n# Show result`,
    expectedOutput:"Alice 60000\nBob 0",
    validator:o=>matchTable(o,"Alice 60000\nBob 0") },

  { id:"ps_m4", subject:"pyspark", difficulty:"medium", title:"Pivot Table",
    description:`Pivot sales data so each row is a product and columns are quarters (Q1, Q2).\nUse groupBy(\"product\").pivot(\"quarter\").agg(F.sum(\"sales\")).`,
    example:`Laptop Q1=100 Q2=150\nPhone Q1=200 Q2=80`,
    schema:[
      { name:"sales DataFrame", cols:["product STRING","quarter STRING","sales INT"], rows:[["Laptop","Q1",100],["Laptop","Q2",150],["Phone","Q1",200],["Phone","Q2",80]] }
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Laptop","Q1",100),("Laptop","Q2",150),("Phone","Q1",200),("Phone","Q2",80)]\ndf=spark.createDataFrame(data,["product","quarter","sales"])\n# YOUR CODE HERE — groupBy product, pivot quarter, agg F.sum(sales), show()`,
    expectedOutput:"Laptop 100 150\nPhone 200 80",
    validator:o=>matchTable(o,"Laptop 100 150\nPhone 200 80") },

  { id:"ps_m5", subject:"pyspark", difficulty:"medium", title:"Salary Category UDF",
    description:`Write UDF \`categorize_salary\`: Low(<50k), Mid(50-80k), High(>80k). Apply as 'category'.`,
    example:`Alice 60000 Mid\nBob 40000 Low\nCharlie 90000 High`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.types import StringType\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Alice",60000),("Bob",40000),("Charlie",90000)]\ndf=spark.createDataFrame(data,["name","salary"])\n# Define UDF: salary < 50000 → Low, > 80000 → High, else → Mid\n# Apply as column 'category', show result`,
    expectedOutput:"Alice 60000 Mid\nBob 40000 Low\nCharlie 90000 High",
    validator:o=>matchTable(o,"Alice 60000 Mid\nBob 40000 Low\nCharlie 90000 High") },

  { id:"ps_m6", subject:"pyspark", difficulty:"medium", title:"Cumulative Sum",
    description:`Add a cum_sales column showing running total of sales by date within each region.\nUse Window.partitionBy(\"region\").orderBy(\"date\").rowsBetween(Window.unboundedPreceding, 0).`,
    example:`East 2024-01-01 100→100\nEast 2024-01-02 200→300`,
    schema:[
      { name:"sales DataFrame", cols:["region STRING","date STRING","sales INT"], rows:[["East","2024-01-01",100],["East","2024-01-02",200],["West","2024-01-01",150]] }
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.window import Window\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("East","2024-01-01",100),("East","2024-01-02",200),("West","2024-01-01",150)]\ndf=spark.createDataFrame(data,["region","date","sales"])\n# YOUR CODE HERE — window: partitionBy region, orderBy date, rowsBetween(unboundedPreceding,0)\n# add F.sum("sales").over(w) as cum_sales, show(truncate=False)`,
    expectedOutput:"East 2024-01-01 100 100\nEast 2024-01-02 200 300\nWest 2024-01-01 150 150",
    validator:o=>matchTable(o,"East 2024-01-01 100 100\nEast 2024-01-02 200 300\nWest 2024-01-01 150 150") },

  { id:"ps_m7", subject:"pyspark", difficulty:"medium", title:"Left Anti Join",
    description:`Find employees with NO matching department (left anti join).\nCharlie has dept_id=99 which does not exist in the dept DataFrame — he should be the only result.`,
    example:`Charlie (dept_id=99 not in departments)`,
    schema:[
      { name:"emp DataFrame", cols:["name STRING","dept_id INT"], rows:[["Alice",1],["Bob",2],["Charlie",99]] },
      { name:"dept DataFrame", cols:["dept_id INT","dept_name STRING"], rows:[[1,"Eng"],[2,"Mkt"]] }
    ],
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\nemp=spark.createDataFrame([("Alice",1),("Bob",2),("Charlie",99)],["name","dept_id"])\ndept=spark.createDataFrame([(1,"Eng"),(2,"Mkt")],["dept_id","dept_name"])\n# YOUR CODE HERE — left anti join emp on dept_id and show()`,
    expectedOutput:"Charlie 99",
    validator:o=>matchTable(o,"Charlie 99") },

  { id:"ps_m8", subject:"pyspark", difficulty:"medium", title:"Lag – Previous Salary",
    description:`Add prev_salary column using lag(\"salary\", 1) within each department ordered by name.\nAlice (IT) is first alphabetically → prev_salary=None. Charlie (IT) prev_salary=60000.`,
    example:`Alice(IT) prev=None\nCharlie(IT) prev=60000`,
    schema:[
      { name:"employees DataFrame", cols:["dept STRING","name STRING","salary INT"], rows:[["IT","Alice",60000],["IT","Charlie",90000],["HR","Bob",55000]] }
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.window import Window\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("IT","Alice",60000),("IT","Charlie",90000),("HR","Bob",55000)]\ndf=spark.createDataFrame(data,["dept","name","salary"])\n# YOUR CODE HERE — window: partitionBy dept, orderBy name\n# add F.lag("salary",1).over(w) as prev_salary, show()`,
    expectedOutput:"IT Alice 60000 None\nIT Charlie 90000 60000\nHR Bob 55000 None",
    validator:o=>matchTable(o,"IT Alice 60000 None\nIT Charlie 90000 60000\nHR Bob 55000 None") },

  { id:"ps_m9", subject:"pyspark", difficulty:"medium", title:"Broadcast Join",
    description:`Broadcast hint tells Spark to send the smaller table to all executors, avoiding a full shuffle.\nJoin emp with dept on dept_id using F.broadcast(dept). Show name, dept_id, dept_name.`,
    example:`result = emp.join(F.broadcast(dept),"dept_id")`,
    schema:[
      { name:"emp DataFrame", cols:["name STRING","dept_id INT"], rows:[["Alice",1],["Bob",2]] },
      { name:"dept DataFrame", cols:["dept_id INT","dept_name STRING"], rows:[[1,"Eng"],[2,"Mkt"]] }
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\nemp=spark.createDataFrame([("Alice",1),("Bob",2)],["name","dept_id"])\ndept=spark.createDataFrame([(1,"Eng"),(2,"Mkt")],["dept_id","dept_name"])\n# YOUR CODE HERE — broadcast join emp with dept on dept_id, show()`,
    expectedOutput:"Alice 1 Eng\nBob 2 Mkt",
    validator:o=>matchTable(o,"Alice 1 Eng\nBob 2 Mkt") },

  { id:"ps_m10", subject:"pyspark", difficulty:"medium", title:"Explode Array",
    description:`Explode 'skills' array column so each skill gets its own row.`,
    example:`Alice Python\nAlice Spark\nBob SQL`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Alice",["Python","Spark"]),("Bob",["SQL"])]\ndf=spark.createDataFrame(data,["name","skills"])\n# YOUR CODE HERE — explode skills array, drop skills column, show()`,
    expectedOutput:"Alice Python\nAlice Spark\nBob SQL",
    validator:o=>matchTable(o,"Alice Python\nAlice Spark\nBob SQL") },

  { id:"ps_m11", subject:"pyspark", difficulty:"medium", title:"String Upper & Trim",
    description:`Apply upper() to name and trim() to city.`,
    example:`ALICE New York (trimmed)`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("Alice","  New York  "),("bob","  London  ")]\ndf=spark.createDataFrame(data,["name","city"])\n# YOUR CODE HERE — upper(name), trim(city), show(truncate=False)`,
    expectedOutput:"ALICE New York\nBOB London",
    validator:o=>matchTable(o,"ALICE New York\nBOB London") },

  { id:"ps_m12", subject:"pyspark", difficulty:"medium", title:"Parse JSON Column",
    description:`Given JSON string column, parse it and extract name & age fields.`,
    example:`{"name":"Alice","age":30} → Alice 30`,
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.types import StructType,StructField,StringType,IntegerType\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[('\{"name":"Alice","age":30\}',),('\{"name":"Bob","age":25\}',)]\ndf=spark.createDataFrame(data,["json_col"])\nschema=StructType([StructField("name",StringType()),StructField("age",IntegerType())])\n# YOUR CODE HERE — from_json(json_col, schema), select p.name and p.age, show()`,
    expectedOutput:"Alice 30\nBob 25",
    validator:o=>matchTable(o,"Alice 30\nBob 25") },

  // ---- HARD ----
  { id:"ps_h1", subject:"pyspark", difficulty:"hard", title:"Salted Join for Skew",
    description:`Simulate a salted join to handle data skew. Add salt column, replicate small DF, join on key+salt. Print result count.`,
    example:`Output: 4`,
    hints:[
      "Add a random salt to large: large = large.withColumn('salt', (F.rand()*3).cast('int')).",
      "Replicate small DF for each salt value: F.explode(F.array([F.lit(i) for i in range(3)])).",
      "Join on both columns: large.join(small_rep, ['id','salt']). The result count should be 4."
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\nlarge=spark.createDataFrame([(1,"a"),(1,"b"),(2,"c"),(2,"d")],["id","val"])\nsmall=spark.createDataFrame([(1,"X"),(2,"Y")],["id","label"])\n# YOUR CODE HERE — add salt column to large (rand*3 cast int)\n# replicate small_rep (explode array of salt values 0..2)\n# join large with small_rep on [id, salt], print(result.count())`,
    expectedOutput:"4",
    validator:o=>o.trim().startsWith("4")||o.includes("4")?{pass:true,message:"✓ Salted join complete!"}:{pass:false,message:"✗ Result count should be 4."} },

  { id:"ps_h2", subject:"pyspark", difficulty:"hard", title:"Delta Upsert Simulation",
    description:`Simulate MERGE (upsert): updates override existing on key; new rows are added.`,
    example:`id=1 → updated_1\nid=2 → existing_2\nid=3 → new_3`,
    hints:[
      "Rows in existing that are NOT in updates stay unchanged: existing.join(updates, 'id', 'left_anti').",
      "Rows that ARE updated come entirely from updates: use the updates DF directly.",
      "Union the two parts: unchanged.union(updates).orderBy('id').show()."
    ],
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\nexisting=spark.createDataFrame([(1,"existing_1"),(2,"existing_2")],["id","val"])\nupdates=spark.createDataFrame([(1,"updated_1"),(3,"new_3")],["id","val"])\n# Merge: updates override existing; new rows added\n# merged.orderBy("id").show()`,
    expectedOutput:"updated_1\nexisting_2\nnew_3",
    validator:o=>o.includes("updated_1")&&o.includes("existing_2")&&o.includes("new_3")?{pass:true,message:"✓ Merge logic correct!"}:{pass:false,message:"✗ Expect updated_1, existing_2, new_3."} },

  { id:"ps_h3", subject:"pyspark", difficulty:"hard", title:"Sessionize Events",
    description:`Create session_id for user events: new session if gap > 30 minutes from previous event for same user.`,
    example:`u1 events at 0,10 (session 1), 50,55 (session 2)`,
    hints:[
      "Step 1: w = Window.partitionBy('user').orderBy('minute'); add prev_time = F.lag('minute',1).over(w).",
      "Step 2: add new_session = F.when((F.col('minute')-F.col('prev_time'))>30, 1).otherwise(0).",
      "Step 3: cumulative sum of new_session over same window (rowsBetween unbounded) becomes session_id."
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.window import Window\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("u1",0),("u1",10),("u1",50),("u1",55),("u2",0),("u2",100)]\ndf=spark.createDataFrame(data,["user","minute"])\n# Hint: use lag to get prev_time, flag new session if gap > 30 minutes\n# Compute cumulative sum of flags as session_id, show result`,
    expectedOutput:"u1\nu2",
    validator:o=>o.includes("u1")&&o.includes("u2")?{pass:true,message:"✓ Sessionization applied!"}:{pass:false,message:"✗ Both users should appear."} },

  { id:"ps_h4", subject:"pyspark", difficulty:"hard", title:"Repartition vs Coalesce",
    description:`Show partition count after repartition(2) and coalesce(1) on a 4-partition DF.`,
    example:`Initial: 4\nRepartition: 2\nCoalesce: 1`,
    hints:[
      "Start with df = spark.range(20).repartition(4) — already in the code.",
      "r2 = df.repartition(2) causes a full shuffle; r2.rdd.getNumPartitions() returns 2.",
      "c1 = r2.coalesce(1) merges without shuffle; c1.rdd.getNumPartitions() returns 1."
    ],
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndf=spark.range(20).repartition(4)\nprint("Initial:", df.rdd.getNumPartitions())\n# r2 = df.repartition(2)\n# print("Repartition:", r2.rdd.getNumPartitions())\n# c1 = r2.coalesce(1)\n# print("Coalesce:", c1.rdd.getNumPartitions())`,
    expectedOutput:"Initial: 4\nRepartition: 2\nCoalesce: 1",
    validator:o=>o.includes("4")&&o.includes("2")&&o.includes("1")?{pass:true,message:"✓ Partition ops correct!"}:{pass:false,message:"✗ Initial=4, Repartition=2, Coalesce=1."} },

  { id:"ps_h5", subject:"pyspark", difficulty:"hard", title:"SCD Type 2 Simulation",
    description:`Simulate SCD Type 2: changed records get new row (is_current=True) and old row closed (is_current=False).`,
    example:`Alice old dept=Eng is_current=False\nAlice new dept=IT is_current=True`,
    hints:[
      "Find changed IDs: changed = current.join(new_data,'id').filter(current.dept != new_data.dept).",
      "Close old records: closed = current.join(changed_ids,'id').withColumn('is_current',F.lit(False)).",
      "Union: closed + unchanged + new rows (new_data with is_current=True). orderBy('id','dept').show()."
    ],
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ncurrent=spark.createDataFrame([(1,"Alice","Eng",True),(2,"Bob","HR",True)],["id","name","dept","is_current"])\nnew_data=spark.createDataFrame([(1,"Alice","IT"),(3,"Charlie","Finance")],["id","name","dept"])\n# Produce merged SCD2 result (is_current=False for closed records, True for current)\n# Sort by id and dept, then show()`,
    expectedOutput:"Alice\nBob\nCharlie",
    validator:o=>o.includes("Alice")&&o.includes("Bob")&&o.includes("Charlie")?{pass:true,message:"✓ SCD Type 2 simulated!"}:{pass:false,message:"✗ All three employees should appear."} },

  { id:"ps_h6", subject:"pyspark", difficulty:"hard", title:"Percentile Approximation",
    description:`Compute 50th and 95th percentile of salary using approxQuantile.`,
    example:`p50=60000, p95=90000`,
    hints:[
      "Use df.approxQuantile('salary', [0.5, 0.95], 0.0) — third arg is relative error (0.0 = exact).",
      "It returns a list: p50, p95 = df.approxQuantile('salary', [0.5, 0.95], 0.0).",
      "Print with: print(int(p50), int(p95)) to get '60000 90000'."
    ],
    starterCode:`from pyspark.sql import SparkSession\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("A",30000),("B",50000),("C",60000),("D",75000),("E",90000)]\ndf=spark.createDataFrame(data,["name","salary"])\n# p50, p95 = df.approxQuantile("salary",[0.5,0.95],0.0)\n# print(int(p50), int(p95))`,
    expectedOutput:"60000 90000",
    validator:o=>o.includes("60000")&&o.includes("90000")?{pass:true,message:"✓ Percentiles correct!"}:{pass:false,message:"✗ p50=60000, p95=90000."} },

  { id:"ps_h7", subject:"pyspark", difficulty:"hard", title:"Window NTILE Quartiles",
    description:`Divide employees into 4 quartiles based on salary using NTILE(4) window function.`,
    example:`Each employee gets a quartile number 1-4`,
    hints:[
      "Define a window: w = Window.orderBy('salary').",
      "Apply: result = df.withColumn('quartile', F.ntile(4).over(w)).",
      "Show result: result.show() — 2 employees per quartile since there are 8 rows and 4 buckets."
    ],
    starterCode:`from pyspark.sql import SparkSession,functions as F\nfrom pyspark.sql.window import Window\nspark=SparkSession.builder.master("local").appName("t").getOrCreate()\nspark.sparkContext.setLogLevel("ERROR")\ndata=[("A",10000),("B",20000),("C",30000),("D",40000),("E",50000),("F",60000),("G",70000),("H",80000)]\ndf=spark.createDataFrame(data,["name","salary"])\n# YOUR CODE HERE — window: orderBy salary, add F.ntile(4).over(w) as quartile, show()`,
    expectedOutput:"A 10000 1\nB 20000 1\nC 30000 2\nD 40000 2\nE 50000 3\nF 60000 3\nG 70000 4\nH 80000 4",
    validator:o=>matchTable(o,"A 10000 1\nB 20000 1\nC 30000 2\nD 40000 2\nE 50000 3\nF 60000 3\nG 70000 4\nH 80000 4") },
],

/* =================== SQL =================== */
sql: [
  // ---- EASY ----
  { id:"sq_e1", subject:"sql", difficulty:"easy", title:"SELECT All Employees",
    description:`Retrieve all columns from the employees table.\n(employees: id, name, department, salary, dept_id)`,
    example:`Returns all 4 rows`,
    starterCode:`SELECT * FROM employees;`,
    expectedOutput:"Alice\nBob\nCharlie\nDiana",
    validator:o=>o.includes("Alice")&&o.includes("Bob")&&o.includes("Charlie")&&o.includes("Diana")?{pass:true,message:"✓ All rows!"}:{pass:false,message:"✗ Return all rows from employees."} },

  { id:"sq_e2", subject:"sql", difficulty:"easy", title:"Filter by Department",
    description:`Get names of employees in the 'Engineering' department.`,
    example:`Alice\nCharlie`,
    starterCode:`SELECT name FROM employees\nWHERE department = 'Engineering';`,
    expectedOutput:"Alice\nCharlie",
    validator:o=>o.includes("Alice")&&o.includes("Charlie")&&!o.includes("Bob")&&!o.includes("Diana")?{pass:true,message:"✓ Correct!"}:{pass:false,message:"✗ Only Alice & Charlie in Engineering."} },

  { id:"sq_e3", subject:"sql", difficulty:"easy", title:"ORDER BY Salary DESC",
    description:`Get name and salary sorted by salary descending.`,
    example:`Charlie 90000\nAlice 60000\nDiana 55000\nBob 45000`,
    starterCode:`SELECT name, salary FROM employees\nORDER BY salary DESC;`,
    expectedOutput:"Charlie\nAlice\nDiana\nBob",
    validator:o=>{const n=(o.match(/[A-Z][a-z]+/g)||[]);const idx=x=>n.indexOf(x);return idx("Charlie")<idx("Alice")&&idx("Alice")<idx("Diana")&&idx("Diana")<idx("Bob")?{pass:true,message:"✓ Correct order!"}:{pass:false,message:"✗ DESC: Charlie,Alice,Diana,Bob."}} },

  { id:"sq_e4", subject:"sql", difficulty:"easy", title:"COUNT per Department",
    description:`Count employees per department.`,
    example:`Engineering:2, Marketing:1, HR:1`,
    starterCode:`SELECT department, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department;`,
    expectedOutput:"Engineering\nMarketing\nHR",
    validator:o=>o.includes("Engineering")&&o.includes("Marketing")&&o.includes("HR")?{pass:true,message:"✓ Correct!"}:{pass:false,message:"✗ Group by department, count rows."} },

  { id:"sq_e5", subject:"sql", difficulty:"easy", title:"MIN and MAX Salary",
    description:`Find minimum and maximum salary.`,
    example:`min=45000 max=90000`,
    starterCode:`SELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary\nFROM employees;`,
    expectedOutput:"45000",
    validator:o=>o.includes("45000")&&o.includes("90000")?{pass:true,message:"✓ Min=45000 Max=90000!"}:{pass:false,message:"✗ Min=45000, Max=90000."} },

  { id:"sq_e6", subject:"sql", difficulty:"easy", title:"LIKE Pattern Match",
    description:`Get names starting with 'A' or 'C'.`,
    example:`Alice\nCharlie`,
    starterCode:`SELECT name FROM employees\nWHERE name LIKE 'A%' OR name LIKE 'C%';`,
    expectedOutput:"Alice\nCharlie",
    validator:o=>o.includes("Alice")&&o.includes("Charlie")&&!o.includes("Bob")&&!o.includes("Diana")?{pass:true,message:"✓ LIKE correct!"}:{pass:false,message:"✗ Alice and Charlie start with A,C."} },

  { id:"sq_e7", subject:"sql", difficulty:"easy", title:"Average Salary",
    description:`Find average salary of all employees.`,
    example:`62500`,
    starterCode:`SELECT ROUND(AVG(salary),2) AS avg_salary FROM employees;`,
    expectedOutput:"62500",
    validator:o=>o.includes("62500")?{pass:true,message:"✓ Avg=62500!"}:{pass:false,message:"✗ (45000+60000+90000+55000)/4=62500."} },

  { id:"sq_e8", subject:"sql", difficulty:"easy", title:"IN Clause",
    description:`Get employees in 'Engineering' or 'HR' using IN.`,
    example:`Alice\nCharlie\nDiana`,
    starterCode:`SELECT name FROM employees\nWHERE department IN ('Engineering','HR');`,
    expectedOutput:"Alice\nCharlie\nDiana",
    validator:o=>o.includes("Alice")&&o.includes("Charlie")&&o.includes("Diana")&&!o.includes("Bob")?{pass:true,message:"✓ IN correct!"}:{pass:false,message:"✗ Alice,Charlie(Eng),Diana(HR)."} },

  { id:"sq_e9", subject:"sql", difficulty:"easy", title:"10% Salary Raise",
    description:`Give Engineering employees a 10% raise. Then select their names and new salaries.`,
    example:`Alice→66000, Charlie→99000`,
    starterCode:`UPDATE employees SET salary = salary * 1.10\nWHERE department = 'Engineering';\n\nSELECT name, salary FROM employees WHERE department='Engineering';`,
    expectedOutput:"66000\n99000",
    validator:o=>o.includes("66000")&&o.includes("99000")?{pass:true,message:"✓ 10% raise applied!"}:{pass:false,message:"✗ Alice=66000, Charlie=99000."} },

  { id:"sq_e10", subject:"sql", difficulty:"easy", title:"BETWEEN Range",
    description:`Find employees with salary BETWEEN 50000 AND 80000.`,
    example:`Alice 60000\nDiana 55000`,
    starterCode:`SELECT name, salary FROM employees\nWHERE salary BETWEEN 50000 AND 80000;`,
    expectedOutput:"Alice\nDiana",
    validator:o=>o.includes("Alice")&&o.includes("Diana")&&!o.includes("Bob")&&!o.includes("Charlie")?{pass:true,message:"✓ BETWEEN correct!"}:{pass:false,message:"✗ Alice(60k) and Diana(55k) in 50k-80k range."} },

  { id:"sq_e11", subject:"sql", difficulty:"easy", title:"Top 2 Salaries",
    description:`Retrieve the two highest-paid employees using ORDER BY and LIMIT.`,
    example:`Charlie 90000\nAlice 60000`,
    starterCode:`SELECT name, salary FROM employees\nORDER BY salary DESC\nLIMIT 2;`,
    expectedOutput:"Charlie\nAlice",
    validator:o=>o.includes("Charlie")&&o.includes("Alice")&&!o.includes("Bob")&&!o.includes("Diana")?{pass:true,message:"✓ Top 2 correct!"}:{pass:false,message:"✗ Top 2 by salary: Charlie(90k) and Alice(60k)."} },

  { id:"sq_e12", subject:"sql", difficulty:"easy", title:"CONCAT Names",
    description:`Concatenate name and department as "Alice - Engineering" for each employee.`,
    example:`Alice - Engineering\nBob - Marketing`,
    starterCode:`SELECT name || ' - ' || department AS name_dept FROM employees;`,
    expectedOutput:"Alice - Engineering",
    validator:o=>o.includes("Alice - Engineering")||o.includes("Engineering")?{pass:true,message:"✓ Concat correct!"}:{pass:false,message:"✗ Format: 'name - department'."} },

  // ---- MEDIUM ----
  { id:"sq_m1", subject:"sql", difficulty:"medium", title:"INNER JOIN",
    description:`Join employees with departments on dept_id. Show name and location.`,
    example:`Alice New York\nBob London`,
    starterCode:`SELECT e.name, d.location\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.dept_id;`,
    expectedOutput:"New York\nLondon",
    validator:o=>o.includes("New York")&&o.includes("London")?{pass:true,message:"✓ Join correct!"}:{pass:false,message:"✗ Join on dept_id to get location."} },

  { id:"sq_m2", subject:"sql", difficulty:"medium", title:"HAVING – Dept Avg > 55k",
    description:`Find departments where average salary > 55000.`,
    example:`Engineering 75000`,
    starterCode:`SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 55000;`,
    expectedOutput:"Engineering",
    validator:o=>o.includes("Engineering")&&!o.includes("Marketing")&&!o.includes("HR")?{pass:true,message:"✓ HAVING correct!"}:{pass:false,message:"✗ Only Engineering(avg=75k)>55k."} },

  { id:"sq_m3", subject:"sql", difficulty:"medium", title:"Subquery – Above Average",
    description:`Find employees earning above average salary using subquery.`,
    example:`Charlie 90000\nAlice 60000`,
    starterCode:`SELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);`,
    expectedOutput:"Charlie\nAlice",
    validator:o=>o.includes("Charlie")&&o.includes("Alice")&&!o.includes("Bob")&&!o.includes("Diana")?{pass:true,message:"✓ Subquery correct!"}:{pass:false,message:"✗ Avg=62500; Charlie(90k),Alice(60k) above avg. Diana(55k),Bob(45k) below."} },

  { id:"sq_m4", subject:"sql", difficulty:"medium", title:"CASE Salary Band",
    description:`Classify: <50k='Low', 50-80k='Mid', >80k='High'.`,
    example:`Alice Mid\nBob Low\nCharlie High\nDiana Mid`,
    starterCode:`SELECT name, salary,\n  CASE\n    WHEN salary < 50000 THEN 'Low'\n    WHEN salary <= 80000 THEN 'Mid'\n    ELSE 'High'\n  END AS salary_band\nFROM employees;`,
    expectedOutput:"Mid\nLow\nHigh",
    validator:o=>o.includes("Mid")&&o.includes("Low")&&o.includes("High")?{pass:true,message:"✓ CASE correct!"}:{pass:false,message:"✗ Low/Mid/High classification."} },

  { id:"sq_m5", subject:"sql", difficulty:"medium", title:"RANK per Department",
    description:`Rank employees within department by salary DESC using RANK().`,
    example:`Charlie Eng rank=1\nAlice Eng rank=2`,
    starterCode:`SELECT name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\nFROM employees;`,
    expectedOutput:"Charlie\nAlice\nDiana",
    validator:o=>o.includes("Charlie")&&o.includes("Alice")&&o.includes("Diana")?{pass:true,message:"✓ RANK correct!"}:{pass:false,message:"✗ All employees with rank."} },

  { id:"sq_m6", subject:"sql", difficulty:"medium", title:"CTE Running Total",
    description:`Use CTE to compute running total of salary ordered by salary DESC.`,
    example:`90000→150000→205000→250000`,
    starterCode:`WITH ordered AS (\n  SELECT name, salary FROM employees\n)\nSELECT name, salary,\n  SUM(salary) OVER (ORDER BY salary DESC) AS running_total\nFROM ordered;`,
    expectedOutput:"90000\n150000\n205000\n250000",
    validator:o=>o.includes("90000")&&o.includes("150000")&&o.includes("250000")?{pass:true,message:"✓ CTE running total!"}:{pass:false,message:"✗ Cumulative sum DESC."} },

  { id:"sq_m7", subject:"sql", difficulty:"medium", title:"LEFT JOIN Unmatched",
    description:`Left join employees to departments. Show those with no matching department.`,
    example:`Diana (dept_id=3, not in departments table)`,
    starterCode:`SELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.dept_id\nWHERE d.dept_name IS NULL;`,
    expectedOutput:"Diana",
    validator:o=>o.includes("Diana")?{pass:true,message:"✓ Unmatched rows found!"}:{pass:false,message:"✗ Diana has no matching department."} },

  { id:"sq_m8", subject:"sql", difficulty:"medium", title:"DENSE_RANK vs RANK",
    description:`Insert Eve with salary=45000 (same as Bob). Show RANK and DENSE_RANK differences.`,
    example:`RANK skips numbers on ties; DENSE_RANK does not`,
    starterCode:`INSERT INTO employees VALUES(5,'Eve','Finance',45000,2);\n\nSELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS rnk,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk\nFROM employees\nORDER BY salary DESC;`,
    expectedOutput:"Charlie\nAlice\nDiana\nBob\nEve",
    validator:o=>o.includes("Charlie")&&o.includes("Eve")?{pass:true,message:"✓ Comparison shown!"}:{pass:false,message:"✗ Charlie and Eve should appear."} },

  { id:"sq_m9", subject:"sql", difficulty:"medium", title:"SELF JOIN Same Dept",
    description:`Self join to find all pairs of employees in the same department (e1.id < e2.id).`,
    example:`Alice & Charlie – Engineering`,
    starterCode:`SELECT e1.name AS emp1, e2.name AS emp2, e1.department\nFROM employees e1\nJOIN employees e2 ON e1.department=e2.department AND e1.id < e2.id;`,
    expectedOutput:"Alice\nCharlie",
    validator:o=>o.includes("Alice")&&o.includes("Charlie")?{pass:true,message:"✓ Self join correct!"}:{pass:false,message:"✗ Alice and Charlie share Engineering."} },

  { id:"sq_m10", subject:"sql", difficulty:"medium", title:"UNION Departments",
    description:`UNION unique departments from table with static values 'Finance','Legal'.`,
    example:`Engineering\nMarketing\nHR\nFinance\nLegal`,
    starterCode:`SELECT DISTINCT department FROM employees\nUNION\nSELECT 'Finance'\nUNION\nSELECT 'Legal';`,
    expectedOutput:"Engineering\nMarketing\nHR",
    validator:o=>o.includes("Engineering")&&o.includes("Marketing")&&o.includes("HR")?{pass:true,message:"✓ UNION correct!"}:{pass:false,message:"✗ All unique departments."} },

  { id:"sq_m11", subject:"sql", difficulty:"medium", title:"EXISTS Subquery",
    description:`Find employees with at least one colleague in same department using EXISTS.`,
    example:`Alice Charlie (both in Engineering)`,
    starterCode:`SELECT e1.name FROM employees e1\nWHERE EXISTS (\n  SELECT 1 FROM employees e2\n  WHERE e2.department=e1.department AND e2.id<>e1.id\n);`,
    expectedOutput:"Alice\nCharlie",
    validator:o=>o.includes("Alice")&&o.includes("Charlie")?{pass:true,message:"✓ EXISTS correct!"}:{pass:false,message:"✗ Alice & Charlie have colleagues."} },

  { id:"sq_m12", subject:"sql", difficulty:"medium", title:"COALESCE NULL Handling",
    description:`Use COALESCE to replace NULL bonus with 0 and compute total_comp = salary + bonus.`,
    example:`Alice 60000+0=60000`,
    starterCode:`SELECT name, salary,\n  COALESCE(NULL,0) AS bonus,\n  salary + COALESCE(NULL,0) AS total_comp\nFROM employees\nWHERE name IN ('Alice','Bob');`,
    expectedOutput:"Alice\nBob",
    validator:o=>o.includes("Alice")&&o.includes("Bob")?{pass:true,message:"✓ COALESCE applied!"}:{pass:false,message:"✗ NULL bonus → 0."} },

  { id:"sq_m13", subject:"sql", difficulty:"medium", title:"DATE Functions",
    description:`Using a date expression, extract the year and month from '2024-07-15'. Show year and month.`,
    example:`year=2024 month=7`,
    starterCode:`SELECT\n  EXTRACT(YEAR FROM DATE '2024-07-15') AS yr,\n  EXTRACT(MONTH FROM DATE '2024-07-15') AS mo;`,
    expectedOutput:"2024\n7",
    validator:o=>o.includes("2024")&&o.includes("7")?{pass:true,message:"✓ Date extract correct!"}:{pass:false,message:"✗ EXTRACT year=2024, month=7."} },

  { id:"sq_m14", subject:"sql", difficulty:"medium", title:"Employee Orders Total",
    description:`Join employees with orders on emp_id to find the total order amount per employee.\nInclude ALL employees even if they have no orders (use LEFT JOIN).\nReturn: name, total_amount ordered by total_amount DESC.\n\n📌 Tables: employees (id, name, department, salary, dept_id)\n           orders (order_id, emp_id, product_id, amount, order_date, status)`,
    example:`Alice → 3350.00  (orders 101+103)\nCharlie → 2500.00 (order 104)\nBob → 90.00       (orders 102+106)\nDiana → 25.00     (order 105)`,
    starterCode:`SELECT e.name, SUM(o.amount) AS total_amount\nFROM employees e\nLEFT JOIN orders o ON e.id = o.emp_id\nGROUP BY e.name\nORDER BY total_amount DESC;`,
    expectedOutput:"Alice\nCharlie\nBob\nDiana",
    validator:o=>o.includes("Alice")&&o.includes("Charlie")&&o.includes("Bob")&&o.includes("Diana")?{pass:true,message:"✓ Employee order totals correct!"}:{pass:false,message:"✗ LEFT JOIN employees+orders, SUM(amount) per employee."} },

  { id:"sq_m15", subject:"sql", difficulty:"medium", title:"Product Revenue (Completed Orders)",
    description:`Join orders with products on product_id.\nShow product_name and total revenue (SUM of amount) for Completed orders only.\nOrder by revenue DESC.\n\n📌 Tables: orders (order_id, emp_id, product_id, amount, order_date, status)\n           products (product_id, product_name, category, unit_price)`,
    example:`Laptop Pro    → 5000.00 (orders 101+104 both Completed)\nWireless Mouse → 90.00  (orders 102+106 both Completed)`,
    starterCode:`SELECT p.product_name, SUM(o.amount) AS revenue\nFROM orders o\nJOIN products p ON o.product_id = p.product_id\nWHERE o.status = 'Completed'\nGROUP BY p.product_name\nORDER BY revenue DESC;`,
    expectedOutput:"Laptop Pro\nWireless Mouse",
    validator:o=>o.includes("Laptop Pro")&&o.includes("Wireless Mouse")?{pass:true,message:"✓ Product revenue correct!"}:{pass:false,message:"✗ Laptop Pro=5000, Wireless Mouse=90 (status=Completed only)."} },

  { id:"sq_m16", subject:"sql", difficulty:"medium", title:"Three-Table Join: Employee Orders",
    description:`Three-way join: employees + orders + products.\nShow employee name, product_name, amount, order_date for all Completed orders.\nOrder by order_date ASC.\n\n📌 Tables: employees (id, name…)\n           orders (order_id, emp_id, product_id, amount, order_date, status)\n           products (product_id, product_name, category, unit_price)`,
    example:`Alice  | Laptop Pro     | 2500.00 | 2024-01-15\nBob    | Wireless Mouse | 45.00   | 2024-01-20\nCharlie| Laptop Pro     | 2500.00 | 2024-02-10\nBob    | Wireless Mouse | 45.00   | 2024-03-01`,
    starterCode:`SELECT e.name, p.product_name, o.amount, o.order_date\nFROM orders o\nJOIN employees e ON o.emp_id = e.id\nJOIN products p ON o.product_id = p.product_id\nWHERE o.status = 'Completed'\nORDER BY o.order_date;`,
    expectedOutput:"Alice\nBob\nCharlie\nBob",
    validator:o=>o.includes("Alice")&&o.includes("Bob")&&o.includes("Charlie")&&o.includes("Laptop Pro")?{pass:true,message:"✓ Three-table join correct!"}:{pass:false,message:"✗ Join employees+orders+products, filter Completed, order by date."} },

  // ---- HARD ----
  { id:"sq_h1", subject:"sql", difficulty:"hard", title:"Gaps and Islands",
    description:`Find the longest streak of consecutive dates: Jan 1-5 (streak=5) then Jan 8-10 (streak=3).`,
    example:`Longest streak: 5`,
    hints:[
      "Classic gaps-and-islands trick: subtract ROW_NUMBER() from the date to form an island group key.",
      "Group BY that key (DATEADD or date - rn) and COUNT(*) per group to get each streak length.",
      "Wrap in an outer query: SELECT MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM grp GROUP BY island_key) t."
    ],
    starterCode:`WITH dates AS (\n  SELECT '2024-01-01' AS dt UNION SELECT '2024-01-02' UNION SELECT '2024-01-03'\n  UNION SELECT '2024-01-04' UNION SELECT '2024-01-05'\n  UNION SELECT '2024-01-08' UNION SELECT '2024-01-09' UNION SELECT '2024-01-10'\n),\ngrp AS (\n  SELECT dt, ROW_NUMBER() OVER (ORDER BY dt) AS rn FROM dates\n)\nSELECT MAX(cnt) AS longest_streak\nFROM (SELECT COUNT(*) AS cnt FROM grp GROUP BY 1) t;`,
    expectedOutput:"5",
    validator:o=>o.includes("5")?{pass:true,message:"✓ Longest streak=5!"}:{pass:false,message:"✗ Jan 1-5 is 5-day streak."} },

  { id:"sq_h2", subject:"sql", difficulty:"hard", title:"Recursive CTE Org Hierarchy",
    description:`Recursive CTE listing all reports under manager_id=1 (direct and indirect).`,
    example:`VP_Eng VP_HR Lead`,
    hints:[
      "WITH RECURSIVE org AS (…) — the anchor selects rows WHERE manager_id=1.",
      "The recursive part JOINs managers m ON m.manager_id = org.id to walk down the tree.",
      "UNION ALL connects anchor + recursive part. Final SELECT name FROM org."
    ],
    starterCode:`CREATE TABLE IF NOT EXISTS managers (id INT, name STRING, manager_id INT);\nINSERT INTO managers VALUES(1,'CEO',NULL),(2,'VP_Eng',1),(3,'VP_HR',1),(4,'Lead',2);\n\nWITH RECURSIVE org AS (\n  SELECT id,name,manager_id FROM managers WHERE manager_id=1\n  UNION ALL\n  SELECT m.id,m.name,m.manager_id FROM managers m JOIN org ON m.manager_id=org.id\n)\nSELECT name FROM org;`,
    expectedOutput:"VP_Eng\nVP_HR\nLead",
    validator:o=>o.includes("VP_Eng")||o.includes("Lead")?{pass:true,message:"✓ Recursive CTE works!"}:{pass:false,message:"✗ VP_Eng,VP_HR,Lead should appear."} },

  { id:"sq_h3", subject:"sql", difficulty:"hard", title:"Median Salary",
    description:`Calculate median salary manually using ROW_NUMBER (no built-in MEDIAN). Employees: 45000,55000,60000,90000.`,
    example:`Median = 57500`,
    hints:[
      "Use ROW_NUMBER() OVER (ORDER BY salary) AS rn and COUNT(*) OVER () AS total in a CTE.",
      "For even count, median = AVG of rows at positions FLOOR((n+1)/2) and CEIL((n+1)/2).",
      "Filter: WHERE rn IN (FLOOR((total+1.0)/2), CEIL((total+1.0)/2)) then SELECT AVG(CAST(salary AS FLOAT))."
    ],
    starterCode:`WITH ranked AS (\n  SELECT salary,\n    ROW_NUMBER() OVER (ORDER BY salary) AS rn,\n    COUNT(*) OVER () AS total\n  FROM employees\n)\nSELECT AVG(CAST(salary AS FLOAT)) AS median\nFROM ranked\nWHERE rn IN (FLOOR((total+1.0)/2), CEIL((total+1.0)/2));`,
    expectedOutput:"57500",
    validator:o=>o.includes("57500")?{pass:true,message:"✓ Median=57500!"}:{pass:false,message:"✗ Median of 45k,55k,60k,90k = 57500."} },

  { id:"sq_h4", subject:"sql", difficulty:"hard", title:"PIVOT – Depts as Columns",
    description:`Pivot employee counts: one row with Engineering, Marketing, HR as columns.`,
    example:`Engineering=2, Marketing=1, HR=1`,
    hints:[
      "Use conditional aggregation: SUM(CASE WHEN department='Engineering' THEN 1 ELSE 0 END).",
      "Do the same for Marketing and HR as separate expressions in the same SELECT.",
      "No GROUP BY needed — you want a single summary row across all employees."
    ],
    starterCode:`SELECT\n  SUM(CASE WHEN department='Engineering' THEN 1 ELSE 0 END) AS Engineering,\n  SUM(CASE WHEN department='Marketing' THEN 1 ELSE 0 END) AS Marketing,\n  SUM(CASE WHEN department='HR' THEN 1 ELSE 0 END) AS HR\nFROM employees;`,
    expectedOutput:"2 | 1 | 1",
    validator:o=>o.includes("2")&&o.includes("1")?{pass:true,message:"✓ Pivot correct!"}:{pass:false,message:"✗ Engineering=2, Marketing=1, HR=1."} },

  { id:"sq_h5", subject:"sql", difficulty:"hard", title:"Second Highest Salary",
    description:`Find 2nd highest salary without LIMIT/OFFSET – use a subquery.`,
    example:`60000`,
    hints:[
      "Select MAX(salary) but exclude the overall maximum using a WHERE clause.",
      "WHERE salary < (SELECT MAX(salary) FROM employees) filters out Charlie's 90000.",
      "The outer MAX() on the remaining values (45000, 55000, 60000) returns 60000."
    ],
    starterCode:`SELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);`,
    expectedOutput:"60000",
    validator:o=>o.includes("60000")?{pass:true,message:"✓ 2nd highest=60000!"}:{pass:false,message:"✗ Max=90000(Charlie); 2nd=60000(Alice)."} },

  { id:"sq_h6", subject:"sql", difficulty:"hard", title:"LEAD – Next Salary",
    description:`For each employee (order by salary ASC), show salary and next higher using LEAD().`,
    example:`Bob 45000→55000\nDiana 55000→60000\nAlice 60000→90000\nCharlie 90000→NULL`,
    starterCode:`SELECT name, salary,\n  LEAD(salary) OVER (ORDER BY salary ASC) AS next_salary\nFROM employees;`,
    expectedOutput:"45000\n55000\n60000\n90000",
    validator:o=>o.includes("45000")&&o.includes("55000")&&o.includes("60000")&&o.includes("90000")?{pass:true,message:"✓ LEAD correct!"}:{pass:false,message:"✗ LEAD returns next row salary."} },

  { id:"sq_h7", subject:"sql", difficulty:"hard", title:"CUME_DIST",
    description:`Compute cumulative distribution (CUME_DIST) for each employee's salary.`,
    example:`Bob 0.25\nDiana 0.50\nAlice 0.75\nCharlie 1.00`,
    hints:[
      "CUME_DIST() OVER (ORDER BY salary) gives the fraction of rows with salary <= current.",
      "With 4 employees: rank 1 = 1/4=0.25, rank 2 = 2/4=0.50, etc.",
      "ROUND the result to 2 decimal places: ROUND(CUME_DIST() OVER (ORDER BY salary), 2)."
    ],
    starterCode:`SELECT name, salary,\n  ROUND(CUME_DIST() OVER (ORDER BY salary),2) AS cume_dist\nFROM employees\nORDER BY salary;`,
    expectedOutput:"0.25\n0.5\n0.75\n1",
    validator:o=>o.includes("0.25")&&o.includes("1")?{pass:true,message:"✓ CUME_DIST correct!"}:{pass:false,message:"✗ Values: 0.25→0.50→0.75→1.00."} },

  { id:"sq_h8", subject:"sql", difficulty:"hard", title:"First Value per Group",
    description:`For each department, show each employee and the highest-paid person in their department using FIRST_VALUE().`,
    example:`Engineering: Charlie is first (90000)\nHR: Diana (55000)\nMarketing: Bob (45000)`,
    hints:[
      "FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) returns top earner per dept.",
      "The ORDER BY salary DESC inside the window makes the highest salary come first.",
      "SELECT name, department, salary, FIRST_VALUE(name) OVER (...) AS top_earner FROM employees."
    ],
    starterCode:`SELECT name, department, salary,\n  FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner\nFROM employees;`,
    expectedOutput:"Charlie\nDiana\nBob",
    validator:o=>o.includes("Charlie")&&o.includes("Diana")&&o.includes("Bob")?{pass:true,message:"✓ FIRST_VALUE correct!"}:{pass:false,message:"✗ Top earner per department using FIRST_VALUE."} }
]
};

/* =================== HELPERS =================== */
function matchExact(actual, expected) {
  const a=(actual||"").trim().replace(/\r/g,"");
  const e=(expected||"").trim().replace(/\r/g,"");
  return a===e
    ?{pass:true,message:"✓ Output matches expected!"}
    :{pass:false,message:`✗ Expected:\n${e}\n\nGot:\n${a}`};
}

/* Normalize PySpark show() table output and compare to expected data rows.
   Expected format: "val1 val2\nval3 val4" (one row per line, values space-separated, no borders) */
function matchTable(actual, expected) {
  const lines = (actual||"").split('\n').map(l=>l.trim()).filter(l=>l.startsWith('|'));
  const dataLines = lines.slice(1); // skip header row
  const normalized = dataLines
    .map(line => line.split('|').slice(1,-1).map(v=>v.trim()).join(' ').trim())
    .filter(row => row)
    .join('\n').trim();
  const e = (expected||"").trim();
  return normalized === e
    ?{pass:true,message:"✓ Output matches!"}
    :{pass:false,message:`✗ Expected:\n${e}\n\nGot (normalized):\n${normalized}`};
}

/* Build exam set: random 10 per subject (3 easy, 4 medium, 3 hard) */
function buildExamSet() {
  const result = {};
  ["python","pyspark","sql"].forEach(sub => {
    const pool = QUESTIONS[sub];
    const easy   = shuffle(pool.filter(q=>q.difficulty==="easy"));
    const medium = shuffle(pool.filter(q=>q.difficulty==="medium"));
    const hard   = shuffle(pool.filter(q=>q.difficulty==="hard"));
    let selected = [...easy.slice(0,3), ...medium.slice(0,4), ...hard.slice(0,3)];
    if (selected.length < 10) {
      const ids = new Set(selected.map(q=>q.id));
      const rem = shuffle(pool.filter(q=>!ids.has(q.id)));
      selected = [...selected, ...rem].slice(0,10);
    }
    result[sub] = shuffle(selected);
  });
  return result;
}

function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

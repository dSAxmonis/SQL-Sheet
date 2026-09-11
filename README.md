# ⚡ SQL. 20-Day Interview Preparation & Practice Roadmap

A specialized, distraction-free self-practice website built with a **[Motion.dev](https://motion.dev/) inspired user interface**: clean carbon-dark theme, signature yellow/amber accents, hairline rule grids, technical monospace readouts, and snappy zero-clutter interactions for mastering the **20-Day SQL Interview Preparation Roadmap**.

---

## 🌟 Key Features

1. **Complete 20-Day Sheet & All 222 Questions**:
   - **Phase 1: Foundation (Days 1–5)**:
     - Day 1: SELECT Basics & Filtering (WHERE)
     - Day 2: Sorting, Limiting & DISTINCT
     - Day 3: String Functions & Pattern Matching
     - Day 4: Date & Time Functions
     - Day 5: NULL Handling & CASE / Conditional Logic
   - **Phase 2: Core (Days 6–11)**:
     - Day 6: Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)
     - Day 7: GROUP BY & HAVING
     - Day 8: INNER JOIN & OUTER JOINS (LEFT / RIGHT)
     - Day 9: Self Joins, Cross Joins & Multi-Table Joins
     - Day 10: Subqueries (Nested, Correlated, EXISTS)
     - Day 11: Set Operations (UNION, UNION ALL, INTERSECT, EXCEPT)
   - **Phase 3: Intermediate (Days 12–13)**:
     - Day 12: Common Table Expressions (CTEs)
     - Day 13: Recursive CTEs & Hierarchical Queries
   - **Phase 4: Advanced (Days 14–19)**:
     - Day 14: Window Functions I: Ranking (ROW_NUMBER, RANK, DENSE_RANK, NTILE)
     - Day 15: Window Functions II: LAG / LEAD & Frame-Based Aggregates
     - Day 16: Running Totals, Moving Averages & Cumulative Analytics
     - Day 17: Pivoting, Unpivoting & Data Reshaping
     - Day 18: Advanced Multi-Concept Problems (Joins + Window + CTE Combined)
     - Day 19: Query Optimization, Indexing & EXPLAIN-Based Reasoning
   - **Phase 5: Capstone (Day 20)**:
     - Day 20: Full-Length Mixed Interview Simulation (Top Company Tags)

2. **100% Working Problem Links**:
   - Every problem row has a **"Solve"** button linking directly to the problem or curated filter on **LeetCode**, **HackerRank**, **DataLemur**, or **StrataScratch**.

3. **Daily & Overall Progress Tracking**:
   - Dynamic SVG circular progress meter showing overall % completed.
   - Live metrics for Total Solved, In Progress, Needs Revision, and Remaining.
   - Real-time difficulty breakdown bars (Easy: 70, Medium: 112, Hard: 40).
   - Per-day progress bars with instant ratio updates (e.g. `8/11 (73%)`).

4. **15-Minute Rule & Stopwatch Focus Timer**:
   - As prescribed in the curriculum: *"Solve every question yourself first; only check editorial/discussion solutions if stuck for 15+ minutes."*
   - Built-in timer with presets for 15m practice, 45m standard mock, and 90m capstone timed challenge (5 Hard in 90 min).

5. **Spaced Repetition Queue**:
   - Mark any problem as **"Needs Revision"** to automatically schedule it for re-attempt after 3–4 days.
   - Dedicated tab displays due re-attempts with days-ago / countdown badges.

6. **SQL Solution & Notes Scratchpad**:
   - Click the 📝 icon on any question to log:
     - Time spent solving
     - Key insights, edge cases, and gotchas
     - Working SQL code in a dark syntax-style code block

7. **Multi-Factor Filtering & Instant Search**:
   - Live search by problem title, SQL concept, day, or tag.
   - Filter chips for Phase, Platform, Difficulty, and Status.
   - Accordion controls: "Expand All" and "Collapse All".

8. **Zero-Setup & Safe Data Persistence**:
   - Automatically saves all your data locally in browser `localStorage`.
   - **Export Progress**: Download a JSON backup anytime.
   - **Import Progress**: Restore your practice progress on another device or browser.

---

## 👥 Hosting & Study Buddy Setup (For You & Your Friend)

This web application has a built-in **Node.js + Express backend with an SQLite database** and **JWT authentication**. It is designed so that you and your friend each have your own private account, notes, and progress, while being able to see each other's solved problem count!

---

### 🔑 What You Need to Give (Options):

#### **Option A: 100% Free 1-Click Hosting on Render.com (Recommended — You give NOTHING!)**
You do **NOT** need to give any API keys or credit cards.
1. Push this folder to your GitHub (as a private repository).
2. Go to **[render.com](https://render.com/)** & create a free account.
3. Click **"New +" &rarr; "Web Service"**, and select your GitHub repo.
4. Render automatically detects `render.yaml` and starts your website for free!
5. In Environment Variables, set:
   - `INVITE_CODE`: Your private secret password (e.g. `SQL2026`) so strangers cannot register on your website!
   - `JWT_SECRET`: Any random string.
6. Share your new `.onrender.com` link with your friend!

#### **Option B: 1-Click Hosting on Railway or Fly.io**
- Uses the included [`Dockerfile`](file:///Users/monis/Downloads/projects/sql%20practice/Dockerfile).
- Simply import your repository into Railway.app, set `PORT=3000`, and deploy.

#### **Option C: If you want to use Supabase instead of SQLite**
If you prefer Supabase for the database, you only need to give:
1. `SUPABASE_URL` (e.g. `https://xyzcompany.supabase.co`)
2. `SUPABASE_ANON_KEY` (public anonymous API key)

---

### 🛡️ How the Private Invite System Works
- When your website is hosted on the internet, strangers cannot sign up.
- Only people with the **Secret Invite Passcode** (`SQL2026` by default, or whatever you set in `.env`) can create an account.
- Once you and your friend create your accounts, you both log in with your own username and password!

---

### ⏱️ Features Included:
- **Dedicated Focus Timer Tab**: 15m Rule, 25m Pomodoro, 45m Mock, 90m Capstone, and Stopwatch with Web Audio chime alert.
- **Top Bar Cleaned**: Removed Export, Import, and Reset buttons as requested.
- **Study Buddy Comparison**: Displays live solved problem comparison between you and your friend.
- **Per-User Database Isolation**: Your notes and queries are separate from your friend's notes.

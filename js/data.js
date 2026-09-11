/**
 * 20-Day Complete SQL Interview Preparation Dataset
 * Extracted directly from the curriculum PDF
 */
const SQL_ROADMAP = [
  {
    day: 1,
    phase: "Foundation",
    title: "SELECT Basics & Filtering (WHERE)",
    goal: "Master SELECT, column aliasing, WHERE, comparison & logical operators (AND/OR/NOT/IN/BETWEEN).",
    note: "Solve every question yourself first; only check editorial/discussion solutions if stuck for 15+ minutes.",
    questions: [
      {
        id: "d1_q1",
        num: 1,
        title: "Recyclable and Low Fat Products",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
        tag: "Basic SELECT & WHERE filter"
      },
      {
        id: "d1_q2",
        num: 2,
        title: "Find Customer Referee",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/find-customer-referee/",
        tag: "NULL handling with <> comparison"
      },
      {
        id: "d1_q3",
        num: 3,
        title: "Big Countries",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/big-countries/",
        tag: "OR operator & UNION comparison"
      },
      {
        id: "d1_q4",
        num: 4,
        title: "Invalid Tweets",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/invalid-tweets/",
        tag: "LENGTH() / CHAR_LENGTH() condition"
      },
      {
        id: "d1_q5",
        num: 5,
        title: "Select All (SELECT *)",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/select-all-sql/problem",
        tag: "Wildcard retrieval"
      },
      {
        id: "d1_q6",
        num: 6,
        title: "Select By ID",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/select-by-id/problem",
        tag: "Exact key match WHERE"
      },
      {
        id: "d1_q7",
        num: 7,
        title: "Japanese Cities' Attributes",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/japanese-cities-attributes/problem",
        tag: "Multiple conditions (COUNTRYCODE)"
      },
      {
        id: "d1_q8",
        num: 8,
        title: "Weather Observation Station 1–6 (WHERE + conditions series)",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=select",
        tag: "Station 1-6 Basic Select series"
      },
      {
        id: "d1_q9",
        num: 9,
        title: "Employees Earning More Than Their Managers",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/employees-earning-more-than-their-managers/",
        tag: "Self compare with WHERE"
      },
      {
        id: "d1_q10",
        num: 10,
        title: "Duplicate Emails",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/duplicate-emails/",
        tag: "GROUP BY / WHERE filtering"
      },
      {
        id: "d1_q11",
        num: 11,
        title: "Customers Who Never Order",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/customers-who-never-order/",
        tag: "LEFT JOIN / NOT IN filter"
      },
      {
        id: "d1_q12",
        num: 12,
        title: "Filtering & Comparison Operator Drills",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=SQL&difficulty=Easy",
        tag: "Comparison operators interactive drills"
      }
    ]
  },
  {
    day: 2,
    phase: "Foundation",
    title: "Sorting, Limiting & DISTINCT",
    goal: "Master ORDER BY (multi-column, ASC/DESC), LIMIT/OFFSET/TOP-N, and DISTINCT for de-duplication.",
    note: "Focus on understanding how OFFSET handles edge cases when results are fewer than N.",
    questions: [
      {
        id: "d2_q1",
        num: 1,
        title: "Higher Than 75 Marks",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/more-than-75-marks/problem",
        tag: "SUBSTRING ordering + Secondary sort"
      },
      {
        id: "d2_q2",
        num: 2,
        title: "Top Earners",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/earnings-of-employees/problem",
        tag: "Calculated column + LIMIT 1"
      },
      {
        id: "d2_q3",
        num: 3,
        title: "Weather Observation Station 13–20 (rounding + ordering)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=advanced-select",
        tag: "Station 13-20 rounding & sort series"
      },
      {
        id: "d2_q4",
        num: 4,
        title: "Second Highest Salary",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/second-highest-salary/",
        tag: "LIMIT 1 OFFSET 1 with NULL fallback"
      },
      {
        id: "d2_q5",
        num: 5,
        title: "Nth Highest Salary",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/nth-highest-salary/",
        tag: "Function parameter & OFFSET N-1"
      },
      {
        id: "d2_q6",
        num: 6,
        title: "Rank Scores",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/rank-scores/",
        tag: "DISTINCT count & ORDER BY DESC"
      },
      {
        id: "d2_q7",
        num: 7,
        title: "Top Travellers",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/top-travellers/",
        tag: "ORDER BY sum DESC, name ASC"
      },
      {
        id: "d2_q8",
        num: 8,
        title: "Highest Salary by Department (Top-N pattern)",
        platform: "StrataScratch",
        difficulty: "Easy",
        url: "https://platform.stratascratch.com/coding?search=highest+salary",
        tag: "Top-N pattern sorting"
      },
      {
        id: "d2_q9",
        num: 9,
        title: "Top N Results Practice Set",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Top+N+Results",
        tag: "Top N Results Category Set"
      },
      {
        id: "d2_q10",
        num: 10,
        title: "Distinct and Unique Handling Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Distinct+and+Unique+Handling",
        tag: "DISTINCT & uniqueness drills"
      },
      {
        id: "d2_q11",
        num: 11,
        title: "List the Matches Played by Each Player (DISTINCT + ORDER BY)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=aggregation",
        tag: "Aggregation + DISTINCT sort"
      }
    ]
  },
  {
    day: 3,
    phase: "Foundation",
    title: "String Functions & Pattern Matching",
    goal: "LIKE/ILIKE, wildcards, CONCAT, SUBSTRING, LENGTH, TRIM, UPPER/LOWER, REPLACE, regex.",
    note: "Pay attention to dialect variations (PostgreSQL ILIKE vs MySQL LIKE case sensitivity).",
    questions: [
      {
        id: "d3_q1",
        num: 1,
        title: "Fix Names in a Table",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/fix-names-in-a-table/",
        tag: "UPPER(LEFT), LOWER(SUBSTRING), CONCAT"
      },
      {
        id: "d3_q2",
        num: 2,
        title: "Patients With a Condition",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/patients-with-a-condition/",
        tag: "LIKE 'DIAB1%' OR LIKE '% DIAB1%'"
      },
      {
        id: "d3_q3",
        num: 3,
        title: "Fix Product Name Format",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/fix-product-name-format/",
        tag: "LOWER, TRIM, DATE_FORMAT"
      },
      {
        id: "d3_q4",
        num: 4,
        title: "Calculate Special Bonus (string check + CASE)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/calculate-special-bonus/",
        tag: "NOT LIKE 'M%' & Modulo check"
      },
      {
        id: "d3_q5",
        num: 5,
        title: "Weather Observation Station 8, 9, 15 (LIKE + SUBSTR patterns)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=advanced-select",
        tag: "Vowel starts/ends with Regex/LIKE"
      },
      {
        id: "d3_q6",
        num: 6,
        title: "Occupations (string pivot with CASE)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/occupations/problem",
        tag: "String pivot with CASE & ranking"
      },
      {
        id: "d3_q7",
        num: 7,
        title: "Type of Triangle (string classification)",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/what-type-of-triangle/problem",
        tag: "CASE conditional text label"
      },
      {
        id: "d3_q8",
        num: 8,
        title: "String Functions Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=String+Functions",
        tag: "String Functions Practice Drill"
      },
      {
        id: "d3_q9",
        num: 9,
        title: "Delete Duplicate Emails (string-based dedup)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/delete-duplicate-emails/",
        tag: "DELETE with self-join comparison"
      },
      {
        id: "d3_q10",
        num: 10,
        title: "Text-Heavy Query Set (name formatting, masking)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=name",
        tag: "Text masking & string manipulation"
      },
      {
        id: "d3_q11",
        num: 11,
        title: "Bitwise/String AND in Triangle Judgement",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/the-report/problem",
        tag: "Conditional string report output"
      }
    ]
  },
  {
    day: 4,
    phase: "Foundation",
    title: "Date & Time Functions",
    goal: "DATEDIFF, DATE_ADD/SUB, EXTRACT, DATE_TRUNC, formatting, filtering by date ranges.",
    note: "Dates are notorious in SQL interviews. Master intervals and consecutive day logic.",
    questions: [
      {
        id: "d4_q1",
        num: 1,
        title: "Rising Temperature",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/rising-temperature/",
        tag: "DATEDIFF = 1 / date offset"
      },
      {
        id: "d4_q2",
        num: 2,
        title: "Find the Team Size / Date-based Signups",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/find-followers-count/",
        tag: "Followers count & grouping"
      },
      {
        id: "d4_q3",
        num: 3,
        title: "Number of Calls Between Two Persons (date grouping)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-calls-between-two-persons/",
        tag: "Pair canonicalization LEAST/GREATEST"
      },
      {
        id: "d4_q4",
        num: 4,
        title: "Monthly Transactions I",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/monthly-transactions-i/",
        tag: "DATE_FORMAT(trans_date, '%Y-%m')"
      },
      {
        id: "d4_q5",
        num: 5,
        title: "Immediate Food Delivery I",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/immediate-food-delivery-i/",
        tag: "Same day comparison percentage"
      },
      {
        id: "d4_q6",
        num: 6,
        title: "Immediate Food Delivery II",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/immediate-food-delivery-ii/",
        tag: "First order date subquery/window"
      },
      {
        id: "d4_q7",
        num: 7,
        title: "User Activity for the Past 30 Days I",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/",
        tag: "Rolling date window (DATEDIFF < 30)"
      },
      {
        id: "d4_q8",
        num: 8,
        title: "Date-Time Functions Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Date-Time+Functions",
        tag: "DataLemur Date-Time drills"
      },
      {
        id: "d4_q9",
        num: 9,
        title: "Average Time of Process per Machine",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/average-time-of-process-per-machine/",
        tag: "Start vs End timestamp difference"
      },
      {
        id: "d4_q10",
        num: 10,
        title: "Date-Based Cohort/Signup Analysis",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=date",
        tag: "Cohort date aggregation"
      },
      {
        id: "d4_q11",
        num: 11,
        title: "Last Person to Fit in the Bus (running sum with order by time)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/last-person-to-fit-in-the-elevator/",
        tag: "Order by time running sum limit"
      }
    ]
  },
  {
    day: 5,
    phase: "Foundation",
    title: "NULL Handling & CASE / Conditional Logic",
    goal: "IS NULL/IS NOT NULL, COALESCE/IFNULL, CASE WHEN for bucketing and pivot-style transforms.",
    note: "Remember: NULL = NULL evaluates to UNKNOWN, not TRUE. Always use IS NULL or COALESCE.",
    questions: [
      {
        id: "d5_q1",
        num: 1,
        title: "Calculate Special Bonus",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/calculate-special-bonus/",
        tag: "CASE WHEN condition THEN salary ELSE 0"
      },
      {
        id: "d5_q2",
        num: 2,
        title: "Find Followers Count / Replace NULLs",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/",
        tag: "LEFT JOIN with IFNULL/COALESCE"
      },
      {
        id: "d5_q3",
        num: 3,
        title: "Product Sales Analysis III (CASE + window)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/product-sales-analysis-iii/",
        tag: "Conditional logic with first year"
      },
      {
        id: "d5_q4",
        num: 4,
        title: "Games Played Together (NULL-safe join logic)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=advanced-join",
        tag: "NULL-safe equality joins"
      },
      {
        id: "d5_q5",
        num: 5,
        title: "Classify Triangle Type by Sides (CASE bucketing)",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/what-type-of-triangle/problem",
        tag: "CASE nested boundary check"
      },
      {
        id: "d5_q6",
        num: 6,
        title: "Null Handling Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Null+Handling",
        tag: "DataLemur Null Handling set"
      },
      {
        id: "d5_q7",
        num: 7,
        title: "Conditional Expression Practice Set",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Conditional+Expression",
        tag: "DataLemur Conditional Expressions"
      },
      {
        id: "d5_q8",
        num: 8,
        title: "Conditional Logic Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Conditional+Logic",
        tag: "Conditional logic drills"
      },
      {
        id: "d5_q9",
        num: 9,
        title: "Investments in 2016 (NULL/duplicate-safe filtering)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/investments-in-2016/",
        tag: "Multiple criteria uniqueness check"
      },
      {
        id: "d5_q10",
        num: 10,
        title: "Bucketed Age/Score Grouping (CASE WHEN drill)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=case+when",
        tag: "Bucketed age/score transforms"
      },
      {
        id: "d5_q11",
        num: 11,
        title: "Employee Bonus (LEFT JOIN + NULL check)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/employee-bonus/",
        tag: "bonus < 1000 OR bonus IS NULL"
      }
    ]
  },
  {
    day: 6,
    phase: "Core",
    title: "Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)",
    goal: "Build fluency combining aggregates with filters, before introducing GROUP BY tomorrow.",
    note: "COUNT(*) counts all rows including NULLs; COUNT(column) ignores NULLs.",
    questions: [
      {
        id: "d6_q1",
        num: 1,
        title: "Average Selling Price",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/average-selling-price/",
        tag: "ROUND(SUM(price*units)/SUM(units), 2)"
      },
      {
        id: "d6_q2",
        num: 2,
        title: "Project Employees I",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/project-employees-i/",
        tag: "ROUND(AVG(experience_years), 2)"
      },
      {
        id: "d6_q3",
        num: 3,
        title: "Number of Unique Subjects Taught by Each Teacher",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/",
        tag: "COUNT(DISTINCT subject_id)"
      },
      {
        id: "d6_q4",
        num: 4,
        title: "Total Time Spent by Each Employee",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/total-time-spent-by-each-employee/",
        tag: "SUM(out_time - in_time)"
      },
      {
        id: "d6_q5",
        num: 5,
        title: "Average Population of Each Continent",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/average-population-of-each-continent/problem",
        tag: "FLOOR(AVG(CITY.POPULATION))"
      },
      {
        id: "d6_q6",
        num: 6,
        title: "Population Density Difference",
        platform: "HackerRank",
        difficulty: "Easy",
        url: "https://www.hackerrank.com/challenges/population-density-difference/problem",
        tag: "MAX(POPULATION) - MIN(POPULATION)"
      },
      {
        id: "d6_q7",
        num: 7,
        title: "Weather Observation Station 2, 18, 19 (aggregate + geometry)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=aggregation",
        tag: "Manhattan / Euclidean distance aggregates"
      },
      {
        id: "d6_q8",
        num: 8,
        title: "Aggregate Functions Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Aggregate+Functions",
        tag: "DataLemur Aggregations drill"
      },
      {
        id: "d6_q9",
        num: 9,
        title: "Article Views II (self-referencing count)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/article-views-ii/",
        tag: "COUNT(DISTINCT article_id) > 1"
      },
      {
        id: "d6_q10",
        num: 10,
        title: "Company's Revenue/Profit Aggregations",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=revenue",
        tag: "SUM/AVG revenue aggregation"
      },
      {
        id: "d6_q11",
        num: 11,
        title: "The Blunder (AVG discrepancy analysis)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/the-blunder/problem",
        tag: "AVG with REPLACE zero error"
      }
    ]
  },
  {
    day: 7,
    phase: "Core",
    title: "GROUP BY & HAVING",
    goal: "Multi-column grouping, filtering groups with HAVING, combining with aggregates from Day 6.",
    note: "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
    questions: [
      {
        id: "d7_q1",
        num: 1,
        title: "Classes More Than 5 Students",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/classes-more-than-5-students/",
        tag: "GROUP BY class HAVING COUNT(student) >= 5"
      },
      {
        id: "d7_q2",
        num: 2,
        title: "Customer Placing the Largest Number of Orders",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/customer-placing-the-largest-number-of-orders/",
        tag: "GROUP BY customer_number ORDER BY COUNT(*) DESC"
      },
      {
        id: "d7_q3",
        num: 3,
        title: "Sales Person",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/sales-person/",
        tag: "Subquery with NOT IN & GROUP BY"
      },
      {
        id: "d7_q4",
        num: 4,
        title: "Group Sold Products By The Date",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/group-sold-products-by-the-date/",
        tag: "GROUP_CONCAT(DISTINCT product ORDER BY product)"
      },
      {
        id: "d7_q5",
        num: 5,
        title: "Managers with at Least 5 Direct Reports",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
        tag: "HAVING COUNT(id) >= 5 with JOIN"
      },
      {
        id: "d7_q6",
        num: 6,
        title: "Friend Requests I: Overall Acceptance Rate",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate/",
        tag: "COUNT(DISTINCT) ratio calculation"
      },
      {
        id: "d7_q7",
        num: 7,
        title: "Top Competitors (HAVING with COUNT DISTINCT)",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/full-score/problem",
        tag: "Multi-table join + HAVING COUNT > 1"
      },
      {
        id: "d7_q8",
        num: 8,
        title: "Interviews (multi-table GROUP BY + HAVING)",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/interviews/problem",
        tag: "Pre-aggregate before join + HAVING"
      },
      {
        id: "d7_q9",
        num: 9,
        title: "Market Analysis I",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/market-analysis-i/",
        tag: "LEFT JOIN + COUNT(IF(year=2019))"
      },
      {
        id: "d7_q10",
        num: 10,
        title: "GROUP BY / HAVING Drill Set",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=group+by",
        tag: "StrataScratch group by drill"
      },
      {
        id: "d7_q11",
        num: 11,
        title: "Percentage Calculations Practice Set (GROUP BY-based)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Percentage+Calculations",
        tag: "Group percentage drills"
      }
    ]
  },
  {
    day: 8,
    phase: "Core",
    title: "INNER JOIN & OUTER JOINS (LEFT / RIGHT)",
    goal: "Two-table and three-table joins; understand when rows are dropped vs. preserved with NULLs.",
    note: "Pay attention to whether conditions belong in the ON clause or the WHERE clause.",
    questions: [
      {
        id: "d8_q1",
        num: 1,
        title: "Combine Two Tables",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/combine-two-tables/",
        tag: "LEFT JOIN Person with Address"
      },
      {
        id: "d8_q2",
        num: 2,
        title: "Replace Employee ID With The Unique Identifier",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/",
        tag: "LEFT JOIN preserve all employees"
      },
      {
        id: "d8_q3",
        num: 3,
        title: "Product Sales Analysis I",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/product-sales-analysis-i/",
        tag: "INNER JOIN Sales and Product"
      },
      {
        id: "d8_q4",
        num: 4,
        title: "Customer Who Visited but Did Not Make Any Transactions",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
        tag: "LEFT JOIN + WHERE trans_id IS NULL"
      },
      {
        id: "d8_q5",
        num: 5,
        title: "Rising Temperature (self-join style compare)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/rising-temperature/",
        tag: "JOIN ON DATEDIFF = 1"
      },
      {
        id: "d8_q6",
        num: 6,
        title: "Students and Examinations (LEFT JOIN + GROUP BY)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/students-and-examinations/",
        tag: "CROSS JOIN subjects + LEFT JOIN exam count"
      },
      {
        id: "d8_q7",
        num: 7,
        title: "African Cities (multi-table INNER JOIN)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/african-cities/problem",
        tag: "INNER JOIN CITY and COUNTRY"
      },
      {
        id: "d8_q8",
        num: 8,
        title: "Asian Population (JOIN + aggregate)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/asian-population/problem",
        tag: "SUM(CITY.POPULATION) with JOIN"
      },
      {
        id: "d8_q9",
        num: 9,
        title: "Popular Video Creator (JOIN + rank per group)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/popular-video-creator/",
        tag: "Multi-table join + max aggregate"
      },
      {
        id: "d8_q10",
        num: 10,
        title: "Joins Practice Set",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Joins",
        tag: "DataLemur Joins Practice Set"
      },
      {
        id: "d8_q11",
        num: 11,
        title: "Multi-Table JOIN Drill Set",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=join",
        tag: "Chained multi-table joins"
      }
    ]
  },
  {
    day: 9,
    phase: "Core",
    title: "Self Joins, Cross Joins & Multi-Table Joins",
    goal: "Compare rows within the same table, generate combinations, and chain 3+ table joins.",
    note: "Aliasing tables clearly (e.g. e1 and e2) is crucial for avoiding mental confusion in self-joins.",
    questions: [
      {
        id: "d9_q1",
        num: 1,
        title: "Employees Earning More Than Their Managers",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/employees-earning-more-than-their-managers/",
        tag: "e1.managerId = e2.id self-join"
      },
      {
        id: "d9_q2",
        num: 2,
        title: "Duplicate Emails (self-join dedup logic)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/duplicate-emails/",
        tag: "p1.id != p2.id AND p1.email = p2.email"
      },
      {
        id: "d9_q3",
        num: 3,
        title: "Rising Temperature (self join on date offset)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/rising-temperature/",
        tag: "w1 JOIN w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1"
      },
      {
        id: "d9_q4",
        num: 4,
        title: "Trips and Users (multi-table join with filters)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/trips-and-users/",
        tag: "Trips JOIN Users u1 JOIN Users u2 (banned filter)"
      },
      {
        id: "d9_q5",
        num: 5,
        title: "Sales by Day of the Week (CROSS JOIN pivot)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/sales-by-day-of-the-week/",
        tag: "CROSS JOIN days with categories"
      },
      {
        id: "d9_q6",
        num: 6,
        title: "Symmetric Pairs (self join)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/symmetric-pairs/problem",
        tag: "f1.X = f2.Y AND f1.Y = f2.X self-join"
      },
      {
        id: "d9_q7",
        num: 7,
        title: "Contest Leaderboard (multi-table join + aggregate)",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/contest-leaderboard/problem",
        tag: "Max per challenge + sum per hacker"
      },
      {
        id: "d9_q8",
        num: 8,
        title: "SQL Project Planning (gap/island via self reference)",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/sql-projects/problem",
        tag: "Gaps & islands project end dates"
      },
      {
        id: "d9_q9",
        num: 9,
        title: "Find Followers Count / Friend Circles (self-join graph pattern)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/tree-node/",
        tag: "Root/Inner/Leaf tree node classification"
      },
      {
        id: "d9_q10",
        num: 10,
        title: "Self-Join & Multi-Join Drill Set",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=self+join",
        tag: "StrataScratch Self-Join drills"
      },
      {
        id: "d9_q11",
        num: 11,
        title: "Existence Check Practice Set (NOT EXISTS / anti-join)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Existence+Check",
        tag: "NOT EXISTS / anti-join drills"
      }
    ]
  },
  {
    day: 10,
    phase: "Core",
    title: "Subqueries (Nested, Correlated, EXISTS)",
    goal: "Scalar/table subqueries in WHERE/SELECT/FROM; correlated subqueries; EXISTS vs IN vs JOIN.",
    note: "Correlated subqueries execute once per outer row. Know when to rewrite them as JOINs for performance.",
    questions: [
      {
        id: "d10_q1",
        num: 1,
        title: "Department Highest Salary",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/department-highest-salary/",
        tag: "(dept_id, salary) IN (SELECT dept_id, MAX(salary))"
      },
      {
        id: "d10_q2",
        num: 2,
        title: "Department Top Three Salaries",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/department-top-three-salaries/",
        tag: "Correlated subquery: 3 > (SELECT COUNT(DISTINCT...))"
      },
      {
        id: "d10_q3",
        num: 3,
        title: "Exchange Seats (correlated logic)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/exchange-seats/",
        tag: "Subquery for (SELECT COUNT(*) FROM seat)"
      },
      {
        id: "d10_q4",
        num: 4,
        title: "Second Highest Salary (subquery version)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/second-highest-salary/",
        tag: "MAX(salary) < (SELECT MAX(salary))"
      },
      {
        id: "d10_q5",
        num: 5,
        title: "Not Boring Movies",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/not-boring-movies/",
        tag: "MOD(id, 2) = 1 AND description != 'boring'"
      },
      {
        id: "d10_q6",
        num: 6,
        title: "List the Total Number of Trades Each Player Participated (EXISTS)",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=alternative-queries",
        tag: "EXISTS correlation check"
      },
      {
        id: "d10_q7",
        num: 7,
        title: "15 Days of Learning SQL (correlated cumulative check)",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/15-days-of-learning-sql/problem",
        tag: "Every consecutive day correlated count"
      },
      {
        id: "d10_q8",
        num: 8,
        title: "Investments in 2016 (subquery + COUNT check)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/investments-in-2016/",
        tag: "IN (subquery 1) AND (lat, lon) IN (subquery 2)"
      },
      {
        id: "d10_q9",
        num: 9,
        title: "Common Table Expressions (CTE) or Subquery Practice Set",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=CTE+or+Subquery",
        tag: "DataLemur Subquery Practice"
      },
      {
        id: "d10_q10",
        num: 10,
        title: "Correlated Subquery Drill Set",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=subquery",
        tag: "StrataScratch correlated subqueries"
      },
      {
        id: "d10_q11",
        num: 11,
        title: "Game Play Analysis IV (subquery on consecutive days)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/game-play-analysis-iv/",
        tag: "First login date correlated match"
      }
    ]
  },
  {
    day: 11,
    phase: "Core",
    title: "Set Operations (UNION, UNION ALL, INTERSECT, EXCEPT)",
    goal: "Combine result sets vertically; understand dedup differences between UNION and UNION ALL.",
    note: "UNION ALL is faster because it does not incur sorting/deduplication overhead.",
    questions: [
      {
        id: "d11_q1",
        num: 1,
        title: "Consecutive Available Seats",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/consecutive-available-seats/",
        tag: "Adjacent seat set union or self join"
      },
      {
        id: "d11_q2",
        num: 2,
        title: "Reformat Department Table (UNION-style pivot alt)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/reformat-department-table/",
        tag: "Multiple monthly projections union/pivot"
      },
      {
        id: "d11_q3",
        num: 3,
        title: "Actors and Directors Who Cooperated At Least Three Times",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times/",
        tag: "Pair grouping & set aggregation"
      },
      {
        id: "d11_q4",
        num: 4,
        title: "Divide numbers (UNION of two label sets)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=alternative-queries",
        tag: "Partitioned label sets via UNION"
      },
      {
        id: "d11_q5",
        num: 5,
        title: "Set Operations Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Set+Operations",
        tag: "DataLemur Set Operations"
      },
      {
        id: "d11_q6",
        num: 6,
        title: "Customers Who Bought All Products (INTERSECT-style logic)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/customers-who-bought-all-products/",
        tag: "HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*))"
      },
      {
        id: "d11_q7",
        num: 7,
        title: "Biggest Window Between Visits (UNION with boundary rows)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=union",
        tag: "UNION with current date / sentinel boundaries"
      },
      {
        id: "d11_q8",
        num: 8,
        title: "Users With Two Purchases Within Seven Days (set + self join)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=purchases",
        tag: "Set union & 7-day interval"
      },
      {
        id: "d11_q9",
        num: 9,
        title: "Print Prime Numbers (UNION ALL generation trick)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/print-prime-numbers/problem",
        tag: "Recursive/UNION ALL sequence generator"
      },
      {
        id: "d11_q10",
        num: 10,
        title: "Monthly Transactions II (UNION of insert/refund events)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/monthly-transactions-ii/",
        tag: "UNION ALL transactions and chargebacks"
      },
      {
        id: "d11_q11",
        num: 11,
        title: "Arithmetic Operators Practice Set",
        platform: "DataLemur",
        difficulty: "Easy",
        url: "https://datalemur.com/questions?category=Arithmetic+Operators",
        tag: "Arithmetic expressions with sets"
      }
    ]
  },
  {
    day: 12,
    phase: "Intermediate",
    title: "Common Table Expressions (CTEs)",
    goal: "WITH clause for readability; chaining multiple CTEs; replacing nested subqueries.",
    note: "CTEs make queries modular, reusable, and much easier to debug in interview rounds.",
    questions: [
      {
        id: "d12_q1",
        num: 1,
        title: "Sales Analysis III",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/sales-analysis-iii/",
        tag: "CTE with MIN/MAX sale_date"
      },
      {
        id: "d12_q2",
        num: 2,
        title: "Percentage of Users Attended a Contest",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/",
        tag: "CTE total users count + ratio"
      },
      {
        id: "d12_q3",
        num: 3,
        title: "Queries Quality and Percentage",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/queries-quality-and-percentage/",
        tag: "CTE aggregated quality metrics"
      },
      {
        id: "d12_q4",
        num: 4,
        title: "Confirmation Rate",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/confirmation-rate/",
        tag: "CTE confirmation counts + LEFT JOIN"
      },
      {
        id: "d12_q5",
        num: 5,
        title: "Number of Transactions per Visit",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/number-of-transactions-per-visit/",
        tag: "Multi-step CTE: visit counts + frequency"
      },
      {
        id: "d12_q6",
        num: 6,
        title: "Restaurant Growth",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/restaurant-growth/",
        tag: "CTE daily amounts before windowing"
      },
      {
        id: "d12_q7",
        num: 7,
        title: "Reported Posts II (CTE with percentage rollups)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/reported-posts-ii/",
        tag: "CTE daily removal percentage then AVG"
      },
      {
        id: "d12_q8",
        num: 8,
        title: "Multi-Step CTE Drill Set",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=with+as",
        tag: "WITH cte1 AS (...), cte2 AS (...)"
      },
      {
        id: "d12_q9",
        num: 9,
        title: "CTE or Subquery Practice Set (continued)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=CTE+or+Subquery",
        tag: "DataLemur CTE Practice"
      },
      {
        id: "d12_q10",
        num: 10,
        title: "Biggest Single Number (CTE with HAVING filter)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/biggest-single-number/",
        tag: "CTE single counts -> SELECT MAX(num)"
      },
      {
        id: "d12_q11",
        num: 11,
        title: "Game Play Analysis IV (CTE with first_login logic)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/game-play-analysis-iv/",
        tag: "CTE first login dates + join next day"
      }
    ]
  },
  {
    day: 13,
    phase: "Intermediate",
    title: "Recursive CTEs & Hierarchical Queries",
    goal: "Traverse org charts, category trees, number sequences using WITH RECURSIVE.",
    note: "Recursive CTE questions are less common as single named LeetCode problems — use the DataLemur tutorial-linked problems and StrataScratch search results to get 10+ genuine recursive-pattern reps.",
    questions: [
      {
        id: "d13_q1",
        num: 1,
        title: "Print Prime Numbers (recursive-style number generation)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/print-prime-numbers/problem",
        tag: "Recursive CTE sequence generation"
      },
      {
        id: "d13_q2",
        num: 2,
        title: "Employee Importance / Hierarchical Reports (recursive traversal)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=recursive",
        tag: "Recursive tree traversal from manager to reports"
      },
      {
        id: "d13_q3",
        num: 3,
        title: "Recursive CTE: Employee Hierarchy Practice",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/sql-tutorial/recursive-ctes",
        tag: "DataLemur complete recursive CTE tutorial"
      },
      {
        id: "d13_q4",
        num: 4,
        title: "Find the Subtree Rooted at a Node (self-referencing tree)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/tree-node/",
        tag: "Hierarchical parent-child tree mapping"
      },
      {
        id: "d13_q5",
        num: 5,
        title: "Generate Date Series with Recursive CTE (custom drill)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Data+Generation+Functions",
        tag: "WITH RECURSIVE dates AS (SELECT ... UNION ALL ...)"
      },
      {
        id: "d13_q6",
        num: 6,
        title: "Category Tree Traversal (parent-child recursive)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=hierarchy",
        tag: "Breadth-first/depth-first category walk"
      },
      {
        id: "d13_q7",
        num: 7,
        title: "Running Number Sequence Generator (WITH RECURSIVE)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=alternative-queries",
        tag: "Recursive CTE anchor + recursive member"
      },
      {
        id: "d13_q8",
        num: 8,
        title: "Organizational Chart / Manager Chain Depth",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=manager",
        tag: "Compute level/depth in hierarchy"
      },
      {
        id: "d13_q9",
        num: 9,
        title: "Bill of Materials Explosion (recursive part hierarchy)",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/sql-tutorial/recursive-ctes",
        tag: "Explode nested sub-assembly parts"
      },
      {
        id: "d13_q10",
        num: 10,
        title: "Fibonacci / Factorial via Recursive CTE (syntax drill)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=alternative-queries",
        tag: "Mathematical recurrence in SQL"
      },
      {
        id: "d13_q11",
        num: 11,
        title: "Consecutive Numbers",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/consecutive-numbers/",
        tag: "Consecutive sequence matching"
      }
    ]
  },
  {
    day: 14,
    phase: "Advanced",
    title: "Window Functions I: Ranking (ROW_NUMBER, RANK, DENSE_RANK, NTILE)",
    goal: "PARTITION BY + ORDER BY fundamentals; deduplication and Top-N-per-group with ranking functions.",
    note: "Difference: ROW_NUMBER gives 1,2,3; RANK gives 1,2,2,4; DENSE_RANK gives 1,2,2,3.",
    questions: [
      {
        id: "d14_q1",
        num: 1,
        title: "Rank Scores",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/rank-scores/",
        tag: "DENSE_RANK() OVER (ORDER BY score DESC)"
      },
      {
        id: "d14_q2",
        num: 2,
        title: "Department Top Three Salaries",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/department-top-three-salaries/",
        tag: "DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) <= 3"
      },
      {
        id: "d14_q3",
        num: 3,
        title: "Nth Highest Salary (DENSE_RANK version)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/nth-highest-salary/",
        tag: "DENSE_RANK() with ranking match"
      },
      {
        id: "d14_q4",
        num: 4,
        title: "Duplicate Emails (ROW_NUMBER dedup approach)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/duplicate-emails/",
        tag: "ROW_NUMBER() OVER (PARTITION BY email) > 1"
      },
      {
        id: "d14_q5",
        num: 5,
        title: "Rank Teams by Votes",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/rank-teams-by-votes/",
        tag: "Multi-level tie-breaking order"
      },
      {
        id: "d14_q6",
        num: 6,
        title: "Find the Quiet Students in All Exams (window + comparison)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-the-quiet-students-in-all-exams/",
        tag: "RANK() / MIN() MAX() window excludes extremes"
      },
      {
        id: "d14_q7",
        num: 7,
        title: "Third Highest Salary in Each Department (ranking window)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=highest+salary",
        tag: "Top-3 ranking window drill"
      },
      {
        id: "d14_q8",
        num: 8,
        title: "3rd Ride Booked by Each User (ROW_NUMBER)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY date) = 3"
      },
      {
        id: "d14_q9",
        num: 9,
        title: "2nd Highest Salary via RANK/DENSE_RANK",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "DataLemur ranking function drills"
      },
      {
        id: "d14_q10",
        num: 10,
        title: "Grouping/Quartiles with NTILE",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "NTILE(4) percentile bucketing"
      },
      {
        id: "d14_q11",
        num: 11,
        title: "Primary Department for Each Employee (ranking + tie-break)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/primary-department-for-each-employee/",
        tag: "COUNT() OVER (PARTITION BY) or ROW_NUMBER"
      }
    ]
  },
  {
    day: 15,
    phase: "Advanced",
    title: "Window Functions II: LAG / LEAD & Frame-Based Aggregates",
    goal: "Row-to-row comparisons, period-over-period change, FIRST_VALUE/LAST_VALUE.",
    note: "Default window frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
    questions: [
      {
        id: "d15_q1",
        num: 1,
        title: "Rising Temperature (LAG-based day-over-day compare)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/rising-temperature/",
        tag: "LAG(temp, 1) OVER (ORDER BY recordDate)"
      },
      {
        id: "d15_q2",
        num: 2,
        title: "Consecutive Numbers (LAG/LEAD version)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/consecutive-numbers/",
        tag: "num = LAG(num, 1) AND num = LAG(num, 2)"
      },
      {
        id: "d15_q3",
        num: 3,
        title: "Sales Analysis III (LAG for first-vs-only-period sales)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/sales-analysis-iii/",
        tag: "Window comparison across periods"
      },
      {
        id: "d15_q4",
        num: 4,
        title: "Game Play Analysis IV (LEAD/LAG on consecutive login days)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/game-play-analysis-iv/",
        tag: "LEAD(event_date) OVER (PARTITION BY player_id)"
      },
      {
        id: "d15_q5",
        num: 5,
        title: "Number of Calls Between Two Persons (FIRST_VALUE dedup)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-calls-between-two-persons/",
        tag: "FIRST_VALUE / window dedup"
      },
      {
        id: "d15_q6",
        num: 6,
        title: "Month-over-Month Growth using LAG",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "(curr - LAG(curr))/LAG(curr) * 100"
      },
      {
        id: "d15_q7",
        num: 7,
        title: "Second Highest Salary Using LAG/LEAD",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=lag",
        tag: "Offset navigation with LEAD/LAG"
      },
      {
        id: "d15_q8",
        num: 8,
        title: "Year-over-Year Change (LAG partitioned by category)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=year+over+year",
        tag: "LAG with PARTITION BY product, year"
      },
      {
        id: "d15_q9",
        num: 9,
        title: "Trips Time Gap Between Consecutive Rides (LAG on timestamp)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "Timestamp diff from LAG(timestamp)"
      },
      {
        id: "d15_q10",
        num: 10,
        title: "Find the Start and End Number of Continuous Ranges",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges/",
        tag: "Gaps-and-islands: log_id - ROW_NUMBER()"
      },
      {
        id: "d15_q11",
        num: 11,
        title: "Human Traffic of Stadium (gaps-and-islands with window)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/human-traffic-of-stadium/",
        tag: "Island grouping id - ROW_NUMBER() OVER ()"
      }
    ]
  },
  {
    day: 16,
    phase: "Advanced",
    title: "Running Totals, Moving Averages & Cumulative Analytics",
    goal: "SUM()/AVG() OVER with frame clauses (ROWS BETWEEN) for cumulative and rolling metrics.",
    note: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW gives exact 7-day rolling window.",
    questions: [
      {
        id: "d16_q1",
        num: 1,
        title: "Restaurant Growth (7-day moving average)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/restaurant-growth/",
        tag: "SUM(amount) OVER (ORDER BY visited_on ROWS 6 PRECEDING)"
      },
      {
        id: "d16_q2",
        num: 2,
        title: "Moving Average from Data Stream (window frame concept)",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/moving-average-from-data-stream/",
        tag: "Sliding window moving average calculation"
      },
      {
        id: "d16_q3",
        num: 3,
        title: "Last Person to Fit in the Elevator (running SUM)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/last-person-to-fit-in-the-elevator/",
        tag: "SUM(weight) OVER (ORDER BY turn) <= 1000"
      },
      {
        id: "d16_q4",
        num: 4,
        title: "Cumulative Salary of an Employee",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/cumulative-salary-of-an-employee/",
        tag: "SUM(salary) OVER (PARTITION BY id ORDER BY month ROWS 2 PRECEDING)"
      },
      {
        id: "d16_q5",
        num: 5,
        title: "Running Total of Daily Active Users",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "SUM(active_users) OVER (ORDER BY day)"
      },
      {
        id: "d16_q6",
        num: 6,
        title: "Cumulative Revenue by Product (running total pattern)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=running+total",
        tag: "Cumulative revenue partition by product"
      },
      {
        id: "d16_q7",
        num: 7,
        title: "30-Day Rolling Average of Transactions",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=rolling+average",
        tag: "30-day range/row frame average"
      },
      {
        id: "d16_q8",
        num: 8,
        title: "Bank Account Summary (balance running total)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/bank-account-summary-ii/",
        tag: "SUM(amount) HAVING sum > 10000"
      },
      {
        id: "d16_q9",
        num: 9,
        title: "Number of Transactions per Visit (cumulative count matching)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/number-of-transactions-per-visit/",
        tag: "Recursive series + cumulative frequency"
      },
      {
        id: "d16_q10",
        num: 10,
        title: "Cumulative Distribution of Scores",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Window+Functions",
        tag: "CUME_DIST() OVER (ORDER BY score)"
      },
      {
        id: "d16_q11",
        num: 11,
        title: "Median Employee Salary (window-based percentile)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/median-employee-salary/",
        tag: "ROW_NUMBER() IN (floor(n/2), ceil(n/2))"
      }
    ]
  },
  {
    day: 17,
    phase: "Advanced",
    title: "Pivoting, Unpivoting & Data Reshaping",
    goal: "Convert rows to columns (CASE-based pivot) and columns to rows (UNION-based unpivot).",
    note: "Modern databases offer PIVOT/UNPIVOT, but interviewers prefer standard portable CASE WHEN aggregations.",
    questions: [
      {
        id: "d17_q1",
        num: 1,
        title: "Reformat Department Table",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/reformat-department-table/",
        tag: "SUM(CASE WHEN month='Jan' THEN revenue END) AS Jan_Revenue"
      },
      {
        id: "d17_q2",
        num: 2,
        title: "Occupations (row-to-column pivot with CASE)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/challenges/occupations/problem",
        tag: "MAX(CASE WHEN Occupation='Doctor' THEN Name END)"
      },
      {
        id: "d17_q3",
        num: 3,
        title: "Pivot Product Sales Data",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/pivot-product-sales-data/",
        tag: "Dynamic pivot columns representation"
      },
      {
        id: "d17_q4",
        num: 4,
        title: "Pivot Product Sales Data II",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/pivot-product-sales-data-ii/",
        tag: "Multi-dimension pivoting"
      },
      {
        id: "d17_q5",
        num: 5,
        title: "Sales by Day of the Week (pivot with CROSS JOIN + CASE)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/sales-by-day-of-the-week/",
        tag: "Days of week pivot columns"
      },
      {
        id: "d17_q6",
        num: 6,
        title: "Monthly Report Pivot (months as columns)",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=pivot",
        tag: "Monthly financial pivot report"
      },
      {
        id: "d17_q7",
        num: 7,
        title: "Unpivot Quarterly Revenue Columns into Rows",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=unpivot",
        tag: "Q1..Q4 columns unpivoted via UNION ALL"
      },
      {
        id: "d17_q8",
        num: 8,
        title: "Product Categories Pivot Drill",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Conditional+Expression",
        tag: "DataLemur Conditional Pivot"
      },
      {
        id: "d17_q9",
        num: 9,
        title: "Grade Distribution Pivot (bucket + CASE columns)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=advanced-select",
        tag: "Grade bucketing into matrix"
      },
      {
        id: "d17_q10",
        num: 10,
        title: "Count Salary Categories (bucketed pivot with UNION ALL)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/count-salary-categories/",
        tag: "Low/Average/High Salary categories UNION ALL"
      },
      {
        id: "d17_q11",
        num: 11,
        title: "Percentage Calculations Practice Set (pivot-adjacent)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Percentage+Calculations",
        tag: "Percentages reshaped into reports"
      }
    ]
  },
  {
    day: 18,
    phase: "Advanced",
    title: "Advanced Multi-Concept Problems (Joins + Window + CTE Combined)",
    goal: "Simulate hard interview questions that require chaining 3+ concepts learned so far.",
    note: "Break the problem down: Step 1 = Filter & Join, Step 2 = Window metrics in CTE, Step 3 = Final selection.",
    questions: [
      {
        id: "d18_q1",
        num: 1,
        title: "Trips and Users",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/trips-and-users/",
        tag: "Multi-joins + condition filtering + ROUND cancellation rate"
      },
      {
        id: "d18_q2",
        num: 2,
        title: "Human Traffic of Stadium",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/human-traffic-of-stadium/",
        tag: "Gaps-and-islands + CTE + window function count"
      },
      {
        id: "d18_q3",
        num: 3,
        title: "Department Top Three Salaries",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/department-top-three-salaries/",
        tag: "CTE + DENSE_RANK() + JOIN Department"
      },
      {
        id: "d18_q4",
        num: 4,
        title: "Number of Transactions per Visit",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/number-of-transactions-per-visit/",
        tag: "Recursive CTE + LEFT JOIN + GROUP BY counts"
      },
      {
        id: "d18_q5",
        num: 5,
        title: "Median Employee Salary",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/median-employee-salary/",
        tag: "CTE + ROW_NUMBER() + COUNT() window median logic"
      },
      {
        id: "d18_q6",
        num: 6,
        title: "Cumulative Salary of an Employee",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/cumulative-salary-of-an-employee/",
        tag: "Exclude most recent month + 3-month rolling window SUM"
      },
      {
        id: "d18_q7",
        num: 7,
        title: "Interviews",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/interviews/problem",
        tag: "Pre-aggregate submissions & views in CTEs + 5-table JOIN"
      },
      {
        id: "d18_q8",
        num: 8,
        title: "Contest Leaderboard",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/contest-leaderboard/problem",
        tag: "Subquery max score + total score filter"
      },
      {
        id: "d18_q9",
        num: 9,
        title: "15 Days of Learning SQL",
        platform: "HackerRank",
        difficulty: "Hard",
        url: "https://www.hackerrank.com/challenges/15-days-of-learning-sql/problem",
        tag: "Cumulative consecutive submission streak per day"
      },
      {
        id: "d18_q10",
        num: 10,
        title: "Hard-tagged Multi-Concept Drill Set",
        platform: "StrataScratch",
        difficulty: "Hard",
        url: "https://platform.stratascratch.com/coding?filters%5Bdifficulty%5D%5B%5D=hard",
        tag: "StrataScratch Hard Interview Question Set"
      },
      {
        id: "d18_q11",
        num: 11,
        title: "Hard-tagged Multi-Concept Drill Set",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?difficulty=Hard",
        tag: "DataLemur Hard Interview Question Set"
      }
    ]
  },
  {
    day: 19,
    phase: "Advanced",
    title: "Query Optimization, Indexing & EXPLAIN-Based Reasoning",
    goal: "Practice rewriting slow queries, spotting index opportunities, and reasoning about execution plans — via applied problems, not theory reading.",
    note: "True index/EXPLAIN tuning needs a live database engine, not just an online judge. Use these problems to practice writing the SAME query 2–3 different ways (subquery vs JOIN vs window function) and reason about which would scale better on large data.",
    questions: [
      {
        id: "d19_q1",
        num: 1,
        title: "Rewrite EXISTS vs IN vs JOIN for Customers Who Never Order",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/customers-who-never-order/",
        tag: "Benchmark: LEFT JOIN WHERE IS NULL vs NOT EXISTS vs NOT IN"
      },
      {
        id: "d19_q2",
        num: 2,
        title: "Optimize Trips and Users (large-table hard query)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/trips-and-users/",
        tag: "Predicate pushdown before joining large tables"
      },
      {
        id: "d19_q3",
        num: 3,
        title: "Optimize Human Traffic of Stadium (avoid multiple self joins)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/human-traffic-of-stadium/",
        tag: "Replace 3x self-join with single window pass"
      },
      {
        id: "d19_q4",
        num: 4,
        title: "Weather Type Extreme (performance-tagged medium set)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problemset/database/?difficulty=MEDIUM",
        tag: "Index utilization on date columns"
      },
      {
        id: "d19_q5",
        num: 5,
        title: "Efficient Second Highest Salary (avoid nested MAX subquery)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/second-highest-salary/",
        tag: "Index scan via LIMIT 1 OFFSET 1 vs nested aggregation"
      },
      {
        id: "d19_q6",
        num: 6,
        title: "Efficient Department Top Three Salaries (window vs correlated)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/department-top-three-salaries/",
        tag: "Window function O(N log N) vs correlated subquery O(N^2)"
      },
      {
        id: "d19_q7",
        num: 7,
        title: "Query Runtime & Index Reasoning Discussions",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/trips-and-users/solutions/",
        tag: "Study top-voted solutions comparing execution plans"
      },
      {
        id: "d19_q8",
        num: 8,
        title: "SQL Performance Case Studies",
        platform: "StrataScratch",
        difficulty: "Medium",
        url: "https://platform.stratascratch.com/coding?search=performance",
        tag: "Industry real-world query optimization case studies"
      },
      {
        id: "d19_q9",
        num: 9,
        title: "Explain Plan Practice: Rewriting Correlated Subqueries as Joins",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=CTE+or+Subquery",
        tag: "Correlated subquery elimination"
      },
      {
        id: "d19_q10",
        num: 10,
        title: "Mathematical Functions Practice Set (compute-in-query vs pre-compute)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Mathematical+Functions",
        tag: "SARGable queries: avoid functions on indexed columns in WHERE"
      },
      {
        id: "d19_q11",
        num: 11,
        title: "Data Type Conversion Practice Set (avoiding implicit-cast index misses)",
        platform: "DataLemur",
        difficulty: "Medium",
        url: "https://datalemur.com/questions?category=Data+Type+Conversion",
        tag: "Implicit type conversions breaking index seeks"
      }
    ]
  },
  {
    day: 20,
    phase: "Capstone",
    title: "Full-Length Mixed Interview Simulation (Top Company Tags)",
    goal: "Timed mock — treat this as a real interview round covering every concept from Days 1–19.",
    note: "Congratulations on completing the 20-day plan! Repeat Days 14–18 (window functions, CTEs, multi-concept problems) once more before any real interview — these are the highest-frequency topics in SQL interview rounds.",
    questions: [
      {
        id: "d20_q1",
        num: 1,
        title: "LeetCode Curated SQL 50 Study Plan (full set)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/studyplan/top-sql-50/",
        tag: "Top SQL 50 curated industry interview list"
      },
      {
        id: "d20_q2",
        num: 2,
        title: "LeetCode Advanced SQL 50 Study Plan (full set)",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/studyplan/premium-sql-50/",
        tag: "Advanced SQL 50 questions collection"
      },
      {
        id: "d20_q3",
        num: 3,
        title: "Amazon-Tagged SQL Interview Questions",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?company=Amazon",
        tag: "Amazon SQL interview simulations"
      },
      {
        id: "d20_q4",
        num: 4,
        title: "Google-Tagged SQL Interview Questions",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?company=Google",
        tag: "Google SQL interview simulations"
      },
      {
        id: "d20_q5",
        num: 5,
        title: "Meta-Tagged SQL Interview Questions",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?company=Meta",
        tag: "Meta SQL interview simulations"
      },
      {
        id: "d20_q6",
        num: 6,
        title: "Microsoft-Tagged SQL Interview Questions",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?company=Microsoft",
        tag: "Microsoft SQL interview simulations"
      },
      {
        id: "d20_q7",
        num: 7,
        title: "Uber-Tagged SQL Interview Questions",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?company=Uber",
        tag: "Uber SQL interview simulations"
      },
      {
        id: "d20_q8",
        num: 8,
        title: "Amazon SQL Interview Questions (curated set)",
        platform: "StrataScratch",
        difficulty: "Hard",
        url: "https://platform.stratascratch.com/coding?company=Amazon",
        tag: "StrataScratch Amazon problems set"
      },
      {
        id: "d20_q9",
        num: 9,
        title: "Full HackerRank SQL Domain (all subdomains, mixed order)",
        platform: "HackerRank",
        difficulty: "Medium",
        url: "https://www.hackerrank.com/domains/sql",
        tag: "Full domain mixed timed drill"
      },
      {
        id: "d20_q10",
        num: 10,
        title: "LeetCode Full Database Problem Set (randomize, timed run)",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problemset/database/",
        tag: "Randomized database problems"
      },
      {
        id: "d20_q11",
        num: 11,
        title: "Netflix / Spotify-Tagged Mixed Questions (analytics-heavy)",
        platform: "StrataScratch",
        difficulty: "Hard",
        url: "https://platform.stratascratch.com/coding?search=Netflix",
        tag: "Entertainment / Streaming SQL business analytics"
      },
      {
        id: "d20_q12",
        num: 12,
        title: "Full Mixed Hard Set — final timed round (aim: 5 hard questions in 90 min)",
        platform: "DataLemur",
        difficulty: "Hard",
        url: "https://datalemur.com/questions?difficulty=Hard",
        tag: "Final Timed Capstone Challenge (5 Hard in 90 min)"
      }
    ]
  }
];

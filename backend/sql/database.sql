-- ============================================================
-- IntelliQuiz — Complete Database Setup & Seed
-- File: sql/database.sql
-- Run this in phpMyAdmin or MySQL command line
-- ============================================================

-- Create and select the database
CREATE DATABASE IF NOT EXISTS intelliquiz
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE intelliquiz;

-- ============================================================
-- TABLE: quizzes
-- ============================================================
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;

CREATE TABLE quizzes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20)  NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLE: questions
-- ============================================================
CREATE TABLE questions (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id        INT          NOT NULL,
  question       TEXT         NOT NULL,
  option_a       VARCHAR(500) NOT NULL,
  option_b       VARCHAR(500) NOT NULL,
  option_c       VARCHAR(500) NOT NULL,
  option_d       VARCHAR(500) NOT NULL,
  correct_answer CHAR(1)      NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLE: results
-- ============================================================
CREATE TABLE results (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id         INT NOT NULL,
  score           INT NOT NULL DEFAULT 0,
  total_questions INT NOT NULL DEFAULT 0,
  percentage      INT NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- SEED: Quizzes
-- ============================================================
INSERT INTO quizzes (course_code, title, description) VALUES
  ('CSC301', 'Object Oriented Programming In JAVA',          'Covers OOP principles, Java syntax, inheritance, polymorphism, and design patterns.'),
  ('CSC303', 'Database Design and Management',               'Covers relational database theory, SQL, normalization, transactions, and DBMS concepts.'),
  ('CSC305', 'Web Programming',                              'Covers HTML, CSS, JavaScript, HTTP, REST, and modern web development practices.'),
  ('CSC307', 'Operation Research',                           'Covers linear programming, simplex method, network models, and decision analysis.'),
  ('CSC309', 'Data Structures & Analysis Of Algorithms',    'Covers arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis.'),
  ('CSC311', 'System Analysis and Design',                   'Covers SDLC, requirements engineering, UML, prototyping, and system modelling.'),
  ('CSC315', 'System Programming with C',                    'Covers C language, pointers, memory management, system calls, and process control.'),
  ('CSC317', 'Digital Signal Processing',                    'Covers sampling, Fourier transforms, digital filters, and signal analysis.'),
  ('CSC319', 'Introduction to Principles of Computer System Design', 'Covers computer architecture, processor design, memory hierarchy, and I/O systems.');

-- ============================================================
-- SEED: CSC301 — Object Oriented Programming In JAVA (20 Qs)
-- ============================================================
SET @q1 = (SELECT id FROM quizzes WHERE course_code = 'CSC301');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q1, 'Which keyword is used to inherit a class in Java?', 'implements', 'extends', 'inherits', 'super', 'B'),
(@q1, 'Which of the following is NOT a feature of Object Oriented Programming?', 'Encapsulation', 'Polymorphism', 'Compilation', 'Inheritance', 'C'),
(@q1, 'What does JVM stand for?', 'Java Virtual Machine', 'Java Variable Method', 'Java Verified Module', 'Java Vital Memory', 'A'),
(@q1, 'Which access modifier makes a member accessible only within the same class?', 'public', 'protected', 'default', 'private', 'D'),
(@q1, 'What is the output of System.out.println(10 / 3) in Java?', '3.33', '3', '3.0', 'Error', 'B'),
(@q1, 'Which method is the entry point of a Java application?', 'start()', 'run()', 'main()', 'init()', 'C'),
(@q1, 'What is method overloading?', 'A method calling itself', 'Multiple methods with same name but different parameters', 'A method with no return type', 'Overriding a parent method', 'B'),
(@q1, 'In Java, which class is the superclass of all classes?', 'Class', 'Super', 'Object', 'Base', 'C'),
(@q1, 'Which keyword prevents a class from being subclassed?', 'static', 'final', 'abstract', 'private', 'B'),
(@q1, 'What is encapsulation?', 'Hiding data using access modifiers', 'Inheriting from multiple classes', 'Defining multiple methods with the same name', 'Compiling code into bytecode', 'A'),
(@q1, 'Which of these is a marker interface in Java?', 'Runnable', 'Serializable', 'Comparable', 'Iterable', 'B'),
(@q1, 'What does the "this" keyword refer to in Java?', 'The parent class', 'The current object', 'The main method', 'A static field', 'B'),
(@q1, 'Which concept allows a subclass to provide a specific implementation of a method in its superclass?', 'Overloading', 'Abstraction', 'Overriding', 'Encapsulation', 'C'),
(@q1, 'What is an abstract class?', 'A class with no methods', 'A class that cannot be instantiated', 'A class with only static methods', 'A fully implemented class', 'B'),
(@q1, 'Which collection class allows duplicate elements and maintains insertion order?', 'HashSet', 'TreeSet', 'ArrayList', 'HashMap', 'C'),
(@q1, 'What is the size of an int data type in Java?', '8 bits', '16 bits', '32 bits', '64 bits', 'C'),
(@q1, 'Which exception is thrown when dividing an integer by zero?', 'NullPointerException', 'ArithmeticException', 'ClassCastException', 'ArrayIndexOutOfBoundsException', 'B'),
(@q1, 'What does the "static" keyword mean when applied to a method?', 'The method cannot be overridden', 'The method belongs to the class, not instances', 'The method runs first on startup', 'The method is private', 'B'),
(@q1, 'Which interface must be implemented to sort objects using Collections.sort()?', 'Runnable', 'Iterable', 'Comparable', 'Cloneable', 'C'),
(@q1, 'What is a constructor in Java?', 'A method that returns the class name', 'A special method called when an object is created', 'A static method that initializes variables', 'A method used for garbage collection', 'B');

-- ============================================================
-- SEED: CSC303 — Database Design and Management (20 Qs)
-- ============================================================
SET @q2 = (SELECT id FROM quizzes WHERE course_code = 'CSC303');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q2, 'What does DBMS stand for?', 'Data Backup Management System', 'Database Management System', 'Digital Base Mapping System', 'Database Modelling Service', 'B'),
(@q2, 'Which SQL command is used to retrieve data from a database?', 'INSERT', 'UPDATE', 'SELECT', 'DELETE', 'C'),
(@q2, 'Which normal form removes partial dependencies?', 'First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)', 'B'),
(@q2, 'What is a primary key?', 'A key that can be NULL', 'A foreign key linking two tables', 'A unique identifier for each record in a table', 'A key used only for searching', 'C'),
(@q2, 'Which JOIN returns all records from both tables, with NULLs where there is no match?', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'D'),
(@q2, 'What does DDL stand for?', 'Data Definition Language', 'Data Deletion Language', 'Dynamic Data Layer', 'Database Design Logic', 'A'),
(@q2, 'Which SQL command is used to add a new row to a table?', 'ADD', 'INSERT INTO', 'UPDATE', 'CREATE', 'B'),
(@q2, 'What property ensures that a committed transaction remains saved even after a system crash?', 'Atomicity', 'Consistency', 'Isolation', 'Durability', 'D'),
(@q2, 'Which of the following is NOT a type of database relationship?', 'One-to-One', 'One-to-Many', 'Many-to-Many', 'Many-to-None', 'D'),
(@q2, 'What is a foreign key?', 'A primary key from another table referenced in the current table', 'A key used only for encryption', 'A key that must always be NULL', 'The first column of any table', 'A'),
(@q2, 'What does the GROUP BY clause do in SQL?', 'Filters rows before grouping', 'Sorts the result in ascending order', 'Groups rows sharing a property for aggregate functions', 'Joins two tables on a common field', 'C'),
(@q2, 'Which command removes all rows from a table without deleting the table structure?', 'DROP', 'DELETE', 'TRUNCATE', 'REMOVE', 'C'),
(@q2, 'In an ER diagram, what shape represents an entity?', 'Diamond', 'Oval', 'Rectangle', 'Triangle', 'C'),
(@q2, 'Which SQL clause is used to filter groups after GROUP BY?', 'WHERE', 'HAVING', 'FILTER', 'CONDITION', 'B'),
(@q2, 'What is a view in SQL?', 'A stored physical table', 'A virtual table based on a SELECT query', 'An index on a table', 'A backup copy of a table', 'B'),
(@q2, 'Which ACID property ensures that a transaction is treated as a single unit?', 'Atomicity', 'Consistency', 'Isolation', 'Durability', 'A'),
(@q2, 'What is data redundancy?', 'Storing data in a compressed format', 'Unnecessary duplication of data in a database', 'Encrypting sensitive database fields', 'Indexing a table for faster queries', 'B'),
(@q2, 'Which SQL aggregate function returns the number of rows?', 'SUM()', 'AVG()', 'COUNT()', 'MAX()', 'C'),
(@q2, 'What is an index in a database?', 'A type of table join', 'A data structure that improves query speed', 'A constraint preventing duplicate values', 'A view created from multiple tables', 'B'),
(@q2, 'Which command is used to modify existing data in a table?', 'INSERT', 'ALTER', 'UPDATE', 'MODIFY', 'C');

-- ============================================================
-- SEED: CSC305 — Web Programming (20 Qs)
-- ============================================================
SET @q3 = (SELECT id FROM quizzes WHERE course_code = 'CSC305');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q3, 'What does HTML stand for?', 'HyperText Markup Language', 'High Transfer Markup Language', 'HyperText Management Level', 'Hyper Transfer Mode Language', 'A'),
(@q3, 'Which CSS property changes the text color?', 'font-color', 'text-color', 'color', 'background-color', 'C'),
(@q3, 'Which HTML tag is used to link an external CSS file?', '<style>', '<css>', '<link>', '<script>', 'C'),
(@q3, 'What does HTTP stand for?', 'HyperText Transfer Protocol', 'High Transfer Text Process', 'HyperText Terminal Protocol', 'Home Transfer Text Protocol', 'A'),
(@q3, 'Which JavaScript method selects an element by its ID?', 'document.getClass()', 'document.querySelector()', 'document.getElementById()', 'document.selectId()', 'C'),
(@q3, 'What is the correct HTTP status code for "Not Found"?', '200', '301', '403', '404', 'D'),
(@q3, 'Which HTML attribute specifies the URL of a hyperlink?', 'src', 'href', 'link', 'url', 'B'),
(@q3, 'What does CSS stand for?', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Coding Style Syntax', 'A'),
(@q3, 'Which JavaScript keyword declares a block-scoped variable?', 'var', 'set', 'let', 'def', 'C'),
(@q3, 'What does REST stand for in web development?', 'Remote Execution State Transfer', 'Representational State Transfer', 'Responsive Element Style Template', 'Real-time Event State Trigger', 'B'),
(@q3, 'Which HTML5 element is used for semantic navigation?', '<div>', '<section>', '<nav>', '<span>', 'C'),
(@q3, 'What is a JSON?', 'JavaScript Object Notation — a data interchange format', 'Java Serialized Object Network', 'JavaScript Online Notation', 'Just Structured Object Name', 'A'),
(@q3, 'Which CSS property controls the space between elements outside the border?', 'padding', 'margin', 'spacing', 'border-gap', 'B'),
(@q3, 'What is the purpose of the <meta charset="UTF-8"> tag?', 'Defines the page language', 'Specifies the character encoding of the page', 'Links a font file', 'Sets the page title', 'B'),
(@q3, 'Which event fires when a user clicks a button in JavaScript?', 'onhover', 'onpress', 'onclick', 'onsubmit', 'C'),
(@q3, 'Which HTTP method is used to send data to a server to create a resource?', 'GET', 'POST', 'PUT', 'DELETE', 'B'),
(@q3, 'What is the purpose of the alt attribute on an <img> tag?', 'Sets the image width', 'Provides alternative text if the image fails to load', 'Links to another image', 'Defines image opacity', 'B'),
(@q3, 'Which JavaScript method converts a JSON string to a JavaScript object?', 'JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.decode()', 'B'),
(@q3, 'What does the DOM stand for?', 'Document Object Model', 'Display Output Manager', 'Dynamic Object Method', 'Document Order Map', 'A'),
(@q3, 'Which CSS unit is relative to the font-size of the root element?', 'em', 'px', 'rem', '%', 'C');

-- ============================================================
-- SEED: CSC307 — Operation Research (20 Qs)
-- ============================================================
SET @q4 = (SELECT id FROM quizzes WHERE course_code = 'CSC307');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q4, 'What is the primary goal of Operations Research?', 'Writing optimal code', 'Optimal decision-making using mathematical models', 'Managing a software team', 'Designing relational databases', 'B'),
(@q4, 'Which method is used to solve Linear Programming Problems?', 'Newton-Raphson Method', 'Simplex Method', 'Bisection Method', 'Euler Method', 'B'),
(@q4, 'What is a feasible solution in Linear Programming?', 'A solution that violates at least one constraint', 'A solution that satisfies all constraints', 'The optimal solution only', 'A solution with the minimum cost', 'B'),
(@q4, 'What does the objective function represent in an LP problem?', 'The set of all constraints', 'The quantity to be maximized or minimized', 'The feasible region boundary', 'The slack variable value', 'B'),
(@q4, 'In the simplex method, which variable enters the basis?', 'The variable with the most negative coefficient in the objective row', 'The variable with the smallest value', 'The variable with a zero coefficient', 'The variable with the largest value', 'A'),
(@q4, 'What is a slack variable?', 'A variable subtracted to convert a >= constraint to equality', 'A variable added to convert a <= constraint to equality', 'A variable with no constraints', 'A negative variable in the objective function', 'B'),
(@q4, 'Which of the following is a network model in Operations Research?', 'Simplex Method', 'Assignment Problem', 'Transportation Problem', 'Integer Programming', 'C'),
(@q4, 'The feasible region of a Linear Programming Problem is always?', 'Circular', 'A convex polygon', 'A straight line', 'An ellipse', 'B'),
(@q4, 'What is the Transportation Problem primarily used for?', 'Scheduling flights', 'Minimizing cost of distributing goods from sources to destinations', 'Designing communication networks', 'Inventory control systems', 'B'),
(@q4, 'Which method finds an initial basic feasible solution for transportation problems?', 'Simplex Method', 'North-West Corner Method', 'Assignment Method', 'Branch and Bound', 'B'),
(@q4, 'What is degeneracy in a transportation problem?', 'A solution with non-integer values', 'When the number of basic variables is less than m + n - 1', 'A solution that violates supply constraints', 'An infeasible solution', 'B'),
(@q4, 'What type of problem involves assigning n jobs to n machines at minimum cost?', 'Transportation Problem', 'Sequencing Problem', 'Assignment Problem', 'Queuing Problem', 'C'),
(@q4, 'The Hungarian Algorithm is used to solve:', 'Network flow problems', 'Assignment problems', 'LP relaxation problems', 'Integer programming problems', 'B'),
(@q4, 'In decision theory, what is a payoff matrix?', 'A matrix showing costs of constraints', 'A table showing outcomes for each decision-state combination', 'A matrix showing probabilities of events', 'A simplex tableau', 'B'),
(@q4, 'What is the maximin criterion in decision-making?', 'Maximize the maximum possible payoff', 'Maximize the minimum possible payoff', 'Minimize the maximum possible regret', 'Minimize the total cost', 'B'),
(@q4, 'Which approach is used when probabilities of states of nature are known?', 'Maximin', 'Minimax Regret', 'Expected Monetary Value (EMV)', 'Laplace Criterion', 'C'),
(@q4, 'What is the Critical Path in Project Management?', 'The shortest path through the project network', 'The longest path that determines the minimum project duration', 'The path with the most activities', 'The path with the least cost', 'B'),
(@q4, 'PERT stands for:', 'Project Evaluation and Review Technique', 'Probabilistic Estimation and Resource Tracking', 'Program Evaluation and Routing Test', 'Project Execution and Resource Table', 'A'),
(@q4, 'What does EOQ stand for in inventory management?', 'Expected Order Quantity', 'Economic Order Quantity', 'Estimated Output Quality', 'Effective Operations Queue', 'B'),
(@q4, 'In queuing theory, what does the symbol λ (lambda) typically represent?', 'Service rate', 'Queue length', 'Arrival rate', 'Utilization factor', 'C');

-- ============================================================
-- SEED: CSC309 — Data Structures & Analysis Of Algorithms (20 Qs)
-- ============================================================
SET @q5 = (SELECT id FROM quizzes WHERE course_code = 'CSC309');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q5, 'What is the time complexity of binary search on a sorted array?', 'O(n)', 'O(n²)', 'O(log n)', 'O(1)', 'C'),
(@q5, 'Which data structure operates on the LIFO principle?', 'Queue', 'Stack', 'Linked List', 'Tree', 'B'),
(@q5, 'Which data structure operates on the FIFO principle?', 'Stack', 'Tree', 'Queue', 'Graph', 'C'),
(@q5, 'What is the worst-case time complexity of Bubble Sort?', 'O(n log n)', 'O(n)', 'O(n²)', 'O(log n)', 'C'),
(@q5, 'In a singly linked list, each node contains:', 'Data and two pointers', 'Only data', 'Data and one pointer to the next node', 'A key-value pair', 'C'),
(@q5, 'Which traversal visits nodes in the order: Left, Root, Right?', 'Pre-order', 'Post-order', 'Level-order', 'In-order', 'D'),
(@q5, 'What is the height of a balanced binary tree with n nodes?', 'O(n)', 'O(log n)', 'O(n²)', 'O(1)', 'B'),
(@q5, 'Which sorting algorithm has the best average-case time complexity?', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort', 'C'),
(@q5, 'What is the space complexity of Merge Sort?', 'O(1)', 'O(log n)', 'O(n)', 'O(n²)', 'C'),
(@q5, 'Which data structure is used for implementing recursion internally?', 'Queue', 'Stack', 'Heap', 'Array', 'B'),
(@q5, 'What does Big O notation describe?', 'The exact running time of an algorithm', 'The best-case complexity of an algorithm', 'An upper bound on the growth rate of an algorithm', 'The memory usage of an algorithm', 'C'),
(@q5, 'Which algorithm is used to find the shortest path in a weighted graph?', 'BFS', 'DFS', 'Dijkstra\'s Algorithm', 'Prim\'s Algorithm', 'C'),
(@q5, 'What is a Hash Table used for?', 'Sorting data efficiently', 'Storing key-value pairs with fast lookup', 'Traversing a graph', 'Building a binary tree', 'B'),
(@q5, 'What is a heap data structure?', 'A sorted linked list', 'A complete binary tree satisfying the heap property', 'A doubly linked list', 'A linear array with constant-time access', 'B'),
(@q5, 'Which graph traversal algorithm uses a queue?', 'Depth First Search (DFS)', 'Breadth First Search (BFS)', 'Dijkstra\'s Algorithm', 'Prim\'s Algorithm', 'B'),
(@q5, 'What is the time complexity of accessing an element in an array by index?', 'O(n)', 'O(log n)', 'O(1)', 'O(n²)', 'C'),
(@q5, 'Which of the following is a self-balancing binary search tree?', 'Binary Heap', 'B-Tree', 'AVL Tree', 'Trie', 'C'),
(@q5, 'What is a circular queue?', 'A queue that allows traversal from both ends', 'A linear queue with no rear limit', 'A queue where the last position is connected back to the first', 'A doubly linked queue', 'C'),
(@q5, 'Which algorithm design technique breaks a problem into smaller overlapping subproblems?', 'Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking', 'C'),
(@q5, 'What is the time complexity of inserting an element at the beginning of a linked list?', 'O(n)', 'O(n²)', 'O(log n)', 'O(1)', 'D');

-- ============================================================
-- SEED: CSC311 — System Analysis and Design (20 Qs)
-- ============================================================
SET @q6 = (SELECT id FROM quizzes WHERE course_code = 'CSC311');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q6, 'What does SDLC stand for?', 'Software Design and Lifecycle', 'System Development Life Cycle', 'Software Deployment and Launch Cycle', 'System Design and Logic Control', 'B'),
(@q6, 'Which SDLC phase involves gathering user requirements?', 'Design', 'Implementation', 'Planning and Requirements Analysis', 'Maintenance', 'C'),
(@q6, 'What is a Data Flow Diagram (DFD) used for?', 'Designing the database schema', 'Showing how data flows through a system', 'Writing test cases', 'Managing project schedules', 'B'),
(@q6, 'In a DFD, what does a rectangle represent?', 'A process', 'A data store', 'An external entity', 'A data flow', 'C'),
(@q6, 'Which model follows a strict sequential phase approach?', 'Agile Model', 'Spiral Model', 'Waterfall Model', 'Prototype Model', 'C'),
(@q6, 'What is a Use Case Diagram used for?', 'Showing database relationships', 'Depicting system functionalities from a user perspective', 'Modeling data flow between components', 'Drawing class hierarchies', 'B'),
(@q6, 'What does UML stand for?', 'Universal Modelling Logic', 'Unified Modelling Language', 'User Management Layer', 'Unified Module Library', 'B'),
(@q6, 'Which technique is used to identify system requirements through interviews and surveys?', 'Feasibility Study', 'Requirements Elicitation', 'System Testing', 'Code Review', 'B'),
(@q6, 'What is a prototype in system development?', 'The final version of the system', 'A working model of the system built for early feedback', 'The system documentation', 'A database backup', 'B'),
(@q6, 'What is the purpose of a Feasibility Study?', 'To write the system code', 'To determine if a project is viable technically and financially', 'To train end users', 'To design the UI', 'B'),
(@q6, 'Which diagram shows the sequence of interactions between system components over time?', 'Class Diagram', 'Use Case Diagram', 'Sequence Diagram', 'Activity Diagram', 'C'),
(@q6, 'What is structured walkthrough?', 'A physical walkthrough of the office', 'A peer review technique for evaluating system designs or code', 'A method for creating system backups', 'An automated testing technique', 'B'),
(@q6, 'Which SDLC model is best suited for projects with well-defined requirements?', 'Agile', 'Spiral', 'Waterfall', 'Rapid Application Development', 'C'),
(@q6, 'What does a context-level DFD (Level 0) represent?', 'All internal processes of the system', 'A high-level view showing the system as a single process with external entities', 'The database schema', 'User authentication flow', 'B'),
(@q6, 'What is a Gantt Chart used for in project management?', 'Showing data flow between modules', 'Scheduling and tracking project tasks over time', 'Designing the system architecture', 'Documenting system requirements', 'B'),
(@q6, 'What is the main purpose of system testing?', 'To write the system code', 'To verify the complete system meets requirements', 'To train the users', 'To back up the database', 'B'),
(@q6, 'Which type of maintenance fixes bugs discovered after deployment?', 'Adaptive Maintenance', 'Perfective Maintenance', 'Corrective Maintenance', 'Preventive Maintenance', 'C'),
(@q6, 'What is an Entity-Relationship (ER) Diagram used for?', 'Showing process flow in a system', 'Modelling data and relationships in a database', 'Designing user interfaces', 'Writing test scripts', 'B'),
(@q6, 'Which document formally captures all functional and non-functional requirements?', 'Project Charter', 'Software Requirements Specification (SRS)', 'Test Plan', 'Design Specification', 'B'),
(@q6, 'In Agile methodology, what is a "Sprint"?', 'A sprint through the office for team bonding', 'A fixed time period (usually 1–4 weeks) for completing a set of tasks', 'A type of software testing', 'A deployment pipeline stage', 'B');

-- ============================================================
-- SEED: CSC315 — System Programming with C (20 Qs)
-- ============================================================
SET @q7 = (SELECT id FROM quizzes WHERE course_code = 'CSC315');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q7, 'Which function is used to allocate memory dynamically in C?', 'alloc()', 'new()', 'malloc()', 'create()', 'C'),
(@q7, 'What is a pointer in C?', 'A variable that stores a memory address', 'A variable that stores a character value', 'A function that returns a value', 'A loop control variable', 'A'),
(@q7, 'Which operator is used to access the value at the address stored in a pointer?', '&', '*', '->', '.', 'B'),
(@q7, 'What does the free() function do in C?', 'Clears the screen', 'Deallocates dynamically allocated memory', 'Frees a file handle', 'Initializes a variable to zero', 'B'),
(@q7, 'Which header file is needed for input/output functions in C?', '<stdlib.h>', '<string.h>', '<stdio.h>', '<math.h>', 'C'),
(@q7, 'What is the output of printf("%d", sizeof(int)) on a 32-bit system?', '2', '4', '8', '1', 'B'),
(@q7, 'Which system call is used to create a new process in Unix/Linux?', 'exec()', 'spawn()', 'fork()', 'create()', 'C'),
(@q7, 'What does the & operator return when applied to a variable?', 'The value of the variable', 'The memory address of the variable', 'The size of the variable', 'A pointer to a pointer', 'B'),
(@q7, 'Which function is used to copy a string in C?', 'strcat()', 'strcpy()', 'strcmp()', 'strlen()', 'B'),
(@q7, 'What is a null pointer in C?', 'A pointer to address 0 (or NULL), indicating it points to nothing', 'A pointer to a string value', 'A pointer that stores a negative address', 'An uninitialized integer pointer', 'A'),
(@q7, 'Which storage class makes a variable retain its value between function calls?', 'auto', 'register', 'static', 'extern', 'C'),
(@q7, 'What is a structure (struct) in C?', 'A built-in data type like int', 'A user-defined data type grouping related variables', 'A loop construct', 'A type of pointer', 'B'),
(@q7, 'Which function reads a character from standard input in C?', 'scanf()', 'getchar()', 'gets()', 'fread()', 'B'),
(@q7, 'What is a segmentation fault?', 'A syntax error in C code', 'A runtime error caused by accessing restricted memory', 'A compile-time warning', 'A file I/O error', 'B'),
(@q7, 'What does the exec() family of functions do?', 'Creates a new child process', 'Replaces the current process image with a new program', 'Terminates the current process', 'Reads from a file descriptor', 'B'),
(@q7, 'Which function is used to open a file in C?', 'open()', 'fopen()', 'fileopen()', 'readfile()', 'B'),
(@q7, 'What is the purpose of the Makefile in C projects?', 'It stores database credentials', 'It automates the build and compilation process', 'It documents the code', 'It manages memory allocation', 'B'),
(@q7, 'What is a pipe in Unix system programming?', 'A file type for storing logs', 'A mechanism for inter-process communication using a data stream', 'A pointer type for system calls', 'A network socket', 'B'),
(@q7, 'What is the difference between calloc() and malloc()?', 'malloc() initializes memory to zero; calloc() does not', 'calloc() initializes memory to zero; malloc() does not', 'They are identical functions', 'calloc() allocates on the stack; malloc() on the heap', 'B'),
(@q7, 'Which signal is sent to a process when it is terminated by Ctrl+C?', 'SIGTERM', 'SIGKILL', 'SIGINT', 'SIGHUP', 'C');

-- ============================================================
-- SEED: CSC317 — Digital Signal Processing (20 Qs)
-- ============================================================
SET @q8 = (SELECT id FROM quizzes WHERE course_code = 'CSC317');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q8, 'What is the Nyquist Theorem?', 'A signal must be sampled at least twice its highest frequency to be reconstructed accurately', 'Signals must be filtered before transmission', 'Digital signals are always superior to analog signals', 'A theorem for calculating signal power', 'A'),
(@q8, 'What does DSP stand for?', 'Data Signal Protocol', 'Digital Signal Processing', 'Dynamic Sound Production', 'Discrete Signal Path', 'B'),
(@q8, 'What is aliasing in signal processing?', 'Amplifying a signal beyond its original strength', 'An artifact caused by sampling a signal below the Nyquist rate', 'Filtering noise from a signal', 'Compressing a signal for storage', 'B'),
(@q8, 'Which transform converts a time-domain signal to a frequency-domain representation?', 'Laplace Transform only', 'Fourier Transform', 'Z-Transform', 'Wavelet Transform', 'B'),
(@q8, 'What is the Z-Transform primarily used for?', 'Analyzing continuous-time signals', 'Analyzing discrete-time signals', 'Converting analog to digital signals', 'Filtering high-frequency noise', 'B'),
(@q8, 'What does FIR stand for in digital filters?', 'Frequency Independent Response', 'Finite Impulse Response', 'Fast Integral Recursion', 'Fixed Input Resolution', 'B'),
(@q8, 'What does IIR stand for?', 'Infinite Impulse Response', 'Integrated Input Resistance', 'Inverse Integral Response', 'Input Isolation Ratio', 'A'),
(@q8, 'What is quantization in digital signal processing?', 'Converting continuous amplitude values to discrete levels', 'Sampling a signal over time', 'Amplifying a weak signal', 'Converting frequency to amplitude', 'A'),
(@q8, 'What is the Discrete Fourier Transform (DFT) used for?', 'Sampling analog signals', 'Computing the frequency spectrum of a discrete signal', 'Filtering impulse noise', 'Generating digital waveforms', 'B'),
(@q8, 'Which algorithm efficiently computes the DFT?', 'Fast Fourier Transform (FFT)', 'Laplace Transform', 'Discrete Cosine Transform', 'Short-Time Fourier Transform', 'A'),
(@q8, 'What is the unit of frequency?', 'Decibel (dB)', 'Hertz (Hz)', 'Watt (W)', 'Ohm (Ω)', 'B'),
(@q8, 'What is the purpose of a low-pass filter?', 'Passes high frequencies and blocks low frequencies', 'Passes all frequencies equally', 'Passes low frequencies and blocks high frequencies', 'Amplifies all frequencies', 'C'),
(@q8, 'What is convolution used for in DSP?', 'Compressing audio files', 'Describing the output of a linear system given its input and impulse response', 'Sampling a continuous signal', 'Encoding digital signals', 'B'),
(@q8, 'What is meant by the sampling rate?', 'The speed of the processor', 'The number of samples taken per second from a continuous signal', 'The number of bits per sample', 'The frequency of the carrier wave', 'B'),
(@q8, 'What is the unit of sampling rate?', 'Hertz (Hz)', 'Decibels (dB)', 'Bits per second (bps)', 'Volts (V)', 'A'),
(@q8, 'What is a digital filter?', 'A hardware component that removes noise', 'A mathematical algorithm that modifies the frequency content of a digital signal', 'A type of analog amplifier', 'A sampling technique', 'B'),
(@q8, 'Which type of filter removes frequencies above a certain threshold?', 'Low-pass filter', 'High-pass filter', 'Band-pass filter', 'Band-stop filter', 'A'),
(@q8, 'What does SNR stand for?', 'Signal Noise Ratio', 'Signal-to-Noise Ratio', 'Sampling Nyquist Range', 'Signal Network Rate', 'B'),
(@q8, 'What is the purpose of windowing in FFT analysis?', 'To reduce spectral leakage caused by the finite length of the signal', 'To amplify specific frequencies', 'To increase the sampling rate', 'To convert analog signals to digital', 'A'),
(@q8, 'What does DTFT stand for?', 'Discrete Time Frequency Transform', 'Discrete-Time Fourier Transform', 'Digital Transfer Function Transform', 'Direct Time Fast Transform', 'B');

-- ============================================================
-- SEED: CSC319 — Introduction to Principles of Computer System Design (20 Qs)
-- ============================================================
SET @q9 = (SELECT id FROM quizzes WHERE course_code = 'CSC319');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
(@q9, 'What does CPU stand for?', 'Central Processing Unit', 'Computer Power Unit', 'Central Program Utility', 'Core Processing Unit', 'A'),
(@q9, 'What is the function of the ALU in a CPU?', 'Stores program instructions', 'Performs arithmetic and logical operations', 'Controls data flow between CPU components', 'Manages cache memory', 'B'),
(@q9, 'Which memory type is volatile?', 'ROM', 'Flash Memory', 'RAM', 'Hard Disk', 'C'),
(@q9, 'What is cache memory?', 'A high-speed memory between CPU and RAM for frequently used data', 'The main storage of the computer', 'A type of ROM', 'Virtual memory on disk', 'A'),
(@q9, 'What does RISC stand for?', 'Reduced Instruction Set Computer', 'Rapid Integrated System Control', 'Random Input Set Computer', 'Real-time Instruction Set Configuration', 'A'),
(@q9, 'What is pipelining in computer architecture?', 'Connecting multiple CPUs', 'A technique where multiple instruction phases are overlapped for efficiency', 'A method for increasing cache size', 'A type of memory bus design', 'B'),
(@q9, 'What is the von Neumann architecture known for?', 'Separate memory for data and instructions', 'A shared memory model where both programs and data are stored in the same memory', 'Using only RISC instructions', 'Parallel processing by default', 'B'),
(@q9, 'What is the purpose of the Program Counter (PC)?', 'Counts the number of programs installed', 'Holds the address of the next instruction to be executed', 'Stores the result of the last operation', 'Controls the clock speed', 'B'),
(@q9, 'What does DMA stand for?', 'Direct Memory Access', 'Data Management Architecture', 'Dynamic Module Assignment', 'Direct Module Addressing', 'A'),
(@q9, 'Which bus carries data between the CPU and memory?', 'Address Bus', 'Control Bus', 'Data Bus', 'System Bus', 'C'),
(@q9, 'What is virtual memory?', 'A type of CPU cache', 'A technique that uses disk space to extend RAM', 'The registers inside the CPU', 'A fast type of ROM', 'B'),
(@q9, 'What is the clock speed of a CPU measured in?', 'Bytes', 'Hertz (Hz)', 'Watts', 'Bits', 'B'),
(@q9, 'What is an interrupt in computer systems?', 'A type of memory fault', 'A signal to the CPU requesting immediate attention from a device or software', 'A CPU instruction for stopping execution', 'A process scheduling algorithm', 'B'),
(@q9, 'What is the purpose of the Memory Management Unit (MMU)?', 'Manages disk storage allocation', 'Translates virtual addresses to physical addresses', 'Controls CPU clock speed', 'Handles I/O interrupts', 'B'),
(@q9, 'What is CISC?', 'Complex Instruction Set Computer', 'Controlled Integrated System Circuit', 'Central Instruction Set Configuration', 'Compact Instruction Set Computer', 'A'),
(@q9, 'Which principle states that 90% of execution time is spent in 10% of the code?', 'Moore\'s Law', '90/10 Rule (Locality of Reference)', 'Amdahl\'s Law', 'Little\'s Law', 'B'),
(@q9, 'What is Amdahl\'s Law used for?', 'Calculating cache miss rates', 'Predicting the theoretical speedup of a program using parallel processors', 'Designing memory hierarchies', 'Measuring CPU clock speed', 'B'),
(@q9, 'What is a bus in computer architecture?', 'A type of CPU instruction', 'A communication system for transferring data between components', 'A type of volatile memory', 'A software scheduler', 'B'),
(@q9, 'What does BIOS stand for?', 'Basic Input/Output System', 'Built-In Operating Software', 'Binary Instruction Operating System', 'Base Input/Output Scheduler', 'A'),
(@q9, 'What is the difference between SRAM and DRAM?', 'SRAM is slower and requires refreshing; DRAM is faster and does not', 'SRAM is faster and does not need refreshing; DRAM is slower and needs constant refreshing', 'They are identical types of memory', 'DRAM is non-volatile; SRAM is volatile', 'B');

-- ============================================================
-- Verification query (optional, comment out if not needed)
-- ============================================================
-- SELECT q.course_code, q.title, COUNT(qu.id) AS total_questions
-- FROM quizzes q
-- LEFT JOIN questions qu ON q.id = qu.quiz_id
-- GROUP BY q.id, q.course_code, q.title
-- ORDER BY q.course_code;

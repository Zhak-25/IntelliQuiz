// ============================================================
// IntelliQuiz
// data/seedQuestions.js
// Part 1
// ============================================================

require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: {
        rejectUnauthorized: false
    }
});

async function seedQuestions() {

    const conn = await pool.getConnection();

    try {

        console.log("Connected to Aiven MySQL...");

        // Check if questions already exist
        const [existing] = await conn.query(
            "SELECT COUNT(*) AS total FROM questions"
        );

        if (existing[0].total > 0) {
            console.log("Questions already exist.");
            conn.release();
            return;
        }

        // Load all quizzes
        const [rows] = await conn.query(
            "SELECT id, course_code FROM quizzes"
        );

        const quizMap = {};

        rows.forEach(row => {
            quizMap[row.course_code] = row.id;
        });

        const requiredCourses = [
            "CSC301",
            "CSC303",
            "CSC305",
            "CSC307",
            "CSC309",
            "CSC311",
            "CSC315",
            "CSC317",
            "CSC319"
        ];

        for (const code of requiredCourses) {

            if (!quizMap[code]) {
                throw new Error(`Quiz ${code} was not found.`);
            }

        }

        console.log("All quizzes found.");

        // =====================================================
        // CSC301
        // =====================================================

        const csc301 = [

            {
                question: "Which keyword is used to inherit a class in Java?",
                option_a: "implements",
                option_b: "extends",
                option_c: "inherits",
                option_d: "super",
                correct_answer: "B"
            },

            {
                question: "Which of the following is NOT a feature of Object Oriented Programming?",
                option_a: "Encapsulation",
                option_b: "Polymorphism",
                option_c: "Compilation",
                option_d: "Inheritance",
                correct_answer: "C"
            },

            {
                question: "What does JVM stand for?",
                option_a: "Java Virtual Machine",
                option_b: "Java Variable Method",
                option_c: "Java Verified Module",
                option_d: "Java Vital Memory",
                correct_answer: "A"
            },

            {
                question: "Which access modifier makes a member accessible only within the same class?",
                option_a: "public",
                option_b: "protected",
                option_c: "default",
                option_d: "private",
                correct_answer: "D"
            },

            {
                question: "What is the output of System.out.println(10 / 3) in Java?",
                option_a: "3.33",
                option_b: "3",
                option_c: "3.0",
                option_d: "Error",
                correct_answer: "B"
            },

            {
                question: "Which method is the entry point of a Java application?",
                option_a: "start()",
                option_b: "run()",
                option_c: "main()",
                option_d: "init()",
                correct_answer: "C"
            },

            {
                question: "What is method overloading?",
                option_a: "A method calling itself",
                option_b: "Multiple methods with the same name but different parameters",
                option_c: "A method with no return type",
                option_d: "Overriding a parent method",
                correct_answer: "B"
            },

            {
                question: "In Java, which class is the superclass of all classes?",
                option_a: "Class",
                option_b: "Super",
                option_c: "Object",
                option_d: "Base",
                correct_answer: "C"
            },

            {
                question: "Which keyword prevents a class from being subclassed?",
                option_a: "static",
                option_b: "final",
                option_c: "abstract",
                option_d: "private",
                correct_answer: "B"
            },

            {
                question: "What is encapsulation?",
                option_a: "Hiding data using access modifiers",
                option_b: "Inheriting from multiple classes",
                option_c: "Defining multiple methods with the same name",
                option_d: "Compiling code into bytecode",
                correct_answer: "A"
            }

        ];

        for (const q of csc301) {

            await conn.query(
                `INSERT INTO questions
                (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    quizMap.CSC301,
                    q.question,
                    q.option_a,
                    q.option_b,
                    q.option_c,
                    q.option_d,
                    q.correct_answer
                ]
            );

        }

        console.log("Inserted CSC301 (10/20).");

        // ============================
        // PART 2 STARTS HERE
        // Continue with the remaining
        // CSC301 questions (11-20)
        // then CSC303.
        // ============================

    } catch (err) {

        console.error(err);

    } finally {

        conn.release();

    }

}

seedQuestions();
// ======================================================
// CSC307 - Operation Research
// ======================================================

const csc307 = quizzes.find(q => q.course_code === "CSC307");

await insertQuestions(csc307.id, [
{
question: "What is the primary goal of Operations Research?",
option_a: "Writing optimal code",
option_b: "Optimal decision-making using mathematical models",
option_c: "Managing a software team",
option_d: "Designing relational databases",
correct_answer: "B"
},
{
question: "Which method is used to solve Linear Programming Problems?",
option_a: "Newton-Raphson Method",
option_b: "Simplex Method",
option_c: "Bisection Method",
option_d: "Euler Method",
correct_answer: "B"
},
{
question: "What is a feasible solution in Linear Programming?",
option_a: "A solution that violates at least one constraint",
option_b: "A solution that satisfies all constraints",
option_c: "The optimal solution only",
option_d: "A solution with the minimum cost",
correct_answer: "B"
},
{
question: "What does the objective function represent in an LP problem?",
option_a: "The set of all constraints",
option_b: "The quantity to be maximized or minimized",
option_c: "The feasible region boundary",
option_d: "The slack variable value",
correct_answer: "B"
},
{
question: "In the simplex method, which variable enters the basis?",
option_a: "The variable with the most negative coefficient in the objective row",
option_b: "The variable with the smallest value",
option_c: "The variable with a zero coefficient",
option_d: "The variable with the largest value",
correct_answer: "A"
},
{
question: "What is a slack variable?",
option_a: "A variable subtracted to convert a >= constraint to equality",
option_b: "A variable added to convert a <= constraint to equality",
option_c: "A variable with no constraints",
option_d: "A negative variable in the objective function",
correct_answer: "B"
},
{
question: "Which of the following is a network model in Operations Research?",
option_a: "Simplex Method",
option_b: "Assignment Problem",
option_c: "Transportation Problem",
option_d: "Integer Programming",
correct_answer: "C"
},
{
question: "The feasible region of a Linear Programming Problem is always?",
option_a: "Circular",
option_b: "A convex polygon",
option_c: "A straight line",
option_d: "An ellipse",
correct_answer: "B"
},
{
question: "What is the Transportation Problem primarily used for?",
option_a: "Scheduling flights",
option_b: "Minimizing cost of distributing goods from sources to destinations",
option_c: "Designing communication networks",
option_d: "Inventory control systems",
correct_answer: "B"
},
{
question: "Which method finds an initial basic feasible solution for transportation problems?",
option_a: "Simplex Method",
option_b: "North-West Corner Method",
option_c: "Assignment Method",
option_d: "Branch and Bound",
correct_answer: "B"
},
{
question: "What is degeneracy in a transportation problem?",
option_a: "A solution with non-integer values",
option_b: "When the number of basic variables is less than m+n-1",
option_c: "A solution that violates supply constraints",
option_d: "An infeasible solution",
correct_answer: "B"
},
{
question: "What type of problem involves assigning n jobs to n machines at minimum cost?",
option_a: "Transportation Problem",
option_b: "Sequencing Problem",
option_c: "Assignment Problem",
option_d: "Queuing Problem",
correct_answer: "C"
},
{
question: "The Hungarian Algorithm is used to solve:",
option_a: "Network flow problems",
option_b: "Assignment problems",
option_c: "LP relaxation problems",
option_d: "Integer programming problems",
correct_answer: "B"
},
{
question: "In decision theory, what is a payoff matrix?",
option_a: "A matrix showing costs of constraints",
option_b: "A table showing outcomes for each decision-state combination",
option_c: "A matrix showing probabilities of events",
option_d: "A simplex tableau",
correct_answer: "B"
},
{
question: "What is the maximin criterion in decision-making?",
option_a: "Maximize the maximum payoff",
option_b: "Maximize the minimum payoff",
option_c: "Minimize maximum regret",
option_d: "Minimize total cost",
correct_answer: "B"
},
{
question: "Which approach is used when probabilities of states of nature are known?",
option_a: "Maximin",
option_b: "Minimax Regret",
option_c: "Expected Monetary Value (EMV)",
option_d: "Laplace Criterion",
correct_answer: "C"
},
{
question: "What is the Critical Path in Project Management?",
option_a: "The shortest path",
option_b: "The longest path determining project duration",
option_c: "The path with the most activities",
option_d: "The least costly path",
correct_answer: "B"
},
{
question: "PERT stands for:",
option_a: "Project Evaluation and Review Technique",
option_b: "Probabilistic Estimation and Resource Tracking",
option_c: "Program Evaluation and Routing Test",
option_d: "Project Execution and Resource Table",
correct_answer: "A"
},
{
question: "What does EOQ stand for?",
option_a: "Expected Order Quantity",
option_b: "Economic Order Quantity",
option_c: "Estimated Output Quality",
option_d: "Effective Operations Queue",
correct_answer: "B"
},
{
question: "In queuing theory, λ (lambda) represents:",
option_a: "Service rate",
option_b: "Queue length",
option_c: "Arrival rate",
option_d: "Utilization factor",
correct_answer: "C"
}
]);

// ======================================================
// CSC309 - Data Structures & Analysis of Algorithms
// ======================================================

const csc309 = quizzes.find(q => q.course_code === "CSC309");

await insertQuestions(csc309.id, [
{
question: "What is the time complexity of binary search on a sorted array?",
option_a: "O(n)",
option_b: "O(n²)",
option_c: "O(log n)",
option_d: "O(1)",
correct_answer: "C"
},
{
question: "Which data structure operates on the LIFO principle?",
option_a: "Queue",
option_b: "Stack",
option_c: "Linked List",
option_d: "Tree",
correct_answer: "B"
},
{
question: "Which data structure operates on the FIFO principle?",
option_a: "Stack",
option_b: "Tree",
option_c: "Queue",
option_d: "Graph",
correct_answer: "C"
},
{
question: "What is the worst-case time complexity of Bubble Sort?",
option_a: "O(n log n)",
option_b: "O(n)",
option_c: "O(n²)",
option_d: "O(log n)",
correct_answer: "C"
},
{
question: "In a singly linked list, each node contains:",
option_a: "Data and two pointers",
option_b: "Only data",
option_c: "Data and one pointer to the next node",
option_d: "A key-value pair",
correct_answer: "C"
},
{
question: "Which traversal visits nodes Left → Root → Right?",
option_a: "Pre-order",
option_b: "Post-order",
option_c: "Level-order",
option_d: "In-order",
correct_answer: "D"
},
{
question: "What is the height of a balanced binary tree with n nodes?",
option_a: "O(n)",
option_b: "O(log n)",
option_c: "O(n²)",
option_d: "O(1)",
correct_answer: "B"
},
{
question: "Which sorting algorithm has the best average-case complexity?",
option_a: "Bubble Sort",
option_b: "Insertion Sort",
option_c: "Merge Sort",
option_d: "Selection Sort",
correct_answer: "C"
},
{
question: "What is the space complexity of Merge Sort?",
option_a: "O(1)",
option_b: "O(log n)",
option_c: "O(n)",
option_d: "O(n²)",
correct_answer: "C"
},
{
question: "Which data structure is used internally for recursion?",
option_a: "Queue",
option_b: "Stack",
option_c: "Heap",
option_d: "Array",
correct_answer: "B"
},
{
question: "What does Big O notation describe?",
option_a: "Exact running time",
option_b: "Best-case complexity",
option_c: "Upper bound on algorithm growth",
option_d: "Memory usage only",
correct_answer: "C"
},
{
question: "Which algorithm finds the shortest path in a weighted graph?",
option_a: "BFS",
option_b: "DFS",
option_c: "Dijkstra's Algorithm",
option_d: "Prim's Algorithm",
correct_answer: "C"
},
{
question: "What is a Hash Table used for?",
option_a: "Sorting data",
option_b: "Storing key-value pairs with fast lookup",
option_c: "Traversing graphs",
option_d: "Building binary trees",
correct_answer: "B"
},
{
question: "What is a heap?",
option_a: "Sorted linked list",
option_b: "Complete binary tree satisfying heap property",
option_c: "Doubly linked list",
option_d: "Linear array",
correct_answer: "B"
},
{
question: "Which graph traversal uses a queue?",
option_a: "DFS",
option_b: "BFS",
option_c: "Dijkstra",
option_d: "Prim",
correct_answer: "B"
},
{
question: "Time complexity of accessing an array element by index?",
option_a: "O(n)",
option_b: "O(log n)",
option_c: "O(1)",
option_d: "O(n²)",
correct_answer: "C"
},
{
question: "Which is a self-balancing binary search tree?",
option_a: "Binary Heap",
option_b: "B-Tree",
option_c: "AVL Tree",
option_d: "Trie",
correct_answer: "C"
},
{
question: "What is a circular queue?",
option_a: "Queue allowing traversal from both ends",
option_b: "Linear queue with no rear limit",
option_c: "Queue whose last position connects back to the first",
option_d: "Doubly linked queue",
correct_answer: "C"
},
{
question: "Which algorithm technique solves overlapping subproblems?",
option_a: "Greedy",
option_b: "Divide and Conquer",
option_c: "Dynamic Programming",
option_d: "Backtracking",
correct_answer: "C"
},
{
question: "Time complexity of inserting at the beginning of a linked list?",
option_a: "O(n)",
option_b: "O(n²)",
option_c: "O(log n)",
option_d: "O(1)",
correct_answer: "D"
}
]);
// ======================================================
// CSC311 - System Analysis and Design
// ======================================================

const csc311 = quizzes.find(q => q.course_code === "CSC311");

await insertQuestions(csc311.id, [
{
question: "What does SDLC stand for?",
option_a: "Software Design and Lifecycle",
option_b: "System Development Life Cycle",
option_c: "Software Deployment and Launch Cycle",
option_d: "System Design and Logic Control",
correct_answer: "B"
},
{
question: "Which SDLC phase involves gathering user requirements?",
option_a: "Design",
option_b: "Implementation",
option_c: "Planning and Requirements Analysis",
option_d: "Maintenance",
correct_answer: "C"
},
{
question: "What is a Data Flow Diagram (DFD) used for?",
option_a: "Designing the database schema",
option_b: "Showing how data flows through a system",
option_c: "Writing test cases",
option_d: "Managing project schedules",
correct_answer: "B"
},
{
question: "In a DFD, what does a rectangle represent?",
option_a: "A process",
option_b: "A data store",
option_c: "An external entity",
option_d: "A data flow",
correct_answer: "C"
},
{
question: "Which model follows a strict sequential phase approach?",
option_a: "Agile Model",
option_b: "Spiral Model",
option_c: "Waterfall Model",
option_d: "Prototype Model",
correct_answer: "C"
},
{
question: "What is a Use Case Diagram used for?",
option_a: "Showing database relationships",
option_b: "Depicting system functionalities from a user perspective",
option_c: "Modeling data flow between components",
option_d: "Drawing class hierarchies",
correct_answer: "B"
},
{
question: "What does UML stand for?",
option_a: "Universal Modelling Logic",
option_b: "Unified Modelling Language",
option_c: "User Management Layer",
option_d: "Unified Module Library",
correct_answer: "B"
},
{
question: "Which technique identifies system requirements through interviews and surveys?",
option_a: "Feasibility Study",
option_b: "Requirements Elicitation",
option_c: "System Testing",
option_d: "Code Review",
correct_answer: "B"
},
{
question: "What is a prototype?",
option_a: "The final version of the system",
option_b: "A working model built for early feedback",
option_c: "The system documentation",
option_d: "A database backup",
correct_answer: "B"
},
{
question: "What is the purpose of a Feasibility Study?",
option_a: "To write the system code",
option_b: "To determine if a project is viable",
option_c: "To train users",
option_d: "To design the UI",
correct_answer: "B"
},
{
question: "Which diagram shows interactions between components over time?",
option_a: "Class Diagram",
option_b: "Use Case Diagram",
option_c: "Sequence Diagram",
option_d: "Activity Diagram",
correct_answer: "C"
},
{
question: "What is a structured walkthrough?",
option_a: "Physical walkthrough of the office",
option_b: "Peer review of system designs or code",
option_c: "Creating system backups",
option_d: "Automated testing",
correct_answer: "B"
},
{
question: "Which SDLC model suits well-defined requirements?",
option_a: "Agile",
option_b: "Spiral",
option_c: "Waterfall",
option_d: "RAD",
correct_answer: "C"
},
{
question: "What does a Context-Level DFD represent?",
option_a: "All internal processes",
option_b: "The whole system as one process",
option_c: "Database schema",
option_d: "Authentication flow",
correct_answer: "B"
},
{
question: "What is a Gantt Chart used for?",
option_a: "Showing data flow",
option_b: "Scheduling project tasks",
option_c: "Designing architecture",
option_d: "Documenting requirements",
correct_answer: "B"
},
{
question: "Main purpose of system testing?",
option_a: "Write system code",
option_b: "Verify the complete system meets requirements",
option_c: "Train users",
option_d: "Backup database",
correct_answer: "B"
},
{
question: "Which maintenance fixes bugs after deployment?",
option_a: "Adaptive",
option_b: "Perfective",
option_c: "Corrective",
option_d: "Preventive",
correct_answer: "C"
},
{
question: "ER Diagram is used for?",
option_a: "Showing process flow",
option_b: "Modeling data and relationships",
option_c: "Designing interfaces",
option_d: "Writing test scripts",
correct_answer: "B"
},
{
question: "Which document captures all functional and non-functional requirements?",
option_a: "Project Charter",
option_b: "Software Requirements Specification",
option_c: "Test Plan",
option_d: "Design Specification",
correct_answer: "B"
},
{
question: "In Agile, what is a Sprint?",
option_a: "Running around the office",
option_b: "A fixed development period",
option_c: "A testing phase",
option_d: "Deployment stage",
correct_answer: "B"
}
]);

// ======================================================
// CSC315 - System Programming with C
// ======================================================

const csc315 = quizzes.find(q => q.course_code === "CSC315");

await insertQuestions(csc315.id, [
{
question: "Which function allocates memory dynamically in C?",
option_a: "alloc()",
option_b: "new()",
option_c: "malloc()",
option_d: "create()",
correct_answer: "C"
},
{
question: "What is a pointer?",
option_a: "A variable storing a memory address",
option_b: "A character variable",
option_c: "A function",
option_d: "A loop variable",
correct_answer: "A"
},
{
question: "Which operator dereferences a pointer?",
option_a: "&",
option_b: "*",
option_c: "->",
option_d: ".",
correct_answer: "B"
},
{
question: "What does free() do?",
option_a: "Clears the screen",
option_b: "Releases allocated memory",
option_c: "Closes a file",
option_d: "Initializes variables",
correct_answer: "B"
},
{
question: "Which header contains printf()?",
option_a: "<stdlib.h>",
option_b: "<string.h>",
option_c: "<stdio.h>",
option_d: "<math.h>",
correct_answer: "C"
},
{
question: "sizeof(int) on a 32-bit system is commonly?",
option_a: "2",
option_b: "4",
option_c: "8",
option_d: "1",
correct_answer: "B"
},
{
question: "Which Unix system call creates a new process?",
option_a: "exec()",
option_b: "spawn()",
option_c: "fork()",
option_d: "create()",
correct_answer: "C"
},
{
question: "The & operator returns?",
option_a: "Variable value",
option_b: "Variable memory address",
option_c: "Variable size",
option_d: "Pointer to pointer",
correct_answer: "B"
},
{
question: "Which function copies strings?",
option_a: "strcat()",
option_b: "strcpy()",
option_c: "strcmp()",
option_d: "strlen()",
correct_answer: "B"
},
{
question: "A null pointer is?",
option_a: "Pointer to address NULL",
option_b: "Pointer to string",
option_c: "Negative address pointer",
option_d: "Integer pointer",
correct_answer: "A"
},
{
question: "Which storage class preserves values between function calls?",
option_a: "auto",
option_b: "register",
option_c: "static",
option_d: "extern",
correct_answer: "C"
},
{
question: "A struct is?",
option_a: "Built-in type",
option_b: "User-defined data type",
option_c: "Loop construct",
option_d: "Pointer type",
correct_answer: "B"
},
{
question: "Which function reads one character?",
option_a: "scanf()",
option_b: "getchar()",
option_c: "gets()",
option_d: "fread()",
correct_answer: "B"
},
{
question: "A segmentation fault is?",
option_a: "Syntax error",
option_b: "Illegal memory access",
option_c: "Compile warning",
option_d: "File error",
correct_answer: "B"
},
{
question: "exec() does what?",
option_a: "Creates child process",
option_b: "Replaces current process image",
option_c: "Terminates process",
option_d: "Reads a file",
correct_answer: "B"
},
{
question: "Which function opens a file?",
option_a: "open()",
option_b: "fopen()",
option_c: "fileopen()",
option_d: "readfile()",
correct_answer: "B"
},
{
question: "Purpose of a Makefile?",
option_a: "Stores database credentials",
option_b: "Automates compilation",
option_c: "Documents the project",
option_d: "Manages memory",
correct_answer: "B"
},
{
question: "What is a pipe in Unix?",
option_a: "Log file",
option_b: "Inter-process communication mechanism",
option_c: "Pointer type",
option_d: "Network socket",
correct_answer: "B"
},
{
question: "Difference between calloc() and malloc()?",
option_a: "malloc initializes memory",
option_b: "calloc initializes memory to zero",
option_c: "They are identical",
option_d: "calloc uses stack memory",
correct_answer: "B"
},
{
question: "Ctrl+C sends which signal?",
option_a: "SIGTERM",
option_b: "SIGKILL",
option_c: "SIGINT",
option_d: "SIGHUP",
correct_answer: "C"
}
]);
// ======================================================
// CSC317 - Digital Signal Processing
// ======================================================

const csc317 = quizzes.find(q => q.course_code === "CSC317");

await insertQuestions(csc317.id, [
{
question: "What is the Nyquist Theorem?",
option_a: "A signal must be sampled at least twice its highest frequency",
option_b: "Signals must be filtered before transmission",
option_c: "Digital signals are always superior",
option_d: "A theorem for calculating signal power",
correct_answer: "A"
},
{
question: "What does DSP stand for?",
option_a: "Data Signal Protocol",
option_b: "Digital Signal Processing",
option_c: "Dynamic Sound Production",
option_d: "Discrete Signal Path",
correct_answer: "B"
},
{
question: "What is aliasing?",
option_a: "Amplifying a signal",
option_b: "Sampling below the Nyquist rate",
option_c: "Filtering noise",
option_d: "Compressing a signal",
correct_answer: "B"
},
{
question: "Which transform converts a time-domain signal to frequency-domain?",
option_a: "Laplace Transform",
option_b: "Fourier Transform",
option_c: "Z-Transform",
option_d: "Wavelet Transform",
correct_answer: "B"
},
{
question: "The Z-Transform is mainly used for?",
option_a: "Continuous-time signals",
option_b: "Discrete-time signals",
option_c: "A/D conversion",
option_d: "Noise filtering",
correct_answer: "B"
},
{
question: "FIR stands for?",
option_a: "Frequency Independent Response",
option_b: "Finite Impulse Response",
option_c: "Fast Integral Recursion",
option_d: "Fixed Input Resolution",
correct_answer: "B"
},
{
question: "IIR stands for?",
option_a: "Infinite Impulse Response",
option_b: "Integrated Input Resistance",
option_c: "Inverse Integral Response",
option_d: "Input Isolation Ratio",
correct_answer: "A"
},
{
question: "What is quantization?",
option_a: "Converting amplitudes into discrete levels",
option_b: "Sampling over time",
option_c: "Amplifying signals",
option_d: "Frequency conversion",
correct_answer: "A"
},
{
question: "The DFT is used for?",
option_a: "Sampling analog signals",
option_b: "Computing frequency spectrum",
option_c: "Filtering impulse noise",
option_d: "Generating waveforms",
correct_answer: "B"
},
{
question: "Which algorithm efficiently computes the DFT?",
option_a: "FFT",
option_b: "Laplace Transform",
option_c: "DCT",
option_d: "STFT",
correct_answer: "A"
},
{
question: "Frequency is measured in?",
option_a: "dB",
option_b: "Hz",
option_c: "Watts",
option_d: "Ohms",
correct_answer: "B"
},
{
question: "Purpose of a low-pass filter?",
option_a: "Passes high frequencies",
option_b: "Passes all frequencies",
option_c: "Passes low frequencies",
option_d: "Amplifies all frequencies",
correct_answer: "C"
},
{
question: "Convolution is used for?",
option_a: "Audio compression",
option_b: "Finding system output",
option_c: "Sampling",
option_d: "Encoding",
correct_answer: "B"
},
{
question: "Sampling rate means?",
option_a: "Processor speed",
option_b: "Samples taken per second",
option_c: "Bits per sample",
option_d: "Carrier frequency",
correct_answer: "B"
},
{
question: "Sampling rate is measured in?",
option_a: "Hz",
option_b: "dB",
option_c: "bps",
option_d: "Volts",
correct_answer: "A"
},
{
question: "A digital filter is?",
option_a: "Hardware noise remover",
option_b: "Algorithm that modifies frequency content",
option_c: "Analog amplifier",
option_d: "Sampling technique",
correct_answer: "B"
},
{
question: "Which filter removes high frequencies?",
option_a: "Low-pass",
option_b: "High-pass",
option_c: "Band-pass",
option_d: "Band-stop",
correct_answer: "A"
},
{
question: "SNR stands for?",
option_a: "Signal Noise Ratio",
option_b: "Signal-to-Noise Ratio",
option_c: "Sampling Nyquist Range",
option_d: "Signal Network Rate",
correct_answer: "B"
},
{
question: "Purpose of windowing in FFT?",
option_a: "Reduce spectral leakage",
option_b: "Amplify frequencies",
option_c: "Increase sampling rate",
option_d: "Convert analog to digital",
correct_answer: "A"
},
{
question: "DTFT stands for?",
option_a: "Discrete Time Frequency Transform",
option_b: "Discrete-Time Fourier Transform",
option_c: "Digital Transfer Function Transform",
option_d: "Direct Time Fast Transform",
correct_answer: "B"
}
]);

// ======================================================
// CSC319 - Introduction to Principles of Computer System Design
// ======================================================

const csc319 = quizzes.find(q => q.course_code === "CSC319");

await insertQuestions(csc319.id, [
{
question: "What does CPU stand for?",
option_a: "Central Processing Unit",
option_b: "Computer Power Unit",
option_c: "Central Program Utility",
option_d: "Core Processing Unit",
correct_answer: "A"
},
{
question: "Function of the ALU?",
option_a: "Stores instructions",
option_b: "Performs arithmetic and logical operations",
option_c: "Controls data flow",
option_d: "Manages cache",
correct_answer: "B"
},
{
question: "Which memory is volatile?",
option_a: "ROM",
option_b: "Flash",
option_c: "RAM",
option_d: "Hard Disk",
correct_answer: "C"
},
{
question: "Cache memory is?",
option_a: "High-speed memory between CPU and RAM",
option_b: "Main storage",
option_c: "ROM",
option_d: "Virtual memory",
correct_answer: "A"
},
{
question: "RISC stands for?",
option_a: "Reduced Instruction Set Computer",
option_b: "Rapid Integrated System Control",
option_c: "Random Input Set Computer",
option_d: "Real-time Instruction Set Configuration",
correct_answer: "A"
},
{
question: "What is pipelining?",
option_a: "Connecting CPUs",
option_b: "Overlapping instruction execution",
option_c: "Increasing cache size",
option_d: "Bus design",
correct_answer: "B"
},
{
question: "Von Neumann architecture uses?",
option_a: "Separate memories",
option_b: "Shared memory for data and instructions",
option_c: "Only RISC",
option_d: "Parallel processing",
correct_answer: "B"
},
{
question: "Purpose of Program Counter?",
option_a: "Counts programs",
option_b: "Stores next instruction address",
option_c: "Stores results",
option_d: "Controls clock",
correct_answer: "B"
},
{
question: "DMA stands for?",
option_a: "Direct Memory Access",
option_b: "Data Management Architecture",
option_c: "Dynamic Module Assignment",
option_d: "Direct Module Addressing",
correct_answer: "A"
},
{
question: "Which bus transfers data?",
option_a: "Address Bus",
option_b: "Control Bus",
option_c: "Data Bus",
option_d: "System Bus",
correct_answer: "C"
},
{
question: "Virtual memory is?",
option_a: "CPU cache",
option_b: "Disk space used as RAM extension",
option_c: "Registers",
option_d: "Fast ROM",
correct_answer: "B"
},
{
question: "CPU clock speed is measured in?",
option_a: "Bytes",
option_b: "Hertz",
option_c: "Watts",
option_d: "Bits",
correct_answer: "B"
},
{
question: "What is an interrupt?",
option_a: "Memory fault",
option_b: "Signal requesting CPU attention",
option_c: "CPU stop instruction",
option_d: "Scheduling algorithm",
correct_answer: "B"
},
{
question: "Purpose of MMU?",
option_a: "Manage disks",
option_b: "Translate virtual to physical addresses",
option_c: "Control clock",
option_d: "Handle interrupts",
correct_answer: "B"
},
{
question: "CISC stands for?",
option_a: "Complex Instruction Set Computer",
option_b: "Controlled Integrated System Circuit",
option_c: "Central Instruction Set Configuration",
option_d: "Compact Instruction Set Computer",
correct_answer: "A"
},
{
question: "Which principle says most execution time is spent in a small part of code?",
option_a: "Moore's Law",
option_b: "90/10 Rule (Locality of Reference)",
option_c: "Amdahl's Law",
option_d: "Little's Law",
correct_answer: "B"
},
{
question: "Amdahl's Law is used for?",
option_a: "Cache calculations",
option_b: "Predicting parallel speedup",
option_c: "Memory hierarchy",
option_d: "CPU speed",
correct_answer: "B"
},
{
question: "A bus is?",
option_a: "CPU instruction",
option_b: "Communication system between components",
option_c: "Volatile memory",
option_d: "Software scheduler",
correct_answer: "B"
},
{
question: "BIOS stands for?",
option_a: "Basic Input/Output System",
option_b: "Built-In Operating Software",
option_c: "Binary Instruction Operating System",
option_d: "Base Input/Output Scheduler",
correct_answer: "A"
},
{
question: "Difference between SRAM and DRAM?",
option_a: "SRAM is slower",
option_b: "SRAM is faster and doesn't require refreshing; DRAM does",
option_c: "They are identical",
option_d: "DRAM is non-volatile",
correct_answer: "B"
}
]);
CSC319: [
  {
    question: 'What does CPU stand for?',
    option_a: 'Central Processing Unit',
    option_b: 'Computer Power Unit',
    option_c: 'Central Program Utility',
    option_d: 'Core Processing Unit',
    correct_answer: 'A'
  },
  {
    question: 'What is the function of the ALU in a CPU?',
    option_a: 'Stores program instructions',
    option_b: 'Performs arithmetic and logical operations',
    option_c: 'Controls data flow between CPU components',
    option_d: 'Manages cache memory',
    correct_answer: 'B'
  },
  {
    question: 'Which memory type is volatile?',
    option_a: 'ROM',
    option_b: 'Flash Memory',
    option_c: 'RAM',
    option_d: 'Hard Disk',
    correct_answer: 'C'
  },
  {
    question: 'What is cache memory?',
    option_a: 'A high-speed memory between CPU and RAM for frequently used data',
    option_b: 'The main storage of the computer',
    option_c: 'A type of ROM',
    option_d: 'Virtual memory on disk',
    correct_answer: 'A'
  },
  {
    question: 'What does RISC stand for?',
    option_a: 'Reduced Instruction Set Computer',
    option_b: 'Rapid Integrated System Control',
    option_c: 'Random Input Set Computer',
    option_d: 'Real-time Instruction Set Configuration',
    correct_answer: 'A'
  },
  {
    question: 'What is pipelining in computer architecture?',
    option_a: 'Connecting multiple CPUs',
    option_b: 'A technique where multiple instruction phases are overlapped for efficiency',
    option_c: 'A method for increasing cache size',
    option_d: 'A type of memory bus design',
    correct_answer: 'B'
  },
  {
    question: 'What is the von Neumann architecture known for?',
    option_a: 'Separate memory for data and instructions',
    option_b: 'A shared memory model where both programs and data are stored in the same memory',
    option_c: 'Using only RISC instructions',
    option_d: 'Parallel processing by default',
    correct_answer: 'B'
  },
  {
    question: 'What is the purpose of the Program Counter (PC)?',
    option_a: 'Counts the number of programs installed',
    option_b: 'Holds the address of the next instruction to be executed',
    option_c: 'Stores the result of the last operation',
    option_d: 'Controls the clock speed',
    correct_answer: 'B'
  },
  {
    question: 'What does DMA stand for?',
    option_a: 'Direct Memory Access',
    option_b: 'Data Management Architecture',
    option_c: 'Dynamic Module Assignment',
    option_d: 'Direct Module Addressing',
    correct_answer: 'A'
  },
  {
    question: 'Which bus carries data between the CPU and memory?',
    option_a: 'Address Bus',
    option_b: 'Control Bus',
    option_c: 'Data Bus',
    option_d: 'System Bus',
    correct_answer: 'C'
  },
  {
    question: 'What is virtual memory?',
    option_a: 'A type of CPU cache',
    option_b: 'A technique that uses disk space to extend RAM',
    option_c: 'The registers inside the CPU',
    option_d: 'A fast type of ROM',
    correct_answer: 'B'
  },
  {
    question: 'What is the clock speed of a CPU measured in?',
    option_a: 'Bytes',
    option_b: 'Hertz (Hz)',
    option_c: 'Watts',
    option_d: 'Bits',
    correct_answer: 'B'
  },
  {
    question: 'What is an interrupt in computer systems?',
    option_a: 'A type of memory fault',
    option_b: 'A signal to the CPU requesting immediate attention from a device or software',
    option_c: 'A CPU instruction for stopping execution',
    option_d: 'A process scheduling algorithm',
    correct_answer: 'B'
  },
  {
    question: 'What is the purpose of the Memory Management Unit (MMU)?',
    option_a: 'Manages disk storage allocation',
    option_b: 'Translates virtual addresses to physical addresses',
    option_c: 'Controls CPU clock speed',
    option_d: 'Handles I/O interrupts',
    correct_answer: 'B'
  },
  {
    question: 'What is CISC?',
    option_a: 'Complex Instruction Set Computer',
    option_b: 'Controlled Integrated System Circuit',
    option_c: 'Central Instruction Set Configuration',
    option_d: 'Compact Instruction Set Computer',
    correct_answer: 'A'
  },
  {
    question: "Which principle states that 90% of execution time is spent in 10% of the code?",
    option_a: "Moore's Law",
    option_b: "90/10 Rule (Locality of Reference)",
    option_c: "Amdahl's Law",
    option_d: "Little's Law",
    correct_answer: 'B'
  },
  {
    question: "What is Amdahl's Law used for?",
    option_a: 'Calculating cache miss rates',
    option_b: 'Predicting the theoretical speedup of a program using parallel processors',
    option_c: 'Designing memory hierarchies',
    option_d: 'Measuring CPU clock speed',
    correct_answer: 'B'
  },
  {
    question: 'What is a bus in computer architecture?',
    option_a: 'A type of CPU instruction',
    option_b: 'A communication system for transferring data between components',
    option_c: 'A type of volatile memory',
    option_d: 'A software scheduler',
    correct_answer: 'B'
  },
  {
    question: 'What does BIOS stand for?',
    option_a: 'Basic Input/Output System',
    option_b: 'Built-In Operating Software',
    option_c: 'Binary Instruction Operating System',
    option_d: 'Base Input/Output Scheduler',
    correct_answer: 'A'
  },
  {
    question: 'What is the difference between SRAM and DRAM?',
    option_a: 'SRAM is slower and requires refreshing; DRAM is faster and does not',
    option_b: 'SRAM is faster and does not need refreshing; DRAM is slower and needs constant refreshing',
    option_c: 'They are identical types of memory',
    option_d: 'DRAM is non-volatile; SRAM is volatile',
    correct_answer: 'B'
  }
]

console.log("✅ All questions seeded successfully!");
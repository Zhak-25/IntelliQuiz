// data/seedQuestions.js
// Run this ONCE after setting up the database to seed all questions.
// Usage: node data/seedQuestions.js
//
// Prerequisites:
//   1. Create the database and tables by running sql/database.sql in phpMyAdmin.
//   2. Set up your .env file with DB credentials.
//   3. Run: node data/seedQuestions.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

const dbConfig = {
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'intelliquiz',
  multipleStatements: true,
};

// ─── Quiz and Question Data ───────────────────────────────────────────────────

const quizzes = [
  { course_code: 'CSC301', title: 'Object Oriented Programming In JAVA',          description: 'Covers OOP principles, Java syntax, inheritance, polymorphism, and design patterns.' },
  { course_code: 'CSC303', title: 'Database Design and Management',               description: 'Covers relational database theory, SQL, normalization, transactions, and DBMS concepts.' },
  { course_code: 'CSC305', title: 'Web Programming',                              description: 'Covers HTML, CSS, JavaScript, HTTP, REST, and modern web development practices.' },
  { course_code: 'CSC307', title: 'Operation Research',                           description: 'Covers linear programming, simplex method, network models, and decision analysis.' },
  { course_code: 'CSC309', title: 'Data Structures & Analysis Of Algorithms',     description: 'Covers arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis.' },
  { course_code: 'CSC311', title: 'System Analysis and Design',                   description: 'Covers SDLC, requirements engineering, UML, prototyping, and system modelling.' },
  { course_code: 'CSC315', title: 'System Programming with C',                    description: 'Covers C language, pointers, memory management, system calls, and process control.' },
  { course_code: 'CSC317', title: 'Digital Signal Processing',                    description: 'Covers sampling, Fourier transforms, digital filters, and signal analysis.' },
  { course_code: 'CSC319', title: 'Introduction to Principles of Computer System Design', description: 'Covers computer architecture, processor design, memory hierarchy, and I/O systems.' },
];

// Questions keyed by course_code
const questionsByCourse = {
  CSC301: [
    { question: 'Which keyword is used to inherit a class in Java?', option_a: 'implements', option_b: 'extends', option_c: 'inherits', option_d: 'super', correct_answer: 'B' },
    { question: 'Which of the following is NOT a feature of OOP?', option_a: 'Encapsulation', option_b: 'Polymorphism', option_c: 'Compilation', option_d: 'Inheritance', correct_answer: 'C' },
    { question: 'What does JVM stand for?', option_a: 'Java Virtual Machine', option_b: 'Java Variable Method', option_c: 'Java Verified Module', option_d: 'Java Vital Memory', correct_answer: 'A' },
    { question: 'Which access modifier makes a member accessible only within the same class?', option_a: 'public', option_b: 'protected', option_c: 'default', option_d: 'private', correct_answer: 'D' },
    { question: 'What is the output of System.out.println(10 / 3) in Java?', option_a: '3.33', option_b: '3', option_c: '3.0', option_d: 'Error', correct_answer: 'B' },
    { question: 'Which method is the entry point of a Java application?', option_a: 'start()', option_b: 'run()', option_c: 'main()', option_d: 'init()', correct_answer: 'C' },
    { question: 'What is method overloading?', option_a: 'A method calling itself', option_b: 'Multiple methods with same name but different parameters', option_c: 'A method with no return type', option_d: 'Overriding a parent method', correct_answer: 'B' },
    { question: 'In Java, which class is the superclass of all classes?', option_a: 'Class', option_b: 'Super', option_c: 'Object', option_d: 'Base', correct_answer: 'C' },
    { question: 'Which keyword prevents a class from being subclassed?', option_a: 'static', option_b: 'final', option_c: 'abstract', option_d: 'private', correct_answer: 'B' },
    { question: 'What is encapsulation?', option_a: 'Hiding data using access modifiers', option_b: 'Inheriting from multiple classes', option_c: 'Defining multiple methods with same name', option_d: 'Compiling code into bytecode', correct_answer: 'A' },
    { question: 'Which of these is a marker interface in Java?', option_a: 'Runnable', option_b: 'Serializable', option_c: 'Comparable', option_d: 'Iterable', correct_answer: 'B' },
    { question: 'What does the "this" keyword refer to in Java?', option_a: 'The parent class', option_b: 'The current object', option_c: 'The main method', option_d: 'A static field', correct_answer: 'B' },
    { question: 'Which concept allows a subclass to provide a specific implementation of a parent method?', option_a: 'Overloading', option_b: 'Abstraction', option_c: 'Overriding', option_d: 'Encapsulation', correct_answer: 'C' },
    { question: 'What is an abstract class?', option_a: 'A class with no methods', option_b: 'A class that cannot be instantiated', option_c: 'A class with only static methods', option_d: 'A fully implemented class', correct_answer: 'B' },
    { question: 'Which collection class allows duplicates and maintains insertion order?', option_a: 'HashSet', option_b: 'TreeSet', option_c: 'ArrayList', option_d: 'HashMap', correct_answer: 'C' },
    { question: 'What is the size of an int data type in Java?', option_a: '8 bits', option_b: '16 bits', option_c: '32 bits', option_d: '64 bits', correct_answer: 'C' },
    { question: 'Which exception is thrown when dividing an integer by zero?', option_a: 'NullPointerException', option_b: 'ArithmeticException', option_c: 'ClassCastException', option_d: 'ArrayIndexOutOfBoundsException', correct_answer: 'B' },
    { question: 'What does the "static" keyword mean on a method?', option_a: 'The method cannot be overridden', option_b: 'The method belongs to the class, not instances', option_c: 'The method runs first on startup', option_d: 'The method is private', correct_answer: 'B' },
    { question: 'Which interface must be implemented to sort objects using Collections.sort()?', option_a: 'Runnable', option_b: 'Iterable', option_c: 'Comparable', option_d: 'Cloneable', correct_answer: 'C' },
    { question: 'What is a constructor in Java?', option_a: 'A method that returns the class name', option_b: 'A special method called when an object is created', option_c: 'A static method that initializes variables', option_d: 'A method used for garbage collection', correct_answer: 'B' },
  ],

  CSC303: [
    { question: 'What does DBMS stand for?', option_a: 'Data Backup Management System', option_b: 'Database Management System', option_c: 'Digital Base Mapping System', option_d: 'Database Modelling Service', correct_answer: 'B' },
    { question: 'Which SQL command retrieves data from a database?', option_a: 'INSERT', option_b: 'UPDATE', option_c: 'SELECT', option_d: 'DELETE', correct_answer: 'C' },
    { question: 'Which normal form removes partial dependencies?', option_a: '1NF', option_b: '2NF', option_c: '3NF', option_d: 'BCNF', correct_answer: 'B' },
    { question: 'What is a primary key?', option_a: 'A key that can be NULL', option_b: 'A foreign key linking two tables', option_c: 'A unique identifier for each record in a table', option_d: 'A key used only for searching', correct_answer: 'C' },
    { question: 'Which JOIN returns all records from both tables with NULLs where there is no match?', option_a: 'INNER JOIN', option_b: 'LEFT JOIN', option_c: 'RIGHT JOIN', option_d: 'FULL OUTER JOIN', correct_answer: 'D' },
    { question: 'What does DDL stand for?', option_a: 'Data Definition Language', option_b: 'Data Deletion Language', option_c: 'Dynamic Data Layer', option_d: 'Database Design Logic', correct_answer: 'A' },
    { question: 'Which SQL command adds a new row to a table?', option_a: 'ADD', option_b: 'INSERT INTO', option_c: 'UPDATE', option_d: 'CREATE', correct_answer: 'B' },
    { question: 'Which ACID property ensures committed data survives crashes?', option_a: 'Atomicity', option_b: 'Consistency', option_c: 'Isolation', option_d: 'Durability', correct_answer: 'D' },
    { question: 'Which of the following is NOT a valid database relationship type?', option_a: 'One-to-One', option_b: 'One-to-Many', option_c: 'Many-to-Many', option_d: 'Many-to-None', correct_answer: 'D' },
    { question: 'What is a foreign key?', option_a: 'A primary key from another table referenced in the current table', option_b: 'A key used only for encryption', option_c: 'A key that must always be NULL', option_d: 'The first column of any table', correct_answer: 'A' },
    { question: 'What does GROUP BY do in SQL?', option_a: 'Filters rows before grouping', option_b: 'Sorts results in ascending order', option_c: 'Groups rows sharing a property for aggregate functions', option_d: 'Joins two tables on a common field', correct_answer: 'C' },
    { question: 'Which command removes all rows but keeps the table structure?', option_a: 'DROP', option_b: 'DELETE', option_c: 'TRUNCATE', option_d: 'REMOVE', correct_answer: 'C' },
    { question: 'In an ER diagram, what shape represents an entity?', option_a: 'Diamond', option_b: 'Oval', option_c: 'Rectangle', option_d: 'Triangle', correct_answer: 'C' },
    { question: 'Which SQL clause filters groups after GROUP BY?', option_a: 'WHERE', option_b: 'HAVING', option_c: 'FILTER', option_d: 'CONDITION', correct_answer: 'B' },
    { question: 'What is a view in SQL?', option_a: 'A stored physical table', option_b: 'A virtual table based on a SELECT query', option_c: 'An index on a table', option_d: 'A backup copy of a table', correct_answer: 'B' },
    { question: 'Which ACID property ensures a transaction is treated as a single unit?', option_a: 'Atomicity', option_b: 'Consistency', option_c: 'Isolation', option_d: 'Durability', correct_answer: 'A' },
    { question: 'What is data redundancy?', option_a: 'Storing data in compressed format', option_b: 'Unnecessary duplication of data', option_c: 'Encrypting sensitive database fields', option_d: 'Indexing a table for faster queries', correct_answer: 'B' },
    { question: 'Which SQL aggregate function counts the number of rows?', option_a: 'SUM()', option_b: 'AVG()', option_c: 'COUNT()', option_d: 'MAX()', correct_answer: 'C' },
    { question: 'What is an index in a database?', option_a: 'A type of table join', option_b: 'A data structure that improves query speed', option_c: 'A constraint preventing duplicate values', option_d: 'A view created from multiple tables', correct_answer: 'B' },
    { question: 'Which command modifies existing data in a table?', option_a: 'INSERT', option_b: 'ALTER', option_c: 'UPDATE', option_d: 'MODIFY', correct_answer: 'C' },
  ],

  CSC305: [
    { question: 'What does HTML stand for?', option_a: 'HyperText Markup Language', option_b: 'High Transfer Markup Language', option_c: 'HyperText Management Level', option_d: 'Hyper Transfer Mode Language', correct_answer: 'A' },
    { question: 'Which CSS property changes text color?', option_a: 'font-color', option_b: 'text-color', option_c: 'color', option_d: 'background-color', correct_answer: 'C' },
    { question: 'Which HTML tag links an external CSS file?', option_a: '<style>', option_b: '<css>', option_c: '<link>', option_d: '<script>', correct_answer: 'C' },
    { question: 'What does HTTP stand for?', option_a: 'HyperText Transfer Protocol', option_b: 'High Transfer Text Process', option_c: 'HyperText Terminal Protocol', option_d: 'Home Transfer Text Protocol', correct_answer: 'A' },
    { question: 'Which JS method selects an element by its ID?', option_a: 'document.getClass()', option_b: 'document.querySelector()', option_c: 'document.getElementById()', option_d: 'document.selectId()', correct_answer: 'C' },
    { question: 'What is the HTTP status code for "Not Found"?', option_a: '200', option_b: '301', option_c: '403', option_d: '404', correct_answer: 'D' },
    { question: 'Which HTML attribute specifies the URL of a hyperlink?', option_a: 'src', option_b: 'href', option_c: 'link', option_d: 'url', correct_answer: 'B' },
    { question: 'What does CSS stand for?', option_a: 'Cascading Style Sheets', option_b: 'Computer Style Sheets', option_c: 'Creative Style System', option_d: 'Coding Style Syntax', correct_answer: 'A' },
    { question: 'Which JavaScript keyword declares a block-scoped variable?', option_a: 'var', option_b: 'set', option_c: 'let', option_d: 'def', correct_answer: 'C' },
    { question: 'What does REST stand for in web development?', option_a: 'Remote Execution State Transfer', option_b: 'Representational State Transfer', option_c: 'Responsive Element Style Template', option_d: 'Real-time Event State Trigger', correct_answer: 'B' },
    { question: 'Which HTML5 element provides semantic navigation?', option_a: '<div>', option_b: '<section>', option_c: '<nav>', option_d: '<span>', correct_answer: 'C' },
    { question: 'What is JSON?', option_a: 'JavaScript Object Notation, a data interchange format', option_b: 'Java Serialized Object Network', option_c: 'JavaScript Online Notation', option_d: 'Just Structured Object Name', correct_answer: 'A' },
    { question: 'Which CSS property controls space outside the border?', option_a: 'padding', option_b: 'margin', option_c: 'spacing', option_d: 'border-gap', correct_answer: 'B' },
    { question: 'What does <meta charset="UTF-8"> do?', option_a: 'Defines page language', option_b: 'Specifies the character encoding of the page', option_c: 'Links a font file', option_d: 'Sets the page title', correct_answer: 'B' },
    { question: 'Which event fires when a user clicks a button?', option_a: 'onhover', option_b: 'onpress', option_c: 'onclick', option_d: 'onsubmit', correct_answer: 'C' },
    { question: 'Which HTTP method sends data to create a resource?', option_a: 'GET', option_b: 'POST', option_c: 'PUT', option_d: 'DELETE', correct_answer: 'B' },
    { question: 'What is the purpose of the alt attribute on <img>?', option_a: 'Sets image width', option_b: 'Provides alternative text if image fails to load', option_c: 'Links to another image', option_d: 'Defines image opacity', correct_answer: 'B' },
    { question: 'Which JS method converts a JSON string to an object?', option_a: 'JSON.stringify()', option_b: 'JSON.parse()', option_c: 'JSON.convert()', option_d: 'JSON.decode()', correct_answer: 'B' },
    { question: 'What does DOM stand for?', option_a: 'Document Object Model', option_b: 'Display Output Manager', option_c: 'Dynamic Object Method', option_d: 'Document Order Map', correct_answer: 'A' },
    { question: 'Which CSS unit is relative to the root element font-size?', option_a: 'em', option_b: 'px', option_c: 'rem', option_d: '%', correct_answer: 'C' },
  ],
};

// ─── Seed Function ────────────────────────────────────────────────────────────

async function seed() {
  const conn = await mysql.createConnection(dbConfig);
  console.log('✅ Connected to MySQL');

  try {
    // Check if already seeded
    const [existing] = await conn.query('SELECT COUNT(*) AS cnt FROM quizzes');
    if (existing[0].cnt > 0) {
      console.log('⚠️  Database already has data. Skipping seed to avoid duplicates.');
      console.log('   If you want to re-seed, run the SQL file in phpMyAdmin to reset first.');
      await conn.end();
      return;
    }

    // Insert quizzes
    for (const quiz of quizzes) {
      const [res] = await conn.query(
        'INSERT INTO quizzes (course_code, title, description) VALUES (?, ?, ?)',
        [quiz.course_code, quiz.title, quiz.description]
      );
      const quizId = res.insertId;
      console.log(`  ✔ Inserted quiz: ${quiz.course_code} (ID: ${quizId})`);

      // Insert questions for this quiz if we have them
      const questions = questionsByCourse[quiz.course_code];
      if (questions && questions.length > 0) {
        for (const q of questions) {
          await conn.query(
            `INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [quizId, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer]
          );
        }
        console.log(`    ✔ Inserted ${questions.length} questions for ${quiz.course_code}`);
      } else {
        console.log(`    ℹ️  No JS questions defined for ${quiz.course_code} — use the SQL file for full seed.`);
      }
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log('   Note: CSC307, CSC309, CSC311, CSC315, CSC317, CSC319 questions are in sql/database.sql');
    console.log('   Run the full SQL file in phpMyAdmin for all 180 questions.\n');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    throw err;
  } finally {
    await conn.end();
  }
}

seed().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

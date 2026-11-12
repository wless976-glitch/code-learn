// Track 2: Databases with SQL / Өгөгдлийн сан (SQL)
// The practice database is built from CG.schema in every SQL console (real SQLite, running in the page).

CG.schema = [
  { name: "students", label: ["Students", "Оюутнууд"],
    create: "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT, age INTEGER, gpa REAL)",
    cols: [
      { n: "id", ty: "INTEGER", key: "PK", d: ["unique number of each student", "оюутан бүрийн давтагдашгүй дугаар"] },
      { n: "name", ty: "TEXT", d: ["first name", "нэр"] },
      { n: "city", ty: "TEXT", d: ["home city", "төрсөн хот"] },
      { n: "age", ty: "INTEGER", d: ["age in years", "нас"] },
      { n: "gpa", ty: "REAL", d: ["grade point average; NULL if not recorded", "голч дүн; бүртгээгүй бол NULL"] }
    ],
    rows: [
      [1, "Bat", "Ulaanbaatar", 19, 3.4],
      [2, "Saraa", "Darkhan", 20, 3.8],
      [3, "Temuulen", "Ulaanbaatar", 18, 2.9],
      [4, "Nomin", "Erdenet", 21, 3.6],
      [5, "Enkhjin", "Ulaanbaatar", 19, 3.9],
      [6, "Ganbaatar", "Khovd", 22, 2.7],
      [7, "Oyunaa", "Darkhan", 18, 3.2],
      [8, "Tuvshin", "Erdenet", 20, null],
      [9, "Anu", "Murun", 19, 3.5],
      [10, "Munkh-Erdene", "Ulaanbaatar", 23, 3.1]
    ] },
  { name: "courses", label: ["Courses", "Хичээлүүд"],
    create: "CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT NOT NULL, credits INTEGER, teacher TEXT)",
    cols: [
      { n: "id", ty: "INTEGER", key: "PK", d: ["unique number of each course", "хичээл бүрийн давтагдашгүй дугаар"] },
      { n: "title", ty: "TEXT", d: ["course name", "хичээлийн нэр"] },
      { n: "credits", ty: "INTEGER", d: ["credit hours", "кредит цаг"] },
      { n: "teacher", ty: "TEXT", d: ["teacher's name", "багшийн нэр"] }
    ],
    rows: [
      [1, "Programming", 3, "Dorj"],
      [2, "Databases", 3, "Tsetseg"],
      [3, "Mathematics", 4, "Bold"],
      [4, "English", 2, "Sarnai"],
      [5, "Physics", 4, "Gerel"]
    ] },
  { name: "enrollments", label: ["Enrollments", "Хичээл сонголт"],
    create: "CREATE TABLE enrollments (student_id INTEGER REFERENCES students(id), course_id INTEGER REFERENCES courses(id), score INTEGER, PRIMARY KEY (student_id, course_id))",
    cols: [
      { n: "student_id", ty: "INTEGER", key: "FK", ref: "students.id", d: ["which student", "аль оюутан"] },
      { n: "course_id", ty: "INTEGER", key: "FK", ref: "courses.id", d: ["which course", "аль хичээл"] },
      { n: "score", ty: "INTEGER", d: ["final score, 0–100", "эцсийн оноо, 0–100"] }
    ],
    rows: [
      [1, 1, 85], [1, 2, 78], [1, 3, 62],
      [2, 1, 95], [2, 2, 91], [2, 4, 88],
      [3, 1, 58], [3, 3, 71],
      [4, 2, 84], [4, 3, 90], [4, 4, 76],
      [5, 1, 97], [5, 2, 93], [5, 3, 89],
      [6, 3, 55], [6, 4, 67],
      [7, 1, 74], [7, 4, 92],
      [8, 2, 69],
      [9, 1, 81], [9, 2, 87], [9, 3, 79]
    ] }
];

CG.lessons.push({
  id: "db-intro", track: "sql",
  title: ["What is a database?", "Өгөгдлийн сан гэж юу вэ?"],
  lead: ["Why apps keep data in databases, and your first SQL query.", "Апп яагаад өгөгдлөө өгөгдлийн санд хадгалдаг вэ, мөн таны анхны SQL хүсэлт."],
  goals: [
    ["Explain what a database and a DBMS are", "Өгөгдлийн сан, ӨСУС гэж юу болохыг тайлбарлах"],
    ["Know why relational databases use tables", "Холбоост өгөгдлийн сан яагаад хүснэгт ашигладгийг мэдэх"],
    ["Run your first SQL query", "Анхны SQL хүсэлтээ ажиллуулах"],
    ["Meet the practice database used in every lesson", "Бүх хичээлд ашиглах дасгалын өгөгдлийн сантай танилцах"]
  ],
  body: [
    H("Data that lasts", "Хадгалагдаж үлдэх өгөгдөл"),
    P("Variables in a program disappear when the program stops. A **database** stores data permanently and lets many people and programs read and change it safely at the same time.",
      "Програмын хувьсагч програм зогсмогц устдаг. **Өгөгдлийн сан** (database) өгөгдлийг байнга хадгалж, олон хүн, програм нэгэн зэрэг аюулгүйгээр уншиж, өөрчлөх боломж олгодог."),
    P("Your bank balance, your social media posts, a school's grade records and the e-Mongolia services all live in databases.",
      "Таны банкны үлдэгдэл, сошиал медиа дахь нийтлэл, сургуулийн дүнгийн бүртгэл, e-Mongolia-гийн үйлчилгээ бүгд өгөгдлийн санд хадгалагддаг."),
    IDEA("A database is like a library with a librarian. The books are the data. You do not search the shelves yourself: you ask the librarian (the DBMS) *show me every book by Natsagdorj*, and the librarian brings exactly those. SQL is the language you ask in.",
         "Өгөгдлийн сан бол номын санчтай номын сан шиг. Номнууд нь өгөгдөл. Та тавиураас өөрөө хайхгүй: номын санчаас (ӨСУС) *Нацагдоржийн бүх номыг үзүүлээч* гэж асуухад яг тэдгээрийг авчирч өгнө. SQL бол таны асуух хэл."),
    TABLE([["App", "Апп"], ["Tables it might have", "Байж болох хүснэгтүүд"]],
      [["Bank", "Банк"], "`customers`, `accounts`, `transfers`"],
      [["Online shop", "Онлайн дэлгүүр"], "`products`, `orders`, `customers`"],
      [["Hospital", "Эмнэлэг"], "`patients`, `doctors`, `visits`"],
      [["School", "Сургууль"], "`students`, `courses`, `enrollments`"]
    ),
    H("Key words", "Гол ойлголтууд"),
    TABLE([["Term", "Нэр томьёо"], ["Meaning", "Утга"]],
      [["Database", "Өгөгдлийн сан"], ["an organised collection of data", "зохион байгуулалттай өгөгдлийн цуглуулга"]],
      [["DBMS (database management system)", "ӨСУС (өгөгдлийн сангийн удирдлагын систем)"], ["the software that stores and manages it: SQLite, PostgreSQL, MySQL", "өгөгдлийг хадгалж, удирддаг програм хангамж: SQLite, PostgreSQL, MySQL"]],
      ["SQL", ["the language used to talk to a database", "өгөгдлийн сантай харилцах хэл"]],
      [["Query", "Хүсэлт (асуулга)"], ["one question or command written in SQL", "SQL-ээр бичсэн нэг асуулт эсвэл тушаал"]]
    ),
    H("Relational databases use tables", "Холбоост өгөгдлийн сан хүснэгт ашигладаг"),
    P("The most common kind of database stores data in **tables**, a bit like spreadsheets. Tables are linked to each other by ID numbers, which is why they are called **relational**.",
      "Хамгийн түгээмэл төрлийн өгөгдлийн сан нь өгөгдлийг Excel-тэй төстэй **хүснэгтэд** хадгалдаг. Хүснэгтүүд ID дугаараар хоорондоо холбогддог тул **холбоост** (relational) гэж нэрлэдэг."),
    TABLE([["", ""], ["Spreadsheet (Excel)", "Хүснэгт програм (Excel)"], ["Database", "Өгөгдлийн сан"]],
      [["Size", "Хэмжээ"], ["thousands of rows", "мянга мянган мөр"], ["millions or billions of rows", "сая, тэрбум мөр"]],
      [["Users", "Хэрэглэгч"], ["usually one person at a time", "ихэвчлэн нэг удаад нэг хүн"], ["thousands at the same time", "нэгэн зэрэг мянга мянган хүн"]],
      [["Rules", "Дүрэм"], ["anyone can type anything", "хэн ч юу ч бичиж болно"], ["types and constraints keep data clean", "төрөл, хязгаарлалт өгөгдлийг цэвэр байлгана"]],
      [["Questions", "Асуулт"], ["formulas and filters", "томьёо, шүүлтүүр"], ["SQL queries", "SQL хүсэлт"]]
    ),
    H("What is SQL?", "SQL гэж юу вэ?"),
    P("**SQL** (Structured Query Language, said \"S-Q-L\" or \"sequel\") is the language for asking a database questions. It reads almost like English. Press **Run**:",
      "**SQL** (Structured Query Language, бүтэцлэгдсэн хүсэлтийн хэл; «эс-кью-эл» эсвэл «сиквел» гэж дуудна) бол өгөгдлийн санд асуулт тавих хэл. Бараг англи өгүүлбэр шиг уншигддаг. **Ажиллуулах** товч дар:"),
    SQL(`
-- Show every student / Бүх оюутныг харуулах
SELECT * FROM students;
`),
    P("You just asked a real database a question. It is SQLite, the same engine that runs inside every phone, and here it runs inside this page.",
      "Та сая жинхэнэ өгөгдлийн санд асуулт тавилаа. Энэ бол утас бүрт ажилладаг SQLite хөдөлгүүр бөгөөд энд энэ хуудсан дотор ажиллаж байна."),
    WALK("sql",
      ["SELECT", "*Give me…* Every query that reads data starts with `SELECT`.", "*…өгөөч.* Өгөгдөл уншдаг хүсэлт бүр `SELECT`-ээр эхэлнэ."],
      ["*", "…all the columns…", "…бүх баганыг…"],
      ["FROM students", "…from the table called `students`.", "…`students` нэртэй хүснэгтээс."],
      [";", "The end of the query, like the full stop at the end of a sentence.", "Хүсэлтийн төгсгөл, өгүүлбэрийн төгсгөлийн цэг шиг."]
    ),
    H("What happens when a query runs", "Хүсэлт ажиллахад юу болдог вэ"),
    { t: "flow", items: [
      ["You write a query in SQL", "Та SQL хүсэлт бичнэ"],
      ["The DBMS checks that it is valid", "ӨСУС хүсэлт зөв эсэхийг шалгана"],
      ["It finds the matching rows", "Тохирох мөрүүдийг олно"],
      ["It returns a result table", "Үр дүнгийн хүснэгт буцаана"]
    ] },
    P("The result is a new, temporary table. Reading data with `SELECT` never changes what is stored.",
      "Үр дүн нь шинэ, түр зуурын хүснэгт. `SELECT`-ээр өгөгдөл унших нь хадгалагдсан зүйлийг хэзээ ч өөрчилдөггүй."),
    TRY("In the console above, replace `students` with `enrollments`, then with `courses`. Also try small letters: `select * from students;` works too.",
        "Дээрх консолд `students`-ийг `enrollments`, дараа нь `courses` болгож соль. Мөн жижиг үсгээр бичиж үз: `select * from students;` ч ажиллана."),
    H("Our practice database", "Манай дасгалын өгөгдлийн сан"),
    P("Every lesson uses the same small school database with three tables. `enrollments` connects students to the courses they take.",
      "Бүх хичээл гурван хүснэгттэй ижил жижиг сургуулийн өгөгдлийн санг ашиглана. `enrollments` нь оюутнуудыг сонгосон хичээлтэй нь холбодог."),
    { t: "schema" },
    { t: "data" },
    TIP("Changes you make in a console stay only in this page. Press **Reset data** to restore the original rows at any time.",
        "Консол дээр хийсэн өөрчлөлт зөвхөн энэ хуудсанд үлдэнэ. **Өгөгдөл сэргээх** товчийг дарж анхны өгөгдлийг хүссэн үедээ сэргээж болно."),
    FIX("sql",
      `SELECT * FROM student;`,
      `SELECT * FROM students;`,
      "The table is called `students`, with an *s*. A wrong name gives *no such table: student*. Table names must match exactly.",
      "Хүснэгтийн нэр нь *s*-тэй `students`. Нэр буруу бол *no such table: student* алдаа гарна. Хүснэгтийн нэр яг таарах ёстой."),
    RECAP(
      ["A database stores data permanently and lets many people use it safely at the same time.", "Өгөгдлийн сан өгөгдлийг байнга хадгалж, олон хүнд нэгэн зэрэг аюулгүй ашиглах боломж олгоно."],
      ["A DBMS such as SQLite or PostgreSQL is the program that manages the data.", "SQLite, PostgreSQL зэрэг ӨСУС нь өгөгдлийг удирддаг програм."],
      ["Relational databases keep data in tables that are linked by IDs.", "Холбоост өгөгдлийн сан өгөгдлийг ID-аар холбогдсон хүснэгтүүдэд хадгална."],
      ["SQL is the language for asking questions: `SELECT * FROM students;`", "SQL бол асуулт тавих хэл: `SELECT * FROM students;`"],
      ["Reading with `SELECT` never changes the stored data.", "`SELECT`-ээр унших нь хадгалсан өгөгдлийг хэзээ ч өөрчлөхгүй."]
    )
  ],
  exercise: {
    task: ["Show every row and every column of the `courses` table.", "`courses` хүснэгтийн бүх мөр, бүх баганыг харуул."],
    start: `-- Your query / Таны хүсэлт
`,
    solution: `SELECT * FROM courses;`,
    hint: ["Same as the example, but with a different table name.", "Жишээтэй адилхан, зөвхөн хүснэгтийн нэр өөр."]
  },
  quiz: [
    { q: ["What is SQL?", "SQL гэж юу вэ?"],
      opts: [["A language for asking a database questions", "Өгөгдлийн санд асуулт тавих хэл"], ["A spreadsheet program", "Хүснэгтийн програм"], ["A web browser", "Вэб хөтөч"]],
      a: 0, why: ["SQL is how programs and people talk to relational databases.", "SQL бол програм, хүмүүс холбоост өгөгдлийн сантай харилцдаг хэл."] },
    { q: ["Which of these is a DBMS?", "Аль нь ӨСУС вэ?"],
      opts: [["JavaScript", "JavaScript"], ["PostgreSQL", "PostgreSQL"], ["HTML", "HTML"]],
      a: 1, why: ["PostgreSQL, MySQL and SQLite are database systems.", "PostgreSQL, MySQL, SQLite бол өгөгдлийн сангийн системүүд."] },
    { q: ["Why are relational databases called *relational*?", "Холбоост өгөгдлийн санг яагаад *relational* гэдэг вэ?"],
      opts: [["They are friendly", "Найрсаг учраас"], ["They only store one table", "Ганц хүснэгт хадгалдаг учраас"], ["Their tables are linked to each other by IDs", "Хүснэгтүүд нь ID-аар хоорондоо холбогддог учраас"]],
      a: 2, why: ["IDs relate rows in one table to rows in another.", "ID нь нэг хүснэгтийн мөрийг нөгөө хүснэгтийн мөртэй холбодог."] },
    { q: ["What does `*` mean in `SELECT * FROM courses;`?", "`SELECT * FROM courses;`-д `*` юу гэсэн үг вэ?"],
      opts: [["Every column", "Бүх багана"], ["Multiply", "Үржих"], ["Only the first row", "Зөвхөн эхний мөр"]],
      a: 0, why: ["`*` stands for every column of the table.", "`*` нь хүснэгтийн бүх баганыг орлоно."] }
  ]
});

CG.lessons.push({
  id: "db-tables", track: "sql",
  title: ["Tables, rows and columns", "Хүснэгт, мөр, багана"],
  lead: ["The parts of a table, column types, primary keys and NULL.", "Хүснэгтийн бүрэлдэхүүн, баганын төрөл, үндсэн түлхүүр, NULL."],
  goals: [
    ["Name the parts of a table", "Хүснэгтийн хэсгүүдийг нэрлэх"],
    ["Choose a data type for a column", "Баганад өгөгдлийн төрөл сонгох"],
    ["Explain what a primary key is", "Үндсэн түлхүүр гэж юу болохыг тайлбарлах"],
    ["Understand NULL", "NULL-ийг ойлгох"]
  ],
  body: [
    H("Anatomy of a table", "Хүснэгтийн бүтэц"),
    { t: "anatomy" },
    TABLE([["Part", "Хэсэг"], ["Meaning", "Утга"], ["In our data", "Манай өгөгдөлд"]],
      [["Table", "Хүснэгт"], ["one kind of thing", "нэг төрлийн зүйл"], "`students`"],
      [["Row (record)", "Мөр (бичлэг)"], ["one item of that kind", "тэр төрлийн нэг зүйл"], ["one student: Saraa", "нэг оюутан: Saraa"]],
      [["Column (field)", "Багана (талбар)"], ["one property that every row has", "мөр бүрт байдаг нэг шинж чанар"], "`name`, `city`, `age`"],
      [["Cell", "Нүд"], ["one value: a row and a column meet", "нэг утга: мөр, багана огтлолцсон газар"], "`Darkhan`"]
    ),
    IDEA("A table is like a class register. Each line is one student: a row. Each column of the register is one kind of information: name, city, age. Where a line and a column meet you write one value: a cell.",
         "Хүснэгт бол ангийн журнал шиг. Мөр бүр нэг оюутан. Журналын багана бүр нэг төрлийн мэдээлэл: нэр, хот, нас. Мөр, багана огтлолцсон газарт нэг утга бичнэ: энэ бол нүд."),
    H("Data types", "Өгөгдлийн төрөл"),
    P("Every column has a type. The type tells the database what values belong there, which keeps the data clean.",
      "Багана бүр төрөлтэй. Төрөл нь тухайн баганад ямар утга байх ёстойг өгөгдлийн санд хэлдэг тул өгөгдөл цэвэр байна."),
    TABLE([["Type", "Төрөл"], ["Holds", "Хадгалах утга"], ["Example", "Жишээ"]],
      ["`INTEGER`", ["whole numbers", "бүхэл тоо"], "`19`, `2026`"],
      ["`REAL`", ["decimal numbers", "бутархай тоо"], "`3.8`"],
      ["`TEXT`", ["text", "текст"], "`'Darkhan'`"],
      ["`NULL`", ["no value: missing or unknown", "утга байхгүй: дутуу эсвэл үл мэдэгдэх"], "`NULL`"]
    ),
    TIP("SQLite is relaxed about types. PostgreSQL and MySQL are strict and have more types, such as `VARCHAR(50)`, `DATE` and `BOOLEAN`. You will see a comparison in the Creating tables lesson.",
        "SQLite төрлийн хувьд уян хатан. PostgreSQL, MySQL нь хатуу бөгөөд `VARCHAR(50)`, `DATE`, `BOOLEAN` гэх мэт олон төрөлтэй. «Хүснэгт үүсгэх» хичээлд харьцуулалтыг үзнэ."),
    H("Primary key", "Үндсэн түлхүүр (primary key)"),
    P("Two students can share the same name, so every row gets a **primary key**: a value that is unique and never empty. It is usually a number called `id`.",
      "Хоёр оюутан ижил нэртэй байж болох тул мөр бүр **үндсэн түлхүүр** авна: давтагдашгүй, хэзээ ч хоосон байдаггүй утга. Ихэвчлэн `id` гэх тоо байдаг."),
    SQL(`
-- See the columns of a table (SQLite)
-- Хүснэгтийн баганыг харах (SQLite)
PRAGMA table_info(students);
`),
    P("In the result, `pk = 1` marks the primary key. `PRAGMA` is SQLite-only: PostgreSQL uses `\\d students`, MySQL uses `DESCRIBE students;`.",
      "Үр дүнд `pk = 1` нь үндсэн түлхүүрийг заана. `PRAGMA` зөвхөн SQLite-д байдаг: PostgreSQL-д `\\d students`, MySQL-д `DESCRIBE students;` ашиглана."),
    TABLE([["Result column", "Үр дүнгийн багана"], ["Meaning", "Утга"]],
      ["`cid`", ["the column's position, counted from 0", "баганын байрлал, 0-ээс тоолно"]],
      ["`name`", ["the column's name", "баганын нэр"]],
      ["`type`", ["its data type", "өгөгдлийн төрөл"]],
      ["`notnull`", ["1 if a value is required", "утга заавал шаардлагатай бол 1"]],
      ["`dflt_value`", ["the default value, if there is one", "анхдагч утга (байвал)"]],
      ["`pk`", ["1 if it is the primary key", "үндсэн түлхүүр бол 1"]]
    ),
    H("Why the type matters", "Төрөл яагаад чухал вэ"),
    P("The type decides how values are compared and sorted. As numbers, 9 is less than 10. As text, `'9'` comes *after* `'10'`, because text is compared character by character and 9 comes after 1.",
      "Төрөл нь утгуудыг хэрхэн харьцуулж, эрэмбэлэхийг шийддэг. Тоо байхад 9 нь 10-аас бага. Текст байхад `'9'` нь `'10'`-ын *дараа* ирнэ, учир нь текстийг тэмдэгт тэмдэгтээр нь харьцуулдаг бөгөөд 9 нь 1-ийн дараа байдаг."),
    SQL(`
-- SQLite shows true as 1 and false as 0
-- SQLite үнэнийг 1, худлыг 0 гэж харуулдаг
SELECT 9 < 10     AS as_numbers,
       '9' < '10' AS as_text;
`),
    H("NULL means unknown", "NULL гэдэг нь «мэдэгдэхгүй»"),
    P("`NULL` is not zero and not an empty text. It means the value is missing. In our data Tuvshin's GPA is `NULL`: it has not been recorded yet.",
      "`NULL` бол тэг ч биш, хоосон текст ч биш. Утга байхгүй гэсэн үг. Манай өгөгдөлд Tuvshin-ий голч дүн `NULL`: хараахан бүртгэгдээгүй."),
    SQL(`
SELECT * FROM students WHERE gpa IS NULL;
`),
    P("NULL behaves differently from every other value. Any calculation with NULL gives NULL, and even `NULL = NULL` is not true, because two unknown values cannot be called equal.",
      "NULL бусад бүх утгаас өөрөөр ажилладаг. NULL оролцсон аливаа тооцоо NULL өгнө. `NULL = NULL` ч true болдоггүй, учир нь үл мэдэгдэх хоёр утгыг тэнцүү гэж хэлж болохгүй."),
    SQL(`
SELECT 5 + NULL     AS plus_null,     -- NULL
       NULL = NULL  AS equals_null,   -- NULL, not 1
       NULL IS NULL AS is_null;       -- 1
`),
    RECAP(
      ["A table holds one kind of thing. A row is one item, a column is one property, a cell is one value.", "Хүснэгт нэг төрлийн зүйл хадгална. Мөр нь нэг зүйл, багана нь нэг шинж чанар, нүд нь нэг утга."],
      ["Every column has a type: `INTEGER`, `REAL` or `TEXT`.", "Багана бүр төрөлтэй: `INTEGER`, `REAL`, `TEXT`."],
      ["A primary key is unique and never NULL. It identifies exactly one row.", "Үндсэн түлхүүр давтагдашгүй, хэзээ ч NULL байдаггүй. Яг нэг мөрийг тодорхойлно."],
      ["`NULL` means unknown. It is not 0 and not empty text; check it with `IS NULL`.", "`NULL` нь «мэдэгдэхгүй» гэсэн үг. 0 ч биш, хоосон текст ч биш; `IS NULL`-ээр шалга."],
      ["The type decides how values compare: as text, `'9'` comes after `'10'`.", "Төрөл нь утгуудын харьцуулалтыг шийднэ: текст байхад `'9'` нь `'10'`-ын дараа ирнэ."]
    )
  ],
  exercise: {
    task: ["Show the column structure of the `enrollments` table.", "`enrollments` хүснэгтийн баганын бүтцийг харуул."],
    start: `-- Your query / Таны хүсэлт
`,
    solution: `PRAGMA table_info(enrollments);`,
    hint: ["Use `PRAGMA table_info(...)` with the table name inside the parentheses.", "Хаалт дотор хүснэгтийн нэрийг бичиж `PRAGMA table_info(...)` ашигла."]
  },
  quiz: [
    { q: ["In the `students` table, what is one row?", "`students` хүснэгтэд нэг мөр гэж юу вэ?"],
      opts: [["One student", "Нэг оюутан"], ["All the names", "Бүх нэр"], ["The table's title", "Хүснэгтийн гарчиг"]],
      a: 0, why: ["A row is one record: everything about one student.", "Мөр бол нэг бичлэг: нэг оюутны тухай бүх мэдээлэл."] },
    { q: ["What must be true of a primary key?", "Үндсэн түлхүүр ямар байх ёстой вэ?"],
      opts: [["It is always text", "Үргэлж текст"], ["Unique and never NULL", "Давтагдашгүй, хэзээ ч NULL биш"], ["It can repeat", "Давтагдаж болно"]],
      a: 1, why: ["It must identify exactly one row.", "Яг нэг мөрийг таних ёстой."] },
    { q: ["Which type fits the value `3.8`?", "`3.8` утганд аль төрөл тохирох вэ?"],
      opts: [["`INTEGER`", "`INTEGER`"], ["`TEXT`", "`TEXT`"], ["`REAL`", "`REAL`"]],
      a: 2, why: ["`REAL` holds decimal numbers.", "`REAL` бутархай тоо хадгалдаг."] },
    { q: ["What is `5 + NULL`?", "`5 + NULL` юу вэ?"],
      opts: [["5", "5"], ["NULL", "NULL"], ["0", "0"]],
      a: 1, why: ["Any calculation with an unknown value gives an unknown result: NULL.", "Үл мэдэгдэх утга оролцсон аливаа тооцоо үл мэдэгдэх үр дүн буюу NULL өгнө."] }
  ]
});

CG.lessons.push({
  id: "sql-select", track: "sql",
  title: ["SELECT: reading data", "SELECT: өгөгдөл унших"],
  lead: ["Choose which columns to see, rename them and calculate new ones.", "Аль баганыг харахаа сонгож, нэр өгч, шинэ багана тооцоолно."],
  goals: [
    ["Write `SELECT … FROM …`", "`SELECT … FROM …` бичих"],
    ["Rename columns with `AS`", "`AS`-ээр баганын нэр өөрчлөх"],
    ["Calculate values inside `SELECT`", "`SELECT` дотор утга тооцоолох"],
    ["Remove duplicates with `DISTINCT`", "`DISTINCT`-ээр давхардал арилгах"]
  ],
  body: [
    H("The basic shape", "Үндсэн хэлбэр"),
    CODE("sql", `
SELECT column1, column2
FROM table_name;
`),
    P("Read it like a sentence: *select* these columns *from* that table. SQL keywords are not case-sensitive, but writing them in CAPITALS makes queries easier to read. End each query with a semicolon `;`.",
      "Өгүүлбэр шиг унш: тэр хүснэгтээс (*from*) эдгээр баганыг *сонго* (select). SQL-ийн түлхүүр үгс том жижиг үсэг ялгадаггүй ч ТОМ үсгээр бичвэл уншихад амар. Хүсэлт бүрийг цэгтэй таслал `;`-ээр төгсгө."),
    IDEA("Imagine photocopying a class register, but folding it so that only the *name* and *city* columns show. `SELECT` chooses the columns you want to see. The register itself stays exactly as it was.",
         "Ангийн журналыг хувилахдаа зөвхөн *нэр*, *хот* багана харагдахаар нугалж байгаагаар төсөөл. `SELECT` харахыг хүссэн баганаа сонгодог. Журнал өөрөө яг хэвээрээ үлдэнэ."),
    SQL(`
SELECT name, city
FROM students;
`),
    H("All columns with *", "* ашиглан бүх багана авах"),
    SQL(`
SELECT * FROM courses;
`),
    TIP("`*` is handy for exploring. In real applications list only the columns you need: the query is faster and easier to understand.",
        "`*` нь өгөгдөлтэй танилцахад тохиромжтой. Жинхэнэ аппликейшнд зөвхөн хэрэгтэй баганаа жагсаа: хүсэлт хурдан, ойлгомжтой болно."),
    H("Rename with AS", "AS ашиглан нэр өгөх"),
    SQL(`
SELECT name AS student, age AS years
FROM students;
`),
    H("Calculate in SELECT", "SELECT дотор тооцоолох"),
    SQL(`
SELECT name,
       age,
       2026 - age AS birth_year    -- approximate / ойролцоогоор
FROM students;
`),
    WALK("sql",
      ["SELECT name,", "Show the `name` column as it is.", "`name` баганыг байгаагаар нь харуулна."],
      ["       2026 - age AS birth_year", "For **each row**, calculate 2026 minus the age and call the new column `birth_year`. It exists only in the result.", "**Мөр бүрийн** хувьд 2026-аас насыг хасаж, шинэ баганыг `birth_year` гэж нэрлэнэ. Энэ багана зөвхөн үр дүнд байна."],
      ["FROM students;", "Take the rows from `students`.", "Мөрүүдийг `students`-ээс авна."]
    ),
    H("Functions on values", "Утгад хэрэглэх функцууд"),
    TABLE([["Function", "Функц"], ["What it does", "Юу хийдэг вэ"], ["Example → result", "Жишээ → үр дүн"]],
      ["`UPPER(x)`", ["capital letters", "том үсэг"], "`UPPER('bat')` → `BAT`"],
      ["`LOWER(x)`", ["small letters", "жижиг үсэг"], "`LOWER('BAT')` → `bat`"],
      ["`LENGTH(x)`", ["number of characters", "тэмдэгтийн тоо"], "`LENGTH('Anu')` → `3`"],
      ["`SUBSTR(x, 1, 3)`", ["a piece of text, 3 characters from position 1", "1-р байрлалаас эхлэх 3 тэмдэгт"], "`SUBSTR('Darkhan', 1, 3)` → `Dar`"],
      ["`ROUND(x, 1)`", ["round to 1 decimal place", "аравны нэг орон хүртэл бөөрөнхийлнө"], "`ROUND(3.456, 1)` → `3.5`"]
    ),
    SQL(`
SELECT UPPER(name)             AS name,
       LENGTH(name)            AS letters,
       SUBSTR(city, 1, 3)      AS city_code,
       ROUND(gpa / 4 * 100, 1) AS gpa_percent
FROM students;
`),
    TIP("In SQL, positions inside text start at **1**, not at 0 as in JavaScript.",
        "SQL-д текст доторх байрлал JavaScript-ийнх шиг 0-ээс биш, **1**-ээс эхэлнэ."),
    SQL(`
-- Join text with || / Текстийг || ашиглан залгах
SELECT name || ' from ' || city AS intro
FROM students;
`),
    TIP("Text values in SQL use **single quotes**: `' from '`. Double quotes are for names of tables and columns.",
        "SQL-д текстэн утгыг **дан хашилтаар** бичнэ: `' from '`. Давхар хашилтыг хүснэгт, баганын нэрэнд хэрэглэдэг."),
    H("Remove duplicates with DISTINCT", "DISTINCT ашиглан давхардлыг арилгах"),
    SQL(`
SELECT DISTINCT city
FROM students;
`),
    P("Compare it with `SELECT city FROM students;`, which repeats Ulaanbaatar four times. `DISTINCT` keeps one copy of each different value.",
      "Үүнийг Ulaanbaatar-ыг дөрвөн удаа давтдаг `SELECT city FROM students;`-тэй харьцуул. `DISTINCT` ялгаатай утга бүрээс нэг хувийг л үлдээнэ."),
    H("Write queries that are easy to read", "Уншихад амар хүсэлт бичих"),
    UL(
      ["Put each clause on its own line: `SELECT`, `FROM`, `WHERE`…", "Хэсэг бүрийг тусдаа мөрөнд бич: `SELECT`, `FROM`, `WHERE`…"],
      ["Write keywords in CAPITALS and names in small letters.", "Түлхүүр үгийг ТОМ, нэрийг жижиг үсгээр бич."],
      ["Give calculated columns a clear name with `AS`.", "Тооцоолсон баганад `AS`-ээр ойлгомжтой нэр өг."],
      ["Explain tricky parts with a `--` comment.", "Ойлгоход хэцүү хэсгийг `--` тайлбараар тайлбарла."]
    ),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("sql",
      `SELECT name city FROM students;`,
      `SELECT name, city FROM students;`,
      "This gives no error, which makes it dangerous. Without the comma, SQL reads `city` as a new name for `name`, as if you wrote `name AS city`. You get one column called *city* that is full of names.",
      "Энэ алдаа өгдөггүй учраас аюултай. Таслалгүй бол SQL `city`-г `name`-ийн шинэ нэр гэж уншдаг, яг `name AS city` гэж бичсэн юм шиг. Нэрсээр дүүрсэн *city* нэртэй ганц багана гарна."),
    FIX("sql",
      `SELECT name, city, FROM students;`,
      `SELECT name, city FROM students;`,
      "A comma before `FROM` makes SQL expect another column, so you get a *syntax error*. Commas go only *between* columns.",
      "`FROM`-ийн өмнөх таслал SQL-ийг дахин багана хүлээхэд хүргэдэг тул *syntax error* гарна. Таслалыг зөвхөн баганын *хооронд* тавина."),
    RECAP(
      ["`SELECT columns FROM table;` reads data. `*` means every column.", "`SELECT баганууд FROM хүснэгт;` өгөгдөл уншина. `*` нь бүх багана."],
      ["`AS` gives a result column a new name; the stored data does not change.", "`AS` үр дүнгийн баганад шинэ нэр өгнө; хадгалсан өгөгдөл өөрчлөгдөхгүй."],
      ["You can calculate in `SELECT`: `2026 - age`, `name || ' from ' || city`, `UPPER(name)`.", "`SELECT` дотор тооцоолж болно: `2026 - age`, `name || ' from ' || city`, `UPPER(name)`."],
      ["Text values use single quotes. In SQL, positions in text start at 1.", "Текстэн утга дан хашилттай. SQL-д текст доторх байрлал 1-ээс эхэлнэ."],
      ["`DISTINCT` removes repeated rows from the result.", "`DISTINCT` үр дүнгээс давтагдсан мөрийг арилгана."],
      ["Commas go between columns, never before `FROM`.", "Таслал баганын хооронд тавигдана, `FROM`-ийн өмнө хэзээ ч үгүй."]
    )
  ],
  exercise: {
    task: ["Show the `title` and `credits` of every course. Rename `credits` to `points`.", "Хичээл бүрийн `title`, `credits`-ийг харуул. `credits`-ийн нэрийг `points` болго."],
    start: `SELECT
FROM courses;
`,
    solution: `SELECT title, credits AS points FROM courses;`,
    checkNames: true,
    hint: ["List two columns after `SELECT` and put `AS points` after `credits`.", "`SELECT`-ийн дараа хоёр багана жагсааж, `credits`-ийн ард `AS points` гэж бич."]
  },
  quiz: [
    { q: ["Which symbol selects all columns?", "Аль тэмдэг бүх баганыг сонгодог вэ?"],
      opts: [["`*`", "`*`"], ["`%`", "`%`"], ["`all`", "`all`"]],
      a: 0, why: ["`SELECT *` means every column.", "`SELECT *` нь бүх багана гэсэн үг."] },
    { q: ["What does `DISTINCT` do?", "`DISTINCT` юу хийдэг вэ?"],
      opts: [["Sorts the rows", "Мөрүүдийг эрэмбэлнэ"], ["Removes duplicate rows from the result", "Үр дүнгээс давхардсан мөрийг арилгана"], ["Deletes data", "Өгөгдөл устгана"]],
      a: 1, why: ["Each distinct value appears only once.", "Ялгаатай утга бүр ганц удаа гарна."] },
    { q: ["What does `AS` do in `SELECT age AS years`?", "`SELECT age AS years`-д `AS` юу хийдэг вэ?"],
      opts: [["Changes the data", "Өгөгдлийг өөрчилнө"], ["Creates a new table", "Шинэ хүснэгт үүсгэнэ"], ["Gives the result column a new name", "Үр дүнгийн баганад шинэ нэр өгнө"]],
      a: 2, why: ["Only the result's column name changes, not the stored data.", "Хадгалагдсан өгөгдөл биш, зөвхөн үр дүнгийн баганын нэр өөрчлөгдөнө."] },
    { q: ["What does `SELECT name city FROM students;` show?", "`SELECT name city FROM students;` юу харуулах вэ?"],
      opts: [["An error", "Алдаа"], ["One column called city that contains the names", "Нэрсийг агуулсан city нэртэй ганц багана"], ["Two columns: name and city", "name, city гэсэн хоёр багана"]],
      a: 1, why: ["Without a comma, `city` becomes an alias for `name`.", "Таслалгүй бол `city` нь `name`-ийн товч нэр (alias) болно."] }
  ]
});

CG.lessons.push({
  id: "sql-where", track: "sql",
  title: ["WHERE: filtering rows", "WHERE: мөр шүүх"],
  lead: ["Keep only the rows you need.", "Зөвхөн хэрэгтэй мөрүүдээ үлдээнэ."],
  goals: [
    ["Filter rows with `WHERE`", "`WHERE`-ээр мөр шүүх"],
    ["Combine conditions with `AND`, `OR`, `NOT`", "`AND`, `OR`, `NOT`-оор нөхцөл нэгтгэх"],
    ["Use `IN`, `BETWEEN`, `LIKE`", "`IN`, `BETWEEN`, `LIKE` ашиглах"],
    ["Find missing values with `IS NULL`", "`IS NULL`-оор дутуу утга олох"]
  ],
  body: [
    H("Keep only matching rows", "Зөвхөн тохирох мөрийг үлдээх"),
    CODE("sql", `
SELECT columns
FROM table
WHERE condition;
`),
    SQL(`
SELECT name, city
FROM students
WHERE city = 'Darkhan';
`),
    IDEA("`WHERE` works like a sieve. Every row is poured through it. Rows that make the condition true stay in the result; the others fall through and are not shown. They are not deleted, only left out of this result.",
         "`WHERE` шигшүүр шиг ажилладаг. Мөр бүрийг түүгээр шигшинэ. Нөхцөлийг true болгосон мөрүүд үр дүнд үлдэж, бусад нь шигшигдэн харагдахгүй. Тэдгээр устахгүй, зөвхөн энэ үр дүнд ороогүй л байна."),
    TIP("Text values go in **single quotes**: `'Darkhan'`. In SQL a single `=` means *equal*. This is different from JavaScript, where you compare with `===`.",
        "Текстэн утгыг **дан хашилтад** бичнэ: `'Darkhan'`. SQL-д ганц `=` нь *тэнцүү* гэсэн утгатай. Энэ нь харьцуулалтыг `===`-ээр хийдэг JavaScript-ээс ялгаатай."),
    H("Comparison operators", "Харьцуулах үйлдэл"),
    TABLE([["Operator", "Үйлдэл"], ["Meaning", "Утга"]],
      ["`=`", ["equal", "тэнцүү"]],
      ["`<>` or `!=`", ["not equal", "тэнцүү биш"]],
      ["`>`  `<`  `>=`  `<=`", ["greater, less, or equal", "их, бага, тэнцүү"]]
    ),
    SQL(`
SELECT name, gpa
FROM students
WHERE gpa >= 3.5;
`),
    H("AND, OR, NOT", "AND, OR, NOT"),
    SQL(`
-- From Ulaanbaatar AND younger than 20
-- Улаанбаатараас ирсэн БӨГӨӨД 20-оос доош настай
SELECT name, city, age
FROM students
WHERE city = 'Ulaanbaatar' AND age < 20;
`),
    SQL(`
-- Use parentheses when you mix AND and OR
-- AND, OR хольж хэрэглэхдээ хаалт ашигла
SELECT name, city, gpa
FROM students
WHERE (city = 'Darkhan' OR city = 'Erdenet') AND gpa > 3.5;
`),
    P("Here is how the condition is checked for four of the rows:",
      "Дөрвөн мөрийн хувьд нөхцөлийг хэрхэн шалгадгийг харцгаая:"),
    TABLE([["Student", "Оюутан"], "`city`", "`gpa`", ["Darkhan or Erdenet?", "Darkhan эсвэл Erdenet үү?"], "`gpa > 3.5`?", ["Result", "Үр дүн"]],
      ["Saraa", "Darkhan", "3.8", ["yes", "тийм"], ["yes", "тийм"], ["✓ kept", "✓ үлдэнэ"]],
      ["Oyunaa", "Darkhan", "3.2", ["yes", "тийм"], ["no", "үгүй"], ["✗ left out", "✗ орохгүй"]],
      ["Nomin", "Erdenet", "3.6", ["yes", "тийм"], ["yes", "тийм"], ["✓ kept", "✓ үлдэнэ"]],
      ["Bat", "Ulaanbaatar", "3.4", ["no", "үгүй"], ["no", "үгүй"], ["✗ left out", "✗ орохгүй"]]
    ),
    FIX("sql",
      `SELECT name, city, gpa
FROM students
WHERE city = 'Darkhan' OR city = 'Erdenet' AND gpa > 3.5;`,
      `SELECT name, city, gpa
FROM students
WHERE (city = 'Darkhan' OR city = 'Erdenet') AND gpa > 3.5;`,
      "`AND` is checked before `OR`, so the wrong query means *Darkhan with any GPA, OR Erdenet with a GPA above 3.5*. Oyunaa, with 3.2, sneaks into the result. Brackets make the order clear.",
      "`AND`-ийг `OR`-оос өмнө шалгадаг тул буруу хүсэлт *ямар ч голчтой Darkhan, ЭСВЭЛ голч нь 3.5-аас их Erdenet* гэсэн утгатай болно. 3.2 голчтой Oyunaa үр дүнд орчихно. Хаалт дарааллыг тодорхой болгоно."),
    H("IN, BETWEEN, LIKE", "IN, BETWEEN, LIKE"),
    TABLE([["Pattern", "Загвар"], ["Meaning", "Утга"]],
      ["`city IN ('Darkhan', 'Khovd')`", ["equal to one of the values in the list", "жагсаалтын аль нэг утгатай тэнцүү"]],
      ["`age BETWEEN 18 AND 20`", ["inside a range, including both ends", "завсарт, хоёр хязгаарыг оролцуулан"]],
      ["`name LIKE 'B%'`", ["text pattern: `%` = any characters", "текстийн загвар: `%` = дурын тэмдэгтүүд"]],
      ["`name LIKE '_nu'`", ["`_` = exactly one character", "`_` = яг нэг тэмдэгт"]]
    ),
    SQL(`
SELECT name, city
FROM students
WHERE city IN ('Darkhan', 'Erdenet');
`),
    SQL(`
-- Names that start with S or end with a
-- S-ээр эхэлсэн эсвэл a-гаар төгссөн нэр
SELECT name
FROM students
WHERE name LIKE 'S%' OR name LIKE '%a';
`),
    H("NOT: the opposite", "NOT: эсрэг нь"),
    P("Put `NOT` in front of `IN`, `BETWEEN` or `LIKE` to keep the rows that do **not** match.",
      "`IN`, `BETWEEN`, `LIKE`-ийн өмнө `NOT` бичвэл тохирох**гүй** мөрүүд үлдэнэ."),
    SQL(`
SELECT name, city
FROM students
WHERE city NOT IN ('Ulaanbaatar', 'Darkhan');
`),
    H("Capital letters in text", "Текст дэх том, жижиг үсэг"),
    P("In SQLite, `=` is case-sensitive: `'darkhan'` does not match `'Darkhan'`. `LIKE` ignores case for English letters. To be safe, compare lowercase versions with `LOWER()`.",
      "SQLite-д `=` том, жижиг үсгийг ялгадаг: `'darkhan'` нь `'Darkhan'`-тай таарахгүй. `LIKE` англи үсгийн хувьд том, жижгийг ялгадаггүй. Найдвартай байхын тулд `LOWER()`-оор жижиг үсэг болгоод харьцуул."),
    SQL(`
SELECT COUNT(*) AS exact FROM students WHERE city = 'darkhan';          -- 0
SELECT COUNT(*) AS lower FROM students WHERE LOWER(city) = 'darkhan';   -- 2
`),
    H("IS NULL", "IS NULL"),
    P("You cannot write `= NULL`, because NULL is not a value: it means unknown. Use `IS NULL` or `IS NOT NULL`.",
      "`= NULL` гэж бичиж болохгүй, учир нь NULL бол утга биш, «мэдэгдэхгүй» гэсэн үг. `IS NULL` эсвэл `IS NOT NULL` ашигла."),
    SQL(`
SELECT name FROM students WHERE gpa IS NULL;
`),
    RECAP(
      ["`WHERE condition` keeps only the rows where the condition is true.", "`WHERE нөхцөл` нь нөхцөл true болсон мөрүүдийг л үлдээнэ."],
      ["Text values go in single quotes. In SQL one `=` means equal, and `<>` means not equal.", "Текстэн утга дан хашилтад бичигдэнэ. SQL-д ганц `=` нь тэнцүү, `<>` нь тэнцүү биш."],
      ["`AND` needs both conditions, `OR` needs one. Use brackets when you mix them.", "`AND` хоёр нөхцөлийг хоёуланг нь, `OR` нэгийг нь шаардана. Холих үедээ хаалт ашигла."],
      ["`IN (…)` for a list, `BETWEEN a AND b` for a range with both ends, `LIKE` with `%` and `_` for patterns.", "Жагсаалтад `IN (…)`, хоёр хязгаартай мужид `BETWEEN a AND b`, загварт `%`, `_`-тэй `LIKE`."],
      ["`NOT` turns a condition around: `NOT IN`, `NOT LIKE`.", "`NOT` нөхцөлийг эсрэгээр нь эргүүлнэ: `NOT IN`, `NOT LIKE`."],
      ["Find missing values with `IS NULL`, never with `= NULL`.", "Дутуу утгыг `IS NULL`-ээр ол, `= NULL`-ээр хэзээ ч биш."]
    )
  ],
  exercise: {
    task: ["Show the `name` and `age` of students who are between 19 and 21 years old (inclusive) and are **not** from Ulaanbaatar.",
           "19-өөс 21 насны (хязгаарыг оролцуулан), Улаанбаатараас **биш** оюутнуудын `name`, `age`-ийг харуул."],
    start: `SELECT name, age
FROM students
WHERE
`,
    solution: `SELECT name, age FROM students WHERE age BETWEEN 19 AND 21 AND city <> 'Ulaanbaatar';`,
    hint: ["Combine `age BETWEEN 19 AND 21` and `city <> 'Ulaanbaatar'` with `AND`.", "`age BETWEEN 19 AND 21`, `city <> 'Ulaanbaatar'` хоёрыг `AND`-аар холбо."]
  },
  quiz: [
    { q: ["How do you write a text value in SQL?", "SQL-д текстэн утгыг хэрхэн бичих вэ?"],
      opts: [["In single quotes: `'Khovd'`", "Дан хашилтад: `'Khovd'`"], ["Without quotes: `Khovd`", "Хашилтгүй: `Khovd`"], ["In brackets: `[Khovd]`", "Хаалтад: `[Khovd]`"]],
      a: 0, why: ["Single quotes mark text values in standard SQL.", "Стандарт SQL-д дан хашилт текстэн утгыг тэмдэглэдэг."] },
    { q: ["How do you find rows where `gpa` is missing?", "`gpa` байхгүй мөрийг хэрхэн олох вэ?"],
      opts: [["`WHERE gpa = NULL`", "`WHERE gpa = NULL`"], ["`WHERE gpa IS NULL`", "`WHERE gpa IS NULL`"], ["`WHERE gpa = 0`", "`WHERE gpa = 0`"]],
      a: 1, why: ["`= NULL` is never true. Use `IS NULL`.", "`= NULL` хэзээ ч true болдоггүй. `IS NULL` ашигла."] },
    { q: ["Which names does `LIKE 'A%'` match?", "`LIKE 'A%'` ямар нэртэй таарах вэ?"],
      opts: [["Names that end with A", "A-гаар төгссөн нэр"], ["Only the name A", "Зөвхөн A нэр"], ["Names that start with A", "A-гаар эхэлсэн нэр"]],
      a: 2, why: ["`%` stands for any characters after the A.", "`%` нь A-гийн араас ирэх дурын тэмдэгтийг орлоно."] },
    { q: ["With `WHERE age BETWEEN 19 AND 21`, is a 21-year-old included?", "`WHERE age BETWEEN 19 AND 21` үед 21 настай оюутан орох уу?"],
      opts: [["Yes", "Тийм"], ["No", "Үгүй"], ["Only with OR", "Зөвхөн OR-той үед"]],
      a: 0, why: ["BETWEEN includes both ends of the range.", "BETWEEN мужийн хоёр хязгаарыг хоёуланг нь оролцуулдаг."] }
  ]
});

CG.lessons.push({
  id: "sql-order", track: "sql",
  title: ["ORDER BY and LIMIT", "ORDER BY ба LIMIT"],
  lead: ["Sort your results and take only the top rows.", "Үр дүнгээ эрэмбэлж, зөвхөн эхний мөрүүдийг авна."],
  goals: [
    ["Sort with `ORDER BY … ASC / DESC`", "`ORDER BY … ASC / DESC`-ээр эрэмбэлэх"],
    ["Sort by more than one column", "Нэгээс олон баганаар эрэмбэлэх"],
    ["Take the first rows with `LIMIT` and `OFFSET`", "`LIMIT`, `OFFSET`-оор эхний мөрүүдийг авах"],
    ["Write the clauses in the right order", "Хэсгүүдийг зөв дарааллаар бичих"]
  ],
  body: [
    H("Sorting results", "Үр дүнг эрэмбэлэх"),
    P("Without `ORDER BY`, a database may return rows in any order. Add `ORDER BY column` to sort them. `ASC` puts the smallest first and is the default; `DESC` puts the largest first.",
      "`ORDER BY` байхгүй бол өгөгдлийн сан мөрүүдийг дурын дарааллаар буцааж болно. Эрэмбэлэхийн тулд `ORDER BY багана` нэм. `ASC` нь хамгийн багаас эхэлдэг бөгөөд анхдагч; `DESC` нь хамгийн ихээс эхэлнэ."),
    SQL(`
SELECT name, gpa
FROM students
ORDER BY gpa DESC;
`),
    IDEA("Sorting is like lining up a class by height. `ASC` puts the shortest at the front and `DESC` the tallest. If two students are the same height, a second rule decides, for example the alphabetical order of their names.",
         "Эрэмбэлэх нь ангийг өндрөөр нь жагсаахтай адил. `ASC` хамгийн намыг, `DESC` хамгийн өндрийг урд нь тавина. Хоёр оюутан ижил өндөр бол хоёр дахь дүрэм шийднэ, жишээ нь нэрийн цагаан толгойн дараалал."),
    TIP("NULL values sort first with `ASC` and last with `DESC` in SQLite. Other databases may differ.",
        "SQLite-д NULL утгууд `ASC` үед эхэнд, `DESC` үед сүүлд эрэмбэлэгдэнэ. Бусад өгөгдлийн санд өөр байж болно."),
    H("Sorting by several columns", "Хэд хэдэн баганаар эрэмбэлэх"),
    P("The second column only decides when the first column is a tie.",
      "Хоёр дахь багана нь зөвхөн эхний баганын утга тэнцсэн үед л шийднэ."),
    SQL(`
-- City A→Z, and inside each city the oldest first
-- Хот A→Z, хот бүрийн дотор хамгийн ахмад нь эхэнд
SELECT name, city, age
FROM students
ORDER BY city ASC, age DESC;
`),
    H("LIMIT: only the first rows", "LIMIT: зөвхөн эхний мөрүүд"),
    SQL(`
-- Top 3 students by GPA / Голч дүнгээр эхний 3 оюутан
SELECT name, gpa
FROM students
ORDER BY gpa DESC
LIMIT 3;
`),
    P("`OFFSET` skips rows. Websites use it for pages of results: page 2 with 3 rows per page is `LIMIT 3 OFFSET 3`.",
      "`OFFSET` мөр алгасна. Вэб сайтууд үр дүнг хуудаслахад ашигладаг: хуудас бүрт 3 мөртэй үед 2-р хуудас нь `LIMIT 3 OFFSET 3`."),
    SQL(`
SELECT name, gpa
FROM students
ORDER BY gpa DESC
LIMIT 3 OFFSET 3;   -- rows 4 to 6 / 4-6 дахь мөр
`),
    WALK("sql",
      ["ORDER BY gpa DESC", "First sort all students from the highest GPA to the lowest.", "Эхлээд бүх оюутныг голч дүнгээр нь ихээс бага руу эрэмбэлнэ."],
      ["OFFSET 3", "Skip the first 3 rows: places 1, 2 and 3.", "Эхний 3 мөрийг буюу 1, 2, 3-р байрыг алгасна."],
      ["LIMIT 3", "Then take the next 3 rows, so you see places 4, 5 and 6.", "Дараа нь дараагийн 3 мөрийг авах тул 4, 5, 6-р байрууд харагдана."]
    ),
    TIP("For page *n* with *k* rows per page, write `LIMIT k OFFSET (n − 1) × k`. Page 1 has `OFFSET 0`.",
        "Хуудас бүрт *k* мөртэй үед *n*-р хуудас нь `LIMIT k OFFSET (n − 1) × k`. 1-р хуудас `OFFSET 0`."),
    H("The order of clauses", "Хэсгүүдийн дараалал"),
    P("A query's clauses must always be written in this order. You will meet `GROUP BY` and `HAVING` in the next lesson.",
      "Хүсэлтийн хэсгүүдийг үргэлж энэ дарааллаар бичих ёстой. `GROUP BY`, `HAVING`-тэй дараагийн хичээлд танилцана."),
    { t: "chips", items: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"] },
    H("Written order and running order", "Бичих дараалал ба ажиллах дараалал"),
    P("You write `SELECT` first, but the database does it almost last. It takes the table, filters the rows, picks the columns, sorts, and only then cuts the list.",
      "Та `SELECT`-ийг эхэнд бичдэг ч өгөгдлийн сан үүнийг бараг хамгийн сүүлд хийдэг. Хүснэгтээ авч, мөрүүдээ шүүж, баганаа сонгож, эрэмбэлээд, эцэст нь жагсаалтаа таслана."),
    { t: "flow", items: [
      ["`FROM`: take the table", "`FROM`: хүснэгтээ авна"],
      ["`WHERE`: keep the matching rows", "`WHERE`: тохирох мөрүүдийг үлдээнэ"],
      ["`SELECT`: choose and calculate columns", "`SELECT`: багана сонгож, тооцоолно"],
      ["`ORDER BY`: sort", "`ORDER BY`: эрэмбэлнэ"],
      ["`LIMIT`: keep the first rows", "`LIMIT`: эхний мөрүүдийг үлдээнэ"]
    ] },
    P("This explains why you can sort by a name created with `AS`: sorting happens after `SELECT`, so the name already exists.",
      "`AS`-ээр үүсгэсэн нэрээр яагаад эрэмбэлж болдгийг үүгээр тайлбарлана: эрэмбэлэх нь `SELECT`-ийн дараа хийгддэг тул нэр аль хэдийн бий болсон байна."),
    SQL(`
SELECT name, 2026 - age AS birth_year
FROM students
ORDER BY birth_year DESC
LIMIT 3;
`),
    FIX("sql",
      `SELECT name, gpa
FROM students
LIMIT 3
ORDER BY gpa DESC;`,
      `SELECT name, gpa
FROM students
ORDER BY gpa DESC
LIMIT 3;`,
      "Clauses must be written in their fixed order, and `LIMIT` always comes last. Otherwise you get a *syntax error*.",
      "Хэсгүүдийг тогтсон дарааллаар нь бичих ёстой бөгөөд `LIMIT` үргэлж хамгийн сүүлд ирнэ. Үгүй бол *syntax error* гарна."),
    RECAP(
      ["`ORDER BY column` sorts the result. `ASC`, smallest first, is the default; `DESC` puts the largest first.", "`ORDER BY багана` үр дүнг эрэмбэлнэ. Багаас эхэлдэг `ASC` анхдагч; `DESC` хамгийн ихийг эхэнд тавина."],
      ["With several columns, the second one only decides ties in the first.", "Хэд хэдэн багана өгвөл хоёр дахь нь зөвхөн эхнийх тэнцсэн үед шийднэ."],
      ["`LIMIT n` keeps the first n rows; `OFFSET m` skips m rows first.", "`LIMIT n` эхний n мөрийг үлдээнэ; `OFFSET m` эхлээд m мөр алгасна."],
      ["Without `ORDER BY`, the order of the rows is not guaranteed.", "`ORDER BY`-гүй бол мөрийн дараалал баталгаагүй."],
      ["Written order: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.", "Бичих дараалал: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT."]
    )
  ],
  exercise: {
    task: ["Show the `name` and `age` of the 2 youngest students. If two students have the same age, sort them by name from A to Z.",
           "Хамгийн залуу 2 оюутны `name`, `age`-ийг харуул. Ижил настай бол нэрээр нь A-аас Z хүртэл эрэмбэл."],
    start: `SELECT name, age
FROM students
`,
    solution: `SELECT name, age FROM students ORDER BY age, name LIMIT 2;`,
    ordered: true,
    hint: ["`ORDER BY age, name` then `LIMIT 2`.", "`ORDER BY age, name`, дараа нь `LIMIT 2`."]
  },
  quiz: [
    { q: ["What does `DESC` mean?", "`DESC` юу гэсэн үг вэ?"],
      opts: [["Largest first", "Хамгийн ихээс нь эхэлнэ"], ["Smallest first", "Хамгийн багаас нь эхэлнэ"], ["Random order", "Санамсаргүй дараалал"]],
      a: 0, why: ["DESC = descending, from high to low.", "DESC = буурах, ихээс бага руу."] },
    { q: ["Which clause comes last in a query?", "Хүсэлтэд аль хэсэг хамгийн сүүлд бичигддэг вэ?"],
      opts: [["`WHERE`", "`WHERE`"], ["`ORDER BY`", "`ORDER BY`"], ["`LIMIT`", "`LIMIT`"]],
      a: 2, why: ["SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.", "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT."] },
    { q: ["Which rows does `LIMIT 5 OFFSET 10` return?", "`LIMIT 5 OFFSET 10` аль мөрүүдийг буцаах вэ?"],
      opts: [["Rows 1–5", "1–5 дахь мөр"], ["Rows 11–15", "11–15 дахь мөр"], ["Rows 10–15", "10–15 дахь мөр"]],
      a: 1, why: ["Skip 10 rows, then take 5.", "10 мөр алгасаад 5 мөр авна."] },
    { q: ["Why can `ORDER BY` use a name created with `AS`?", "`ORDER BY` яагаад `AS`-ээр үүсгэсэн нэрийг ашиглаж чаддаг вэ?"],
      opts: [["Sorting happens after SELECT", "Эрэмбэлэх нь SELECT-ийн дараа хийгддэг"], ["AS creates a new table", "AS шинэ хүснэгт үүсгэдэг"], ["It cannot", "Чаддаггүй"]],
      a: 0, why: ["The database runs SELECT before ORDER BY, so the name already exists when it sorts.", "Өгөгдлийн сан SELECT-ийг ORDER BY-аас өмнө ажиллуулдаг тул эрэмбэлэх үед нэр аль хэдийн бий."] }
  ]
});

CG.lessons.push({
  id: "sql-aggregate", track: "sql",
  title: ["Counting and grouping", "Тоолох ба бүлэглэх"],
  lead: ["Summarise many rows into totals, averages and per-group results.", "Олон мөрийг нийлбэр, дундаж, бүлэг бүрийн үр дүн болгон нэгтгэнэ."],
  goals: [
    ["Use `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`", "`COUNT`, `SUM`, `AVG`, `MIN`, `MAX` ашиглах"],
    ["Group rows with `GROUP BY`", "`GROUP BY`-гаар мөрүүдийг бүлэглэх"],
    ["Filter groups with `HAVING`", "`HAVING`-ээр бүлгийг шүүх"]
  ],
  body: [
    H("Aggregate functions", "Нэгтгэх функцууд"),
    TABLE([["Function", "Функц"], ["Returns", "Буцаах утга"]],
      ["`COUNT(*)`", ["how many rows", "хэдэн мөр"]],
      ["`SUM(x)`", ["the total", "нийлбэр"]],
      ["`AVG(x)`", ["the average", "дундаж"]],
      ["`MIN(x)`", ["the smallest value", "хамгийн бага утга"]],
      ["`MAX(x)`", ["the largest value", "хамгийн их утга"]]
    ),
    SQL(`
SELECT COUNT(*)  AS students,
       AVG(age)  AS avg_age,
       MIN(gpa)  AS lowest_gpa,
       MAX(gpa)  AS highest_gpa
FROM students;
`),
    TIP("`COUNT(*)` counts every row. `COUNT(gpa)` counts only rows where `gpa` is not NULL. Try both: you get 10 and 9.",
        "`COUNT(*)` бүх мөрийг тоолно. `COUNT(gpa)` нь зөвхөн `gpa` NULL биш мөрийг тоолно. Хоёуланг нь туршаад үз: 10, 9 гарна."),
    H("GROUP BY: one result per group", "GROUP BY: бүлэг бүрт нэг үр дүн"),
    P("`GROUP BY` puts rows with the same value into groups. Then each aggregate function runs once per group.",
      "`GROUP BY` нь ижил утгатай мөрүүдийг бүлэг болгоно. Дараа нь нэгтгэх функц бүр бүлэг тус бүрт нэг удаа ажиллана."),
    IDEA("Imagine a teacher sorting exam papers into piles, one pile per city, and then counting each pile. `GROUP BY city` makes the piles and `COUNT(*)` counts each one. The result has one row per pile.",
         "Багш шалгалтын хуудсыг хот тус бүрээр нь овоолж, дараа нь овоо бүрийг тоолж байгаагаар төсөөл. `GROUP BY city` овоолгыг үүсгэж, `COUNT(*)` тус бүрийг тоолно. Үр дүнд овоо бүрт нэг мөр гарна."),
    TABLE([["Group (city)", "Бүлэг (хот)"], ["Rows in the group", "Бүлгийн мөрүүд"], "`COUNT(*)`"],
      ["Ulaanbaatar", "Bat, Temuulen, Enkhjin, Munkh-Erdene", "4"],
      ["Darkhan", "Saraa, Oyunaa", "2"],
      ["Erdenet", "Nomin, Tuvshin", "2"],
      ["Khovd", "Ganbaatar", "1"],
      ["Murun", "Anu", "1"]
    ),
    SQL(`
-- How many students come from each city?
-- Хот бүрээс хэдэн оюутан ирсэн бэ?
SELECT city, COUNT(*) AS total
FROM students
GROUP BY city
ORDER BY total DESC;
`),
    SQL(`
-- Average score and number of students per course
-- Хичээл бүрийн дундаж оноо, оюутны тоо
SELECT course_id,
       ROUND(AVG(score), 1) AS avg_score,
       COUNT(*)             AS students
FROM enrollments
GROUP BY course_id;
`),
    WARN("Every column in `SELECT` must either be in `GROUP BY` or be inside an aggregate function. Otherwise the database does not know which row's value to show.",
         "`SELECT` дэх багана бүр `GROUP BY`-д орсон эсвэл нэгтгэх функц дотор байх ёстой. Үгүй бол өгөгдлийн сан аль мөрийн утгыг харуулахаа мэдэхгүй."),
    H("HAVING: filter groups", "HAVING: бүлгийг шүүх"),
    P("`WHERE` filters rows **before** grouping. `HAVING` filters groups **after** grouping, so it can use aggregate functions.",
      "`WHERE` нь бүлэглэхээс **өмнө** мөрийг шүүнэ. `HAVING` нь бүлэглэсний **дараа** бүлгийг шүүдэг тул нэгтгэх функц ашиглаж болно."),
    SQL(`
-- Cities with at least 2 students
-- Дор хаяж 2 оюутантай хотууд
SELECT city, COUNT(*) AS total
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;
`),
    SQL(`
-- WHERE and HAVING together / WHERE, HAVING хамт
SELECT city, AVG(gpa) AS avg_gpa
FROM students
WHERE age >= 19          -- rows first / эхлээд мөр
GROUP BY city
HAVING AVG(gpa) > 3.4;   -- then groups / дараа нь бүлэг
`),
    WALK("sql",
      ["FROM students", "Start with all 10 students.", "Бүх 10 оюутнаас эхэлнэ."],
      ["WHERE age >= 19", "Remove the students younger than 19, Temuulen and Oyunaa. 8 rows remain.", "19-өөс залуу Temuulen, Oyunaa хоёрыг хасна. 8 мөр үлдэнэ."],
      ["GROUP BY city", "Make one pile per city from the remaining rows.", "Үлдсэн мөрүүдээс хот бүрт нэг овоо үүсгэнэ."],
      ["AVG(gpa)", "Calculate the average GPA of each pile. NULL values are skipped.", "Овоо бүрийн дундаж голчийг бодно. NULL утгыг алгасна."],
      ["HAVING AVG(gpa) > 3.4", "Keep only the piles whose average is above 3.4. Khovd (2.7) is left out.", "Дундаж нь 3.4-өөс их овоонуудыг л үлдээнэ. Khovd (2.7) орохгүй."]
    ),
    H("Counting different values", "Ялгаатай утгуудыг тоолох"),
    P("`COUNT(DISTINCT column)` counts how many different values a column has.",
      "`COUNT(DISTINCT багана)` нь баганад хэдэн ялгаатай утга байгааг тоолно."),
    SQL(`
SELECT COUNT(city)          AS all_rows,          -- 10
       COUNT(DISTINCT city) AS different_cities   -- 5
FROM students;
`),
    FIX("sql",
      `SELECT city, COUNT(*) AS total
FROM students
WHERE COUNT(*) >= 2
GROUP BY city;`,
      `SELECT city, COUNT(*) AS total
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;`,
      "`WHERE` runs before the groups exist, so it cannot count them, and SQLite reports *misuse of aggregate*. Conditions on `COUNT`, `SUM` or `AVG` belong in `HAVING`.",
      "`WHERE` бүлгүүд үүсэхээс өмнө ажилладаг тул тэдгээрийг тоолж чадахгүй бөгөөд SQLite *misuse of aggregate* алдаа өгнө. `COUNT`, `SUM`, `AVG` дээрх нөхцөл `HAVING`-д бичигдэнэ."),
    RECAP(
      ["`COUNT`, `SUM`, `AVG`, `MIN` and `MAX` turn many rows into one value.", "`COUNT`, `SUM`, `AVG`, `MIN`, `MAX` олон мөрийг нэг утга болгоно."],
      ["`COUNT(*)` counts rows, `COUNT(column)` skips NULLs, `COUNT(DISTINCT column)` counts different values.", "`COUNT(*)` мөр тоолно, `COUNT(багана)` NULL-ийг алгасна, `COUNT(DISTINCT багана)` ялгаатай утгыг тоолно."],
      ["`GROUP BY` makes one group per value, and each aggregate runs once per group.", "`GROUP BY` утга бүрт нэг бүлэг үүсгэж, нэгтгэх функц бүлэг бүрт нэг удаа ажиллана."],
      ["Every column in `SELECT` must be grouped or inside an aggregate.", "`SELECT` дэх багана бүр бүлэглэгдсэн эсвэл нэгтгэх функц дотор байх ёстой."],
      ["`WHERE` filters rows before grouping; `HAVING` filters groups after.", "`WHERE` бүлэглэхээс өмнө мөр шүүнэ; `HAVING` дараа нь бүлэг шүүнэ."]
    )
  ],
  exercise: {
    task: ["For each city, show the city and its average GPA as `avg_gpa`. Keep only cities whose average is above 3.3.",
           "Хот бүрийн нэр, дундаж голч дүнг `avg_gpa` нэрээр харуул. Дундаж нь 3.3-аас их хотуудыг л үлдээ."],
    start: `SELECT city,
FROM students
`,
    solution: `SELECT city, AVG(gpa) AS avg_gpa FROM students GROUP BY city HAVING AVG(gpa) > 3.3;`,
    hint: ["`GROUP BY city`, then `HAVING AVG(gpa) > 3.3`.", "`GROUP BY city`, дараа нь `HAVING AVG(gpa) > 3.3`."]
  },
  quiz: [
    { q: ["What does `COUNT(*)` return?", "`COUNT(*)` юу буцаах вэ?"],
      opts: [["The number of rows", "Мөрийн тоо"], ["The sum of all numbers", "Бүх тооны нийлбэр"], ["The first row", "Эхний мөр"]],
      a: 0, why: ["It counts rows, including rows with NULL values.", "NULL утгатай мөрийг оролцуулан мөрийг тоолно."] },
    { q: ["What is the difference between WHERE and HAVING?", "WHERE, HAVING хоёр ямар ялгаатай вэ?"],
      opts: [["None", "Ялгаагүй"], ["WHERE filters rows before grouping; HAVING filters groups after", "WHERE бүлэглэхээс өмнө мөр шүүнэ; HAVING дараа нь бүлэг шүүнэ"], ["HAVING sorts rows", "HAVING мөр эрэмбэлнэ"]],
      a: 1, why: ["HAVING can use aggregates like `COUNT(*)`; WHERE cannot.", "HAVING нь `COUNT(*)` зэрэг нэгтгэх функц ашиглаж чадна; WHERE чадахгүй."] },
    { q: ["How does `AVG` treat NULL values?", "`AVG` NULL утгыг хэрхэн тооцдог вэ?"],
      opts: [["As zero", "Тэг гэж"], ["It returns an error", "Алдаа буцаана"], ["It ignores them", "Тоохгүй алгасна"]],
      a: 2, why: ["Aggregates skip NULLs, so Erdenet's average uses only Nomin's GPA.", "Нэгтгэх функц NULL-ийг алгасдаг тул Erdenet-ийн дундаж зөвхөн Nomin-ий голчийг ашиглана."] },
    { q: ["What does `COUNT(DISTINCT city)` return for our students?", "Манай оюутнуудын хувьд `COUNT(DISTINCT city)` юу буцаах вэ?"],
      opts: [["10", "10"], ["5", "5"], ["4", "4"]],
      a: 1, why: ["There are 5 different cities: Ulaanbaatar, Darkhan, Erdenet, Khovd and Murun.", "Ulaanbaatar, Darkhan, Erdenet, Khovd, Murun гэсэн 5 өөр хот бий."] }
  ]
});

CG.lessons.push({
  id: "sql-join", track: "sql",
  title: ["JOIN: combining tables", "JOIN: хүснэгт холбох"],
  lead: ["Follow ID links between tables to see the full picture.", "Хүснэгтүүдийн хоорондох ID холбоосыг дагаж бүрэн дүр зургийг харна."],
  goals: [
    ["Explain foreign keys", "Гадаад түлхүүрийг тайлбарлах"],
    ["Combine tables with `JOIN … ON`", "`JOIN … ON`-оор хүснэгт нэгтгэх"],
    ["Keep unmatched rows with `LEFT JOIN`", "`LEFT JOIN`-оор тохирохгүй мөрийг үлдээх"],
    ["Use short table names (aliases)", "Хүснэгтийн товч нэр (alias) ашиглах"]
  ],
  body: [
    H("Why data is split into tables", "Өгөгдлийг яагаад хүснэгтүүдэд хуваадаг вэ"),
    P("The `enrollments` table stores only ID numbers, such as `student_id = 2, course_id = 1`. To see **names**, we have to look those IDs up in the other tables. `JOIN` does that lookup for us.",
      "`enrollments` хүснэгт зөвхөн `student_id = 2, course_id = 1` гэх мэт ID дугаар хадгалдаг. **Нэрийг** харахын тулд эдгээр ID-г бусад хүснэгтээс хайх хэрэгтэй. `JOIN` бидний өмнөөс ийм хайлт хийдэг."),
    SQL(`
SELECT * FROM enrollments LIMIT 5;
`),
    IDEA("Picture two lists in a school office. One says *student 2 takes course 1*; the others say *student 2 is Saraa* and *course 1 is Programming*. To write *Saraa takes Programming*, you look the numbers up in the other lists. `JOIN` does that looking up for every row at once.",
         "Сургуулийн албан өрөөнд байгаа жагсаалтуудыг төсөөл. Нэг нь *2-р оюутан 1-р хичээл үздэг* гэж, бусад нь *2-р оюутан бол Saraa*, *1-р хичээл бол Programming* гэж бичсэн. *Saraa Programming үздэг* гэж бичихийн тулд дугаарыг бусад жагсаалтаас хайна. `JOIN` ийм хайлтыг мөр бүрийн хувьд нэг дор хийдэг."),
    H("Foreign keys", "Гадаад түлхүүр (foreign key)"),
    P("`enrollments.student_id` points to `students.id`. A column that points to the primary key of another table is called a **foreign key**.",
      "`enrollments.student_id` нь `students.id`-г заадаг. Өөр хүснэгтийн үндсэн түлхүүрийг заадаг баганыг **гадаад түлхүүр** гэнэ."),
    { t: "schema" },
    H("INNER JOIN", "INNER JOIN"),
    SQL(`
SELECT students.name, enrollments.course_id, enrollments.score
FROM enrollments
JOIN students ON students.id = enrollments.student_id;
`),
    P("`ON` says how rows match. `JOIN` (the same as `INNER JOIN`) keeps only the rows that have a match in **both** tables.",
      "`ON` нь мөрүүд хэрхэн тохирохыг заана. `JOIN` (`INNER JOIN`-тэй адил) нь **хоёр** хүснэгтэд хоёуланд нь тохирол олдсон мөрийг л үлдээнэ."),
    H("Short names and three tables", "Товч нэр ба гурван хүснэгт"),
    SQL(`
SELECT s.name, c.title, e.score
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id
ORDER BY s.name, c.title;
`),
    TIP("`AS s` gives a table a short name (an alias). Write `s.name` instead of `students.name`. When two tables both have a column called `id`, you must say which one you mean.",
        "`AS s` нь хүснэгтэд товч нэр (alias) өгнө. `students.name`-ийн оронд `s.name` гэж бичнэ. Хоёр хүснэгт хоёулаа `id` баганатай бол алийг нь хэлж байгаагаа заавал заана."),
    WALK("sql",
      ["FROM enrollments AS e", "Start from `enrollments`, nicknamed `e`. Each row is one student–course pair.", "`e` товч нэртэй `enrollments`-ээс эхэлнэ. Мөр бүр нэг оюутан–хичээлийн хос."],
      ["JOIN students AS s ON s.id = e.student_id", "For each row, find the student whose `id` equals `student_id`.", "Мөр бүрийн хувьд `id` нь `student_id`-тэй тэнцүү оюутныг олно."],
      ["JOIN courses  AS c ON c.id = e.course_id", "Then find the course whose `id` equals `course_id`.", "Дараа нь `id` нь `course_id`-тэй тэнцүү хичээлийг олно."],
      ["SELECT s.name, c.title, e.score", "Show the student's name, the course title and the score side by side.", "Оюутны нэр, хичээлийн нэр, оноог зэрэгцүүлэн харуулна."]
    ),
    P("For example, this is how the enrollment row `1, 2, 78` becomes one line of the result:",
      "Жишээ нь, `1, 2, 78` гэсэн enrollments-ийн мөр үр дүнгийн нэг мөр ингэж болдог:"),
    TABLE([["Step", "Алхам"], ["What happens", "Юу болох"]],
      ["1", ["Take the row `student_id = 1, course_id = 2, score = 78`.", "`student_id = 1, course_id = 2, score = 78` мөрийг авна."]],
      ["2", ["Find the student with `id = 1`: Bat.", "`id = 1` оюутныг олно: Bat."]],
      ["3", ["Find the course with `id = 2`: Databases.", "`id = 2` хичээлийг олно: Databases."]],
      ["4", ["Write one result row: `Bat | Databases | 78`.", "Үр дүнгийн нэг мөр бичнэ: `Bat | Databases | 78`."]]
    ),
    H("LEFT JOIN: keep every row on the left", "LEFT JOIN: зүүн талын бүх мөрийг үлдээх"),
    P("Munkh-Erdene has not enrolled in any course, so an inner join leaves that student out. `LEFT JOIN` keeps every row from the left table and fills the missing side with NULL.",
      "Munkh-Erdene ямар ч хичээл сонгоогүй тул INNER JOIN тэр оюутныг үр дүнгээс хасна. `LEFT JOIN` нь зүүн талын хүснэгтийн бүх мөрийг үлдээж, дутуу талыг NULL-ээр бөглөнө."),
    SQL(`
SELECT s.name, e.course_id, e.score
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id
ORDER BY e.score;
`),
    SQL(`
-- Students with no courses / Хичээл сонгоогүй оюутнууд
SELECT s.name
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id
WHERE e.student_id IS NULL;
`),
    TABLE([["Join", "Холболт"], ["Keeps", "Үлдээх мөр"]],
      ["`INNER JOIN`", ["only rows that match in both tables", "хоёр хүснэгтэд хоёуланд нь тохирсон мөр"]],
      ["`LEFT JOIN`", ["every row from the left table, plus matches", "зүүн хүснэгтийн бүх мөр, тохирсон мөрүүдийн хамт"]],
      ["`RIGHT JOIN`", ["every row from the right table, plus matches", "баруун хүснэгтийн бүх мөр, тохирсон мөрүүдийн хамт"]],
      ["`FULL JOIN`", ["every row from both tables", "хоёр хүснэгтийн бүх мөр"]]
    ),
    H("JOIN with GROUP BY", "JOIN ба GROUP BY"),
    SQL(`
-- Average score per course title, including courses nobody took
-- Хичээл бүрийн дундаж оноо, хэн ч сонгоогүй хичээлийг оролцуулан
SELECT c.title,
       ROUND(AVG(e.score), 1) AS avg_score,
       COUNT(e.student_id)    AS students
FROM courses AS c
LEFT JOIN enrollments AS e ON e.course_id = c.id
GROUP BY c.title
ORDER BY avg_score DESC;
`),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("sql",
      `SELECT s.name, c.title
FROM students AS s
JOIN courses AS c;`,
      `SELECT s.name, c.title
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;`,
      "Without `ON`, SQLite pairs **every** student with **every** course: 10 × 5 = 50 rows, most of them untrue. Always say how the rows match.",
      "`ON` байхгүй бол SQLite оюутан **бүрийг** хичээл **бүртэй** хослуулна: 10 × 5 = 50 мөр, ихэнх нь худал. Мөрүүд хэрхэн тохирохыг үргэлж заа."),
    FIX("sql",
      `SELECT id, title
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;`,
      `SELECT s.id, c.title
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;`,
      "Both `students` and `courses` have a column called `id`, so SQL stops with *ambiguous column name: id*. Put the table's short name in front: `s.id`.",
      "`students`, `courses` хоёулаа `id` баганатай тул SQL *ambiguous column name: id* алдаа өгч зогсоно. Хүснэгтийн товч нэрийг урд нь бич: `s.id`."),
    RECAP(
      ["Data is split into tables and linked by IDs. A foreign key points to another table's primary key.", "Өгөгдөл хүснэгтүүдэд хуваагдаж, ID-аар холбогдоно. Гадаад түлхүүр өөр хүснэгтийн үндсэн түлхүүрийг заана."],
      ["`JOIN … ON …` combines rows that match; `ON` says how they match.", "`JOIN … ON …` тохирох мөрүүдийг нэгтгэнэ; `ON` хэрхэн тохирохыг заана."],
      ["`INNER JOIN` keeps only matched rows. `LEFT JOIN` keeps every row of the left table and fills the gaps with NULL.", "`INNER JOIN` зөвхөн тохирсон мөрийг үлдээнэ. `LEFT JOIN` зүүн хүснэгтийн бүх мөрийг үлдээж, дутууг NULL-ээр бөглөнө."],
      ["Short names such as `AS s` save typing and are required when two tables share a column name.", "`AS s` шиг товч нэр бичихийг хөнгөвчилж, хоёр хүснэгт ижил нэртэй баганатай үед заавал хэрэгтэй."],
      ["A join without `ON` pairs every row with every row.", "`ON`-гүй холболт мөр бүрийг мөр бүртэй хослуулна."]
    )
  ],
  exercise: {
    task: ["Show the names of students enrolled in `'Databases'` together with their scores, highest score first.",
           "`'Databases'` хичээлд суралцаж буй оюутнуудын нэр, оноог хамгийн өндөр оноогоос нь эхлүүлэн харуул."],
    start: `SELECT s.name, e.score
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
-- join courses, filter, sort / courses-ийг холбож, шүүж, эрэмбэл
`,
    solution: `SELECT s.name, e.score FROM enrollments AS e JOIN students AS s ON s.id = e.student_id JOIN courses AS c ON c.id = e.course_id WHERE c.title = 'Databases' ORDER BY e.score DESC;`,
    ordered: true,
    hint: ["Add `JOIN courses AS c ON c.id = e.course_id`, then `WHERE c.title = 'Databases'` and `ORDER BY e.score DESC`.", "`JOIN courses AS c ON c.id = e.course_id` нэмээд, `WHERE c.title = 'Databases'`, `ORDER BY e.score DESC` бич."]
  },
  quiz: [
    { q: ["What is a foreign key?", "Гадаад түлхүүр гэж юу вэ?"],
      opts: [["A column that points to the primary key of another table", "Өөр хүснэгтийн үндсэн түлхүүрийг заадаг багана"], ["A password", "Нууц үг"], ["A key from another country", "Өөр улсын түлхүүр"]],
      a: 0, why: ["`enrollments.student_id` → `students.id` is a foreign key.", "`enrollments.student_id` → `students.id` бол гадаад түлхүүр."] },
    { q: ["Which join keeps students with no enrollments?", "Аль холболт хичээл сонгоогүй оюутныг үлдээх вэ?"],
      opts: [["`INNER JOIN` from students", "students-ээс `INNER JOIN`"], ["`LEFT JOIN` from students", "students-ээс `LEFT JOIN`"], ["Neither", "Аль нь ч биш"]],
      a: 1, why: ["LEFT JOIN keeps every row of the left table.", "LEFT JOIN зүүн хүснэгтийн бүх мөрийг үлдээдэг."] },
    { q: ["What does the `ON` part of a join say?", "JOIN-ий `ON` хэсэг юуг заадаг вэ?"],
      opts: [["Which table to delete", "Аль хүснэгтийг устгах"], ["How to sort", "Хэрхэн эрэмбэлэх"], ["How rows of the two tables match", "Хоёр хүснэгтийн мөрүүд хэрхэн тохирох"]],
      a: 2, why: ["For example `ON s.id = e.student_id`.", "Жишээ нь `ON s.id = e.student_id`."] },
    { q: ["`students` has 10 rows and `courses` has 5. How many rows does a join of the two without `ON` give?", "`students` 10, `courses` 5 мөртэй. Хоёуланг нь `ON`-гүйгээр холбовол хэдэн мөр гарах вэ?"],
      opts: [["15", "15"], ["50", "50"], ["10", "10"]],
      a: 1, why: ["Every student is paired with every course: 10 × 5 = 50.", "Оюутан бүр хичээл бүртэй хослоно: 10 × 5 = 50."] }
  ]
});

CG.lessons.push({
  id: "sql-modify", track: "sql",
  title: ["INSERT, UPDATE, DELETE", "Өгөгдөл нэмэх, засах, устгах"],
  lead: ["Add, change and remove rows safely.", "Мөрийг аюулгүйгээр нэмж, өөрчилж, устгана."],
  goals: [
    ["Add rows with `INSERT`", "`INSERT`-ээр мөр нэмэх"],
    ["Change rows with `UPDATE`", "`UPDATE`-ээр мөр өөрчлөх"],
    ["Remove rows with `DELETE`", "`DELETE`-ээр мөр устгах"],
    ["Undo a group of changes with a transaction", "Транзакцаар хэд хэдэн өөрчлөлтийг буцаах"]
  ],
  body: [
    H("CRUD", "CRUD"),
    P("Almost every app does four things with data: **C**reate, **R**ead, **U**pdate and **D**elete. In SQL they are `INSERT`, `SELECT`, `UPDATE` and `DELETE`.",
      "Бараг бүх апп өгөгдөлтэй дөрвөн зүйл хийдэг: **C**reate (үүсгэх), **R**ead (унших), **U**pdate (шинэчлэх), **D**elete (устгах). SQL-д эдгээр нь `INSERT`, `SELECT`, `UPDATE`, `DELETE`."),
    TABLE([["Action", "Үйлдэл"], "SQL", ["In a class register", "Ангийн журналд"]],
      [["Create", "Үүсгэх"], "`INSERT`", ["add a line for a new student", "шинэ оюутны мөр нэмэх"]],
      [["Read", "Унших"], "`SELECT`", ["look something up", "ямар нэг зүйл харах"]],
      [["Update", "Шинэчлэх"], "`UPDATE`", ["correct a value", "утгыг засах"]],
      [["Delete", "Устгах"], "`DELETE`", ["remove a line", "мөрийг арилгах"]]
    ),
    H("INSERT: add rows", "INSERT: мөр нэмэх"),
    SQL(`
INSERT INTO students (name, city, age, gpa)
VALUES ('Khulan', 'Choibalsan', 20, 3.7);

SELECT * FROM students WHERE name = 'Khulan';
`),
    P("We did not give an `id`. Because `id` is an `INTEGER PRIMARY KEY`, SQLite fills in the next number automatically.",
      "Бид `id` өгөөгүй. `id` нь `INTEGER PRIMARY KEY` учир SQLite дараагийн дугаарыг автоматаар оноодог."),
    WALK("sql",
      ["INSERT INTO students", "Add a row to the `students` table.", "`students` хүснэгтэд мөр нэмнэ."],
      ["(name, city, age, gpa)", "These are the columns we will fill, in this order.", "Бөглөх баганууд, яг энэ дарааллаар."],
      ["VALUES ('Khulan', 'Choibalsan', 20, 3.7);", "The values, in the same order as the columns: text in single quotes, numbers without.", "Утгууд, баганатай ижил дарааллаар: текст дан хашилтад, тоо хашилтгүй."]
    ),
    SQL(`
-- Several rows at once / Хэд хэдэн мөрийг нэг дор
INSERT INTO courses (title, credits, teacher)
VALUES ('History', 2, 'Batbayar'),
       ('Chemistry', 3, 'Undral');

SELECT * FROM courses;
`),
    H("UPDATE: change rows", "UPDATE: мөр өөрчлөх"),
    SQL(`
UPDATE students
SET gpa = 3.0
WHERE name = 'Tuvshin';

SELECT name, gpa FROM students WHERE name = 'Tuvshin';
`),
    P("To change several columns at once, separate them with commas after `SET`.",
      "Хэд хэдэн баганыг нэг дор өөрчлөхдөө `SET`-ийн дараа тэдгээрийг таслалаар тусгаарла."),
    SQL(`
UPDATE students
SET city = 'Darkhan', age = 22
WHERE id = 4;

SELECT * FROM students WHERE id = 4;
`),
    DANGER("**Always write `WHERE` with `UPDATE` and `DELETE`.** Without it, *every* row changes: `UPDATE students SET gpa = 0;` would wipe every student's GPA. Professionals first run a `SELECT` with the same `WHERE` to see which rows will be affected.",
           "**`UPDATE`, `DELETE`-д үргэлж `WHERE` бич.** Үгүй бол *бүх* мөр өөрчлөгдөнө: `UPDATE students SET gpa = 0;` бүх оюутны голч дүнг арилгана. Мэргэжлийн хүмүүс эхлээд ижил `WHERE`-тэй `SELECT` ажиллуулж, аль мөр өөрчлөгдөхийг шалгадаг."),
    H("A safe habit: look first, then change", "Аюулгүй дадал: эхлээд хар, дараа нь өөрчил"),
    OL(
      ["Write a `SELECT` with the `WHERE` you plan to use.", "Ашиглахаар төлөвлөсөн `WHERE`-тэйгээ `SELECT` бич."],
      ["Check that exactly the right rows come back.", "Яг зөв мөрүүд гарч байгааг шалга."],
      ["Change only the first line: `SELECT *` becomes `UPDATE … SET …` or `DELETE`.", "Зөвхөн эхний мөрийг өөрчил: `SELECT *`-ийг `UPDATE … SET …` эсвэл `DELETE` болго."],
      ["Run a `SELECT` again to see the result.", "Үр дүнг харахын тулд дахин `SELECT` ажиллуул."]
    ),
    SQL(`
-- 1. Look / Харах
SELECT * FROM enrollments WHERE score < 60;

-- 2. Change / Өөрчлөх
UPDATE enrollments SET score = 60 WHERE score < 60;

-- 3. Check / Шалгах
SELECT * FROM enrollments WHERE score <= 60;
`),
    SQL(`
-- Add 5 bonus points in Mathematics (course 3)
-- Математикийн хичээлд (3-р хичээл) 5 урамшууллын оноо нэмэх
UPDATE enrollments
SET score = score + 5
WHERE course_id = 3;

SELECT * FROM enrollments WHERE course_id = 3;
`),
    H("DELETE: remove rows", "DELETE: мөр устгах"),
    SQL(`
DELETE FROM enrollments
WHERE score < 60;

SELECT COUNT(*) AS remaining FROM enrollments;
`),
    H("Transactions", "Транзакц"),
    P("A **transaction** groups several changes so they all succeed or all fail together. A bank transfer must take money from one account **and** add it to another; doing only half would be a disaster. `COMMIT` saves the changes; `ROLLBACK` cancels them.",
      "**Транзакц** нь хэд хэдэн өөрчлөлтийг бүлэглэж, бүгд хамт амжилттай болох эсвэл бүгд хамт цуцлагдахыг баталгаажуулдаг. Банкны шилжүүлэг нэг данснаас мөнгө хасаад **бас** нөгөө дансанд нэмэх ёстой; зөвхөн хагасыг нь хийвэл гамшиг болно. `COMMIT` өөрчлөлтийг хадгална; `ROLLBACK` цуцална."),
    SQL(`
BEGIN;
UPDATE students SET city = 'Darkhan' WHERE id = 1;
SELECT name, city FROM students WHERE id = 1;   -- Darkhan
ROLLBACK;   -- undo / буцаах
SELECT name, city FROM students WHERE id = 1;   -- Ulaanbaatar again / дахин Ulaanbaatar
`),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("sql",
      `INSERT INTO students (name, city, age)
VALUES ('Bold', 'Khovd');`,
      `INSERT INTO students (name, city, age)
VALUES ('Bold', 'Khovd', 20);`,
      "Three columns but only two values gives *2 values for 3 columns*. Count both lists: they must have the same length and the same order.",
      "Гурван багана атлаа хоёрхон утга өгвөл *2 values for 3 columns* алдаа гарна. Хоёр жагсаалтаа тоол: урт, дараалал нь ижил байх ёстой."),
    FIX("sql",
      `DELETE FROM students;`,
      `DELETE FROM students
WHERE id = 10;`,
      "Without `WHERE`, every student is deleted. On this practice page you can press Reset data, but on a real system it would be a disaster.",
      "`WHERE`-гүй бол бүх оюутан устгагдана. Энэ дасгалын хуудсанд Өгөгдөл сэргээх товч дарж болох ч жинхэнэ систем дээр гамшиг болно."),
    RECAP(
      ["CRUD: `INSERT` creates, `SELECT` reads, `UPDATE` changes, `DELETE` removes.", "CRUD: `INSERT` үүсгэнэ, `SELECT` уншина, `UPDATE` өөрчилнө, `DELETE` устгана."],
      ["`INSERT INTO t (columns) VALUES (…)`: the values follow the order of the columns.", "`INSERT INTO t (баганууд) VALUES (…)`: утгууд баганын дарааллыг дагана."],
      ["`UPDATE t SET a = 1, b = 2 WHERE …` can change several columns at once.", "`UPDATE t SET a = 1, b = 2 WHERE …` хэд хэдэн баганыг нэг дор өөрчилж чадна."],
      ["Always use `WHERE` with `UPDATE` and `DELETE`, and run a `SELECT` with the same `WHERE` first.", "`UPDATE`, `DELETE`-д үргэлж `WHERE` ашиглаж, эхлээд ижил `WHERE`-тэй `SELECT` ажиллуул."],
      ["`BEGIN … COMMIT` saves a group of changes together; `ROLLBACK` cancels them.", "`BEGIN … COMMIT` хэд хэдэн өөрчлөлтийг хамт хадгална; `ROLLBACK` цуцална."]
    )
  ],
  exercise: {
    task: ["Add a new course: title `'Web Design'`, 3 credits, teacher `'Ariunaa'`. Then show every row of `courses`.",
           "Шинэ хичээл нэм: нэр `'Web Design'`, 3 кредит, багш `'Ariunaa'`. Дараа нь `courses`-ийн бүх мөрийг харуул."],
    start: `INSERT INTO courses (title, credits, teacher)
VALUES ();

SELECT * FROM courses;
`,
    solution: `INSERT INTO courses (title, credits, teacher) VALUES ('Web Design', 3, 'Ariunaa');
SELECT * FROM courses;`,
    hint: ["Inside `VALUES ( … )` write the three values in the same order as the columns.", "`VALUES ( … )` дотор гурван утгыг баганатай ижил дарааллаар бич."]
  },
  quiz: [
    { q: ["What happens with `UPDATE students SET age = 20;` (no WHERE)?", "`UPDATE students SET age = 20;` (WHERE-гүй) ажиллуулбал юу болох вэ?"],
      opts: [["Every student's age becomes 20", "Бүх оюутны нас 20 болно"], ["Nothing happens", "Юу ч болохгүй"], ["Only the first student changes", "Зөвхөн эхний оюутан өөрчлөгдөнө"]],
      a: 0, why: ["Without WHERE, UPDATE changes every row.", "WHERE байхгүй бол UPDATE бүх мөрийг өөрчилнө."] },
    { q: ["Which statement adds a new row?", "Аль команд шинэ мөр нэмдэг вэ?"],
      opts: [["`UPDATE`", "`UPDATE`"], ["`INSERT INTO`", "`INSERT INTO`"], ["`SELECT`", "`SELECT`"]],
      a: 1, why: ["INSERT creates rows; UPDATE changes existing ones.", "INSERT мөр үүсгэнэ; UPDATE байгаа мөрийг өөрчилнө."] },
    { q: ["What does `ROLLBACK` do?", "`ROLLBACK` юу хийдэг вэ?"],
      opts: [["Saves the changes", "Өөрчлөлтийг хадгална"], ["Deletes the database", "Өгөгдлийн санг устгана"], ["Cancels the changes made since `BEGIN`", "`BEGIN`-ээс хойш хийсэн өөрчлөлтийг цуцална"]],
      a: 2, why: ["`COMMIT` saves, `ROLLBACK` undoes.", "`COMMIT` хадгална, `ROLLBACK` буцаана."] },
    { q: ["What should you run before `DELETE FROM enrollments WHERE score < 60;`?", "`DELETE FROM enrollments WHERE score < 60;`-ээс өмнө юу ажиллуулах вэ?"],
      opts: [["`SELECT * FROM enrollments WHERE score < 60;`", "`SELECT * FROM enrollments WHERE score < 60;`"], ["`DROP TABLE enrollments;`", "`DROP TABLE enrollments;`"], ["Nothing", "Юу ч биш"]],
      a: 0, why: ["A SELECT with the same WHERE shows exactly which rows will be deleted.", "Ижил WHERE-тэй SELECT яг аль мөрүүд устахыг харуулна."] }
  ]
});

CG.lessons.push({
  id: "sql-create", track: "sql",
  title: ["Creating tables", "Хүснэгт үүсгэх"],
  lead: ["Define your own tables and the rules that keep data correct.", "Өөрийн хүснэгт, өгөгдлийг зөв байлгах дүрмүүдийг тодорхойлно."],
  goals: [
    ["Write `CREATE TABLE`", "`CREATE TABLE` бичих"],
    ["Add constraints: `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`", "Хязгаарлалт нэмэх: `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`"],
    ["Link tables with `REFERENCES`", "`REFERENCES`-ээр хүснэгт холбох"],
    ["Change or remove tables with `ALTER` and `DROP`", "`ALTER`, `DROP`-оор хүснэгт өөрчлөх, устгах"]
  ],
  body: [
    H("CREATE TABLE", "CREATE TABLE"),
    SQL(`
CREATE TABLE teachers (
  id      INTEGER PRIMARY KEY,
  name    TEXT    NOT NULL,
  email   TEXT    UNIQUE,
  salary  INTEGER DEFAULT 1800000,   -- ₮ per month / сард
  hired   TEXT                       -- date 'YYYY-MM-DD' / огноо
);

INSERT INTO teachers (name, email, hired)
VALUES ('Dorj', 'dorj@school.mn', '2019-09-01');

SELECT * FROM teachers;
`),
    P("We did not give a salary, so `DEFAULT` filled in 1 800 000.",
      "Бид цалин өгөөгүй тул `DEFAULT` 1 800 000-ыг бөглөсөн."),
    IDEA("`CREATE TABLE` is like designing a paper form before anyone fills it in. You decide the boxes (columns), what may be written in each one (types) and the rules (*required*, *must be unique*). The rows are the filled-in copies of the form.",
         "`CREATE TABLE` нь хэн нэгэн бөглөхөөс өмнө цаасан маягт зохиохтой адил. Нүднүүд (багана), нүд бүрт юу бичиж болох (төрөл), дүрмүүдийг (*заавал*, *давтагдашгүй*) та шийднэ. Мөрүүд бол маягтын бөглөгдсөн хувиуд."),
    WALK("sql",
      ["CREATE TABLE teachers (", "Create a new table called `teachers`. The list of columns goes inside the brackets.", "`teachers` нэртэй шинэ хүснэгт үүсгэнэ. Баганын жагсаалт хаалт дотор бичигдэнэ."],
      ["  id      INTEGER PRIMARY KEY,", "Each line is: column name, type, then rules. This is the unique ID, and SQLite numbers it automatically.", "Мөр бүр: баганын нэр, төрөл, дараа нь дүрэм. Энэ бол давтагдашгүй ID бөгөөд SQLite автоматаар дугаарлана."],
      ["  name    TEXT    NOT NULL,", "A text column that must always have a value.", "Заавал утгатай байх текст багана."],
      ["  email   TEXT    UNIQUE,", "No two teachers may share an email.", "Хоёр багш ижил имэйлтэй байж болохгүй."],
      ["  salary  INTEGER DEFAULT 1800000,", "If no salary is given, use 1 800 000.", "Цалин өгөөгүй бол 1 800 000-ыг ашиглана."],
      [");", "Close the bracket and end the statement. Columns are separated by commas, with no comma after the last one.", "Хаалтаа хааж, командыг төгсгөнө. Багануудыг таслалаар тусгаарлах бөгөөд сүүлийнхийн дараа таслал тавихгүй."]
    ),
    H("Constraints: rules for data", "Хязгаарлалт: өгөгдлийн дүрэм"),
    TABLE([["Constraint", "Хязгаарлалт"], ["Rule", "Дүрэм"]],
      ["`PRIMARY KEY`", ["a unique ID for every row", "мөр бүрийн давтагдашгүй ID"]],
      ["`NOT NULL`", ["a value is required", "утга заавал байх ёстой"]],
      ["`UNIQUE`", ["no two rows may share the value", "хоёр мөр ижил утгатай байж болохгүй"]],
      ["`DEFAULT x`", ["use `x` when no value is given", "утга өгөөгүй үед `x`-ийг ашиглана"]],
      ["`CHECK (…)`", ["a custom rule, e.g. `CHECK (age >= 0)`", "өөрийн дүрэм, жишээ нь `CHECK (age >= 0)`"]],
      ["`REFERENCES t(id)`", ["the value must exist in another table (foreign key)", "утга өөр хүснэгтэд байх ёстой (гадаад түлхүүр)"]]
    ),
    SQL(`
-- This fails on purpose: name cannot be NULL. Read the error!
-- Энэ санаатайгаар алдаа өгнө: name хоосон байж болохгүй. Алдааг унш!
CREATE TABLE pets (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age  INTEGER CHECK (age >= 0)
);
INSERT INTO pets (name, age) VALUES (NULL, 3);
`),
    TIP("Change `NULL` to `'Khaliun'` and run again. Then try `age` = `-1` to see the CHECK rule work. Press **Reset data** first if the table already exists.",
        "`NULL`-ийг `'Khaliun'` болгоод дахин ажиллуул. Дараа нь `age` = `-1` болгож CHECK дүрэм хэрхэн ажилладгийг хар. Хүснэгт аль хэдийн үүссэн бол эхлээд **Өгөгдөл сэргээх** товч дар."),
    H("Foreign keys", "Гадаад түлхүүр"),
    SQL(`
PRAGMA foreign_keys = ON;   -- SQLite needs this switch / SQLite-д үүнийг асаана

CREATE TABLE teams (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE players (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  team_id INTEGER REFERENCES teams(id)
);

INSERT INTO teams (id, name) VALUES (1, 'Khangarid'), (2, 'Erchim');
INSERT INTO players (name, team_id) VALUES ('Bold', 1), ('Gerel', 2);

-- Team 9 does not exist, so this fails:
-- 9-р баг байхгүй тул энэ алдаа өгнө:
INSERT INTO players (name, team_id) VALUES ('Ankhaa', 9);
`),
    H("Avoiding «already exists»", "«already exists» алдаанаас зайлсхийх"),
    P("Running the same `CREATE TABLE` twice gives *table … already exists*. Add `IF NOT EXISTS` to create a table only when it is missing, and `IF EXISTS` to drop it only when it is there. Setup scripts use both all the time.",
      "Ижил `CREATE TABLE`-ийг хоёр удаа ажиллуулбал *table … already exists* алдаа гарна. Хүснэгт байхгүй үед л үүсгэхийн тулд `IF NOT EXISTS`, байгаа үед л устгахын тулд `IF EXISTS` нэм. Өгөгдлийн сан бэлддэг скриптүүд эдгээрийг байнга хэрэглэдэг."),
    SQL(`
CREATE TABLE IF NOT EXISTS notes (
  id   INTEGER PRIMARY KEY,
  text TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY);   -- no error / алдаагүй

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS notes;   -- no error either / мөн алдаагүй
SELECT 'done' AS result;
`),
    H("Changing and removing tables", "Хүснэгт өөрчлөх, устгах"),
    SQL(`
ALTER TABLE students ADD COLUMN phone TEXT;
SELECT * FROM students LIMIT 3;
`),
    CODE("sql", `
DROP TABLE pets;   -- deletes the table and ALL of its rows
                   -- хүснэгт болон түүний БҮХ мөрийг устгана
`),
    DANGER("`DROP TABLE` and `DELETE` without `WHERE` cannot be undone outside a transaction. Real teams keep backups and test changes on a copy first.",
           "`DROP TABLE`, `WHERE`-гүй `DELETE`-ийг транзакцаас гадна буцаах боломжгүй. Жинхэнэ багууд нөөц хуулбар хадгалж, өөрчлөлтөө эхлээд хуулбар дээр туршдаг."),
    H("Types in other databases", "Бусад өгөгдлийн сан дахь төрлүүд"),
    TABLE([["SQLite", "SQLite"], ["PostgreSQL", "PostgreSQL"], ["MySQL", "MySQL"]],
      ["`INTEGER PRIMARY KEY`", "`SERIAL` / `INTEGER GENERATED … AS IDENTITY`", "`INT AUTO_INCREMENT`"],
      ["`TEXT`", "`VARCHAR(n)`, `TEXT`", "`VARCHAR(n)`, `TEXT`"],
      ["`REAL`", "`NUMERIC(p,s)`, `REAL`", "`DECIMAL(p,s)`, `DOUBLE`"],
      [["`TEXT` (dates as text)", "`TEXT` (огноог текстээр)"], "`DATE`, `TIMESTAMP`", "`DATE`, `DATETIME`"],
      [["`INTEGER` 0 / 1", "`INTEGER` 0 / 1"], "`BOOLEAN`", "`BOOLEAN`"]
    ),
    H("Choosing rules for each column", "Багана бүрийн дүрмийг сонгох"),
    P("For every column, ask these five questions:",
      "Багана бүрийн хувьд эдгээр таван асуултыг асуу:"),
    TABLE([["Ask yourself", "Өөрөөсөө асуу"], ["If yes, add", "Тийм бол нэм"]],
      [["Is a value required?", "Утга заавал байх ёстой юу?"], "`NOT NULL`"],
      [["Must it be different in every row?", "Мөр бүрт өөр байх ёстой юу?"], "`UNIQUE`"],
      [["Is there a usual value?", "Ердийн утга байдаг уу?"], "`DEFAULT …`"],
      [["Are some values impossible?", "Боломжгүй утга байна уу?"], "`CHECK (…)`"],
      [["Does it point to another table?", "Өөр хүснэгтийг заадаг уу?"], "`REFERENCES …`"]
    ),
    FIX("sql",
      `CREATE TABLE cars (
  id    INTEGER PRIMARY KEY
  model TEXT NOT NULL,
  year  INTEGER,
);`,
      `CREATE TABLE cars (
  id    INTEGER PRIMARY KEY,
  model TEXT NOT NULL,
  year  INTEGER
);`,
      "Two comma mistakes: one is missing after the first column, and there is an extra one after the last. Both give a *syntax error*. Every column except the last ends with a comma.",
      "Таслалын хоёр алдаа: эхний баганын дараа дутуу, сүүлийнхийн дараа илүү. Хоёулаа *syntax error* өгнө. Сүүлийнхээс бусад багана бүр таслалаар төгсөнө."),
    RECAP(
      ["`CREATE TABLE name (column TYPE rules, …);` defines a new table.", "`CREATE TABLE нэр (багана ТӨРӨЛ дүрэм, …);` шинэ хүснэгт тодорхойлно."],
      ["`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK` and `REFERENCES` keep the data correct.", "`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`, `REFERENCES` өгөгдлийг зөв байлгана."],
      ["In SQLite, turn on foreign key checks with `PRAGMA foreign_keys = ON;`.", "SQLite-д гадаад түлхүүрийн шалгалтыг `PRAGMA foreign_keys = ON;`-оор асаана."],
      ["`IF NOT EXISTS` and `IF EXISTS` avoid errors when a table is already there or already gone.", "Хүснэгт аль хэдийн байгаа эсвэл устсан үед `IF NOT EXISTS`, `IF EXISTS` алдаанаас сэргийлнэ."],
      ["`ALTER TABLE` changes a table; `DROP TABLE` deletes it together with all its rows.", "`ALTER TABLE` хүснэгтийг өөрчилнө; `DROP TABLE` бүх мөртэй нь устгана."]
    )
  ],
  exercise: {
    task: ["Create a table `books` with `id` (INTEGER PRIMARY KEY), `title` (TEXT, NOT NULL) and `year` (INTEGER). Insert `'SQL Basics'` (2024) and `'JavaScript for Beginners'` (2025), then show all rows of `books`.",
           "`id` (INTEGER PRIMARY KEY), `title` (TEXT, NOT NULL), `year` (INTEGER) баганатай `books` хүснэгт үүсгэ. `'SQL Basics'` (2024), `'JavaScript for Beginners'` (2025)-ийг оруулаад `books`-ийн бүх мөрийг харуул."],
    start: `CREATE TABLE books (

);
`,
    solution: `CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER);
INSERT INTO books (title, year) VALUES ('SQL Basics', 2024), ('JavaScript for Beginners', 2025);
SELECT * FROM books;`,
    hint: ["Three statements: `CREATE TABLE …;`, `INSERT INTO books (title, year) VALUES (…), (…);`, `SELECT * FROM books;`", "Гурван команд: `CREATE TABLE …;`, `INSERT INTO books (title, year) VALUES (…), (…);`, `SELECT * FROM books;`"]
  },
  quiz: [
    { q: ["What does `NOT NULL` mean?", "`NOT NULL` юу гэсэн үг вэ?"],
      opts: [["The column must always have a value", "Баганад заавал утга байх ёстой"], ["The column is always zero", "Багана үргэлж тэг"], ["The column is hidden", "Багана нуугдсан"]],
      a: 0, why: ["Inserting NULL into a NOT NULL column fails.", "NOT NULL баганад NULL оруулбал алдаа гарна."] },
    { q: ["Which constraint stops two teachers from having the same email?", "Аль хязгаарлалт хоёр багш ижил имэйлтэй байхаас сэргийлэх вэ?"],
      opts: [["`DEFAULT`", "`DEFAULT`"], ["`UNIQUE`", "`UNIQUE`"], ["`CHECK`", "`CHECK`"]],
      a: 1, why: ["UNIQUE rejects duplicate values.", "UNIQUE давхардсан утгыг хүлээж авахгүй."] },
    { q: ["What does `DROP TABLE pets;` do?", "`DROP TABLE pets;` юу хийдэг вэ?"],
      opts: [["Deletes one row", "Нэг мөр устгана"], ["Empties one column", "Нэг баганыг хоослоно"], ["Deletes the table and all its data", "Хүснэгт болон бүх өгөгдлийг нь устгана"]],
      a: 2, why: ["DROP removes the whole table.", "DROP хүснэгтийг бүхэлд нь устгадаг."] },
    { q: ["What does `CREATE TABLE IF NOT EXISTS notes (…)` do when `notes` already exists?", "`notes` аль хэдийн байхад `CREATE TABLE IF NOT EXISTS notes (…)` юу хийх вэ?"],
      opts: [["Gives an error", "Алдаа өгнө"], ["Nothing: the existing table stays", "Юу ч хийхгүй: байгаа хүснэгт хэвээр үлдэнэ"], ["Deletes the old table", "Хуучин хүснэгтийг устгана"]],
      a: 1, why: ["IF NOT EXISTS skips the creation when the table is already there.", "Хүснэгт аль хэдийн байвал IF NOT EXISTS үүсгэх алхмыг алгасна."] }
  ]
});

CG.lessons.push({
  id: "db-design", track: "sql",
  title: ["Designing a database", "Өгөгдлийн сан зохиох"],
  lead: ["Plan tables so that every fact is stored once.", "Баримт бүр нэг л удаа хадгалагдахаар хүснэгтээ төлөвлө."],
  goals: [
    ["Spot repeated data and why it causes errors", "Давхардсан өгөгдлийг илрүүлж, яагаад алдаа үүсгэдгийг ойлгох"],
    ["Model one-to-many and many-to-many relationships", "Нэг-олон, олон-олон холбоосыг загварчлах"],
    ["Follow a step-by-step design process", "Алхам алхмаар зохиох аргачлалыг мөрдөх"],
    ["Speed up searches with an index", "Индексээр хайлтыг хурдасгах"]
  ],
  body: [
    H("Don't repeat yourself", "Давхардлаас зайлсхий"),
    P("Look at this single table. The teacher's phone number is copied into every row. When the number changes, we must update many rows, and one mistake makes the data disagree with itself.",
      "Энэ ганц хүснэгтийг хар. Багшийн утасны дугаар мөр бүрт хуулагдсан байна. Дугаар солигдвол олон мөрийг шинэчлэх хэрэгтэй бөгөөд нэг алдаа гаргахад өгөгдөл өөр хоорондоо зөрчилдөнө."),
    TABLE(["student", "course", "teacher", "teacher_phone"],
      ["Bat", "Programming", "Dorj", "9911 2233"],
      ["Saraa", "Programming", "Dorj", "9911 2233"],
      ["Nomin", "Programming", "Dorj", ["9911 2234 ← typo!", "9911 2234 ← алдаа!"]]
    ),
    P("The fix is to split the data so each fact lives in **one place**: teachers in one table, courses in another, and enrollments linking them. This process is called **normalization**.",
      "Засах арга нь баримт бүр **нэг газар** хадгалагдахаар өгөгдлийг хуваах: багш нар нэг хүснэгтэд, хичээлүүд өөр хүснэгтэд, тэдгээрийг холбох enrollments хүснэгт. Үүнийг **нормчлол** (normalization) гэнэ."),
    IDEA("Think of the contacts on your phone. You save a friend's number once, and every chat and call uses that one entry. When the number changes, you edit it in one place. A good database works the same way.",
         "Утсан дээрх харилцагчдаа бодоод үз. Найзынхаа дугаарыг нэг удаа хадгалахад бүх чат, дуудлага тэр ганц бичлэгийг ашигладаг. Дугаар солигдвол нэг газар засна. Сайн өгөгдлийн сан яг ийм зарчмаар ажилладаг."),
    H("Relationships", "Холбоосууд"),
    TABLE([["Type", "Төрөл"], ["Example", "Жишээ"], ["How to build it", "Хэрхэн бүтээх"]],
      [["One-to-one", "Нэг-нэг"], ["person ↔ passport", "хүн ↔ паспорт"], ["foreign key with `UNIQUE`", "`UNIQUE` бүхий гадаад түлхүүр"]],
      [["One-to-many", "Нэг-олон"], ["one team → many players", "нэг баг → олон тоглогч"], ["foreign key on the *many* side: `players.team_id`", "*олон* талд гадаад түлхүүр: `players.team_id`"]],
      [["Many-to-many", "Олон-олон"], ["students ↔ courses", "оюутнууд ↔ хичээлүүд"], ["a junction table with two foreign keys: `enrollments`", "хоёр гадаад түлхүүртэй холбох хүснэгт: `enrollments`"]]
    ),
    { t: "schema" },
    H("Design step by step", "Алхам алхмаар зохиох"),
    OL(
      ["List the things your app is about (nouns): student, course, teacher. Each becomes a table.", "Апп тань юуны тухай болохыг (нэр үгс) жагсаа: оюутан, хичээл, багш. Тус бүр нэг хүснэгт болно."],
      ["List the properties of each thing. They become columns.", "Тус бүрийн шинж чанарыг жагсаа. Тэдгээр нь багана болно."],
      ["Give every table a primary key.", "Хүснэгт бүрт үндсэн түлхүүр өг."],
      ["Connect tables with foreign keys. Many-to-many needs a junction table.", "Хүснэгтүүдийг гадаад түлхүүрээр холбо. Олон-олон холбоонд холбох хүснэгт хэрэгтэй."],
      ["Add constraints: `NOT NULL`, `UNIQUE`, `CHECK`.", "Хязгаарлалт нэм: `NOT NULL`, `UNIQUE`, `CHECK`."],
      ["Test the design with sample data and the real questions your app will ask.", "Загвараа жишээ өгөгдөл, апп тань тавих бодит асуултуудаар шалга."]
    ),
    H("Normal forms, briefly", "Нормал хэлбэрүүд, товчоор"),
    TABLE([["Form", "Хэлбэр"], ["Rule", "Дүрэм"]],
      ["1NF", ["one value per cell; no lists such as `'math, physics'` in one cell", "нүд бүрт нэг утга; нэг нүдэнд `'math, physics'` гэх мэт жагсаалт бичихгүй"]],
      ["2NF", ["every column depends on the whole primary key", "багана бүр үндсэн түлхүүрээс бүхэлдээ хамаарна"]],
      ["3NF", ["no column depends on another non-key column (`teacher_phone` depends on the teacher, not on the enrollment)", "түлхүүр биш баганаас хамаарах багана байхгүй (`teacher_phone` нь enrollment-ээс биш, багшаас хамаардаг)"]]
    ),
    H("Indexes", "Индекс"),
    P("An **index** works like the index at the back of a book: the database can jump straight to matching rows instead of reading the whole table. Add indexes to columns you search by often. They make reads faster and writes slightly slower.",
      "**Индекс** нь номын ард байдаг товьёг шиг ажилладаг: өгөгдлийн сан бүх хүснэгтийг уншихын оронд тохирох мөр рүү шууд очно. Байнга хайдаг баганадаа индекс нэм. Индекс уншилтыг хурдасгаж, бичилтийг бага зэрэг удаашруулдаг."),
    SQL(`
CREATE INDEX idx_students_city ON students(city);

-- Ask SQLite how it will run the query
-- Хүсэлтийг хэрхэн ажиллуулахыг SQLite-аас асуух
EXPLAIN QUERY PLAN
SELECT * FROM students WHERE city = 'Darkhan';
`),
    H("A worked example: an online shop", "Жишээ: онлайн дэлгүүр"),
    P("Let's apply the six steps to a small shop. The nouns are **customer**, **product** and **order**. One customer places many orders (one-to-many). One order contains many products, and one product appears in many orders (many-to-many), so we need a junction table, `order_items`.",
      "Зургаан алхмыг жижиг дэлгүүрт хэрэглэж үзье. Нэр үгс нь **үйлчлүүлэгч**, **бүтээгдэхүүн**, **захиалга**. Нэг үйлчлүүлэгч олон захиалга өгнө (нэг-олон). Нэг захиалгад олон бүтээгдэхүүн, нэг бүтээгдэхүүн олон захиалгад орно (олон-олон) тул `order_items` гэсэн холбох хүснэгт хэрэгтэй."),
    SQL(`
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, phone TEXT UNIQUE);
CREATE TABLE products  (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER CHECK (price > 0));
CREATE TABLE orders    (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), day TEXT);
CREATE TABLE order_items (
  order_id   INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  qty        INTEGER DEFAULT 1,
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO customers   VALUES (1, 'Saraa', '9911 0001');
INSERT INTO products    VALUES (1, 'Notebook', 3500), (2, 'Pen', 1200), (3, 'Backpack', 45000);
INSERT INTO orders      VALUES (1, 1, '2026-09-01');
INSERT INTO order_items VALUES (1, 1, 3), (1, 2, 2), (1, 3, 1);

-- The receipt for order 1 / 1-р захиалгын баримт
SELECT p.name, oi.qty, p.price, oi.qty * p.price AS line_total
FROM order_items AS oi
JOIN products AS p ON p.id = oi.product_id
WHERE oi.order_id = 1;

-- How much each customer spent / Үйлчлүүлэгч бүр хэдийг зарцуулсан бэ
SELECT c.name, SUM(oi.qty * p.price) AS total
FROM orders AS o
JOIN customers   AS c  ON c.id = o.customer_id
JOIN order_items AS oi ON oi.order_id = o.id
JOIN products    AS p  ON p.id = oi.product_id
GROUP BY c.name;
`),
    P("The product's name and price live only in `products`, and the customer's phone only in `customers`. Each fact has exactly one home.",
      "Бүтээгдэхүүний нэр, үнэ зөвхөн `products`-д, үйлчлүүлэгчийн утас зөвхөн `customers`-д байна. Баримт бүр яг нэг байртай."),
    TIP("Real shops usually also copy the price into `order_items` at the moment of purchase, so old receipts stay the same when prices rise later. Good design always depends on the questions your app must answer.",
        "Жинхэнэ дэлгүүрүүд ихэвчлэн худалдан авалтын мөчийн үнийг `order_items`-д мөн хуулж хадгалдаг тул дараа нь үнэ өсөхөд хуучин баримт өөрчлөгдөхгүй. Сайн зохиомж үргэлж таны апп хариулах ёстой асуултаас хамаардаг."),
    FIX("sql",
      `CREATE TABLE students2 (
  id      INTEGER PRIMARY KEY,
  name    TEXT,
  courses TEXT   -- 'Math, Physics, English'
);`,
      `CREATE TABLE students2 (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE courses2  (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE enrollments2 (
  student_id INTEGER REFERENCES students2(id),
  course_id  INTEGER REFERENCES courses2(id),
  PRIMARY KEY (student_id, course_id)
);`,
      "A list inside one cell breaks 1NF. You cannot easily count who takes Physics, and a typo such as *Phisics* hides a student. Give each student–course pair its own row in a junction table.",
      "Нэг нүдэн доторх жагсаалт 1NF-ийг зөрчдөг. Физикийн хичээлийг хэн үздэгийг амархан тоолж чадахгүй, *Phisics* гэх мэт үсгийн алдаа оюутныг нууна. Оюутан–хичээлийн хос бүрт холбох хүснэгтэд тусдаа мөр өг."),
    RECAP(
      ["Store each fact in one place. Repeated data leads to contradictions.", "Баримт бүрийг нэг газар хадгал. Давхардсан өгөгдөл зөрчил үүсгэдэг."],
      ["One-to-many: a foreign key on the *many* side. Many-to-many: a junction table.", "Нэг-олон: *олон* талд гадаад түлхүүр. Олон-олон: холбох хүснэгт."],
      ["Design steps: nouns become tables, properties become columns, then keys, links, rules, and a test with real questions.", "Зохиох алхам: нэр үг хүснэгт, шинж чанар багана болно, дараа нь түлхүүр, холбоос, дүрэм, бодит асуултаар шалгах."],
      ["One value per cell (1NF), and no column that depends on a non-key column (3NF).", "Нүд бүрт нэг утга (1NF), түлхүүр биш баганаас хамаарах багана байхгүй (3NF)."],
      ["Indexes speed up searches on a column but make writes slightly slower.", "Индекс баганаар хайхыг хурдасгах ч бичилтийг бага зэрэг удаашруулна."]
    )
  ],
  exercise: {
    task: ["Create `authors` (`id`, `name`) and `books` (`id`, `title`, `author_id` referencing `authors`). Add the author `'Natsagdorj'` and two of the author's works, `'Minii Nutag'` and `'Uchirtai Gurvan Tolgoi'`. Finally list each book `title` with its author's `name` using JOIN.",
           "`authors` (`id`, `name`), `books` (`id`, `title`, `authors`-ийг заасан `author_id`) хүснэгт үүсгэ. `'Natsagdorj'` зохиолч, түүний `'Minii Nutag'`, `'Uchirtai Gurvan Tolgoi'` хоёр бүтээлийг нэм. Эцэст нь JOIN ашиглан ном бүрийн `title`-ийг зохиолчийн `name`-тэй хамт жагсаа."],
    start: `CREATE TABLE authors (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- create books, insert rows, then JOIN
-- books үүсгэж, мөр нэмээд, JOIN хий
`,
    solution: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author_id INTEGER REFERENCES authors(id));
INSERT INTO authors (id, name) VALUES (1, 'Natsagdorj');
INSERT INTO books (title, author_id) VALUES ('Minii Nutag', 1), ('Uchirtai Gurvan Tolgoi', 1);
SELECT b.title, a.name FROM books AS b JOIN authors AS a ON a.id = b.author_id;`,
    hint: ["The last statement: `SELECT b.title, a.name FROM books AS b JOIN authors AS a ON a.id = b.author_id;`", "Сүүлийн команд: `SELECT b.title, a.name FROM books AS b JOIN authors AS a ON a.id = b.author_id;`"]
  },
  quiz: [
    { q: ["What is the main goal of normalization?", "Нормчлолын гол зорилго юу вэ?"],
      opts: [["Store each fact in one place", "Баримт бүрийг нэг газар хадгалах"], ["Make tables as wide as possible", "Хүснэгтийг аль болох өргөн болгох"], ["Remove all IDs", "Бүх ID-г арилгах"]],
      a: 0, why: ["One place per fact means one place to update.", "Баримт нэг газар байвал шинэчлэх газар ч ганц байна."] },
    { q: ["Students ↔ courses is many-to-many. What does it need?", "Оюутан ↔ хичээл нь олон-олон холбоо. Юу хэрэгтэй вэ?"],
      opts: [["Nothing special", "Онцгой юм хэрэггүй"], ["A junction table such as `enrollments`", "`enrollments` шиг холбох хүснэгт"], ["One giant table", "Нэг аварга хүснэгт"]],
      a: 1, why: ["The junction table holds one row per student–course pair.", "Холбох хүснэгт оюутан–хичээлийн хос бүрт нэг мөр хадгална."] },
    { q: ["What does an index do?", "Индекс юу хийдэг вэ?"],
      opts: [["Deletes old rows", "Хуучин мөрийг устгана"], ["Encrypts data", "Өгөгдлийг шифрлэнэ"], ["Makes searches on a column faster", "Баганаар хайхыг хурдасгана"]],
      a: 2, why: ["Like a book's index, it avoids reading every row.", "Номын товьёг шиг бүх мөрийг уншихаас сэргийлнэ."] },
    { q: ["In the shop example, why is there an `order_items` table?", "Дэлгүүрийн жишээнд яагаад `order_items` хүснэгт байгаа вэ?"],
      opts: [["Orders and products are many-to-many", "Захиалга, бүтээгдэхүүн хоёр олон-олон холбоотой"], ["To store passwords", "Нууц үг хадгалахын тулд"], ["To make the database faster", "Өгөгдлийн санг хурдасгахын тулд"]],
      a: 0, why: ["One order has many products and one product is in many orders, so each pair needs its own row.", "Нэг захиалгад олон бүтээгдэхүүн, нэг бүтээгдэхүүн олон захиалгад байдаг тул хос бүрт тусдаа мөр хэрэгтэй."] }
  ]
});

CG.lessons.push({
  id: "db-code", track: "sql",
  title: ["Code meets the database", "Код ба өгөгдлийн сан"],
  lead: ["How a JavaScript app talks to a database, and how to keep it safe.", "JavaScript апп өгөгдлийн сантай хэрхэн харилцдаг, үүнийг хэрхэн аюулгүй байлгах вэ."],
  goals: [
    ["Follow a request from button to database and back", "Товчноос өгөгдлийн сан хүртэл, буцаад ирэх хүсэлтийн замыг ойлгох"],
    ["See how rows become JavaScript objects", "Мөрүүд JavaScript объект болохыг харах"],
    ["Prevent SQL injection with parameters", "Параметр ашиглан SQL injection-оос сэргийлэх"],
    ["Know what to learn next", "Цааш нь юу сурахаа мэдэх"]
  ],
  body: [
    H("The journey of a request", "Хүсэлтийн аялал"),
    P("The browser never talks to the database directly. A server program sits in the middle: it receives the request, runs SQL, and sends the answer back.",
      "Хөтөч өгөгдлийн сантай хэзээ ч шууд харилцдаггүй. Дунд нь сервер програм байдаг: хүсэлтийг хүлээн авч, SQL ажиллуулаад, хариуг буцааж илгээдэг."),
    IDEA("The server is like a waiter in a restaurant. You, the browser, do not walk into the kitchen, the database. You give your order to the waiter, who takes it to the kitchen and then brings the food back to your table.",
         "Сервер бол ресторан дахь зөөгч шиг. Хөтөч болох та гал тогоо буюу өгөгдлийн сан руу өөрөө ордоггүй. Захиалгаа зөөгчид өгөхөд тэр гал тогоонд хүргэж, дараа нь хоолыг тань ширээнд авчирна."),
    { t: "flow", items: [
      ["You click «Show my grades» in the browser", "Та хөтөч дээр «Дүнгээ харах» дарна"],
      ["The server (JavaScript, Node.js) builds an SQL query", "Сервер (JavaScript, Node.js) SQL хүсэлт бэлдэнэ"],
      ["The database runs it and returns rows", "Өгөгдлийн сан түүнийг ажиллуулж, мөрүүдийг буцаана"],
      ["The server turns rows into JSON objects", "Сервер мөрүүдийг JSON объект болгоно"],
      ["The page shows your grades", "Хуудас таны дүнг харуулна"]
    ] },
    H("Server code", "Серверийн код"),
    P("This is how a Node.js server asks PostgreSQL a question with the popular `pg` library. You cannot run it here because it needs a server, but read it line by line.",
      "Node.js сервер түгээмэл хэрэглэгддэг `pg` сангаар PostgreSQL-ээс хэрхэн асуулт тавьдгийг харуулав. Сервер шаардлагатай тул энд ажиллуулах боломжгүй, гэхдээ мөр мөрөөр нь уншаарай."),
    CODE("js", `
// Node.js + PostgreSQL ("pg" library / "pg" сан)
import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function getGrades(studentId) {
  const result = await db.query(
    "SELECT c.title, e.score FROM enrollments e " +
    "JOIN courses c ON c.id = e.course_id WHERE e.student_id = $1",
    [studentId]            // the value for $1 / $1-ийн утга
  );
  return result.rows;      // an array of objects / объектын массив
}
`),
    WALK("js",
      ["import pg from \"pg\";", "Load the library that knows how to talk to PostgreSQL.", "PostgreSQL-тэй харилцаж чаддаг санг ачаална."],
      ["const db = new pg.Pool({ … });", "Open a set of connections to the database. Its address is kept in a secret setting, not in the code.", "Өгөгдлийн сантай холболтуудыг нээнэ. Хаягийг кодонд биш, нууц тохиргоонд хадгалдаг."],
      ["async function getGrades(studentId) {", "A function that will have to wait for the database. `async` allows it to use `await`.", "Өгөгдлийн санг хүлээх шаардлагатай функц. `async` нь `await` ашиглах боломж олгоно."],
      ["await db.query(\"… WHERE e.student_id = $1\", [studentId])", "Send the SQL and wait for the answer. `$1` is a placeholder; the real value travels separately in the array.", "SQL-ийг илгээж, хариуг хүлээнэ. `$1` бол орлуулагч; жинхэнэ утга массив дотор тусдаа явна."],
      ["return result.rows;", "Hand back the rows as an array of objects.", "Мөрүүдийг объектын массив хэлбэрээр буцаана."]
    ),
    TIP("`await` means *wait here until the answer arrives*. The database usually runs on another computer, so the answer takes a moment.",
        "`await` нь *хариу ирэх хүртэл энд хүлээ* гэсэн үг. Өгөгдлийн сан ихэвчлэн өөр компьютер дээр ажилладаг тул хариу ирэхэд хором зарцуулна."),
    H("Rows become objects", "Мөрүүд объект болно"),
    P("`result.rows` is an array of objects, exactly like in the Objects lesson. From here it is ordinary JavaScript.",
      "`result.rows` бол объектын массив, яг «Объект» хичээлийнх шиг. Эндээс цааш энгийн JavaScript."),
    JS(`
// What result.rows looks like / result.rows ийм харагдана
const rows = [
  { title: "Programming", score: 95 },
  { title: "Databases",   score: 91 },
  { title: "English",     score: 88 }
];

for (const r of rows) {
  console.log(\`\${r.title}: \${r.score}\`);
}
const avg = rows.reduce((s, r) => s + r.score, 0) / rows.length;
console.log("Average / Дундаж:", avg.toFixed(1));
`),
    H("SQL injection", "SQL injection (SQL шургуулалт)"),
    P("Never glue user input straight into an SQL string. An attacker can type SQL instead of a name and change what your query does.",
      "Хэрэглэгчийн оруулсан утгыг SQL текст рүү хэзээ ч шууд бүү залга. Халдагч нэрийн оронд SQL бичиж, таны хүсэлтийн утгыг өөрчилж чадна."),
    JS(`
const userInput = "x' OR '1'='1";   // typed by an attacker / халдагчийн бичсэн
const sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
console.log(sql);
// The WHERE is now always true, so every user is returned!
// WHERE үргэлж true болсон тул бүх хэрэглэгч буцна!
`),
    DANGER("Use **parameters** (`$1`, `?`) as in the server code above. The database then treats the input as a plain value, never as SQL.",
           "Дээрх серверийн код шиг **параметр** (`$1`, `?`) ашигла. Ингэвэл өгөгдлийн сан оруулсан утгыг SQL биш, зүгээр утга гэж үзнэ."),
    CODE("js", `
// ✗ Dangerous / Аюултай
db.query("SELECT * FROM users WHERE name = '" + name + "'");

// ✓ Safe / Аюулгүй
db.query("SELECT * FROM users WHERE name = $1", [name]);
`),
    H("Adding data from code", "Кодоос өгөгдөл нэмэх"),
    P("Writing works the same way. Here a sign-up form saves a new student. Each value gets its own placeholder.",
      "Өгөгдөл бичих нь ижил зарчмаар ажилладаг. Энд бүртгэлийн маягт шинэ оюутныг хадгалж байна. Утга бүр өөрийн орлуулагчтай."),
    CODE("js", `
async function addStudent(name, city, age) {
  const result = await db.query(
    "INSERT INTO students (name, city, age) VALUES ($1, $2, $3) RETURNING id",
    [name, city, age]
  );
  return result.rows[0].id;   // the new student's id / шинэ оюутны id
}
`),
    P("`RETURNING id` asks PostgreSQL to send back the new row's ID, so the app can show a message such as *Welcome, student 11!*",
      "`RETURNING id` нь шинэ мөрийн ID-г буцааж өгөхийг PostgreSQL-ээс хүсдэг тул апп *Тавтай морил, 11-р оюутан!* гэх мэт мэдээлэл харуулж чадна."),
    H("What to learn next", "Цааш нь юу сурах вэ"),
    UL(
      ["Install PostgreSQL or SQLite on your computer and recreate the school database.", "Компьютер дээрээ PostgreSQL эсвэл SQLite суулгаад сургуулийн өгөгдлийн санг дахин үүсгэ."],
      ["Learn Node.js and Express to build a small API.", "Жижиг API бүтээхийн тулд Node.js, Express сур."],
      ["Practise SQL daily on [SQLBolt](https://sqlbolt.com) and [SQLZoo](https://sqlzoo.net).", "SQL-ийг [SQLBolt](https://sqlbolt.com), [SQLZoo](https://sqlzoo.net) дээр өдөр бүр дадлагажуул."],
      ["Read the [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) and the [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html).", "[MDN JavaScript гарын авлага](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), [PostgreSQL сургалт](https://www.postgresql.org/docs/current/tutorial.html)-ыг унш."],
      ["Later, try an ORM such as Prisma, but only after you are comfortable with plain SQL.", "Дараа нь Prisma зэрэг ORM туршаарай, гэхдээ энгийн SQL-д сайн дадсаны дараа."]
    ),
    RECAP(
      ["The browser talks to a server, and only the server talks to the database.", "Хөтөч сервертэй, зөвхөн сервер өгөгдлийн сантай харилцдаг."],
      ["The server runs SQL and turns the rows into JavaScript objects (JSON).", "Сервер SQL ажиллуулж, мөрүүдийг JavaScript объект (JSON) болгоно."],
      ["`await` waits for the database to answer.", "`await` өгөгдлийн сангийн хариуг хүлээнэ."],
      ["Never glue user input into SQL. Use parameters such as `$1` or `?`.", "Хэрэглэгчийн оруулсан утгыг SQL рүү хэзээ ч бүү залга. `$1`, `?` зэрэг параметр ашигла."],
      ["You now know both halves: JavaScript for the logic, SQL for the data.", "Та одоо хоёр талыг хоёуланг нь мэддэг боллоо: логикт JavaScript, өгөгдөлд SQL."]
    )
  ],
  exercise: {
    task: ["Write the query that «Show my grades» runs for the student with `id = 2`: each course `title` and the `score`.",
           "`id = 2` оюутны хувьд «Дүнгээ харах» ажиллуулах хүсэлтийг бич: хичээл бүрийн `title`, `score`."],
    start: `SELECT c.title, e.score
FROM enrollments AS e
`,
    solution: `SELECT c.title, e.score FROM enrollments AS e JOIN courses AS c ON c.id = e.course_id WHERE e.student_id = 2;`,
    hint: ["`JOIN courses AS c ON c.id = e.course_id WHERE e.student_id = 2`", "`JOIN courses AS c ON c.id = e.course_id WHERE e.student_id = 2`"]
  },
  quiz: [
    { q: ["What prevents SQL injection?", "SQL injection-оос юу сэргийлдэг вэ?"],
      opts: [["Query parameters like `$1` or `?`", "`$1`, `?` зэрэг хүсэлтийн параметр"], ["Longer passwords", "Урт нууц үг"], ["Writing SQL in lowercase", "SQL-ийг жижиг үсгээр бичих"]],
      a: 0, why: ["Parameters keep data separate from SQL code.", "Параметр өгөгдлийг SQL кодоос тусад нь байлгадаг."] },
    { q: ["In Node.js, what is `result.rows`?", "Node.js-д `result.rows` юу вэ?"],
      opts: [["A string of SQL", "SQL текст"], ["An array of objects, one per row", "Мөр бүрт нэг объект бүхий массив"], ["A number", "Тоо"]],
      a: 1, why: ["Each row becomes an object whose keys are the column names.", "Мөр бүр баганын нэрийг түлхүүр болгосон объект болно."] },
    { q: ["Who talks to the database directly?", "Өгөгдлийн сантай хэн шууд харилцдаг вэ?"],
      opts: [["The user's browser", "Хэрэглэгчийн хөтөч"], ["Nobody", "Хэн ч үгүй"], ["The server program", "Сервер програм"]],
      a: 2, why: ["The server sits between the browser and the database.", "Сервер хөтөч, өгөгдлийн сангийн дунд байрладаг."] },
    { q: ["In `db.query(\"… WHERE id = $1\", [7])`, what is `$1`?", "`db.query(\"… WHERE id = $1\", [7])`-д `$1` юу вэ?"],
      opts: [["A placeholder that is safely filled with 7", "7-оор аюулгүйгээр бөглөгдөх орлуулагч"], ["The first row", "Эхний мөр"], ["An amount of money", "Мөнгөн дүн"]],
      a: 0, why: ["The value 7 is sent separately and replaces `$1` as plain data, never as SQL.", "7 гэсэн утга тусдаа илгээгдэж, `$1`-ийг SQL биш, энгийн өгөгдөл байдлаар орлоно."] }
  ]
});

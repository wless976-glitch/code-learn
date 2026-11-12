// Glossary and cheat sheet / Нэр томьёо ба товч лавлах

function G(cat, en, mn, dEn, dMn) { CG.glossary.push({ cat: cat, en: en, mn: mn, d: [dEn, dMn] }); }

G("code", "algorithm", "алгоритм", "A step-by-step plan for solving a problem.", "Асуудлыг шийдэх алхам алхмаар төлөвлөгөө.");
G("code", "program", "програм", "A list of instructions a computer runs.", "Компьютерийн гүйцэтгэх зааврын жагсаалт.");
G("code", "code", "код", "Text written in a programming language.", "Програмчлалын хэлээр бичсэн текст.");
G("code", "statement", "команд", "One instruction, usually ending with `;`.", "Нэг заавар, ихэвчлэн `;`-ээр төгсдөг.");
G("code", "comment", "тайлбар", "A note in code that the computer ignores: `// …`", "Компьютерийн үл тоомсорлодог кодын тэмдэглэл: `// …`");
G("code", "syntax", "синтакс (бичлэгийн дүрэм)", "The grammar rules of a programming language.", "Програмчлалын хэлний бичлэгийн дүрэм.");
G("code", "variable", "хувьсагч", "A named box that stores a value.", "Утга хадгалдаг нэртэй хайрцаг.");
G("code", "constant", "тогтмол", "A variable whose value cannot change (`const`).", "Утга нь өөрчлөгдөхгүй хувьсагч (`const`).");
G("code", "data type", "өгөгдлийн төрөл", "The kind of a value: number, string, boolean…", "Утгын төрөл: тоо, текст, логик утга…");
G("code", "string", "тэмдэгт мөр", "Text inside quotes: `\"Сайн уу\"`.", "Хашилт доторх текст: `\"Сайн уу\"`.");
G("code", "number", "тоо", "A whole or decimal number: `42`, `3.14`.", "Бүхэл эсвэл бутархай тоо: `42`, `3.14`.");
G("code", "boolean", "логик утга", "Either `true` or `false`.", "`true` (үнэн) эсвэл `false` (худал).");
G("code", "null / undefined", "null / undefined", "No value: empty on purpose / not given yet.", "Утгагүй: санаатайгаар хоосон / хараахан өгөөгүй.");
G("code", "operator", "үйлдэл (оператор)", "A symbol that does something: `+`, `===`, `&&`.", "Үйлдэл гүйцэтгэдэг тэмдэг: `+`, `===`, `&&`.");
G("code", "expression", "илэрхийлэл", "Code that produces a value: `2 + 3`.", "Утга гаргадаг код: `2 + 3`.");
G("code", "condition", "нөхцөл", "An expression that is true or false, used by `if`.", "`if`-ийн ашигладаг үнэн эсвэл худал илэрхийлэл.");
G("code", "loop", "давталт", "Code that repeats: `for`, `while`.", "Давтагддаг код: `for`, `while`.");
G("code", "iteration", "давталтын тойрог", "One round of a loop.", "Давталтын нэг тойрог.");
G("code", "infinite loop", "төгсгөлгүй давталт", "A loop whose condition never becomes false.", "Нөхцөл нь хэзээ ч false болдоггүй давталт.");
G("code", "function", "функц", "A named, reusable block of code.", "Дахин ашиглаж болох нэртэй кодын хэсэг.");
G("code", "parameter", "параметр", "An input name in a function definition.", "Функцийн тодорхойлолт дахь оролтын нэр.");
G("code", "argument", "аргумент", "The actual value passed when calling a function.", "Функцийг дуудахад дамжуулах бодит утга.");
G("code", "return value", "буцаах утга", "The result a function sends back with `return`.", "Функцийн `return`-оор буцаадаг үр дүн.");
G("code", "scope", "хүрээ (scope)", "The part of the code where a variable exists.", "Хувьсагчийн оршин байх кодын хэсэг.");
G("code", "array", "массив", "An ordered list of values: `[1, 2, 3]`.", "Дараалсан утгын жагсаалт: `[1, 2, 3]`.");
G("code", "index", "индекс", "The position of an item in an array, starting at 0.", "Массив дахь утгын байрлал, 0-ээс эхэлнэ.");
G("code", "object", "объект", "A group of key–value pairs: `{ name: \"Bat\" }`.", "Түлхүүр–утга хосуудын бүлэг: `{ name: \"Bat\" }`.");
G("code", "property (key)", "шинж чанар (түлхүүр)", "A named value inside an object.", "Объект доторх нэртэй утга.");
G("code", "method", "арга (метод)", "A function that belongs to a value: `arr.push()`.", "Утгад хамаарах функц: `arr.push()`.");
G("code", "bug", "алдаа (баг)", "A mistake in code that causes wrong behaviour.", "Буруу ажиллагаа үүсгэдэг кодын алдаа.");
G("code", "debugging", "алдаа засах", "Finding and fixing bugs.", "Алдааг олж засах.");
G("code", "console", "консол", "The place where `console.log` prints output.", "`console.log`-ийн гаралтыг хэвлэдэг газар.");
G("code", "JSON", "JSON", "A text format for data that looks like JS objects.", "JS объекттой төстэй өгөгдлийн текст формат.");
G("code", "tracing", "мөрдөх", "Following the values of variables line by line, often in a small table.", "Хувьсагчдын утгыг мөр мөрөөр, ихэвчлэн жижиг хүснэгтээр дагах.");
G("code", "truthy / falsy", "truthy / falsy", "Values that count as true or false in an `if`. Falsy: `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`.", "`if`-д true эсвэл false гэж тооцогдох утгууд. Falsy: `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`.");
G("code", "switch", "switch", "Chooses between many fixed values of one expression with `case`.", "Нэг илэрхийллийн олон тогтсон утгаас `case`-ээр сонгоно.");
G("code", "nested loop", "давталт доторх давталт", "A loop inside another loop; the inner one runs fully for each outer round.", "Өөр давталт доторх давталт; гаднах тойрог бүрт дотоод нь бүтэн ажиллана.");
G("code", "accumulator", "хуримтлуулагч", "A variable that collects a result across the rounds of a loop, such as a sum.", "Давталтын тойргуудын туршид нийлбэр мэт үр дүнг цуглуулдаг хувьсагч.");
G("code", "default parameter", "анхдагч параметр", "A value a parameter uses when no argument is given: `name = \"найз\"`.", "Аргумент өгөөгүй үед параметрийн ашиглах утга: `name = \"найз\"`.");
G("code", "NaN", "NaN (тоо биш)", "*Not a Number*: the result of a calculation that makes no sense.", "*Not a Number*: утгагүй тооцооны үр дүн.");
G("code", "logic error", "логик алдаа", "Code that runs without an error message but gives the wrong answer.", "Алдааны мэдээлэлгүй ажилладаг ч буруу хариу өгдөг код.");
G("code", "throw", "throw (алдаа шидэх)", "Stops the code with your own error, which `catch` can handle.", "Өөрийн алдаагаар кодыг зогсооно; `catch` үүнийг барьж чадна.");
G("code", "off-by-one error", "нэгээр зөрөх алдаа", "A loop or index that goes one step too far or stops one step too early.", "Нэг алхмаар хэтэрдэг эсвэл нэг алхмаар эрт зогсдог давталт, индекс.");
G("db", "database", "өгөгдлийн сан", "An organised, permanent collection of data.", "Зохион байгуулалттай, байнга хадгалагдах өгөгдлийн цуглуулга.");
G("db", "DBMS", "ӨСУС", "Software that manages databases: SQLite, PostgreSQL, MySQL.", "Өгөгдлийн санг удирддаг програм: SQLite, PostgreSQL, MySQL.");
G("db", "SQL", "SQL", "Structured Query Language: the language of relational databases.", "Бүтэцлэгдсэн хүсэлтийн хэл: холбоост өгөгдлийн сангийн хэл.");
G("db", "query", "хүсэлт (асуулга)", "A question or command written in SQL.", "SQL-ээр бичсэн асуулт эсвэл тушаал.");
G("db", "table", "хүснэгт", "A set of rows and columns about one kind of thing.", "Нэг төрлийн зүйлийн тухай мөр, баганын олонлог.");
G("db", "row (record)", "мөр (бичлэг)", "One item in a table, such as one student.", "Хүснэгт дэх нэг зүйл, жишээ нь нэг оюутан.");
G("db", "column (field)", "багана (талбар)", "One property that every row has, such as `name`.", "Мөр бүрт байдаг нэг шинж чанар, жишээ нь `name`.");
G("db", "schema", "схем (бүтэц)", "The design of a database: its tables, columns and links.", "Өгөгдлийн сангийн загвар: хүснэгт, багана, холбоос.");
G("db", "primary key", "үндсэн түлхүүр", "A column that uniquely identifies each row.", "Мөр бүрийг давтагдашгүйгээр таних багана.");
G("db", "foreign key", "гадаад түлхүүр", "A column that points to another table's primary key.", "Өөр хүснэгтийн үндсэн түлхүүрийг заадаг багана.");
G("db", "NULL", "NULL (хоосон утга)", "A missing or unknown value. Test it with `IS NULL`.", "Байхгүй эсвэл үл мэдэгдэх утга. `IS NULL`-оор шалгана.");
G("db", "constraint", "хязгаарлалт", "A rule for column values: `NOT NULL`, `UNIQUE`, `CHECK`.", "Баганын утгын дүрэм: `NOT NULL`, `UNIQUE`, `CHECK`.");
G("db", "join", "холболт (JOIN)", "Combining rows of two tables that match.", "Хоёр хүснэгтийн тохирох мөрүүдийг нэгтгэх.");
G("db", "aggregate function", "нэгтгэх функц", "A function over many rows: `COUNT`, `SUM`, `AVG`.", "Олон мөр дээр ажилладаг функц: `COUNT`, `SUM`, `AVG`.");
G("db", "relationship", "холбоос (хамаарал)", "How tables connect: one-to-many, many-to-many.", "Хүснэгтүүд хэрхэн холбогдох: нэг-олон, олон-олон.");
G("db", "junction table", "холбох хүснэгт", "A table that links two others in a many-to-many relationship.", "Олон-олон холбоонд хоёр хүснэгтийг холбодог хүснэгт.");
G("db", "normalization", "нормчлол", "Splitting data so that each fact is stored once.", "Баримт бүр нэг удаа хадгалагдахаар өгөгдлийг хуваах.");
G("db", "index (database)", "индекс (өгөгдлийн сан)", "A structure that makes searching a column faster.", "Баганаар хайхыг хурдасгадаг бүтэц.");
G("db", "transaction", "транзакц (гүйлгээ)", "A group of changes that succeed or fail together.", "Хамт амжилттай болох эсвэл хамт цуцлагдах өөрчлөлтүүдийн бүлэг.");
G("db", "CRUD", "CRUD", "Create, Read, Update, Delete: the four basic data actions.", "Үүсгэх, унших, шинэчлэх, устгах: өгөгдлийн дөрвөн үндсэн үйлдэл.");
G("db", "SQL injection", "SQL injection (шургуулалт)", "An attack that sneaks SQL into user input. Prevent it with parameters.", "Хэрэглэгчийн оролтоор SQL шургуулах халдлага. Параметрээр сэргийлнэ.");
G("db", "server", "сервер", "A program that answers requests and talks to the database.", "Хүсэлтэд хариулж, өгөгдлийн сантай харилцдаг програм.");
G("db", "alias", "товч нэр (alias)", "A short or new name given with `AS`: `students AS s`, `credits AS points`.", "`AS`-ээр өгөх товч эсвэл шинэ нэр: `students AS s`, `credits AS points`.");
G("db", "DISTINCT", "DISTINCT", "Keeps one copy of each different value in the result.", "Үр дүнд ялгаатай утга бүрээс нэг хувийг үлдээнэ.");
G("db", "pagination", "хуудаслалт", "Showing results page by page with `LIMIT` and `OFFSET`.", "`LIMIT`, `OFFSET`-оор үр дүнг хуудас хуудсаар харуулах.");
G("db", "cross join", "хөндлөн холболт", "Pairing every row of one table with every row of another; what a join without `ON` does.", "Нэг хүснэгтийн мөр бүрийг нөгөөгийн мөр бүртэй хослуулах; `ON`-гүй холболт ийм үр дүн өгдөг.");
G("db", "placeholder", "орлуулагч (параметр)", "A mark such as `$1` or `?` in SQL that is filled with a value safely.", "SQL дэх `$1`, `?` зэрэг тэмдэг; утгаар аюулгүйгээр бөглөгдөнө.");

function CHEAT(lang, en, mn, code) { CG.cheats.push({ lang: lang, title: [en, mn], code: code }); }

CHEAT("js", "Variables and types", "Хувьсагч ба төрөл", `
let count = 0;            // can change / өөрчлөгдөнө
const PI = 3.14;          // fixed / тогтмол
const name = "Saraa";     // string / текст
const ok = true;          // boolean / логик утга
typeof name;              // "string"
\`Hi, \${name}!\`;          // template string
`);
CHEAT("js", "Conditions", "Нөхцөл", `
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}
const label = age >= 18 ? "adult" : "child";
// ===  !==  >  <  >=  <=   &&  ||  !
`);
CHEAT("js", "Loops", "Давталт", `
for (let i = 0; i < 5; i++) { console.log(i); }

while (money > 0) { money -= 100; }

for (const item of list) { console.log(item); }
for (const key in obj)   { console.log(key, obj[key]); }
// break: stop / зогсоох   continue: skip / алгасах
`);
CHEAT("js", "Functions", "Функц", `
function add(a, b) {
  return a + b;
}
const add2 = (a, b) => a + b;   // arrow / сум функц

add(2, 3);   // 5
`);
CHEAT("js", "Arrays", "Массив", `
const arr = [10, 20, 30];
arr[0];          // 10  first / эхнийх
arr.length;      // 3
arr.push(40);    // add to end / төгсгөлд нэмэх
arr.pop();       // remove last / сүүлийнхийг хасах
arr.map(x => x * 2);            // [20, 40, 60]
arr.filter(x => x > 15);        // [20, 30]
arr.reduce((s, x) => s + x, 0); // 60
`);
CHEAT("js", "Objects and errors", "Объект ба алдаа", `
const user = { name: "Bat", age: 19 };
user.name;          // "Bat"
user.age = 20;      // change / өөрчлөх
user.city = "UB";   // add / нэмэх
Object.keys(user);  // ["name", "age", "city"]

try { risky(); } catch (e) { console.log(e.message); }
`);
CHEAT("sql", "Reading data", "Өгөгдөл унших", `
SELECT name, city
FROM students
WHERE age >= 19 AND city <> 'Khovd'
ORDER BY name ASC
LIMIT 10 OFFSET 0;

SELECT DISTINCT city FROM students;
SELECT name AS student FROM students;
`);
CHEAT("sql", "Filtering", "Шүүх", `
WHERE city = 'Darkhan'
WHERE gpa BETWEEN 3.0 AND 3.5
WHERE city IN ('Darkhan', 'Erdenet')
WHERE name LIKE 'B%'      -- starts with B / B-ээр эхэлсэн
WHERE gpa IS NULL         -- missing / утгагүй
WHERE NOT (age < 18)
`);
CHEAT("sql", "Grouping", "Бүлэглэх", `
SELECT city, COUNT(*) AS total, AVG(gpa) AS avg_gpa
FROM students
WHERE age >= 18
GROUP BY city
HAVING COUNT(*) >= 2
ORDER BY total DESC;
-- COUNT  SUM  AVG  MIN  MAX  ROUND(x, 1)
`);
CHEAT("sql", "Joining tables", "Хүснэгт холбох", `
SELECT s.name, c.title, e.score
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;

SELECT s.name, e.score
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id;
`);
CHEAT("sql", "Changing data", "Өгөгдөл өөрчлөх", `
INSERT INTO students (name, city, age) VALUES ('Khulan', 'Darkhan', 20);
UPDATE students SET age = 21 WHERE id = 11;   -- always WHERE! / үргэлж WHERE!
DELETE FROM students WHERE id = 11;           -- always WHERE! / үргэлж WHERE!

BEGIN;  ...  COMMIT;     -- save / хадгалах
BEGIN;  ...  ROLLBACK;   -- undo / буцаах
`);
CHEAT("sql", "Creating tables", "Хүснэгт үүсгэх", `
CREATE TABLE players (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  email   TEXT UNIQUE,
  age     INTEGER CHECK (age >= 0),
  team_id INTEGER REFERENCES teams(id),
  active  INTEGER DEFAULT 1
);
ALTER TABLE players ADD COLUMN phone TEXT;
CREATE INDEX idx_players_team ON players(team_id);
DROP TABLE players;
`);

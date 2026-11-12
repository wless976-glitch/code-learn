// Track 1: Programming with JavaScript / Програмчлал (JavaScript)
// Each lesson: title, lead, goals, body blocks, one exercise, a short quiz.

CG.lessons.push({
  id: "js-intro", track: "js",
  title: ["What is programming?", "Програмчлал гэж юу вэ?"],
  lead: ["Meet the idea of a program and run your first line of JavaScript.", "Програм гэж юу болохтой танилцаж, анхны JavaScript кодоо ажиллуулна."],
  goals: [
    ["Understand what a program is", "Програм гэж юу болохыг ойлгох"],
    ["Run your first line of JavaScript", "Анхны JavaScript кодоо ажиллуулах"],
    ["Print messages with `console.log()`", "`console.log()` ашиглан мэдээлэл хэвлэх"],
    ["Write comments in your code", "Кодондоо тайлбар бичих"]
  ],
  body: [
    H("A program is a list of instructions", "Програм бол зааврын жагсаалт"),
    P("A computer does exactly what it is told, one step at a time. A **program** is a list of those steps, written in a language the computer understands. Writing that list is called **programming**, or coding.",
      "Компьютер түүнд хэлсэн зүйлийг алхам алхмаар яг таг гүйцэтгэдэг. Эдгээр алхмыг компьютерийн ойлгох хэлээр бичсэн жагсаалтыг **програм** гэнэ. Ийм жагсаалт бичихийг **програмчлал** буюу кодчилол гэдэг."),
    P("Think of making milk tea: boil water, add tea, add milk, add a pinch of salt. The order matters, and every step must be clear. Code works the same way.",
      "Сүүтэй цай чанахыг бодоод үз: ус буцалгана, цай хийнэ, сүү нэмнэ, бага зэрэг давс хийнэ. Дараалал чухал, алхам бүр тодорхой байх ёстой. Код яг ийм зарчмаар ажилладаг."),
    IDEA("A computer is a very fast helper that takes every word literally. If the recipe says *add salt* but not how much, a person would guess. A computer cannot guess, so every instruction must be exact.",
         "Компьютер бол үг бүрийг яг шууд утгаар нь ойлгодог, маш хурдан туслах. Жорд *давс нэм* гээд хэр хэмжээг нь заагаагүй бол хүн тааж чадна. Компьютер тааж чаддаггүй тул заавар бүр тодорхой байх ёстой."),
    H("What happens when you press Run", "Ажиллуулах товч дарахад юу болдог вэ"),
    P("Code is only text until something reads it. Every web browser contains a **JavaScript engine**: a program that reads your code line by line and carries out each instruction.",
      "Кодыг ямар нэг зүйл уншиж эхлэх хүртэл энэ нь зүгээр л текст. Вэб хөтөч бүрт **JavaScript хөдөлгүүр** байдаг: таны кодыг мөр мөрөөр нь уншиж, заавар бүрийг гүйцэтгэдэг програм."),
    { t: "flow", items: [
      ["You write code in the editor", "Та засварлагчид код бичнэ"],
      ["You press Run", "Ажиллуулах товч дарна"],
      ["The JavaScript engine reads it from top to bottom", "JavaScript хөдөлгүүр кодыг дээрээс доош уншина"],
      ["Each instruction is carried out", "Заавар бүрийг гүйцэтгэнэ"],
      ["Results appear in the output", "Үр дүн гаралтад харагдана"]
    ] },
    H("Why start with JavaScript?", "Яагаад JavaScript-ээс эхлэх вэ?"),
    UL(
      ["It runs in every web browser, so you need nothing to install.", "Бүх вэб хөтөч дээр ажилладаг тул юу ч суулгах шаардлагагүй."],
      ["It powers almost every website: buttons, forms, menus and animations.", "Бараг бүх вэб сайтын товч, маягт, цэс, хөдөлгөөнийг удирддаг."],
      ["The same ideas (variables, loops, functions) exist in Python, Java, C# and other languages.", "Хувьсагч, давталт, функц гэх мэт ойлголтууд Python, Java, C# зэрэг бусад хэлэнд ч адилхан байдаг."]
    ),
    H("Your first program", "Таны анхны програм"),
    P("`console.log()` prints a value to the output. Press **Run** (or Ctrl + Enter) to execute the code below. Then change the text and run it again.",
      "`console.log()` нь утгыг гаралт руу хэвлэдэг. Доорх кодыг ажиллуулахын тулд **Ажиллуулах** товч (эсвэл Ctrl + Enter) дар. Дараа нь текстийг өөрчлөөд дахин ажиллуул."),
    JS(`
// This line prints a greeting
// Энэ мөр мэндчилгээ хэвлэнэ
console.log("Hello, world!");
console.log("Сайн уу, дэлхий!");
console.log(2 + 3);
`),
    TIP("Text must be inside quotes: `\"like this\"`. Numbers do not need quotes. `2 + 3` is calculated, so the output is `5`.",
        "Текстийг заавал хашилтад бичнэ: `\"ийм\"`. Тоонд хашилт хэрэггүй. `2 + 3`-ыг тооцоолдог тул гаралт нь `5` болно."),
    WALK("js",
      ["// This line prints a greeting", "A **comment**: a note for people. The computer skips it.", "**Тайлбар**: хүнд зориулсан тэмдэглэл. Компьютер үүнийг алгасна."],
      ["console.log(\"Hello, world!\");", "`console` is the output area and `.log` means *write a line*. The text inside the quotes is written exactly as it is.", "`console` бол гаралтын хэсэг, `.log` нь *мөр бичих* гэсэн утгатай. Хашилт доторх текст яг байгаагаараа бичигдэнэ."],
      ["console.log(2 + 3);", "No quotes, so JavaScript **calculates** `2 + 3` first and then prints the answer, `5`.", "Хашилт байхгүй тул JavaScript эхлээд `2 + 3`-ыг **тооцоолоод**, хариуг нь буюу `5`-ыг хэвлэнэ."],
      ["console.log(\"2 + 3\");", "With quotes it is only text, so it prints `2 + 3` without calculating.", "Хашилттай бол зүгээр текст тул тооцоолохгүйгээр `2 + 3` гэж хэвлэнэ."]
    ),
    H("Printing several values", "Хэд хэдэн утгыг зэрэг хэвлэх"),
    P("Separate values with commas and `console.log` prints them on one line, with a space between them. This is handy for putting a label next to a result.",
      "Утгуудыг таслалаар тусгаарлавал `console.log` тэдгээрийг нэг мөрөнд, хооронд нь зай авч хэвлэнэ. Үр дүнгийн хажууд тайлбар бичихэд тохиромжтой."),
    JS(`
console.log("Days in a year / Жилд хоног:", 365);
console.log("Hours in a week / 7 хоногт цаг:", 7 * 24);
console.log("Minutes in a day / Хоногт минут:", 24 * 60);
`),
    TRY("Print your name on one line and your age on the next. Then find roughly how many days you have lived: write your age instead of 18 in `console.log(18 * 365)`.",
        "Эхний мөрөнд нэрээ, дараагийн мөрөнд насаа хэвлэ. Дараа нь хэдэн өдөр амьдарснаа ойролцоогоор ол: `console.log(18 * 365)`-ийн 18-ын оронд өөрийн насаа бич."),
    H("Comments", "Тайлбар (comment)"),
    P("Lines that start with `//` are **comments**. The computer ignores them. They are notes for the people who read your code. Every example in this course has comments in English and Mongolian.",
      "`//`-ээр эхэлсэн мөрийг **тайлбар** (comment) гэнэ. Компьютер үүнийг үл тоомсорлодог. Энэ нь кодыг уншиж буй хүнд зориулсан тэмдэглэл юм. Энэ сургалтын жишээ бүрт англи, монгол тайлбар бий."),
    CODE("js", `
// A one-line comment / Нэг мөрийн тайлбар

/* A comment that spans
   several lines / Олон мөрийн тайлбар */
`),
    H("Statements run from top to bottom", "Командууд дээрээс доош ажиллана"),
    P("Each instruction is called a **statement**. We end a statement with a semicolon `;`. The computer runs the statements in order, from the first line to the last.",
      "Заавар бүрийг **команд** (statement) гэнэ. Командын төгсгөлд цэгтэй таслал `;` тавина. Компьютер командуудыг эхний мөрөөс сүүлийн мөр хүртэл дарааллаар нь гүйцэтгэнэ."),
    JS(`
console.log("1. Wake up / Сэрэх");
console.log("2. Drink tea / Цай уух");
console.log("3. Learn to code / Код сурах");
`),
    P("Change the order of the three lines and run again. The output follows the new order, because the computer simply goes from the first line to the last.",
      "Гурван мөрийн дарааллыг солиод дахин ажиллуул. Компьютер эхний мөрөөс сүүлийн мөр хүртэл явдаг тул гаралт шинэ дарааллыг дагана."),
    H("Common first mistakes", "Эхлэгчдийн түгээмэл алдаа"),
    FIX("js",
      `console.log(Hello);`,
      `console.log("Hello");`,
      "Without quotes, JavaScript thinks `Hello` is the name of something you created earlier and stops with *ReferenceError: Hello is not defined*. Text always needs quotes.",
      "Хашилтгүй бол JavaScript `Hello`-г таны өмнө нь үүсгэсэн зүйлийн нэр гэж ойлгоод *ReferenceError: Hello is not defined* алдаа өгч зогсоно. Текстэд үргэлж хашилт хэрэгтэй."),
    FIX("js",
      `console.log("Hello";`,
      `console.log("Hello");`,
      "Every opening bracket `(` needs a closing `)`. A missing bracket gives a *SyntaxError*. When code looks right but will not run, count the brackets and quotes.",
      "Нээсэн хаалт `(` бүр хаах `)` хаалттай байх ёстой. Хаалт дутуу бол *SyntaxError* гарна. Код зөв харагдаж байгаа ч ажиллахгүй байвал хаалт, хашилтаа тоолоорой."),
    RECAP(
      ["A program is a list of instructions. They run in order, from top to bottom.", "Програм бол зааврын жагсаалт. Заавар дээрээс доош дарааллаар ажиллана."],
      ["`console.log(…)` shows a value in the output. Commas print several values on one line.", "`console.log(…)` утгыг гаралтад харуулна. Таслалаар хэд хэдэн утгыг нэг мөрөнд хэвлэнэ."],
      ["Text goes inside quotes. Numbers and calculations do not.", "Текстийг хашилтад бичнэ. Тоо, тооцоонд хашилт хэрэггүй."],
      ["`//` starts a comment. The computer ignores it.", "`//`-ээр тайлбар эхэлнэ. Компьютер үүнийг үл тоомсорлоно."],
      ["Error messages are clues. Read the message, fix one thing, run again.", "Алдааны мэдээлэл бол сэжүүр. Уншаад, нэг зүйлийг засаад, дахин ажиллуул."]
    )
  ],
  exercise: {
    task: ["Print exactly two lines: first `Hello, Mongolia!`, then the result of `7 * 6`.",
           "Яг хоёр мөр хэвлэ: эхлээд `Hello, Mongolia!`, дараа нь `7 * 6`-ийн хариу."],
    start: `// Write your code here / Кодоо энд бич
`,
    expect: "Hello, Mongolia!\n42",
    hint: ["Use `console.log()` twice. Put the text in quotes, but not the math.", "`console.log()`-ийг хоёр удаа ашигла. Текстийг хашилтад бич, харин тооцоог хашилтгүй бич."],
    solution: `console.log("Hello, Mongolia!");
console.log(7 * 6);`
  },
  quiz: [
    { q: ["What does `console.log()` do?", "`console.log()` юу хийдэг вэ?"],
      opts: [["Prints a value to the output", "Утгыг гаралт руу хэвлэнэ"], ["Deletes the code", "Кодыг устгана"], ["Opens a website", "Вэб сайт нээнэ"]],
      a: 0, why: ["It shows values so you can see what your program is doing.", "Програм юу хийж байгааг харахын тулд утгуудыг харуулдаг."] },
    { q: ["Which line is a comment?", "Аль мөр нь тайлбар вэ?"],
      opts: [["`console.log(\"hi\")`", "`console.log(\"hi\")`"], ["`// say hi`", "`// say hi`"], ["`\"hi\"`", "`\"hi\"`"]],
      a: 1, why: ["Comments start with `//` and are ignored by the computer.", "Тайлбар `//`-ээр эхэлдэг бөгөөд компьютер үүнийг үл тоомсорлодог."] },
    { q: ["In what order does code run?", "Код ямар дарааллаар ажилладаг вэ?"],
      opts: [["Bottom to top", "Доороос дээш"], ["Random order", "Санамсаргүй"], ["Top to bottom", "Дээрээс доош"]],
      a: 2, why: ["Statements run one after another, from the first line down.", "Командууд эхний мөрөөс доош нэг нэгээр ажиллана."] },
    { q: ["What does `console.log(\"4 * 2\")` print?", "`console.log(\"4 * 2\")` юу хэвлэх вэ?"],
      opts: [["`8`", "`8`"], ["`4 * 2`", "`4 * 2`"], ["An error", "Алдаа"]],
      a: 1, why: ["It is inside quotes, so it is text and is not calculated.", "Хашилт дотор байгаа тул текст бөгөөд тооцоологдохгүй."] }
  ]
});

CG.lessons.push({
  id: "js-variables", track: "js",
  title: ["Variables", "Хувьсагч"],
  lead: ["Store values in named boxes and use them again later.", "Утгыг нэртэй хайрцагт хадгалж, дараа нь дахин ашиглана."],
  goals: [
    ["Create variables with `let` and `const`", "`let`, `const` ашиглан хувьсагч үүсгэх"],
    ["Change the value of a variable", "Хувьсагчийн утгыг өөрчлөх"],
    ["Follow the naming rules", "Нэрлэх дүрмийг мөрдөх"]
  ],
  body: [
    H("A box with a name", "Нэртэй хайрцаг"),
    P("A **variable** is a named box that stores a value. You put a value in once, then use the name whenever you need that value.",
      "**Хувьсагч** бол утга хадгалдаг нэртэй хайрцаг. Утгыг нэг удаа хийгээд, хэрэгтэй болгондоо нэрээр нь дуудаж ашиглана."),
    IDEA("Think of labelled jars in a kitchen: *salt*, *sugar*, *tea*. The label is the variable's name and what is inside is its value. You find a jar by its label, and you can empty it and fill it with something new.",
         "Гал тогооны шошготой савнуудыг бодоод үз: *давс*, *элсэн чихэр*, *цай*. Шошго нь хувьсагчийн нэр, доторх зүйл нь утга. Савыг шошгоор нь олно, хоослоод шинэ зүйл хийж ч болно."),
    JS(`
let city = "Ulaanbaatar";   // create a variable / хувьсагч үүсгэх
let year = 2026;

console.log(city);
console.log(year);
console.log(city, year);    // print both / хоёуланг нь хэвлэх
`),
    P("The `=` sign here does not mean *equal*. It means **put the value on the right into the box on the left**.",
      "Энд байгаа `=` тэмдэг *тэнцүү* гэсэн утгагүй. **Баруун талын утгыг зүүн талын хайрцагт хийх** гэсэн үг."),
    H("let and const", "let ба const"),
    TABLE([["Keyword", "Түлхүүр үг"], ["Can it change?", "Өөрчилж болох уу?"], ["Use it when", "Хэзээ хэрэглэх"]],
      ["`let`", ["Yes", "Тийм"], ["the value will change: a score, a counter", "утга өөрчлөгдөх үед: оноо, тоолуур"]],
      ["`const`", ["No", "Үгүй"], ["the value stays fixed: a birth year, a tax rate", "утга тогтмол үед: төрсөн он, татварын хувь"]]
    ),
    JS(`
let score = 10;
score = score + 5;      // let can change / let өөрчлөгдөнө
console.log(score);     // 15

const pi = 3.14;
// pi = 3;   ← error! const cannot change
//           ← алдаа! const өөрчлөгдөхгүй
console.log(pi);
`),
    TIP("Use `const` by default. Switch to `let` only when the value really must change. You may see `var` in old code; avoid it in new code.",
        "Үндсэндээ `const` хэрэглэ. Утга заавал өөрчлөгдөх ёстой үед л `let` руу шилж. Хуучин кодонд `var` гэж харагдаж болно, шинэ кодонд бүү хэрэглэ."),
    H("Naming rules", "Нэрлэх дүрэм"),
    UL(
      ["Use letters, digits, `_` and `$`. A name cannot start with a digit.", "Үсэг, цифр, `_`, `$` ашиглана. Нэр цифрээр эхэлж болохгүй."],
      ["No spaces. Join words with camelCase: `firstName`, `totalPrice`.", "Хоосон зай хэрэглэхгүй. Үгсийг camelCase-ээр нийлүүлнэ: `firstName`, `totalPrice`."],
      ["Capital letters matter: `age` and `Age` are two different names.", "Том, жижиг үсгийг ялгадаг: `age`, `Age` хоёр өөр нэр."],
      ["Choose clear names: `studentCount` says more than `x`.", "Ойлгомжтой нэр сонго: `studentCount` нь `x`-ээс илүү ихийг хэлнэ."],
      ["Keywords such as `let`, `if` and `for` cannot be names.", "`let`, `if`, `for` зэрэг түлхүүр үгийг нэр болгож болохгүй."]
    ),
    CODE("js", `
let firstName = "Saraa";   // ✓ good / зөв
let 2name = "Bat";         // ✗ starts with a digit / цифрээр эхэлсэн
let first name = "Bat";    // ✗ contains a space / зай орсон
let let = 5;               // ✗ keyword / түлхүүр үг
`),
    H("Using variables together", "Хувьсагчдыг хамт ашиглах"),
    JS(`
const price = 2500;   // one khuushuur, in tögrög / нэг хуушуурын үнэ, ₮
let count = 3;

let total = price * count;
console.log("Total / Нийт:", total, "₮");

count = 5;            // a friend joined / найз нэмэгдлээ
total = price * count;
console.log("Total / Нийт:", total, "₮");
`),
    WALK("js",
      ["const price = 2500;", "Create a box called `price` and put 2500 in it. It is a `const` because the price of one khuushuur does not change here.", "`price` нэртэй хайрцаг үүсгэж, 2500-г хийнэ. Энд нэг хуушуурын үнэ өөрчлөгдөхгүй тул `const`."],
      ["let count = 3;", "A `let`, because the number of khuushuur will change later.", "Хуушуурын тоо дараа нь өөрчлөгдөх тул `let`."],
      ["let total = price * count;", "JavaScript looks inside the boxes: 2500 × 3 = 7500. Then it stores 7500 in `total`.", "JavaScript хайрцгуудын дотор харна: 2500 × 3 = 7500. Дараа нь 7500-г `total`-д хадгална."],
      ["count = 5;", "No `let` this time, because the box already exists. The old value 3 is replaced by 5.", "Хайрцаг аль хэдийн байгаа тул энэ удаа `let` бичихгүй. Хуучин 3 утга 5-аар солигдоно."],
      ["total = price * count;", "`total` does not update by itself, so we calculate it again: 2500 × 5 = 12 500.", "`total` өөрөө шинэчлэгддэггүй тул дахин тооцоолно: 2500 × 5 = 12 500."]
    ),
    WARN("A variable remembers a **value**, not a formula. If you change `count` but do not calculate again, `total` still holds the old answer.",
         "Хувьсагч томьёо биш, **утга** санадаг. `count`-ийг өөрчлөөд дахин тооцоолохгүй бол `total` хуучин хариугаа хадгалсаар байна."),
    H("Following values step by step", "Утгыг алхам алхмаар мөрдөх"),
    P("When code confuses you, make a small table: one row for each line, one column for each variable. Programmers call this **tracing**.",
      "Код ойлгомжгүй санагдвал жижиг хүснэгт зур: мөр бүрт нэг мөр, хувьсагч бүрт нэг багана. Үүнийг програмистууд **мөрдөх** (tracing) гэдэг."),
    TABLE([["Line", "Мөр"], "`score`", ["What happened", "Юу болсон"]],
      ["`let score = 10;`", "10", ["a box is created with 10", "10-тай хайрцаг үүслээ"]],
      ["`score = score + 5;`", "15", ["read 10, add 5, store 15", "10-ыг уншиж, 5 нэмээд, 15-ыг хадгална"]],
      ["`score = score * 2;`", "30", ["read 15, double it, store 30", "15-ыг уншиж, 2 дахин өсгөөд, 30-ыг хадгална"]],
      ["`score = 0;`", "0", ["the old value is simply replaced", "хуучин утга зүгээр л солигдоно"]]
    ),
    JS(`
let score = 10;
score = score + 5;
score = score * 2;
console.log(score);   // 30
score = 0;
console.log(score);   // 0
`),
    H("A variable with no value yet", "Утгагүй хувьсагч"),
    P("You can create a `let` variable first and give it a value later. Until then it holds `undefined`. A `const` must get its value straight away.",
      "`let` хувьсагчийг эхлээд үүсгээд, утгыг нь дараа өгч болно. Тэр хүртэл түүнд `undefined` байна. Харин `const`-д утгыг тэр дор нь өгөх ёстой."),
    JS(`
let answer;
console.log(answer);   // undefined
answer = 42;
console.log(answer);   // 42
`),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("js",
      `let city = "Darkhan";
let city = "Erdenet";`,
      `let city = "Darkhan";
city = "Erdenet";`,
      "`let` *creates* a box, and a box can be created only once. To change it, write the name without `let`. Otherwise you get *SyntaxError: Identifier 'city' has already been declared*.",
      "`let` хайрцгийг *үүсгэдэг* бөгөөд хайрцгийг ганц л удаа үүсгэнэ. Өөрчлөхдөө нэрийг нь `let`-гүй бич. Үгүй бол *SyntaxError: Identifier 'city' has already been declared* алдаа гарна."),
    FIX("js",
      `const lives = 3;
lives = lives - 1;`,
      `let lives = 3;
lives = lives - 1;`,
      "A `const` cannot change: you get *TypeError: Assignment to constant variable*. If the value must change, create it with `let`.",
      "`const`-ийг өөрчилж болохгүй: *TypeError: Assignment to constant variable* алдаа гарна. Утга өөрчлөгдөх ёстой бол `let`-ээр үүсгэ."),
    TRY("Add a drink to the khuushuur example: create `const tea = 1000;` and include the tea in `total`.",
        "Хуушуурын жишээнд ундаа нэм: `const tea = 1000;` үүсгээд цайны үнийг `total`-д оруул."),
    RECAP(
      ["A variable is a named box that holds one value.", "Хувьсагч бол нэг утга хадгалдаг нэртэй хайрцаг."],
      ["Use `const` for values that stay the same and `let` for values that change.", "Өөрчлөгдөхгүй утгад `const`, өөрчлөгдөх утгад `let` хэрэглэнэ."],
      ["`=` puts a value into a box. It does not mean *equal*.", "`=` утгыг хайрцагт хийнэ. *Тэнцүү* гэсэн утгагүй."],
      ["Create a variable once; after that, change it without `let`.", "Хувьсагчийг нэг удаа үүсгэнэ; дараа нь `let`-гүйгээр өөрчилнө."],
      ["A variable keeps a value, not a formula. Recalculate when the inputs change.", "Хувьсагч томьёо биш, утга хадгална. Оролт өөрчлөгдвөл дахин тооцоол."],
      ["Choose clear camelCase names such as `totalPrice`.", "`totalPrice` шиг ойлгомжтой camelCase нэр сонго."]
    )
  ],
  exercise: {
    task: ["Create a constant `width` equal to 8 and a constant `height` equal to 5. Store their product in `area`, then print `area`.",
           "8-тай тэнцүү `width`, 5-тай тэнцүү `height` гэсэн тогтмол үүсгэ. Тэдгээрийн үржвэрийг `area`-д хадгалаад `area`-г хэвлэ."],
    start: `// Your code / Таны код
`,
    expect: "40",
    hint: ["Multiplication uses `*`. Then `console.log(area);`", "Үржвэрийг `*`-ээр бичнэ. Дараа нь `console.log(area);`"],
    solution: `const width = 8;
const height = 5;
const area = width * height;
console.log(area);`
  },
  quiz: [
    { q: ["Which keyword creates a variable whose value can change later?", "Аль түлхүүр үг дараа нь утга нь өөрчлөгдөж болох хувьсагч үүсгэдэг вэ?"],
      opts: [["`const`", "`const`"], ["`let`", "`let`"], ["`console`", "`console`"]],
      a: 1, why: ["`let` can be reassigned. `const` cannot.", "`let`-ийг дахин утга оноож болно. `const`-ийг болохгүй."] },
    { q: ["Which name is valid?", "Аль нэр нь зөв бэ?"],
      opts: [["`total price`", "`total price`"], ["`1total`", "`1total`"], ["`totalPrice`", "`totalPrice`"]],
      a: 2, why: ["No spaces and no leading digit. camelCase is the convention.", "Зай, эхэнд цифр байж болохгүй. camelCase бол нийтлэг хэв маяг."] },
    { q: ["What is printed? `let a = 5; a = a + 1; console.log(a);`", "Юу хэвлэгдэх вэ? `let a = 5; a = a + 1; console.log(a);`"],
      opts: [["`5`", "`5`"], ["`6`", "`6`"], ["`a + 1`", "`a + 1`"]],
      a: 1, why: ["`a + 1` is calculated (5 + 1) and stored back into `a`.", "`a + 1`-ийг (5 + 1) тооцоолоод `a`-д буцааж хадгална."] },
    { q: ["`let n = 2; n = n * 3; n = n + 1;` What is `n` now?", "`let n = 2; n = n * 3; n = n + 1;` Одоо `n` хэд вэ?"],
      opts: [["7", "7"], ["9", "9"], ["6", "6"]],
      a: 0, why: ["Trace it line by line: 2, then 2 × 3 = 6, then 6 + 1 = 7.", "Мөр мөрөөр мөрдөж үз: 2, дараа нь 2 × 3 = 6, дараа нь 6 + 1 = 7."] }
  ]
});

CG.lessons.push({
  id: "js-types", track: "js",
  title: ["Data types", "Өгөгдлийн төрөл"],
  lead: ["Numbers, text and true/false behave differently. Learn to tell them apart.", "Тоо, текст, үнэн/худал утгууд өөр өөрөөр ажилладаг. Тэдгээрийг ялгаж сур."],
  goals: [
    ["Recognise number, string, boolean, null and undefined", "number, string, boolean, null, undefined төрлийг таних"],
    ["Check a type with `typeof`", "`typeof`-оор төрлийг шалгах"],
    ["Build text with template strings", "Template string ашиглан текст үүсгэх"],
    ["Convert text to a number", "Текстийг тоо руу хөрвүүлэх"]
  ],
  body: [
    H("The main types", "Үндсэн төрлүүд"),
    TABLE([["Type", "Төрөл"], ["Example", "Жишээ"], ["Meaning", "Утга"]],
      ["number", "`42`, `3.14`, `-7`", ["Any number, whole or decimal", "Бүхэл эсвэл бутархай ямар ч тоо"]],
      ["string", "`\"Bat\"`, `'Хөвсгөл'`", ["Text inside quotes", "Хашилт доторх текст"]],
      ["boolean", "`true`, `false`", ["Yes or no", "Тийм эсвэл үгүй"]],
      ["undefined", "`undefined`", ["No value has been given yet", "Утга хараахан өгөөгүй"]],
      ["null", "`null`", ["Empty on purpose", "Санаатайгаар хоосон"]]
    ),
    JS(`
console.log(typeof 42);         // "number"
console.log(typeof "Сайн уу");  // "string"
console.log(typeof true);       // "boolean"

let x;                          // no value yet / утга өгөөгүй
console.log(x);                 // undefined
`),
    IDEA("Each type is a different kind of thing. A number is something you calculate with, like on a calculator. A string is a piece of text, like a name written on an envelope. A boolean is a light switch: only on (`true`) or off (`false`).",
         "Төрөл бүр өөр төрлийн зүйл. Тоо бол тооны машин дээрх шиг тооцоо хийдэг зүйл. String бол дугтуй дээр бичсэн нэр шиг текст. Boolean бол гэрлийн унтраалга: зөвхөн асаалттай (`true`) эсвэл унтраалттай (`false`)."),
    H("Strings", "Тэмдэгт мөр (string)"),
    P("A string is text. Wrap it in double quotes `\"…\"`, single quotes `'…'` or backticks. `.length` tells you how many characters it has.",
      "String буюу тэмдэгт мөр нь текст юм. Давхар хашилт `\"…\"`, дан хашилт `'…'` эсвэл backtick тэмдэгт дотор бичнэ. `.length` нь хэдэн тэмдэгттэйг хэлнэ."),
    JS(`
const name = "Temuulen";
console.log(name.length);          // 8
console.log(name.toUpperCase());   // TEMUULEN

// Template string: put values inside \${ }
// Template string: \${ } дотор утга оруулна
const age = 18;
console.log(\`\${name} is \${age} years old.\`);
console.log(\`\${name} \${age} настай.\`);
`),
    TIP("Template strings use the backtick key (top-left of most keyboards, under Esc). They let you mix text and values without `+`.",
        "Template string нь backtick товчийг ашигладаг (ихэнх гарын зүүн дээд буланд, Esc-ийн доор). `+` ашиглахгүйгээр текст, утгыг холих боломж олгодог."),
    H("Useful things you can do with text", "Тексттэй хийж болох хэрэгтэй үйлдлүүд"),
    TABLE([["Tool", "Хэрэгсэл"], ["What it does", "Юу хийдэг вэ"], ["Result for `\"Darkhan\"`", "`\"Darkhan\"`-д үр дүн"]],
      ["`.length`", ["number of characters", "тэмдэгтийн тоо"], "`7`"],
      ["`.toUpperCase()`", ["all capital letters", "бүгдийг том үсгээр"], "`\"DARKHAN\"`"],
      ["`.toLowerCase()`", ["all small letters", "бүгдийг жижиг үсгээр"], "`\"darkhan\"`"],
      ["`.includes(\"kh\")`", ["is this text inside it? true / false", "энэ текст дотор нь байна уу? true / false"], "`true`"],
      ["`.slice(0, 4)`", ["a piece: from position 0 up to, but not including, 4", "хэсэг: 0-р байрлалаас 4 хүртэл (4-ийг оруулахгүй)"], "`\"Dark\"`"],
      ["`.replace(\"D\", \"d\")`", ["swap the first match", "эхний тохирлыг солино"], "`\"darkhan\"`"],
      ["`.trim()`", ["remove spaces at both ends", "хоёр захын зайг арилгана"], "`\"  hi \"` → `\"hi\"`"]
    ),
    JS(`
const city = "  Ulaanbaatar  ";
const clean = city.trim();           // remove spaces / зайг арилгах
console.log(clean.length);           // 11
console.log(clean.toUpperCase());    // ULAANBAATAR
console.log(clean.slice(0, 4));      // Ulaa
console.log(clean.includes("baatar"));   // true
console.log(clean[0]);               // U: the first letter / эхний үсэг
`),
    P("Positions inside a string start at **0**, so `clean[0]` is the first letter. You will meet the same rule again in the Arrays lesson.",
      "Текст доторх байрлал **0**-ээс эхэлдэг тул `clean[0]` нь эхний үсэг. Энэ дүрэмтэй «Массив» хичээлд дахин тааралдана."),
    TIP("Text tools never change the original string. They give you a new one, so store the result: `const big = name.toUpperCase();`",
        "Текстийн хэрэгслүүд анхны текстийг хэзээ ч өөрчилдөггүй. Шинэ текст буцаадаг тул үр дүнг хадгал: `const big = name.toUpperCase();`"),
    H("Special characters", "Тусгай тэмдэгт"),
    P("Inside a string, a backslash `\\` starts a special character: `\\n` begins a new line, and `\\\"` puts a quote mark inside double quotes.",
      "Текст дотор налуу зураас `\\` тусгай тэмдэгтийг эхлүүлдэг: `\\n` шинэ мөр эхлүүлнэ, `\\\"` давхар хашилт дотор хашилтын тэмдэг оруулна."),
    JS(`
console.log("Line 1\\nLine 2");      // \\n = new line / шинэ мөр
console.log("She said \\"Сайн уу\\"");
console.log('It\\'s easy');
`),
    H("Numbers that surprise you", "Гайхмаар тоонууд"),
    P("Two results surprise beginners. `NaN` means *Not a Number*: you get it when a calculation makes no sense, such as `Number(\"abc\")`. And computers store decimals in binary, so `0.1 + 0.2` is not exactly `0.3`. Round with `toFixed()` when you show money or grades.",
      "Хоёр үр дүн эхлэгчдийг гайхшруулдаг. `NaN` нь *Not a Number*, өөрөөр хэлбэл «тоо биш» гэсэн үг: `Number(\"abc\")` шиг утгагүй тооцоо хийхэд гарна. Мөн компьютер бутархай тоог хоёртын хэлбэрээр хадгалдаг тул `0.1 + 0.2` яг `0.3` болдоггүй. Мөнгө, дүн харуулахдаа `toFixed()`-ээр бөөрөнхийл."),
    JS(`
console.log(Number("abc"));           // NaN
console.log("abc" * 2);               // NaN
console.log(0.1 + 0.2);               // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2));  // "0.30"
console.log(Number("12.5") + 1);      // 13.5
`),
    H("Numbers and text are different", "Тоо ба текст өөр"),
    P("`5` is a number, but `\"5\"` is a string. If you add a number to a string, JavaScript glues them together instead of adding.",
      "`5` бол тоо, харин `\"5\"` бол текст. Тоог текст дээр нэмбэл JavaScript нэмэхийн оронд тэдгээрийг залгаж нийлүүлдэг."),
    JS(`
console.log(5 + 5);            // 10
console.log("5" + 5);          // 55  glued / залгагдсан
console.log(Number("5") + 5);  // 10  converted / хөрвүүлсэн
console.log(String(2026));     // "2026" as text / текст болгосон
`),
    WARN("Values typed into a web form always arrive as strings. Convert them with `Number()` before you do any math.",
         "Вэб маягтад оруулсан утга үргэлж string хэлбэрээр ирдэг. Тооцоо хийхээсээ өмнө `Number()`-ээр хөрвүүл."),
    H("Booleans", "Логик утга (boolean)"),
    P("A boolean has only two values: `true` and `false`. You will use booleans to make decisions in the Conditions lesson.",
      "Boolean буюу логик утга нь зөвхөн `true` (үнэн), `false` (худал) гэсэн хоёр утгатай. Нөхцөлийн хичээлд шийдвэр гаргахад ашиглана."),
    JS(`
const isStudent = true;
const hasPaid = false;
console.log(isStudent, hasPaid);
console.log(10 > 3);   // comparisons give booleans / харьцуулалт boolean өгнө
`),
    H("Converting between types", "Төрөл хооронд хөрвүүлэх"),
    TABLE([["Code", "Код"], ["Result", "Үр дүн"], ["What it does", "Юу хийдэг вэ"]],
      ["`Number(\"42\")`", "`42`", ["text → number", "текст → тоо"]],
      ["`String(42)`", "`\"42\"`", ["number → text", "тоо → текст"]],
      ["`Boolean(0)`", "`false`", ["any value → true / false", "дурын утга → true / false"]],
      ["`parseInt(\"42px\")`", "`42`", ["reads the whole number at the start of a text", "текстийн эхэн дэх бүхэл тоог уншина"]]
    ),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("js",
      `const msg = 'It's cold today';`,
      `const msg = "It's cold today";`,
      "The apostrophe in *It's* closes the single-quoted string too early, so the rest is not valid code. When the text contains an apostrophe, use double quotes or backticks.",
      "*It's* доторх апостроф дан хашилттай текстийг эрт хаадаг тул үлдсэн хэсэг нь буруу код болно. Текст дотор апостроф байвал давхар хашилт эсвэл backtick ашигла."),
    FIX("js",
      `const a = "10";
const b = "5";
console.log(a + b);   // 105`,
      `const a = Number("10");
const b = Number("5");
console.log(a + b);   // 15`,
      "Numbers that arrive as text are glued together, not added. Convert them with `Number()` first.",
      "Текст хэлбэрээр ирсэн тоонууд нэмэгдэхгүй, залгагдана. Эхлээд `Number()`-ээр хөрвүүл."),
    RECAP(
      ["The main types are number, string and boolean, plus `undefined` and `null` for *no value*.", "Үндсэн төрлүүд нь number, string, boolean; *утгагүй* байдлыг `undefined`, `null` илэрхийлнэ."],
      ["`typeof` tells you the type of any value.", "`typeof` аливаа утгын төрлийг хэлж өгнө."],
      ["Strings have tools such as `.length`, `.toUpperCase()`, `.slice()` and `.includes()`. Positions start at 0.", "String-д `.length`, `.toUpperCase()`, `.slice()`, `.includes()` зэрэг хэрэгсэл бий. Байрлал 0-ээс эхэлнэ."],
      ["Template strings use backticks and `${ }` to put values into text.", "Template string нь backtick болон `${ }` ашиглан текст дотор утга оруулдаг."],
      ["`\"5\" + 5` gives `\"55\"`. Convert text with `Number()` before doing maths.", "`\"5\" + 5` нь `\"55\"` болно. Тооцоо хийхээс өмнө текстийг `Number()`-ээр хөрвүүл."],
      ["`NaN` means the result is not a number. Round decimals with `toFixed()`.", "`NaN` нь үр дүн тоо биш гэсэн үг. Бутархайг `toFixed()`-ээр бөөрөнхийл."]
    )
  ],
  exercise: {
    task: ["Create `firstName` with the value `\"Nomin\"` and `subject` with the value `\"SQL\"`. Use a template string to print: `Nomin is learning SQL`",
           "`\"Nomin\"` утгатай `firstName`, `\"SQL\"` утгатай `subject` үүсгэ. Template string ашиглан дараахыг хэвлэ: `Nomin is learning SQL`"],
    start: `const firstName = "Nomin";
// create subject, then print / subject үүсгээд хэвлэ
`,
    expect: "Nomin is learning SQL",
    hint: ["Inside backticks, write `\${firstName}` where the name should go.", "Backtick дотор нэр орох газарт `\${firstName}` гэж бич."],
    solution: `const firstName = "Nomin";
const subject = "SQL";
console.log(\`\${firstName} is learning \${subject}\`);`
  },
  quiz: [
    { q: ["What is `typeof \"hello\"`?", "`typeof \"hello\"` юу вэ?"],
      opts: [["`\"string\"`", "`\"string\"`"], ["`\"number\"`", "`\"number\"`"], ["`\"text\"`", "`\"text\"`"]],
      a: 0, why: ["Anything in quotes is a string.", "Хашилт доторх бүх зүйл string байна."] },
    { q: ["What does `\"3\" + 4` give?", "`\"3\" + 4` юу гарах вэ?"],
      opts: [["`7`", "`7`"], ["`\"34\"`", "`\"34\"`"], ["An error", "Алдаа"]],
      a: 1, why: ["One side is a string, so `+` joins the text.", "Нэг тал нь string учир `+` текстийг залгана."] },
    { q: ["Which value is a boolean?", "Аль утга нь boolean вэ?"],
      opts: [["`\"false\"`", "`\"false\"`"], ["`0`", "`0`"], ["`false`", "`false`"]],
      a: 2, why: ["`false` without quotes is a boolean. With quotes it is just text.", "Хашилтгүй `false` нь boolean. Хашилттай бол зүгээр текст."] },
    { q: ["What is `\"Mongolia\".length`?", "`\"Mongolia\".length` хэд вэ?"],
      opts: [["7", "7"], ["8", "8"], ["9", "9"]],
      a: 1, why: ["Count the characters: M-o-n-g-o-l-i-a makes 8.", "Тэмдэгтүүдийг тоол: M-o-n-g-o-l-i-a нийт 8."] }
  ]
});

CG.lessons.push({
  id: "js-operators", track: "js",
  title: ["Operators", "Үйлдлүүд (operators)"],
  lead: ["Do math, compare values and combine true/false answers.", "Тооцоо хийж, утгуудыг харьцуулж, үнэн/худал хариултуудыг нэгтгэнэ."],
  goals: [
    ["Use arithmetic operators, including `%`", "`%` зэрэг арифметик үйлдлийг ашиглах"],
    ["Compare values with `===`, `>`, `<`", "`===`, `>`, `<`-ээр утга харьцуулах"],
    ["Combine conditions with `&&`, `||`, `!`", "`&&`, `||`, `!`-ээр нөхцөл нэгтгэх"]
  ],
  body: [
    H("Arithmetic", "Арифметик үйлдэл"),
    TABLE([["Operator", "Үйлдэл"], ["Meaning", "Утга"], ["Example", "Жишээ"]],
      ["`+`", ["add", "нэмэх"], "`10 + 3` → `13`"],
      ["`-`", ["subtract", "хасах"], "`10 - 3` → `7`"],
      ["`*`", ["multiply", "үржих"], "`10 * 3` → `30`"],
      ["`/`", ["divide", "хуваах"], "`10 / 4` → `2.5`"],
      ["`%`", ["remainder after division", "хуваалтын үлдэгдэл"], "`10 % 3` → `1`"],
      ["`**`", ["power", "зэрэг"], "`2 ** 3` → `8`"]
    ),
    JS(`
console.log(10 + 3);   // 13
console.log(10 / 4);   // 2.5
console.log(10 % 3);   // 1   remainder / үлдэгдэл
console.log(2 ** 10);  // 1024

// Round down to a whole number / Доош нь бүхэлчлэх
console.log(Math.floor(10 / 3));  // 3
console.log(Math.round(2.6));     // 3  nearest / ойрын бүхэл
`),
    P("Shortcuts: `x += 5` means `x = x + 5`, and `x++` adds 1.",
      "Товчлол: `x += 5` нь `x = x + 5` гэсэн үг, `x++` нь 1-ээр нэмэгдүүлнэ."),
    JS(`
let steps = 0;
steps += 10;   // same as steps = steps + 10
steps++;       // add 1 / 1-ээр нэмэх
console.log(steps);   // 11
`),
    H("Order of operations", "Үйлдлийн дараалал"),
    P("JavaScript follows the same rules as maths at school: brackets first, then `**`, then `*` `/` `%`, and finally `+` `-`. Operations of the same level run from left to right. When in doubt, add brackets: they make your meaning clear.",
      "JavaScript сургуулийн математикийн дүрмийг баримталдаг: эхлээд хаалт, дараа нь `**`, дараа нь `*` `/` `%`, хамгийн сүүлд `+` `-`. Ижил түвшний үйлдлүүд зүүнээс баруун тийш хийгдэнэ. Эргэлзвэл хаалт нэм: санааг тань тодорхой болгоно."),
    JS(`
console.log(2 + 3 * 4);     // 14: 3 * 4 first / эхлээд 3 * 4
console.log((2 + 3) * 4);   // 20: brackets first / эхлээд хаалт
console.log(10 - 4 - 3);    // 3: left to right / зүүнээс баруун
console.log(2 * 3 ** 2);    // 18: power first / эхлээд зэрэг
`),
    FIX("js",
      `const a = 70;
const b = 90;
const average = a + b / 2;     // 115`,
      `const a = 70;
const b = 90;
const average = (a + b) / 2;   // 80`,
      "Division happens before addition, so the first version calculates `70 + 45`. Put the sum in brackets.",
      "Хуваах үйлдэл нэмэхээс өмнө хийгддэг тул эхний хувилбар `70 + 45`-ыг бодно. Нийлбэрийг хаалтад хий."),
    H("Where % is useful", "% хаана хэрэгтэй вэ"),
    P("The remainder operator looks strange at first, but it solves many everyday problems: is a number even, what is left after sharing, and how many hours and minutes a film lasts.",
      "Үлдэгдлийн үйлдэл эхэндээ хачин харагддаг ч өдөр тутмын олон асуудлыг шийддэг: тоо тэгш үү, хуваасны дараа хэд үлдэх вэ, кино хэдэн цаг хэдэн минут үргэлжлэх вэ."),
    JS(`
const minutes = 135;   // a film / кино
const hours = Math.floor(minutes / 60);
const rest = minutes % 60;
console.log(hours, "h", rest, "min");      // 2 h 15 min
console.log(hours, "цаг", rest, "минут");
`),
    WALK("js",
      ["const minutes = 135;", "The film lasts 135 minutes.", "Кино 135 минут үргэлжилнэ."],
      ["Math.floor(minutes / 60)", "135 / 60 = 2.25. `Math.floor` drops the part after the point, so we get 2 whole hours.", "135 / 60 = 2.25. `Math.floor` таслалаас хойших хэсгийг хаядаг тул 2 бүтэн цаг гарна."],
      ["minutes % 60", "What is left after taking out the whole hours: 135 − 2 × 60 = 15 minutes.", "Бүтэн цагуудыг хассаны дараа үлдэх нь: 135 − 2 × 60 = 15 минут."]
    ),
    H("Comparison", "Харьцуулалт"),
    P("A comparison answers a yes/no question, so the result is always `true` or `false`.",
      "Харьцуулалт тийм/үгүй асуултад хариулдаг тул үр дүн нь үргэлж `true` эсвэл `false` байна."),
    TABLE([["Operator", "Үйлдэл"], ["Meaning", "Утга"]],
      ["`===`", ["equal (same value and same type)", "тэнцүү (утга, төрөл хоёулаа ижил)"]],
      ["`!==`", ["not equal", "тэнцүү биш"]],
      ["`>`  `<`", ["greater than, less than", "их, бага"]],
      ["`>=`  `<=`", ["greater or equal, less or equal", "их буюу тэнцүү, бага буюу тэнцүү"]]
    ),
    JS(`
console.log(7 > 3);       // true
console.log(7 === 7);     // true
console.log(7 === "7");   // false: number vs string / тоо ба текст
console.log(7 !== 3);     // true
`),
    WARN("Do not mix up `=` and `===`. One `=` stores a value. Three `===` compare two values. Avoid the older `==`: it converts types silently, so `0 == \"\"` is `true`.",
         "`=` ба `===`-ийг бүү андуур. Нэг `=` утга хадгална. Гурван `===` хоёр утгыг харьцуулна. Хуучин `==`-ээс зайлсхий: төрлийг далдуур хөрвүүлдэг тул `0 == \"\"` нь `true` болдог."),
    H("Logical operators", "Логик үйлдэл"),
    TABLE([["Operator", "Үйлдэл"], ["Name", "Нэр"], ["True when…", "Хэзээ true вэ…"]],
      ["`&&`", ["AND", "БА"], ["both sides are true", "хоёр тал хоёулаа true"]],
      ["`||`", ["OR", "ЭСВЭЛ"], ["at least one side is true", "дор хаяж нэг тал нь true"]],
      ["`!`", ["NOT", "ҮГҮЙСГЭЛ"], ["it flips true and false", "true-г false, false-г true болгоно"]]
    ),
    JS(`
const age = 20;
const hasTicket = true;

console.log(age >= 18 && hasTicket);  // true: both / хоёулаа
console.log(age < 12 || hasTicket);   // true: one is enough / нэг нь хангалттай
console.log(!hasTicket);              // false: flipped / эсрэгээр
`),
    P("This table lists every possible case. `&&` is true only in the first row, and `||` is false only in the last row.",
      "Энэ хүснэгтэд бүх боломжит тохиолдол бий. `&&` зөвхөн эхний мөрөнд true, `||` зөвхөн сүүлийн мөрөнд false байна."),
    TABLE(["`a`", "`b`", "`a && b`", "`a || b`"],
      ["`true`", "`true`", "`true`", "`true`"],
      ["`true`", "`false`", "`false`", "`true`"],
      ["`false`", "`true`", "`false`", "`true`"],
      ["`false`", "`false`", "`false`", "`false`"]
    ),
    TRY("In the ticket example, change `age` to `10` and `hasTicket` to `false`. Say each answer out loud before you press Run, then check yourself.",
        "Тасалбарын жишээнд `age`-ийг `10`, `hasTicket`-ийг `false` болго. Ажиллуулах товч дарахаасаа өмнө хариу бүрийг таамаглаад, дараа нь өөрийгөө шалга."),
    RECAP(
      ["`+ - * / % **` do maths. `%` gives the remainder after division.", "`+ - * / % **` тооцоо хийнэ. `%` хуваалтын үлдэгдлийг өгнө."],
      ["Brackets first, then `**`, then `* / %`, then `+ -`. Add brackets when you are unsure.", "Эхлээд хаалт, дараа нь `**`, дараа нь `* / %`, эцэст нь `+ -`. Эргэлзвэл хаалт нэм."],
      ["`x += 5` and `x++` are shortcuts for changing a variable.", "`x += 5`, `x++` нь хувьсагчийг өөрчлөх товчлол."],
      ["Comparisons (`===`, `!==`, `>`, `<`, `>=`, `<=`) always give `true` or `false`.", "Харьцуулалт (`===`, `!==`, `>`, `<`, `>=`, `<=`) үргэлж `true` эсвэл `false` өгнө."],
      ["`&&` needs both sides to be true, `||` needs at least one, and `!` flips the answer.", "`&&` хоёр талыг хоёуланг нь true байхыг, `||` дор хаяж нэгийг нь шаардана, `!` хариуг эсрэгээр нь болгоно."],
      ["One `=` stores a value; three `===` compare two values.", "Нэг `=` утга хадгална; гурван `===` хоёр утгыг харьцуулна."]
    )
  ],
  exercise: {
    task: ["A pizza has 8 slices and 3 friends share it equally. Print how many whole slices each friend gets, then how many slices are left over.",
           "Пицца 8 зүсэм, 3 найз тэнцүү хуваана. Найз бүр хэдэн бүтэн зүсэм авахыг, дараа нь хэдэн зүсэм үлдэхийг хэвлэ."],
    start: `const slices = 8;
const friends = 3;
// print 2 lines / 2 мөр хэвлэ
`,
    expect: "2\n2",
    hint: ["Use `Math.floor(slices / friends)` for the first line and `%` for the second.", "Эхний мөрөнд `Math.floor(slices / friends)`, хоёр дахь мөрөнд `%` ашигла."],
    solution: `const slices = 8;
const friends = 3;
console.log(Math.floor(slices / friends));
console.log(slices % friends);`
  },
  quiz: [
    { q: ["What is `17 % 5`?", "`17 % 5` хэд вэ?"],
      opts: [["`3`", "`3`"], ["`2`", "`2`"], ["`3.4`", "`3.4`"]],
      a: 1, why: ["17 = 5 × 3 + 2, so the remainder is 2.", "17 = 5 × 3 + 2 тул үлдэгдэл нь 2."] },
    { q: ["What is the difference between `=` and `===`?", "`=` ба `===` ямар ялгаатай вэ?"],
      opts: [["`=` stores a value, `===` compares", "`=` утга хадгална, `===` харьцуулна"], ["They are the same", "Ижилхэн"], ["`===` stores a value", "`===` утга хадгална"]],
      a: 0, why: ["Assignment uses one `=`. Strict equality uses `===`.", "Утга онооход нэг `=`, яг тэнцүүг шалгахад `===` хэрэглэнэ."] },
    { q: ["What is `true && false`?", "`true && false` юу вэ?"],
      opts: [["`true`", "`true`"], ["`false`", "`false`"], ["An error", "Алдаа"]],
      a: 1, why: ["`&&` needs both sides to be true.", "`&&` хоёр тал хоёулаа true байхыг шаарддаг."] },
    { q: ["What is `2 + 3 * 4`?", "`2 + 3 * 4` хэд вэ?"],
      opts: [["20", "20"], ["14", "14"], ["24", "24"]],
      a: 1, why: ["Multiplication comes first: 3 × 4 = 12, then 2 + 12 = 14.", "Үржих үйлдэл түрүүлнэ: 3 × 4 = 12, дараа нь 2 + 12 = 14."] }
  ]
});

CG.lessons.push({
  id: "js-conditions", track: "js",
  title: ["Conditions: if / else", "Нөхцөл: if / else"],
  lead: ["Let your program choose what to do.", "Програмаа юу хийхээ өөрөө сонгодог болго."],
  goals: [
    ["Run code only when a condition is true", "Нөхцөл true үед л код ажиллуулах"],
    ["Handle many cases with `else if`", "`else if`-ээр олон тохиолдлыг шийдэх"],
    ["Write short choices with the ternary `? :`", "`? :` (ternary)-ээр богино сонголт бичих"]
  ],
  body: [
    H("Making decisions", "Шийдвэр гаргах"),
    P("Programs often need to choose: if it is snowing, wear boots; otherwise, wear shoes. `if` runs a block of code only when its condition is `true`.",
      "Програм ихэвчлэн сонголт хийх хэрэгтэй болдог: цас орж байвал гутал өмс, үгүй бол пүүз өмс. `if` нь нөхцөл `true` үед л кодын хэсгийг ажиллуулна."),
    IDEA("An `if` is like a guard at a door. The guard asks one yes-or-no question, for example *do you have a ticket?* Yes: you go in. No: you take the other path, the `else`.",
         "`if` бол хаалганы манаач шиг. Манаач тийм эсвэл үгүй гэсэн ганц асуулт асууна, жишээ нь *тасалбартай юу?* Тийм бол орно. Үгүй бол нөгөө зам буюу `else` руу явна."),
    CODE("js", `
if (condition) {
  // runs when the condition is true
  // нөхцөл true үед ажиллана
} else {
  // runs otherwise / бусад үед ажиллана
}
`),
    JS(`
const temperature = -25;   // °C, a January morning in Ulaanbaatar
                           // Улаанбаатарын 1-р сарын өглөө
if (temperature < -20) {
  console.log("Very cold! Wear your deel.");
  console.log("Маш хүйтэн! Дээлээ өмс.");
} else {
  console.log("Not too cold.");
  console.log("Тийм ч хүйтэн биш.");
}
`),
    TIP("Change `-25` to `5` and run again. Curly braces `{ }` mark which lines belong to the `if`. Indent those lines by 2 spaces so the code is easy to read.",
        "`-25`-ыг `5` болгоод дахин ажиллуул. Буржгар хаалт `{ }` нь аль мөрүүд `if`-д хамаарахыг заана. Уншихад амар байлгахын тулд тэдгээр мөрийг 2 зайгаар догол мөрөөр бич."),
    H("Many choices with else if", "else if: олон сонголт"),
    JS(`
const score = 82;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}
console.log("Grade / Үнэлгээ:", grade);   // B
`),
    P("Conditions are checked from top to bottom. The first one that is true wins, and the rest are skipped. That is why `score >= 90` comes before `score >= 80`.",
      "Нөхцлүүдийг дээрээс доош шалгана. Хамгийн түрүүнд true болсон нь хэрэгжиж, үлдсэн нь алгасагдана. Тийм учраас `score >= 90` нь `score >= 80`-ээс өмнө байна."),
    WALK("js",
      ["if (score >= 90) {", "Is 82 ≥ 90? **No.** Skip this block and check the next condition.", "82 ≥ 90 юу? **Үгүй.** Энэ хэсгийг алгасаад дараагийн нөхцөлийг шалгана."],
      ["} else if (score >= 80) {", "Is 82 ≥ 80? **Yes.** Run this block.", "82 ≥ 80 юу? **Тийм.** Энэ хэсгийг ажиллуулна."],
      ["  grade = \"B\";", "`grade` becomes `\"B\"`.", "`grade` нь `\"B\"` болно."],
      ["} else if (score >= 70) { … } else { … }", "A match was already found, so all the remaining branches are skipped.", "Тохирол аль хэдийн олдсон тул үлдсэн бүх салааг алгасна."]
    ),
    FIX("js",
      `if (score >= 70) {
  grade = "C";
} else if (score >= 90) {
  grade = "A";
}`,
      `if (score >= 90) {
  grade = "A";
} else if (score >= 70) {
  grade = "C";
}`,
      "In the wrong order a score of 95 gets C: `95 >= 70` is true first, so the A branch is never reached. Put the strictest condition first.",
      "Буруу дараалалтай бол 95 оноо C авна: `95 >= 70` түрүүлж true болдог тул A салаанд хэзээ ч хүрэхгүй. Хамгийн хатуу нөхцөлийг эхэнд тавь."),
    H("Combining conditions", "Нөхцлүүдийг нэгтгэх"),
    JS(`
const age = 16;
const withParent = true;

if (age >= 18 || withParent) {
  console.log("You may enter. / Орж болно.");
} else {
  console.log("Sorry, adults only. / Уучлаарай, зөвхөн насанд хүрэгчид.");
}
`),
    H("The short form: ternary", "Богино хэлбэр: ternary"),
    P("`condition ? valueIfTrue : valueIfFalse` picks one of two values. Use it for simple choices only.",
      "`нөхцөл ? үнэн_бол : худал_бол` нь хоёр утгаас нэгийг сонгоно. Зөвхөн энгийн сонголтод хэрэглэ."),
    JS(`
const hour = 14;
const greeting = hour < 12 ? "Good morning" : "Good afternoon";
const mendchilgee = hour < 12 ? "Өглөөний мэнд" : "Өдрийн мэнд";
console.log(greeting, "/", mendchilgee);
`),
    H("Conditions inside conditions", "Нөхцөл доторх нөхцөл"),
    P("A block can contain another `if`. Use this when the second question only makes sense after the first answer.",
      "Нэг хэсэг дотор өөр `if` байж болно. Хоёр дахь асуулт нь эхний хариултын дараа л утга учиртай болох үед үүнийг хэрэглэ."),
    JS(`
const hasTicket = true;
const age = 15;

if (hasTicket) {
  if (age < 18) {
    console.log("Child seat / Хүүхдийн суудал");
  } else {
    console.log("Adult seat / Том хүний суудал");
  }
} else {
  console.log("Please buy a ticket / Тасалбар авна уу");
}
`),
    H("switch: one value, many fixed choices", "switch: нэг утга, олон тогтсон сонголт"),
    P("When you compare one value with many exact options, `switch` is easier to read than a long `else if` chain. Each `case` ends with `break`, and `default` runs when nothing matches.",
      "Нэг утгыг олон тодорхой сонголттой харьцуулах үед урт `else if` гинжээс `switch` уншихад амар. `case` бүр `break`-ээр төгсөж, юу ч таараагүй үед `default` ажиллана."),
    JS(`
const day = 3;   // 1 = Monday / Даваа
let name;

switch (day) {
  case 1: name = "Даваа"; break;
  case 2: name = "Мягмар"; break;
  case 3: name = "Лхагва"; break;
  case 4: name = "Пүрэв"; break;
  case 5: name = "Баасан"; break;
  default: name = "Weekend / Амралтын өдөр";
}
console.log(name);
`),
    WARN("If you forget a `break`, the code falls through into the next `case` as well. Remove one `break` above and run it to see what happens.",
         "`break` мартвал код дараагийн `case` руу ч орж ажиллана. Дээрх кодоос нэг `break` устгаад, юу болохыг ажиллуулж хар."),
    H("Truthy and falsy values", "Truthy ба falsy утгууд"),
    P("`if` also accepts values that are not booleans. Six values count as false: `false`, `0`, `\"\"` (empty text), `null`, `undefined` and `NaN`. Everything else counts as true. This is handy for checking whether a form field was filled in.",
      "`if` нь boolean биш утгыг ч хүлээн авдаг. Зургаан утга false гэж тооцогдоно: `false`, `0`, `\"\"` (хоосон текст), `null`, `undefined`, `NaN`. Бусад бүх утга true гэж тооцогдоно. Маягтын талбарыг бөглөсөн эсэхийг шалгахад тохиромжтой."),
    JS(`
const nameInput = "";   // the user typed nothing / хэрэглэгч юу ч бичээгүй

if (nameInput) {
  console.log("Hello, " + nameInput);
} else {
  console.log("Please enter your name / Нэрээ оруулна уу");
}
`),
    FIX("js",
      `const score = 50;
if (score = 100) {
  console.log("Perfect!");
}`,
      `const score = 50;
if (score === 100) {
  console.log("Perfect!");
}`,
      "One `=` tries to *store* 100 instead of comparing. With `const` you get a TypeError; with `let` the condition is always true. Compare with `===`.",
      "Ганц `=` харьцуулахын оронд 100-г *хадгалах* гэж оролддог. `const` бол TypeError гарна; `let` бол нөхцөл үргэлж true болно. `===`-ээр харьцуул."),
    RECAP(
      ["`if (condition) { … }` runs a block only when the condition is true; `else` runs otherwise.", "`if (нөхцөл) { … }` нь нөхцөл true үед л хэсгийг ажиллуулна; бусад үед `else` ажиллана."],
      ["`else if` checks from top to bottom and stops at the first true condition, so put the strictest first.", "`else if` дээрээс доош шалгаж, анхны true нөхцөл дээр зогсдог тул хамгийн хатууг нь эхэнд тавь."],
      ["Combine questions with `&&` and `||`, or put one `if` inside another.", "Асуултуудыг `&&`, `||`-ээр нэгтгэ, эсвэл нэг `if`-ийг нөгөөгийнх нь дотор бич."],
      ["`switch` compares one value with many exact choices. End each `case` with `break`.", "`switch` нэг утгыг олон тодорхой сонголттой харьцуулна. `case` бүрийг `break`-ээр төгсгө."],
      ["`false`, `0`, `\"\"`, `null`, `undefined` and `NaN` count as false.", "`false`, `0`, `\"\"`, `null`, `undefined`, `NaN` нь false гэж тооцогдоно."],
      ["Write `===` to compare, never a single `=`.", "Харьцуулахдаа `===` бич, ганц `=` хэзээ ч бүү бич."]
    )
  ],
  exercise: {
    task: ["`n` is 7. Print `even` if `n` is even, otherwise print `odd`.",
           "`n` нь 7. Хэрэв `n` тэгш бол `even`, үгүй бол `odd` гэж хэвлэ."],
    start: `const n = 7;
// your if / else here / if / else-ээ энд бич
`,
    expect: "odd",
    hint: ["A number is even when `n % 2 === 0`.", "`n % 2 === 0` бол тоо тэгш байна."],
    solution: `const n = 7;
if (n % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}`
  },
  quiz: [
    { q: ["With `score = 75`, which grade does the example above give?", "`score = 75` үед дээрх жишээ ямар үнэлгээ өгөх вэ?"],
      opts: [["A", "A"], ["B", "B"], ["C", "C"]],
      a: 2, why: ["75 fails `>= 90` and `>= 80`, then passes `>= 70`.", "75 нь `>= 90`, `>= 80`-д тэнцэхгүй, `>= 70`-д тэнцэнэ."] },
    { q: ["When does the `else` block run?", "`else` хэсэг хэзээ ажиллах вэ?"],
      opts: [["Always", "Үргэлж"], ["When no condition above it was true", "Дээрх нөхцлүүдийн аль нь ч true биш үед"], ["Never", "Хэзээ ч үгүй"]],
      a: 1, why: ["`else` is the fallback when every condition is false.", "Бүх нөхцөл false үед `else` ажиллана."] },
    { q: ["What is `5 > 3 ? \"yes\" : \"no\"`?", "`5 > 3 ? \"yes\" : \"no\"` юу вэ?"],
      opts: [["`\"yes\"`", "`\"yes\"`"], ["`\"no\"`", "`\"no\"`"], ["`true`", "`true`"]],
      a: 0, why: ["The condition is true, so the first value is chosen.", "Нөхцөл true тул эхний утгыг сонгоно."] },
    { q: ["Which value counts as false in an `if`?", "`if`-д аль утга false гэж тооцогдох вэ?"],
      opts: [["`\"0\"`", "`\"0\"`"], ["`0`", "`0`"], ["`\"false\"`", "`\"false\"`"]],
      a: 1, why: ["The number `0` is falsy. `\"0\"` and `\"false\"` are non-empty text, so they count as true.", "`0` тоо нь falsy. `\"0\"`, `\"false\"` нь хоосон биш текст тул true гэж тооцогдоно."] }
  ]
});

CG.lessons.push({
  id: "js-loops", track: "js",
  title: ["Loops", "Давталт"],
  lead: ["Repeat work without copying code.", "Кодыг хуулахгүйгээр ажлыг давтана."],
  goals: [
    ["Repeat code with a `for` loop", "`for` давталтаар код давтах"],
    ["Use `while` when the number of rounds is unknown", "Тойргийн тоо тодорхойгүй үед `while` ашиглах"],
    ["Stop or skip with `break` and `continue`", "`break`, `continue`-ээр зогсоох, алгасах"]
  ],
  body: [
    H("Repeat without copying", "Хуулахгүйгээр давтах"),
    P("Printing the numbers 1 to 100 with 100 lines of `console.log` would be painful. A **loop** repeats a block of code for you.",
      "1-ээс 100 хүртэлх тоог 100 мөр `console.log`-оор хэвлэх нь их ядаргаатай. **Давталт** нь кодын хэсгийг таны оронд олон удаа давтдаг."),
    IDEA("A loop is like running laps on a stadium track. The counter is the lap number. Before each lap you ask *have I finished 5 laps yet?* After each lap you add one to the counter. When the answer is yes, you stop.",
         "Давталт бол цэнгэлдэх хүрээлэнгийн зам дээр тойрог гүйхтэй адил. Тоолуур нь тойргийн дугаар. Тойрог бүрийн өмнө *5 тойрог гүйж дууссан уу?* гэж асууна. Тойрог бүрийн дараа тоолуурыг нэгээр нэмнэ. Хариу «тийм» болбол зогсоно."),
    H("The for loop", "for давталт"),
    CODE("js", `
for (start; condition; step) {
  // body: runs once per round / бие: тойрог бүрт нэг удаа ажиллана
}
`),
    TABLE([["Part", "Хэсэг"], ["Example", "Жишээ"], ["What it does", "Юу хийдэг вэ"]],
      [["start", "эхлэл"], "`let i = 1`", ["creates the counter, runs once", "тоолуур үүсгэнэ, нэг удаа ажиллана"]],
      [["condition", "нөхцөл"], "`i <= 5`", ["checked before every round; the loop stops when it is false", "тойрог бүрийн өмнө шалгана; false болбол давталт зогсоно"]],
      [["step", "алхам"], "`i++`", ["runs after every round", "тойрог бүрийн дараа ажиллана"]]
    ),
    JS(`
for (let i = 1; i <= 5; i++) {
  console.log("Round / Тойрог", i);
}
`),
    P("Here is exactly what happens, round by round:",
      "Тойрог бүрт яг юу болдгийг харцгаая:"),
    TABLE([["Step", "Алхам"], "`i`", "`i <= 5`?", ["Action", "Үйлдэл"]],
      [["start", "эхлэл"], "1", "`true`", ["print Round 1, then `i++`", "Тойрог 1 хэвлээд `i++`"]],
      [["round 2", "2-р тойрог"], "2", "`true`", ["print Round 2, then `i++`", "Тойрог 2 хэвлээд `i++`"]],
      ["…", "…", "…", "…"],
      [["round 5", "5-р тойрог"], "5", "`true`", ["print Round 5, then `i++`", "Тойрог 5 хэвлээд `i++`"]],
      [["check", "шалгалт"], "6", "`false`", ["the loop ends", "давталт дуусна"]]
    ),
    TIP("`i` does reach 6, but the body never runs with 6, because the condition is checked before every round.",
        "`i` 6 хүртэл өсдөг ч бие нь 6-тайгаар хэзээ ч ажиллахгүй, учир нь нөхцөлийг тойрог бүрийн өмнө шалгадаг."),
    JS(`
// Add 1 + 2 + ... + 100 / 1 + 2 + ... + 100-г нэмэх
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);   // 5050
`),
    P("This is the **accumulator** pattern, one of the most common in programming: create a variable *before* the loop, update it *inside* the loop, and use it *after* the loop. The same pattern counts things:",
      "Энэ бол програмчлалын хамгийн түгээмэл загваруудын нэг болох **хуримтлуулагч** (accumulator): хувьсагчаа давталтын *өмнө* үүсгэж, давталт *дотор* шинэчилж, давталтын *дараа* ашиглана. Ижил загвараар юмс тоолж болно:"),
    JS(`
// How many numbers from 1 to 50 divide by 7?
// 1-ээс 50 хүртэлх тооны хэд нь 7-д хуваагдах вэ?
let count = 0;
for (let i = 1; i <= 50; i++) {
  if (i % 7 === 0) {
    count++;
  }
}
console.log(count);   // 7
`),
    H("Counting in other ways", "Өөр аргаар тоолох"),
    P("The step does not have to be `i++`. You can count down with `i--` or jump with `i += 2`.",
      "Алхам заавал `i++` байх албагүй. `i--`-ээр буурахаар тоолж, `i += 2`-оор алгасаж болно."),
    JS(`
// Count down / Буурахаар тоолох
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
console.log("Happy New Year! / Шинэ оны мэнд!");

// Count by 2 / 2-оор алгасаж тоолох
for (let i = 0; i <= 10; i += 2) {
  console.log("even / тэгш:", i);
}
`),
    H("The while loop", "while давталт"),
    P("`while` repeats as long as its condition is true. Use it when you do not know in advance how many rounds you need.",
      "`while` нь нөхцөл true байх хооронд давтана. Хэдэн тойрог хэрэгтэйг урьдчилан мэдэхгүй үед ашигла."),
    JS(`
let money = 10000;   // ₮
let days = 0;

while (money > 0) {
  money -= 3000;     // spend 3000₮ a day / өдөрт 3000₮ зарна
  days++;
}
console.log("The money lasted", days, "days");
console.log("Мөнгө", days, "өдөр хүрэлцсэн");
`),
    WARN("If the condition never becomes false, the loop never ends. This is an **infinite loop**. This site stops your code after 3 seconds, but a real program would freeze.",
         "Нөхцөл хэзээ ч false болохгүй бол давталт дуусахгүй. Үүнийг **төгсгөлгүй давталт** гэнэ. Энэ сайт кодыг 3 секундын дараа зогсоодог ч жинхэнэ програм гацна."),
    H("break and continue", "break ба continue"),
    TABLE([["Keyword", "Түлхүүр үг"], ["Effect", "Үйлдэл"]],
      ["`continue`", ["skip the rest of this round, go to the next one", "энэ тойргийн үлдсэнийг алгасаад дараагийнх руу шилжинэ"]],
      ["`break`", ["leave the loop completely", "давталтаас бүр мөсөн гарна"]]
    ),
    JS(`
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue;   // skip 3 / 3-ыг алгасах
  if (i === 6) break;      // stop at 6 / 6 дээр зогсох
  console.log(i);
}
// prints 1 2 4 5 / 1 2 4 5 хэвлэнэ
`),
    H("Loops inside loops", "Давталт доторх давталт"),
    P("A loop can contain another loop. The inner loop runs **all the way through** for every single round of the outer loop, just as the minute hand goes all the way round for every hour.",
      "Давталт дотор өөр давталт байж болно. Гаднах давталтын тойрог бүрт дотоод давталт **бүтэн** ажилладаг, яг л цаг бүрт минутын зүү бүтэн тойрдог шиг."),
    JS(`
// A small multiplication table / Жижиг үржүүлэх хүснэгт
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 4; col++) {
    line += String(row * col).padStart(4);
  }
  console.log(line);
}
`),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("js",
      `// Print 1 to 5 / 1-ээс 5 хүртэл хэвлэх
for (let i = 1; i < 5; i++) {
  console.log(i);
}`,
      `// Print 1 to 5 / 1-ээс 5 хүртэл хэвлэх
for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
      "`i < 5` stops before 5, so only 1 to 4 are printed. Ask yourself whether the last number should be included; if it should, use `<=`. This *off-by-one* mistake is one of the most common bugs of all.",
      "`i < 5` нь 5-д хүрэхээс өмнө зогсдог тул зөвхөн 1-ээс 4 хэвлэгдэнэ. Сүүлийн тоо орох ёстой юу гэдгийг өөрөөсөө асуу; орох ёстой бол `<=` ашигла. Нэгээр зөрөх (*off-by-one*) энэ алдаа хамгийн түгээмэл алдааны нэг."),
    FIX("js",
      `let i = 0;
while (i < 3) {
  console.log(i);
}`,
      `let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}`,
      "Nothing changes `i`, so `i < 3` stays true forever. Every `while` loop must change something that its condition depends on.",
      "`i`-г юу ч өөрчлөхгүй тул `i < 3` үүрд true хэвээр үлдэнэ. `while` давталт бүр нөхцөлдөө нөлөөлөх зүйлийг өөрчилж байх ёстой."),
    RECAP(
      ["A loop repeats a block of code, so you never have to copy it.", "Давталт кодын хэсгийг давтдаг тул хуулах шаардлагагүй."],
      ["`for (start; condition; step)`: the condition is checked before every round.", "`for (эхлэл; нөхцөл; алхам)`: нөхцөлийг тойрог бүрийн өмнө шалгана."],
      ["Use `while` when you do not know the number of rounds, and make sure its condition can become false.", "Тойргийн тоо тодорхойгүй үед `while` ашиглаж, нөхцөл нь false болж чадах эсэхийг шалга."],
      ["`continue` skips the rest of one round; `break` leaves the loop.", "`continue` нэг тойргийн үлдсэнийг алгасна; `break` давталтаас гарна."],
      ["Accumulator pattern: create before the loop, update inside, use after.", "Хуримтлуулагч загвар: давталтын өмнө үүсгэ, дотор нь шинэчил, дараа нь ашигла."],
      ["Check both ends of your range: `<` or `<=`?", "Мужийн хоёр захаа шалга: `<` уу, `<=` үү?"]
    )
  ],
  exercise: {
    task: ["Print the multiplication table of 7 from `7 x 1 = 7` to `7 x 5 = 35`, one line each, in exactly that format.",
           "7-гийн үржүүлэх хүснэгтийг `7 x 1 = 7`-оос `7 x 5 = 35` хүртэл, мөр бүрт нэгээр, яг ийм хэлбэрээр хэвлэ."],
    start: `for (let i = 1; i <= 5; i++) {
  // print one line / нэг мөр хэвлэ
}
`,
    expect: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35",
    hint: ["`console.log(7, \"x\", i, \"=\", 7 * i)` prints values separated by spaces. A template string also works.", "`console.log(7, \"x\", i, \"=\", 7 * i)` утгуудыг зайгаар тусгаарлан хэвлэнэ. Template string ч бас болно."],
    solution: `for (let i = 1; i <= 5; i++) {
  console.log(\`7 x \${i} = \${7 * i}\`);
}`
  },
  quiz: [
    { q: ["How many times does `for (let i = 0; i < 3; i++)` run its body?", "`for (let i = 0; i < 3; i++)` биеэ хэдэн удаа ажиллуулах вэ?"],
      opts: [["2", "2"], ["3", "3"], ["4", "4"]],
      a: 1, why: ["`i` takes the values 0, 1 and 2.", "`i` нь 0, 1, 2 гэсэн утгуудыг авна."] },
    { q: ["What does `break` do?", "`break` юу хийдэг вэ?"],
      opts: [["Skips one round", "Нэг тойрог алгасна"], ["Leaves the loop completely", "Давталтаас бүрэн гарна"], ["Restarts the loop", "Давталтыг дахин эхлүүлнэ"]],
      a: 1, why: ["`continue` skips one round; `break` stops the loop.", "`continue` нэг тойрог алгасдаг; `break` давталтыг зогсоодог."] },
    { q: ["When is `while` a better choice than `for`?", "Хэзээ `for`-оос `while` илүү тохиромжтой вэ?"],
      opts: [["When you do not know how many rounds you need", "Хэдэн тойрог хэрэгтэйг мэдэхгүй үед"], ["Never", "Хэзээ ч үгүй"], ["When counting from 1 to 10", "1-ээс 10 хүртэл тоолох үед"]],
      a: 0, why: ["`while` keeps going until a condition changes.", "`while` нөхцөл өөрчлөгдөх хүртэл үргэлжилдэг."] },
    { q: ["What does `for (let i = 10; i > 0; i -= 3) console.log(i);` print?", "`for (let i = 10; i > 0; i -= 3) console.log(i);` юу хэвлэх вэ?"],
      opts: [["10 7 4 1", "10 7 4 1"], ["10 7 4", "10 7 4"], ["9 6 3", "9 6 3"]],
      a: 0, why: ["Start at 10 and subtract 3 while `i > 0`: 10, 7, 4, 1. The next value, −2, fails the condition.", "10-аас эхэлж, `i > 0` байх хооронд 3-аар хасна: 10, 7, 4, 1. Дараагийн утга −2 нөхцөлд тэнцэхгүй."] }
  ]
});

CG.lessons.push({
  id: "js-functions", track: "js",
  title: ["Functions", "Функц"],
  lead: ["Package code into named, reusable pieces.", "Кодыг нэртэй, дахин ашиглах хэсгүүд болгон багцална."],
  goals: [
    ["Define and call a function", "Функц тодорхойлж, дуудах"],
    ["Pass parameters and `return` a result", "Параметр дамжуулж, `return`-оор үр дүн буцаах"],
    ["Write arrow functions", "Сум функц бичих"],
    ["Understand scope", "Хүрээг (scope) ойлгох"]
  ],
  body: [
    H("Reusable recipes", "Дахин ашиглах жор"),
    P("A **function** is a named block of code that you can run again and again. You **define** it once and **call** it whenever you need it.",
      "**Функц** бол дахин дахин ажиллуулж болох нэртэй кодын хэсэг. Нэг удаа **тодорхойлоод**, хэрэгтэй үедээ **дуудна**."),
    IDEA("A function is like a vending machine. You put something in (the parameters: money and a button number), the machine does its work inside, and something comes out (the return value: a drink). You can use it without knowing how it works inside.",
         "Функц бол ундааны автомат машин шиг. Та ямар нэг зүйл хийнэ (параметр: мөнгө, товчны дугаар), машин дотроо ажлаа хийнэ, тэгээд ямар нэг зүйл гарч ирнэ (буцаах утга: ундаа). Дотор нь хэрхэн ажилладгийг мэдэхгүйгээр ч ашиглаж болно."),
    JS(`
// Define / Тодорхойлох
function greet(name) {
  console.log("Сайн уу, " + name + "!");
}

// Call / Дуудах
greet("Bat");
greet("Saraa");
greet("Anu");
`),
    H("Parameters and return", "Параметр ба return"),
    P("The names inside the parentheses are **parameters**: inputs to the function. `return` sends a result back to the place where the function was called. The function stops as soon as it reaches `return`.",
      "Хаалт доторх нэрсийг **параметр** гэнэ: функцийн оролт. `return` нь үр дүнг функцийг дуудсан газар руу буцаана. Функц `return`-д хүрмэгц зогсоно."),
    JS(`
function area(width, height) {
  return width * height;
}

const room = area(4, 5);
console.log(room);             // 20
console.log(area(2, 3) + 1);   // 7
`),
    WALK("js",
      ["function area(width, height) {", "Define a function called `area` with two inputs, `width` and `height`. Nothing runs yet: this only writes down the recipe.", "`width`, `height` гэсэн хоёр оролттой `area` нэртэй функц тодорхойлно. Одоохондоо юу ч ажиллахгүй: зөвхөн жорыг бичиж байна."],
      ["  return width * height;", "When the function is called, multiply the two inputs and send the answer back.", "Функцийг дуудахад хоёр оролтыг үржүүлээд хариуг буцааж илгээнэ."],
      ["const room = area(4, 5);", "Call it: `width` becomes 4 and `height` becomes 5. The function returns 20, and 20 is stored in `room`.", "Дуудах: `width` нь 4, `height` нь 5 болно. Функц 20 буцааж, 20 нь `room`-д хадгалагдана."],
      ["console.log(area(2, 3) + 1);", "`area(2, 3)` is replaced by its result, 6, so this prints 6 + 1 = 7.", "`area(2, 3)` нь үр дүн болох 6-аар солигдох тул 6 + 1 = 7 хэвлэнэ."]
    ),
    P("The values you pass in a call, such as `4` and `5`, are called **arguments**. Parameters are the names in the definition; arguments are the actual values.",
      "Дуудахдаа дамжуулж буй `4`, `5` гэх мэт утгыг **аргумент** гэнэ. Параметр нь тодорхойлолт дахь нэр; аргумент нь бодит утга."),
    TIP("`console.log` only shows a value on the screen. `return` hands the value back so you can store it and use it in more code.",
        "`console.log` утгыг зөвхөн дэлгэц дээр харуулна. `return` харин утгыг буцааж өгдөг тул хадгалж, цааш кодонд ашиглаж болно."),
    H("Arrow functions", "Сум функц (arrow function)"),
    P("Arrow functions are a shorter way to write small functions. If the body is a single expression, its value is returned automatically.",
      "Сум функц бол жижиг функцийг богино бичих арга. Бие нь ганц илэрхийлэл бол түүний утга автоматаар буцна."),
    JS(`
const double = (n) => n * 2;
const add = (a, b) => a + b;
const isAdult = (age) => age >= 18;

console.log(double(21));   // 42
console.log(add(3, 4));    // 7
console.log(isAdult(16));  // false
`),
    H("Default values", "Анхдагч утга"),
    P("You can give a parameter a value to use when the caller leaves it out.",
      "Дуудах үед аргумент өгөөгүй тохиолдолд ашиглах утгыг параметрт урьдчилан өгч болно."),
    JS(`
function greet(name = "найз") {
  return "Сайн уу, " + name + "!";
}
console.log(greet("Anu"));   // Сайн уу, Anu!
console.log(greet());        // Сайн уу, найз!
`),
    H("Scope", "Хүрээ (scope)"),
    P("A variable created inside a function exists only inside that function. This keeps functions independent from each other.",
      "Функц дотор үүсгэсэн хувьсагч зөвхөн тэр функц дотор оршино. Энэ нь функцуудыг бие биеэсээ хамааралгүй байлгадаг."),
    JS(`
function makeTea() {
  const water = "hot";
  console.log("Water is", water);
}
makeTea();
// console.log(water);  ← error: water does not exist here
//                      ← алдаа: water энд байхгүй
`),
    H("A useful example", "Хэрэгтэй жишээ"),
    JS(`
// Price after a discount / Хямдралын дараах үнэ
function salePrice(price, percent) {
  const discount = price * percent / 100;
  return price - discount;
}

console.log(salePrice(50000, 20), "₮");   // 40000
console.log(salePrice(12000, 50), "₮");   // 6000
`),
    H("Why bother with functions?", "Функц яагаад хэрэгтэй вэ?"),
    UL(
      ["**Write once, use many times.** The discount rule lives in one place. If it changes, you fix one line.", "**Нэг бичээд, олон дахин ашигла.** Хямдралын дүрэм нэг газар байна. Өөрчлөгдвөл ганц мөр засна."],
      ["**Give an idea a name.** `salePrice(50000, 20)` is easier to read than the formula itself.", "**Санаанд нэр өг.** `salePrice(50000, 20)` нь томьёоноосоо уншихад амар."],
      ["**Split a big problem into small ones.** Each function does one job and can be tested on its own.", "**Том асуудлыг жижиг болгон хуваа.** Функц бүр нэг ажил хийж, тус тусдаа шалгагдана."]
    ),
    H("Functions that use other functions", "Бусад функцийг ашигладаг функц"),
    P("Small functions combine like building blocks. In Mongolia, VAT (НӨАТ) is 10% of the price.",
      "Жижиг функцууд барилгын тоосго шиг нийлдэг. Монголд НӨАТ (нэмэгдсэн өртгийн албан татвар) үнийн 10% байдаг."),
    JS(`
function vat(price) {
  return price * 0.1;            // 10% VAT / НӨАТ 10%
}

function priceWithVat(price) {
  return price + vat(price);     // uses vat() / vat()-ийг ашиглана
}

function receipt(item, price) {
  return item + ": " + priceWithVat(price) + "₮";
}

console.log(receipt("Book / Ном", 20000));   // 22000₮
console.log(receipt("Pen / Үзэг", 1500));    // 1650₮
`),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("js",
      `function double(n) {
  n * 2;
}
console.log(double(5));   // undefined`,
      `function double(n) {
  return n * 2;
}
console.log(double(5));   // 10`,
      "Without `return`, the function calculates the answer and then throws it away. A function that returns nothing gives `undefined`.",
      "`return` байхгүй бол функц хариуг бодоод хаячихна. Юу ч буцаадаггүй функц `undefined` өгдөг."),
    FIX("js",
      `function add(a, b) {
  console.log(a + b);
}
const total = add(2, 3) * 10;   // NaN`,
      `function add(a, b) {
  return a + b;
}
const total = add(2, 3) * 10;   // 50`,
      "`console.log` only shows the value on the screen. The function still returns `undefined`, and `undefined * 10` is `NaN`.",
      "`console.log` утгыг дэлгэцэнд л харуулна. Функц `undefined` буцаасаар байгаа бөгөөд `undefined * 10` нь `NaN` болно."),
    RECAP(
      ["A function is a named, reusable block of code: define it once, call it many times.", "Функц бол нэртэй, дахин ашиглах кодын хэсэг: нэг удаа тодорхойлж, олон удаа дуудна."],
      ["Parameters are the names of the inputs; arguments are the values you pass in a call.", "Параметр нь оролтын нэр; аргумент нь дуудахдаа дамжуулах утга."],
      ["`return` sends a result back and ends the function. Without it you get `undefined`.", "`return` үр дүнг буцааж, функцийг дуусгана. Үгүй бол `undefined` гарна."],
      ["Arrow functions such as `(a, b) => a + b` are a short way to write small functions.", "`(a, b) => a + b` шиг сум функц нь жижиг функцийг богино бичих арга."],
      ["Parameters can have default values: `name = \"найз\"`.", "Параметр анхдагч утгатай байж болно: `name = \"найз\"`."],
      ["Variables created inside a function exist only inside it (scope).", "Функц дотор үүсгэсэн хувьсагч зөвхөн тэр дотроо оршино (scope)."]
    )
  ],
  exercise: {
    task: ["Write a function `toCelsius(f)` that returns `(f - 32) * 5 / 9`. Print `toCelsius(212)` and then `toCelsius(32)`.",
           "`(f - 32) * 5 / 9`-ийг буцаадаг `toCelsius(f)` функц бич. `toCelsius(212)`, дараа нь `toCelsius(32)`-ыг хэвлэ."],
    start: `function toCelsius(f) {
  // return ...
}
`,
    expect: "100\n0",
    hint: ["Inside the function write `return (f - 32) * 5 / 9;`. Then call it inside `console.log()`.", "Функц дотор `return (f - 32) * 5 / 9;` гэж бич. Дараа нь `console.log()` дотор дууд."],
    solution: `function toCelsius(f) {
  return (f - 32) * 5 / 9;
}
console.log(toCelsius(212));
console.log(toCelsius(32));`
  },
  quiz: [
    { q: ["What does `return` do?", "`return` юу хийдэг вэ?"],
      opts: [["Prints a value", "Утга хэвлэнэ"], ["Sends a value back to the caller and stops the function", "Утгыг дуудсан газар руу буцааж, функцийг зогсооно"], ["Restarts the function", "Функцийг дахин эхлүүлнэ"]],
      a: 1, why: ["The returned value can be stored or used in other expressions.", "Буцаасан утгыг хадгалах эсвэл өөр илэрхийлэлд ашиглаж болно."] },
    { q: ["`const sq = x => x * x;` What is `sq(4)`?", "`const sq = x => x * x;` `sq(4)` хэд вэ?"],
      opts: [["8", "8"], ["16", "16"], ["44", "44"]],
      a: 1, why: ["4 × 4 = 16.", "4 × 4 = 16."] },
    { q: ["In `function area(w, h)`, what are `w` and `h`?", "`function area(w, h)`-д `w`, `h` юу вэ?"],
      opts: [["Parameters", "Параметр"], ["Return values", "Буцаах утга"], ["Comments", "Тайлбар"]],
      a: 0, why: ["Parameters are the named inputs of a function.", "Параметр бол функцийн нэртэй оролтууд."] },
    { q: ["`function f(x) { x * 2; }` What is `f(4)`?", "`function f(x) { x * 2; }` `f(4)` юу вэ?"],
      opts: [["8", "8"], ["`undefined`", "`undefined`"], ["4", "4"]],
      a: 1, why: ["There is no `return`, so the result is thrown away and the call gives `undefined`.", "`return` байхгүй тул үр дүн хаягдаж, дуудлага `undefined` өгнө."] }
  ]
});

CG.lessons.push({
  id: "js-arrays", track: "js",
  title: ["Arrays", "Массив"],
  lead: ["Keep many values in one ordered list.", "Олон утгыг нэг дараалсан жагсаалтад хадгална."],
  goals: [
    ["Create an array and read items by index", "Массив үүсгэж, индексээр нь утга унших"],
    ["Add and remove items", "Утга нэмэх, хасах"],
    ["Loop over an array", "Массиваар давталт хийх"],
    ["Transform arrays with `map`, `filter`, `reduce`", "`map`, `filter`, `reduce`-ээр массивыг хувиргах"]
  ],
  body: [
    H("A list of values", "Утгын жагсаалт"),
    P("An **array** stores many values in order inside square brackets `[ ]`. Each value has a position number called an **index**. Counting starts at **0**, not 1.",
      "**Массив** нь олон утгыг дөрвөлжин хаалт `[ ]` дотор дарааллаар нь хадгална. Утга бүр **индекс** гэдэг байрлалын дугаартай. Тоолол 1-ээс биш **0**-ээс эхэлнэ."),
    IDEA("An array is like a row of numbered lockers at a gym. Each locker holds one thing, and you open it by its number. The first locker is number 0, so in a row of 4 lockers the last one is number 3.",
         "Массив бол спорт заалны дугаартай шүүгээний эгнээ шиг. Шүүгээ бүрт нэг зүйл байх бөгөөд дугаараар нь нээнэ. Эхний шүүгээ 0 дугаартай тул 4 шүүгээтэй эгнээний сүүлийнх нь 3 дугаартай."),
    { t: "array", name: "aimags", values: ["\"Arkhangai\"", "\"Bayan-Ölgii\"", "\"Khentii\"", "\"Dornod\""] },
    JS(`
const aimags = ["Arkhangai", "Bayan-Ölgii", "Khentii", "Dornod"];

console.log(aimags[0]);        // first / эхнийх
console.log(aimags[2]);        // Khentii
console.log(aimags.length);    // 4
console.log(aimags[aimags.length - 1]);   // last / сүүлийнх
`),
    WALK("js",
      ["aimags[0]", "The item at position 0, the first one: `\"Arkhangai\"`.", "0-р байрлал дахь утга, эхнийх: `\"Arkhangai\"`."],
      ["aimags.length", "How many items there are: 4.", "Хэдэн утга байгааг хэлнэ: 4."],
      ["aimags[aimags.length - 1]", "4 − 1 = 3, so this reads `aimags[3]`, the last item. It works for an array of any length.", "4 − 1 = 3 тул `aimags[3]` буюу сүүлийн утгыг уншина. Ямар ч урттай массивт ажиллана."]
    ),
    TIP("Replace an item by assigning to its index: `aimags[1] = \"Uvs\";`. An array created with `const` can still change inside; `const` only stops you from swapping the whole array for a new one.",
        "Индексээр нь утга оноож солино: `aimags[1] = \"Uvs\";`. `const`-оор үүсгэсэн массивын доторх утгууд өөрчлөгдөж болно; `const` нь зөвхөн массивыг бүхэлд нь шинээр солихыг хориглодог."),
    H("Changing an array", "Массивыг өөрчлөх"),
    TABLE([["Method", "Арга"], ["What it does", "Юу хийдэг вэ"]],
      ["`push(x)`", ["add `x` to the end", "`x`-ийг төгсгөлд нэмнэ"]],
      ["`pop()`", ["remove the last item", "сүүлийн утгыг хасна"]],
      ["`unshift(x)`", ["add `x` to the start", "`x`-ийг эхэнд нэмнэ"]],
      ["`includes(x)`", ["is `x` in the array? true / false", "`x` массивт байна уу? true / false"]],
      ["`indexOf(x)`", ["the index of `x`, or -1 if missing", "`x`-ийн индекс, байхгүй бол -1"]]
    ),
    JS(`
const cart = ["milk", "bread"];
cart.push("eggs");                  // add / нэмэх
console.log(cart);

cart.pop();                         // remove last / сүүлийнхийг хасах
console.log(cart);
console.log(cart.includes("milk")); // true
console.log(cart.indexOf("tea"));   // -1 (not found / олдсонгүй)
`),
    H("Looping over an array", "Массиваар давталт хийх"),
    P("`for…of` gives you each item in turn. Use the classic `for` loop when you also need the index.",
      "`for…of` нь утга бүрийг ээлжлэн өгнө. Индекс бас хэрэгтэй бол энгийн `for` давталт ашигла."),
    JS(`
const scores = [72, 95, 88, 60];

for (const s of scores) {
  console.log("Score / Оноо:", s);
}

for (let i = 0; i < scores.length; i++) {
  console.log("#" + i, scores[i]);
}
`),
    H("map, filter and reduce", "map, filter ба reduce"),
    P("These methods take a function and apply it to every item. `map` and `filter` return a **new** array and leave the original unchanged.",
      "Эдгээр арга нь функц авч, утга бүрт хэрэглэнэ. `map`, `filter` нь **шинэ** массив буцааж, анхныхыг өөрчлөхгүй."),
    TABLE([["Method", "Арга"], ["Question it answers", "Ямар асуултад хариулдаг вэ"]],
      ["`map`", ["change every item", "утга бүрийг өөрчлөх"]],
      ["`filter`", ["keep only some items", "заримыг нь л үлдээх"]],
      ["`reduce`", ["combine all items into one value", "бүх утгыг нэг утга болгон нэгтгэх"]]
    ),
    JS(`
const prices = [1000, 2500, 4000];

const withDelivery = prices.map(p => p + 500);         // + delivery fee / хүргэлтийн төлбөр
const cheap = prices.filter(p => p < 3000);            // under 3000₮ / 3000₮-өөс бага
const total = prices.reduce((sum, p) => sum + p, 0);   // add all / бүгдийг нэмэх

console.log(withDelivery);   // [1500, 3000, 4500]
console.log(cheap);          // [1000, 2500]
console.log(total);          // 7500
`),
    H("reduce, step by step", "reduce алхам алхмаар"),
    P("`reduce` is the hardest of the three. It walks along the array carrying one running value, here called `sum`, which starts at the `0` written at the end of the call.",
      "`reduce` нь гурвын хамгийн хэцүү нь. Массивын дагуу явахдаа нэг хуримтлагдах утга авч явдаг. Энд түүнийг `sum` гэж нэрлэсэн бөгөөд дуудлагын төгсгөлд бичсэн `0`-ээс эхэлнэ."),
    TABLE([["Round", "Тойрог"], "`sum`", "`p`", ["New `sum`", "Шинэ `sum`"]],
      ["1", "0", "1000", "1000"],
      ["2", "1000", "2500", "3500"],
      ["3", "3500", "4000", "7500"]
    ),
    P("After the last item, `reduce` returns the final `sum`: 7500.",
      "Сүүлийн утгын дараа `reduce` эцсийн `sum`-ийг буцаана: 7500."),
    H("More useful methods", "Бусад хэрэгтэй аргууд"),
    TABLE([["Method", "Арга"], ["What it does", "Юу хийдэг вэ"]],
      ["`join(\", \")`", ["glue all items into one text", "бүх утгыг нэг текст болгон залгана"]],
      ["`slice(1, 3)`", ["copy a part: from index 1 up to, not including, 3", "хэсгийг хуулна: 1-р индексээс 3 хүртэл (3-ыг оруулахгүй)"]],
      ["`find(fn)`", ["the first item that passes the test", "шалгалтад тэнцсэн эхний утга"]],
      ["`forEach(fn)`", ["run a function for every item", "утга бүрт функц ажиллуулна"]],
      ["`sort((a, b) => a - b)`", ["sort numbers from small to large", "тоог багаас их рүү эрэмбэлнэ"]],
      ["`reverse()`", ["reverse the order", "дарааллыг урвуулна"]]
    ),
    JS(`
const temps = [-12, 3, -25, 8, 0];   // °C, five winter days / өвлийн таван өдөр

temps.forEach((t, i) => console.log("Day / Өдөр", i + 1, ":", t, "°C"));
console.log(temps.join(" | "));
console.log(temps.slice(0, 2));          // [-12, 3]
console.log(temps.find(t => t > 0));     // 3: the first warm day / анхны дулаан өдөр

temps.sort((a, b) => a - b);             // changes temps / temps-ийг өөрчилнө
console.log(temps);                      // [-25, -12, 0, 3, 8]
`),
    WARN("`sort()` without a function sorts items **as text**, so `[10, 9, 100].sort()` gives `[10, 100, 9]`. For numbers always pass `(a, b) => a - b`. Note also that `sort` changes the original array.",
         "Функцгүй `sort()` нь утгуудыг **текст шиг** эрэмбэлдэг тул `[10, 9, 100].sort()` нь `[10, 100, 9]` болно. Тоонд үргэлж `(a, b) => a - b` дамжуул. Мөн `sort` анхны массивыг өөрчилдгийг анхаар."),
    FIX("js",
      `const colors = ["red", "blue", "green"];
console.log(colors[3]);   // undefined`,
      `const colors = ["red", "blue", "green"];
console.log(colors[colors.length - 1]);   // green`,
      "An array of 3 items has the indexes 0, 1 and 2. There is no index 3, so JavaScript quietly gives `undefined` instead of an error.",
      "3 утгатай массив 0, 1, 2 гэсэн индекстэй. 3-р индекс байхгүй тул JavaScript алдаа өгөхгүйгээр `undefined` буцаана."),
    RECAP(
      ["An array keeps many values in order: `[a, b, c]`.", "Массив олон утгыг дарааллаар нь хадгална: `[a, b, c]`."],
      ["Indexes start at 0, and the last item is at `length - 1`.", "Индекс 0-ээс эхэлж, сүүлийн утга `length - 1` дээр байна."],
      ["`push` and `pop` change the end; `includes` and `indexOf` search.", "`push`, `pop` төгсгөлийг өөрчилнө; `includes`, `indexOf` хайна."],
      ["`for…of` visits every item. Use a classic `for` when you also need the index.", "`for…of` утга бүрээр явна. Индекс бас хэрэгтэй бол энгийн `for` ашигла."],
      ["`map` changes every item, `filter` keeps some, `reduce` combines all into one value.", "`map` утга бүрийг өөрчилнө, `filter` заримыг үлдээнэ, `reduce` бүгдийг нэг утга болгоно."],
      ["Sort numbers with `sort((a, b) => a - b)`.", "Тоог `sort((a, b) => a - b)`-ээр эрэмбэл."]
    )
  ],
  exercise: {
    task: ["Given `nums`, print a new array of the numbers greater than 6. Then print the sum of those numbers.",
           "`nums` өгөгдсөн. 6-аас их тоонуудын шинэ массивыг хэвлэ. Дараа нь тэдгээр тооны нийлбэрийг хэвлэ."],
    start: `const nums = [3, 8, 12, 5, 20];
`,
    expect: "[8, 12, 20]\n40",
    hint: ["`const big = nums.filter(n => n > 6);` then use `reduce` on `big`.", "`const big = nums.filter(n => n > 6);` дараа нь `big` дээр `reduce` ашигла."],
    solution: `const nums = [3, 8, 12, 5, 20];
const big = nums.filter(n => n > 6);
console.log(big);
console.log(big.reduce((sum, n) => sum + n, 0));`
  },
  quiz: [
    { q: ["What is the index of the first item in an array?", "Массивын эхний утгын индекс хэд вэ?"],
      opts: [["0", "0"], ["1", "1"], ["-1", "-1"]],
      a: 0, why: ["Indexes start at 0.", "Индекс 0-ээс эхэлнэ."] },
    { q: ["What is `[\"a\", \"b\", \"c\"].length`?", "`[\"a\", \"b\", \"c\"].length` хэд вэ?"],
      opts: [["2", "2"], ["3", "3"], ["`\"c\"`", "`\"c\"`"]],
      a: 1, why: ["`length` counts the items: there are 3.", "`length` утгын тоог тоолно: 3 байна."] },
    { q: ["Which method keeps only the items that pass a test?", "Аль арга шалгалтад тэнцсэн утгуудыг л үлдээдэг вэ?"],
      opts: [["`map`", "`map`"], ["`push`", "`push`"], ["`filter`", "`filter`"]],
      a: 2, why: ["`filter` keeps items for which the function returns true.", "`filter` нь функц true буцаасан утгуудыг үлдээнэ."] },
    { q: ["What is `[5, 10, 15].map(n => n / 5)`?", "`[5, 10, 15].map(n => n / 5)` юу вэ?"],
      opts: [["`[1, 2, 3]`", "`[1, 2, 3]`"], ["`[5, 10, 15]`", "`[5, 10, 15]`"], ["`30`", "`30`"]],
      a: 0, why: ["`map` runs the function on every item and returns a new array of the results.", "`map` утга бүрт функцийг ажиллуулж, үр дүнгүүдийн шинэ массив буцаана."] }
  ]
});

CG.lessons.push({
  id: "js-objects", track: "js",
  title: ["Objects", "Объект"],
  lead: ["Group related facts under names. A list of objects already looks like a database table.", "Холбоотой мэдээллийг нэрийн дор бүлэглэнэ. Объектуудын жагсаалт аль хэдийн өгөгдлийн сангийн хүснэгт шиг харагддаг."],
  goals: [
    ["Create objects with keys and values", "Түлхүүр, утгатай объект үүсгэх"],
    ["Read, change, add and delete properties", "Шинж чанарыг унших, өөрчлөх, нэмэх, устгах"],
    ["Work with an array of objects", "Объектын массивтай ажиллах"]
  ],
  body: [
    H("Grouping related data", "Холбоотой өгөгдлийг бүлэглэх"),
    P("An **object** groups values under names called **keys** (also called properties). It is written with curly braces `{ }` as `key: value` pairs separated by commas.",
      "**Объект** нь утгуудыг **түлхүүр** (key, шинж чанар) гэх нэрийн дор бүлэглэдэг. Буржгар хаалт `{ }` дотор таслалаар тусгаарласан `түлхүүр: утга` хосоор бичнэ."),
    IDEA("An object is like an ID card. The card has labels such as *name*, *date of birth* and *address*, with a value next to each one. The labels are the keys. You read a value by its label, not by a position number as in an array.",
         "Объект бол иргэний үнэмлэх шиг. Үнэмлэх дээр *нэр*, *төрсөн огноо*, *хаяг* гэх мэт шошго, тус бүрийн хажууд утга бий. Шошго нь түлхүүр. Утгыг массивынх шиг байрлалын дугаараар биш, шошгоор нь уншина."),
    JS(`
const student = {
  name: "Enkhjin",
  age: 19,
  city: "Ulaanbaatar",
  isActive: true
};

console.log(student.name);       // dot notation / цэгээр хандах
console.log(student["city"]);    // bracket notation / хаалтаар хандах
console.log(student);
`),
    WALK("js",
      ["const student = {", "Start an object with `{` and store it in `student`.", "`{`-ээр объект эхлүүлээд `student`-д хадгална."],
      ["  name: \"Enkhjin\",", "One property: the key `name`, a colon, the value `\"Enkhjin\"`, then a comma.", "Нэг шинж чанар: `name` түлхүүр, хоёр цэг, `\"Enkhjin\"` утга, араас нь таслал."],
      ["  isActive: true", "The last property needs no comma. Values can be of any type.", "Сүүлийн шинж чанарт таслал хэрэггүй. Утга ямар ч төрөл байж болно."],
      ["student.name", "Read the value stored under the key `name`: `\"Enkhjin\"`.", "`name` түлхүүрийн доор хадгалсан утгыг уншина: `\"Enkhjin\"`."],
      ["student[\"city\"]", "The same idea with brackets. Use this form when the key is stored in a variable.", "Хаалтаар хандах нь ижил санаа. Түлхүүр хувьсагчид хадгалагдсан үед энэ хэлбэрийг ашигла."]
    ),
    H("Array or object?", "Массив уу, объект уу?"),
    TABLE([["", ""], ["Array", "Массив"], ["Object", "Объект"]],
      [["Brackets", "Хаалт"], "`[ ]`", "`{ }`"],
      [["Find a value by", "Утгыг юугаар олох"], ["its position: `list[0]`", "байрлалаар: `list[0]`"], ["its name: `person.name`", "нэрээр: `person.name`"]],
      [["Best for", "Тохиромжтой"], ["many things of the same kind", "ижил төрлийн олон зүйл"], ["many facts about one thing", "нэг зүйлийн тухай олон баримт"]],
      [["Example", "Жишээ"], "`[\"Bat\", \"Saraa\"]`", "`{ name: \"Bat\", age: 19 }`"]
    ),
    H("Change, add and delete", "Өөрчлөх, нэмэх, устгах"),
    JS(`
const book = { title: "Mongolyn Nuuts Tovchoo", pages: 300 };

book.pages = 320;        // change / өөрчлөх
book.language = "mn";    // add / нэмэх
delete book.pages;       // remove / устгах

console.log(book);
`),
    H("Looping over keys", "Түлхүүрүүдээр давталт хийх"),
    JS(`
const menu = { buuz: 1200, khuushuur: 2500, tsuivan: 9000 };   // ₮

for (const food in menu) {
  console.log(food, "→", menu[food], "₮");
}
console.log(Object.keys(menu));   // ["buuz", "khuushuur", "tsuivan"]
`),
    H("Arrays of objects look like a table", "Объектын массив хүснэгт шиг харагдана"),
    P("A list of objects looks just like a table: each object is a **row**, and each key is a **column**. A database stores data in exactly this shape. That is where the next track begins.",
      "Объектуудын жагсаалт яг л хүснэгт шиг: объект бүр нэг **мөр**, түлхүүр бүр нэг **багана**. Өгөгдлийн сан өгөгдлийг яг ийм хэлбэрээр хадгалдаг. Дараагийн бүлэг эндээс эхэлнэ."),
    JS(`
const students = [
  { name: "Bat",   city: "Ulaanbaatar", gpa: 3.4 },
  { name: "Saraa", city: "Darkhan",     gpa: 3.8 },
  { name: "Nomin", city: "Erdenet",     gpa: 3.6 }
];

console.table(students);   // shows a table / хүснэгтээр харуулна

const best = students.filter(s => s.gpa > 3.5);
console.log(best.map(s => s.name));   // ["Saraa", "Nomin"]
`),
    TIP("Compare the last line with SQL: `SELECT name FROM students WHERE gpa > 3.5;` You will write exactly this in the SQL track.",
        "Сүүлийн мөрийг SQL-тэй харьцуул: `SELECT name FROM students WHERE gpa > 3.5;` SQL бүлэгт та яг үүнийг бичнэ."),
    H("Objects inside objects", "Объект доторх объект"),
    P("A value can itself be an object or an array. Chain dots and brackets to reach values deep inside.",
      "Утга нь өөрөө объект эсвэл массив байж болно. Гүнд байгаа утгад хүрэхийн тулд цэг, хаалтыг дараалуулан бич."),
    JS(`
const student = {
  name: "Anu",
  address: { city: "Murun", aimag: "Khuvsgul" },
  courses: ["Programming", "English"]
};

console.log(student.address.city);    // Murun
console.log(student.courses[1]);      // English
console.log(student.courses.length);  // 2
`),
    H("Functions inside objects", "Объект доторх функц"),
    P("A function stored in an object is called a **method**. You have used methods from the very first lesson: `console.log` is the `log` method of the `console` object, and `Math.floor` belongs to `Math`.",
      "Объект дотор хадгалсан функцийг **арга** (method) гэнэ. Та анхны хичээлээс л арга ашиглаж ирсэн: `console.log` нь `console` объектын `log` арга, `Math.floor` нь `Math`-ийнх."),
    JS(`
const wallet = {
  balance: 20000,   // ₮
  pay(amount) {
    wallet.balance -= amount;
    return wallet.balance;
  }
};

console.log(wallet.pay(4500));   // 15500
console.log(wallet.pay(3000));   // 12500
`),
    H("JSON: objects as text", "JSON: текст хэлбэрийн объект"),
    P("Programs send objects to each other over the internet as text in **JSON** format. `JSON.stringify` turns an object into text, and `JSON.parse` turns the text back into an object. You will meet JSON again in the last SQL lesson.",
      "Програмууд объектыг интернэтээр бие биедээ **JSON** хэлбэрийн текстээр илгээдэг. `JSON.stringify` объектыг текст болгоно, `JSON.parse` текстийг буцаагаад объект болгоно. JSON-той SQL-ийн сүүлийн хичээлд дахин тааралдана."),
    JS(`
const order = { item: "buuz", count: 10, paid: true };

const text = JSON.stringify(order);
console.log(text);           // {"item":"buuz","count":10,"paid":true}
console.log(typeof text);    // string

const back = JSON.parse(text);
console.log(back.count * 1200, "₮");   // 12000 ₮
`),
    H("Common mistakes", "Түгээмэл алдаа"),
    FIX("js",
      `const user = { name: "Bold" };
console.log(user.nmae);   // undefined`,
      `const user = { name: "Bold" };
console.log(user.name);   // Bold`,
      "Reading a key that does not exist is not an error: JavaScript quietly gives `undefined`. When you see an unexpected `undefined`, check the spelling of the key first.",
      "Байхгүй түлхүүрийг уншихад алдаа гардаггүй: JavaScript дуугүйхэн `undefined` өгнө. Санаанд оромгүй `undefined` гарвал эхлээд түлхүүрийн бичлэгийг шалга."),
    FIX("js",
      `const key = "city";
const place = { city: "Khovd" };
console.log(place.key);   // undefined`,
      `const key = "city";
const place = { city: "Khovd" };
console.log(place[key]);  // Khovd`,
      "`place.key` looks for a key literally called *key*. To use the value stored in a variable, write brackets: `place[key]`.",
      "`place.key` нь яг *key* гэдэг нэртэй түлхүүр хайдаг. Хувьсагчид хадгалсан утгыг ашиглахын тулд хаалт бич: `place[key]`."),
    RECAP(
      ["An object groups facts about one thing as `key: value` pairs inside `{ }`.", "Объект нь нэг зүйлийн тухай баримтуудыг `{ }` дотор `түлхүүр: утга` хосоор бүлэглэнэ."],
      ["Read with `obj.key` or `obj[\"key\"]`. Use brackets when the key is in a variable.", "`obj.key` эсвэл `obj[\"key\"]`-ээр уншина. Түлхүүр хувьсагчид байвал хаалт ашигла."],
      ["Assign to change or add a property; `delete` removes one.", "Утга оноож шинж чанарыг өөрчилж, нэмнэ; `delete` хасна."],
      ["Values can be arrays or other objects: `student.address.city`.", "Утга нь массив эсвэл өөр объект байж болно: `student.address.city`."],
      ["A function inside an object is a method, like `console.log`.", "Объект доторх функц бол `console.log` шиг арга (method)."],
      ["An array of objects is a table: each object is a row and each key is a column.", "Объектын массив бол хүснэгт: объект бүр мөр, түлхүүр бүр багана."]
    )
  ],
  exercise: {
    task: ["Create an object `car` with `brand: \"Toyota\"`, `model: \"Prius\"` and `year: 2015`. Using its properties, print: `Toyota Prius (2015)`",
           "`brand: \"Toyota\"`, `model: \"Prius\"`, `year: 2015` бүхий `car` объект үүсгэ. Шинж чанаруудыг нь ашиглан хэвлэ: `Toyota Prius (2015)`"],
    start: `const car = {
  // brand, model, year
};
`,
    expect: "Toyota Prius (2015)",
    hint: ["Use a template string: `\${car.brand} \${car.model} (\${car.year})`", "Template string ашигла: `\${car.brand} \${car.model} (\${car.year})`"],
    solution: `const car = {
  brand: "Toyota",
  model: "Prius",
  year: 2015
};
console.log(\`\${car.brand} \${car.model} (\${car.year})\`);`
  },
  quiz: [
    { q: ["How do you read the `name` of `student`?", "`student`-ийн `name`-ийг хэрхэн унших вэ?"],
      opts: [["`student.name`", "`student.name`"], ["`student(name)`", "`student(name)`"], ["`name.student`", "`name.student`"]],
      a: 0, why: ["Dot notation: object, dot, key.", "Цэгээр хандах: объект, цэг, түлхүүр."] },
    { q: ["An array of objects is most similar to…", "Объектын массив юутай хамгийн төстэй вэ?"],
      opts: [["a single number", "ганц тоо"], ["a table with rows and columns", "мөр, баганатай хүснэгт"], ["a comment", "тайлбар"]],
      a: 1, why: ["Each object is a row; each key is a column.", "Объект бүр мөр, түлхүүр бүр багана."] },
    { q: ["What does `delete book.pages` do?", "`delete book.pages` юу хийдэг вэ?"],
      opts: [["Deletes the whole object", "Объектыг бүхэлд нь устгана"], ["Sets pages to 0", "pages-ийг 0 болгоно"], ["Removes the `pages` property", "`pages` шинж чанарыг хасна"]],
      a: 2, why: ["Only that one key and its value are removed.", "Зөвхөн тэр түлхүүр, түүний утга хасагдана."] },
    { q: ["`const p = { info: { age: 20 } };` How do you read the age?", "`const p = { info: { age: 20 } };` Насыг хэрхэн унших вэ?"],
      opts: [["`p.age`", "`p.age`"], ["`p.info.age`", "`p.info.age`"], ["`p[age]`", "`p[age]`"]],
      a: 1, why: ["`age` lives inside `info`, so go through `info` first.", "`age` нь `info` дотор байгаа тул эхлээд `info`-оор дамжина."] }
  ]
});

CG.lessons.push({
  id: "js-errors", track: "js",
  title: ["Errors and debugging", "Алдаа ба алдаа засах"],
  lead: ["Read error messages calmly and find bugs step by step.", "Алдааны мэдээллийг тайван уншиж, алдааг алхам алхмаар ол."],
  goals: [
    ["Recognise SyntaxError, ReferenceError and TypeError", "SyntaxError, ReferenceError, TypeError-ийг таних"],
    ["Debug by printing values", "Утга хэвлэж алдаа хайх"],
    ["Handle errors with `try / catch`", "`try / catch`-ээр алдааг барих"]
  ],
  body: [
    H("Errors are normal", "Алдаа гаргах нь хэвийн"),
    P("Every programmer sees errors every day. An error message is a clue, not a punishment. Read it carefully: it tells you **what** went wrong and often **where**.",
      "Програмист бүр өдөр бүр алдаатай тулгардаг. Алдааны мэдээлэл бол шийтгэл биш, сэжүүр юм. Анхааралтай унш: **юу** буруу болсныг, ихэнхдээ **хаана** болсныг хэлж өгнө."),
    IDEA("An error message is like a warning light on a car dashboard. It does not mean the car is ruined; it tells you which part needs attention. Learning to read these lights is a big part of becoming a programmer.",
         "Алдааны мэдээлэл бол машины самбар дээрх анхааруулах гэрэл шиг. Энэ нь машин эвдэрсэн гэсэн үг биш; аль хэсэгт анхаарах хэрэгтэйг хэлж байна. Эдгээр гэрлийг уншиж сурах нь програмист болох замын чухал хэсэг."),
    TABLE([["Error", "Алдаа"], ["Meaning", "Утга"], ["Typical cause", "Түгээмэл шалтгаан"]],
      ["SyntaxError", ["The code is not written correctly", "Код буруу бичигдсэн"], ["a missing `)` `}` or quote", "`)` `}` эсвэл хашилт дутуу"]],
      ["ReferenceError", ["A name does not exist", "Ийм нэр байхгүй"], ["a typo, or using a variable before creating it", "үсгийн алдаа, эсвэл үүсгэхээс өмнө ашигласан"]],
      ["TypeError", ["The value is the wrong kind", "Утгын төрөл буруу"], ["reading a property of `undefined`, changing a `const`", "`undefined`-ийн шинж чанарыг унших, `const`-ийг өөрчлөх"]]
    ),
    JS(`
const message = "Hello";
console.log(mesage);   // typo! Run it and read the error.
                       // үсгийн алдаа! Ажиллуулж, алдааг унш.
`),
    JS(`
const user = undefined;
console.log(user.name);   // TypeError
`),
    H("How to read an error message", "Алдааны мэдээллийг хэрхэн унших вэ"),
    P("Take the message `ReferenceError: mesage is not defined` apart. It always has the same three pieces:",
      "`ReferenceError: mesage is not defined` мэдээллийг задлаад үзье. Энэ нь үргэлж ижил гурван хэсэгтэй:"),
    WALK("js",
      ["ReferenceError", "**The type** of error: the kind of problem. Here, a name that does not exist.", "Алдааны **төрөл**: ямар төрлийн асуудал болох. Энд байхгүй нэр."],
      ["mesage", "**What** caused it: the exact name JavaScript could not find. Compare it with the name you meant.", "**Юу** шалтгаалсан бэ: JavaScript-ийн олж чадаагүй яг тэр нэр. Таны бодсон нэртэй харьцуул."],
      ["is not defined", "**Why**: nothing with that name was ever created.", "**Яагаад**: ийм нэртэй зүйл хэзээ ч үүсгэгдээгүй."]
    ),
    H("Debug by printing", "Хэвлэж алдаа хайх"),
    P("When code runs but gives the wrong answer, print the values step by step. Find the first place where a value is not what you expected.",
      "Код ажиллаж байгаа ч буруу хариу гаргаж байвал утгуудыг алхам алхмаар хэвлэ. Утга таны бодсоноос анх зөрсөн газрыг ол."),
    JS(`
// Goal: the average of the scores. It should be 80.
// Зорилго: онооны дундаж. 80 гарах ёстой.
const scores = [70, 80, 90];
let sum = 0;
for (let i = 0; i < scores.length; i++) {
  sum += scores[i];
  console.log("i =", i, "sum =", sum);   // watch it grow / өсөхийг ажигла
}
console.log("average / дундаж:", sum / scores.length);
`),
    H("Logic errors: no message, wrong answer", "Логик алдаа: мэдээлэлгүй, буруу хариу"),
    P("The hardest bugs give no error at all. The code runs, but the answer is wrong: the computer did exactly what you wrote, which was not what you meant. Printing values is the main tool for finding them.",
      "Хамгийн хэцүү алдаа ямар ч мэдээлэл өгдөггүй. Код ажилладаг ч хариу буруу: компьютер таны бодсоныг биш, бичсэнийг чинь яг хийсэн. Ийм алдааг олох гол хэрэгсэл бол утга хэвлэх."),
    FIX("js",
      `const scores = [70, 80, 90];
const average = scores[0] + scores[1] + scores[2] / 3;
console.log(average);   // 180`,
      `const scores = [70, 80, 90];
const average = (scores[0] + scores[1] + scores[2]) / 3;
console.log(average);   // 80`,
      "There is no error message, but 180 cannot be the average of numbers below 100. Always ask *is this answer reasonable?* Here only the last score was divided.",
      "Алдааны мэдээлэл гараагүй ч 100-аас бага тоонуудын дундаж 180 байж боломжгүй. *Энэ хариу бодитой юу?* гэж үргэлж асуу. Энд зөвхөн сүүлийн оноо хуваагдсан."),
    H("try / catch", "try / catch"),
    P("Some errors are expected, for example bad data from the internet. `try` runs risky code; if it fails, `catch` receives the error and the program keeps running.",
      "Зарим алдааг урьдчилан таамаглаж болно, жишээ нь интернэтээс ирсэн буруу өгөгдөл. `try` эрсдэлтэй кодыг ажиллуулна; бүтэлгүйтвэл `catch` алдааг хүлээн авч, програм үргэлжлэн ажиллана."),
    JS(`
try {
  const data = JSON.parse("{ bad json }");
  console.log(data);
} catch (error) {
  console.log("Could not read the data / Өгөгдлийг уншиж чадсангүй");
  console.log(error.name);
}
console.log("The program continues / Програм үргэлжилнэ");
`),
    H("A debugging checklist", "Алдаа хайх жагсаалт"),
    OL(
      ["Read the first line of the error message.", "Алдааны мэдээллийн эхний мөрийг унш."],
      ["Check spelling and capital letters of every name.", "Нэр бүрийн бичлэг, том жижиг үсгийг шалга."],
      ["Count your brackets `( ) { } [ ]` and quotes.", "Хаалт `( ) { } [ ]`, хашилтаа тоол."],
      ["Print values with `console.log` to see what really happens.", "Юу болж байгааг харахын тулд `console.log`-оор утга хэвлэ."],
      ["Change one thing at a time, then run again.", "Нэг удаад нэг л зүйл өөрчлөөд дахин ажиллуул."]
    ),
    H("throw: raise your own error", "throw: өөрийн алдааг үүсгэх"),
    P("Sometimes your own code should refuse to continue, for example when someone tries to pay more than they have. `throw` stops the function with an error, and `catch` decides what to tell the user.",
      "Заримдаа таны код цааш үргэлжлэхээс татгалзах ёстой, жишээ нь хэн нэгэн байгаа мөнгөнөөсөө их төлөх гэж оролдох үед. `throw` функцийг алдаатайгаар зогсоож, хэрэглэгчид юу хэлэхийг `catch` шийднэ."),
    JS(`
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Not enough money / Үлдэгдэл хүрэлцэхгүй");
  }
  return balance - amount;
}

try {
  console.log(withdraw(50000, 20000));   // 30000
  console.log(withdraw(50000, 80000));   // throws / алдаа шиднэ
  console.log("This line is skipped / Энэ мөр алгасагдана");
} catch (error) {
  console.log("Error / Алдаа:", error.message);
}
`),
    FIX("js",
      `function hello() {
  console.log("Сайн уу");

hello();`,
      `function hello() {
  console.log("Сайн уу");
}
hello();`,
      "A missing `}` gives *SyntaxError: Unexpected end of input*: JavaScript reached the end of the code while still waiting for the closing brace. Indenting the code inside every `{ }` makes a missing brace easy to spot.",
      "`}` дутуу бол *SyntaxError: Unexpected end of input* гарна: JavaScript хаах хаалтыг хүлээсээр байтал кодын төгсгөлд хүрсэн гэсэн үг. `{ }` бүрийн доторх кодыг догол мөрөөр бичвэл дутуу хаалт амархан харагдана."),
    RECAP(
      ["Errors are clues. Read the type, the name and the reason.", "Алдаа бол сэжүүр. Төрөл, нэр, шалтгааныг нь унш."],
      ["SyntaxError: the code is written incorrectly. ReferenceError: a name does not exist. TypeError: a value is the wrong kind.", "SyntaxError: код буруу бичигдсэн. ReferenceError: нэр байхгүй. TypeError: утгын төрөл буруу."],
      ["Logic errors give no message. Ask whether the answer is reasonable, and print values step by step.", "Логик алдаа мэдээлэл өгдөггүй. Хариу бодитой эсэхийг асууж, утгуудыг алхам алхмаар хэвлэ."],
      ["`try / catch` handles expected failures; `throw` raises your own error.", "`try / catch` урьдчилан таамагласан алдааг зохицуулна; `throw` өөрийн алдааг үүсгэнэ."],
      ["Change one thing at a time, then run again.", "Нэг удаад нэг л зүйл өөрчлөөд дахин ажиллуул."]
    )
  ],
  exercise: {
    task: ["This code has two bugs. Fix them so it prints `15`.",
           "Энэ кодонд хоёр алдаа бий. `15` хэвлэдэг болгож засаарай."],
    start: `const numbers = [1, 2, 3, 4, 5];
let total = 0;
for (let i = 0; i < numbers.lenght; i++) {
  total += numbers[i];
}
console.log(totl);
`,
    expect: "15",
    hint: ["Look closely at `lenght` and `totl`. Run first and read the error.", "`lenght`, `totl`-ыг анхааралтай хар. Эхлээд ажиллуулж, алдааг унш."],
    solution: `const numbers = [1, 2, 3, 4, 5];
let total = 0;
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}
console.log(total);`
  },
  quiz: [
    { q: ["What does a ReferenceError usually mean?", "ReferenceError ихэвчлэн юуг илэрхийлдэг вэ?"],
      opts: [["A name does not exist, often a typo", "Нэр байхгүй, ихэвчлэн үсгийн алдаа"], ["The internet is down", "Интернэт тасарсан"], ["The computer is too slow", "Компьютер хэт удаан"]],
      a: 0, why: ["JavaScript cannot find a variable or function with that name.", "JavaScript тэр нэртэй хувьсагч, функцийг олж чадахгүй байна."] },
    { q: ["What is the best first step when you see an error?", "Алдаа гарвал хамгийн түрүүнд юу хийх вэ?"],
      opts: [["Delete all the code", "Бүх кодыг устгах"], ["Read the error message", "Алдааны мэдээллийг унших"], ["Restart the computer", "Компьютерийг дахин асаах"]],
      a: 1, why: ["The message names the error type and usually the cause.", "Мэдээлэл алдааны төрөл, ихэнхдээ шалтгааныг нэрлэдэг."] },
    { q: ["What does `catch` do?", "`catch` юу хийдэг вэ?"],
      opts: [["Creates errors", "Алдаа үүсгэнэ"], ["Repeats code", "Код давтана"], ["Receives an error from `try` so the program can continue", "`try`-аас гарсан алдааг хүлээн авч, програмыг үргэлжлүүлнэ"]],
      a: 2, why: ["`try / catch` lets you handle a failure instead of crashing.", "`try / catch` нь програм унахын оронд алдааг зохицуулах боломж олгоно."] },
    { q: ["The code runs without any message but prints the wrong total. What kind of error is it?", "Код ямар ч мэдээлэлгүй ажилладаг ч буруу нийлбэр хэвлэж байна. Энэ ямар алдаа вэ?"],
      opts: [["SyntaxError", "SyntaxError"], ["A logic error", "Логик алдаа"], ["ReferenceError", "ReferenceError"]],
      a: 1, why: ["Logic errors give no message: the code does what you wrote, not what you meant.", "Логик алдаа мэдээлэл өгдөггүй: код таны бодсоныг биш, бичсэнийг хийдэг."] }
  ]
});

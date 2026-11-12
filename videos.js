// Animated walkthroughs / Хөдөлгөөнт тайлбар: one per lesson, played step by step above the lesson text.
// A walkthrough has a title, the code, `sum` (2–3 key points shown before and after), and steps.
// SQL walkthroughs also list `order`: the order the database runs the clauses in.
// Each step can set:
//   head  – a short heading [en, mn];  en / mn – the caption;  note – an extra hint [en, mn]
//   line  – the line(s) being run: 3 or [3, 5];  focus – the part of that line being worked on
//   calc  – how an expression turns into a value, e.g. ["price * count", "2500 * 3", "7500"]
//   vars  – variables after this step ({ name: "value" }, null removes one)
//   out / err – lines added to the output; clear: true empties it first
//   edit  – change code lines ({ 6: "new text" }) from this step on
//   grid  – the data table being looked at ({ title, cols, rows, band })
//   mark  – row states: { keep: [..], drop: [..], hl: [..], bad: [..] }
//   cols / cell – column indexes or one [row, col] cell to highlight in this step only
//   res   – the result table ({ title, cols, rows }), null clears it
//   phase – which clause of `order` the database is running
function V(id, spec) { CG.videos[id] = spec; }

// ---------------- Track 1: JavaScript ----------------

V("js-intro", {
  title: ["Your first program", "Таны анхны програм"],
  sum: [
    ["Code runs line by line, from top to bottom.", "Код мөр мөрөөр, дээрээс доош ажиллана."],
    ["`console.log` writes a value to the output.", "`console.log` утгыг гаралтад бичнэ."],
    ["Text in quotes is printed as it is; maths without quotes is calculated first.", "Хашилттай текст байгаагаараа хэвлэгдэнэ; хашилтгүй тооцоо эхлээд бодогдоно."]
  ],
  code: `
// Greet the world / Мэндчилгээ
console.log("Hello, world!");
console.log("Сайн уу!");
console.log(2 + 3);
console.log("2 + 3");
console.log("Hours in a week:", 7 * 24);
`,
  steps: [
    { line: 1, focus: "//", head: ["A comment", "Тайлбар мөр"],
      en: "Line 1 starts with `//`, so it is a comment: a note for people. The computer skips it, and nothing appears in the output.",
      mn: "1-р мөр `//`-ээр эхэлсэн тул тайлбар: хүнд зориулсан тэмдэглэл. Компьютер үүнийг алгасах тул гаралтад юу ч гарахгүй." },
    { line: 2, focus: "console.log", out: ["Hello, world!"], head: ["Printing text", "Текст хэвлэх"],
      en: "`console` is the output area and `.log` means *write a line*. Whatever is inside the brackets is written there.",
      mn: "`console` бол гаралтын хэсэг, `.log` нь *мөр бичих* гэсэн үг. Хаалт доторх зүйл тэнд бичигдэнэ.",
      note: ["The quotes are not printed. They only mark where the text starts and ends.", "Хашилт хэвлэгдэхгүй. Тэд зөвхөн текстийн эхлэл, төгсгөлийг заана."] },
    { line: 3, out: ["Сайн уу!"], head: ["The next line", "Дараагийн мөр"],
      en: "The computer moves on to the next line. Each `console.log` starts a new line in the output.",
      mn: "Компьютер дараагийн мөр рүү шилжинэ. `console.log` бүр гаралтад шинэ мөр эхлүүлнэ." },
    { line: 4, focus: "2 + 3", calc: ["2 + 3", "5"], out: ["5"], head: ["Calculating", "Тооцоолох"],
      en: "There are no quotes, so JavaScript works it out first: 2 + 3 becomes 5, and then 5 is printed.",
      mn: "Хашилт байхгүй тул JavaScript эхлээд бодно: 2 + 3 нь 5 болж, дараа нь 5 хэвлэгдэнэ." },
    { line: 5, focus: "\"2 + 3\"", out: ["2 + 3"], head: ["Text, not maths", "Тооцоо биш, текст"],
      en: "With quotes, `2 + 3` is just text. It is printed exactly as written, without calculating.",
      mn: "Хашилттай бол `2 + 3` зүгээр текст. Тооцоолохгүйгээр яг бичсэнээрээ хэвлэгдэнэ.",
      note: ["Compare lines 4 and 5: the only difference is the quotes.", "4, 5-р мөрийг харьцуул: ганц ялгаа нь хашилт."] },
    { line: 6, focus: "7 * 24", calc: ["7 * 24", "168"], out: ["Hours in a week: 168"], head: ["Several values", "Хэд хэдэн утга"],
      en: "A comma separates two values. The text is printed as it is, the maths is calculated, and a space goes between them.",
      mn: "Таслал хоёр утгыг тусгаарлана. Текст байгаагаараа хэвлэгдэж, тооцоо бодогдоод, хооронд нь зай авна." },
    { head: ["Done", "Дууслаа"],
      en: "The program reached the last line and stops. The output shows five lines, in the same order as the code.",
      mn: "Програм сүүлийн мөрт хүрээд зогсоно. Гаралтад кодын дарааллаар таван мөр гарсан." }
  ]
});

V("js-variables", {
  title: ["Boxes that remember values", "Утга санадаг хайрцгууд"],
  sum: [
    ["A variable is a named box that holds a value.", "Хувьсагч бол утга хадгалдаг нэртэй хайрцаг."],
    ["`=` puts the value on the right into the box on the left.", "`=` баруун талын утгыг зүүн талын хайрцагт хийнэ."],
    ["A variable keeps a value, not a formula: calculate again after a change.", "Хувьсагч томьёо биш, утга хадгална: өөрчлөлтийн дараа дахин бод."]
  ],
  code: `
const price = 2500;
let count = 3;
let total = price * count;
console.log(total);
count = 5;
total = price * count;
console.log(total);
`,
  steps: [
    { line: 1, focus: "const price", vars: { price: "2500" }, head: ["Create a box", "Хайрцаг үүсгэх"],
      en: "`const price` creates a box named `price`. Then `=` puts 2500 into it.",
      mn: "`const price` нь `price` нэртэй хайрцаг үүсгэнэ. Дараа нь `=` түүн рүү 2500-г хийнэ.",
      note: ["`const` means this value will stay the same.", "`const` нь энэ утга өөрчлөгдөхгүй гэсэн үг."] },
    { line: 2, focus: "let count", vars: { count: "3" }, head: ["A box that can change", "Өөрчлөгдөх хайрцаг"],
      en: "`let count` makes a second box with 3 in it. We choose `let` because the count will change later.",
      mn: "`let count` дотор нь 3 бүхий хоёр дахь хайрцаг үүсгэнэ. Тоо дараа нь өөрчлөгдөх тул `let` сонгоно." },
    { line: 3, focus: "price * count", calc: ["price * count", "2500 * 3", "7500"], vars: { total: "7500" }, head: ["Calculate with boxes", "Хайрцгуудаар бодох"],
      en: "JavaScript replaces each name with the value in its box, works out 2500 × 3 and stores 7500 in a new box, `total`.",
      mn: "JavaScript нэр бүрийг хайрцгийнх нь утгаар орлуулж, 2500 × 3-ыг бодоод, 7500-г шинэ `total` хайрцагт хадгална." },
    { line: 4, focus: "total", out: ["7500"], head: ["Print it", "Хэвлэх"],
      en: "`console.log(total)` prints what is inside `total`, not the word *total*.",
      mn: "`console.log(total)` нь *total* гэдэг үгийг биш, `total` дотор байгаа утгыг хэвлэнэ." },
    { line: 5, vars: { count: "5" }, head: ["Change a value", "Утгыг өөрчлөх"],
      en: "A friend joins. `count = 5` puts a new value in the old box and 3 is gone. There is no `let`, because the box already exists.",
      mn: "Найз нэмэгдлээ. `count = 5` хуучин хайрцагт шинэ утга хийж, 3 арилна. Хайрцаг аль хэдийн байгаа тул `let` бичихгүй.",
      note: ["Look at `total`: it is still 7500. It did not update by itself.", "`total`-ийг хар: 7500 хэвээр байна. Өөрөө шинэчлэгдээгүй."] },
    { line: 6, focus: "price * count", calc: ["price * count", "2500 * 5", "12500"], vars: { total: "12500" }, head: ["Calculate again", "Дахин бодох"],
      en: "To get the right total we have to calculate again. Now `total` holds 12 500.",
      mn: "Зөв нийлбэр гаргахын тулд дахин бодох хэрэгтэй. Одоо `total` дотор 12 500 байна." },
    { line: 7, out: ["12500"], head: ["Print again", "Дахин хэвлэх"],
      en: "The same line of code now prints a different answer, because the box changed in between.",
      mn: "Ижил мөр одоо өөр хариу хэвлэж байна, учир нь хооронд нь хайрцаг өөрчлөгдсөн." }
  ]
});

V("js-types", {
  title: ["Text, numbers and true/false", "Текст, тоо, үнэн/худал"],
  sum: [
    ["Every value has a type: string, number, boolean…", "Утга бүр төрөлтэй: string, number, boolean…"],
    ["`+` adds numbers but glues text together.", "`+` тоог нэмдэг ч текстийг залгадаг."],
    ["`Number()` turns text into a number; template strings put values into text.", "`Number()` текстийг тоо болгоно; template string текст дотор утга оруулна."]
  ],
  code: `
const name = "Nomin";
const age = 19;
const isStudent = true;
console.log(typeof name, typeof age);
console.log(name.length);
console.log("5" + 5);
console.log(Number("5") + 5);
console.log(\`\${name} is \${age}\`);
`,
  steps: [
    { line: 1, focus: "\"Nomin\"", vars: { name: "\"Nomin\"" }, head: ["A string", "Тэмдэгт мөр"],
      en: "Text inside quotes is a **string**. `name` holds the five letters N-o-m-i-n.",
      mn: "Хашилт доторх текст бол **string**. `name` дотор N-o-m-i-n гэсэн таван үсэг байна." },
    { line: 2, focus: "19", vars: { age: "19" }, head: ["A number", "Тоо"],
      en: "No quotes: 19 is a **number**, so you can do maths with it.",
      mn: "Хашилтгүй: 19 бол **number**, тиймээс түүгээр тооцоо хийж болно." },
    { line: 3, focus: "true", vars: { isStudent: "true" }, head: ["A boolean", "Логик утга"],
      en: "`true` without quotes is a **boolean**. A boolean can only be `true` or `false`, like a light switch.",
      mn: "Хашилтгүй `true` бол **boolean**. Boolean нь гэрлийн унтраалга шиг зөвхөн `true` эсвэл `false` байж болно." },
    { line: 4, focus: "typeof name", calc: ["typeof name", "\"string\""], out: ["string number"], head: ["Ask for the type", "Төрлийг асуух"],
      en: "`typeof` tells you the type of any value: `name` is a string and `age` is a number.",
      mn: "`typeof` аливаа утгын төрлийг хэлж өгнө: `name` нь string, `age` нь number." },
    { line: 5, focus: "name.length", calc: ["name.length", "5"], out: ["5"], head: ["Count the letters", "Үсэг тоолох"],
      en: "Every string knows its own length. \"Nomin\" has 5 characters.",
      mn: "String бүр өөрийн уртыг мэддэг. \"Nomin\" 5 тэмдэгттэй." },
    { line: 6, focus: "\"5\" + 5", calc: ["\"5\" + 5", "\"55\""], out: ["55"], head: ["Text + number", "Текст + тоо"],
      en: "One side is text, so `+` glues them together instead of adding. The result is the text \"55\".",
      mn: "Нэг тал нь текст тул `+` нэмэхийн оронд залгана. Үр дүн нь \"55\" гэсэн текст.",
      note: ["Values typed into a web form always arrive as text, so this mistake is very common.", "Вэб маягтад оруулсан утга үргэлж текст байдаг тул энэ алдаа маш түгээмэл."] },
    { line: 7, focus: "Number(\"5\")", calc: ["Number(\"5\") + 5", "5 + 5", "10"], out: ["10"], head: ["Convert first", "Эхлээд хөрвүүлэх"],
      en: "`Number()` turns the text \"5\" into the number 5, so now `+` really adds.",
      mn: "`Number()` нь \"5\" текстийг 5 тоо болгодог тул одоо `+` жинхэнээсээ нэмнэ." },
    { line: 8, focus: "${name}", calc: ["`${name} is ${age}`", "\"Nomin is 19\""], out: ["Nomin is 19"], head: ["Values inside text", "Текст доторх утга"],
      en: "A template string uses backticks. Each `${…}` is replaced by the value of the box named inside it.",
      mn: "Template string нь backtick ашигладаг. `${…}` бүр доторх нэртэй хайрцгийн утгаар солигдоно." }
  ]
});

V("js-operators", {
  title: ["Hours and minutes with / and %", "/ ба %-оор цаг, минут бодох"],
  sum: [
    ["`Math.floor` drops the decimal part; `%` gives the remainder.", "`Math.floor` бутархай хэсгийг хаяна; `%` үлдэгдлийг өгнө."],
    ["`*` and `/` are done before `+` and `-`; brackets come first of all.", "`*`, `/` нь `+`, `-`-ээс түрүүлнэ; хаалт хамгийн түрүүнд."],
    ["Comparisons give `true` or `false`, and `&&` needs both sides to be true.", "Харьцуулалт `true`, `false` өгөх бөгөөд `&&` хоёр талыг хоёуланг нь true байхыг шаардана."]
  ],
  code: `
const minutes = 135;
const hours = Math.floor(minutes / 60);
const rest = minutes % 60;
console.log(hours, "h", rest, "min");
console.log(2 + 3 * 4);
console.log((2 + 3) * 4);
console.log(hours >= 2 && rest > 0);
`,
  steps: [
    { line: 1, vars: { minutes: "135" }, head: ["The question", "Асуулт"],
      en: "A film lasts 135 minutes. How many whole hours and how many extra minutes is that?",
      mn: "Кино 135 минут үргэлжилнэ. Энэ хэдэн бүтэн цаг, хэдэн илүү минут вэ?" },
    { line: 2, focus: "minutes / 60", calc: ["minutes / 60", "135 / 60", "2.25"], head: ["Divide", "Хуваах"],
      en: "The part inside the brackets is done first: 135 / 60 = 2.25 hours.",
      mn: "Хаалт доторх хэсэг түрүүлж бодогдоно: 135 / 60 = 2.25 цаг." },
    { line: 2, focus: "Math.floor", calc: ["Math.floor(2.25)", "2"], vars: { hours: "2" }, head: ["Round down", "Доош бүхэлчлэх"],
      en: "`Math.floor` drops everything after the decimal point, leaving 2 whole hours.",
      mn: "`Math.floor` таслалаас хойших бүгдийг хаяж, 2 бүтэн цаг үлдээнэ." },
    { line: 3, focus: "minutes % 60", calc: ["minutes % 60", "135 % 60", "15"], vars: { rest: "15" }, head: ["The remainder", "Үлдэгдэл"],
      en: "`%` gives what is left after taking out all the whole 60s: 135 − 2 × 60 = 15 minutes.",
      mn: "`%` бүтэн 60-уудыг бүгдийг нь хассаны дараа үлдэхийг өгнө: 135 − 2 × 60 = 15 минут." },
    { line: 4, out: ["2 h 15 min"], head: ["The answer", "Хариу"],
      en: "Print the answer with labels: 2 h 15 min.",
      mn: "Хариуг тайлбартай нь хэвлэнэ: 2 цаг 15 минут." },
    { line: 5, focus: "3 * 4", calc: ["2 + 3 * 4", "2 + 12", "14"], out: ["14"], head: ["Order of operations", "Үйлдлийн дараалал"],
      en: "Multiplication comes before addition: first 3 × 4 = 12, then 2 + 12 = 14.",
      mn: "Үржих нь нэмэхээс түрүүлнэ: эхлээд 3 × 4 = 12, дараа нь 2 + 12 = 14." },
    { line: 6, focus: "(2 + 3)", calc: ["(2 + 3) * 4", "5 * 4", "20"], out: ["20"], head: ["Brackets first", "Эхлээд хаалт"],
      en: "Brackets change the order: 2 + 3 = 5 first, then 5 × 4 = 20.",
      mn: "Хаалт дарааллыг өөрчилнө: эхлээд 2 + 3 = 5, дараа нь 5 × 4 = 20." },
    { line: 7, focus: "hours >= 2 && rest > 0", calc: ["hours >= 2 && rest > 0", "2 >= 2 && 15 > 0", "true && true", "true"], out: ["true"], head: ["Compare and combine", "Харьцуулж, нэгтгэх"],
      en: "Each comparison gives `true` or `false`. `&&` is true only when both sides are true, and here they are.",
      mn: "Харьцуулалт бүр `true` эсвэл `false` өгнө. `&&` хоёр тал хоёулаа true үед л true бөгөөд энд тийм байна." }
  ]
});

V("js-conditions", {
  title: ["How if / else chooses", "if / else хэрхэн сонгодог вэ"],
  sum: [
    ["`if` asks a yes-or-no question and runs its block only on yes.", "`if` тийм/үгүй асуулт асууж, зөвхөн «тийм» үед хэсгээ ажиллуулна."],
    ["`else if` conditions are checked from top to bottom; the first true one wins.", "`else if` нөхцлүүдийг дээрээс доош шалгана; анхны true нь хэрэгжинэ."],
    ["Once one branch runs, the rest are skipped.", "Нэг салаа ажилласны дараа бусад нь алгасагдана."]
  ],
  code: `
const score = 82;
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}
console.log(grade);
`,
  steps: [
    { line: 1, vars: { score: "82" }, head: ["The data", "Өгөгдөл"],
      en: "The student's score is 82. Which grade should they get?",
      mn: "Оюутны оноо 82. Ямар үнэлгээ авах ёстой вэ?" },
    { line: 2, vars: { grade: "undefined" }, head: ["An empty box", "Хоосон хайрцаг"],
      en: "`let grade;` creates the box without a value, so for now it holds `undefined`.",
      mn: "`let grade;` утгагүй хайрцаг үүсгэх тул одоохондоо дотор нь `undefined` байна." },
    { line: 3, focus: "score >= 90", calc: ["score >= 90", "82 >= 90", "false"], head: ["Question 1", "1-р асуулт"],
      en: "Is 82 ≥ 90? **No.** The block for \"A\" is skipped.",
      mn: "82 ≥ 90 юу? **Үгүй.** \"A\"-гийн хэсэг алгасагдана." },
    { line: 5, focus: "score >= 80", calc: ["score >= 80", "82 >= 80", "true"], head: ["Question 2", "2-р асуулт"],
      en: "Is 82 ≥ 80? **Yes!** So JavaScript enters this block.",
      mn: "82 ≥ 80 юу? **Тийм!** Тиймээс JavaScript энэ хэсэг рүү орно." },
    { line: 6, vars: { grade: "\"B\"" }, head: ["Run the block", "Хэсгийг ажиллуулах"],
      en: "Inside the block, `grade` becomes \"B\".",
      mn: "Хэсэг дотор `grade` нь \"B\" болно." },
    { line: [7, 9], head: ["Skip the rest", "Үлдсэнийг алгасах"],
      en: "A match was found, so the `else` part is skipped completely. It is not even checked.",
      mn: "Тохирол олдсон тул `else` хэсгийг бүхэлд нь алгасна. Шалгах ч үгүй." },
    { line: 10, out: ["B"], head: ["The result", "Үр дүн"],
      en: "Print the grade: B.",
      mn: "Үнэлгээг хэвлэнэ: B.",
      note: ["Try it in your head with 95 and with 40. Which line would run each time?", "95, 40 оноогоор толгойдоо туршаад үз. Тус бүрт аль мөр ажиллах вэ?"] }
  ]
});

V("js-loops", {
  title: ["A for loop, round by round", "for давталт, тойрог тойргоор"],
  sum: [
    ["The condition is checked before every round.", "Нөхцөлийг тойрог бүрийн өмнө шалгана."],
    ["`i++` runs after every round.", "`i++` тойрог бүрийн дараа ажиллана."],
    ["The loop stops as soon as the condition is false.", "Нөхцөл false болмогц давталт зогсоно."]
  ],
  code: `
let sum = 0;
for (let i = 1; i <= 3; i++) {
  sum += i;
}
console.log(sum);
`,
  steps: [
    { line: 1, vars: { sum: "0" }, head: ["Start the total", "Нийлбэрийг эхлүүлэх"],
      en: "Before the loop, create a running total: `sum` is 0.",
      mn: "Давталтын өмнө хуримтлагдах нийлбэр үүсгэнэ: `sum` нь 0." },
    { line: 2, focus: "let i = 1", vars: { i: "1" }, head: ["Start the counter", "Тоолуур эхлүүлэх"],
      en: "The first part runs only once: the counter `i` starts at 1.",
      mn: "Эхний хэсэг ганцхан удаа ажиллана: тоолуур `i` 1-ээс эхэлнэ." },
    { line: 2, focus: "i <= 3", calc: ["i <= 3", "1 <= 3", "true"], head: ["Check", "Шалгах"],
      en: "Before each round the condition is checked. 1 ≤ 3 is true, so the body runs.",
      mn: "Тойрог бүрийн өмнө нөхцөлийг шалгана. 1 ≤ 3 нь true тул бие нь ажиллана." },
    { line: 3, focus: "sum += i", calc: ["sum + i", "0 + 1", "1"], vars: { sum: "1" }, head: ["Round 1", "1-р тойрог"],
      en: "`sum += i` adds the counter to the total: `sum` becomes 1.",
      mn: "`sum += i` тоолуурыг нийлбэрт нэмнэ: `sum` нь 1 болно." },
    { line: 2, focus: "i++", calc: ["i <= 3", "2 <= 3", "true"], vars: { i: "2" }, head: ["Next round", "Дараагийн тойрог"],
      en: "`i++` adds 1, so `i` is 2. Check again: 2 ≤ 3 is true.",
      mn: "`i++` 1 нэмэх тул `i` нь 2. Дахин шалгана: 2 ≤ 3 нь true." },
    { line: 3, calc: ["sum + i", "1 + 2", "3"], vars: { sum: "3" }, head: ["Round 2", "2-р тойрог"],
      en: "Round 2: `sum` becomes 3.",
      mn: "2-р тойрог: `sum` нь 3 болно." },
    { line: 2, focus: "i++", calc: ["i <= 3", "3 <= 3", "true"], vars: { i: "3" }, head: ["One more?", "Дахиад уу?"],
      en: "`i` becomes 3. 3 ≤ 3 is still true, because ≤ includes 3 itself.",
      mn: "`i` нь 3 болно. ≤ нь 3-ыг өөрийг нь оролцуулдаг тул 3 ≤ 3 true хэвээр." },
    { line: 3, calc: ["sum + i", "3 + 3", "6"], vars: { sum: "6" }, head: ["Round 3", "3-р тойрог"],
      en: "Round 3: `sum` becomes 6.",
      mn: "3-р тойрог: `sum` нь 6 болно." },
    { line: 2, focus: "i <= 3", calc: ["i <= 3", "4 <= 3", "false"], vars: { i: "4" }, head: ["Stop", "Зогсох"],
      en: "`i` becomes 4. 4 ≤ 3 is **false**, so the loop ends and the body does not run again.",
      mn: "`i` нь 4 болно. 4 ≤ 3 нь **false** тул давталт дуусч, бие нь дахин ажиллахгүй.",
      note: ["`i` reached 4, but the body never ran with 4: the check comes first.", "`i` 4 хүрсэн ч бие нь 4-тэйгээр хэзээ ч ажиллаагүй: шалгалт түрүүлдэг."] },
    { line: 5, vars: { i: null }, out: ["6"], head: ["After the loop", "Давталтын дараа"],
      en: "The program continues after the closing `}`. `i` lived only inside the loop, so it is gone. Print the total: 6.",
      mn: "Програм хаах `}`-ийн дараагаас үргэлжилнэ. `i` зөвхөн давталт дотор байсан тул алга болсон. Нийлбэрийг хэвлэнэ: 6." }
  ]
});

V("js-functions", {
  title: ["What happens when you call a function", "Функц дуудахад юу болдог вэ"],
  sum: [
    ["Defining a function only stores the recipe; calling it runs it.", "Функц тодорхойлох нь зөвхөн жорыг хадгална; дуудахад ажиллана."],
    ["Arguments fill the parameters in order; `return` sends the answer back.", "Аргументууд параметрүүдийг дарааллаар нь бөглөнө; `return` хариуг буцаана."],
    ["Variables inside a function disappear when the call ends.", "Функц доторх хувьсагчид дуудлага дуусахад алга болно."]
  ],
  code: `
function area(width, height) {
  return width * height;
}
const room = area(4, 5);
const hall = area(10, 6);
console.log(room, hall);
`,
  steps: [
    { line: [1, 3], head: ["Define", "Тодорхойлох"],
      en: "These three lines only *define* `area`, like writing a recipe card. Nothing is calculated yet.",
      mn: "Эдгээр гурван мөр зөвхөн `area`-г *тодорхойлно*, жорын карт бичихтэй адил. Одоохондоо юу ч бодогдохгүй." },
    { line: 4, focus: "area(4, 5)", head: ["Call", "Дуудах"],
      en: "Now the function is **called** with the arguments 4 and 5. JavaScript pauses this line and jumps into the function.",
      mn: "Одоо функцийг 4, 5 гэсэн аргументуудтай **дуудна**. JavaScript энэ мөрийг түр орхиж, функц руу үсэрнэ." },
    { line: 1, focus: "width, height", vars: { width: "4", height: "5" }, head: ["Fill the parameters", "Параметрийг бөглөх"],
      en: "The arguments fill the parameters in order: `width` = 4 and `height` = 5.",
      mn: "Аргументууд параметрүүдийг дарааллаар нь бөглөнө: `width` = 4, `height` = 5." },
    { line: 2, focus: "width * height", calc: ["width * height", "4 * 5", "20"], head: ["Return", "Буцаах"],
      en: "Work out 4 × 5 = 20. `return` sends 20 back to the place where the call was made.",
      mn: "4 × 5 = 20-ийг бодно. `return` 20-ийг дуудсан газар руу буцааж илгээнэ." },
    { line: 4, focus: "area(4, 5)", calc: ["area(4, 5)", "20"], vars: { width: null, height: null, room: "20" }, head: ["Back at the call", "Дуудлага руу буцах"],
      en: "The call is replaced by 20, which goes into `room`. `width` and `height` are gone: they existed only during the call.",
      mn: "Дуудлага 20-оор солигдож, `room`-д орно. `width`, `height` алга болсон: тэд зөвхөн дуудлагын үеэр оршсон." },
    { line: 5, focus: "area(10, 6)", calc: ["area(10, 6)", "10 * 6", "60"], vars: { hall: "60" }, head: ["Use it again", "Дахин ашиглах"],
      en: "The same recipe works again with new arguments: 10 × 6 = 60. One function, many uses.",
      mn: "Нэг жор шинэ аргументтай дахин ажиллана: 10 × 6 = 60. Нэг функц, олон хэрэглээ." },
    { line: 6, out: ["20 60"], head: ["Print", "Хэвлэх"],
      en: "Print both results: 20 and 60.",
      mn: "Хоёр үр дүнг хэвлэнэ: 20, 60.",
      note: ["If you forget `return`, the call gives `undefined` instead of the answer.", "`return` мартвал дуудлага хариуны оронд `undefined` өгнө."] }
  ]
});

V("js-arrays", {
  title: ["filter and reduce, step by step", "filter ба reduce алхам алхмаар"],
  sum: [
    ["Array positions start at 0, and `length` counts the items.", "Массивын байрлал 0-ээс эхэлж, `length` утгын тоог тоолно."],
    ["`filter` keeps the items that pass a test, in a new array.", "`filter` шалгалтад тэнцсэн утгуудыг шинэ массивт үлдээнэ."],
    ["`reduce` carries a running total through the array.", "`reduce` массивын дагуу хуримтлагдах нийлбэр авч явна."]
  ],
  code: `
const prices = [1000, 2500, 4000];
const cheap = prices.filter(p => p < 3000);
const total = prices.reduce((sum, p) => sum + p, 0);
console.log(prices[0], prices.length);
console.log(cheap, total);
`,
  steps: [
    { line: 1, vars: { prices: "[1000, 2500, 4000]" }, head: ["An array", "Массив"],
      en: "An array keeps three prices in one box, in order. Their positions are 0, 1 and 2.",
      mn: "Массив гурван үнийг нэг хайрцагт дарааллаар нь хадгална. Байрлал нь 0, 1, 2." },
    { line: 2, focus: "p => p < 3000", head: ["The test", "Шалгалт"],
      en: "`filter` runs the small function `p => p < 3000` on each price, one at a time. `p` stands for the current price.",
      mn: "`filter` нь `p => p < 3000` гэсэн жижиг функцийг үнэ бүр дээр нэг нэгээр ажиллуулна. `p` нь тухайн үеийн үнийг орлоно." },
    { line: 2, calc: ["[1000, 2500, 4000]", "[1000, 2500]"], vars: { cheap: "[1000, 2500]" }, head: ["Keep the yes answers", "«Тийм»-ийг үлдээх"],
      en: "1000 < 3000 and 2500 < 3000 are true, but 4000 < 3000 is false. The passing prices go into a **new** array, `cheap`.",
      mn: "1000 < 3000, 2500 < 3000 нь true, харин 4000 < 3000 нь false. Тэнцсэн үнүүд **шинэ** `cheap` массивт орно.",
      note: ["`prices` itself is not changed.", "`prices` өөрөө өөрчлөгдөхгүй."] },
    { line: 3, focus: ", 0)", vars: { sum: "0" }, head: ["reduce starts", "reduce эхэлнэ"],
      en: "`reduce` walks along the array carrying a running total, `sum`. It starts at the `0` written at the end.",
      mn: "`reduce` массивын дагуу хуримтлагдах нийлбэр `sum`-ийг авч алхана. Төгсгөлд бичсэн `0`-ээс эхэлнэ." },
    { line: 3, focus: "sum + p", calc: ["sum + p", "0 + 1000", "1000"], vars: { sum: "1000" }, head: ["First item", "Эхний утга"],
      en: "Add the first price: the total is now 1000.",
      mn: "Эхний үнийг нэмнэ: нийлбэр одоо 1000." },
    { line: 3, focus: "sum + p", calc: ["sum + p", "1000 + 2500", "3500"], vars: { sum: "3500" }, head: ["Second item", "Хоёр дахь утга"],
      en: "Add the second price: 3500.",
      mn: "Хоёр дахь үнийг нэмнэ: 3500." },
    { line: 3, focus: "sum + p", calc: ["sum + p", "3500 + 4000", "7500"], vars: { sum: null, total: "7500" }, head: ["Last item", "Сүүлийн утга"],
      en: "Add the last price: 7500. That final value is returned and stored in `total`.",
      mn: "Сүүлийн үнийг нэмнэ: 7500. Энэ эцсийн утга буцаагдаж, `total`-д хадгалагдана." },
    { line: 4, focus: "prices[0]", calc: ["prices[0]", "1000"], out: ["1000 3"], head: ["Read by position", "Байрлалаар унших"],
      en: "`prices[0]` reads position 0, the first price. `prices.length` counts the items: 3.",
      mn: "`prices[0]` нь 0-р байрлал буюу эхний үнийг уншина. `prices.length` утгын тоог тоолно: 3." },
    { line: 5, out: ["[1000, 2500] 7500"], head: ["Print", "Хэвлэх"],
      en: "Print the cheap prices and the total.",
      mn: "Хямд үнүүд болон нийлбэрийг хэвлэнэ." }
  ]
});

V("js-objects", {
  title: ["Reading and changing an object", "Объектыг унших, өөрчлөх"],
  sum: [
    ["An object stores facts as `key: value` pairs.", "Объект баримтуудыг `түлхүүр: утга` хосоор хадгална."],
    ["Read with a dot; assign to change a key or to add a new one.", "Цэгээр уншина; утга оноож түлхүүрийг өөрчилж, шинээр нэмнэ."],
    ["`delete` removes a key together with its value.", "`delete` түлхүүрийг утгатай нь хамт хасна."]
  ],
  code: `
const student = { name: "Anu", age: 19 };
console.log(student.name);
student.age = 20;
student.city = "Murun";
delete student.age;
console.log(Object.keys(student));
console.log(student);
`,
  steps: [
    { line: 1, focus: "{ name: \"Anu\", age: 19 }", vars: { student: "{ name: \"Anu\", age: 19 }" }, head: ["Create an object", "Объект үүсгэх"],
      en: "Curly braces make an object. Inside are two `key: value` pairs, separated by a comma.",
      mn: "Буржгар хаалт объект үүсгэнэ. Дотор нь таслалаар тусгаарласан хоёр `түлхүүр: утга` хос бий." },
    { line: 2, focus: "student.name", calc: ["student.name", "\"Anu\""], out: ["Anu"], head: ["Read a value", "Утга унших"],
      en: "Object, dot, key: `student.name` looks up the key `name` and finds \"Anu\".",
      mn: "Объект, цэг, түлхүүр: `student.name` нь `name` түлхүүрийг хайж \"Anu\"-г олно." },
    { line: 3, focus: "student.age = 20", vars: { student: "{ name: \"Anu\", age: 20 }" }, head: ["Change", "Өөрчлөх"],
      en: "Assigning to a key that already exists replaces its value: 19 becomes 20.",
      mn: "Байгаа түлхүүрт утга оноовол утга нь солигдоно: 19 нь 20 болно." },
    { line: 4, focus: "student.city", vars: { student: "{ name: \"Anu\", age: 20, city: \"Murun\" }" }, head: ["Add", "Нэмэх"],
      en: "Assigning to a key that does not exist yet adds a new property.",
      mn: "Хараахан байхгүй түлхүүрт утга оноовол шинэ шинж чанар нэмэгдэнэ." },
    { line: 5, focus: "delete", vars: { student: "{ name: \"Anu\", city: \"Murun\" }" }, head: ["Remove", "Хасах"],
      en: "`delete` removes the key `age` together with its value.",
      mn: "`delete` нь `age` түлхүүрийг утгатай нь хамт хасна." },
    { line: 6, focus: "Object.keys(student)", calc: ["Object.keys(student)", "[\"name\", \"city\"]"], out: ["[\"name\", \"city\"]"], head: ["List the keys", "Түлхүүрүүдийг жагсаах"],
      en: "`Object.keys` gives an array of all the keys that are left.",
      mn: "`Object.keys` үлдсэн бүх түлхүүрийн массивыг өгнө." },
    { line: 7, out: ["{ name: \"Anu\", city: \"Murun\" }"], head: ["Print the object", "Объектыг хэвлэх"],
      en: "Print the whole object as it is now.",
      mn: "Объектыг одоогийн байдлаар нь бүхэлд нь хэвлэнэ.",
      note: ["`student` is a `const`, yet its keys changed. `const` only stops you from replacing the whole object.", "`student` нь `const` атлаа түлхүүрүүд нь өөрчлөгдсөн. `const` зөвхөн объектыг бүхэлд нь солихыг хориглодог."] }
  ]
});

V("js-errors", {
  title: ["Hunting a bug that gives no error", "Мэдээлэлгүй алдааг хайх нь"],
  sum: [
    ["A logic error gives no message, only a wrong answer.", "Логик алдаа мэдээлэл өгөхгүй, зөвхөн буруу хариу өгнө."],
    ["Always ask: is this answer reasonable?", "«Энэ хариу бодитой юу?» гэж үргэлж асуу."],
    ["Check values one by one to find where they go wrong.", "Утгуудыг нэг нэгээр шалгаж, хаана буруу болсныг ол."]
  ],
  code: `
const scores = [70, 80, 90];
let sum = 0;
for (const s of scores) {
  sum += s;
}
const avg = sum / scores.lenght;
console.log(avg);
`,
  steps: [
    { line: [1, 2], vars: { scores: "[70, 80, 90]", sum: "0" }, head: ["The goal", "Зорилго"],
      en: "Goal: the average of three scores. It should be 80.",
      mn: "Зорилго: гурван онооны дундаж. 80 гарах ёстой." },
    { line: [3, 5], calc: ["70 + 80 + 90", "240"], vars: { sum: "240" }, head: ["Add them up", "Нэмэх"],
      en: "The loop adds every score: 70 + 80 + 90 = 240. So far, so good.",
      mn: "Давталт оноо бүрийг нэмнэ: 70 + 80 + 90 = 240. Одоогоор зөв." },
    { line: 6, calc: ["sum / scores.lenght", "NaN"], vars: { avg: "NaN" }, head: ["Divide", "Хуваах"],
      en: "Divide by the number of scores… and `avg` becomes `NaN`. There is no error message at all!",
      mn: "Онооны тоонд хуваана… гэтэл `avg` нь `NaN` боллоо. Алдааны мэдээлэл огт гараагүй!" },
    { line: 7, out: ["NaN"], head: ["Something is wrong", "Ямар нэг юм буруу"],
      en: "NaN means *Not a Number*. The average of 70, 80 and 90 cannot be that, so it is time to investigate.",
      mn: "NaN нь «тоо биш» гэсэн үг. 70, 80, 90-ийн дундаж ийм байж болохгүй тул шалтгааныг хайх цаг боллоо." },
    { line: 6, focus: "sum", calc: ["sum", "240"], head: ["Check one side", "Нэг талыг шалгах"],
      en: "Check the values on line 6 one at a time. `sum` is 240: correct.",
      mn: "6-р мөрийн утгуудыг нэг нэгээр шалга. `sum` нь 240: зөв." },
    { line: 6, focus: "scores.lenght", calc: ["scores.lenght", "undefined"], out: ["undefined"], head: ["Check the other side", "Нөгөө талыг шалгах"],
      en: "`scores.lenght` is `undefined`: the word is misspelled! JavaScript does not complain about a key that does not exist. It quietly gives `undefined`.",
      mn: "`scores.lenght` нь `undefined`: үг буруу бичигдсэн! JavaScript байхгүй түлхүүрийн талаар гомдоллодоггүй. Дуугүйхэн `undefined` өгдөг.",
      note: ["Any maths with `undefined` gives `NaN`.", "`undefined` оролцсон аливаа тооцоо `NaN` өгнө."] },
    { line: 6, edit: { 6: "const avg = sum / scores.length;" }, calc: ["sum / scores.length", "240 / 3", "80"], vars: { avg: "80" }, head: ["Fix it", "Засах"],
      en: "Correct the spelling to `length`: 240 / 3 = 80.",
      mn: "`length` гэж зөв бичнэ: 240 / 3 = 80." },
    { line: 7, clear: true, out: ["80"], head: ["Run again", "Дахин ажиллуулах"],
      en: "Run it again: 80. Checking the values step by step found the bug.",
      mn: "Дахин ажиллуулахад 80 гарна. Утгуудыг алхам алхмаар шалгах нь алдааг олов." }
  ]
});

// ---------------- Track 2: SQL ----------------
// The tables shown come from the practice database in lessons-sql.js, so they match every console.
(function () {
  const S = CG.schema[0].rows, C = CG.schema[1].rows, E = CG.schema[2].rows;
  const pick = (rows, idx) => rows.map((r) => idx.map((i) => r[i]));
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const except = (n, keep) => range(0, n - 1).filter((i) => !keep.includes(i));
  const STUDENT_COLS = ["id", "name", "city", "age", "gpa"];
  const COURSE_COLS = ["id", "title", "credits", "teacher"];

  V("db-intro", {
    title: ["Your first query", "Таны анхны хүсэлт"],
    lang: "sql",
    order: ["FROM", "SELECT"],
    sum: [
      ["The database reads `FROM` first, then `SELECT`.", "Өгөгдлийн сан эхлээд `FROM`, дараа нь `SELECT`-ийг уншина."],
      ["`*` means every column; you can list just the columns you need.", "`*` нь бүх багана; зөвхөн хэрэгтэй баганаа жагсааж болно."],
      ["The result is a new table; the stored data does not change.", "Үр дүн нь шинэ хүснэгт; хадгалсан өгөгдөл өөрчлөгдөхгүй."]
    ],
    code: `
SELECT *
FROM courses;
`,
    steps: [
      { line: 2, phase: "FROM", focus: "FROM courses", grid: { title: "courses", cols: COURSE_COLS, rows: C }, head: ["Find the table", "Хүснэгтийг олох"],
        en: "Although `SELECT` is written first, the database starts with `FROM`: it finds the table you asked about, `courses`.",
        mn: "`SELECT` эхэнд бичигддэг ч өгөгдлийн сан `FROM`-оос эхэлнэ: таны асуусан `courses` хүснэгтийг олно." },
      { line: 1, phase: "SELECT", focus: "*", cols: [0, 1, 2, 3], head: ["Choose the columns", "Багана сонгох"],
        en: "`SELECT *`: the star means *every column*, so all four columns are chosen.",
        mn: "`SELECT *`: од нь *бүх багана* гэсэн утгатай тул дөрвөн багана бүгд сонгогдоно." },
      { line: 1, res: { cols: COURSE_COLS, rows: C }, head: ["The result", "Үр дүн"],
        en: "The answer is a new result table with 5 rows and 4 columns.",
        mn: "Хариу нь 5 мөр, 4 баганатай шинэ үр дүнгийн хүснэгт.",
        note: ["`SELECT` only reads. It never changes the stored data.", "`SELECT` зөвхөн уншдаг. Хадгалсан өгөгдлийг хэзээ ч өөрчилдөггүй."] },
      { line: 1, edit: { 1: "SELECT title, teacher" }, focus: "title, teacher", cols: [1, 3], res: { cols: ["title", "teacher"], rows: pick(C, [1, 3]) }, head: ["Only what you need", "Зөвхөн хэрэгтэйг нь"],
        en: "Change `*` to `title, teacher` and only those two columns come back. Separate column names with commas.",
        mn: "`*`-ийг `title, teacher` болговол зөвхөн тэр хоёр багана ирнэ. Баганын нэрийг таслалаар тусгаарла." },
      { line: 2, focus: ";", head: ["End with a semicolon", "Цэгтэй таслалаар төгсгөх"],
        en: "The semicolon ends the query, like the full stop at the end of a sentence.",
        mn: "Цэгтэй таслал хүсэлтийг өгүүлбэрийн төгсгөлийн цэг шиг дуусгана." },
      { head: ["The idea of SQL", "SQL-ийн санаа"],
        en: "That is the whole idea of SQL: you describe *what* you want, and the database works out *how* to find it.",
        mn: "SQL-ийн гол санаа энэ: та *юу* хүсэж байгаагаа тайлбарлахад өгөгдлийн сан түүнийг *хэрхэн* олохоо өөрөө шийднэ." }
    ]
  });

  V("db-tables", {
    title: ["The parts of a table", "Хүснэгтийн хэсгүүд"],
    lang: "sql",
    sum: [
      ["A row is one item, a column is one kind of fact, a cell is one value.", "Мөр нь нэг зүйл, багана нь нэг төрлийн баримт, нүд нь нэг утга."],
      ["The primary key `id` is different in every row.", "Үндсэн түлхүүр `id` мөр бүрт өөр."],
      ["`NULL` means unknown, not zero.", "`NULL` нь тэг биш, «мэдэгдэхгүй» гэсэн үг."]
    ],
    code: `SELECT * FROM students;`,
    steps: [
      { line: 1, grid: { title: "students", cols: STUDENT_COLS, rows: S }, mark: { hl: [1] }, head: ["A row", "Мөр"],
        en: "This is the `students` table. Each **row** is one student: here is Saraa's row.",
        mn: "Энэ бол `students` хүснэгт. **Мөр** бүр нэг оюутан: энэ бол Saraa-гийн мөр." },
      { line: 1, mark: {}, cols: [2], head: ["A column", "Багана"],
        en: "Each **column** is one kind of fact that every row has, here `city`. A column has a name and a type.",
        mn: "**Багана** бүр мөр бүрт байдаг нэг төрлийн баримт, энд `city`. Багана нэр, төрөлтэй." },
      { line: 1, cell: [1, 2], head: ["A cell", "Нүд"],
        en: "Where a row and a column meet is a **cell**. It holds exactly one value: Darkhan.",
        mn: "Мөр, багана огтлолцсон газар нь **нүд**. Тэнд яг нэг утга байна: Darkhan.",
        note: ["Never put a list such as 'Darkhan, Erdenet' into one cell.", "'Darkhan, Erdenet' гэх мэт жагсаалтыг нэг нүдэнд хэзээ ч бүү бич."] },
      { line: 1, cols: [0], head: ["The primary key", "Үндсэн түлхүүр"],
        en: "`id` is the **primary key**: every student has a different number, so two students with the same name can never be confused.",
        mn: "`id` бол **үндсэн түлхүүр**: оюутан бүр өөр дугаартай тул ижил нэртэй хоёр оюутныг хэзээ ч андуурахгүй." },
      { line: 1, cell: [7, 4], head: ["A missing value", "Дутуу утга"],
        en: "Tuvshin's GPA is empty: `NULL`. It means *unknown*, not zero. A GPA of 0 would be a real, very bad grade.",
        mn: "Tuvshin-ий голч хоосон: `NULL`. Энэ нь тэг биш, «мэдэгдэхгүй» гэсэн үг. 0 голч бол жинхэнэ, маш муу дүн байх байсан." },
      { line: 1, cols: [1, 3, 4], head: ["Types", "Төрөл"],
        en: "Types keep the data clean: `name` is TEXT, `age` is INTEGER (whole numbers) and `gpa` is REAL (decimals).",
        mn: "Төрөл өгөгдлийг цэвэр байлгана: `name` нь TEXT, `age` нь INTEGER (бүхэл тоо), `gpa` нь REAL (бутархай)." },
      { line: 1, head: ["Size", "Хэмжээ"], calc: ["10 rows × 5 columns", "50 cells"],
        en: "This small table has 10 rows and 5 columns. Real tables can have millions of rows, but they are built the same way.",
        mn: "Энэ жижиг хүснэгт 10 мөр, 5 баганатай. Жинхэнэ хүснэгт сая сая мөртэй байж болох ч яг ижил бүтэцтэй." }
    ]
  });

  const first5 = S.slice(0, 5);
  V("sql-select", {
    title: ["Choosing and calculating columns", "Багана сонгох, тооцоолох"],
    lang: "sql",
    order: ["FROM", "SELECT"],
    sum: [
      ["`SELECT` chooses which columns appear in the result.", "`SELECT` үр дүнд аль багана гарахыг сонгоно."],
      ["A calculation in `SELECT` runs once for every row.", "`SELECT` доторх тооцоо мөр бүрт нэг удаа ажиллана."],
      ["`AS` names a new column; the table itself never changes.", "`AS` шинэ баганад нэр өгнө; хүснэгт өөрөө хэзээ ч өөрчлөгдөхгүй."]
    ],
    code: `
SELECT name,
       2026 - age AS birth_year
FROM students;
`,
    steps: [
      { line: 3, phase: "FROM", grid: { title: ["students (first 5 rows)", "students (эхний 5 мөр)"], cols: STUDENT_COLS, rows: first5 }, head: ["Start from the table", "Хүснэгтээс эхлэх"],
        en: "`FROM students`: the database starts from the table.",
        mn: "`FROM students`: өгөгдлийн сан хүснэгтээс эхэлнэ." },
      { line: 1, phase: "SELECT", focus: "name", cols: [1], head: ["Pick a column", "Багана сонгох"],
        en: "`SELECT name` takes the `name` column as it is.",
        mn: "`SELECT name` нь `name` баганыг байгаагаар нь авна." },
      { line: 2, focus: "2026 - age", cols: [3], cell: [0, 3], calc: ["2026 - age", "2026 - 19", "2007"], head: ["Calculate for each row", "Мөр бүрээр бодох"],
        en: "For **each row**, SQL works out 2026 minus `age`. For Bat: 2026 − 19 = 2007.",
        mn: "**Мөр бүрийн** хувьд SQL 2026-аас `age`-ийг хасна. Bat-ийн хувьд: 2026 − 19 = 2007." },
      { line: 2, focus: "2026 - age", cols: [3], cell: [1, 3], calc: ["2026 - age", "2026 - 20", "2006"], head: ["The next row", "Дараагийн мөр"],
        en: "Then the same for Saraa: 2026 − 20 = 2006. One formula, worked out once for every row.",
        mn: "Дараа нь Saraa-д мөн адил: 2026 − 20 = 2006. Нэг томьёо мөр бүрт нэг удаа бодогдоно." },
      { line: 2, focus: "AS birth_year", res: { cols: ["name", "birth_year"], rows: first5.map((r) => [r[1], 2026 - r[3]]) }, head: ["Name the new column", "Шинэ баганад нэр өгөх"],
        en: "`AS birth_year` names the new column. It exists only in the result; the table itself does not change.",
        mn: "`AS birth_year` шинэ баганад нэр өгнө. Энэ багана зөвхөн үр дүнд байх бөгөөд хүснэгт өөрөө өөрчлөгдөхгүй." },
      { head: ["Read it as a sentence", "Өгүүлбэр шиг унших"],
        en: "Read the query like a sentence: *select* the name and the birth year *from* students.",
        mn: "Хүсэлтийг өгүүлбэр шиг унш: students-ээс нэр, төрсөн оныг *сонго*.",
        note: ["The birth year is only approximate: we do not know each student's birthday.", "Төрсөн он ойролцоо: оюутан бүрийн төрсөн өдрийг бид мэдэхгүй."] }
    ]
  });

  const ncg = pick(S, [1, 2, 4]);
  V("sql-where", {
    title: ["WHERE works like a sieve", "WHERE шигшүүр шиг ажилладаг"],
    lang: "sql",
    order: ["FROM", "WHERE", "SELECT"],
    sum: [
      ["`WHERE` checks its condition for every row, one at a time.", "`WHERE` нөхцөлөө мөр бүрт нэг нэгээр шалгана."],
      ["With `AND`, a row must pass both tests.", "`AND`-тэй бол мөр хоёр шалгалтад хоёуланд нь тэнцэх ёстой."],
      ["Rows that fail are left out of the result, never deleted.", "Тэнцээгүй мөр үр дүнд орохгүй ч хэзээ ч устахгүй."]
    ],
    code: `
SELECT name, city, gpa
FROM students
WHERE city = 'Darkhan'
  AND gpa > 3.5;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["name", "city", "gpa"], rows: ncg }, head: ["All rows", "Бүх мөр"],
        en: "`FROM students`: all 10 rows go into the sieve.",
        mn: "`FROM students`: бүх 10 мөр шигшүүрт орно." },
      { line: 3, phase: "WHERE", focus: "city = 'Darkhan'", cell: [0, 1], mark: { drop: [0] }, calc: ["city = 'Darkhan'", "'Ulaanbaatar' = 'Darkhan'", "false"], head: ["Check one row", "Нэг мөрийг шалгах"],
        en: "`WHERE` checks the condition for each row in turn. For Bat it is false, so his row falls through.",
        mn: "`WHERE` нөхцөлийг мөр бүрт ээлжлэн шалгана. Bat-ийн хувьд false тул түүний мөр шигшигдэнэ." },
      { line: 3, focus: "city = 'Darkhan'", cell: [1, 1], mark: { keep: [1], drop: [0] }, calc: ["city = 'Darkhan'", "'Darkhan' = 'Darkhan'", "true"], head: ["The next row", "Дараагийн мөр"],
        en: "For Saraa it is true, so her row stays in the sieve.",
        mn: "Saraa-гийн хувьд true тул түүний мөр шигшүүрт үлдэнэ." },
      { line: 3, cols: [1], mark: { keep: [1, 6], drop: except(10, [1, 6]) }, head: ["Every row", "Бүх мөр"],
        en: "After all 10 rows are checked, only Saraa and Oyunaa are from Darkhan. The other 8 rows fall through.",
        mn: "10 мөрийг бүгдийг шалгасны дараа зөвхөн Saraa, Oyunaa Darkhan-ых. Бусад 8 мөр шигшигдэнэ." },
      { line: 4, focus: "gpa > 3.5", cell: [6, 2], mark: { keep: [1], drop: except(10, [1]) }, calc: ["gpa > 3.5", "3.2 > 3.5", "false"], head: ["The second test", "Хоёр дахь шалгалт"],
        en: "`AND` adds a second test. Oyunaa's GPA is 3.2, so she falls through as well. Saraa (3.8) passes both.",
        mn: "`AND` хоёр дахь шалгалт нэмнэ. Oyunaa-гийн голч 3.2 тул тэр бас шигшигдэнэ. Saraa (3.8) хоёуланд нь тэнцэнэ.",
        note: ["With `AND` a row must pass both tests; with `OR`, one is enough.", "`AND`-тэй бол мөр хоёр шалгалтад хоёуланд нь тэнцэх ёстой; `OR`-той бол нэг нь хангалттай."] },
      { line: 1, phase: "SELECT", res: { cols: ["name", "city", "gpa"], rows: [["Saraa", "Darkhan", 3.8]] }, head: ["Show the columns", "Багана харуулах"],
        en: "Last, `SELECT` shows the chosen columns of the rows that are left: only Saraa.",
        mn: "Эцэст нь `SELECT` үлдсэн мөрүүдийн сонгосон баганыг харуулна: зөвхөн Saraa." },
      { head: ["Nothing deleted", "Юу ч устаагүй"],
        en: "Nothing was deleted. `WHERE` only decides which rows appear in this result. Run another query and all 10 students are still there.",
        mn: "Юу ч устаагүй. `WHERE` зөвхөн энэ үр дүнд аль мөр гарахыг шийднэ. Өөр хүсэлт ажиллуулахад бүх 10 оюутан хэвээрээ байна." }
    ]
  });

  const ng = pick(S, [1, 4]);
  const byGpa = ng.slice().sort((a, b) => (b[1] === null ? -1 : b[1]) - (a[1] === null ? -1 : a[1]));
  V("sql-order", {
    title: ["Sort first, then cut", "Эхлээд эрэмбэлж, дараа нь тасална"],
    lang: "sql",
    order: ["FROM", "SELECT", "ORDER BY", "LIMIT"],
    sum: [
      ["`ORDER BY … DESC` sorts from high to low; `ASC` from low to high.", "`ORDER BY … DESC` ихээс бага руу, `ASC` багаас их рүү эрэмбэлнэ."],
      ["`LIMIT n` keeps only the first n rows.", "`LIMIT n` зөвхөн эхний n мөрийг үлдээнэ."],
      ["The database sorts first and cuts afterwards.", "Өгөгдлийн сан эхлээд эрэмбэлж, дараа нь таслана."]
    ],
    code: `
SELECT name, gpa
FROM students
ORDER BY gpa DESC
LIMIT 3;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["name", "gpa"], rows: ng }, head: ["Start", "Эхлэх"],
        en: "Start with the students in the order they happen to be stored. That order is not guaranteed.",
        mn: "Оюутнуудаас хадгалагдсан дарааллаар нь эхэлнэ. Энэ дараалал баталгаагүй." },
      { line: 1, phase: "SELECT", cols: [0, 1], head: ["Pick columns", "Багана сонгох"],
        en: "`SELECT name, gpa` keeps the two columns we want to see.",
        mn: "`SELECT name, gpa` харахыг хүссэн хоёр баганаа үлдээнэ." },
      { line: 3, phase: "ORDER BY", focus: "gpa DESC", grid: { title: "students", cols: ["name", "gpa"], rows: byGpa }, cols: [1], head: ["Sort", "Эрэмбэлэх"],
        en: "`ORDER BY gpa DESC` sorts from the highest GPA to the lowest. Tuvshin's unknown GPA goes to the end.",
        mn: "`ORDER BY gpa DESC` голчоор ихээс бага руу эрэмбэлнэ. Tuvshin-ий мэдэгдэхгүй голч хамгийн сүүлд орно.",
        note: ["`DESC` means descending, high to low. Without it, the default `ASC` sorts low to high.", "`DESC` нь буурах, ихээс бага гэсэн үг. Үүнгүй бол анхдагч `ASC` багаас их рүү эрэмбэлнэ."] },
      { line: 4, phase: "LIMIT", focus: "LIMIT 3", mark: { keep: [0, 1, 2], drop: range(3, 9) }, head: ["Cut", "Таслах"],
        en: "`LIMIT 3` keeps only the first three rows of the sorted list.",
        mn: "`LIMIT 3` эрэмбэлсэн жагсаалтын эхний гурван мөрийг л үлдээнэ." },
      { res: { cols: ["name", "gpa"], rows: byGpa.slice(0, 3) }, head: ["The result", "Үр дүн"],
        en: "The result: the three students with the highest GPA, best first.",
        mn: "Үр дүн: хамгийн өндөр голчтой гурван оюутан, хамгийн сайн нь эхэндээ." },
      { head: ["Why LIMIT comes last", "LIMIT яагаад сүүлд вэ"],
        en: "The database always sorts first and cuts afterwards, which is why `LIMIT` is written last. Cutting first would give three random students.",
        mn: "Өгөгдлийн сан үргэлж эхлээд эрэмбэлж, дараа нь таслах тул `LIMIT`-ийг хамгийн сүүлд бичдэг. Эхлээд тасалбал дурын гурван оюутан гарах байсан." }
    ]
  });

  const nc = pick(S, [1, 2]);
  const byCity = nc.slice().sort((a, b) => a[1].localeCompare(b[1]));
  const band = byCity.reduce((acc, r, i) => acc.concat(i && r[1] !== byCity[i - 1][1] ? acc[i - 1] + 1 : i ? acc[i - 1] : 0), []);
  const cityCount = byCity.reduce((acc, r) => { acc[r[1]] = (acc[r[1]] || 0) + 1; return acc; }, {});
  const counts = Object.keys(cityCount).map((c) => [c, cityCount[c]]);
  V("sql-aggregate", {
    title: ["GROUP BY makes piles", "GROUP BY овоо болгон бүлэглэнэ"],
    lang: "sql",
    order: ["FROM", "GROUP BY", "HAVING", "SELECT"],
    sum: [
      ["`GROUP BY` sorts the rows into piles, one pile per value.", "`GROUP BY` мөрүүдийг утга бүрээр овоолно."],
      ["`COUNT(*)` gives one number for each pile.", "`COUNT(*)` овоо бүрт нэг тоо өгнө."],
      ["`HAVING` removes whole piles after grouping.", "`HAVING` бүлэглэсний дараа бүхэл овоог хасна."]
    ],
    code: `
SELECT city, COUNT(*) AS total
FROM students
GROUP BY city;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["name", "city"], rows: nc }, head: ["Start", "Эхлэх"],
        en: "Start with all 10 students and their cities.",
        mn: "Бүх 10 оюутан, тэдний хотоос эхэлнэ." },
      { line: 3, phase: "GROUP BY", focus: "GROUP BY city", grid: { title: "students", cols: ["name", "city"], rows: byCity, band: band }, cols: [1], head: ["Make piles", "Овоолох"],
        en: "`GROUP BY city` sorts the rows into piles, one pile per city. There are 5 piles.",
        mn: "`GROUP BY city` мөрүүдийг хот бүрээр нэг овоо болгоно. 5 овоо үүслээ." },
      { line: 1, phase: "SELECT", focus: "COUNT(*)", calc: ["COUNT(*) of Ulaanbaatar", "4"], res: { cols: ["city", "total"], rows: counts }, head: ["Count each pile", "Овоо бүрийг тоолох"],
        en: "`COUNT(*)` counts the rows in each pile, and every pile becomes one row of the result. Ulaanbaatar has 4 students.",
        mn: "`COUNT(*)` овоо бүрийн мөрийг тоолж, овоо бүр үр дүнгийн нэг мөр болно. Ulaanbaatar 4 оюутантай.",
        note: ["10 student rows became 5 city rows.", "10 оюутны мөр 5 хотын мөр боллоо."] },
      { line: 4, phase: "HAVING", edit: { 3: "GROUP BY city", 4: "HAVING COUNT(*) >= 2;" }, focus: "COUNT(*) >= 2", mark: { drop: byCity.map((r, i) => (cityCount[r[1]] < 2 ? i : -1)).filter((i) => i >= 0) }, res: { cols: ["city", "total"], rows: counts.filter((c) => c[1] >= 2) }, head: ["Filter the piles", "Овоог шүүх"],
        en: "Add `HAVING COUNT(*) >= 2`. It runs after grouping and removes whole piles: Khovd and Murun have only one student each.",
        mn: "`HAVING COUNT(*) >= 2` нэмнэ. Энэ бүлэглэсний дараа ажиллаж, бүхэл овоог хасна: Khovd, Murun тус бүр ганц оюутантай.",
        note: ["In the running order, `HAVING` comes before `SELECT`.", "Ажиллах дараалалд `HAVING` нь `SELECT`-ээс өмнө ирнэ."] },
      { head: ["WHERE or HAVING?", "WHERE үү, HAVING үү?"],
        en: "`WHERE` filters single rows before the piles are made; `HAVING` filters whole piles afterwards.",
        mn: "`WHERE` овоо үүсэхээс өмнө нэг нэг мөрийг шүүнэ; `HAVING` дараа нь бүхэл овоог шүүнэ." }
    ]
  });

  const e5 = E.slice(0, 5);
  const joined = e5.map((r) => [S.find((s) => s[0] === r[0])[1], C.find((c) => c[0] === r[1])[1], r[2]]);
  V("sql-join", {
    title: ["How JOIN looks up the names", "JOIN нэрийг хэрхэн хайдаг вэ"],
    lang: "sql",
    order: ["FROM", "JOIN", "SELECT"],
    sum: [
      ["`enrollments` stores only ID numbers.", "`enrollments` зөвхөн ID дугаар хадгална."],
      ["`ON` says which numbers must match.", "`ON` аль дугаарууд таарах ёстойг заана."],
      ["`JOIN` looks up the names for every row at once.", "`JOIN` мөр бүрийн нэрийг нэг дор хайж олно."]
    ],
    code: `
SELECT s.name, c.title, e.score
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: ["enrollments (first 5 rows)", "enrollments (эхний 5 мөр)"], cols: ["student_id", "course_id", "score"], rows: e5 }, head: ["Only numbers", "Зөвхөн дугаар"],
        en: "`enrollments` stores only numbers: which student, which course and what score. No names at all.",
        mn: "`enrollments` зөвхөн дугаар хадгална: аль оюутан, аль хичээл, ямар оноо. Нэр огт алга." },
      { line: 3, phase: "JOIN", focus: "s.id = e.student_id", mark: { hl: [1] }, cell: [1, 0], calc: ["e.student_id", "1", "students: id 1 = Bat"], head: ["Look up the student", "Оюутныг хайх"],
        en: "Take the row `1, 2, 78`. Its `student_id` is 1, so SQL finds the student whose `id` is 1: Bat.",
        mn: "`1, 2, 78` мөрийг авъя. `student_id` нь 1 тул SQL `id` нь 1 оюутныг олно: Bat." },
      { line: 4, focus: "c.id = e.course_id", cell: [1, 1], calc: ["e.course_id", "2", "courses: id 2 = Databases"], head: ["Look up the course", "Хичээлийг хайх"],
        en: "Its `course_id` is 2, so SQL finds the course whose `id` is 2: Databases.",
        mn: "`course_id` нь 2 тул SQL `id` нь 2 хичээлийг олно: Databases." },
      { line: 1, phase: "SELECT", res: { cols: ["name", "title", "score"], rows: [joined[1]] }, head: ["Build the row", "Мөр бүтээх"],
        en: "The pieces are put together into one result row: Bat, Databases, 78.",
        mn: "Хэсгүүдийг нийлүүлж нэг үр дүнгийн мөр болгоно: Bat, Databases, 78." },
      { line: [3, 4], phase: "JOIN", mark: { keep: [0, 1, 2, 3, 4] }, res: { cols: ["name", "title", "score"], rows: joined }, head: ["Every row", "Бүх мөр"],
        en: "`JOIN` does the same lookup for every row of `enrollments` at once.",
        mn: "`JOIN` ийм хайлтыг `enrollments`-ийн мөр бүрийн хувьд нэг дор хийдэг." },
      { head: ["Who is missing?", "Хэн дутуу вэ?"],
        en: "A student with no enrollments, such as Munkh-Erdene, never appears in `enrollments`, so this join leaves them out. That is what `LEFT JOIN` is for.",
        mn: "Хичээл сонгоогүй оюутан, жишээ нь Munkh-Erdene, `enrollments`-д огт байхгүй тул энэ холболт түүнийг орхино. `LEFT JOIN` яг үүнд зориулагдсан." }
    ]
  });

  const low = [[1, 3, 62], [3, 1, 58], [3, 3, 71], [6, 3, 55], [6, 4, 67]];
  const fixed = low.map((r) => [r[0], r[1], r[2] < 60 ? 60 : r[2]]);
  const lowGrid = (rows) => ({ title: ["enrollments (5 of 22 rows)", "enrollments (22-оос 5 мөр)"], cols: ["student_id", "course_id", "score"], rows: rows });
  V("sql-modify", {
    title: ["Look first, then change", "Эхлээд хар, дараа нь өөрчил"],
    lang: "sql",
    sum: [
      ["Run a `SELECT` with the same `WHERE` before changing anything.", "Юм өөрчлөхөөсөө өмнө ижил `WHERE`-тэй `SELECT` ажиллуул."],
      ["`UPDATE … SET` changes only the rows that match `WHERE`.", "`UPDATE … SET` зөвхөн `WHERE`-д тохирох мөрүүдийг өөрчилнө."],
      ["Without `WHERE`, every row changes.", "`WHERE`-гүй бол бүх мөр өөрчлөгдөнө."]
    ],
    code: `
-- 1. Look first / Эхлээд харах
SELECT * FROM enrollments
WHERE score < 60;

-- 2. Then change / Дараа нь өөрчлөх
UPDATE enrollments
SET score = 60
WHERE score < 60;
`,
    steps: [
      { line: [2, 3], focus: "score < 60", grid: lowGrid(low), mark: { hl: [1, 3] }, cols: [2], head: ["Look first", "Эхлээд хар"],
        en: "First **look**: a `SELECT` with the planned `WHERE` shows exactly which rows would change. Two scores are below 60.",
        mn: "Эхлээд **хар**: төлөвлөсөн `WHERE`-тэй `SELECT` аль мөр өөрчлөгдөхийг яг харуулна. 60-аас доош хоёр оноо байна." },
      { line: [6, 8], head: ["Write the change", "Өөрчлөлтөө бичих"],
        en: "Now copy the same `WHERE` into an `UPDATE`. `SET score = 60` says what the new value will be.",
        mn: "Одоо ижил `WHERE`-ийг `UPDATE`-д хуулна. `SET score = 60` шинэ утга ямар байхыг заана." },
      { line: 8, focus: "score < 60", cell: [1, 2], calc: ["score < 60", "58 < 60", "true"], head: ["Check each row", "Мөр бүрийг шалгах"],
        en: "Like `WHERE` in a `SELECT`, it checks every row. For the score 58, 58 < 60 is true, so this row will change.",
        mn: "`SELECT` дэх `WHERE` шиг мөр бүрийг шалгана. 58 онооны хувьд 58 < 60 нь true тул энэ мөр өөрчлөгдөнө." },
      { line: 7, focus: "SET score = 60", grid: lowGrid(fixed), mark: { keep: [1, 3] }, cols: [2], calc: ["58, 55", "60, 60"], head: ["Change", "Өөрчлөх"],
        en: "`SET score = 60` replaces 58 and 55 with 60. The other three rows stay exactly as they were.",
        mn: "`SET score = 60` нь 58, 55-ыг 60-аар солино. Бусад гурван мөр яг хэвээрээ үлдэнэ." },
      { line: 8, edit: { 8: "-- WHERE forgotten! / WHERE мартсан!" }, grid: lowGrid(low.map((r) => [r[0], r[1], 60])), mark: { bad: [0, 1, 2, 3, 4] }, head: ["Danger", "Аюул"],
        en: "Without `WHERE`, the `UPDATE` would change **every** row: all 22 scores would become 60, including the 95s.",
        mn: "`WHERE`-гүй бол `UPDATE` **бүх** мөрийг өөрчилнө: 95 онооны оролцуулаад бүх 22 оноо 60 болох байсан." },
      { line: 8, edit: { 8: "WHERE score < 60;" }, grid: lowGrid(fixed), mark: { keep: [1, 3] }, head: ["A safe habit", "Аюулгүй дадал"],
        en: "Put the `WHERE` back. Look, change, then check again: three small steps that prevent disasters.",
        mn: "`WHERE`-ээ буцааж бич. Харах, өөрчлөх, дахин шалгах: гамшгаас сэргийлэх гурван жижиг алхам." }
    ]
  });

  const pets = (rows) => ({ title: "pets", cols: ["id", "name", "age"], rows: rows });
  V("sql-create", {
    title: ["Rules that guard a table", "Хүснэгтийг хамгаалах дүрмүүд"],
    lang: "sql",
    sum: [
      ["`CREATE TABLE` defines the columns, their types and their rules.", "`CREATE TABLE` багана, төрөл, дүрмийг тодорхойлно."],
      ["`NOT NULL` and `CHECK` refuse rows that break the rules.", "`NOT NULL`, `CHECK` дүрэм зөрчсөн мөрийг хүлээж авахгүй."],
      ["`INTEGER PRIMARY KEY` numbers the rows automatically.", "`INTEGER PRIMARY KEY` мөрүүдийг автоматаар дугаарлана."]
    ],
    code: `
CREATE TABLE pets (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age  INTEGER CHECK (age >= 0)
);
INSERT INTO pets (name, age) VALUES ('Khaliun', 3);
INSERT INTO pets (name, age) VALUES (NULL, 2);
INSERT INTO pets (name, age) VALUES ('Bars', -1);
`,
    steps: [
      { line: [1, 5], grid: pets([]), head: ["An empty table", "Хоосон хүснэгт"],
        en: "`CREATE TABLE pets` makes an empty table: a blank form with no rows yet.",
        mn: "`CREATE TABLE pets` хоосон хүснэгт үүсгэнэ: мөр хараахан алга, бөглөөгүй маягт." },
      { line: 2, focus: "INTEGER PRIMARY KEY", cols: [0], head: ["The ID column", "ID багана"],
        en: "`id` is an `INTEGER PRIMARY KEY`, so SQLite will number the rows for us: 1, 2, 3…",
        mn: "`id` нь `INTEGER PRIMARY KEY` тул SQLite мөрүүдийг бидний өмнөөс дугаарлана: 1, 2, 3…" },
      { line: [3, 4], focus: "NOT NULL", cols: [1, 2], head: ["The rules", "Дүрмүүд"],
        en: "`name` is required (`NOT NULL`), and `age` may not be negative (`CHECK (age >= 0)`).",
        mn: "`name` заавал байх ёстой (`NOT NULL`), `age` сөрөг байж болохгүй (`CHECK (age >= 0)`)." },
      { line: 6, grid: pets([[1, "Khaliun", 3]]), mark: { keep: [0] }, head: ["A correct row", "Зөв мөр"],
        en: "Khaliun, aged 3, breaks no rule, so the row is added. Its `id` 1 was filled in automatically.",
        mn: "3 настай Khaliun ямар ч дүрэм зөрчөөгүй тул мөр нэмэгдлээ. `id` 1 нь автоматаар бөглөгдсөн." },
      { line: 7, focus: "NULL", calc: ["name", "NULL", "✗ NOT NULL"], err: ["NOT NULL constraint failed: pets.name"], head: ["No name", "Нэргүй"],
        en: "A pet without a name breaks the `NOT NULL` rule. The database refuses the whole row and nothing is added.",
        mn: "Нэргүй амьтан `NOT NULL` дүрмийг зөрчинө. Өгөгдлийн сан мөрийг бүхэлд нь хүлээж авахгүй тул юу ч нэмэгдэхгүй." },
      { line: 8, focus: "-1", calc: ["age >= 0", "-1 >= 0", "false"], err: ["CHECK constraint failed: age >= 0"], head: ["A negative age", "Сөрөг нас"],
        en: "The `CHECK` rule works out -1 ≥ 0, gets false, and refuses this row as well.",
        mn: "`CHECK` дүрэм -1 ≥ 0-ийг бодоод false гаргаж, энэ мөрийг ч мөн хүлээж авахгүй." },
      { head: ["Protected", "Хамгаалагдсан"],
        en: "The rules guard the table: only the correct row got in. Bad data is stopped at the door, not cleaned up later.",
        mn: "Дүрмүүд хүснэгтийг хамгаалж байна: зөвхөн зөв мөр орж чадлаа. Муу өгөгдлийг дараа нь цэвэрлэх биш, үүдэнд нь зогсоодог." }
    ]
  });

  const big = [["Bat", "Programming", "Dorj", "9911 2233"], ["Saraa", "Programming", "Dorj", "9911 2233"], ["Nomin", "Programming", "Dorj", "9911 2233"]];
  const bigGrid = (rows) => ({ title: ["one big table", "нэг том хүснэгт"], cols: ["student", "course", "teacher", "teacher_phone"], rows: rows });
  const teachers = { title: "teachers", cols: ["id", "name", "phone"], rows: [[1, "Dorj", "9911 2233"]] };
  V("db-design", {
    title: ["Store each fact once", "Баримт бүрийг нэг удаа хадгал"],
    lang: "sql",
    sum: [
      ["Repeating a fact in many rows invites contradictions.", "Нэг баримтыг олон мөрөнд давтах нь зөрчил үүсгэдэг."],
      ["Store each fact once, in its own table.", "Баримт бүрийг өөрийн хүснэгтэд нэг удаа хадгал."],
      ["Link tables with a foreign key instead of copying.", "Хуулахын оронд хүснэгтүүдийг гадаад түлхүүрээр холбо."]
    ],
    code: `
CREATE TABLE teachers (
  id    INTEGER PRIMARY KEY,
  name  TEXT,
  phone TEXT
);
CREATE TABLE courses (
  id         INTEGER PRIMARY KEY,
  title      TEXT,
  teacher_id INTEGER REFERENCES teachers(id)
);
`,
    steps: [
      { grid: bigGrid(big), cols: [2, 3], head: ["One big table", "Нэг том хүснэгт"],
        en: "In one big table, the teacher's name and phone are copied into every row: the same fact three times.",
        mn: "Нэг том хүснэгтэд багшийн нэр, утас мөр бүрт хуулагдсан: нэг баримт гурван удаа." },
      { grid: bigGrid([big[0], big[1], ["Nomin", "Programming", "Dorj", "9911 2234"]]), mark: { bad: [2] }, cell: [2, 3], head: ["A contradiction", "Зөрчил"],
        en: "Mistype one copy and the table contradicts itself. Which number is right? The database cannot tell.",
        mn: "Нэг хувийг нь буруу бичихэд хүснэгт өөртэйгөө зөрчилдөнө. Аль дугаар нь зөв бэ? Өгөгдлийн сан ялгаж чадахгүй." },
      { line: [1, 5], grid: teachers, cell: [0, 2], head: ["Store it once", "Нэг удаа хадгалах"],
        en: "The fix: store each teacher **once**, in a `teachers` table. The phone now lives in exactly one place.",
        mn: "Засах арга: багш бүрийг `teachers` хүснэгтэд **нэг** удаа хадгална. Утас одоо яг нэг газар байна." },
      { line: 9, focus: "teacher_id INTEGER REFERENCES teachers(id)", res: { title: "courses", cols: ["id", "title", "teacher_id"], rows: [[1, "Programming", 1]] }, calc: ["teacher_id", "1", "teachers: id 1 = Dorj"], head: ["Point, don't copy", "Хуулах биш, заах"],
        en: "A course does not copy the name and the phone. It points to the teacher by number, with the foreign key `teacher_id`.",
        mn: "Хичээл багшийн нэр, утсыг хуулахгүй. Гадаад түлхүүр `teacher_id`-аар багшийг дугаараар нь заана." },
      { mark: { keep: [0] }, cell: [0, 2], head: ["One change", "Ганц өөрчлөлт"],
        en: "To change the phone you now update one single row, and every course sees the new number straight away.",
        mn: "Утсыг солихын тулд одоо ганцхан мөр шинэчилнэ, бүх хичээл шинэ дугаарыг тэр дор нь харна." }
    ]
  });

  const saraa = E.filter((r) => r[0] === 2).map((r) => ({ title: C.find((c) => c[0] === r[1])[1], score: r[2] }));
  V("db-code", {
    title: ["A request from button to database and back", "Товчноос өгөгдлийн сан хүртэл, буцаад"],
    sum: [
      ["The browser talks to the server, and only the server talks to the database.", "Хөтөч сервертэй, зөвхөн сервер өгөгдлийн сантай харилцдаг."],
      ["The value travels apart from the SQL, through a placeholder such as `$1`.", "Утга SQL-ээс тусдаа, `$1` шиг орлуулагчаар дамжиж явна."],
      ["`await` waits for the answer, which arrives as an array of objects.", "`await` хариуг хүлээж, хариу объектын массив болж ирнэ."]
    ],
    code: `
async function getGrades(studentId) {
  const result = await db.query(
    "SELECT c.title, e.score FROM enrollments e " +
    "JOIN courses c ON c.id = e.course_id WHERE e.student_id = $1",
    [studentId]
  );
  return result.rows;
}
`,
    steps: [
      { head: ["The click", "Товч дарах"],
        en: "You press «Show my grades». The browser sends the request to the server, never straight to the database.",
        mn: "Та «Дүнгээ харах» товч дарна. Хөтөч хүсэлтийг өгөгдлийн сан руу шууд биш, сервер рүү илгээнэ." },
      { line: 1, focus: "studentId", vars: { studentId: "2" }, head: ["The server function", "Серверийн функц"],
        en: "The server's function is called with the student's number: `studentId` is 2.",
        mn: "Серверийн функц оюутны дугаартай дуудагдана: `studentId` нь 2." },
      { line: [3, 4], focus: "$1", head: ["Prepare the SQL", "SQL бэлдэх"],
        en: "It prepares the SQL. Instead of gluing 2 into the text, it writes the placeholder `$1`.",
        mn: "SQL бэлдэнэ. 2-ыг текстэд залгахын оронд `$1` орлуулагч бичнэ." },
      { line: 5, focus: "[studentId]", calc: ["$1", "studentId", "2"], head: ["Send the value apart", "Утгыг тусад нь илгээх"],
        en: "The value travels separately, in `[studentId]`. The database fills `$1` with it as plain data, never as SQL.",
        mn: "Утга `[studentId]` дотор тусдаа явна. Өгөгдлийн сан `$1`-ийг үүгээр SQL биш, энгийн өгөгдөл байдлаар бөглөнө.",
        note: ["This is what stops SQL injection.", "SQL injection-оос яг үүгээр сэргийлдэг."] },
      { line: 2, focus: "await", vars: { result: "{ rows: [ … " + saraa.length + " rows … ] }" }, head: ["Wait for the answer", "Хариуг хүлээх"],
        en: "`await` waits while the database runs the query, usually on another computer. The answer arrives in `result`.",
        mn: "Өгөгдлийн сан хүсэлтийг ихэвчлэн өөр компьютер дээр ажиллуулах хооронд `await` хүлээнэ. Хариу `result`-д ирнэ." },
      { line: 7, focus: "result.rows", out: [JSON.stringify(saraa)], head: ["Rows become objects", "Мөрүүд объект болно"],
        en: "`result.rows` is an array of objects, one per row. The server sends it to the browser as JSON.",
        mn: "`result.rows` бол мөр бүрт нэг объект бүхий массив. Сервер үүнийг хөтөч рүү JSON болгож илгээнэ." },
      { head: ["On the screen", "Дэлгэц дээр"],
        en: "The page turns the JSON into a list and you see your grades. Browser, server and database each did their own job.",
        mn: "Хуудас JSON-ийг жагсаалт болгож, та дүнгээ харна. Хөтөч, сервер, өгөгдлийн сан тус бүр өөрийн ажлаа хийлээ." }
    ]
  });
})();

// ---------------- Section walkthroughs ----------------
// Keys "lesson-id#name" sit inside the lesson, under the heading given in `at` (its English text).

V("js-intro#errors", {
  at: "Common first mistakes",
  title: ["What an error does to a program", "Алдаа програмд юу хийдэг вэ"],
  sum: [
    ["An error stops the program at the line where it happens.", "Алдаа гарсан мөр дээрээ програмыг зогсооно."],
    ["Text without quotes is read as a name; a name that does not exist gives a ReferenceError.", "Хашилтгүй текстийг нэр гэж уншдаг; байхгүй нэр ReferenceError өгнө."],
    ["Fix one thing, then run again from the top.", "Нэг зүйлийг засаад, дахин эхнээс нь ажиллуул."]
  ],
  code: `
console.log("Start");
console.log(Hello);
console.log("End");
`,
  steps: [
    { line: 1, out: ["Start"], head: ["Line 1 works", "1-р мөр ажиллана"],
      en: "The first line is fine: \"Start\" is printed.",
      mn: "Эхний мөр зөв: \"Start\" хэвлэгдэнэ." },
    { line: 2, focus: "Hello", head: ["A name, not text", "Текст биш, нэр"],
      en: "There are no quotes around `Hello`, so JavaScript reads it as the name of a box and goes looking for it. No box called `Hello` was ever created.",
      mn: "`Hello`-г хашилтад бичээгүй тул JavaScript үүнийг хайрцгийн нэр гэж уншаад хайж эхэлнэ. `Hello` нэртэй хайрцаг хэзээ ч үүсээгүй." },
    { line: 2, err: ["ReferenceError: Hello is not defined"], head: ["The program stops", "Програм зогсоно"],
      en: "JavaScript reports a ReferenceError and stops right here.",
      mn: "JavaScript ReferenceError мэдээлээд яг энд зогсоно.",
      note: ["Line 3 never runs: nothing after an error happens.", "3-р мөр огт ажиллахгүй: алдааны дараах юу ч болохгүй."] },
    { line: 2, edit: { 2: "console.log(\"Hello\");" }, focus: "\"Hello\"", head: ["Fix it", "Засах"],
      en: "Add the quotes. Now `\"Hello\"` is text again, not a name.",
      mn: "Хашилт нэмнэ. Одоо `\"Hello\"` нэр биш, дахин текст боллоо." },
    { line: [1, 3], clear: true, out: ["Start", "Hello", "End"], head: ["Run again", "Дахин ажиллуулах"],
      en: "Run the program again from the top. All three lines run, in order.",
      mn: "Програмыг эхнээс нь дахин ажиллуулна. Гурван мөр бүгд дарааллаараа ажиллана." }
  ]
});

V("js-variables#const", {
  at: "let and const",
  title: ["let can change, const cannot", "let өөрчлөгдөнө, const үгүй"],
  sum: [
    ["`x = x + 5` means: take the old value, add 5, store the result.", "`x = x + 5` нь: хуучин утгыг авч, 5 нэмээд, үр дүнг хадгал гэсэн үг."],
    ["A `const` box is sealed; changing it is a TypeError.", "`const` хайрцаг битүүмжлэгдсэн; өөрчлөх нь TypeError."],
    ["Use `const` for values that stay fixed and `let` for values that change.", "Тогтмол утгад `const`, өөрчлөгдөх утгад `let` хэрэглэ."]
  ],
  code: `
let score = 10;
score = score + 5;
const pi = 3.14;
pi = 3;
console.log(score, pi);
`,
  steps: [
    { line: 1, vars: { score: "10" }, head: ["A let box", "let хайрцаг"],
      en: "`let` creates a box whose value is allowed to change.",
      mn: "`let` утга нь өөрчлөгдөж болох хайрцаг үүсгэнэ." },
    { line: 2, focus: "score + 5", calc: ["score + 5", "10 + 5", "15"], vars: { score: "15" }, head: ["Read, then write", "Уншаад, бичих"],
      en: "The right side is worked out first, using the old value: 10 + 5 = 15. Then 15 is written back into the same box.",
      mn: "Баруун талыг хуучин утгаар нь эхэлж бодно: 10 + 5 = 15. Дараа нь 15-ыг мөн тэр хайрцагт буцааж бичнэ.",
      note: ["`score = score + 5` is not an equation from maths. It is an instruction.", "`score = score + 5` бол математикийн тэгшитгэл биш. Энэ бол заавар."] },
    { line: 3, vars: { pi: "3.14" }, head: ["A const box", "const хайрцаг"],
      en: "`const` creates a sealed box: its value can never be replaced.",
      mn: "`const` битүүмжилсэн хайрцаг үүсгэнэ: утгыг нь хэзээ ч сольж болохгүй." },
    { line: 4, focus: "pi = 3", err: ["TypeError: Assignment to constant variable."], head: ["Not allowed", "Хориотой"],
      en: "Trying to put 3 into `pi` breaks the seal. JavaScript stops with a TypeError, and line 5 never runs.",
      mn: "`pi`-д 3 хийх гэх нь битүүмжийг эвдэнэ. JavaScript TypeError өгч зогсох тул 5-р мөр ажиллахгүй." },
    { line: 4, edit: { 4: "// pi stays 3.14 / pi нь 3.14 хэвээр" }, head: ["The fix", "Засвар"],
      en: "Leave `pi` alone, or create it with `let` if it really must change.",
      mn: "`pi`-г бүү өөрчил, эсвэл заавал өөрчлөгдөх ёстой бол `let`-ээр үүсгэ." },
    { line: 5, clear: true, out: ["15 3.14"], head: ["Run again", "Дахин ажиллуулах"],
      en: "Without the forbidden line, the program reaches the end and prints 15 and 3.14.",
      mn: "Хориотой мөргүйгээр програм төгсгөлдөө хүрч, 15, 3.14-ийг хэвлэнэ." }
  ]
});

V("js-types#text", {
  at: "Useful things you can do with text",
  title: ["Tools for text", "Текстийн хэрэгслүүд"],
  sum: [
    ["Text tools give you a new string; the original never changes.", "Текстийн хэрэгслүүд шинэ текст буцаадаг; анхных хэзээ ч өөрчлөгдөхгүй."],
    ["Positions in a string start at 0.", "Текст доторх байрлал 0-ээс эхэлнэ."],
    ["`slice(a, b)` stops just before position b.", "`slice(a, b)` нь b байрлалын яг өмнө зогсдог."]
  ],
  code: `
const city = "  Ulaanbaatar  ";
const clean = city.trim();
console.log(clean.length);
console.log(clean.toUpperCase());
console.log(clean.slice(0, 4));
console.log(clean.includes("baatar"));
`,
  steps: [
    { line: 1, vars: { city: "\"  Ulaanbaatar  \"" }, head: ["Messy text", "Замбараагүй текст"],
      en: "Text typed by a person often has extra spaces at the start and the end.",
      mn: "Хүний бичсэн текстэд эхэнд, төгсгөлд нь илүү зай байх нь элбэг." },
    { line: 2, focus: "city.trim()", calc: ["\"  Ulaanbaatar  \"", "\"Ulaanbaatar\""], vars: { clean: "\"Ulaanbaatar\"" }, head: ["trim", "trim"],
      en: "`.trim()` removes the spaces at both ends and gives a **new** string. `city` itself is unchanged.",
      mn: "`.trim()` хоёр захын зайг арилгаж, **шинэ** текст өгнө. `city` өөрөө өөрчлөгдөхгүй." },
    { line: 3, focus: "clean.length", calc: ["clean.length", "11"], out: ["11"], head: ["Count the characters", "Тэмдэгт тоолох"],
      en: "`.length` counts every character: U-l-a-a-n-b-a-a-t-a-r makes 11.",
      mn: "`.length` тэмдэгт бүрийг тоолно: U-l-a-a-n-b-a-a-t-a-r нийт 11." },
    { line: 4, focus: "toUpperCase()", calc: ["clean.toUpperCase()", "\"ULAANBAATAR\""], out: ["ULAANBAATAR"], head: ["Capital letters", "Том үсэг"],
      en: "`.toUpperCase()` gives the same text in capital letters.",
      mn: "`.toUpperCase()` ижил текстийг том үсгээр өгнө." },
    { line: 5, focus: "slice(0, 4)", calc: ["clean.slice(0, 4)", "clean[0] … clean[3]", "\"Ulaa\""], out: ["Ulaa"], head: ["Cut a piece", "Хэсэг таслах"],
      en: "`.slice(0, 4)` copies the characters from position 0 up to, but not including, position 4. That is 4 characters.",
      mn: "`.slice(0, 4)` 0-р байрлалаас 4-р байрлал хүртэл (4-ийг оруулахгүй) тэмдэгтүүдийг хуулна. Энэ нь 4 тэмдэгт.",
      note: ["Positions start at 0, so the first letter is `clean[0]`.", "Байрлал 0-ээс эхэлдэг тул эхний үсэг нь `clean[0]`."] },
    { line: 6, focus: "includes(\"baatar\")", calc: ["clean.includes(\"baatar\")", "true"], out: ["true"], head: ["Search inside", "Дотроос нь хайх"],
      en: "`.includes` answers a yes-or-no question: is this text inside? \"baatar\" is, so the answer is `true`.",
      mn: "`.includes` тийм/үгүй асуултад хариулна: энэ текст дотор нь байна уу? \"baatar\" байгаа тул хариу нь `true`." }
  ]
});

V("js-operators#logic", {
  at: "Logical operators",
  title: ["AND, OR and NOT at work", "БА, ЭСВЭЛ, ҮГҮЙСГЭЛ хэрхэн ажилладаг вэ"],
  sum: [
    ["Each comparison is worked out first, then the logic.", "Харьцуулалт бүрийг эхлээд бодож, дараа нь логикийг бодно."],
    ["`&&` needs both sides true; `||` needs at least one.", "`&&` хоёр талыг хоёуланг нь, `||` дор хаяж нэгийг нь true байхыг шаардана."],
    ["`!` turns true into false and false into true.", "`!` true-г false, false-г true болгоно."]
  ],
  code: `
const age = 16;
const withParent = true;
console.log(age >= 18 && withParent);
console.log(age >= 18 || withParent);
console.log(!withParent);
`,
  steps: [
    { line: [1, 2], vars: { age: "16", withParent: "true" }, head: ["The facts", "Баримт"],
      en: "A 16-year-old comes to a film with a parent. May they go in?",
      mn: "16 настай хүүхэд кинонд эцэг эхтэйгээ ирлээ. Орж болох уу?" },
    { line: 3, focus: "age >= 18", calc: ["age >= 18", "16 >= 18", "false"], head: ["First, the comparison", "Эхлээд харьцуулалт"],
      en: "Each side is worked out first. 16 ≥ 18 is false.",
      mn: "Тал бүрийг эхлээд бодно. 16 ≥ 18 нь false." },
    { line: 3, focus: "&&", calc: ["false && true", "false"], out: ["false"], head: ["AND (&&)", "БА (&&)"],
      en: "`&&` needs **both** sides to be true. One side is false, so the answer is false.",
      mn: "`&&` **хоёр** талыг хоёуланг нь true байхыг шаардана. Нэг тал нь false тул хариу нь false.",
      note: ["As soon as the left side of `&&` is false, JavaScript does not even look at the right side.", "`&&`-ийн зүүн тал false болмогц JavaScript баруун талыг харах ч үгүй."] },
    { line: 4, focus: "||", calc: ["false || true", "true"], out: ["true"], head: ["OR (||)", "ЭСВЭЛ (||)"],
      en: "`||` needs **at least one** side to be true. `withParent` is true, so the answer is true: they may go in.",
      mn: "`||` **дор хаяж нэг** талыг true байхыг шаардана. `withParent` нь true тул хариу нь true: орж болно." },
    { line: 5, focus: "!withParent", calc: ["!withParent", "!true", "false"], out: ["false"], head: ["NOT (!)", "ҮГҮЙСГЭЛ (!)"],
      en: "`!` flips a boolean: not true is false.",
      mn: "`!` логик утгыг эсрэгээр нь эргүүлнэ: true биш бол false." }
  ]
});

V("js-conditions#switch", {
  at: "switch: one value, many fixed choices",
  title: ["How switch finds its case", "switch хэрхэн case-ээ олдог вэ"],
  sum: [
    ["`switch` compares one value with each `case`, from the top, using `===`.", "`switch` нэг утгыг `case` бүртэй дээрээс нь `===`-ээр харьцуулна."],
    ["`break` jumps out of the whole `switch`.", "`break` `switch`-ээс бүхэлд нь гарна."],
    ["`default` runs only when no case matches.", "`default` ямар ч case таараагүй үед л ажиллана."]
  ],
  code: `
const day = 3;
let name;
switch (day) {
  case 1: name = "Даваа"; break;
  case 2: name = "Мягмар"; break;
  case 3: name = "Лхагва"; break;
  default: name = "Амралт";
}
console.log(name);
`,
  steps: [
    { line: [1, 2], vars: { day: "3", name: "undefined" }, head: ["The value", "Утга"],
      en: "`day` is 3 (Wednesday). `name` is still empty.",
      mn: "`day` нь 3 (Лхагва гараг). `name` хоосон хэвээр." },
    { line: 3, focus: "switch (day)", head: ["Compare day", "day-г харьцуулах"],
      en: "`switch` takes one value, `day`, and compares it with each `case` from the top.",
      mn: "`switch` нэг утга буюу `day`-г авч, `case` бүртэй дээрээс нь харьцуулна." },
    { line: 4, focus: "case 1", calc: ["day === 1", "3 === 1", "false"], head: ["case 1", "case 1"],
      en: "3 === 1 is false, so this line is skipped.",
      mn: "3 === 1 нь false тул энэ мөрийг алгасна." },
    { line: 5, focus: "case 2", calc: ["day === 2", "3 === 2", "false"], head: ["case 2", "case 2"],
      en: "3 === 2 is false too.",
      mn: "3 === 2 ч мөн false." },
    { line: 6, focus: "case 3", calc: ["day === 3", "3 === 3", "true"], vars: { name: "\"Лхагва\"" }, head: ["A match", "Тохирлоо"],
      en: "3 === 3 is true! `name` becomes \"Лхагва\".",
      mn: "3 === 3 нь true! `name` нь \"Лхагва\" болно." },
    { line: 6, focus: "break", head: ["break", "break"],
      en: "`break` jumps out of the whole `switch`, so the `default` line is skipped.",
      mn: "`break` `switch`-ээс бүхэлд нь гарах тул `default` мөр алгасагдана.",
      note: ["Without `break`, the code would carry on into the next lines and overwrite `name` with \"Амралт\".", "`break`-гүй бол код дараагийн мөрүүд рүү үргэлжилж, `name`-ийг \"Амралт\"-аар дарж бичих байсан."] },
    { line: 9, out: ["Лхагва"], head: ["The result", "Үр дүн"],
      en: "Print the day's name: Лхагва.",
      mn: "Гарагийн нэрийг хэвлэнэ: Лхагва." }
  ]
});

V("js-conditions#truthy", {
  at: "Truthy and falsy values",
  title: ["Checking an empty form field", "Хоосон талбарыг шалгах"],
  sum: [
    ["`if` also accepts values that are not booleans.", "`if` boolean биш утгыг ч хүлээн авдаг."],
    ["Empty text, 0, null, undefined and NaN count as false.", "Хоосон текст, 0, null, undefined, NaN нь false гэж тооцогдоно."],
    ["Any non-empty text counts as true.", "Хоосон биш дурын текст true гэж тооцогдоно."]
  ],
  code: `
const nameInput = "";
if (nameInput) {
  console.log("Hello, " + nameInput);
} else {
  console.log("Please enter your name");
}
`,
  steps: [
    { line: 1, vars: { nameInput: "\"\"" }, head: ["An empty field", "Хоосон талбар"],
      en: "The user left the name field empty, so `nameInput` holds empty text: `\"\"`.",
      mn: "Хэрэглэгч нэрийн талбарыг хоосон орхисон тул `nameInput` дотор хоосон текст байна: `\"\"`." },
    { line: 2, focus: "nameInput", calc: ["\"\"", "falsy", "false"], head: ["Truthy or falsy?", "Truthy юу, falsy юу?"],
      en: "`if` is given text, not a boolean. Empty text counts as false (it is *falsy*), so the first block is skipped.",
      mn: "`if`-д boolean биш, текст өгөгдсөн. Хоосон текст false гэж тооцогддог (*falsy*) тул эхний хэсэг алгасагдана.",
      note: ["Falsy values: `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`. Everything else is truthy.", "Falsy утгууд: `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`. Бусад бүх зүйл truthy."] },
    { line: [4, 6], out: ["Please enter your name"], head: ["The else block", "else хэсэг"],
      en: "The `else` block runs and asks for the name.",
      mn: "`else` хэсэг ажиллаж, нэрийг асууна." },
    { line: 1, edit: { 1: "const nameInput = \"Anu\";" }, vars: { nameInput: "\"Anu\"" }, head: ["Now type a name", "Одоо нэр бичье"],
      en: "Now imagine the user typed \"Anu\".",
      mn: "Одоо хэрэглэгч \"Anu\" гэж бичсэн гэж төсөөлье." },
    { line: 2, focus: "nameInput", calc: ["\"Anu\"", "truthy", "true"], head: ["Truthy", "Truthy"],
      en: "Any text that is not empty counts as true.",
      mn: "Хоосон биш дурын текст true гэж тооцогдоно." },
    { line: 3, clear: true, focus: "\"Hello, \" + nameInput", calc: ["\"Hello, \" + nameInput", "\"Hello, Anu\""], out: ["Hello, Anu"], head: ["The greeting", "Мэндчилгээ"],
      en: "This time the first block runs and greets Anu.",
      mn: "Энэ удаа эхний хэсэг ажиллаж, Anu-д мэндчилнэ." }
  ]
});

V("js-loops#while", {
  at: "The while loop",
  title: ["A while loop, day by day", "while давталт, өдөр өдрөөр"],
  sum: [
    ["`while` checks its condition before every round.", "`while` нөхцөлөө тойрог бүрийн өмнө шалгана."],
    ["Something inside the loop must change the condition, or it never ends.", "Давталт доторх ямар нэг зүйл нөхцөлийг өөрчлөх ёстой, үгүй бол хэзээ ч дуусахгүй."],
    ["Use `while` when you do not know the number of rounds in advance.", "Тойргийн тоог урьдчилан мэдэхгүй үед `while` ашигла."]
  ],
  code: `
let money = 10000;
let days = 0;
while (money > 0) {
  money -= 3000;
  days++;
}
console.log(days);
`,
  steps: [
    { line: [1, 2], vars: { money: "10000", days: "0" }, head: ["The question", "Асуулт"],
      en: "You have 10 000₮ and spend 3000₮ a day. How many days does the money last?",
      mn: "Танд 10 000₮ байгаа бөгөөд өдөрт 3000₮ зарцуулна. Мөнгө хэдэн өдөр хүрэлцэх вэ?" },
    { line: 3, focus: "money > 0", calc: ["money > 0", "10000 > 0", "true"], head: ["Check", "Шалгах"],
      en: "`while` checks its condition before every round. 10 000 > 0 is true, so the body runs.",
      mn: "`while` тойрог бүрийн өмнө нөхцөлөө шалгана. 10 000 > 0 нь true тул бие нь ажиллана." },
    { line: [4, 5], focus: "money -= 3000", calc: ["money - 3000", "10000 - 3000", "7000"], vars: { money: "7000", days: "1" }, head: ["Day 1", "1-р өдөр"],
      en: "Spend 3000: 7000 is left. `days++` counts the day.",
      mn: "3000 зарцуулна: 7000 үлдэнэ. `days++` өдрийг тоолно." },
    { line: [4, 5], calc: ["7000 - 3000", "4000"], vars: { money: "4000", days: "2" }, head: ["Day 2", "2-р өдөр"],
      en: "7000 > 0 is still true, so another round: 4000 left, day 2.",
      mn: "7000 > 0 true хэвээр тул дахин тойрно: 4000 үлдэж, 2-р өдөр." },
    { line: [4, 5], calc: ["4000 - 3000", "1000"], vars: { money: "1000", days: "3" }, head: ["Day 3", "3-р өдөр"],
      en: "4000 > 0 is true: 1000 left, day 3.",
      mn: "4000 > 0 нь true: 1000 үлдэж, 3-р өдөр." },
    { line: [4, 5], calc: ["1000 - 3000", "-2000"], vars: { money: "-2000", days: "4" }, head: ["Day 4", "4-р өдөр"],
      en: "1000 > 0 is still true, so the body runs once more and the money goes below zero: −2000.",
      mn: "1000 > 0 true хэвээр тул бие нь дахиад нэг удаа ажиллаж, мөнгө тэгээс доош орно: −2000." },
    { line: 3, focus: "money > 0", calc: ["money > 0", "-2000 > 0", "false"], head: ["Stop", "Зогсох"],
      en: "Now −2000 > 0 is false, so the loop stops.",
      mn: "Одоо −2000 > 0 нь false тул давталт зогсоно." },
    { line: 7, out: ["4"], head: ["The result", "Үр дүн"],
      en: "Print the number of days: 4. On the fourth day the money ran out part-way.",
      mn: "Өдрийн тоог хэвлэнэ: 4. Дөрөв дэх өдрийн дундуур мөнгө дуусчээ.",
      note: ["If nothing inside the loop changed `money`, the condition would stay true forever: an infinite loop.", "Давталт доторх юу ч `money`-г өөрчлөхгүй бол нөхцөл үүрд true хэвээр үлдэнэ: төгсгөлгүй давталт."] }
  ]
});

V("js-loops#break", {
  at: "break and continue",
  title: ["continue skips, break stops", "continue алгасна, break зогсооно"],
  sum: [
    ["`continue` skips the rest of one round and goes on with the next.", "`continue` нэг тойргийн үлдсэнийг алгасаж, дараагийнхаар үргэлжилнэ."],
    ["`break` leaves the whole loop at once.", "`break` давталтаас бүхэлд нь тэр дор гарна."],
    ["Both are usually placed inside an `if`.", "Хоёулаа ихэвчлэн `if` дотор бичигдэнэ."]
  ],
  code: `
for (let i = 1; i <= 6; i++) {
  if (i === 3) continue;
  if (i === 5) break;
  console.log(i);
}
`,
  steps: [
    { line: 1, vars: { i: "1" }, head: ["The plan", "Төлөвлөгөө"],
      en: "The loop is set to count `i` from 1 to 6.",
      mn: "Давталт `i`-г 1-ээс 6 хүртэл тоолохоор тохируулагдсан." },
    { line: 4, out: ["1"], head: ["i = 1", "i = 1"],
      en: "1 is neither 3 nor 5, so both `if`s are skipped and 1 is printed.",
      mn: "1 нь 3 ч биш, 5 ч биш тул хоёр `if` алгасагдаж, 1 хэвлэгдэнэ." },
    { line: 4, vars: { i: "2" }, out: ["2"], head: ["i = 2", "i = 2"],
      en: "The same for 2: it is printed.",
      mn: "2-ын хувьд ч мөн адил: хэвлэгдэнэ." },
    { line: 2, focus: "continue", vars: { i: "3" }, calc: ["i === 3", "3 === 3", "true"], head: ["continue", "continue"],
      en: "When `i` is 3, `continue` skips the **rest of this round**. 3 is not printed, and the loop goes on with 4.",
      mn: "`i` нь 3 үед `continue` **энэ тойргийн үлдсэнийг** алгасна. 3 хэвлэгдэхгүй бөгөөд давталт 4-өөр үргэлжилнэ." },
    { line: 4, vars: { i: "4" }, out: ["4"], head: ["i = 4", "i = 4"],
      en: "4 is printed as normal.",
      mn: "4 ердийнхөөрөө хэвлэгдэнэ." },
    { line: 3, focus: "break", vars: { i: "5" }, calc: ["i === 5", "5 === 5", "true"], head: ["break", "break"],
      en: "When `i` is 5, `break` leaves the **whole loop** at once. 5 and 6 are never printed.",
      mn: "`i` нь 5 үед `break` **бүх давталтаас** тэр дор гарна. 5, 6 хэзээ ч хэвлэгдэхгүй." },
    { vars: { i: null }, head: ["The result", "Үр дүн"],
      en: "The output is 1, 2, 4. `continue` skipped one round; `break` ended everything.",
      mn: "Гаралт: 1, 2, 4. `continue` нэг тойрог алгасаж, `break` бүгдийг дуусгасан." }
  ]
});

V("js-functions#nested", {
  at: "Functions that use other functions",
  title: ["A call inside a call", "Дуудлага доторх дуудлага"],
  sum: [
    ["A function can call another function and wait for its answer.", "Функц өөр функцийг дуудаж, хариуг нь хүлээж чадна."],
    ["Every call gets its own parameter boxes, even with the same name.", "Ижил нэртэй ч гэсэн дуудлага бүр өөрийн параметрийн хайрцагтай."],
    ["Small functions combine like building blocks.", "Жижиг функцууд барилгын тоосго шиг нийлдэг."]
  ],
  code: `
function vat(price) {
  return price * 0.1;
}
function withVat(price) {
  return price + vat(price);
}
console.log(withVat(20000));
`,
  steps: [
    { line: [1, 6], head: ["Two recipes", "Хоёр жор"],
      en: "Two functions are defined: `vat` works out 10% tax, `withVat` adds it to the price. Nothing runs yet.",
      mn: "Хоёр функц тодорхойлогдлоо: `vat` 10% татварыг бодно, `withVat` үүнийг үнэд нэмнэ. Одоохондоо юу ч ажиллахгүй." },
    { line: 7, focus: "withVat(20000)", head: ["The call", "Дуудлага"],
      en: "`withVat(20000)` is called, so JavaScript jumps into `withVat`.",
      mn: "`withVat(20000)` дуудагдах тул JavaScript `withVat` руу орно." },
    { line: 4, vars: { "price (withVat)": "20000" }, head: ["Inside withVat", "withVat дотор"],
      en: "Inside `withVat`, its parameter `price` is 20 000.",
      mn: "`withVat` дотор түүний параметр `price` нь 20 000." },
    { line: 5, focus: "vat(price)", head: ["A call inside a call", "Дуудлага доторх дуудлага"],
      en: "To finish its sum, `withVat` needs `vat(price)`. It calls `vat` and waits for the answer.",
      mn: "Нийлбэрээ дуусгахын тулд `withVat`-д `vat(price)` хэрэгтэй. Тэр `vat`-ийг дуудаад хариуг хүлээнэ." },
    { line: 1, vars: { "price (vat)": "20000" }, head: ["Inside vat", "vat дотор"],
      en: "`vat` gets its **own** `price` box. The two boxes share a name but are separate, one for each call.",
      mn: "`vat` **өөрийн** `price` хайрцгийг авна. Хоёр хайрцаг ижил нэртэй ч тусдаа, дуудлага бүрт нэг." },
    { line: 2, focus: "price * 0.1", calc: ["price * 0.1", "20000 * 0.1", "2000"], vars: { "price (vat)": null }, head: ["vat answers", "vat хариулна"],
      en: "`vat` returns 2000, and its box disappears.",
      mn: "`vat` 2000 буцааж, түүний хайрцаг алга болно." },
    { line: 5, focus: "price + vat(price)", calc: ["price + vat(price)", "20000 + 2000", "22000"], vars: { "price (withVat)": null }, head: ["withVat answers", "withVat хариулна"],
      en: "Back in `withVat`: 20 000 + 2000 = 22 000, which is returned.",
      mn: "`withVat` руу буцаж ирлээ: 20 000 + 2000 = 22 000 буцаагдана." },
    { line: 7, out: ["22000"], head: ["Print", "Хэвлэх"],
      en: "The call is replaced by 22 000 and printed: the price with 10% VAT.",
      mn: "Дуудлага 22 000-аар солигдож хэвлэгдэнэ: 10% НӨАТ-тай үнэ." }
  ]
});

V("js-arrays#change", {
  at: "Changing an array",
  title: ["Adding and removing items", "Утга нэмэх, хасах"],
  sum: [
    ["`push` and `pop` work at the end; `unshift` adds at the start.", "`push`, `pop` төгсгөлд ажиллана; `unshift` эхэнд нэмнэ."],
    ["Adding at the start moves every other item one place along.", "Эхэнд нэмэхэд бусад бүх утга нэг байр урагшилна."],
    ["`includes` and `indexOf` search without changing anything.", "`includes`, `indexOf` юуг ч өөрчлөхгүйгээр хайна."]
  ],
  code: `
const cart = ["milk", "bread"];
cart.push("eggs");
cart.pop();
cart.unshift("tea");
console.log(cart.includes("milk"), cart.indexOf("bread"));
console.log(cart);
`,
  steps: [
    { line: 1, vars: { cart: "[\"milk\", \"bread\"]" }, head: ["A shopping cart", "Худалдааны сагс"],
      en: "The cart starts with two items: milk at position 0, bread at position 1.",
      mn: "Сагсанд хоёр зүйл байна: 0-р байрлалд сүү, 1-р байрлалд талх." },
    { line: 2, focus: "push(\"eggs\")", vars: { cart: "[\"milk\", \"bread\", \"eggs\"]" }, head: ["push", "push"],
      en: "`push` adds an item to the **end**. Eggs go to position 2.",
      mn: "`push` утгыг **төгсгөлд** нэмнэ. Өндөг 2-р байрлалд орно." },
    { line: 3, focus: "pop()", vars: { cart: "[\"milk\", \"bread\"]" }, head: ["pop", "pop"],
      en: "`pop` removes the **last** item, the eggs.",
      mn: "`pop` **сүүлийн** утгыг буюу өндгийг хасна." },
    { line: 4, focus: "unshift(\"tea\")", vars: { cart: "[\"tea\", \"milk\", \"bread\"]" }, head: ["unshift", "unshift"],
      en: "`unshift` adds to the **start**. Tea is now at position 0, and milk and bread each move one place along.",
      mn: "`unshift` **эхэнд** нэмнэ. Цай одоо 0-р байрлалд, сүү, талх тус бүр нэг байр урагшилна." },
    { line: 5, focus: "cart.indexOf(\"bread\")", calc: ["cart.indexOf(\"bread\")", "2"], out: ["true 2"], head: ["Search", "Хайх"],
      en: "`includes(\"milk\")` is true. `indexOf(\"bread\")` gives bread's position: 2. Neither changes the cart.",
      mn: "`includes(\"milk\")` нь true. `indexOf(\"bread\")` талхны байрлалыг өгнө: 2. Аль нь ч сагсыг өөрчлөхгүй.",
      note: ["`indexOf` gives −1 when the item is not in the array.", "Утга массивт байхгүй бол `indexOf` −1 өгнө."] },
    { line: 6, out: ["[\"tea\", \"milk\", \"bread\"]"], head: ["The final cart", "Эцсийн сагс"],
      en: "Print the cart as it is now.",
      mn: "Сагсыг одоогийн байдлаар нь хэвлэнэ." }
  ]
});

V("js-objects#table", {
  at: "Arrays of objects look like a table",
  title: ["Filtering a list of objects", "Объектын жагсаалтыг шүүх"],
  sum: [
    ["An array of objects works like a table: objects are rows, keys are columns.", "Объектын массив хүснэгт шиг: объект нь мөр, түлхүүр нь багана."],
    ["`filter` checks one object at a time.", "`filter` нэг удаад нэг объект шалгана."],
    ["`map` can pull one key out of every object.", "`map` объект бүрээс нэг түлхүүрийг гаргаж авч чадна."]
  ],
  code: `
const students = [
  { name: "Bat", gpa: 3.4 },
  { name: "Saraa", gpa: 3.8 },
  { name: "Nomin", gpa: 3.6 }
];
const best = students.filter(s => s.gpa > 3.5);
console.log(best.map(s => s.name));
`,
  steps: [
    { line: [1, 5], vars: { students: "[ Bat, Saraa, Nomin ]" }, head: ["A list of objects", "Объектын жагсаалт"],
      en: "An array holding three objects. Each object is one student, like a row; each key, `name` and `gpa`, is like a column.",
      mn: "Гурван объект агуулсан массив. Объект бүр нэг оюутан буюу мөр шиг; `name`, `gpa` түлхүүр бүр багана шиг." },
    { line: 6, focus: "s.gpa > 3.5", calc: ["s.gpa > 3.5", "3.4 > 3.5", "false"], head: ["Check Bat", "Bat-ийг шалгах"],
      en: "`filter` takes each object in turn, calls it `s`, and checks `s.gpa > 3.5`. For Bat it is false.",
      mn: "`filter` объект бүрийг ээлжлэн авч, `s` гэж нэрлээд `s.gpa > 3.5`-ыг шалгана. Bat-ийн хувьд false." },
    { line: 6, focus: "s.gpa > 3.5", calc: ["s.gpa > 3.5", "3.8 > 3.5", "true"], head: ["Check Saraa", "Saraa-г шалгах"],
      en: "For Saraa it is true, so her object is kept.",
      mn: "Saraa-гийн хувьд true тул түүний объект үлдэнэ." },
    { line: 6, focus: "s.gpa > 3.5", calc: ["s.gpa > 3.5", "3.6 > 3.5", "true"], vars: { best: "[ Saraa, Nomin ]" }, head: ["Check Nomin", "Nomin-ийг шалгах"],
      en: "Nomin is kept as well. `best` holds the two objects that passed.",
      mn: "Nomin ч мөн үлдэнэ. `best` дотор тэнцсэн хоёр объект байна." },
    { line: 7, focus: "s => s.name", calc: ["best.map(s => s.name)", "[\"Saraa\", \"Nomin\"]"], out: ["[\"Saraa\", \"Nomin\"]"], head: ["Only the names", "Зөвхөн нэр"],
      en: "`map` turns each object into just its name.",
      mn: "`map` объект бүрийг зөвхөн нэр нь болгоно." },
    { head: ["Same idea as SQL", "SQL-тэй ижил санаа"],
      en: "This is exactly what `SELECT name FROM students WHERE gpa > 3.5;` does in a database.",
      mn: "Өгөгдлийн санд `SELECT name FROM students WHERE gpa > 3.5;` яг үүнийг хийдэг.",
      note: ["`filter` is like WHERE, and `map` is like choosing columns in SELECT.", "`filter` нь WHERE-тэй, `map` нь SELECT-ээр багана сонгохтой адил."] }
  ]
});

V("js-errors#throw", {
  at: "throw: raise your own error",
  title: ["throw, try and catch together", "throw, try, catch хамтдаа"],
  sum: [
    ["`throw` stops a function with your own error.", "`throw` функцийг өөрийн алдаагаар зогсооно."],
    ["Inside `try`, an error jumps straight to `catch`; the rest of `try` is skipped.", "`try` дотор алдаа гарвал шууд `catch` руу үсэрч, `try`-ийн үлдсэн хэсэг алгасагдана."],
    ["With `catch`, the program handles the problem instead of crashing.", "`catch`-тэй бол програм унахын оронд асуудлыг зохицуулна."]
  ],
  code: `
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Not enough money");
  }
  return balance - amount;
}
try {
  console.log(withdraw(50000, 20000));
  console.log(withdraw(50000, 80000));
  console.log("Done");
} catch (error) {
  console.log("Error:", error.message);
}
`,
  steps: [
    { line: [1, 6], head: ["The rule", "Дүрэм"],
      en: "`withdraw` refuses to pay out more than the balance holds.",
      mn: "`withdraw` үлдэгдлээс илүү мөнгө гаргахаас татгалзана." },
    { line: 7, focus: "try", head: ["try", "try"],
      en: "`try` means: run this block, but if anything throws an error, jump to `catch`.",
      mn: "`try` нь: энэ хэсгийг ажиллуул, гэхдээ ямар нэг алдаа шидэгдвэл `catch` руу үсэр гэсэн үг." },
    { line: 2, vars: { balance: "50000", amount: "20000" }, calc: ["amount > balance", "20000 > 50000", "false"], head: ["First withdrawal", "Эхний авалт"],
      en: "First call: 20 000 > 50 000 is false, so there is no error…",
      mn: "Эхний дуудлага: 20 000 > 50 000 нь false тул алдаа алга…" },
    { line: 8, calc: ["balance - amount", "50000 - 20000", "30000"], vars: { balance: null, amount: null }, out: ["30000"], head: ["Paid out", "Олгосон"],
      en: "…and the function returns 30 000, which is printed.",
      mn: "…функц 30 000 буцааж, хэвлэгдэнэ." },
    { line: 2, vars: { balance: "50000", amount: "80000" }, calc: ["amount > balance", "80000 > 50000", "true"], head: ["Too much", "Хэтэрхий их"],
      en: "Second call: 80 000 > 50 000 is true.",
      mn: "Хоёр дахь дуудлага: 80 000 > 50 000 нь true." },
    { line: 3, focus: "throw", head: ["throw", "throw"],
      en: "`throw` creates an error and stops the function at once. It also stops the rest of the `try` block, so \"Done\" will never be printed.",
      mn: "`throw` алдаа үүсгэж, функцийг тэр дор нь зогсооно. Мөн `try` хэсгийн үлдсэнийг зогсоох тул \"Done\" хэзээ ч хэвлэгдэхгүй." },
    { line: [11, 12], focus: "error.message", vars: { balance: null, amount: null, error: "Error: Not enough money" }, out: ["Error: Not enough money"], head: ["catch", "catch"],
      en: "JavaScript jumps to `catch`. The error arrives in `error`, and its message is printed.",
      mn: "JavaScript `catch` руу үсэрнэ. Алдаа `error`-д ирж, мэдээлэл нь хэвлэгдэнэ." },
    { head: ["The program lives on", "Програм үргэлжилнэ"],
      en: "The program did not crash: it handled the problem and could carry on. Without `try / catch`, it would have stopped with a red error.",
      mn: "Програм унасангүй: асуудлыг зохицуулаад цааш үргэлжлэх боломжтой. `try / catch`-гүй бол улаан алдаа өгч зогсох байсан." }
  ]
});

(function () {
  const S = CG.schema[0].rows, C = CG.schema[1].rows, E = CG.schema[2].rows;
  const pick = (rows, idx) => rows.map((r) => idx.map((i) => r[i]));
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const except = (n, keep) => range(0, n - 1).filter((i) => !keep.includes(i));
  const STUDENT_COLS = ["id", "name", "city", "age", "gpa"];
  const byGpa = pick(S, [1, 4]).sort((a, b) => (b[1] === null ? -1 : b[1]) - (a[1] === null ? -1 : a[1]));

  V("db-intro#tour", {
    at: "Our practice database",
    title: ["A tour of the practice database", "Дасгалын өгөгдлийн сантай танилцах"],
    lang: "sql",
    sum: [
      ["`students` and `courses` each describe one kind of thing.", "`students`, `courses` тус бүр нэг төрлийн зүйлийг тодорхойлно."],
      ["`enrollments` links them with ID numbers.", "`enrollments` тэдгээрийг ID дугаараар холбоно."],
      ["Following the IDs turns numbers into a sentence: who scored what in which course.", "ID-г дагахад дугаарууд өгүүлбэр болно: хэн аль хичээлд хэдэн оноо авсан."]
    ],
    code: `
SELECT * FROM students;
SELECT * FROM courses;
SELECT * FROM enrollments;
`,
    steps: [
      { line: 1, grid: { title: "students", cols: STUDENT_COLS, rows: S }, cols: [0], head: ["students", "students"],
        en: "`students`: 10 students, one row each, numbered by `id`.",
        mn: "`students`: 10 оюутан, тус бүр нэг мөр, `id`-аар дугаарлагдсан." },
      { line: 2, grid: { title: "courses", cols: ["id", "title", "credits", "teacher"], rows: C }, cols: [0], head: ["courses", "courses"],
        en: "`courses`: 5 courses, each with its credits and teacher, also numbered by `id`.",
        mn: "`courses`: 5 хичээл, тус бүр кредит, багштай, мөн `id`-аар дугаарлагдсан." },
      { line: 3, grid: { title: ["enrollments (first 6 of 22 rows)", "enrollments (22-оос эхний 6 мөр)"], cols: ["student_id", "course_id", "score"], rows: E.slice(0, 6) }, mark: { hl: [3] }, head: ["enrollments", "enrollments"],
        en: "`enrollments` links the two. Each row says which student takes which course, and the score. Look at the row 2, 1, 95.",
        mn: "`enrollments` нөгөө хоёрыг холбоно. Мөр бүр аль оюутан аль хичээлийг үздэг, ямар оноотойг хэлнэ. 2, 1, 95 гэсэн мөрийг хар." },
      { line: 3, cell: [3, 0], calc: ["student_id = 2", "students: id 2", "Saraa"], head: ["Follow student_id", "student_id-г дагах"],
        en: "`student_id` 2 points to the student whose `id` is 2: Saraa.",
        mn: "`student_id` 2 нь `id` нь 2 оюутныг заана: Saraa." },
      { line: 3, cell: [3, 1], calc: ["course_id = 1", "courses: id 1", "Programming"], head: ["Follow course_id", "course_id-г дагах"],
        en: "`course_id` 1 points to the course whose `id` is 1: Programming.",
        mn: "`course_id` 1 нь `id` нь 1 хичээлийг заана: Programming." },
      { res: { title: ["What the row means", "Мөрийн утга"], cols: ["student", "course", "score"], rows: [["Saraa", "Programming", 95]] }, head: ["Put together", "Нийлүүлбэл"],
        en: "So the row means: Saraa scored 95 in Programming. In the JOIN lesson you will ask SQL to do this lookup for you.",
        mn: "Тэгэхээр энэ мөр: Saraa Programming-д 95 оноо авсан гэсэн үг. JOIN хичээлд энэ хайлтыг SQL-ээр хийлгэж сурна." }
    ]
  });

  V("db-tables#null", {
    at: "NULL means unknown",
    title: ["How NULL behaves", "NULL хэрхэн ажилладаг вэ"],
    lang: "sql",
    sum: [
      ["Any calculation with NULL gives NULL.", "NULL оролцсон аливаа тооцоо NULL өгнө."],
      ["Even `NULL = NULL` is not true.", "`NULL = NULL` ч true биш."],
      ["Find missing values with `IS NULL`.", "Дутуу утгыг `IS NULL`-ээр ол."]
    ],
    code: `
SELECT 5 + NULL;
SELECT NULL = NULL;
SELECT NULL IS NULL;
SELECT name FROM students WHERE gpa IS NULL;
`,
    steps: [
      { line: 1, calc: ["5 + NULL", "NULL"], res: { cols: ["5 + NULL"], rows: [[null]] }, head: ["Maths with the unknown", "Үл мэдэгдэхтэй тооцоо"],
        en: "5 plus an unknown number is still unknown, so the answer is NULL, not 5.",
        mn: "5 дээр үл мэдэгдэх тоо нэмэхэд үл мэдэгдэх хэвээр тул хариу нь 5 биш, NULL." },
      { line: 2, calc: ["NULL = NULL", "NULL"], res: { cols: ["NULL = NULL"], rows: [[null]] }, head: ["Comparing unknowns", "Үл мэдэгдэхийг харьцуулах"],
        en: "Are two unknown values equal? Nobody knows, so even this gives NULL, not true.",
        mn: "Үл мэдэгдэх хоёр утга тэнцүү юү? Хэн ч мэдэхгүй тул энэ ч true биш, NULL өгнө." },
      { line: 3, calc: ["NULL IS NULL", "1"], res: { cols: ["NULL IS NULL"], rows: [[1]] }, head: ["IS NULL", "IS NULL"],
        en: "`IS NULL` is the special test for missing values. It answers 1, which is how SQLite writes true.",
        mn: "`IS NULL` бол дутуу утгыг шалгах тусгай тест. 1 гэж хариулна: SQLite true-г ингэж бичдэг." },
      { line: 4, grid: { title: "students", cols: ["name", "gpa"], rows: pick(S, [1, 4]) }, cols: [1], mark: { keep: [7], drop: except(10, [7]) }, head: ["Find the missing GPA", "Дутуу голчийг олох"],
        en: "In `WHERE`, `gpa IS NULL` keeps only the rows with a missing GPA: Tuvshin's.",
        mn: "`WHERE` дотор `gpa IS NULL` нь голч дутуу мөрийг л үлдээнэ: Tuvshin-ийх." },
      { line: 4, res: { cols: ["name"], rows: [["Tuvshin"]] }, head: ["The result", "Үр дүн"],
        en: "One student has no GPA recorded yet.",
        mn: "Нэг оюутны голч хараахан бүртгэгдээгүй.",
        note: ["`WHERE gpa = NULL` would find nobody, because `= NULL` is never true.", "`WHERE gpa = NULL` хэнийг ч олохгүй, учир нь `= NULL` хэзээ ч true болдоггүй."] }
    ]
  });

  const cities = pick(S, [1, 2]);
  V("sql-select#distinct", {
    at: "Remove duplicates with DISTINCT",
    title: ["How DISTINCT removes repeats", "DISTINCT давхардлыг хэрхэн арилгадаг вэ"],
    lang: "sql",
    order: ["FROM", "SELECT", "DISTINCT"],
    sum: [
      ["Without `DISTINCT`, every row gives one result row, repeats included.", "`DISTINCT`-гүй бол мөр бүр, давхардлыг оролцуулан, нэг үр дүнгийн мөр болно."],
      ["`DISTINCT` keeps one copy of each different value.", "`DISTINCT` ялгаатай утга бүрээс нэг хувийг үлдээнэ."],
      ["It changes only the result, never the table.", "Энэ зөвхөн үр дүнг өөрчилнө, хүснэгтийг хэзээ ч үгүй."]
    ],
    code: `
SELECT DISTINCT city
FROM students;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["name", "city"], rows: cities }, head: ["Start", "Эхлэх"],
        en: "Start with all 10 students and their cities.",
        mn: "Бүх 10 оюутан, тэдний хотоос эхэлнэ." },
      { line: 1, phase: "SELECT", focus: "city", cols: [1], head: ["Only the city", "Зөвхөн хот"],
        en: "`SELECT city` on its own would give 10 rows, with Ulaanbaatar four times and Darkhan and Erdenet twice.",
        mn: "Зөвхөн `SELECT city` бол 10 мөр гарч, Ulaanbaatar дөрвөн удаа, Darkhan, Erdenet хоёр удаа давтагдана." },
      { line: 1, phase: "DISTINCT", focus: "DISTINCT", cols: [1], mark: { keep: [0, 1, 3, 5, 8], drop: [2, 4, 6, 7, 9] }, head: ["Drop the repeats", "Давхардлыг хасах"],
        en: "`DISTINCT` keeps the first copy of each different city and drops every repeat.",
        mn: "`DISTINCT` ялгаатай хот бүрийн эхний хувийг үлдээж, давтагдсан бүгдийг хасна." },
      { res: { cols: ["city"], rows: [["Ulaanbaatar"], ["Darkhan"], ["Erdenet"], ["Khovd"], ["Murun"]] }, head: ["The result", "Үр дүн"],
        en: "Five different cities remain. Our students come from five places.",
        mn: "Таван өөр хот үлдлээ. Манай оюутнууд таван газраас ирсэн.",
        note: ["With two columns, a row is a repeat only if both values repeat.", "Хоёр баганатай бол хоёр утга хоёулаа давтагдсан үед л мөр давхардсанд тооцогдоно."] }
    ]
  });

  const names = S.map((r) => [r[1]]);
  V("sql-where#like", {
    at: "IN, BETWEEN, LIKE",
    title: ["Matching text patterns with LIKE", "LIKE-аар текстийн загвар тааруулах"],
    lang: "sql",
    order: ["FROM", "WHERE", "SELECT"],
    sum: [
      ["`%` in a pattern means any characters, or none.", "Загвар дахь `%` нь дурын тэмдэгтүүд, эсвэл юу ч биш гэсэн үг."],
      ["`'S%'` means starts with S; `'%a'` means ends with a.", "`'S%'` нь S-ээр эхэлсэн, `'%a'` нь a-гаар төгссөн гэсэн үг."],
      ["With `OR`, matching one pattern is enough.", "`OR`-той бол нэг загварт таарахад хангалттай."]
    ],
    code: `
SELECT name
FROM students
WHERE name LIKE 'S%'
   OR name LIKE '%a';
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["name"], rows: names }, head: ["Start", "Эхлэх"],
        en: "Start with the ten names.",
        mn: "Арван нэрээс эхэлнэ." },
      { line: 3, phase: "WHERE", focus: "'S%'", head: ["The pattern S%", "S% загвар"],
        en: "In a `LIKE` pattern, `%` stands for any characters, or none. So `'S%'` means: an S, followed by anything.",
        mn: "`LIKE` загварт `%` нь дурын тэмдэгтүүд, эсвэл юу ч биш гэсэн утгатай. Тэгэхээр `'S%'` нь: S, араас нь юу ч байж болно." },
      { line: 3, cell: [1, 0], mark: { keep: [1] }, calc: ["'Saraa' LIKE 'S%'", "true"], head: ["Saraa", "Saraa"],
        en: "Saraa starts with S, so she matches.",
        mn: "Saraa S-ээр эхэлдэг тул таарна." },
      { line: 4, focus: "'%a'", cell: [6, 0], mark: { keep: [1, 6] }, calc: ["'Oyunaa' LIKE '%a'", "true"], head: ["The pattern %a", "%a загвар"],
        en: "`'%a'` means: anything, ending in a. Oyunaa does not start with S, but she ends with a, and `OR` needs only one match.",
        mn: "`'%a'` нь: юу ч байж болох, a-гаар төгссөн. Oyunaa S-ээр эхлэхгүй ч a-гаар төгсдөг бөгөөд `OR`-д ганц тохирол хангалттай." },
      { line: [3, 4], mark: { keep: [1, 6], drop: except(10, [1, 6]) }, head: ["Every name", "Бүх нэр"],
        en: "After checking all ten names, only Saraa and Oyunaa match. Anu starts with A and ends with u, so it does not.",
        mn: "Арван нэрийг бүгдийг шалгасны дараа зөвхөн Saraa, Oyunaa таарлаа. Anu нь A-гаар эхэлж, u-гаар төгсдөг тул таарахгүй." },
      { line: 1, phase: "SELECT", res: { cols: ["name"], rows: [["Saraa"], ["Oyunaa"]] }, head: ["The result", "Үр дүн"],
        en: "Two names match a pattern.",
        mn: "Хоёр нэр загварт таарлаа.",
        note: ["`_` matches exactly one character: `'_nu'` matches Anu.", "`_` нь яг нэг тэмдэгттэй таарна: `'_nu'` нь Anu-тай таарна."] }
    ]
  });

  V("sql-order#pages", {
    at: "LIMIT: only the first rows",
    title: ["Pages of results with OFFSET", "OFFSET-оор үр дүнг хуудаслах"],
    lang: "sql",
    order: ["FROM", "ORDER BY", "OFFSET", "LIMIT"],
    sum: [
      ["`OFFSET` skips rows; `LIMIT` takes rows.", "`OFFSET` мөр алгасна; `LIMIT` мөр авна."],
      ["Page n with k rows per page is `LIMIT k OFFSET (n − 1) × k`.", "Хуудас бүр k мөртэй үед n-р хуудас нь `LIMIT k OFFSET (n − 1) × k`."],
      ["Always sort before you cut into pages.", "Хуудаслахаасаа өмнө үргэлж эрэмбэл."]
    ],
    code: `
SELECT name, gpa
FROM students
ORDER BY gpa DESC
LIMIT 3 OFFSET 3;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["name", "gpa"], rows: pick(S, [1, 4]) }, head: ["Start", "Эхлэх"],
        en: "Imagine a website that shows 3 students per page. We want page 2.",
        mn: "Хуудас бүрт 3 оюутан харуулдаг вэб сайтыг төсөөл. Бидэнд 2-р хуудас хэрэгтэй." },
      { line: 3, phase: "ORDER BY", grid: { title: "students", cols: ["name", "gpa"], rows: byGpa }, cols: [1], head: ["Sort first", "Эхлээд эрэмбэлэх"],
        en: "First the list is sorted by GPA, highest first, so every page shows the right people.",
        mn: "Эхлээд жагсаалтыг голчоор, хамгийн өндрөөс нь эрэмбэлнэ. Ингэснээр хуудас бүр зөв хүмүүсийг харуулна." },
      { line: 4, phase: "OFFSET", focus: "OFFSET 3", mark: { drop: [0, 1, 2] }, head: ["Skip page 1", "1-р хуудсыг алгасах"],
        en: "`OFFSET 3` skips the first 3 rows: they were already shown on page 1.",
        mn: "`OFFSET 3` эхний 3 мөрийг алгасна: тэд 1-р хуудсанд аль хэдийн харагдсан." },
      { line: 4, phase: "LIMIT", focus: "LIMIT 3", mark: { keep: [3, 4, 5], drop: [0, 1, 2, 6, 7, 8, 9] }, head: ["Take page 2", "2-р хуудсыг авах"],
        en: "`LIMIT 3` then takes the next 3 rows.",
        mn: "Дараа нь `LIMIT 3` дараагийн 3 мөрийг авна." },
      { res: { title: ["Page 2", "2-р хуудас"], cols: ["name", "gpa"], rows: byGpa.slice(3, 6) }, head: ["Page 2", "2-р хуудас"],
        en: "Page 2 shows Anu, Bat and Oyunaa.",
        mn: "2-р хуудсанд Anu, Bat, Oyunaa харагдана." },
      { calc: ["page 3", "OFFSET (3 - 1) * 3", "OFFSET 6"], head: ["Any page", "Дурын хуудас"],
        en: "For page n, skip (n − 1) × 3 rows. Page 3 is `LIMIT 3 OFFSET 6`, page 1 is `LIMIT 3 OFFSET 0`.",
        mn: "n-р хуудасны хувьд (n − 1) × 3 мөр алгасна. 3-р хуудас нь `LIMIT 3 OFFSET 6`, 1-р хуудас нь `LIMIT 3 OFFSET 0`." }
    ]
  });

  V("sql-aggregate#functions", {
    at: "Aggregate functions",
    title: ["Five rows of numbers become one", "Олон мөр нэг мөр болох нь"],
    lang: "sql",
    sum: [
      ["`COUNT(*)` counts rows; `COUNT(column)` skips NULLs.", "`COUNT(*)` мөр тоолно; `COUNT(багана)` NULL-ийг алгасна."],
      ["`AVG` divides by the number of known values, not by all rows.", "`AVG` бүх мөрийн тоонд биш, мэдэгдэж буй утгын тоонд хуваана."],
      ["Aggregate functions squeeze many rows into one result row.", "Нэгтгэх функцууд олон мөрийг нэг үр дүнгийн мөр болгодог."]
    ],
    code: `
SELECT COUNT(*)           AS all_rows,
       COUNT(gpa)         AS with_gpa,
       ROUND(AVG(gpa), 2) AS avg_gpa,
       MAX(gpa)           AS best
FROM students;
`,
    steps: [
      { line: 5, grid: { title: "students", cols: ["name", "gpa"], rows: pick(S, [1, 4]) }, head: ["Start", "Эхлэх"],
        en: "Start with the 10 students and their GPAs. One GPA is missing.",
        mn: "10 оюутан, тэдний голчоос эхэлнэ. Нэг голч дутуу." },
      { line: 1, focus: "COUNT(*)", calc: ["COUNT(*)", "10"], head: ["Count rows", "Мөр тоолох"],
        en: "`COUNT(*)` counts every row, whatever is inside: 10.",
        mn: "`COUNT(*)` доторх утгаас үл хамааран бүх мөрийг тоолно: 10." },
      { line: 2, focus: "COUNT(gpa)", cell: [7, 1], mark: { drop: [7] }, calc: ["COUNT(gpa)", "9"], head: ["Count values", "Утга тоолох"],
        en: "`COUNT(gpa)` counts only rows where `gpa` has a value. Tuvshin's NULL is skipped, so the answer is 9.",
        mn: "`COUNT(gpa)` нь `gpa` утгатай мөрийг л тоолно. Tuvshin-ий NULL алгасагдах тул хариу 9." },
      { line: 3, focus: "AVG(gpa)", mark: { drop: [7] }, calc: ["AVG(gpa)", "30.1 / 9", "3.344…", "3.34"], head: ["Average", "Дундаж"],
        en: "`AVG` adds the 9 known GPAs (30.1) and divides by 9, not by 10. `ROUND(…, 2)` keeps two decimal places.",
        mn: "`AVG` мэдэгдэж буй 9 голчийг нэмээд (30.1), 10-т биш 9-д хуваана. `ROUND(…, 2)` аравтын хоёр орон үлдээнэ." },
      { line: 4, focus: "MAX(gpa)", mark: { keep: [4] }, cell: [4, 1], calc: ["MAX(gpa)", "3.9"], head: ["Largest", "Хамгийн их"],
        en: "`MAX` finds the largest value: Enkhjin's 3.9. `MIN` would find the smallest.",
        mn: "`MAX` хамгийн их утгыг олно: Enkhjin-ий 3.9. `MIN` хамгийн багыг олох байсан." },
      { res: { cols: ["all_rows", "with_gpa", "avg_gpa", "best"], rows: [[10, 9, 3.34, 3.9]] }, head: ["One row", "Нэг мөр"],
        en: "Ten rows were squeezed into a single result row of totals.",
        mn: "Арван мөр нийлбэр дүнгийн ганц мөр болж шахагдлаа.",
        note: ["Add `GROUP BY` to get one such row per group instead of one for the whole table.", "`GROUP BY` нэмбэл бүх хүснэгтэд нэг биш, бүлэг бүрт ийм нэг мөр гарна."] }
    ]
  });

  V("sql-join#left", {
    at: "LEFT JOIN: keep every row on the left",
    title: ["LEFT JOIN keeps the lonely rows", "LEFT JOIN хосгүй мөрийг үлдээнэ"],
    lang: "sql",
    order: ["FROM", "LEFT JOIN", "WHERE", "SELECT"],
    sum: [
      ["`LEFT JOIN` keeps every row of the left table, matched or not.", "`LEFT JOIN` зүүн хүснэгтийн бүх мөрийг, тохирсон эсэхээс үл хамааран үлдээнэ."],
      ["Rows without a match get NULL on the right side.", "Тохиролгүй мөрийн баруун тал NULL болно."],
      ["`WHERE … IS NULL` then finds the rows that had no match.", "Дараа нь `WHERE … IS NULL` тохиролгүй мөрүүдийг олно."]
    ],
    code: `
SELECT s.name, e.course_id
FROM students AS s
LEFT JOIN enrollments AS e ON e.student_id = s.id
WHERE e.student_id IS NULL;
`,
    steps: [
      { line: 2, phase: "FROM", grid: { title: "students", cols: ["id", "name"], rows: pick(S, [0, 1]) }, head: ["Start from students", "students-ээс эхлэх"],
        en: "This time the query starts from `students`, the *left* table.",
        mn: "Энэ удаа хүсэлт *зүүн* хүснэгт болох `students`-ээс эхэлнэ." },
      { line: 3, phase: "LEFT JOIN", cell: [0, 0], mark: { keep: [0] }, calc: ["student 1 (Bat)", "3 enrollments"], head: ["Bat has matches", "Bat-д тохирол бий"],
        en: "For Bat, three enrollment rows match, so Bat appears three times in the joined rows, once per course.",
        mn: "Bat-ийн хувьд гурван enrollments мөр таарах тул холбосон мөрүүдэд Bat гурван удаа, хичээл бүрт нэг удаа гарна." },
      { line: 3, cell: [9, 0], mark: { keep: [0], hl: [9] }, calc: ["student 10 (Munkh-Erdene)", "0 enrollments"], head: ["No match", "Тохирол алга"],
        en: "For Munkh-Erdene, no enrollment matches. An inner `JOIN` would drop this student; `LEFT JOIN` keeps the row and fills the enrollment side with NULL.",
        mn: "Munkh-Erdene-д таарах enrollments алга. Энгийн `JOIN` энэ оюутныг хасах байсан; `LEFT JOIN` мөрийг үлдээж, enrollments талыг NULL-ээр бөглөнө." },
      { line: 3, mark: { keep: range(0, 9) }, res: { title: ["Joined rows (part)", "Холбосон мөрүүд (хэсэг)"], cols: ["name", "course_id"], rows: [["Bat", 1], ["Bat", 2], ["Bat", 3], ["…", "…"], ["Munkh-Erdene", null]] }, head: ["Every student stays", "Оюутан бүр үлдэнэ"],
        en: "The joined rows contain every enrollment, plus one row for Munkh-Erdene with NULL.",
        mn: "Холбосон мөрүүдэд бүх enrollments, нэмээд NULL-тэй Munkh-Erdene-ийн нэг мөр байна." },
      { line: 4, phase: "WHERE", focus: "e.student_id IS NULL", mark: { keep: [9], drop: range(0, 8) }, res: { cols: ["name", "course_id"], rows: [["Munkh-Erdene", null]] }, head: ["Keep the empty ones", "Хоосныг нь үлдээх"],
        en: "`WHERE e.student_id IS NULL` keeps only the rows where nothing matched: students who take no course.",
        mn: "`WHERE e.student_id IS NULL` нь юу ч тохироогүй мөрийг л үлдээнэ: хичээл сонгоогүй оюутнууд." },
      { phase: "SELECT", head: ["When to use it", "Хэзээ хэрэглэх вэ"],
        en: "Use `LEFT JOIN` whenever rows without a partner should still appear, such as customers who have not ordered anything.",
        mn: "Хосгүй мөр ч гарах ёстой үед `LEFT JOIN` ашигла, жишээ нь юу ч захиалаагүй үйлчлүүлэгчид." }
    ]
  });

  const last3 = S.slice(7);
  V("sql-modify#insert", {
    at: "INSERT: add rows",
    title: ["Adding a row with INSERT", "INSERT-ээр мөр нэмэх"],
    lang: "sql",
    sum: [
      ["`INSERT INTO table (columns)` says where the new row goes.", "`INSERT INTO хүснэгт (баганууд)` шинэ мөр хаашаа орохыг заана."],
      ["`VALUES` lists the values in the same order as the columns.", "`VALUES` утгуудыг баганын дарааллаар жагсаана."],
      ["An `INTEGER PRIMARY KEY` gets the next number automatically.", "`INTEGER PRIMARY KEY` дараагийн дугаарыг автоматаар авна."]
    ],
    code: `
INSERT INTO students (name, city, age, gpa)
VALUES ('Khulan', 'Choibalsan', 20, 3.7);
SELECT * FROM students WHERE id = 11;
`,
    steps: [
      { line: 1, focus: "INSERT INTO students", grid: { title: ["students (last 3 rows)", "students (сүүлийн 3 мөр)"], cols: STUDENT_COLS, rows: last3 }, head: ["Which table", "Аль хүснэгт"],
        en: "`INSERT INTO students` adds a new row to `students`. The table currently ends with id 10.",
        mn: "`INSERT INTO students` нь `students`-д шинэ мөр нэмнэ. Хүснэгт одоогоор 10 дугаараар төгсдөг." },
      { line: 1, focus: "(name, city, age, gpa)", cols: [1, 2, 3, 4], head: ["Which columns", "Аль баганууд"],
        en: "The brackets list the columns we will fill, in this order. `id` is left out on purpose.",
        mn: "Хаалтад бөглөх баганууд энэ дарааллаар жагсаагдсан. `id`-г санаатайгаар орхисон." },
      { line: 2, focus: "('Khulan', 'Choibalsan', 20, 3.7)", calc: ["(name, city, age, gpa)", "('Khulan', 'Choibalsan', 20, 3.7)"], head: ["Values in the same order", "Ижил дарааллаар утга"],
        en: "Each value goes into the column in the same position: 'Khulan' into name, 'Choibalsan' into city, 20 into age, 3.7 into gpa.",
        mn: "Утга бүр ижил байрлалын баганад орно: 'Khulan' нь name-д, 'Choibalsan' нь city-д, 20 нь age-д, 3.7 нь gpa-д." },
      { line: 2, grid: { title: ["students (last 4 rows)", "students (сүүлийн 4 мөр)"], cols: STUDENT_COLS, rows: last3.concat([[11, "Khulan", "Choibalsan", 20, 3.7]]) }, mark: { keep: [3] }, cell: [3, 0], head: ["The new row", "Шинэ мөр"],
        en: "The row is added. Because `id` is an `INTEGER PRIMARY KEY`, SQLite gives it the next number: 11.",
        mn: "Мөр нэмэгдлээ. `id` нь `INTEGER PRIMARY KEY` тул SQLite дараагийн дугаарыг өгнө: 11." },
      { line: 3, res: { cols: STUDENT_COLS, rows: [[11, "Khulan", "Choibalsan", 20, 3.7]] }, head: ["Check", "Шалгах"],
        en: "A `SELECT` confirms that the new row is really there.",
        mn: "`SELECT` шинэ мөр үнэхээр байгааг баталгаажуулна.",
        note: ["Text values need single quotes; numbers do not.", "Текстэн утгад дан хашилт хэрэгтэй, тоонд хэрэггүй."] }
    ]
  });

  const first3 = pick(S.slice(0, 3), [0, 1, 2]);
  V("sql-modify#transaction", {
    at: "Transactions",
    title: ["A change you can undo", "Буцааж болох өөрчлөлт"],
    lang: "sql",
    sum: [
      ["`BEGIN` starts a transaction: changes become a draft.", "`BEGIN` транзакц эхлүүлнэ: өөрчлөлтүүд ноорог болно."],
      ["`ROLLBACK` throws the draft away; `COMMIT` saves it for good.", "`ROLLBACK` ноорогийг хаяна; `COMMIT` бүрмөсөн хадгална."],
      ["Several changes either all happen or none do.", "Хэд хэдэн өөрчлөлт бүгд болно, эсвэл нэг нь ч болохгүй."]
    ],
    code: `
BEGIN;
UPDATE students SET city = 'Darkhan' WHERE id = 1;
SELECT name, city FROM students WHERE id = 1;
ROLLBACK;
SELECT name, city FROM students WHERE id = 1;
`,
    steps: [
      { line: 1, grid: { title: ["students (first 3 rows)", "students (эхний 3 мөр)"], cols: ["id", "name", "city"], rows: first3 }, head: ["Start a transaction", "Транзакц эхлүүлэх"],
        en: "`BEGIN` opens a transaction. From now on, changes are only a draft until you decide what to do with them.",
        mn: "`BEGIN` транзакц нээнэ. Одооноос эхлэн өөрчлөлтүүд таныг шийдэх хүртэл зөвхөн ноорог байна." },
      { line: 2, grid: { title: ["students (first 3 rows)", "students (эхний 3 мөр)"], cols: ["id", "name", "city"], rows: [[1, "Bat", "Darkhan"]].concat(first3.slice(1)) }, mark: { hl: [0] }, cell: [0, 2], head: ["Change", "Өөрчлөх"],
        en: "The `UPDATE` moves Bat to Darkhan, inside the draft.",
        mn: "`UPDATE` Bat-ийг ноорог дотор Darkhan руу шилжүүлнэ." },
      { line: 3, res: { cols: ["name", "city"], rows: [["Bat", "Darkhan"]] }, head: ["See the draft", "Ноорогийг харах"],
        en: "Inside the transaction, a `SELECT` already sees the change.",
        mn: "Транзакц дотор `SELECT` өөрчлөлтийг аль хэдийн харна." },
      { line: 4, grid: { title: ["students (first 3 rows)", "students (эхний 3 мөр)"], cols: ["id", "name", "city"], rows: first3 }, mark: { keep: [0] }, cell: [0, 2], head: ["Undo", "Буцаах"],
        en: "`ROLLBACK` throws the draft away. Every change since `BEGIN` is undone.",
        mn: "`ROLLBACK` ноорогийг хаяна. `BEGIN`-ээс хойшхи бүх өөрчлөлт буцна." },
      { line: 5, res: { cols: ["name", "city"], rows: [["Bat", "Ulaanbaatar"]] }, head: ["Back to before", "Өмнөх байдал руугаа"],
        en: "Bat is in Ulaanbaatar again, as if nothing had happened.",
        mn: "Bat юу ч болоогүй мэт дахин Ulaanbaatar-т байна.",
        note: ["Writing `COMMIT` instead of `ROLLBACK` would have saved the change for good.", "`ROLLBACK`-ийн оронд `COMMIT` бичсэн бол өөрчлөлт бүрмөсөн хадгалагдах байсан."] },
      { head: ["Why it matters", "Яагаад чухал вэ"],
        en: "A bank transfer takes money from one account and adds it to another. A transaction makes sure both happen, or neither does.",
        mn: "Банкны шилжүүлэг нэг данснаас мөнгө хасаж, нөгөөд нэмдэг. Транзакц хоёулаа болох, эсвэл аль нь ч болохгүйг баталгаажуулна." }
    ]
  });

  V("sql-create#fk", {
    at: "Foreign keys",
    title: ["A foreign key guards the link", "Гадаад түлхүүр холбоосыг хамгаална"],
    lang: "sql",
    sum: [
      ["`REFERENCES` says which table's IDs a column must point to.", "`REFERENCES` багана аль хүснэгтийн ID-г заах ёстойг хэлнэ."],
      ["A value that points to nothing is refused.", "Юуг ч заахгүй утгыг хүлээж авахгүй."],
      ["In SQLite, switch the check on with `PRAGMA foreign_keys = ON;`.", "SQLite-д шалгалтыг `PRAGMA foreign_keys = ON;`-оор асаана."]
    ],
    code: `
PRAGMA foreign_keys = ON;
CREATE TABLE teams (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE players (id INTEGER PRIMARY KEY, name TEXT,
  team_id INTEGER REFERENCES teams(id));
INSERT INTO teams VALUES (1, 'Khangarid'), (2, 'Erchim');
INSERT INTO players (name, team_id) VALUES ('Bold', 1);
INSERT INTO players (name, team_id) VALUES ('Ankhaa', 9);
`,
    steps: [
      { line: 1, head: ["Switch on the check", "Шалгалтыг асаах"],
        en: "SQLite checks foreign keys only after `PRAGMA foreign_keys = ON;`. Most other databases always check.",
        mn: "SQLite `PRAGMA foreign_keys = ON;`-ийн дараа л гадаад түлхүүрийг шалгадаг. Бусад ихэнх өгөгдлийн сан үргэлж шалгадаг." },
      { line: [3, 4], focus: "REFERENCES teams(id)", grid: { title: "players", cols: ["id", "name", "team_id"], rows: [] }, head: ["The link", "Холбоос"],
        en: "`team_id` must hold an `id` that exists in `teams`. That is the rule `REFERENCES` sets up.",
        mn: "`team_id` нь `teams`-д байгаа `id`-г агуулах ёстой. `REFERENCES` яг энэ дүрмийг тогтоодог." },
      { line: 5, res: { title: "teams", cols: ["id", "name"], rows: [[1, "Khangarid"], [2, "Erchim"]] }, head: ["Two teams", "Хоёр баг"],
        en: "Teams 1 and 2 are added.",
        mn: "1, 2-р багууд нэмэгдлээ." },
      { line: 6, grid: { title: "players", cols: ["id", "name", "team_id"], rows: [[1, "Bold", 1]] }, mark: { keep: [0] }, cell: [0, 2], calc: ["team_id = 1", "teams: id 1", "Khangarid ✓"], head: ["A valid player", "Зөв тоглогч"],
        en: "Bold's `team_id` is 1, and team 1 exists, so the row is accepted.",
        mn: "Bold-ийн `team_id` нь 1, 1-р баг байгаа тул мөрийг хүлээн авна." },
      { line: 7, calc: ["team_id = 9", "teams: id 9", "not found"], err: ["FOREIGN KEY constraint failed"], head: ["A team that does not exist", "Байхгүй баг"],
        en: "Ankhaa's `team_id` is 9, but there is no team 9, so the database refuses the row.",
        mn: "Ankhaa-гийн `team_id` нь 9, гэтэл 9-р баг байхгүй тул өгөгдлийн сан мөрийг хүлээж авахгүй." },
      { head: ["Why it helps", "Яагаад тустай вэ"],
        en: "Without this rule, players could point to teams that do not exist, and joins would silently lose them.",
        mn: "Энэ дүрэмгүй бол тоглогчид байхгүй багийг зааж болох бөгөөд холболт тэднийг дуугүйхэн алдах байсан." }
    ]
  });

  const pairs = E.slice(0, 7);
  const named = pairs.map((r) => [S.find((s) => s[0] === r[0])[1], C.find((c) => c[0] === r[1])[1]]);
  V("db-design#many", {
    at: "Relationships",
    title: ["Many-to-many needs a junction table", "Олон-олон холбоонд холбох хүснэгт хэрэгтэй"],
    lang: "sql",
    sum: [
      ["One student takes many courses, and one course has many students.", "Нэг оюутан олон хичээл үзэж, нэг хичээл олон оюутантай."],
      ["Neither table can hold that list in one cell.", "Аль ч хүснэгт энэ жагсаалтыг нэг нүдэнд хадгалж чадахгүй."],
      ["A junction table stores one row per pair, with two foreign keys.", "Холбох хүснэгт хос бүрт хоёр гадаад түлхүүртэй нэг мөр хадгална."]
    ],
    code: `
CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id  INTEGER REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
`,
    steps: [
      { grid: { title: ["who takes what (first 7 pairs)", "хэн юу үздэг (эхний 7 хос)"], cols: ["student", "course"], rows: named }, mark: { hl: [0, 1, 2] }, head: ["One student, many courses", "Нэг оюутан, олон хичээл"],
        en: "Bat takes three courses: Programming, Databases and Mathematics.",
        mn: "Bat гурван хичээл үздэг: Programming, Databases, Mathematics." },
      { mark: { hl: [0, 3, 6] }, head: ["One course, many students", "Нэг хичээл, олон оюутан"],
        en: "And Programming has many students: Bat, Saraa, Temuulen and more. This is a **many-to-many** relationship.",
        mn: "Programming олон оюутантай: Bat, Saraa, Temuulen гэх мэт. Энэ бол **олон-олон** холбоо." },
      { head: ["Where can it live?", "Хаана хадгалах вэ?"],
        en: "A `courses` column in `students` would need a list in one cell, and so would a `students` column in `courses`. Neither works.",
        mn: "`students`-д `courses` багана нэмбэл нэг нүдэнд жагсаалт бичих хэрэгтэй болно; `courses`-д `students` багана нэмсэн ч мөн адил. Аль нь ч болохгүй." },
      { line: [1, 3], grid: { title: "enrollments", cols: ["student_id", "course_id"], rows: pick(pairs, [0, 1]) }, head: ["A junction table", "Холбох хүснэгт"],
        en: "The answer is a junction table: one row for each student–course pair, holding two foreign keys.",
        mn: "Хариу нь холбох хүснэгт: оюутан–хичээлийн хос бүрт хоёр гадаад түлхүүртэй нэг мөр." },
      { line: 4, focus: "PRIMARY KEY (student_id, course_id)", cols: [0, 1], head: ["Each pair once", "Хос бүр нэг удаа"],
        en: "The primary key is the **pair** of columns, so the same student cannot enroll in the same course twice.",
        mn: "Үндсэн түлхүүр нь **хос** багана тул нэг оюутан нэг хичээлд хоёр удаа бүртгүүлж чадахгүй." }
    ]
  });

  V("db-code#injection", {
    at: "SQL injection",
    title: ["How SQL injection works", "SQL injection хэрхэн ажилладаг вэ"],
    sum: [
      ["Gluing user input into SQL lets the input change the query.", "Хэрэглэгчийн оруулгыг SQL-д залгах нь оруулгад хүсэлтийг өөрчлөх боломж олгоно."],
      ["`'1'='1'` is always true, so every row comes back.", "`'1'='1'` үргэлж true тул бүх мөр буцаж ирнэ."],
      ["Parameters such as `$1` keep the value apart from the SQL.", "`$1` зэрэг параметр утгыг SQL-ээс тусад нь байлгана."]
    ],
    code: `
const userInput = "x' OR '1'='1";
const sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
console.log(sql);
`,
    steps: [
      { line: 1, vars: { userInput: "\"x' OR '1'='1\"" }, head: ["What the attacker types", "Халдагч юу бичдэг вэ"],
        en: "Instead of a name, an attacker types a piece of SQL into the form.",
        mn: "Нэрийн оронд халдагч маягтад SQL-ийн хэсэг бичнэ." },
      { line: 2, focus: "+ userInput +", calc: ["\"… name = '\" + userInput + \"'\"", "\"… name = 'x' OR '1'='1'\""], head: ["Gluing text", "Текст залгах"],
        en: "The code glues the input straight into the SQL text. The quote inside the input closes the name early.",
        mn: "Код оруулгыг SQL текст рүү шууд залгана. Оруулга доторх хашилт нэрийг эрт хаадаг." },
      { line: 3, vars: { sql: "\"SELECT … OR '1'='1'\"" }, out: ["SELECT * FROM users WHERE name = 'x' OR '1'='1'"], head: ["The finished query", "Бэлэн болсон хүсэлт"],
        en: "Look at the finished query: it now has an extra `OR` condition that the programmer never wrote.",
        mn: "Бэлэн болсон хүсэлтийг хар: програмистын хэзээ ч бичээгүй нэмэлт `OR` нөхцөл орсон байна." },
      { calc: ["'1'='1'", "true", "every row"], head: ["Always true", "Үргэлж true"],
        en: "`'1'='1'` is always true, so `WHERE` lets every row through and every user's data comes back.",
        mn: "`'1'='1'` үргэлж true тул `WHERE` бүх мөрийг нэвтрүүлж, бүх хэрэглэгчийн мэдээлэл буцаж ирнэ." },
      { line: [2, 3], edit: { 2: "db.query(\"SELECT * FROM users WHERE name = $1\", [userInput]);", 3: "// the input is only data / оруулга зөвхөн өгөгдөл" }, focus: "$1", head: ["The fix", "Засвар"],
        en: "With a parameter, the SQL and the value travel separately. The database looks for a user literally named x' OR '1'='1 and finds no one.",
        mn: "Параметртэй бол SQL, утга хоёр тусдаа явна. Өгөгдлийн сан яг x' OR '1'='1 нэртэй хэрэглэгч хайгаад хэнийг ч олохгүй." }
    ]
  });
})();

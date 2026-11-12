// Lesson illustrations / Хичээлийн зураглал: one small SVG diagram per lesson showing its main mechanism,
// plus pictures for the home page track cards. Shapes take their colours from page classes (.ill …),
// so they follow the light and dark themes. Labels use <tspan class="l-en|l-mn"> so they follow the language.
(function () {
  CG.art = {};
  const X = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const n = (v) => +(+v).toFixed(1);

  // ---- drawing kit ----
  const anchor = (a) => (a && a !== "middle" ? ` text-anchor="${a}"` : ` text-anchor="middle"`);
  const tx = (x, y, s, cls, a) => `<text x="${n(x)}" y="${n(y)}"${cls ? ` class="${cls}"` : ""}${anchor(a)}>${X(s)}</text>`;
  const tl = (x, y, en, mn, cls, a) => `<text x="${n(x)}" y="${n(y)}"${cls ? ` class="${cls}"` : ""}${anchor(a)}><tspan class="l-en">${X(en)}</tspan><tspan class="l-mn">${X(mn)}</tspan></text>`;
  const R = (x, y, w, h, cls, r = 8) => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" class="${cls}"/>`;
  const L = (x1, y1, x2, y2, cls = "ln") => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" class="${cls}"/>`;
  const C = (cx, cy, r, cls) => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${r}" class="${cls}"/>`;
  const P = (d, cls = "ln") => `<path d="${d}" class="${cls}"/>`;
  const G = (cls, body) => `<g class="${cls}">${body}</g>`;
  const head = (x1, y1, x2, y2, kind) => {
    const a = Math.atan2(y2 - y1, x2 - x1), s = 8;
    const p = (d) => `${n(x2 - s * Math.cos(a + d))},${n(y2 - s * Math.sin(a + d))}`;
    return `<polygon points="${n(x2)},${n(y2)} ${p(0.42)} ${p(-0.42)}" class="awh ${kind || ""}"/>`;
  };
  // A straight arrow ending at (x2, y2). kind: "" | acc | mute | ok | bad | gold
  const AR = (x1, y1, x2, y2, kind) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return L(x1, y1, x2 - 6 * Math.cos(a), y2 - 6 * Math.sin(a), `aw ${kind || ""}`) + head(x1, y1, x2, y2, kind);
  };
  // An arrow along several points [[x, y], …].
  const PA = (pts, kind) => {
    const [x1, y1] = pts[pts.length - 2], [x2, y2] = pts[pts.length - 1];
    const a = Math.atan2(y2 - y1, x2 - x1);
    const d = pts.map((p, i) => (i ? "L" : "M") + n(i === pts.length - 1 ? p[0] - 6 * Math.cos(a) : p[0]) + "," + n(i === pts.length - 1 ? p[1] - 6 * Math.sin(a) : p[1])).join(" ");
    return P(d, `aw ${kind || ""}`) + head(x1, y1, x2, y2, kind);
  };
  const DM = (cx, cy, hw, hh, cls) => `<polygon points="${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}" class="${cls}"/>`;
  // A database drum.
  const CYL = (x, y, w, h, cls) => P(`M${x},${y + 10} V${y + h - 10} A${w / 2},10 0 0 0 ${x + w},${y + h - 10} V${y + 10}`, cls) +
    `<ellipse cx="${x + w / 2}" cy="${y + 10}" rx="${w / 2}" ry="10" class="${cls}"/>`;
  // A labelled box that holds one value, like a variable.
  const JAR = (x, y, w, name, value, cls) => R(x, y, w, 64, cls || "box", 10) + R(x + 1, y + 1, w - 2, 22, "tabfill", 9) + R(x + 1, y + 12, w - 2, 11, "tabfill", 0) +
    tx(x + w / 2, y + 16, name, "m sm a") + tx(x + w / 2, y + 50, value, "m lg");
  // A table: column widths, header, rows. o.rows {i: keep|bad|gold|hl|fade}, o.cols [j…], o.cell [i, j], o.rh row height.
  const TB = (x, y, ws, headRow, rows, o = {}) => {
    const rh = o.rh || 26, W = ws.reduce((s, v) => s + v, 0), H = rh * (rows.length + 1);
    const xs = ws.reduce((acc, v, i) => acc.concat(i ? acc[i - 1] + ws[i - 1] : x), []);
    let s = R(x, y, W, H, "box", 6) + R(x + 1, y + 1, W - 2, rh - 1, "thd", 5) + R(x + 1, y + rh / 2, W - 2, rh / 2, "thd", 0);
    (o.cols || []).forEach((j) => { s += R(xs[j], y + 1, ws[j], H - 2, "hc", 0); });
    rows.forEach((r, i) => { const k = (o.rows || {})[i]; if (k) s += R(x + 1, y + rh * (i + 1), W - 2, rh, "row-" + k, 0); });
    rows.forEach((r, i) => { s += L(x, y + rh * (i + 1), x + W, y + rh * (i + 1), "grid"); });
    xs.slice(1).forEach((cx) => { s += L(cx, y, cx, y + H, "grid"); });
    headRow.forEach((h, j) => { s += tx(xs[j] + 7, y + rh * 0.66, h, "th", "start"); });
    rows.forEach((r, i) => r.forEach((v, j) => {
      s += tx(xs[j] + 7, y + rh * (i + 1) + rh * 0.66, v === null ? "NULL" : v, "td" + ((o.rows || {})[i] === "fade" ? " fadet" : ""), "start");
    }));
    if (o.cell) s += R(xs[o.cell[1]] + 1, y + rh * (o.cell[0] + 1) + 1, ws[o.cell[1]] - 2, rh - 2, "cellmark", 3);
    return s;
  };
  // A small table icon: a name over a few grid lines.
  const MINI = (x, y, w, h, name) => R(x, y, w, h, "box", 6) + R(x + 1, y + 1, w - 2, 14, "thd", 5) + R(x + 1, y + 8, w - 2, 7, "thd", 0) +
    L(x, y + 15, x + w, y + 15, "grid") + L(x, y + 15 + (h - 15) / 2, x + w, y + 15 + (h - 15) / 2, "grid") + L(x + w * 0.3, y + 15, x + w * 0.3, y + h, "grid") +
    tx(x + w / 2, y + 11.5, name, "m xs");

  const A = (id, h, caption, body, w) => { CG.art[id] = { w: w || 480, h, caption, body }; };

  // ---------------- Track 1: JavaScript ----------------

  A("js-intro", 180, ["The JavaScript engine reads your code from top to bottom and prints each result in the same order.", "JavaScript хөдөлгүүр кодыг дээрээс доош уншиж, үр дүн бүрийг ижил дарааллаар хэвлэнэ."],
    tl(90, 18, "Your code", "Таны код", "s") + R(10, 28, 160, 130, "con", 10) +
    [["1", 'console.log("A")', 66], ["2", 'console.log("B")', 96], ["3", 'console.log("C")', 126]].map((l) => tx(24, l[2], l[0], "cm m sm", "start") + tx(40, l[2], l[1], "ct m sm", "start")).join("") +
    AR(172, 93, 218, 93) + tl(195, 84, "reads", "уншина", "xs") +
    R(220, 68, 72, 50, "soft", 10) + tx(256, 90, "JS", "b a") + tl(256, 107, "engine", "хөдөлгүүр", "xs") +
    AR(294, 93, 342, 93, "acc") + tl(318, 84, "prints", "хэвлэнэ", "xs") +
    tl(407, 18, "Output", "Гаралт", "s") + R(344, 28, 126, 130, "box", 10) +
    tx(360, 66, "A", "m", "start") + tx(360, 96, "B", "m", "start") + tx(360, 126, "C", "m", "start"));

  A("js-variables", 170, ["`price` and `count` are boxes holding values. JavaScript reads them, multiplies them, and `=` stores the answer in a third box, `total`.", "`price`, `count` бол утга хадгалдаг хайрцгууд. JavaScript тэдгээрийг уншиж үржүүлээд, `=` хариуг гурав дахь `total` хайрцагт хадгална."],
    JAR(20, 12, 120, "price", "2500") + JAR(20, 96, 120, "count", "3") +
    AR(142, 50, 208, 74) + AR(142, 122, 208, 98) +
    C(232, 86, 24, "soft") + tx(232, 93, "×", "lg a") +
    AR(258, 86, 326, 86, "acc") + tx(292, 76, "=", "b a") + tl(292, 104, "stores", "хадгална", "s") +
    JAR(330, 54, 130, "total", "7500", "box hi"));

  A("js-types", 180, ["Three basic types: text in quotes, numbers you can calculate with, and booleans that can only be true or false.", "Гурван үндсэн төрөл: хашилт доторх текст, тооцоо хийж болох тоо, зөвхөн true эсвэл false байх логик утга."],
    R(10, 10, 144, 160, "box", 12) + tl(82, 36, "string", "текст (string)", "s b") + tx(82, 94, '"Nomin"', "m lg a") + tl(82, 120, "text in quotes", "хашилттай текст", "xs") + tx(82, 152, 'typeof → "string"', "m xs") +
    R(168, 10, 144, 160, "box", 12) + tl(240, 36, "number", "тоо (number)", "s b") + tx(240, 94, "19", "m lg a") + tx(240, 120, "+  −  ×  ÷", "xs") + tx(240, 152, 'typeof → "number"', "m xs") +
    R(326, 10, 144, 160, "box", 12) + tl(398, 36, "boolean", "логик (boolean)", "s b") + R(363, 70, 70, 32, "fill", 16) + C(417, 86, 12, "knob") + tx(398, 120, "true / false", "m xs") + tx(398, 152, 'typeof → "boolean"', "m xs"));

  A("js-operators", 150, ["135 minutes hold two whole hours of 60. `Math.floor` counts the whole hours, and `%` gives the 15 minutes left over.", "135 минутад 60-аар хоёр бүтэн цаг багтана. `Math.floor` бүтэн цагийг тоолж, `%` үлдсэн 15 минутыг өгнө."],
    tl(240, 20, "135 minutes", "135 минут", "b") +
    R(20, 32, 195.6, 40, "soft", 4) + R(215.6, 32, 195.5, 40, "soft", 4) + R(411.1, 32, 48.9, 40, "gold", 4) +
    tx(117.8, 57, "60", "m b a") + tx(313.4, 57, "60", "m b a") + tx(435.5, 57, "15", "m b g") +
    P("M20,82 v8 H411 v-8") + tx(215.6, 110, "Math.floor(135 / 60) → 2", "m sm") + tl(215.6, 128, "2 whole hours", "2 бүтэн цаг", "xs") +
    P("M411,82 v8 H460 v-8") + tx(460, 110, "135 % 60 → 15", "m sm", "end") + tl(460, 128, "left over", "үлдэгдэл", "xs", "end"));

  A("js-conditions", 210, ["For a score of 82 the first question is no and the second is yes, so the path ends at \"B\". The other branches are never visited.", "82 онооны хувьд эхний асуулт «үгүй», хоёр дахь нь «тийм» тул зам \"B\" дээр дуусна. Бусад салаа огт ажиллахгүй."],
    R(10, 84, 72, 36, "box", 18) + tx(46, 107, "82", "m b") +
    AR(84, 102, 106, 102, "acc") +
    DM(165, 102, 58, 40, "soft") + tx(165, 107, "≥ 90 ?", "m b") +
    AR(224, 102, 255, 102, "acc") + tl(240, 93, "no", "үгүй", "xs") +
    DM(315, 102, 58, 40, "soft") + tx(315, 107, "≥ 80 ?", "m b") +
    G("fade", AR(165, 62, 165, 36, "mute") + tl(173, 52, "yes", "тийм", "xs", "start") + R(140, 6, 50, 28, "box", 8) + tx(165, 25, '"A"', "m")) +
    AR(374, 102, 400, 102, "acc") + tl(387, 93, "yes", "тийм", "xs") +
    R(402, 84, 68, 36, "ok", 10) + tx(436, 107, '"B"', "m b okt") +
    G("fade", AR(315, 143, 315, 170, "mute") + tl(323, 160, "no", "үгүй", "xs", "start") + R(290, 172, 50, 28, "box", 8) + tx(315, 191, '"C"', "m")));

  A("js-loops", 240, ["Each round checks the condition, runs the body, then steps the counter. When `i` reaches 4 the check is false and the loop ends.", "Тойрог бүр нөхцөлийг шалгаж, биеийг ажиллуулаад, тоолуурыг нэмнэ. `i` 4 болоход шалгалт false болж давталт дуусна."],
    tx(100, 22, "let i = 1", "m xs") +
    R(40, 34, 120, 38, "soft", 10) + tx(100, 58, "i <= 3 ?", "m b") +
    AR(100, 72, 100, 106, "acc") + tx(108, 93, "true", "m xs okt", "start") +
    R(40, 108, 120, 38, "box", 10) + tx(100, 132, "sum += i", "m") +
    AR(100, 146, 100, 180, "acc") +
    R(40, 182, 120, 38, "box", 10) + tx(100, 206, "i++", "m") +
    PA([[40, 201], [18, 201], [18, 53], [38, 53]], "acc") +
    AR(160, 53, 206, 53, "bad") + tx(183, 45, "false", "m xs badt") +
    R(208, 36, 72, 34, "box", 10) + tl(244, 58, "done", "дууслаа", "s b") +
    tl(385, 86, "rounds", "тойргууд", "xs") +
    TB(300, 96, [50, 60, 60], ["i", "sum", "i <= 3"], [["1", "1", "true"], ["2", "3", "true"], ["3", "6", "true"], ["4", "6", "false"]], { rows: { 3: "bad" } }));

  A("js-functions", 170, ["Arguments go in and fill the parameters, the body works out the answer, and `return` sends it back out.", "Аргументууд орж параметрүүдийг бөглөнө, бие нь хариуг бодож, `return` түүнийг гадагш буцаана."],
    R(14, 32, 56, 30, "box", 15) + tx(42, 52, "4", "m b") + R(14, 104, 56, 30, "box", 15) + tx(42, 124, "5", "m b") +
    AR(72, 47, 146, 66) + tx(108, 46, "width", "m xs a") + AR(72, 119, 146, 100) + tx(108, 128, "height", "m xs a") +
    R(148, 26, 190, 116, "soft", 14) + tx(243, 52, "area(width, height)", "m sm b a") +
    R(166, 66, 154, 34, "con", 8) + tx(243, 88, "width * height", "ct m sm") + tl(243, 128, "return", "буцаана", "xs") +
    AR(340, 84, 368, 84, "acc") + JAR(370, 52, 100, "room", "20", "box hi"));

  A("js-arrays", 170, ["An array is a row of numbered slots. Numbering starts at 0, so the last of 4 items sits at position 3.", "Массив бол дугаартай нүднүүдийн эгнээ. Дугаарлалт 0-ээс эхэлдэг тул 4 утгын сүүлийнх нь 3-р байрлалд байна."],
    tx(14, 24, "const aimags = [ … ]", "m xs", "start") + tx(466, 24, "aimags.length → 4", "m xs", "end") +
    ['"Arkhangai"', '"Bayan-Ölgii"', '"Khentii"', '"Dornod"'].map((v, i) => R(14 + i * 114, 38, 106, 56, i === 2 ? "box hi" : "box", 8) + tx(67 + i * 114, 71, v, "m xs") + tx(67 + i * 114, 116, "[" + i + "]", "m b a")).join("") +
    tx(295, 146, 'aimags[2] → "Khentii"', "m xs a") + tx(409, 164, "length − 1 = 3", "m xs"));

  A("js-objects", 190, ["An object is like an ID card: each label (key) has one value. `student.city` finds the label `city` and reads its value.", "Объект бол иргэний үнэмлэх шиг: шошго (түлхүүр) бүр нэг утгатай. `student.city` нь `city` шошгыг олж, утгыг нь уншина."],
    R(176, 12, 290, 166, "box", 14) + R(177, 13, 288, 36, "tabfill", 13) + R(177, 30, 288, 19, "tabfill", 0) + C(200, 31, 10, "fill") + tx(220, 36, "student", "m b a", "start") +
    R(184, 126, 274, 30, "hlbg", 6) +
    [["name:", '"Enkhjin"', 76], ["age:", "19", 108], ["city:", '"Ulaanbaatar"', 146]].map((r) => tx(196, r[2], r[0], "m sm mutet", "start") + tx(276, r[2], r[1], "m", "start")).join("") +
    L(190, 90, 452, 90, "grid") + L(190, 122, 452, 122, "grid") +
    R(10, 126, 130, 30, "con", 8) + tx(75, 146, "student.city", "ct m sm") + AR(142, 141, 182, 141, "acc"));

  A("js-errors", 180, ["Every error message has the same three parts: the kind of problem, the name it is about, and the reason. Here the cause is a typo.", "Алдааны мэдээлэл бүр ижил гурван хэсэгтэй: асуудлын төрөл, хамаатай нэр, шалтгаан. Энд шалтгаан нь үсгийн алдаа."],
    R(10, 12, 460, 36, "con", 8) + tx(26, 35, "console.log(mesage);", "ct m", "start") + L(116, 41, 161, 41, "badln") +
    AR(138, 50, 138, 78, "bad") +
    R(10, 80, 460, 38, "bad", 8) + tx(26, 104, "ReferenceError: mesage is not defined", "m badt", "start") +
    P("M26,126 v6 H138 v-6") + tl(82, 150, "type", "төрөл", "s b") + tl(82, 166, "what kind", "ямар асуудал", "xs") +
    P("M146,126 v6 H191 v-6") + tl(168, 150, "what", "юу", "s b") + tl(168, 166, "the name", "нэр", "xs") +
    P("M198,126 v6 H304 v-6") + tl(251, 150, "why", "яагаад", "s b") + tl(251, 166, "the reason", "шалтгаан", "xs") +
    tx(400, 150, "✓ message", "m okt") + tl(400, 166, "fix the spelling", "бичлэгийг зас", "xs"));

  // ---------------- Track 2: SQL ----------------

  A("db-intro", 180, ["An app asks a question in SQL. The database system finds the answer in its tables and sends back a result table.", "Апп SQL-ээр асуулт тавина. Өгөгдлийн сангийн систем хариуг хүснэгтүүдээсээ олж, үр дүнгийн хүснэгт буцаана."],
    R(10, 56, 90, 72, "box", 12) + R(22, 66, 66, 30, "thd", 6) + tl(55, 86, "App", "Апп", "b") + tl(55, 114, "asks", "асууна", "xs") +
    AR(102, 74, 166, 74, "acc") + tx(134, 66, "SQL", "m xs a") +
    AR(166, 110, 102, 110) + tl(134, 126, "result", "үр дүн", "xs") +
    CYL(170, 46, 100, 92, "soft") + tx(220, 98, "SQLite", "b a") + tl(220, 116, "DBMS", "ӨСУС", "xs") +
    L(272, 92, 318, 40) + L(272, 92, 318, 90) + L(272, 92, 318, 140) +
    MINI(320, 20, 150, 40, "students") + MINI(320, 70, 150, 40, "courses") + MINI(320, 120, 150, 40, "enrollments"));

  A("db-tables", 160, ["A table: each row is one student, each column is one kind of fact, and each cell holds one value. `id` is the primary key.", "Хүснэгт: мөр бүр нэг оюутан, багана бүр нэг төрлийн баримт, нүд бүр нэг утга. `id` бол үндсэн түлхүүр."],
    TB(14, 16, [46, 72, 90, 44], ["id", "name", "city", "age"], [[1, "Bat", "Ulaanbaatar", 19], [2, "Saraa", "Darkhan", 20], [3, "Temuulen", "Ulaanbaatar", 18], [4, "Nomin", "Erdenet", 21]], { rows: { 1: "gold" }, cols: [2], cell: [1, 2], rh: 26 }) +
    tx(39, 33, "PK", "pk", "start") +
    R(286, 30, 16, 14, "row-gold", 3) + tl(310, 42, "row · one student", "мөр · нэг оюутан", "sm", "start") +
    R(286, 62, 16, 14, "hc", 3) + tl(310, 74, "column · one kind of fact", "багана · нэг баримт", "sm", "start") +
    R(286, 94, 16, 14, "cellmark", 3) + tl(310, 106, "cell · one value", "нүд · нэг утга", "sm", "start") +
    tx(286, 138, "PK", "pk", "start") + tl(310, 138, "id · primary key", "id · үндсэн түлхүүр", "sm", "start"));

  const st3 = [["Bat", "Ulaanbaatar", 19, 3.4], ["Saraa", "Darkhan", 20, 3.8], ["Temuulen", "Ulaanbaatar", 18, 2.9]];
  A("sql-select", 160, ["`SELECT name, city` picks two columns: the result keeps only those. The table itself is not changed.", "`SELECT name, city` хоёр багана сонгоно: үр дүнд зөвхөн тэд үлдэнэ. Хүснэгт өөрөө өөрчлөгдөхгүй."],
    tx(124, 22, "students", "m xs") + TB(10, 32, [62, 88, 38, 40], ["name", "city", "age", "gpa"], st3, { cols: [0, 1], rh: 28 }) +
    AR(244, 88, 290, 88, "acc") + tx(267, 79, "SELECT", "m xs a") +
    tl(382, 22, "result", "үр дүн", "xs") + TB(296, 32, [72, 100], ["name", "city"], st3.map((r) => [r[0], r[1]]), { rh: 28 }));

  const chips = [["Bat", "Ulaanbaatar", 0], ["Saraa", "Darkhan", 1], ["Nomin", "Erdenet", 0], ["Oyunaa", "Darkhan", 1], ["Anu", "Murun", 0]];
  A("sql-where", 220, ["`WHERE` lets through only the rows that make its condition true. The others are left out of the result, not deleted.", "`WHERE` нөхцөлөө true болгосон мөрүүдийг л нэвтрүүлнэ. Бусад нь устахгүй, зөвхөн үр дүнд орохгүй."],
    chips.map((c, i) => G(c[2] ? "" : "fade", R(10 + i * 93, 12, 86, 44, c[2] ? "box hi" : "box", 8) + tx(53 + i * 93, 31, c[0], "sm b") + tx(53 + i * 93, 47, c[1], "xs mutet")) +
      AR(53 + i * 93, 58, 53 + i * 93, 80, c[2] ? "acc" : "mute")).join("") +
    `<polygon points="40,82 440,82 300,142 180,142" class="soft"/>` + tx(240, 117, "WHERE city = 'Darkhan'", "m b a") +
    AR(222, 142, 196, 166, "acc") + AR(258, 142, 284, 166, "acc") +
    R(150, 168, 86, 40, "ok", 8) + tx(193, 192, "Saraa", "sm b okt") + R(244, 168, 86, 40, "ok", 8) + tx(287, 192, "Oyunaa", "sm b okt") +
    tl(346, 192, "3 rows left out", "3 мөр хасагдсан", "xs mutet", "start"));

  const gpas = [["Enkhjin", 3.9], ["Saraa", 3.8], ["Nomin", 3.6], ["Anu", 3.5], ["Bat", 3.4], ["Oyunaa", 3.2]];
  A("sql-order", 200, ["`ORDER BY gpa DESC` lines the students up from the highest GPA down. `LIMIT 3` then keeps only the first three.", "`ORDER BY gpa DESC` оюутнуудыг хамгийн өндөр голчоос нь доош жагсаана. Дараа нь `LIMIT 3` эхний гурвыг л үлдээнэ."],
    P("M24,32 v-6 H222 v6", "ln acc") + tx(123, 20, "LIMIT 3", "m b a") + tx(466, 20, "ORDER BY gpa DESC", "m xs", "end") +
    gpas.map((g, i) => {
      const h = g[1] * 120 / 3.9, x = 24 + i * 74;
      return R(x, 168 - h, 50, h, i < 3 ? "fill" : "soft", 4) + tx(x + 25, 168 - h - 6, String(g[1]), "m xs" + (i < 3 ? " a b" : "")) + tx(x + 25, 186, g[0], "xs");
    }).join("") + L(14, 168, 466, 168));

  const piles = [["Ulaanbaatar", 4], ["Darkhan", 2], ["Erdenet", 2], ["Khovd", 1], ["Murun", 1]];
  A("sql-aggregate", 210, ["`GROUP BY city` sorts the 10 rows into one pile per city. `COUNT(*)` then gives each pile one number.", "`GROUP BY city` 10 мөрийг хот бүрээр нэг овоо болгоно. Дараа нь `COUNT(*)` овоо бүрт нэг тоо өгнө."],
    tl(43, 26, "10 rows", "10 мөр", "xs b") +
    Array.from({ length: 10 }, (_, k) => R(20, 36 + k * 15, 46, 12, "soft", 3)).join("") +
    AR(76, 111, 124, 111, "acc") + tx(100, 100, "GROUP BY", "m xs a") +
    tx(304, 22, "COUNT(*) → 4, 2, 2, 1, 1", "m xs a") +
    piles.map((p, j) => {
      const x = 140 + j * 66;
      return Array.from({ length: p[1] }, (_, k) => R(x, 172 - (k + 1) * 15, 50, 12, "fill", 3)).join("") + tx(x + 25, 172 - p[1] * 15 - 8, String(p[1]), "m b a") + tx(x + 25, 190, p[0], "xxs");
    }).join("") + L(130, 172, 466, 172));

  const rc = [82, 110, 138];
  A("sql-join", 200, ["`JOIN … ON` follows each ID to the matching row in the other table, so the numbers 1, 2, 78 become Bat, Databases, 78.", "`JOIN … ON` ID бүрийг нөгөө хүснэгтийн тохирох мөр хүртэл дагадаг тул 1, 2, 78 гэсэн тоо Bat, Databases, 78 болно."],
    tx(56, 30, "students", "m xs") + tx(230, 30, "enrollments", "m xs") + tx(413, 30, "courses", "m xs") +
    TB(8, 40, [26, 70], ["id", "name"], [[1, "Bat"], [2, "Saraa"], [3, "Temuulen"]], { rows: { 0: "hl" }, rh: 28 }) +
    TB(140, 40, [72, 68, 40], ["student_id", "course_id", "score"], [[1, 1, 85], [1, 2, 78], [2, 1, 95]], { rows: { 1: "hl" }, rh: 28 }) +
    TB(356, 40, [26, 88], ["id", "title"], [[1, "Programming"], [2, "Databases"], [3, "Mathematics"]], { rows: { 1: "hl" }, rh: 28 }) +
    L(140, rc[0], 104, rc[0], "link") + L(140, rc[2], 104, rc[1], "link") + L(320, rc[0], 356, rc[0], "link") + L(320, rc[2], 356, rc[0], "link") +
    L(140, rc[1], 104, rc[0], "link acc") + L(320, rc[1], 356, rc[1], "link acc") +
    AR(230, 152, 230, 166, "acc") + R(150, 168, 160, 28, "ok", 14) + tx(230, 187, "Bat · Databases · 78", "m xs b okt"));

  A("sql-modify", 210, ["The four things apps do with data. `INSERT` adds a row, `UPDATE` changes a value, `DELETE` removes a row, and only `SELECT` leaves the table as it was.", "Аппуудын өгөгдөлтэй хийдэг дөрвөн үйлдэл. `INSERT` мөр нэмж, `UPDATE` утга өөрчилж, `DELETE` мөр устгана; зөвхөн `SELECT` хүснэгтийг хэвээр нь үлдээнэ."],
    tx(240, 22, "SELECT", "m b a") + tl(240, 38, "reads, changes nothing", "уншина, юу ч өөрчлөхгүй", "xs") + AR(240, 44, 240, 56, "acc") +
    TB(138, 58, [36, 76, 92], ["id", "name", "city"], [[1, "Bat", "Ulaanbaatar"], [2, "Saraa", "Erdenet"], [3, "Temuulen", "Ulaanbaatar"], [11, "Khulan", "Choibalsan"]], { rows: { 2: "bad", 3: "keep" }, cell: [1, 2] }) +
    L(146, 149, 334, 149, "badln") +
    tx(20, 170, "INSERT", "m b okt", "start") + tl(20, 186, "adds a row", "мөр нэмнэ", "xs", "start") + AR(90, 175, 134, 175, "ok") +
    tx(462, 112, "UPDATE", "m b g", "end") + tl(462, 128, "changes a value", "утга өөрчилнө", "xs", "end") + AR(372, 123, 346, 123, "gold") +
    tx(462, 156, "DELETE", "m b badt", "end") + tl(462, 172, "removes a row", "мөр устгана", "xs", "end") + AR(372, 149, 346, 149, "bad"));

  const field = (y, nameType, tag) => R(24, y - 20, 212, 30, "thd", 6) + tx(34, y, nameType, "m sm", "start") + R(228 - tag.length * 6.6 - 12, y - 15, tag.length * 6.6 + 12, 20, "soft", 10) + tx(228 - (tag.length * 6.6 + 12) / 2, y, tag, "m xxs a");
  A("sql-create", 190, ["`CREATE TABLE` defines the columns and their rules. A row that breaks a rule, such as a missing name or a negative age, is refused.", "`CREATE TABLE` багана, тэдгээрийн дүрмийг тодорхойлно. Нэргүй эсвэл сөрөг настай гэх мэт дүрэм зөрчсөн мөрийг хүлээж авахгүй."],
    R(10, 10, 240, 170, "box", 12) + tx(24, 36, "CREATE TABLE pets", "m b a", "start") +
    field(74, "id INTEGER", "PRIMARY KEY") + field(114, "name TEXT", "NOT NULL") + field(154, "age INTEGER", "CHECK age >= 0") +
    R(300, 22, 130, 30, "ok", 15) + tx(365, 42, "('Khaliun', 3)", "m xs") + AR(298, 37, 254, 37, "ok") + tl(365, 66, "✓ accepted", "✓ хүлээн авлаа", "xs okt") +
    R(300, 86, 130, 30, "bad", 15) + tx(365, 106, "(NULL, 2)", "m xs") + AR(298, 101, 264, 101, "bad") + L(260, 91, 260, 111, "badln") + tl(365, 130, "✗ NOT NULL", "✗ NOT NULL", "xs badt") +
    R(300, 146, 130, 30, "bad", 15) + tx(365, 166, "('Bars', -1)", "m xs") + AR(298, 161, 264, 161, "bad") + L(260, 151, 260, 171, "badln") + tl(365, 188, "✗ CHECK", "✗ CHECK", "xs badt"), 480);

  A("db-design", 190, ["Before: the teacher's phone is copied into every row. After: it is stored once in `teachers`, and other tables point to it by `id`.", "Өмнө: багшийн утас мөр бүрт хуулагдсан. Дараа: `teachers` хүснэгтэд нэг удаа хадгалагдаж, бусад хүснэгт түүнийг `id`-аар заана."],
    tl(101, 26, "before: one table", "өмнө: нэг хүснэгт", "xs b") +
    TB(8, 36, [54, 48, 84], ["student", "teacher", "phone"], [["Bat", "Dorj", "9911 2233"], ["Saraa", "Dorj", "9911 2233"], ["Nomin", "Dorj", "9911 2233"]], { cols: [2], rh: 28 }) +
    AR(202, 92, 250, 92, "acc") + tl(226, 82, "split", "хуваах", "xs") +
    tl(345, 26, "after: each fact once", "дараа: баримт бүр нэг удаа", "xs b") +
    TB(262, 36, [30, 54, 82], ["id", "name", "phone"], [[1, "Dorj", "9911 2233"]], { rows: { 0: "keep" }, rh: 28 }) +
    TB(262, 128, [92, 74], ["title", "teacher_id"], [["Programming", 1]], { rh: 28 }) +
    PA([[391, 128], [391, 108], [277, 108], [277, 94]], "acc") + tx(334, 104, "REFERENCES", "m xxs a"));

  A("db-code", 190, ["The browser never talks to the database directly. The server sends the SQL with the value kept apart in `$1`, and returns the rows as JSON.", "Хөтөч өгөгдлийн сантай хэзээ ч шууд харилцдаггүй. Сервер утгыг `$1`-д тусад нь байлгаж SQL илгээгээд, мөрүүдийг JSON болгон буцаана."],
    R(10, 60, 110, 62, "box", 12) + C(24, 72, 3, "dot") + C(34, 72, 3, "dot") + C(44, 72, 3, "dot") + L(10, 80, 120, 80, "grid") + tl(65, 106, "Browser", "Хөтөч", "b") +
    R(185, 60, 110, 62, "soft", 12) + tl(240, 92, "Server", "Сервер", "b") + tx(240, 110, "Node.js", "m xs") +
    CYL(370, 52, 100, 78, "box") + tl(420, 98, "Database", "Өгөгдлийн сан", "sm b") +
    AR(122, 72, 181, 72, "acc") + tl(151, 62, "1 click", "1 дарна", "xs") +
    AR(297, 72, 366, 72, "acc") + tx(331, 62, "2 SQL + $1", "m xxs a") +
    AR(366, 112, 297, 112) + tl(331, 128, "3 rows", "3 мөрүүд", "xs") +
    AR(181, 112, 122, 112) + tl(151, 128, "4 JSON", "4 JSON", "xs") +
    P("M65,124 Q240,186 420,132", "ln dash badst") + tl(240, 176, "never directly", "шууд хэзээ ч үгүй", "xs badt"));
})();

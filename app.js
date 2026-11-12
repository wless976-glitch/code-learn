// Код Гэр app: routing, rendering, code runners (JavaScript in a worker, SQL via SQLite/sql.js).
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
  const tidy = (code) => String(code).replace(/^\n+/, "").replace(/\s+$/, "");

  // Inline markup inside lesson text: `code`, **bold**, *italic*, [link](https://…)
  function inline(s) {
    return String(s).split(/(`[^`]+`)/g).map((part) => {
      if (part.length > 1 && part[0] === "`" && part[part.length - 1] === "`") return "<code>" + esc(part.slice(1, -1)) + "</code>";
      return esc(part)
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[\s(«])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)»]|$)/g, "$1<em>$2</em>");
    }).join("");
  }
  // Short bilingual label (buttons, menus, messages): one language at a time; Mongolian in "both" mode.
  const t = (en, mn) => `<span class="l-en" lang="en">${en}</span><span class="l-mn" lang="mn">${mn}</span>`;
  const tp = (pair) => t(inline(pair[0]), inline(pair[1]));
  // Paired content: in "both" mode Mongolian on top, English below it (.stack) or beside it (.bi).
  const st = (en, mn) => `<span class="stack">${t(en, mn)}</span>`;
  const bi = (en, mn, tag = "p") => `<div class="bi"><${tag} class="en" lang="en">${en}</${tag}><${tag} class="mn" lang="mn">${mn}</${tag}></div>`;

  // Line icons on a 20px grid.
  const ICONS = {
    home: '<path d="M3 9.5 10 3.5l7 6"/><path d="M5 8.2v8.3h10V8.2"/><path d="M8.3 16.5v-4.5h3.4v4.5"/>',
    book: '<path d="M4 4.6A1.6 1.6 0 0 1 5.6 3H16v12H5.6A1.6 1.6 0 0 0 4 16.6z"/><path d="M4 16.6A1.6 1.6 0 0 0 5.6 18H16"/>',
    braces: '<path d="M7 3.5c-1.7 0-2.5.8-2.5 2.5v1.5c0 1.2-.8 2-1.8 2.5 1 .5 1.8 1.3 1.8 2.5V14c0 1.7.8 2.5 2.5 2.5M13 3.5c1.7 0 2.5.8 2.5 2.5v1.5c0 1.2.8 2 1.8 2.5-1 .5-1.8 1.3-1.8 2.5V14c0 1.7-.8 2.5-2.5 2.5"/>',
    bulb: '<path d="M7.6 14.6h4.8M8.4 17.4h3.2"/><path d="M10 2.6a5 5 0 0 0-3.1 8.9c.6.5 1 1.2 1 2v.4h4.2v-.4c0-.8.4-1.5 1-2A5 5 0 0 0 10 2.6z"/>',
    warn: '<path d="M10 3 2.6 16.4h14.8z"/><path d="M10 8.4v3.6M10 14.2v.1"/>',
    danger: '<circle cx="10" cy="10" r="7.4"/><path d="M10 6v4.6M10 13.6v.1"/>',
    pencil: '<path d="M13.4 3.6l3 3L7 16H4v-3z"/><path d="M11.4 5.6l3 3"/>',
    quiz: '<circle cx="10" cy="10" r="7.4"/><path d="M7.9 7.9a2.2 2.2 0 0 1 4.2.8c0 1.5-2.1 1.8-2.1 3.3M10 14.2v.1"/>',
    eye: '<path d="M2.2 10S5 4.6 10 4.6 17.8 10 17.8 10 15 15.4 10 15.4 2.2 10 2.2 10z"/><circle cx="10" cy="10" r="2.3"/>',
    search: '<circle cx="9" cy="9" r="5.4"/><path d="M13 13l4 4"/>',
    arrowR: '<path d="M4 10h12M11 5l5 5-5 5"/>',
    arrowL: '<path d="M16 10H4M9 5l-5 5 5 5"/>',
    reset: '<path d="M4.2 10a5.8 5.8 0 1 0 1.7-4.1"/><path d="M4.2 3.6v3.6h3.6"/>',
    play: '<path d="M6.5 4.5v11l8.5-5.5z" fill="currentColor"/>',
    pause: '<path d="M7.2 4.5v11M12.8 4.5v11" stroke-width="2.4"/>',
    tick: '<path d="M4.5 10.5 8 14l7.5-8"/>',
    chat: '<path d="M3.5 5.6a2 2 0 0 1 2-2.1h9a2 2 0 0 1 2 2.1v5.8a2 2 0 0 1-2 2.1H9.2l-3.7 3v-3a2 2 0 0 1-2-2.1z"/><path d="M7 7.6h6M7 10h4"/>',
    steps: '<path d="M7.5 5h9M7.5 10h9M7.5 15h9"/><circle cx="4" cy="5" r=".9"/><circle cx="4" cy="10" r=".9"/><circle cx="4" cy="15" r=".9"/>',
    flag: '<path d="M4.5 17.5V3.5"/><path d="M4.5 4h10l-2 3.5 2 3.5h-10"/>',
    globe: '<circle cx="10" cy="10" r="7.4"/><path d="M2.6 10h14.8M10 2.6c2 2.2 3 4.7 3 7.4s-1 5.2-3 7.4c-2-2.2-3-4.7-3-7.4s1-5.2 3-7.4z"/>',
    js: '<path d="M7 3.5c-1.7 0-2.5.8-2.5 2.5v1.5c0 1.2-.8 2-1.8 2.5 1 .5 1.8 1.3 1.8 2.5V14c0 1.7.8 2.5 2.5 2.5M13 3.5c1.7 0 2.5.8 2.5 2.5v1.5c0 1.2.8 2 1.8 2.5-1 .5-1.8 1.3-1.8 2.5V14c0 1.7-.8 2.5-2.5 2.5"/>',
    sql: '<ellipse cx="10" cy="4.8" rx="6.5" ry="2.4"/><path d="M3.5 4.8v10.4c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4V4.8M3.5 10c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4"/>'
  };
  const ico = (name, size = 18) => `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  const DONE_MARK = `<svg class="ico" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.5" fill="currentColor"/><path d="M6.4 10.4l2.4 2.4 4.8-5.2" fill="none" style="stroke:var(--sheet)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const MOD = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "") ? "⌘" : "Ctrl";

  const store = {
    get(k, d) { try { const v = localStorage.getItem("cg:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("cg:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const done = new Set(store.get("done", []));
  const saveDone = () => store.set("done", Array.from(done));

  const LESSONS = CG.lessons;
  const TRACKS = {
    js: { n: 1, short: "JavaScript", name: ["Programming (JavaScript)", "Програмчлал (JavaScript)"], blurb: ["Variables, conditions, loops, functions, arrays and objects. The basics of every programming language.", "Хувьсагч, нөхцөл, давталт, функц, массив, объект. Бүх програмчлалын хэлний үндэс."] },
    sql: { n: 2, short: "SQL", name: ["Databases (SQL)", "Өгөгдлийн сан (SQL)"], blurb: ["Tables, queries, joins, changing data and designing your own database. Every query runs on real SQLite. No JavaScript needed.", "Хүснэгт, хүсэлт, холболт, өгөгдөл өөрчлөх, өөрийн өгөгдлийн сан зохиох. Хүсэлт бүр жинхэнэ SQLite дээр ажиллана. JavaScript мэдэх шаардлагагүй."] }
  };
  Object.keys(TRACKS).forEach((k) => {
    const list = LESSONS.filter((l) => l.track === k);
    TRACKS[k].lessons = list;
    list.forEach((l, i) => { l.num = i + 1; l.code = TRACKS[k].n + "." + (i + 1); });
  });

  // ---------------- syntax highlighting ----------------
  const RX_JS = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\.|[^`\\])*`?)|\b(\d+(?:\.\d+)?)\b|\b(true|false|null|undefined|NaN)\b|\b(let|const|var|function|return|if|else|for|while|do|break|continue|new|typeof|of|in|class|switch|case|default|try|catch|finally|throw|async|await|import|from|export|delete)\b|([A-Za-z_$][\w$]*)(?=\s*\()/g;
  const RX_SQL = /(--[^\n]*)|('(?:''|[^'])*'?)|\b(\d+(?:\.\d+)?)\b|\b(COUNT|SUM|AVG|MIN|MAX|ROUND|UPPER|LOWER|LENGTH|COALESCE|SUBSTR|IFNULL)(?=\s*\()|\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|AS|ORDER|BY|ASC|DESC|LIMIT|OFFSET|GROUP|HAVING|DISTINCT|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|ON|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|ADD|COLUMN|PRIMARY|FOREIGN|KEY|REFERENCES|UNIQUE|DEFAULT|CHECK|INDEX|BEGIN|COMMIT|ROLLBACK|TRANSACTION|BETWEEN|LIKE|CASE|WHEN|THEN|ELSE|END|EXISTS|PRAGMA|EXPLAIN|QUERY|PLAN|UNION|ALL|IF|INTEGER|TEXT|REAL|NUMERIC|BOOLEAN|VARCHAR|DATE|SERIAL)\b/gi;
  const CLS = { js: [null, "c", "s", "nm", "l", "k", "f"], sql: [null, "c", "s", "nm", "f", "k"] };

  function highlight(code, lang) {
    const rx = lang === "sql" ? RX_SQL : RX_JS;
    const cls = CLS[lang === "sql" ? "sql" : "js"];
    let out = "", last = 0, m;
    rx.lastIndex = 0;
    while ((m = rx.exec(code))) {
      if (m[0] === "") { rx.lastIndex++; continue; }
      out += esc(code.slice(last, m.index));
      let g = 1;
      while (m[g] === undefined) g++;
      out += `<span class="${cls[g]}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    return out + esc(code.slice(last));
  }

  // ---------------- JavaScript runner ----------------
  // show/toTable are also serialised into the worker, so they must stay self-contained.
  function show(v, d) {
    if (typeof v === "string") return d ? JSON.stringify(v) : v;
    if (v === null) return "null";
    if (v === undefined) return "undefined";
    if (typeof v === "function") return "[Function" + (v.name ? ": " + v.name : "") + "]";
    if (Array.isArray(v)) return d > 3 ? "[…]" : "[" + v.map((x) => show(x, d + 1)).join(", ") + "]";
    if (v instanceof Error) return v.name + ": " + v.message;
    if (typeof v === "object") {
      if (d > 3) return "{…}";
      const k = Object.keys(v);
      return k.length ? "{ " + k.map((key) => key + ": " + show(v[key], d + 1)).join(", ") + " }" : "{}";
    }
    return String(v);
  }
  function toTable(data) {
    const entries = Array.isArray(data) ? data.map((r, i) => [i, r]) : Object.entries(data || {});
    const cols = [];
    entries.forEach((e) => { if (e[1] && typeof e[1] === "object") Object.keys(e[1]).forEach((k) => { if (cols.indexOf(k) < 0) cols.push(k); }); });
    return {
      cols: ["(index)"].concat(cols),
      rows: entries.map((e) => [String(e[0])].concat(cols.map((c) => (e[1] && typeof e[1] === "object" && c in e[1] ? show(e[1][c], 1) : ""))))
    };
  }
  function makeConsole(out) {
    const add = (type) => (...a) => out.push({ type, text: a.map((x) => show(x, 0)).join(" ") });
    return { log: add("log"), info: add("log"), debug: add("log"), warn: add("warn"), error: add("error"), table: (d) => out.push({ type: "table", data: toTable(d) }) };
  }

  const WORKER_SRC = [show, toTable, makeConsole].map(String).join("\n") + `
self.postMessage({ ready: true });
self.onmessage = function (e) {
  var out = [];
  try {
    (new Function("console", e.data))(makeConsole(out));
    self.postMessage({ out: out });
  } catch (err) {
    self.postMessage({ out: out, error: { name: (err && err.name) || "Error", message: (err && err.message) || String(err) }, blocked: err instanceof EvalError });
  }
};`;

  let workerURL = null;
  let workerOK = typeof Worker !== "undefined";
  const TIMEOUT = 3000;

  function runJS(code) {
    const src = '"use strict";\n' + code;
    if (!workerOK) return Promise.resolve(runInPage(code));
    return new Promise((resolve) => {
      let w, ready = false, finished = false;
      const finish = (fn) => { if (finished) return; finished = true; clearTimeout(timer); try { w.terminate(); } catch (e) { /* already gone */ } fn(); };
      const fallback = () => finish(() => { workerOK = false; resolve(runInPage(code)); });
      try {
        if (!workerURL) workerURL = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
        w = new Worker(workerURL);
      } catch (e) { workerOK = false; resolve(runInPage(code)); return; }
      const timer = setTimeout(() => {
        if (!ready) fallback();
        else finish(() => resolve({ out: [], timeout: true }));
      }, TIMEOUT);
      w.onmessage = (ev) => {
        if (ev.data && ev.data.ready) { ready = true; return; }
        if (ev.data.blocked) fallback();
        else finish(() => resolve(ev.data));
      };
      w.onerror = (ev) => { if (ev && ev.preventDefault) ev.preventDefault(); fallback(); };
      w.postMessage(src);
    });
  }

  // Fallbacks for viewers that block workers or eval: run on the page itself.
  function runInPage(code) {
    const out = [];
    const con = makeConsole(out);
    try {
      (new Function("console", '"use strict";\n' + code))(con);
      return { out };
    } catch (err) {
      if (err instanceof EvalError) return runViaScript(code, out, con);
      return { out, error: { name: err.name || "Error", message: err.message || String(err) } };
    }
  }
  function runViaScript(code, out, con) {
    let result = null;
    window.__cgCon = con;
    window.__cgDone = (e) => { result = e ? { name: e.name || "Error", message: e.message || String(e) } : false; };
    const onErr = (ev) => { ev.preventDefault(); result = { name: (ev.error && ev.error.name) || "SyntaxError", message: (ev.error && ev.error.message) || ev.message }; };
    window.addEventListener("error", onErr);
    const s = document.createElement("script");
    s.textContent = '(function(console){"use strict";try{\n' + code + "\n;window.__cgDone(null);}catch(e){window.__cgDone(e);}})(window.__cgCon);";
    document.head.appendChild(s);
    s.remove();
    window.removeEventListener("error", onErr);
    if (result === null) return { out, error: { name: "Unavailable", message: "This viewer does not allow running code." } };
    return result ? { out, error: result } : { out };
  }

  const JS_HINTS = {
    SyntaxError: ["The code is not written correctly. Check brackets ( ) { } [ ], quotes and commas.", "Код буруу бичигдсэн байна. Хаалт ( ) { } [ ], хашилт, таслалаа шалга."],
    ReferenceError: ["A name was not found. Check spelling and capital letters, and create variables before using them.", "Нэр олдсонгүй. Бичлэг, том жижиг үсгээ шалгаад, хувьсагчийг ашиглахаасаа өмнө үүсгэ."],
    TypeError: ["A value is the wrong kind: for example reading a property of undefined, calling something that is not a function, or changing a const.", "Утгын төрөл буруу: жишээ нь undefined-ийн шинж чанарыг унших, функц биш зүйлийг дуудах, const-ийг өөрчлөх."],
    RangeError: ["A number is out of the allowed range, or a function calls itself forever.", "Тоо зөвшөөрөгдөх хязгаараас гарсан, эсвэл функц өөрийгөө төгсгөлгүй дуудаж байна."]
  };
  const hintHTML = (en, mn) => `<div class="out-hint">${ico("bulb", 16)}<span>${t(en, mn)}</span></div>`;

  function jsResultHTML(res) {
    let html = "";
    for (const o of res.out || []) {
      if (o.type === "table") html += tableHTML(o.data.cols, o.data.rows, false);
      else html += `<div class="out-line${o.type === "error" ? " out-err" : ""}">${esc(o.text)}</div>`;
    }
    if (res.timeout) {
      html += `<div class="out-line out-err">${t("Stopped after 3 seconds.", "3 секундын дараа зогсоолоо.")}</div>`;
      html += hintHTML("Is there an infinite loop? Check that the loop condition can become false.", "Төгсгөлгүй давталт байна уу? Давталтын нөхцөл false болж чадах эсэхийг шалга.");
    }
    if (res.error) {
      html += `<div class="out-line out-err">${esc(res.error.name + ": " + res.error.message)}</div>`;
      const h = JS_HINTS[res.error.name];
      if (h) html += hintHTML(esc(h[0]), esc(h[1]));
    }
    if (!html) html = `<div class="out-dim">${t("No output. Use console.log() to print something.", "Гаралт алга. Ямар нэг зүйл хэвлэхийн тулд console.log() ашигла.")}</div>`;
    return html;
  }

  // ---------------- SQL runner ----------------
  const SQLJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-asm.js";
  let sqlReady = null;
  function loadSQL() {
    if (!sqlReady) {
      sqlReady = new Promise((resolve, reject) => {
        if (window.initSqlJs) { window.initSqlJs().then(resolve, reject); return; }
        const s = document.createElement("script");
        s.src = SQLJS_URL;
        s.async = true;
        s.onload = () => { try { window.initSqlJs().then(resolve, reject); } catch (e) { reject(e); } };
        s.onerror = () => reject(new Error("load failed"));
        document.head.appendChild(s);
      }).catch((e) => { sqlReady = null; throw e; });
    }
    return sqlReady;
  }
  const sqlVal = (v) => (v === null ? "NULL" : typeof v === "number" ? String(v) : "'" + String(v).replace(/'/g, "''") + "'");
  const SEED = CG.schema.map((tb) => tb.create + ";\nINSERT INTO " + tb.name + " VALUES " + tb.rows.map((r) => "(" + r.map(sqlVal).join(", ") + ")").join(", ") + ";").join("\n");
  function freshDB(SQL) { const db = new SQL.Database(); db.exec(SEED); return db; }

  function execSQL(db, sql) {
    const results = [];
    try {
      for (const stmt of db.iterateStatements(sql)) {
        const cols = stmt.getColumnNames();
        const rows = [];
        while (stmt.step()) rows.push(stmt.get());
        if (cols.length) results.push({ cols, rows });
        else {
          const verb = ((stmt.getSQL() || "").match(/^\s*(\w+)/) || ["", ""])[1].toUpperCase();
          results.push({ verb, changed: /^(INSERT|UPDATE|DELETE|REPLACE)$/.test(verb) ? db.getRowsModified() : null });
        }
      }
      return { results };
    } catch (e) {
      return { results, error: (e && e.message) || String(e) };
    }
  }

  const SQL_HINTS = [
    [/no such table/i, ["That table does not exist. Check the name: students, courses, enrollments. Created a table earlier? Press Reset data only if you want to start over.", "Ийм хүснэгт алга. Нэрийг шалга: students, courses, enrollments."]],
    [/no such column/i, ["That column does not exist. Check its spelling, and use single quotes for text values: 'Darkhan'.", "Ийм багана алга. Бичлэгийг шалгаад, текстэн утгыг дан хашилтад бич: 'Darkhan'."]],
    [/ambiguous column/i, ["Two tables have a column with this name. Say which one you mean, for example s.id.", "Хоёр хүснэгтэд ийм нэртэй багана байна. Алийг нь хэлж байгаагаа заа, жишээ нь s.id."]],
    [/incomplete input/i, ["The query is unfinished. Close every bracket and quote.", "Хүсэлт дутуу байна. Хаалт, хашилт бүрээ хаа."]],
    [/syntax error/i, ["SQL cannot read the query. Check commas, quotes and the order of the clauses.", "SQL хүсэлтийг уншиж чадсангүй. Таслал, хашилт, хэсгүүдийн дарааллыг шалга."]],
    [/NOT NULL constraint/i, ["A NOT NULL column needs a value.", "NOT NULL баганад заавал утга оруулах ёстой."]],
    [/UNIQUE constraint/i, ["That value already exists in a UNIQUE column.", "UNIQUE баганад ийм утга аль хэдийн байна."]],
    [/FOREIGN KEY constraint/i, ["The linked row does not exist in the other table.", "Холбогдох мөр нөгөө хүснэгтэд алга."]],
    [/CHECK constraint/i, ["The value breaks the table's CHECK rule.", "Утга хүснэгтийн CHECK дүрмийг зөрчиж байна."]],
    [/already exists/i, ["A table with that name already exists. Press Reset data to start over.", "Ийм нэртэй хүснэгт аль хэдийн байна. Эхнээс нь эхлэхийн тулд Өгөгдөл сэргээх товч дар."]],
    [/misuse of aggregate/i, ["Aggregate functions belong in SELECT or HAVING, not in WHERE.", "Нэгтгэх функц WHERE-д биш, SELECT эсвэл HAVING-д байна."]]
  ];

  function cellHTML(v) {
    if (v === null) return `<td class="null">NULL</td>`;
    if (typeof v === "number") return `<td class="num">${esc(String(v))}</td>`;
    if (v instanceof Uint8Array) return `<td>[blob]</td>`;
    return `<td>${esc(v)}</td>`;
  }
  function tableHTML(cols, rows, sql) {
    const max = 200;
    const body = rows.slice(0, max).map((r) => "<tr>" + r.map((v) => (sql ? cellHTML(v) : `<td>${esc(v)}</td>`)).join("") + "</tr>").join("");
    let meta = "";
    if (sql) {
      const n = rows.length;
      meta = `<div class="out-meta">${t(n + (n === 1 ? " row" : " rows"), n + " мөр")}${n > max ? " · " + t("first " + max + " shown", "эхний " + max + " нь харагдаж байна") : ""}</div>`;
    }
    return `<div class="out-tbl"><table><thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>${meta}`;
  }
  function sqlResultHTML(res) {
    let html = "";
    for (const r of res.results) {
      if (r.cols) html += tableHTML(r.cols, r.rows, true);
      else if (r.changed !== null) html += `<div class="out-line out-ok">✓ ${esc(r.verb)} · ${t(r.changed + (r.changed === 1 ? " row changed" : " rows changed"), r.changed + " мөр өөрчлөгдлөө")}</div>`;
      else html += `<div class="out-line out-ok">✓ ${esc(r.verb || "OK")} · ${t("done", "амжилттай")}</div>`;
    }
    if (res.error) {
      html += `<div class="out-line out-err">Error: ${esc(res.error)}</div>`;
      const h = SQL_HINTS.find((x) => x[0].test(res.error));
      if (h) html += hintHTML(esc(h[1][0]), esc(h[1][1]));
    }
    if (!html) html = `<div class="out-dim">${t("Nothing to run. Write a query that ends with ;", "Ажиллуулах хүсэлт алга. ; тэмдгээр төгссөн хүсэлт бич.")}</div>`;
    return html;
  }
  const SQL_LOAD_FAIL = `<div class="out-line out-err">${t("Could not load the SQL engine. Check your internet connection, then press Run again.", "SQL хөдөлгүүрийг ачаалж чадсангүй. Интернэт холболтоо шалгаад Ажиллуулах товчийг дахин дар.")}</div>`;

  // ---------------- editor + console component ----------------
  let edCount = 0;
  function makeRunner(kind, code, opts) {
    opts = opts || {};
    const id = "ed-" + (opts.key || "x") + "-" + (++edCount);
    const el = document.createElement("div");
    el.className = "run" + (opts.onCheck ? " has-check" : "");
    el.innerHTML = `
      <div class="run-bar">
        <span class="run-tag"><i></i>${kind === "js" ? "JavaScript" : "SQL"}</span>
        <span class="run-hint">${ico("pencil", 13)}${t("you can edit this", "засаж болно")}</span>
        <span class="grow"></span>
        ${kind === "sql" ? `<button type="button" class="rb" data-act="resetdb" title="Анхны өгөгдлийг сэргээх / Restore the original rows">${t("Reset data", "Өгөгдөл сэргээх")}</button>` : ""}
        <button type="button" class="rb" data-act="reset" title="Анхны кодыг сэргээх / Restore the original code">${ico("reset", 14)}<span class="rb-txt">${t("Reset code", "Анхны код")}</span></button>
        <button type="button" class="rb rb-run" data-act="run">${ico("play", 13)}${t("Run", "Ажиллуулах")}<kbd>${MOD}↵</kbd></button>
        ${opts.onCheck ? `<button type="button" class="rb rb-check" data-act="check">${ico("tick", 14)}${t("Check", "Шалгах")}</button>` : ""}
      </div>
      <div class="ed"><pre aria-hidden="true"><code></code></pre><textarea id="${id}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="${kind === "js" ? "JavaScript" : "SQL"} editor"></textarea></div>
      <div class="out" aria-live="polite"><div class="out-label">${t("Output", "Гаралт")}</div><div class="out-body"></div></div>`;
    const ta = $("textarea", el), hl = $("pre code", el), body = $(".out-body", el);
    const original = tidy(code);
    let db = null, escaped = false;

    const paint = () => { hl.innerHTML = highlight(ta.value, kind) + " "; };
    const print = (html) => { body.innerHTML = html; };
    const idle = () => print(`<div class="out-dim">${opts.onCheck
      ? t("Write your answer above, then press Check.", "Хариугаа дээр бичээд Шалгах товч дар.")
      : t("Press Run or " + MOD + " + Enter. The result appears here.", "Ажиллуулах товч эсвэл " + MOD + " + Enter дарахад үр дүн энд гарна.")}</div>`);
    ta.value = original;
    paint();
    idle();

    async function run() {
      const src = ta.value;
      if (kind === "js") {
        print(`<div class="out-dim">…</div>`);
        print(jsResultHTML(await runJS(src)));
        return;
      }
      print(`<div class="out-dim">${t("Loading SQLite…", "SQLite ачаалж байна…")}</div>`);
      try {
        const SQL = await loadSQL();
        if (!db) db = freshDB(SQL);
        print(sqlResultHTML(execSQL(db, src)));
      } catch (e) { print(SQL_LOAD_FAIL); }
    }

    ta.addEventListener("input", paint);
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); return; }
      if (e.key === "Escape") { escaped = true; return; }
      if (e.key === "Tab" && !e.shiftKey && !escaped) {
        e.preventDefault();
        ta.setRangeText("  ", ta.selectionStart, ta.selectionEnd, "end");
        paint();
        return;
      }
      escaped = false;
    });
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-act]");
      if (!b) return;
      const act = b.dataset.act;
      if (act === "run") run();
      else if (act === "reset") { ta.value = original; paint(); idle(); }
      else if (act === "resetdb") { db = null; print(`<div class="out-ok out-line">✓ ${t("Data restored to the original rows.", "Өгөгдлийг анхны байдалд нь сэргээлээ.")}</div>`); }
      else if (act === "check" && opts.onCheck) opts.onCheck(ta.value, print);
    });
    if (kind === "sql") loadSQL().catch(() => {});
    return { el, getCode: () => ta.value, setCode: (c) => { ta.value = c; paint(); } };
  }

  // ---------------- block renderers ----------------
  function cell(c) { return Array.isArray(c) ? st(inline(c[0]), inline(c[1])) : inline(c); }
  function tableBlock(b) {
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${b.head.map((h) => `<th>${cell(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  function schemaBlock() {
    return `<div class="schema">${CG.schema.map((tb) => `
      <div class="sch"><h4>${tb.name}<small>${tp(tb.label)}</small></h4><ul>${tb.cols.map((c) => `
        <li><span class="col">${c.n}${c.key ? `<span class="key key-${c.key.toLowerCase()}">${c.key}</span>` : ""}</span><span class="ty">${c.ty}</span>
        <span class="d">${c.ref ? "→ " + c.ref + " · " : ""}${tp(c.d)}</span></li>`).join("")}</ul></div>`).join("")}</div>`;
  }
  function dataBlock() {
    return `<details class="data"><summary>${t("See all rows of the practice database", "Дасгалын өгөгдлийн сангийн бүх мөрийг харах")}</summary><div class="data-in">${CG.schema.map((tb) => `
      <div><h5>${tb.name} · ${t(tb.rows.length + " rows", tb.rows.length + " мөр")}</h5><div class="tbl-wrap"><table class="tbl"><thead><tr>${tb.cols.map((c) => `<th>${c.n}</th>`).join("")}</tr></thead>
      <tbody>${tb.rows.map((r) => `<tr>${r.map((v) => (v === null ? `<td><code>NULL</code></td>` : `<td>${esc(v)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div></div>`).join("")}</div></details>`;
  }
  function anatomyBlock() {
    const tb = CG.schema[0];
    const rows = tb.rows.slice(0, 4);
    const hc = 2, hr = 1;
    return `<div class="tbl-wrap"><table class="tbl anat"><thead><tr>${tb.cols.map((c, i) => `<th class="${i === hc ? "hc" : ""}">${c.n}${c.key ? ` <span class="key key-pk">PK</span>` : ""}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((r, ri) => `<tr class="${ri === hr ? "hr" : ""}">${r.map((v, ci) => `<td class="${ci === hc ? "hc" : ""}${ci === hc && ri === hr ? " cell" : ""}">${v === null ? "NULL" : esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="legend"><span><i style="background:var(--sky-soft);border:1px solid var(--sky)"></i>${t("column `city`", "багана `city`").replace(/`([^`]+)`/g, "<code>$1</code>")}</span>
      <span><i style="background:var(--gold-soft);border:1px solid var(--gold)"></i>${t("row (one student)", "мөр (нэг оюутан)")}</span>
      <span><i style="border:2px solid var(--red)"></i>${t("cell (one value)", "нүд (нэг утга)")}</span>
      <span><span class="key key-pk">PK</span>${t("primary key", "үндсэн түлхүүр")}</span></div>`;
  }
  function arrayBlock(b) {
    return `<div class="arr">${b.values.map((v, i) => `<div class="arr-cell"><b>${esc(v)}</b><span>[${i}]</span></div>`).join("")}<div class="arr-cap">${t("Top: value · Bottom: index → <code>" + b.name + "[2]</code> is " + esc(b.values[2]), "Дээр: утга · Доор: индекс → <code>" + b.name + "[2]</code> нь " + esc(b.values[2]))}</div></div>`;
  }

  function walkBlock(b) {
    return `<div class="walk"><div class="walk-head">${ico("steps", 16)}${t("Line by line", "Мөр мөрөөр нь")}</div><ol class="walk-list">${b.rows.map((r) => `
      <li><pre class="walk-code"><code>${highlight(tidy(r[0]), b.lang)}</code></pre><div class="walk-txt">${st(inline(r[1]), inline(r[2]))}</div></li>`).join("")}</ol></div>`;
  }
  function fixBlock(b) {
    const side = (cls, mark, en, mn, code) => `<div class="fix-side ${cls}"><div class="fix-tag">${mark} ${t(en, mn)}</div><pre class="code"><code>${highlight(tidy(code), b.lang)}</code></pre></div>`;
    return `<div class="fix"><div class="fix-head">${ico("warn", 16)}${t("Common mistake", "Түгээмэл алдаа")}</div>
      <div class="fix-pair">${side("bad", "✗", "Wrong", "Буруу", b.wrong)}${side("good", "✓", "Right", "Зөв", b.right)}</div>${bi(inline(b.en), inline(b.mn))}</div>`;
  }
  function recapBlock(b) {
    return `<section class="recap"><div class="recap-head">${ico("flag", 20)}<h2 class="recap-title">${t("Remember", "Санаж үлдэх зүйлс")}</h2></div>
      <div class="bi"><ul class="en" lang="en">${b.items.map((i) => `<li>${inline(i[0])}</li>`).join("")}</ul><ul class="mn" lang="mn">${b.items.map((i) => `<li>${inline(i[1])}</li>`).join("")}</ul></div></section>`;
  }

  const NOTES = { tip: ["Tip", "Зөвлөгөө", "bulb"], warn: ["Careful", "Анхаар", "warn"], danger: ["Danger", "Аюул", "danger"], idea: ["In plain words", "Энгийнээр хэлбэл", "chat"], try: ["Try it yourself", "Өөрөө туршаад үз", "pencil"] };
  function renderBlocks(blocks, slots, key, after) {
    return blocks.map((b, i) => blockHTML(b, slots, key) + ((after && after[i]) || "")).join("\n");
  }
  function blockHTML(b, slots, key) {
    switch (b.t) {
      case "h": return `<h2 class="sec stack">${tp([b.en, b.mn])}</h2>`;
      case "p": return bi(inline(b.en), inline(b.mn));
      case "ul":
      case "ol": return `<div class="bi"><${b.t} class="en" lang="en">${b.items.map((i) => `<li>${inline(i[0])}</li>`).join("")}</${b.t}><${b.t} class="mn" lang="mn">${b.items.map((i) => `<li>${inline(i[1])}</li>`).join("")}</${b.t}></div>`;
      case "note": {
        const n = NOTES[b.kind];
        return `<aside class="note note-${b.kind}"><span class="note-ico">${ico(n[2], 18)}</span><div class="note-label">${t(n[0], n[1])}</div>${bi(inline(b.en), inline(b.mn))}</aside>`;
      }
      case "code": return `<pre class="code"><code>${highlight(tidy(b.code), b.lang)}</code></pre>`;
      case "js":
      case "sql": slots.push({ kind: b.t, code: b.code, key }); return `<div data-slot="${slots.length - 1}"></div>`;
      case "table": return tableBlock(b);
      case "schema": return schemaBlock();
      case "data": return dataBlock();
      case "anatomy": return anatomyBlock();
      case "array": return arrayBlock(b);
      case "chips": return `<div class="chips">${b.items.map((x, i) => `${i ? '<span class="arrow" aria-hidden="true">→</span>' : ""}<span class="chip"><small>${i + 1}</small>${esc(x)}</span>`).join("")}</div>`;
      case "flow": return `<div class="flow">${b.items.map((x) => `<div>${st(inline(x[0]), inline(x[1]))}</div>`).join("")}</div>`;
      case "walk": return walkBlock(b);
      case "fix": return fixBlock(b);
      case "recap": return recapBlock(b);
      default: return "";
    }
  }
  function mountSlots(root, slots) {
    $$("[data-slot]", root).forEach((s) => {
      const spec = slots[+s.dataset.slot];
      s.replaceWith(makeRunner(spec.kind, spec.code, { key: spec.key }).el);
    });
  }

  // ---------------- animated walkthrough ----------------
  // Plays a lesson's example step by step: the current line (and the part of it being worked on) lights up,
  // a strip shows how an expression turns into a value, boxes show each variable with its type and its
  // old and new value, the data table marks the rows in use, and the output fills in. Scripts live in videos.js.
  const VIDEO_INTRO = ["Press play to watch this example run, one step at a time.", "Энэ жишээ хэрхэн ажилладгийг алхам алхмаар үзэхийн тулд тоглуулах товч дар."];
  const SPEEDS = [0.75, 1, 1.25, 1.5];
  let vSpeed = SPEEDS.includes(store.get("vspeed", 1)) ? store.get("vspeed", 1) : 1;
  const stepText = (st, lang) => [st.head, [st.en, st.mn], st.note].filter(Boolean).map((p) => p[lang === "en" ? 0 : 1]).join(" ");
  function stepMs(st) {
    const lang = document.documentElement.dataset.lang;
    const len = stepText(st, lang).replace(/[`*]/g, "").length;
    const calc = st.calc ? 700 + st.calc.length * 450 : 0;
    return (Math.min(14000, Math.max(3600, 2200 + len * 55 + calc)) * (lang === "both" ? 1.35 : 1)) / vSpeed;
  }
  const V_TYPES = [[/^".*"$|^'.*'$/, "string", "текст"], [/^-?\d|^NaN$/, "number", "тоо"], [/^(true|false)$/, "boolean", "логик"], [/^\[/, "array", "массив"], [/^\{/, "object", "объект"], [/^undefined$/, "undefined", "утгагүй"]];
  const vType = (v) => V_TYPES.find((x) => x[0].test(v));
  const V_LEGEND = { keep: ["kept", "үлдэнэ"], drop: ["left out", "хасагдана"], hl: ["look here", "анхаар"], bad: ["problem", "асуудал"] };

  function videoHTML(V, label, key) {
    const n = V.steps.length;
    const mins = Math.max(1, Math.round(V.steps.reduce((sum, st) => sum + stepMs(st) * vSpeed, 0) / 60000));
    const points = (V.sum || []).map((p) => `<li>${tp(p)}</li>`).join("");
    return `<section class="vid" data-vid="${esc(key)}" tabindex="-1" aria-label="Хөдөлгөөнт тайлбар / Animated walkthrough">
      <header class="vid-head"><span class="vid-kicker">${ico("play", 12)}${t("Animated walkthrough", "Хөдөлгөөнт тайлбар")}${label ? " · " + label : ""}</span><span class="vid-title">${tp(V.title)}</span><span class="vid-meta">${t(n + " steps · about " + mins + " min", n + " алхам · ~" + mins + " мин")}</span></header>
      ${V.order ? `<div class="vphase"><span class="vphase-l">${t("Order the database runs it", "Өгөгдлийн сангийн ажиллах дараалал")}</span>${V.order.map((p, i) => `${i ? '<span class="vphase-a" aria-hidden="true">→</span>' : ""}<span class="vph">${esc(p)}</span>`).join("")}</div>` : ""}
      <div class="vid-stage">
        <div class="vid-codecol"><ol class="vid-code"></ol>${V.steps.some((s) => s.calc) ? `<div class="vcalc" aria-live="polite"></div>` : ""}</div>
        <div class="vid-side"></div>
        <div class="vid-cover" data-v="start">
          <button type="button" class="vid-play" data-v="start" aria-label="Тайлбарыг үзэх / Watch the walkthrough">${ico("play", 28)}</button>
          <b>${t("Watch the walkthrough", "Тайлбарыг үзэх")}</b>
          ${points ? `<span class="vid-cover-l">${t("You will see", "Та юу харах вэ")}</span><ul>${points}</ul>` : ""}
          <small>${t("Pause, slow down or step through it at any time", "Хүссэн үедээ зогсоож, удаашруулж, алхам алхмаар гүйлгэж болно")}</small>
        </div>
        <div class="vid-end" hidden>
          <b>${ico("tick", 18)}${t("Walkthrough complete", "Тайлбар дууслаа")}</b>
          ${points ? `<span class="vid-cover-l">${t("Remember", "Санаж ав")}</span><ul>${points}</ul>` : ""}
          <div class="vid-end-a"><button type="button" class="vbtn-t" data-v="restart">${ico("reset", 16)}${t("Watch again", "Дахин үзэх")}</button><button type="button" class="vbtn-t main" data-v="read">${t("Read the lesson", "Хичээлийг унших")}${ico("arrowR", 16)}</button></div>
        </div>
      </div>
      <div class="vid-cap" aria-live="polite"></div>
      <div class="vid-ctrl">
        <button type="button" class="vbtn" data-v="prev" aria-label="Өмнөх алхам / Previous step">${ico("arrowL", 16)}</button>
        <button type="button" class="vbtn main" data-v="toggle"></button>
        <button type="button" class="vbtn" data-v="next" aria-label="Дараагийн алхам / Next step">${ico("arrowR", 16)}</button>
        <div class="vprog">${V.steps.map((st, i) => `<button type="button" class="vseg" data-v="seg" data-i="${i}" aria-label="${i + 1} / ${n}"><i><b></b></i></button>`).join("")}</div>
        <span class="vcount"></span>
        <button type="button" class="vbtn vspeed" data-v="speed" title="Хурд / Speed" aria-label="Хурд / Speed">${vSpeed}×</button>
        <button type="button" class="vbtn" data-v="list" aria-expanded="false" title="Бүх алхам / All steps" aria-label="Бүх алхам / All steps">${ico("steps", 16)}</button>
        <button type="button" class="vbtn" data-v="restart" title="Эхнээс нь / Start again" aria-label="Эхнээс нь / Start again">${ico("reset", 16)}</button>
      </div>
      <ol class="vlist" hidden>${V.steps.map((st, i) => `<li><button type="button" data-v="seg" data-i="${i}"><span class="vlist-n">${i + 1}</span><span>${st.head ? `<b>${tp(st.head)}</b>` : ""}${st_(st)}</span></button></li>`).join("")}</ol>
    </section>`;
  }
  const st_ = (step) => st(inline(step.en), inline(step.mn));

  function vGridHTML(g, s) {
    const n = g.rows.length;
    const dropped = Object.keys(s.mark).filter((k) => s.mark[k] === "drop").length;
    const count = dropped ? t(`${n - dropped} of ${n} rows kept`, `${n} мөрөөс ${n - dropped} үлдсэн`) : t(n + (n === 1 ? " row" : " rows"), n + " мөр");
    const title = `<div class="vgrid-t"><span>${g.title ? (Array.isArray(g.title) ? tp(g.title) : esc(g.title)) : ""}</span><span class="vgrid-c">${count}</span></div>`;
    const body = n ? g.rows.map((r, ri) => {
      const cls = [s.mark[ri] || "", g.band ? "b" + (g.band[ri] % 2) : "", g.band && ri && g.band[ri] !== g.band[ri - 1] ? "bstart" : ""].join(" ").trim();
      return `<tr class="${cls}">${r.map((v, ci) => {
        const c = [s.cols.includes(ci) ? "hc" : "", s.cell && s.cell[0] === ri && s.cell[1] === ci ? "cell" : "", v === null ? "null" : ""].join(" ").trim();
        return `<td class="${c}">${v === null ? "NULL" : esc(v)}</td>`;
      }).join("")}</tr>`;
    }).join("") : `<tr><td colspan="${g.cols.length}" class="null">${t("no rows yet", "мөр алга")}</td></tr>`;
    const kinds = Array.from(new Set(Object.values(s.mark)));
    const legend = kinds.length ? `<div class="vleg">${kinds.map((k) => `<span class="vleg-${k}"><i></i>${t(V_LEGEND[k][0], V_LEGEND[k][1])}</span>`).join("")}</div>` : "";
    return `${title}<div class="vgrid"><table><thead><tr>${g.cols.map((c, ci) => `<th class="${s.cols.includes(ci) ? "hc" : ""}">${esc(c)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>${legend}`;
  }

  let vPlaying = null;   // pause() of the walkthrough that is playing now
  function mountVideo(el, V) {
    const lang = V.lang || "js", n = V.steps.length;
    const codeEl = $(".vid-code", el), calcEl = $(".vcalc", el), side = $(".vid-side", el), cap = $(".vid-cap", el), count = $(".vcount", el);
    const cover = $(".vid-cover", el), endEl = $(".vid-end", el), toggleBtn = $('[data-v="toggle"]', el), listEl = $(".vlist", el);
    const segs = $$(".vseg b", el), phases = $$(".vph", el), listBtns = $$(".vlist button", el);
    const base = tidy(V.code).split("\n");
    const has = { grid: V.steps.some((s) => s.grid), mem: V.steps.some((s) => s.vars), out: V.steps.some((s) => s.out || s.err || s.res) };
    side.innerHTML = (has.grid ? `<div class="vid-panel"><div class="vid-label">${t("Data", "Өгөгдөл")}</div><div class="vgrid-box"></div></div>` : "") +
      (has.mem ? `<div class="vid-panel"><div class="vid-label">${t("Memory: variables", "Санах ой: хувьсагчид")}</div><div class="vmem"></div></div>` : "") +
      (has.out ? `<div class="vid-panel"><div class="vid-label vout-label"></div><div class="vout"></div></div>` : "");
    if (!has.grid && !has.mem && !has.out) $(".vid-stage", el).classList.add("solo");
    let cur = -1, playing = false, timer = null;

    // Fold the steps up to i into what the screen shows at step i.
    function stateAt(i) {
      const s = { lines: base.slice(), seen: new Set(), line: [], vars: {}, prev: {}, chg: new Set(), out: [], fresh: 0, grid: null, mark: {}, res: null, cols: [], cell: null, phase: null };
      if (i < 0) { s.seen = null; s.grid = (V.steps.find((x) => x.grid) || {}).grid || null; return s; }
      for (let k = 0; k <= i; k++) {
        const step = V.steps[k], last = k === i;
        if (step.edit) for (const ln in step.edit) s.lines[ln - 1] = step.edit[ln];
        s.line = step.line == null ? [] : Array.isArray(step.line) ? Array.from({ length: step.line[1] - step.line[0] + 1 }, (_, j) => step.line[0] + j) : [step.line];
        s.line.forEach((ln) => s.seen.add(ln));
        if (step.vars) for (const key in step.vars) {
          const v = step.vars[key];
          if (last && v !== null) { s.chg.add(key); if (key in s.vars && s.vars[key] !== v) s.prev[key] = s.vars[key]; }
          if (v === null) delete s.vars[key]; else s.vars[key] = v;
        }
        if (step.clear) s.out = [];
        const before = s.out.length;
        (step.out || []).forEach((x) => s.out.push({ text: x }));
        (step.err || []).forEach((x) => s.out.push({ text: x, err: true }));
        if (last) s.fresh = s.out.length - before;
        if (step.grid) { s.grid = step.grid; s.mark = {}; }
        if (step.mark) { s.mark = {}; for (const kind in step.mark) step.mark[kind].forEach((r) => { s.mark[r] = kind; }); }
        if ("res" in step) s.res = step.res;
        if (step.phase) s.phase = step.phase;
        if (last) { s.cols = step.cols || []; s.cell = step.cell || null; }
      }
      if (i === n - 1) s.lines.forEach((_, j) => s.seen.add(j + 1));
      return s;
    }
    function lineHTML(txt, focus) {
      const at = focus ? txt.indexOf(focus) : -1;
      if (at < 0) return highlight(txt, lang) || " ";
      return highlight(txt.slice(0, at), lang) + `<span class="vfocus">${highlight(focus, lang)}</span>` + highlight(txt.slice(at + focus.length), lang);
    }
    function render(i) {
      const s = stateAt(i), step = V.steps[i];
      const focusLn = step && step.focus ? s.line.find((ln) => (s.lines[ln - 1] || "").includes(step.focus)) : null;
      codeEl.innerHTML = s.lines.map((txt, j) => {
        const ln = j + 1, cls = s.line.includes(ln) ? "cur" : s.seen && !s.seen.has(ln) ? "dim" : "";
        return `<li class="${cls}"><span class="ln">${ln}</span><code>${lineHTML(txt, ln === focusLn ? step.focus : null)}</code></li>`;
      }).join("");
      if (calcEl) calcEl.innerHTML = step && step.calc
        ? `<span class="vcalc-l">${t("Working it out", "Бодолт")}</span>` + step.calc.map((c, k) => `${k ? `<span class="vcalc-a" style="animation-delay:${k * 0.45}s">→</span>` : ""}<code class="vcalc-c${k === step.calc.length - 1 ? " last" : ""}" style="animation-delay:${k * 0.45}s">${highlight(c, lang)}</code>`).join("")
        : "";
      if (phases.length) {
        const at = i === n - 1 ? phases.length : V.order.indexOf(s.phase);
        phases.forEach((p, k) => { p.classList.toggle("done", at >= 0 && k < at); p.classList.toggle("cur", k === at); });
      }
      if (has.grid) $(".vgrid-box", side).innerHTML = s.grid ? vGridHTML(s.grid, s) : "";
      if (has.mem) {
        const keys = Object.keys(s.vars);
        $(".vmem", side).innerHTML = keys.length ? keys.map((k) => {
          const v = s.vars[k], ty = vType(v), old = s.prev[k];
          return `<div class="vbox${s.chg.has(k) ? " chg" : ""}"><span class="vk"><span>${esc(k)}</span>${ty ? `<span class="vty">${t(ty[1], ty[2])}</span>` : ""}</span>` +
            `<span class="vv">${old !== undefined && old.length <= 30 ? `<span class="vold">${esc(old)}</span><span class="vold-a">→</span>` : ""}${highlight(v, "js")}</span></div>`;
        }).join("") : `<span class="vempty">${t("No variables yet", "Хувьсагч алга")}</span>`;
      }
      if (has.out) {
        const title = s.res && s.res.title;
        $(".vout-label", side).innerHTML = title ? (Array.isArray(title) ? tp(title) : esc(title)) : lang === "sql" ? t("Result", "Үр дүн") : t("Output", "Гаралт");
        const lines = s.out.map((o, j) => `<div class="${[o.err ? "err" : "", j >= s.out.length - s.fresh ? "new" : ""].join(" ").trim()}">${o.err ? "✗ " : ""}${esc(o.text)}</div>`).join("");
        const table = s.res ? vGridHTML(Object.assign({}, s.res, { title: null }), { mark: {}, cols: [], cell: null }) : "";
        $(".vout", side).innerHTML = table + lines || `<span class="vempty">${lang === "sql" ? t("Nothing yet", "Одоохондоо алга") : t("Nothing printed yet", "Одоохондоо юу ч хэвлээгүй")}</span>`;
      }
      cap.innerHTML = i < 0
        ? `<span class="vid-n">▶</span><div class="vid-txt">${st(inline(VIDEO_INTRO[0]), inline(VIDEO_INTRO[1]))}</div>`
        : `<span class="vid-n">${i + 1}</span><div class="vid-txt">${step.head ? `<b class="vid-h">${tp(step.head)}</b>` : ""}${st_(step)}${step.note ? `<p class="vid-note">${ico("bulb", 15)}${st(inline(step.note[0]), inline(step.note[1]))}</p>` : ""}</div>`;
      count.textContent = Math.max(i + 1, 0) + " / " + n;
      $('[data-v="prev"]', el).disabled = i <= 0;
      $('[data-v="next"]', el).disabled = i >= n - 1;
      listBtns.forEach((b, k) => b.classList.toggle("cur", k === i));
    }
    function fill(k, full, ms) {
      const b = segs[k];
      if (!b) return;
      b.style.transition = "none";
      b.style.width = full ? "100%" : "0%";
      if (ms) { void b.offsetWidth; b.style.transition = `width ${ms}ms linear`; b.style.width = "100%"; }
    }
    const paintSegs = () => segs.forEach((_, k) => fill(k, k < cur || (k === cur && !playing)));
    function setToggle() {
      const end = !playing && cur >= n - 1;
      toggleBtn.innerHTML = ico(playing ? "pause" : end ? "reset" : "play", 18);
      toggleBtn.setAttribute("aria-label", playing ? "Түр зогсоох / Pause" : end ? "Дахин үзэх / Watch again" : "Тоглуулах / Play");
    }
    function schedule() {
      clearTimeout(timer);
      if (!playing) return;
      const ms = stepMs(V.steps[cur]);
      fill(cur, false, ms);
      timer = setTimeout(() => {
        if (!el.isConnected) { playing = false; return; }
        if (cur < n - 1) { cur++; render(cur); schedule(); }
        else { playing = false; setToggle(); paintSegs(); endEl.hidden = false; }
      }, ms);
    }
    function play() {
      if (vPlaying && vPlaying !== pause) vPlaying();
      vPlaying = pause;
      cover.hidden = true; endEl.hidden = true;
      if (cur < 0 || cur >= n - 1) { cur = 0; render(0); }
      playing = true; setToggle(); paintSegs(); schedule();
    }
    function pause() { playing = false; clearTimeout(timer); setToggle(); paintSegs(); }
    function go(i) {
      cover.hidden = true; endEl.hidden = true;
      cur = Math.max(0, Math.min(n - 1, i));
      render(cur); setToggle(); paintSegs();
      if (playing) schedule();
    }
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-v]");
      if (!b) return;
      const v = b.dataset.v;
      if (v === "start") play();
      else if (v === "toggle") playing ? pause() : play();
      else if (v === "prev") go(cur - 1);
      else if (v === "next") go(cur + 1);
      else if (v === "seg") go(+b.dataset.i);
      else if (v === "restart") { go(0); if (!playing) play(); }
      else if (v === "read") { endEl.hidden = true; (el.nextElementSibling || el).scrollIntoView({ behavior: "smooth", block: "start" }); }
      else if (v === "list") { listEl.hidden = !listEl.hidden; b.setAttribute("aria-expanded", String(!listEl.hidden)); }
      else if (v === "speed") {
        vSpeed = SPEEDS[(SPEEDS.indexOf(vSpeed) + 1) % SPEEDS.length];
        store.set("vspeed", vSpeed);
        b.textContent = vSpeed + "×";
        if (playing) schedule();
      }
    });
    el.addEventListener("keydown", (e) => {
      if (e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); playing ? pause() : play(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
    });
    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver((entries) => { if (playing && !entries[0].isIntersecting) pause(); }, { threshold: 0.15 }).observe(el);
    }
    render(-1); setToggle(); paintSegs();
  }

  // ---------------- pages ----------------
  const main = $("#main");
  const side = $("#side");
  const doneIn = (tr) => tr.lessons.filter((l) => done.has(l.id)).length;
  const pct = (a, b) => Math.round((a / b) * 100);

  function setMarked(id, on) {
    if (on) done.add(id); else done.delete(id);
    saveDone();
    renderNav();
    renderProgress();
  }
  function renderProgress() {
    $("#progPill").innerHTML = `<span class="bar" aria-hidden="true"><i style="width:${pct(done.size, LESSONS.length)}%"></i></span><span><b>${done.size}</b>/${LESSONS.length} ${t("lessons done", "хичээл дууссан")}</span>`;
  }
  function navLink(id, num, label, isDone) {
    return `<a class="nav-link" href="#${id}" data-go="${id}"${current === id ? ' aria-current="page"' : ""}><span class="n">${num}</span><span>${label}</span><span class="st">${isDone ? DONE_MARK + `<span class="sr">${t("done", "дууссан")}</span>` : ""}</span></a>`;
  }
  function renderNav() {
    let html = "";
    for (const k of Object.keys(TRACKS)) {
      const tr = TRACKS[k];
      const d = doneIn(tr);
      html += `<div class="nav-group t-${k}">
        <div class="nav-head"><span class="nav-title">${t(tr.name[0], tr.name[1])}</span><span class="nav-count">${d} / ${tr.lessons.length}</span></div>
        <div class="bar nav-bar" aria-hidden="true"><i style="width:${pct(d, tr.lessons.length)}%"></i></div>
        ${tr.lessons.map((l) => navLink(l.id, "[ " + l.code + " ]", tp(l.title), done.has(l.id))).join("")}</div>`;
    }
    html += `<div class="nav-group"><div class="nav-head"><span class="nav-title">${t("Reference", "Лавлах")}</span></div>
      ${navLink("home", ico("home", 16), t("Home", "Нүүр"))}${navLink("glossary", ico("book", 16), t("Glossary", "Нэр томьёо"))}${navLink("cheatsheet", ico("braces", 16), t("Cheat sheet", "Товч лавлах"))}</div>`;
    side.innerHTML = html;
  }

  function nextUndone() { return LESSONS.find((l) => !done.has(l.id)) || LESSONS[0]; }

  // ---------------- home: scenes ----------------
  // The home page plays like the viewfinder template: a dark room of screens that drift after the cursor,
  // a striped marquee, a carousel of screens (JavaScript lessons), a draggable strip (SQL lessons),
  // an "About" paragraph that lights up word by word, and a card that tilts toward the cursor.
  let sceneStop = [];   // cleanups for the home page's listeners, timers and loops
  const stopScenes = () => { sceneStop.forEach((f) => f()); sceneStop = []; };
  const reduceMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pad2 = (n) => String(n).padStart(2, "0");
  const firstCode = (L) => { const b = L.body.find((x) => x.t === "js" || x.t === "sql" || x.t === "code"); return b ? tidy(b.code).split("\n").filter((s) => s.trim() && !/^\s*(\/\/|--)/.test(s)).slice(0, 4).join("\n") : ""; };
  const lessonTags = (L) => {
    const tr = TRACKS[L.track];
    return `<span class="tag">${tr.short}</span><span class="tag">${t("Lesson " + L.num + " of " + tr.lessons.length, "Хичээл " + L.num + " / " + tr.lessons.length)}</span><span class="tag">${t(L.quiz.length + " questions", L.quiz.length + " асуулт")}</span>${done.has(L.id) ? `<span class="tag" style="color:var(--ok)">${t("✓ done", "✓ дууссан")}</span>` : ""}`;
  };

  let noiseURL = null;
  function noise() {
    if (noiseURL !== null) return noiseURL;
    try {
      const c = document.createElement("canvas");
      c.width = c.height = 180;
      const g = c.getContext("2d"), img = g.createImageData(180, 180);
      for (let i = 0; i < img.data.length; i += 4) { const v = (70 + Math.random() * 185) | 0; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
      g.putImageData(img, 0, 0);
      noiseURL = c.toDataURL();
    } catch (e) { noiseURL = ""; }
    return noiseURL;
  }

  const TVS = [
    { x: 15, y: 31, z: -140, ry: 30, w: "clamp(140px,17vw,250px)", s: "sun" },
    { x: 11, y: 67, z: 40, ry: 26, w: "clamp(110px,12vw,180px)", s: "noise", c: "mid" },
    { x: 25, y: 88, z: -40, ry: 20, w: "clamp(100px,10vw,150px)", s: "code", c: "far" },
    { x: 77, y: 14, z: -120, ry: -24, w: "clamp(110px,12vw,170px)", s: "fire", c: "far" },
    { x: 71, y: 45, z: -90, ry: -18, w: "clamp(100px,10vw,150px)", s: "noise", c: "mid" },
    { x: 64, y: 66, z: 60, ry: -12, w: "clamp(110px,12vw,170px)", s: "bars" },
    { x: 88, y: 30, z: 10, ry: -32, w: "clamp(120px,14vw,200px)", s: "term", c: "mid" },
    { x: 85, y: 71, z: 150, ry: -26, w: "clamp(150px,19vw,280px)", s: "pink", c: "mid" }
  ];
  const TV_GLOW = { sun: "rgba(255,190,120,.35)", noise: "rgba(220,220,220,.22)", code: "rgba(140,255,190,.2)", fire: "rgba(255,120,60,.35)", bars: "rgba(160,120,255,.3)", term: "rgba(120,255,150,.22)", pink: "rgba(255,170,220,.45)" };
  function tvScreen(s) {
    if (s === "sun") return `<div class="tv-screen scr-sun"><i></i><b></b></div>`;
    if (s === "noise") return `<div class="tv-screen scr-noise" style="background-image:url(${noise()})"></div>`;
    if (s === "bars") return `<div class="tv-screen scr-bars"><i></i></div>`;
    if (s === "code") return `<div class="tv-screen scr-code">${highlight('const name = "Бат";\nconsole.log(name);\n\nlet n = 21;\nn = n + 1;', "js")}</div>`;
    if (s === "term") return `<div class="tv-screen scr-term">&gt; SELECT *\n  FROM students;\n\n10 мөр <i></i></div>`;
    return `<div class="tv-screen scr-${s}"></div>`;
  }

  function renderHome() {
    const nx = nextUndone();
    const started = done.size > 0;
    const allDone = done.size === LESSONS.length;
    const mainCta = !started ? t("Start the first lesson", "Эхний хичээлээс эхлэх")
      : allDone ? t("Review from lesson 1.1", "1.1-р хичээлээс дахин үзэх")
      : t("Continue with " + nx.code, nx.code + "-р хичээлээс үргэлжлүүлэх");
    const js = TRACKS.js.lessons, sql = TRACKS.sql.lessons;
    const word = (txt) => `<span class="hold-word" aria-hidden="true"><span>${txt}</span><span>${txt}</span><span>${txt}</span><span>${txt}</span></span>`;
    const words = ["хийж сур", "learn by doing", "хийж сур", "learn by doing"].map(word).join("");
    const split = (s) => s.split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
    const icon = (k) => `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${k === "c" ? '<circle cx="10" cy="10" r="6.5"/>' : k === "t" ? '<path d="M10 3.6 16.8 15.6H3.2z" stroke-linejoin="round"/>' : '<rect x="4" y="4" width="12" height="12" rx="1"/>'}</svg>`;
    const acard = (k, en, mn, dEn, dMn) => `<div class="acard"><span class="acard-ico">${icon(k)}</span><div><b class="stack">${t(en, mn)}</b><p class="stack">${t(dEn, dMn)}</p></div></div>`;

    main.innerHTML = `<div class="home">
      <section class="scene room" id="room">
        <div class="room-stage" aria-hidden="true"><div class="room-world">${TVS.map((v, i) => `
          <div class="tv ${v.c || ""}" style="--x:${v.x}%;--y:${v.y}%;--z:${v.z}px;--ry:${v.ry}deg;--w:${v.w}"><div class="tv-bob" style="--dur:${7 + (i % 4) * 1.7}s;--del:${-i * 1.3}s"><div class="tv-body" style="--glow:${TV_GLOW[v.s]}">${tvScreen(v.s)}</div></div></div>`).join("")}
        </div></div>
        <div class="room-copy"><h1 class="room-title stack">${t("Learn to code,<br>build with data", "Код бичиж сур,<br>өгөгдөл бүтээ")}</h1></div>
        <span class="room-cross" aria-hidden="true"></span>
        <div></div>
        <div class="room-foot">
          <p class="stack">${t(LESSONS.length + " short lessons in JavaScript and SQL, in Mongolian and English. Every example runs right here in your browser.", "JavaScript, SQL-ийг монгол, англи хэлээр " + LESSONS.length + " богино хичээлээр сур. Жишээ бүр яг энд, хөтөч дээр тань ажиллана.")}</p>
          <div class="cta">
            <a class="btn btn-mint" href="#${nx.id}" data-go="${nx.id}">${mainCta}</a>
            <a class="btn" href="#lessons" data-scroll="cases">${t("See the lessons", "Хичээлүүдийг үзэх")}</a>
          </div>
        </div>
      </section>

      <section class="scene hold" aria-label="Хийж сур / Learn by doing"><div class="hold-line">${words}${words}</div></section>

      <section class="scene cases t-js" id="cases">
        <div class="scene-in">
          <h2 class="sec-big stack">${t("JavaScript lessons", "JavaScript хичээлүүд")}</h2>
          <div class="cases-stage" tabindex="0" aria-roledescription="carousel" aria-label="JavaScript">
            <button type="button" class="ghost prev" data-c="prev">${t("Previous", "Өмнөх")}</button>
            ${js.map((L, k) => `<div class="case" data-k="${k}" style="--c1:hsl(${14 + k * 3} 95% ${62 - (k % 3) * 4}%);--c2:hsl(${6 + k * 2} 75% 26%);--case-glow:hsla(${14 + k * 3},95%,60%,.45)">
              <div class="tv-body"><div class="tv-screen case-scr"><span class="tag">${L.code}</span><h4>${tp(L.title)}</h4><pre>${highlight(firstCode(L), "js")}</pre>${k === 0 ? "" : ""}</div></div></div>`).join("")}
            <button type="button" class="ghost next" data-c="next">${t("Next", "Дараах")}</button>
          </div>
          <div class="case-meta" aria-live="polite"></div>
        </div>
      </section>

      <section class="scene team t-sql" id="team">
        <div class="scene-in">
          <h2 class="sec-big stack">${t("Meet the SQL lessons", "SQL хичээлүүдтэй танилц")}</h2>
          <div class="team-count tag"></div>
          <div class="strip" tabindex="0" aria-roledescription="carousel" aria-label="SQL">
            <div class="strip-track">${sql.map((L, k) => `<div class="mem" data-k="${k}"><span class="mem-n">${L.code}</span><span class="mem-head"></span><span class="mem-body"></span><span class="mem-k">${esc(SQL_WORDS[L.id] || "SQL")}</span></div>`).join("")}</div>
            <span class="strip-frame" aria-hidden="true"></span>
            <span class="drag-pill" aria-hidden="true">${t("Drag to explore", "Чирж үзээрэй")}</span>
          </div>
          <div class="team-meta" aria-live="polite"></div>
        </div>
      </section>

      <section class="scene about" id="about">
        <div class="scene-in">
          <div class="about-top">
            <h2 class="about-h">${t("About", "Тухай")}</h2>
            <p class="about-p stack"><span class="l-en" lang="en">${split("Code Ger is a free course that teaches JavaScript and SQL step by step, in Mongolian and English. You do not just read here: you run every example, get every exercise checked, and learn by doing.")}</span><span class="l-mn" lang="mn">${split("Код Гэр бол JavaScript, SQL-ийг монгол, англи хэлээр алхам алхмаар заадаг үнэгүй сургалт. Энд уншаад зогсохгүй: жишээ бүрийг өөрөө ажиллуулж, дасгал бүрээ шалгуулж, хийж байж сурна.")}</span></p>
          </div>
          <div class="about-mid"><canvas aria-hidden="true"></canvas><a class="btn" href="#cheatsheet" data-go="cheatsheet">${t("Cheat sheet", "Товч лавлах")}</a></div>
          <div class="about-cards">
            ${acard("c", "Watch and read", "Үзэж, унш", "An animated walkthrough shows each example running, step by step.", "Хөдөлгөөнт тайлбар жишээ бүр хэрхэн ажилладгийг алхам алхмаар үзүүлнэ.")}
            ${acard("t", "Run the code", "Кодоо ажиллуул", "Change any example and press Run. Nothing can break.", "Жишээг өөрчлөөд Ажиллуулах товч дар. Юу ч эвдрэхгүй.")}
            ${acard("s", "Get it checked", "Шалгуул", "Exercises and quizzes are checked automatically, and every answer is explained.", "Дасгал, сорилын хариуг автоматаар шалгаж, хариулт бүрийг тайлбарлана.")}
          </div>
        </div>
      </section>

      <section class="scene collab" id="collab">
        <div class="scene-in collab-in">
          <div>
            <h2 class="collab-h stack">${t("Ready to start?", "Эхлэхэд бэлэн үү?")}</h2>
            <p class="collab-sub">${t("Let's write your first line.", "Анхны мөрөө хамт бичье!")}</p>
            <div class="collab-links">
              <a class="btn btn-sm" href="#glossary" data-go="glossary">${t("Glossary", "Нэр томьёо")}</a>
              <a class="btn btn-sm" href="#cheatsheet" data-go="cheatsheet">${t("Cheat sheet", "Товч лавлах")}</a>
              <button type="button" class="btn btn-sm" data-open-menu>${t("All lessons", "Бүх хичээл")}</button>
            </div>
          </div>
          <div class="tilt"><a class="tilt-card" href="#${nx.id}" data-go="${nx.id}"><span class="tilt-btn">${started && !allDone ? t("Continue", "Үргэлжлүүлэх") : t("Start a lesson", "Хичээл эхлэх")}</span><span class="tilt-pill">${nx.code} · ${tp(nx.title)}</span></a></div>
        </div>
      </section>
      <footer class="foot"><span>© ${new Date().getFullYear()} Код Гэр · Code Ger</span><span><a href="#glossary" data-go="glossary">${t("Glossary", "Нэр томьёо")}</a> · <a href="#cheatsheet" data-go="cheatsheet">${t("Cheat sheet", "Товч лавлах")}</a></span></footer>
    </div>`;

    mountRoom($("#room", main));
    mountCases($("#cases", main), js);
    mountStrip($("#team", main), sql);
    mountAbout($("#about", main));
    mountTilt($("#collab", main));
    $$("[data-scroll]", main).forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const el = $("#" + a.dataset.scroll, main); if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }));
    $$("[data-open-menu]", main).forEach((b) => b.addEventListener("click", openMenu));
  }

  // Run fn on every animation frame while el is on screen.
  function whileVisible(el, fn) {
    let raf = 0, on = false;
    const loop = (now) => { fn(now); raf = requestAnimationFrame(loop); };
    const set = (v) => { if (v === on) return; on = v; if (on) raf = requestAnimationFrame(loop); else cancelAnimationFrame(raf); };
    let io = null;
    if (typeof IntersectionObserver !== "undefined") { io = new IntersectionObserver((es) => set(es[0].isIntersecting)); io.observe(el); }
    else set(true);
    sceneStop.push(() => { set(false); if (io) io.disconnect(); });
  }

  function mountRoom(room) {
    if (reduceMotion) return;
    const world = $(".room-world", room);
    let tx = 0, ty = 0, cx = 0, cy = 0, lastMove = -1e9;
    const onMove = (e) => {
      const r = room.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      lastMove = performance.now();
    };
    room.addEventListener("pointermove", onMove);
    sceneStop.push(() => room.removeEventListener("pointermove", onMove));
    whileVisible(room, (now) => {
      if (now - lastMove > 2500) { tx = Math.sin(now / 5200) * 0.22; ty = Math.cos(now / 6900) * 0.14; }
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      world.style.transform = `translate3d(${(-cx * 46).toFixed(2)}px,${(-cy * 26).toFixed(2)}px,0) rotateY(${(cx * 12).toFixed(2)}deg) rotateX(${(-cy * 8).toFixed(2)}deg)`;
    });
  }

  function pixelBurst(screen) {
    let px = $(".px", screen);
    if (!px) {
      px = document.createElement("div");
      px.className = "px";
      px.innerHTML = Array.from({ length: 140 }, () => "<i></i>").join("");
      screen.appendChild(px);
    }
    $$("i", px).forEach((i) => i.style.setProperty("--d", (Math.random() * 0.35).toFixed(2) + "s"));
    px.classList.remove("go");
    void px.offsetWidth;
    if (!reduceMotion) px.classList.add("go");
  }

  function mountCases(sec, list) {
    const stage = $(".cases-stage", sec), meta = $(".case-meta", sec), cards = $$(".case", sec);
    let i = Math.max(0, list.findIndex((l) => !done.has(l.id)));
    function layout(first) {
      cards.forEach((c, k) => {
        const d = k - i, a = Math.abs(d);
        c.classList.toggle("side", a === 1);
        c.style.transform = a === 0 ? "translate(-50%,-50%)" : `translate(calc(-50% + ${d * 78}%),-50%) translateZ(-280px) rotateY(${-d * 36}deg) scale(.84)`;
        c.style.opacity = a === 0 ? "1" : a === 1 ? ".5" : "0";
        c.style.filter = a === 0 ? "none" : "brightness(.6) blur(.5px)";
        c.style.zIndex = String(10 - a);
        c.style.pointerEvents = a <= 1 ? "auto" : "none";
        c.setAttribute("aria-hidden", String(a !== 0));
      });
      const L = list[i];
      meta.innerHTML = `<h3 class="case-title stack">${tp(L.title)}</h3><div class="tags">${lessonTags(L)}</div>
        <div class="case-cta"><a class="btn btn-mint btn-sm" href="#${L.id}" data-go="${L.id}">${t("Explore", "Нээх")}</a><a class="btn btn-mint btn-sm btn-sq" href="#${L.id}" data-go="${L.id}" aria-label="${esc(L.title[1])}">${ico("arrowR", 16)}</a></div>`;
      if (!first) pixelBurst($(".tv-screen", cards[i]));
    }
    const move = (to) => { const n = clamp(to, 0, list.length - 1); if (n !== i) { i = n; layout(false); } };
    stage.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]");
      if (b) { move(i + (b.dataset.c === "next" ? 1 : -1)); return; }
      const c = e.target.closest(".case");
      if (!c) return;
      const k = +c.dataset.k;
      if (k === i) { const L = list[i]; go(L.id); try { history.pushState(null, "", "#" + L.id); } catch (err) { /* blocked */ } }
      else move(k);
    });
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); move(i + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); move(i - 1); }
    });
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 50) move(i + (e.clientX < sx ? 1 : -1)); sx = null; });
    layout(true);
  }

  const SQL_WORDS = { "db-intro": "DATABASE", "db-tables": "TABLE", "sql-select": "SELECT", "sql-where": "WHERE", "sql-order": "ORDER BY", "sql-aggregate": "COUNT()", "sql-join": "JOIN", "sql-modify": "UPDATE", "sql-create": "CREATE", "db-design": "SCHEMA", "db-code": "API" };

  function mountStrip(sec, list) {
    const strip = $(".strip", sec), track = $(".strip-track", strip), mems = $$(".mem", track);
    const count = $(".team-count", sec), meta = $(".team-meta", sec);
    let i = Math.max(0, list.findIndex((l) => !done.has(l.id))), off = 0, drag = null;
    const stepW = () => mems[0].getBoundingClientRect().width + 14;
    const offFor = (k) => -(k * stepW() + mems[0].getBoundingClientRect().width / 2);
    const place = (x, anim) => { off = x; track.classList.toggle("anim", !!anim); track.style.transform = `translate(${x.toFixed(1)}px,-50%)`; };
    function mark(k) {
      mems.forEach((m, j) => m.classList.toggle("on", j === k));
      const L = list[k];
      count.textContent = pad2(k + 1) + " / " + pad2(list.length);
      meta.innerHTML = `<h3 class="case-title stack" data-go="${L.id}">${tp(L.title)}</h3><div class="tags">${lessonTags(L)}</div>
        <a class="btn btn-sm" href="#${L.id}" data-go="${L.id}">${t("Open lesson", "Хичээл нээх")}${ico("arrowR", 14)}</a>`;
    }
    function select(k, anim = true) { i = clamp(k, 0, list.length - 1); place(offFor(i), anim); mark(i); }
    const nearest = (x) => clamp(Math.round((-x - mems[0].getBoundingClientRect().width / 2) / stepW()), 0, list.length - 1);
    strip.addEventListener("pointerdown", (e) => {
      drag = { x: e.clientX, off, moved: false, id: e.pointerId, target: e.target.closest(".mem") };
      try { strip.setPointerCapture(e.pointerId); } catch (err) { /* not capturable */ }
      track.classList.remove("anim");
    });
    strip.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) { drag.moved = true; strip.classList.add("dragging"); }
      if (!drag.moved) return;
      place(drag.off + dx, false);
      const k = nearest(off);
      if (!mems[k].classList.contains("on")) mark(k);
    });
    const end = () => {
      if (!drag) return;
      const d = drag;
      drag = null;
      strip.classList.remove("dragging");
      if (d.moved) { select(nearest(off)); return; }
      if (d.target) {
        const k = +d.target.dataset.k;
        if (k === i) { const L = list[i]; go(L.id); try { history.pushState(null, "", "#" + L.id); } catch (err) { /* blocked */ } }
        else select(k);
      }
    };
    strip.addEventListener("pointerup", end);
    strip.addEventListener("pointercancel", end);
    strip.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); select(i + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); select(i - 1); }
      else if (e.key === "Enter") { e.preventDefault(); go(list[i].id); }
    });
    const onResize = () => select(i, false);
    window.addEventListener("resize", onResize);
    sceneStop.push(() => window.removeEventListener("resize", onResize));
    select(i, false);
  }

  function mountAbout(sec) {
    const p = $(".about-p", sec);
    const light = () => {
      const r = p.getBoundingClientRect(), vh = window.innerHeight || 800;
      const prog = clamp((vh * 0.88 - r.top) / (vh * 0.55), 0, 1);
      [$(".l-mn", p), $(".l-en", p)].forEach((part) => {
        const ws = part.children, n = Math.round(prog * ws.length);
        for (let k = 0; k < ws.length; k++) ws[k].classList.toggle("on", reduceMotion || k < n);
      });
    };
    window.addEventListener("scroll", light, { passive: true });
    window.addEventListener("resize", light);
    sceneStop.push(() => { window.removeEventListener("scroll", light); window.removeEventListener("resize", light); });
    light();

    // pixels thicken toward the cards below
    const cv = $("canvas", sec), box = cv.parentElement, g = cv.getContext && cv.getContext("2d");
    if (!g) return;
    const S = 14;
    let cells = [], cols = 0, rows = 0;
    function build() {
      const w = box.clientWidth, h = box.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / S); rows = Math.ceil(h / S);
      cells = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const depth = y / rows, edge = 1 - Math.abs(x / cols - 0.5) * 0.9;
        cells.push({ x, y, p: Math.pow(depth, 1.6) * 0.95 * edge, on: false, a: 0.25 + Math.random() * 0.65 });
      }
      cells.forEach((c) => { c.on = Math.random() < c.p; });
      draw();
    }
    function draw() {
      g.clearRect(0, 0, cols * S, rows * S);
      for (const c of cells) if (c.on) { g.fillStyle = `rgba(206,218,213,${c.a.toFixed(2)})`; g.fillRect(c.x * S, c.y * S, S - 1, S - 1); }
    }
    build();
    let last = 0;
    if (!reduceMotion) whileVisible(box, (now) => {
      if (now - last < 140) return;
      last = now;
      for (let k = 0; k < cells.length * 0.03; k++) { const c = cells[(Math.random() * cells.length) | 0]; c.on = Math.random() < c.p; }
      draw();
    });
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    sceneStop.push(() => window.removeEventListener("resize", onResize));
  }

  function mountTilt(sec) {
    const card = $(".tilt-card", sec);
    if (reduceMotion || !card) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width - 0.5, -1, 1), y = clamp((e.clientY - r.top) / r.height - 0.5, -1, 1);
      card.style.setProperty("--ry", (-22 + x * 26).toFixed(1) + "deg");
      card.style.setProperty("--rx", (8 - y * 16).toFixed(1) + "deg");
    };
    const onLeave = () => { card.style.removeProperty("--ry"); card.style.removeProperty("--rx"); };
    sec.addEventListener("pointermove", onMove);
    sec.addEventListener("pointerleave", onLeave);
    sceneStop.push(() => { sec.removeEventListener("pointermove", onMove); sec.removeEventListener("pointerleave", onLeave); });
  }

  // Lesson illustration from art.js: an inline SVG diagram of the lesson's main idea, with a caption.
  function figureHTML(id) {
    const a = CG.art && CG.art[id];
    if (!a) return "";
    const label = esc((a.caption[1] + " / " + a.caption[0]).replace(/`/g, ""));
    return `<figure class="ill"><div class="ill-pic"><svg class="art" viewBox="0 0 ${a.w} ${a.h}" role="img" aria-label="${label}">${a.body}</svg></div>` +
      `<figcaption>${st(inline(a.caption[0]), inline(a.caption[1]))}</figcaption></figure>`;
  }

  function renderLesson(L) {
    const tr = TRACKS[L.track];
    const idx = LESSONS.indexOf(L);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const slots = [];
    const ex = L.exercise;
    const nq = L.quiz.length;
    // Extra walkthroughs ("lesson-id#name") sit in the lesson, after the heading named in `at` and its first paragraph.
    const extra = Object.keys(CG.videos).filter((k) => k.indexOf(L.id + "#") === 0);
    const nv = (CG.videos[L.id] ? 1 : 0) + extra.length;
    const vLabel = (k) => L.code + (nv > 1 ? " · " + k + "/" + nv : "");
    const after = {};
    extra.forEach((k, j) => {
      const hi = L.body.findIndex((b) => b.t === "h" && b.en === CG.videos[k].at);
      if (hi < 0) return;
      const at = L.body[hi + 1] && L.body[hi + 1].t === "p" ? hi + 1 : hi;
      after[at] = (after[at] || "") + videoHTML(CG.videos[k], vLabel(j + 2), k);
    });
    main.innerHTML = `<article class="page t-${L.track}">
      <div class="lesson-top">
        <div class="crumb"><span class="trk">${tr.short}</span><span>${t("Lesson " + L.num + " of " + tr.lessons.length, "Хичээл " + L.num + " / " + tr.lessons.length)}</span></div>
        <nav class="ticks" aria-label="${tr.short}">${tr.lessons.map((l) => `<a href="#${l.id}" data-go="${l.id}" class="${l === L ? "cur" : done.has(l.id) ? "d" : ""}" title="${l.code} · ${esc(l.title[1])}" aria-label="${l.code}"${l === L ? ' aria-current="page"' : ""}></a>`).join("")}</nav>
      </div>
      <header class="lesson-head"><div class="lesson-no">${L.code}</div><div class="lesson-titles"><h1 class="stack">${tp(L.title)}</h1><p class="lead stack">${tp(L.lead)}</p></div></header>
      ${figureHTML(L.id)}
      <section class="goals"><h3 class="label">${t("In this lesson you will", "Энэ хичээлээр та")}</h3><div class="bi"><ul class="en" lang="en">${L.goals.map((g) => `<li>${inline(g[0])}</li>`).join("")}</ul><ul class="mn" lang="mn">${L.goals.map((g) => `<li>${inline(g[1])}</li>`).join("")}</ul></div></section>
      ${CG.videos[L.id] ? videoHTML(CG.videos[L.id], vLabel(1), L.id) : ""}
      <div class="bi colhead" aria-hidden="true"><div class="en">English</div><div class="mn">Монгол</div></div>
      ${renderBlocks(L.body, slots, L.id, after)}
      <section class="block" id="practice">
        <header class="block-head"><span class="block-ico">${ico("pencil", 22)}</span><h2 class="block-title">${t("Practice", "Дасгал")}</h2><p class="block-sub">${t("Write your code, then press Check. Your answer is checked automatically.", "Кодоо бичээд Шалгах товч дар. Хариуг тань автоматаар шалгана.")}</p></header>
        <div class="task"><div class="label">${t("Task", "Даалгавар")}</div>${bi(inline(ex.task[0]), inline(ex.task[1]))}</div>
        <div data-ex></div>
        <div class="verdict" hidden></div>
        <div class="help">
          <button type="button" class="btn btn-sm" data-act="hint" aria-expanded="false">${ico("bulb", 16)}${t("Show a hint", "Сэжүүр харах")}</button>
          <button type="button" class="btn btn-sm" data-act="sol" aria-expanded="false">${ico("eye", 16)}${t("Show the solution", "Шийдлийг харах")}</button>
        </div>
        <div class="reveal" data-hint hidden><div class="label">${t("Hint", "Сэжүүр")}</div>${bi(inline(ex.hint[0]), inline(ex.hint[1]))}</div>
        <div class="reveal" data-sol hidden><div class="label">${t("Solution", "Шийдэл")}</div><pre class="code"><code>${highlight(tidy(ex.solution), L.track === "js" ? "js" : "sql")}</code></pre>
          <div><button type="button" class="btn btn-sm" data-act="use">${t("Copy into the editor", "Засварлагч руу хуулах")}</button></div></div>
      </section>
      <section class="block" id="quiz">
        <header class="block-head"><span class="block-ico">${ico("quiz", 22)}</span><h2 class="block-title">${t("Check yourself", "Өөрийгөө шалга")}</h2><p class="block-sub">${t(nq + " questions. Each answer is explained.", nq + " асуулт. Хариулт бүрийн дараа тайлбар гарна.")}</p></header>
        ${L.quiz.map((q, qi) => `<div class="q" data-q="${qi}"><div class="q-num">${t("Question " + (qi + 1) + " of " + nq, "Асуулт " + (qi + 1) + " / " + nq)}</div><p class="q-text stack">${tp(q.q)}</p>
          <div class="q-opts">${q.opts.map((o, oi) => `<button type="button" class="opt" data-o="${oi}"><span class="lt">${"ABCD"[oi]}</span><span class="stack">${tp(o)}</span><span class="res" aria-hidden="true"></span></button>`).join("")}</div>
          <div class="q-why" hidden><span class="label">${t("Explanation", "Тайлбар")}</span><p class="stack">${tp(q.why)}</p></div></div>`).join("")}
        <div class="q-score" hidden><span class="q-score-txt"></span><button type="button" class="btn btn-sm" data-act="retry">${ico("reset", 16)}${t("Try again", "Дахин оролдох")}</button></div>
      </section>
      <section class="finish">
        <div class="finish-txt"><b>${t("Finished this lesson?", "Хичээлээ дуусгасан уу?")}</b><span>${t("Mark it as done to track your progress. Solving the practice marks it for you.", "Ахицаа хянахын тулд дууссан гэж тэмдэглээрэй. Дасгалаа зөв хийвэл автоматаар тэмдэглэгдэнэ.")}</span></div>
        <button type="button" class="btn" data-act="mark"></button>
      </section>
      <nav class="pager" aria-label="Хичээлүүд / Lessons">
        ${prev ? `<a href="#${prev.id}" data-go="${prev.id}"><small>${ico("arrowL", 14)}${t("Previous lesson", "Өмнөх хичээл")}</small><span>${prev.code} ${tp(prev.title)}</span></a>` : ""}
        ${next ? `<a class="next" href="#${next.id}" data-go="${next.id}"><small>${t("Next lesson", "Дараагийн хичээл")}${ico("arrowR", 14)}</small><span>${next.code} ${tp(next.title)}</span></a>`
          : `<a class="next" href="#home" data-go="home"><small>${t("Course complete", "Сургалт дууслаа")}${ico("arrowR", 14)}</small><span>${t("Back to the course home", "Нүүр хуудас руу буцах")}</span></a>`}
      </nav>
    </article>`;
    mountSlots(main, slots);
    $$(".vid", main).forEach((v) => mountVideo(v, CG.videos[v.dataset.vid]));

    // exercise
    const page = $(".page", main);
    const verdict = $(".verdict", page);
    const showVerdict = (good, en, mn, subEn, subMn) => {
      verdict.hidden = false;
      verdict.className = "verdict " + (good ? "good" : "bad");
      verdict.innerHTML = `<span class="v-ico"><b>${good ? "✓" : "!"}</b></span><div class="v-body"><div>${t(en, mn)}</div>${subEn ? `<div class="sub">${t(subEn, subMn)}</div>` : ""}</div>`;
    };
    const pass = () => {
      const was = done.has(L.id);
      if (!was) setMarked(L.id, true);
      updateMark();
      showVerdict(true, "Correct! Well done.", "Зөв! Сайн байна.", was ? "" : "This lesson is now marked as done.", was ? "" : "Энэ хичээлийг дууссан гэж тэмдэглэлээ.");
      if (next) verdict.insertAdjacentHTML("beforeend", `<a class="btn btn-sm" href="#${next.id}" data-go="${next.id}">${t("Next lesson", "Дараагийн хичээл")}${ico("arrowR", 16)}</a>`);
    };
    const onCheck = L.track === "js" ? async (code, print) => {
      print(`<div class="out-dim">…</div>`);
      const res = await runJS(code);
      print(jsResultHTML(res));
      if (res.error || res.timeout) return showVerdict(false, "Not yet: the code stopped with an error.", "Хараахан болоогүй: код алдаатай зогслоо.", "Read the red message in the output, fix it and check again.", "Гаралт дахь улаан мэдээллийг уншаад, засаад дахин шалга.");
      const norm = (s) => s.split("\n").map((x) => x.trim().replace(/\s+/g, " ")).filter(Boolean).join("\n");
      const got = norm((res.out || []).filter((o) => o.type !== "table").map((o) => o.text).join("\n"));
      if (got === norm(ex.expect)) pass();
      else showVerdict(false, "Not yet. The output is different.", "Хараахан болоогүй. Гаралт өөр байна.", "Expected: " + esc(ex.expect).replace(/\n/g, " ⏎ "), "Гарах ёстой: " + esc(ex.expect).replace(/\n/g, " ⏎ "));
    } : async (code, print) => {
      print(`<div class="out-dim">${t("Loading SQLite…", "SQLite ачаалж байна…")}</div>`);
      let SQL;
      try { SQL = await loadSQL(); } catch (e) { return print(SQL_LOAD_FAIL); }
      const mine = execSQL(freshDB(SQL), code);
      const want = execSQL(freshDB(SQL), ex.solution);
      print(sqlResultHTML(mine) + `<div class="out-label" style="padding-top:12px">${t("Expected result", "Гарах ёстой үр дүн")}</div>` + sqlResultHTML(want));
      if (mine.error) return showVerdict(false, "Not yet: the query has an error.", "Хараахан болоогүй: хүсэлтэд алдаа байна.", "Read the error in the output above.", "Дээрх гаралт дахь алдааг унш.");
      const r = compareSQL(lastTable(mine.results), lastTable(want.results), ex);
      if (r.ok) pass(); else showVerdict(false, "Not yet. Compare your result with the expected result.", "Хараахан болоогүй. Үр дүнгээ гарах ёстой үр дүнтэй харьцуул.", r.why[0], r.why[1]);
    };
    const exRunner = makeRunner(L.track === "js" ? "js" : "sql", ex.start, { key: L.id + "-ex", onCheck });
    $("[data-ex]", page).replaceWith(exRunner.el);

    const updateMark = () => {
      const b = $('[data-act="mark"]', page);
      const on = done.has(L.id);
      b.className = "btn " + (on ? "btn-done" : "btn-primary");
      b.title = on ? "Дахин дарвал тэмдэглэгээ арилна / Click again to unmark" : "";
      b.innerHTML = on ? DONE_MARK + t("Lesson done", "Хичээл дууссан") : ico("tick", 16) + t("Mark as done", "Дууссан гэж тэмдэглэх");
    };
    updateMark();

    page.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const act = b.dataset.act;
      if (act === "hint" || act === "sol") {
        const box = $(act === "hint" ? "[data-hint]" : "[data-sol]", page);
        box.hidden = !box.hidden;
        b.setAttribute("aria-expanded", String(!box.hidden));
      }
      else if (act === "use") { exRunner.setCode(tidy(ex.solution)); exRunner.el.scrollIntoView({ block: "center", behavior: "smooth" }); }
      else if (act === "mark") { setMarked(L.id, !done.has(L.id)); updateMark(); }
      else if (act === "retry") resetQuiz();
      else if (b.classList.contains("opt")) answer(b);
    });

    let answered = 0, right = 0;
    function answer(b) {
      const qEl = b.closest(".q");
      const q = L.quiz[+qEl.dataset.q];
      const chosen = +b.dataset.o;
      $$(".opt", qEl).forEach((o) => {
        o.disabled = true;
        if (+o.dataset.o === q.a) o.classList.add("right");
      });
      if (chosen !== q.a) b.classList.add("wrong"); else right++;
      $(".q-why", qEl).hidden = false;
      answered++;
      if (answered === nq) {
        const s = $(".q-score", page);
        s.hidden = false;
        $(".q-score-txt", s).innerHTML = (right === nq ? "★ " : "") + t(right + " of " + nq + " correct", nq + "-аас " + right + " нь зөв");
      }
    }
    function resetQuiz() {
      answered = 0; right = 0;
      $$(".opt", page).forEach((o) => { o.disabled = false; o.classList.remove("right", "wrong"); });
      $$(".q-why", page).forEach((w) => { w.hidden = true; });
      $(".q-score", page).hidden = true;
      $("#quiz", page).scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  function lastTable(results) {
    for (let i = results.length - 1; i >= 0; i--) if (results[i].cols) return results[i];
    return null;
  }
  function compareSQL(a, b, ex) {
    if (!a) return { ok: false, why: ["Your query did not return a table. Make sure it ends with a SELECT.", "Таны хүсэлт хүснэгт буцаасангүй. SELECT-ээр төгссөн эсэхийг шалга."] };
    if (a.cols.length !== b.cols.length) return { ok: false, why: ["Expected " + b.cols.length + " columns, but your result has " + a.cols.length + ".", b.cols.length + " багана гарах ёстой, таных " + a.cols.length + " байна."] };
    if (ex.checkNames && a.cols.join("|").toLowerCase() !== b.cols.join("|").toLowerCase()) return { ok: false, why: ["Column names should be: " + b.cols.join(", "), "Баганын нэр ийм байх ёстой: " + b.cols.join(", ")] };
    if (a.rows.length !== b.rows.length) return { ok: false, why: ["Expected " + b.rows.length + " rows, but your result has " + a.rows.length + ".", b.rows.length + " мөр гарах ёстой, таных " + a.rows.length + " байна."] };
    const key = (r) => JSON.stringify(r.map((v) => (typeof v === "number" ? Math.round(v * 1e6) / 1e6 : v)));
    const A = a.rows.map(key), B = b.rows.map(key);
    const sameSet = A.slice().sort().join("\n") === B.slice().sort().join("\n");
    if (!sameSet) return { ok: false, why: ["Some values are different. Check your conditions and the order of the columns.", "Зарим утга өөр байна. Нөхцөл, баганын дарааллаа шалга."] };
    if (ex.ordered && A.join("\n") !== B.join("\n")) return { ok: false, why: ["The rows are right, but the order is not. Check ORDER BY.", "Мөрүүд зөв, гэхдээ дараалал буруу. ORDER BY-аа шалга."] };
    return { ok: true };
  }

  function refHead(mark, en, mn, leadEn, leadMn) {
    return `<div class="lesson-top"><div class="crumb"><span class="trk">${t("Reference", "Лавлах")}</span></div></div>
      <header class="lesson-head"><div class="lesson-no">${mark}</div><div class="lesson-titles"><h1 class="stack">${t(en, mn)}</h1><p class="lead">${t(leadEn, leadMn)}</p></div></header>`;
  }

  function renderGlossary() {
    main.innerHTML = `<article class="page">
      ${refHead("Aa", "Glossary", "Нэр томьёо", "Every term from the course in Mongolian and English.", "Сургалтын бүх нэр томьёо монгол, англи хэлээр.")}
      <div class="gl-tools">
        <label class="search">${ico("search", 18)}<span class="sr">Хайх / Search</span><input id="gl-q" type="search" placeholder="Хайх / Search: давталт, table…" autocomplete="off"></label>
        <div class="seg" role="group" aria-label="Ангилал / Category">
          <button type="button" data-cat="all" aria-pressed="true">${t("All", "Бүгд")}</button>
          <button type="button" data-cat="code" aria-pressed="false">JavaScript</button>
          <button type="button" data-cat="db" aria-pressed="false">SQL</button>
        </div>
      </div>
      <div class="gl-count" id="gl-count" aria-live="polite"></div>
      <div class="gl-list" id="gl-list"></div>
    </article>`;
    let cat = "all";
    const q = $("#gl-q");
    const draw = () => {
      const s = q.value.trim().toLowerCase();
      const items = CG.glossary.filter((g) => (cat === "all" || g.cat === cat) && (!s || (g.en + " " + g.mn + " " + g.d.join(" ")).toLowerCase().includes(s)));
      $("#gl-count").innerHTML = t(items.length + (items.length === 1 ? " term" : " terms"), items.length + " нэр томьёо");
      $("#gl-list").innerHTML = `<div class="gl-row head"><div>Монгол</div><div>English</div><div class="gl-def">${t("Meaning", "Утга")}</div></div>` +
        (items.length ? items.map((g) => `<div class="gl-row"><div class="gl-mn" lang="mn">${esc(g.mn)}</div><div class="gl-en" lang="en">${esc(g.en)}</div><div class="gl-def">${st(inline(g.d[0]), inline(g.d[1]))}</div></div>`).join("")
          : `<div class="gl-empty">${t("No terms match your search. Try a shorter word.", "Хайлтад тохирох нэр томьёо алга. Богинохон үгээр хайгаад үз.")}</div>`);
    };
    q.addEventListener("input", draw);
    $(".gl-tools .seg", main).addEventListener("click", (e) => {
      const b = e.target.closest("button[data-cat]");
      if (!b) return;
      cat = b.dataset.cat;
      $$(".gl-tools .seg button", main).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      draw();
    });
    draw();
  }

  function renderCheats() {
    const group = (lang, title) => `<h2 class="sec">${title}</h2><div class="cheat t-${lang}">${CG.cheats.filter((c) => c.lang === lang).map((c) => `
      <div class="cheat-card"><h3 class="stack">${tp(c.title)}</h3><pre class="code"><code>${highlight(tidy(c.code), lang)}</code></pre></div>`).join("")}</div>`;
    main.innerHTML = `<article class="page">
      ${refHead("{ }", "Cheat sheet", "Товч лавлах", "The syntax from every lesson on one page. Keep it open while you practise.", "Бүх хичээлийн бичлэг нэг хуудсанд. Дасгал хийхдээ нээлттэй байлгаарай.")}
      ${group("js", "JavaScript")}
      ${group("sql", "SQL")}
    </article>`;
  }

  // ---------------- routing ----------------
  let current = "home";
  function go(id) {
    stopScenes();
    const L = LESSONS.find((l) => l.id === id);
    current = L || id === "glossary" || id === "cheatsheet" ? id : "home";
    if (L) renderLesson(L);
    else if (id === "glossary") renderGlossary();
    else if (id === "cheatsheet") renderCheats();
    else renderHome();
    // "lesson" pages get a calmer frame (no blinking, no running hundredths) and a reading-progress line.
    document.documentElement.dataset.view = L ? "lesson" : current === "home" ? "home" : "page";
    renderNav();
    closeMenu();
    window.scrollTo(0, 0);
    paintRead();
  }

  // Reading progress: the top edge of the viewfinder fills in as you scroll through a lesson.
  const vfRead = $("#vfRead");
  let readRaf = 0;
  function paintRead() {
    const max = document.documentElement.scrollHeight - innerHeight;
    vfRead.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  }
  window.addEventListener("scroll", () => { if (!readRaf) readRaf = requestAnimationFrame(() => { readRaf = 0; paintRead(); }); }, { passive: true });
  function routeFromHash() { go((location.hash || "").replace(/^#/, "") || "home"); }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-go]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const id = a.dataset.go;
    go(id);
    try { history.pushState(null, "", "#" + id); } catch (err) { /* address changes may be blocked */ }
  });
  window.addEventListener("hashchange", routeFromHash);
  window.addEventListener("popstate", routeFromHash);

  // language: the pill button cycles Монгол → English → both; the menu has all three
  const LANG_ORDER = ["mn", "en", "both"];
  const LANG_SHORT = { mn: "МН", en: "EN", both: "МН + EN" };
  const langBtn = $("#langBtn");
  function setLang(m) {
    document.documentElement.dataset.lang = m;
    document.documentElement.lang = m === "en" ? "en" : "mn";
    $$("[data-lang-set]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langSet === m)));
    langBtn.textContent = LANG_SHORT[m];
    langBtn.setAttribute("aria-label", "Хэл: " + LANG_SHORT[m] + " / Language: " + LANG_SHORT[m]);
    store.set("lang", m);
  }
  $$("[data-lang-set]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.langSet)));
  langBtn.addEventListener("click", () => setLang(LANG_ORDER[(LANG_ORDER.indexOf(document.documentElement.dataset.lang) + 1) % LANG_ORDER.length]));
  setLang(document.documentElement.dataset.lang || "mn");

  // menu overlay
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  const MENU_LABEL = t("Menu", "Цэс"), CLOSE_LABEL = t("Close", "Хаах");
  function openMenu() {
    menu.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.innerHTML = CLOSE_LABEL;
    document.documentElement.style.overflow = "hidden";
    const cur = $('.nav-link[aria-current="page"]', menu) || $(".nav-link", menu);
    if (cur) cur.focus({ preventScroll: false });
  }
  function closeMenu() {
    if (menu.hidden) return;
    menu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = MENU_LABEL;
    document.documentElement.style.overflow = "";
  }
  menuBtn.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));
  menu.addEventListener("click", (e) => { if (e.target === menu) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { closeMenu(); menuBtn.focus(); } });

  // viewfinder: live fps, today's date and a running timecode
  (function frameChrome() {
    const fpsEl = $("#vfFps"), timeEl = $("#vfTime"), d = new Date();
    $("#vfDate").textContent = `[ ${pad2(d.getDate())} / ${pad2(d.getMonth() + 1)} / ${String(d.getFullYear()).slice(2)} ]`;
    const t0 = performance.now();
    let frames = 0, mark = t0, shownSec = -1;
    function tick(now) {
      frames++;
      if (now - mark >= 500) { fpsEl.textContent = Math.round((frames * 1000) / (now - mark)) + " fps"; frames = 0; mark = now; }
      const ms = now - t0, cs = Math.floor(ms / 10) % 100;
      const calm = reduceMotion || document.documentElement.dataset.view !== "home";   // no flickering hundredths while reading
      if (!calm || Math.floor(ms / 1000) !== shownSec) {
        shownSec = Math.floor(ms / 1000);
        timeEl.textContent = `[ ${pad2(Math.floor(ms / 60000) % 100)}:${pad2(shownSec % 60)}:${pad2(calm ? 0 : cs)} ]`;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  renderProgress();
  routeFromHash();
})();

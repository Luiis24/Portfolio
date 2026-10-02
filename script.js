const EN = {
  nAbout: "About", nExp: "Experience", nProj: "Projects", nSkills: "Skills", nContact: "Contact",
  avail: "Available · remote work",
  lead: "I build enterprise applications with Angular and Spring Boot. 2+ years in production in healthcare software, fixing real bugs and mentoring other developers.",
  viewProjects: "View projects", downloadCV: "Download CV", hire: "Let's talk",
  s1: "years in production", s2: "published projects", s3: "technologies", s4: "English",
  aboutTitle: "About me",
  aboutText: "I'm a Full Stack developer with 2+ years in production environments. My strength is frontend with Angular and TypeScript, and I build Java and Spring Boot backends with layered architecture (Controller, Service, DAO, DTOs and Mappers). I work in agile teams with Scrum and Kanban, and I care about clean code, SOLID, and testing everything with Postman before delivery.",
  eduTitle: "Education", edu1: "Systems Engineering", now: "present", edu2: "Software Analysis and Development Technologist", langs: "Languages", langsV: "Spanish native · English B2",
  expTitle: "Experience",
  j1t: "Web Developer", j1d: "Oct 2024 – Jul 2026", j1c: "Medical software · Hybrid",
  j1a: "Built full stack features in internal medical applications with Angular, TypeScript, Java and Spring Boot.",
  j1b: "Built end-to-end backends with layered architecture, DTOs and Mappers.",
  j1c2: "Wrote SQL queries on MySQL and generated dynamic reports with JasperSoft.",
  j1d2: "Validated REST services with Postman and fixed production bugs.",
  j1e: "Managed tasks and sprints in Azure DevOps and took part in Scrum ceremonies.",
  j1f: "Supported junior developers on frontend and backend tasks.",
  j2t: "Full Stack Apprentice (professional internship)", j2d: "Apr 2024 – Oct 2024",
  j2a: "Supported development and deployment of modules with Angular, Java and Spring Boot under Scrum and Kanban.",
  j2b: "Served as evaluating judge at SENASoft 2024, representing the company.",
  j2c: "Recognized by SENA as an outstanding apprentice, with participation in research groups.",
  projTitle: "Projects", fAll: "All",
  p1t: "E-Commerce Challenge", p1d: "Full stack e-commerce built in 7 days in the tryCatch challenge: catalog, cart and CRUD for products and users. Go (Gin) backend with PostgreSQL.",
  p3t: "SGMI: industrial maintenance", p3d: "Desktop platform to track machinery, components and maintenance processes. Born from the SENA research group.",
  p2d: "Bike store with authentication, catalog, cart and checkout simulation. React frontend and Node.js backend with PostgreSQL.",
  skTitle: "Skills", skDb: "Data and reports", skTools: "Tools and methods",
  cTitle: "Contact", cLead: "I'm looking for a remote frontend or full stack role. Write to me and I'll reply quickly.",
  cLoc: "Cali, Colombia · remote work", send: "Send message", top: "Back to top",
  nameP: "Your name", mailP: "Your email", msgP: "Tell me what you need",
  sent: "Opening your email app. If nothing opens, write to nandoarmo01@gmail.com."
};
const ROLES = {
  es: ["Desarrollador Full Stack", "Angular + TypeScript", "Java + Spring Boot", "APIs REST y reportes"],
  en: ["Full Stack Developer", "Angular + TypeScript", "Java + Spring Boot", "REST APIs and reports"]
};
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch { return null; } };

// Spanish text is read from the HTML itself
$$("[data-i18n]").forEach(e => e.dataset.es = e.textContent);
$$("[data-ph]").forEach(e => e.dataset.es = e.placeholder);
let lang = "es";
function setLang(l) {
  lang = l;
  $$("[data-i18n]").forEach(e => { e.textContent = l === "es" ? e.dataset.es : (EN[e.dataset.i18n] ?? e.dataset.es); });
  $$("[data-ph]").forEach(e => { e.placeholder = l === "es" ? e.dataset.es : EN[e.dataset.ph]; });
  document.documentElement.lang = l;
  $("#langBtn").textContent = l === "es" ? "EN" : "ES";
  store("lang", l); startTyping();
}
$("#langBtn").onclick = () => setLang(lang === "es" ? "en" : "es");

// Theme
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  $("#themeBtn").textContent = t === "dark" ? "☀" : "☾";
  store("theme", t);
}
$("#themeBtn").onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");

// Typing effect
let typeRun = 0;
async function startTyping() {
  const run = ++typeRun, el = $("#typed"), words = ROLES[lang];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = words[0]; return; }
  const wait = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; run === typeRun; i = (i + 1) % words.length) {
    for (let c = 1; c <= words[i].length && run === typeRun; c++) { el.textContent = words[i].slice(0, c); await wait(70); }
    await wait(1500);
    for (let c = words[i].length; c >= 0 && run === typeRun; c--) { el.textContent = words[i].slice(0, c); await wait(35); }
    await wait(300);
  }
}

// Slow eased anchor scrolling
function glide(y, dur = 1200) {
  const from = scrollY, d = y - from, t0 = performance.now();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return scrollTo(0, y);
  const step = now => {
    const p = Math.min((now - t0) / dur, 1), e = p < .5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
    scrollTo(0, from + d * e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const t = a.getAttribute("href") === "#top" ? document.body : $(a.getAttribute("href"));
  if (!t) return;
  e.preventDefault();
  glide(t === document.body ? 0 : t.getBoundingClientRect().top + scrollY - 70);
  $("#links").classList.remove("open");
}));
$("#burger").onclick = () => $("#links").classList.toggle("open");

// Scroll progress, nav state, active link
const secs = $$("main section");
addEventListener("scroll", () => {
  const h = document.documentElement;
  $("#progress").style.width = (scrollY / (h.scrollHeight - innerHeight) * 100) + "%";
  $("#nav").classList.toggle("scrolled", scrollY > 20);
  let cur = "";
  secs.forEach(s => { if (scrollY >= s.offsetTop - 140) cur = s.id; });
  $$("#links a").forEach(a => a.classList.toggle("act", a.getAttribute("href") === "#" + cur));
}, { passive: true });

// Reveal on scroll (blocks only, not every element)
$$(".item,.card,.panel,.skgrid>div,.stats>div,form").forEach(e => e.classList.add("rv"));
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in"); io.unobserve(en.target);
  if (en.target.dataset.counted) return;
}), { threshold: .15 });
$$(".rv").forEach(e => io.observe(e));

// Counters
const cio = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target, n = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
  const tick = now => { const p = Math.min((now - t0) / 1400, 1); el.textContent = Math.round(n * p) + (p === 1 ? suf : ""); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick); cio.unobserve(el);
}), { threshold: .6 });
$$("[data-count]").forEach(e => cio.observe(e));

// Project filters
$$(".filters button").forEach(b => b.onclick = () => {
  $$(".filters button").forEach(x => x.classList.toggle("on", x === b));
  $$(".card").forEach(c => c.classList.toggle("hide", b.dataset.f !== "all" && !c.dataset.tags.split(" ").includes(b.dataset.f)));
});

// Contact form: opens the visitor's email app, no backend needed
$("#form").onsubmit = e => {
  e.preventDefault();
  const n = $("#fn").value, m = $("#fm").value, f = $("#fe").value;
  const subj = encodeURIComponent((lang === "es" ? "Contacto desde tu portafolio: " : "Contact from your portfolio: ") + n);
  const body = encodeURIComponent(m + "\n\n" + n + " · " + f);
  location.href = `mailto:nandoarmo01@gmail.com?subject=${subj}&body=${body}`;
  $("#note").textContent = lang === "es" ? "Abriendo tu app de correo. Si no se abre, escribe a nandoarmo01@gmail.com." : EN.sent;
};

// Init
setTheme(store("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
setLang(store("lang") || (navigator.language.startsWith("en") ? "en" : "es"));

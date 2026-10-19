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
  projTitle: "Projects",
  projLead: "Personal projects, challenges and technical tests. Filter by technology or open the deployed demos without leaving the portfolio.",
  openNew: "Open in new tab ↗",
  demoNote: "Loading demo… If the service is on a free plan it may take a few seconds to wake up. If it does not show, open it in a new tab.",
  skLead: "Tap a technology to see the projects where I use it.",
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
  if (typeof renderFilters === "function") { renderFilters(); renderProjects(); }
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


// ---------- Projects (data-driven) ----------
const GH = "https://github.com/Luiis24/";
const UI = {
  es: { all: "Todos", live: "Desplegados", demo: "Ver demo", code: "Código", deployed: "Desplegado", codeOnly: "Solo código", github: "GitHub", api: "API", none: "Ningún proyecto con este filtro." },
  en: { all: "All", live: "Deployed", demo: "Live demo", code: "Code", deployed: "Deployed", codeOnly: "Code only", github: "GitHub", api: "API", none: "No projects match this filter." }
};
// keys de filtro: live (tiene demo), react, angular, node, go, dotnet, php, docker, sql, js
const FILTERS = [["live", null], ["react", "React"], ["angular", "Angular"], ["node", "Node.js"], ["go", "Go"], ["dotnet", ".NET"], ["php", "PHP / Laravel"], ["docker", "Docker"], ["sql", "SQL"], ["js", "JavaScript"]];
// Para publicar una demo, pon su URL en "demo".
const PROJECTS = [
  {
    repo: "MediCore", demo: "https://medicore-304b.onrender.com/",
    t: { es: "MediCore: gestión clínica", en: "MediCore: clinic management" },
    d: {
      es: "Pacientes, citas e historias clínicas con dashboard de métricas en tiempo real, API REST en JSON, búsqueda, modo oscuro y despliegue con Docker en Render.",
      en: "Patients, appointments and medical records with a real-time metrics dashboard, JSON REST API, search, dark mode and Docker deployment on Render."
    },
    tech: ["ASP.NET Core 8 MVC", "Entity Framework Core", "SQLite", "Bootstrap 5", "Docker"], keys: ["dotnet", "docker", "sql"]
  },
  {
    repo: "CajaRapida-StockSimulator", demo: "https://cajastocksimulator.netlify.app/",
    t: { es: "Caja Rápida: POS e inventario", en: "Caja Rápida: POS and inventory" },
    d: {
      es: "Mini punto de venta para un negocio de seguridad electrónica: carrito con IVA, stock que baja al facturar, alertas de agotados y factura imprimible en formato tirilla. Sin dependencias.",
      en: "Mini point of sale for a security-equipment shop: cart with VAT, stock that drops on checkout, out-of-stock alerts and a printable receipt. Zero dependencies."
    },
    tech: ["HTML5", "CSS3", "JavaScript", "localStorage"], keys: ["js"]
  },
  {
    repo: "NovaBank", demo: "",
    t: { es: "NovaBank: micro frontends", en: "NovaBank: micro frontends" },
    d: {
      es: "Portal bancario ficticio: un shell carga en tiempo de ejecución un simulador de crédito y un cotizador de seguros con Module Federation. Cada pieza también se compila como widget autónomo configurable con atributos data-*.",
      en: "Fictional banking portal: a shell loads a credit simulator and an insurance quoter at runtime with Module Federation. Each piece also builds as a standalone widget configured via data-* attributes."
    },
    tech: ["React", "TypeScript", "Vite", "Module Federation"], keys: ["react"]
  },
  {
    repo: "iot-dashboard", demo: "",
    t: { es: "Dashboard IoT en tiempo real", en: "Real-time IoT dashboard" },
    d: {
      es: "Monitoreo de temperatura y humedad con nodos ESP32 simulados: lecturas cada 500 ms, historial navegable, niveles aceptables editables, alertas, y comandos de apagado y reinicio. Incluye diseño documentado hacia AWS IoT.",
      en: "Temperature and humidity monitoring with simulated ESP32 nodes: readings every 500 ms, browsable history, editable thresholds, alerts, and power and restart commands. Includes a documented path to AWS IoT."
    },
    tech: ["React 18", "Vite", "Recharts", "JavaScript"], keys: ["react", "js"]
  },
  {
    repo: "vacation-infodec", demo: "",
    t: { es: "Vacation: planificador de viajes", en: "Vacation: trip planner" },
    d: {
      es: "Prueba técnica fullstack de Infodec: consulta el clima y convierte un presupuesto en COP a la moneda del destino, con historial por usuario, autenticación con tokens, pruebas unitarias e interfaz en español y alemán.",
      en: "Infodec fullstack technical test: checks the weather and converts a COP budget into the destination currency, with per-user history, token authentication, unit tests and a Spanish/German interface."
    },
    tech: ["Laravel 11", "PHP 8.2", "PostgreSQL", "Angular 16", "Bootstrap 5", "PHPUnit"], keys: ["php", "angular", "sql"]
  },
  {
    repo: "Sistema-Para-La-Gestion-De-Mantenimiento", demo: "",
    extra: [{ label: "api", href: GH + "Api-SGMI-Render-" }],
    t: { es: "SGMI: mantenimiento industrial", en: "SGMI: industrial maintenance" },
    d: {
      es: "Plataforma de escritorio para registrar maquinaria y componentes y gestionar mantenimiento preventivo y correctivo, con instructores y aprendices. Nació del semillero de investigación del SENA y tiene una API REST documentada con Swagger.",
      en: "Desktop platform to track machinery and components and manage preventive and corrective maintenance, with instructors and apprentices. Born from the SENA research group, with a REST API documented in Swagger."
    },
    tech: ["React", "Electron", "Node.js", "PostgreSQL", "Swagger"], keys: ["react", "node", "sql"]
  },
  {
    repo: "HagaseUnEcommerce", demo: "",
    t: { es: "Reto E-Commerce tryCatch", en: "tryCatch E-Commerce Challenge" },
    d: {
      es: "E-commerce full stack hecho en 7 días: catálogo, carrito y CRUD de productos y usuarios. Backend en Go (Gin) con PostgreSQL. Quedó en 5.º lugar del reto.",
      en: "Full stack e-commerce built in 7 days: catalog, cart and CRUD for products and users. Go (Gin) backend with PostgreSQL. Placed 5th in the challenge."
    },
    tech: ["HTML", "CSS", "JavaScript", "Go (Gin)", "PostgreSQL"], keys: ["go", "js", "sql"]
  },
  {
    repo: "Prueba-tecnica-agente-motor", demo: "",
    t: { es: "Gestión de pólizas (prueba técnica)", en: "Policy management (technical test)" },
    d: {
      es: "API REST en Node.js y Express con SQLite y frontend en JavaScript puro: filtros, búsqueda, modal y validaciones en ambos lados. El README documenta decisiones, alcance y qué faltaría para producción.",
      en: "Node.js and Express REST API with SQLite and a vanilla JavaScript frontend: filters, search, modal and validation on both sides. The README documents decisions, scope and what is missing for production."
    },
    tech: ["Node.js", "Express", "SQLite", "JavaScript", "Postman"], keys: ["node", "js", "sql"]
  },
  {
    repo: "Bike-Store", demo: "",
    t: { es: "Bike Store", en: "Bike Store" },
    d: {
      es: "Tienda de bicicletas con autenticación (contraseñas cifradas con bcrypt), catálogo, carrito y simulación de compra. React + Vite en el frontend y Node.js con PostgreSQL en el backend.",
      en: "Bike store with authentication (bcrypt-hashed passwords), catalog, cart and checkout simulation. React + Vite frontend and Node.js with PostgreSQL backend."
    },
    tech: ["React", "Vite", "Node.js", "PostgreSQL", "bcrypt"], keys: ["react", "node", "sql"]
  }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let filter = "all";

function renderFilters() {
  const u = UI[lang];
  const btn = (k, label) => `<button type="button" data-f="${k}" class="${filter === k ? "on" : ""}">${esc(label)}</button>`;
  $("#filters").innerHTML = btn("all", u.all) + FILTERS.map(([k, l]) => btn(k, k === "live" ? u.live : l)).join("");
  $$("#filters button").forEach(b => b.onclick = () => setFilter(b.dataset.f));
}

function renderProjects() {
  const u = UI[lang];
  const list = PROJECTS.filter(p => filter === "all" || (filter === "live" ? !!p.demo : p.keys.includes(filter)));
  $("#projGrid").innerHTML = list.length ? list.map(p => `
    <article class="card">
      <div class="card-top">
        <h3>${esc(p.t[lang])}</h3>
        <span class="status ${p.demo ? "live" : ""}">${p.demo ? u.deployed : u.codeOnly}</span>
      </div>
      <p>${esc(p.d[lang])}</p>
      <ul class="tech">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="actions">
        ${p.demo ? `<button type="button" class="act primary" data-demo="${esc(p.demo)}" data-title="${esc(p.t[lang])}">▶ ${u.demo}</button>` : ""}
        <a class="act" href="${GH + p.repo}" target="_blank" rel="noopener">${u.github}</a>
        ${(p.extra || []).map(x => `<a class="act" href="${x.href}" target="_blank" rel="noopener">${u[x.label] || x.label}</a>`).join("")}
      </div>
    </article>`).join("") : `<p class="empty">${u.none}</p>`;
  $$("[data-demo]").forEach(b => b.onclick = () => openDemo(b.dataset.demo, b.dataset.title));
}

function setFilter(k) {
  filter = filter === k && k !== "all" ? "all" : k;
  renderFilters(); renderProjects();
  syncSkills();
}

// Skills -> filtran proyectos
function syncSkills() { $$(".skgrid li[data-t]").forEach(li => li.classList.toggle("on", li.dataset.t === filter)); }
$$(".skgrid li[data-t]").forEach(li => {
  li.tabIndex = 0; li.setAttribute("role", "button");
  const go = () => { setFilter(li.dataset.t); glide($("#projects").getBoundingClientRect().top + scrollY - 70); };
  li.onclick = go;
  li.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } };
});

// Demo viewer
const modal = $("#demoModal"), frame = $("#demoFrame");
function openDemo(url, title) {
  $("#demoTitle").textContent = title;
  $("#demoOpen").href = url;
  frame.src = url;
  modal.showModal();
}
function closeDemo() { modal.close(); frame.src = "about:blank"; }
$("#demoClose").onclick = closeDemo;
modal.addEventListener("click", e => { if (e.target === modal) closeDemo(); });
modal.addEventListener("close", () => { frame.src = "about:blank"; });

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
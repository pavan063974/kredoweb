/* =====================================================================
   KREDO ANALYTICS — pure-vanilla JS port (no React, no Babel)
   ---------------------------------------------------------------------
   Sections in this file:
     1) Data
     2) Tiny DOM helper  h(tag, attrs, ...children)
     3) Icons
     4) Section components (Logo, Nav, Hero, Stats, Products, Services,
        About, Clients, Testimonials, MapSection, DemoSection, CTA, Footer)
     5) Detail overlays (FinlensDetail, ERPDetail)
     6) Background videos + cursor parallax (was bg.js)
     7) App entry: mount everything, scroll-spy, detail open/close
   ===================================================================== */


/* ============== 1. DATA ============== */
const D = {
  brand: {
    name: "KREDO",
    tag: "ANALYTICS · EST. 2018",
    descr: "Kredo Analytics builds enterprise software, automation, and AI for finance, operations and compliance teams across India and the United States."
  },
  hero: {
    eyebrow: "OPEN PROJECT · LANDING PAGE",
    body: "Thirteen products. Seven services. One platform engineered for CFOs, controllers and operators who refuse to settle for spreadsheets."
  },
  stats: [
    { num: "13",   suffix: "",    label: "Products in production",   spark: [3,4,5,7,8,10,12,13] },
    { num: "30",   suffix: "+",   label: "Engineers, analysts, CAs", spark: [10,12,15,18,22,26,28,30] },
    { num: "47",   suffix: "",    label: "Enterprise clients shipped", spark: [4,8,15,22,30,38,44,47] },
    { num: "₹120", suffix: "Cr+", label: "Reconciled in 2025",       spark: [20,40,55,72,88,98,110,120] },
  ],
  products: [
    { id: "finlens",      name: "Kredo Finlens",      tag: "Financial Insights", desc: "Real-time financial reporting, MIS and consolidation across entities, books and currencies.", featured: true, icon: "chart" },
    { id: "assetlens",    name: "Kredo Assetlens",    tag: "Fixed Asset Mgmt",   desc: "Lifecycle tracking, IT depreciation schedules and physical verification with QR audit trails.",          icon: "box" },
    { id: "expenses",     name: "Kredo Expenses",     tag: "Expense Mgmt",       desc: "Card-to-claim, receipts on capture, policy-aware approvals — closes books in days, not weeks.",        icon: "wallet" },
    { id: "komply",       name: "Kredo Komply",       tag: "Compliance",         desc: "GST, TDS, ROC and labour-law calendars with auto-filings and audit-ready evidence vaults.",            icon: "shield" },
    { id: "verifylive",   name: "Verifylive.in",      tag: "Verification",       desc: "Tamper-evident physical verification — assets, inventory and field — with live geo-stamped proof.",   icon: "loc" },
    { id: "pactifi",      name: "Pactifi.ai",         tag: "Contract AI",        desc: "Read, redline and risk-score contracts. Pulls clauses, dates and obligations into your workflow.",      icon: "doc" },
    { id: "procurelens",  name: "Kredo Procurelens",  tag: "Procurement",        desc: "Indent → PO → GRN → invoice, with three-way match and budget guardrails for every approver.",          icon: "cart" },
    { id: "csrlens",      name: "Kredo CSRlens",      tag: "CSR & ESG",          desc: "CSR project tracking, milestone disbursal, impact metrics and the Form-1 your auditor wants.",        icon: "leaf" },
    { id: "qrlens",       name: "Kredo QRLens",       tag: "QR Audit Trails",    desc: "Generate, scan, and reconcile QR-tagged assets and inventory with mobile-first field flows.",        icon: "qr" },
    { id: "treasurylens", name: "Kredo Treasurylens", tag: "Treasury",           desc: "Bank balances, FX exposure, sweeps and forecasts — one screen across every account you operate.",     icon: "vault" },
    { id: "capitallens",  name: "Kredo Capitallens",  tag: "Capital Mgmt",       desc: "Cap-table, ESOP pools, fund-flow scenarios and modeling — wired to your FP&A in real time.",         icon: "pie" },
    { id: "recolens",     name: "Kredo Recolens",     tag: "Reconciliation",     desc: "Bank, vendor, intercompany — auto-match, exception queue, and audit log out of the box.",            icon: "swap" },
    { id: "hrlens",       name: "Kredo HRlens",       tag: "Human Capital",      desc: "Onboarding, payroll integrations, attendance and a manager dashboard your people actually use.",     icon: "users" },
  ],
  services: [
    { id: "erp",    name: "ERP Implementation",          duration: "12–24 weeks", desc: "Zoho, Oracle NetSuite, SAP B1 — scoped, configured, migrated, and adopted by your team.", featured: true },
    { id: "vcto",   name: "Virtual CTO Office",          duration: "Ongoing",     desc: "Fractional CTO leadership — architecture reviews, vendor decisions, hiring rubrics, and roadmaps." },
    { id: "books",  name: "Overseas Bookkeeping",        duration: "Monthly",     desc: "US-GAAP and IND-AS books closed monthly by qualified CAs — clean ledgers, audit-ready files." },
    { id: "verify", name: "Physical Verification",       duration: "Per audit",   desc: "Field teams in 18 cities perform asset, inventory, and stock counts with live evidence capture." },
    { id: "mis",    name: "MIS Reporting",               duration: "Weekly",      desc: "Custom dashboards and board packs — KPIs, variance commentary, segment P&Ls, executive memos." },
    { id: "custom", name: "Custom Software Development", duration: "8–32 weeks",  desc: "Web, mobile and integration work — staffed by senior engineers, shipped in two-week increments." },
    { id: "ai",     name: "Automation & Custom AI",      duration: "4–16 weeks",  desc: "Workflow agents, document AI, and LLM features built on top of your existing stack and policies." },
  ],
  founders: [
    { name: "Gururaja Bhatt", role: "Founder · CEO",    tag: "Strategy",    initials: "GB" },
    { name: "Jidesh Kumar",   role: "Co-founder · CTO", tag: "Engineering", initials: "JK" },
    { name: "Indira Hegde",   role: "Co-founder · Ops", tag: "Operations",  initials: "IH" },
    { name: "Rakshak C R",    role: "Co-founder · CFO", tag: "Finance",     initials: "RR" },
  ],
  clients: [
    "PUMA","ARVIND","MANIPAL","LIVSPACE","HALODOC","KAPIVA",
    "MICROCHIP","CAPITALMIND","ENTRUST","REDBANGLE","INOPTRA","BRISKWIN"
  ],
  testimonials: [
    { quote: "We moved from quarterly close to a 3-day close. Finlens turned our finance ops from defense to offense.", name: "Manufacturing CFO", role: "Listed entity · India" },
    { quote: "The Kredo team replaced six spreadsheets, two consultants, and one very tired controller — in eleven weeks.", name: "Finance Director", role: "Logistics · United States" },
    { quote: "Their virtual CTO office let us scale engineering without scaling overhead. Best partnership we have made.", name: "FinTech Founder", role: "Series-B · Bengaluru" },
    { quote: "Verifylive caught a ₹4.2Cr asset discrepancy on day three. The implementation paid for itself in a week.", name: "Head of Audit", role: "Manufacturing · India" },
  ],
  offices: [
    { city: "BENGALURU",      addr: "#4/1 Deviah Court · 22nd Cross · 8th Main · Jayanagar 3rd Block · 560011", x: 70.5, y: 65, country: "IN" },
    { city: "MONROEVILLE, PA", addr: "250 Cedar Ridge Dr · Apt 911 · 15146", x: 26, y: 39, country: "US" },
  ]
};


/* ============== 2. DOM helper ==============
   h(tag, attrs?, ...children) — like React.createElement but vanilla.
   - SVG tags are auto-namespaced.
   - className -> class, style obj, on<Event> handlers, ref callback.
   - Children flatten; null/false/undefined skipped; strings -> textNode.
*/
const SVG_TAGS = new Set([
  'svg','path','rect','circle','line','polyline','polygon','g','defs',
  'linearGradient','radialGradient','stop','filter','feTurbulence',
  'feColorMatrix','text','use','ellipse','clipPath','mask'
]);
const SVG_KEEP_CAMEL = new Set([
  'viewBox','preserveAspectRatio','baseFrequency','numOctaves','stitchTiles',
  'gradientUnits','gradientTransform','patternUnits','clipPathUnits'
]);
const SVG_NS = 'http://www.w3.org/2000/svg';

function camelToKebab(s) { return s.replace(/([A-Z])/g, '-$1').toLowerCase(); }

function h(tag, attrs, ...children) {
  const isSvg = SVG_TAGS.has(tag);
  const el = isSvg
    ? document.createElementNS(SVG_NS, tag)
    : document.createElement(tag);

  // If `attrs` is actually a child (DOM node, string, array), treat it as one.
  // This makes h('defs', h('foo')) work the same as h('defs', null, h('foo')).
  if (attrs instanceof Node || typeof attrs === 'string' ||
      Array.isArray(attrs) || typeof attrs === 'number') {
    children.unshift(attrs);
    attrs = null;
  }

  if (attrs) {
    for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;

      if (k === 'className') {
        if (isSvg) el.setAttribute('class', v);
        else el.className = v;
      } else if (k === 'style' && typeof v === 'object') {
        Object.assign(el.style, v);
      } else if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (k === 'ref' && typeof v === 'function') {
        v(el);
      } else if (k === 'innerHTML') {
        el.innerHTML = v;
      } else if (v === true) {
        el.setAttribute(k, '');
      } else {
        const name = isSvg && !SVG_KEEP_CAMEL.has(k) ? camelToKebab(k) : k;
        el.setAttribute(name, v);
      }
    }
  }
  appendChildren(el, children);
  return el;
}

function appendChildren(parent, kids) {
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false || c === true) continue;
    if (c instanceof Node) parent.appendChild(c);
    else parent.appendChild(document.createTextNode(String(c)));
  }
}

// Smooth-scroll helper used by buttons and footer links.
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ============== 3. ICONS ============== */
function Icon(name, size = 18) {
  const sw = 1.6;
  const stroke = 'currentColor';

  // Each entry returns an array of children for the <svg>.
  const PATHS = {
    chart: () => [
      h('path', { d:'M3 17 L9 11 L13 14 L21 5', stroke, strokeWidth:sw, fill:'none', strokeLinecap:'round' }),
      h('path', { d:'M14 5 L21 5 L21 12',          stroke, strokeWidth:sw, fill:'none', strokeLinecap:'round' }),
    ],
    box: () => [
      h('path', { d:'M3 7 L12 3 L21 7 L21 17 L12 21 L3 17 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
      h('path', { d:'M3 7 L12 11 L21 7 M12 11 L12 21',          stroke, strokeWidth:sw, fill:'none' }),
    ],
    wallet: () => [
      h('rect', { x:3, y:6, width:18, height:13, rx:2.5, stroke, strokeWidth:sw, fill:'none' }),
      h('path', { d:'M16 12.5 L18 12.5', stroke, strokeWidth:sw }),
      h('path', { d:'M3 9 L17 9 L17 6',  stroke, strokeWidth:sw, fill:'none' }),
    ],
    shield: () => [
      h('path', { d:'M12 3 L20 6 L20 12 C20 16 16 19 12 21 C8 19 4 16 4 12 L4 6 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
      h('path', { d:'M9 12 L11 14 L15 10', stroke, strokeWidth:sw, fill:'none', strokeLinecap:'round' }),
    ],
    loc: () => [
      h('path',   { d:'M12 21 C12 21 19 14 19 9 A7 7 0 1 0 5 9 C5 14 12 21 12 21 Z', stroke, strokeWidth:sw, fill:'none' }),
      h('circle', { cx:12, cy:9, r:2.5, stroke, strokeWidth:sw, fill:'none' }),
    ],
    doc: () => [
      h('path', { d:'M6 3 L14 3 L19 8 L19 21 L6 21 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
      h('path', { d:'M14 3 L14 8 L19 8',                stroke, strokeWidth:sw, fill:'none' }),
      h('path', { d:'M9 13 L16 13 M9 16 L14 16',        stroke, strokeWidth:sw }),
    ],
    cart: () => [
      h('circle', { cx:9,  cy:20, r:1.4, stroke, strokeWidth:sw, fill:'none' }),
      h('circle', { cx:17, cy:20, r:1.4, stroke, strokeWidth:sw, fill:'none' }),
      h('path',   { d:'M3 4 L6 4 L8.5 16 L18 16 L20 8 L7 8', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
    ],
    leaf: () => [
      h('path', { d:'M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
      h('path', { d:'M5 19 L13 11', stroke, strokeWidth:sw }),
    ],
    qr: () => [
      h('rect', { x:3,  y:3,  width:7, height:7, stroke, strokeWidth:sw, fill:'none' }),
      h('rect', { x:14, y:3,  width:7, height:7, stroke, strokeWidth:sw, fill:'none' }),
      h('rect', { x:3,  y:14, width:7, height:7, stroke, strokeWidth:sw, fill:'none' }),
      h('path', { d:'M14 14 L14 16 M16 14 L16 18 M18 16 L21 16 M14 19 L17 19 M19 19 L19 21', stroke, strokeWidth:sw }),
    ],
    vault: () => [
      h('rect',   { x:3, y:5, width:18, height:14, rx:2, stroke, strokeWidth:sw, fill:'none' }),
      h('circle', { cx:14, cy:12, r:3, stroke, strokeWidth:sw, fill:'none' }),
      h('path',   { d:'M14 9 L14 7 M14 17 L14 15 M11 12 L9 12 M17 12 L19 12', stroke, strokeWidth:sw }),
    ],
    pie: () => [
      h('path', { d:'M12 3 A9 9 0 1 0 21 12 L12 12 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
      h('path', { d:'M12 3 L12 12 L21 12',              stroke, strokeWidth:sw, fill:'none' }),
    ],
    swap: () => [
      h('path', { d:'M4 8 L18 8 L15 5 M20 16 L6 16 L9 19', stroke, strokeWidth:sw, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
    ],
    users: () => [
      h('circle', { cx:9,  cy:9, r:3.2, stroke, strokeWidth:sw, fill:'none' }),
      h('path',   { d:'M3 19 C3 15 6 13 9 13 C12 13 15 15 15 19', stroke, strokeWidth:sw, fill:'none' }),
      h('circle', { cx:17, cy:8, r:2.4, stroke, strokeWidth:sw, fill:'none' }),
      h('path',   { d:'M14 19 C14 16 16 14 17 14 C19 14 21 16 21 19', stroke, strokeWidth:sw, fill:'none' }),
    ],
    arrowR: () => [ h('path', { d:'M5 12 L19 12 M13 6 L19 12 L13 18', stroke, strokeWidth:2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }) ],
    arrowU: () => [ h('path', { d:'M12 19 L12 5 M6 11 L12 5 L18 11',  stroke, strokeWidth:2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }) ],
    play:   () => [ h('path', { d:'M7 4 L19 12 L7 20 Z', fill:stroke }) ],
    close:  () => [ h('path', { d:'M5 5 L19 19 M19 5 L5 19', stroke, strokeWidth:2, strokeLinecap:'round' }) ],
    check:  () => [ h('path', { d:'M5 12 L10 17 L19 7', stroke, strokeWidth:2.2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }) ],
    spark:  () => [ h('path', { d:'M12 3 L13 10 L20 12 L13 14 L12 21 L11 14 L4 12 L11 10 Z', fill:stroke }) ],
    iso: () => [
      h('circle', { cx:12, cy:12, r:9, stroke, strokeWidth:sw, fill:'none' }),
      h('path',   { d:'M8 12 L11 15 L16 9', stroke, strokeWidth:sw, fill:'none', strokeLinecap:'round' }),
    ],
    pin: () => [
      h('path',   { d:'M12 21 C12 21 18 14 18 9 A6 6 0 1 0 6 9 C6 14 12 21 12 21 Z', stroke, strokeWidth:sw, fill:'none' }),
      h('circle', { cx:12, cy:9, r:2, fill:stroke }),
    ],
    mail: () => [
      h('rect', { x:3, y:5, width:18, height:14, rx:2, stroke, strokeWidth:sw, fill:'none' }),
      h('path', { d:'M3 7 L12 13 L21 7', stroke, strokeWidth:sw, fill:'none' }),
    ],
    phone: () => [
      h('path', { d:'M5 4 L9 4 L11 9 L8.5 11 C9.5 13.5 10.5 14.5 13 15.5 L15 13 L20 15 L20 19 C13 19 5 11 5 4 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
    ],
    star: () => [
      h('path', { d:'M12 3 L14.5 9 L21 9.5 L16 13.5 L18 20 L12 16.5 L6 20 L8 13.5 L3 9.5 L9.5 9 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
    ],
    bolt: () => [
      h('path', { d:'M13 3 L5 13 L11 13 L10 21 L19 11 L13 11 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
    ],
    layers: () => [
      h('path', { d:'M12 3 L21 8 L12 13 L3 8 Z', stroke, strokeWidth:sw, fill:'none', strokeLinejoin:'round' }),
      h('path', { d:'M3 12 L12 17 L21 12 M3 16 L12 21 L21 16', stroke, strokeWidth:sw, fill:'none' }),
    ],
    cog: () => [
      h('circle', { cx:12, cy:12, r:3, stroke, strokeWidth:sw, fill:'none' }),
      h('path',   { d:'M12 3 L12 5 M12 19 L12 21 M3 12 L5 12 M19 12 L21 12 M5.6 5.6 L7 7 M17 17 L18.4 18.4 M5.6 18.4 L7 17 M17 7 L18.4 5.6', stroke, strokeWidth:sw, strokeLinecap:'round' }),
    ],
  };

  const factory = PATHS[name];
  return h('svg',
    { width:size, height:size, viewBox:'0 0 24 24', fill:'none' },
    factory ? factory() : []
  );
}


/* ============== 4. SECTION COMPONENTS ============== */

// ---- Logo ----
function Logo() {
  return h('div', { className:'logo', onClick:() => window.scrollTo({ top:0, behavior:'smooth' }) },
    h('div', { className:'logo-mark' },
      h('img', { src:'logo.jpg', alt:'Kredo', style:{ width:'22px', height:'22px', objectFit:'contain' } })
    ),
    h('div', { className:'logo-text' },
      h('div', { className:'logo-brand' }, D.brand.name),
      h('div', { className:'logo-tag' }, D.brand.tag)
    )
  );
}

// ---- Nav ----
// Returns an object { node, setActive } so the app can update the active link.
function Nav() {
  const items = ['Home','Products','Services','About','Clients','Contact'];
  const buttons = {};

  const node = h('header', { className:'nav' },
    Logo(),
    h('nav', { className:'nav-links' },
      items.map(label => {
        const id = label.toLowerCase();
        const btn = h('button', {
          className: 'nav-link',
          onClick: () => scrollToId(id)
        }, label);
        buttons[id] = btn;
        return btn;
      })
    ),
    h('div', { className:'nav-cta' },
      h('span', { className:'nav-pill' },
        h('span', { className:'nav-pill-dot' }),
        'ISO 27001 · ZOHO PARTNER'
      ),
      h('button', { className:'nav-btn', onClick:() => scrollToId('contact') },
        'Book a Demo',
        h('span', { className:'nav-btn-arrow' }, Icon('arrowR', 12))
      )
    )
  );

  function setActive(id) {
    for (const k in buttons) {
      buttons[k].classList.toggle('active', k === id);
    }
  }
  setActive('home');
  return { node, setActive };
}

// ---- Hero ----
function Hero() {
  // ticker block (rendered twice for marquee continuity)
  function tickerBlock() {
    return [
      h('span', { className:'ticker-item' }, 'FINLENS', h('span', { className:'delta' }, '+38%')),
      h('span', { className:'ticker-item star' }, '★'),
      h('span', { className:'ticker-item' }, 'RECOLENS', h('span', { className:'delta' }, '+12.4%')),
      h('span', { className:'ticker-item star' }, '★'),
      h('span', { className:'ticker-item' }, 'EXPENSES', h('span', { className:'delta down' }, '−3.1%')),
      h('span', { className:'ticker-item star' }, '★'),
      h('span', { className:'ticker-item' }, 'TREASURY', h('span', { className:'delta' }, '+8.7%')),
      h('span', { className:'ticker-item star' }, '★'),
      h('span', { className:'ticker-item' }, 'VERIFYLIVE — 1,402 ASSETS SCANNED TODAY'),
      h('span', { className:'ticker-item star' }, '★'),
      h('span', { className:'ticker-item' }, 'PACTIFI — 248 CONTRACTS REVIEWED'),
      h('span', { className:'ticker-item star' }, '★'),
      h('span', { className:'ticker-item' }, 'BLR · DAL · 19:42 IST'),
      h('span', { className:'ticker-item star' }, '★'),
    ];
  }

  return h('section', { id:'home', className:'hero', 'data-screen-label':'01 Home' },
    h('div', { className:'hero-inner' },
      h('span', { className:'eyebrow' }, h('span', { className:'eyebrow-dot' }), D.hero.eyebrow),
      h('h1', { className:'hero-title' },
        'FINANCE,', h('br'),
        'RE—', h('span', { className:'accent' }, 'imagined.')
      ),
      h('p', { className:'hero-body' }, D.hero.body),
      h('div', { className:'hero-row' },
        h('button', { className:'cta-primary', onClick:() => scrollToId('products') },
          h('span', { className:'cta-arrow' }, Icon('arrowR', 14)),
          'Explore the Platform'
        ),
        h('button', { className:'cta-ghost', onClick:() => scrollToId('demo') },
          Icon('play', 11), ' See live demo ',
          h('span', { style:{ opacity:0.5, fontFamily:'JetBrains Mono, monospace', fontSize:'11px', paddingLeft:'8px', borderLeft:'1px solid var(--line)' } }, '02:14')
        )
      ),
      h('div', { className:'hero-meta' },
        h('div', { className:'hero-meta-item' }, Icon('check', 14), ' 30+ Specialists'),
        h('div', { className:'hero-meta-item' }, Icon('check', 14), ' India · United States'),
        h('div', { className:'hero-meta-item' }, Icon('check', 14), ' ISO 27001 Certified'),
        h('div', { className:'hero-meta-item' }, Icon('check', 14), ' Zoho Premium Partner')
      )
    ),
    h('div', { className:'hero-ticker' },
      h('div', { className:'ticker-track' }, tickerBlock(), tickerBlock())
    )
  );
}

// ---- Stats (with animated counters) ----
function Spark(data) {
  const max = Math.max(...data);
  const w = 200, h2 = 30;
  const pts = data
    .map((v, i) => `${(i/(data.length-1))*w},${h2 - (v/max)*h2*0.9 - 1}`)
    .join(' ');

  return h('svg', { className:'stat-spark', viewBox:`0 0 ${w} ${h2}`, preserveAspectRatio:'none' },
    h('defs',
      h('linearGradient', { id:'sg', x1:'0', y1:'0', x2:'0', y2:'1' },
        h('stop', { offset:'0%',   stopColor:'#6cf2c8', stopOpacity:'0.5' }),
        h('stop', { offset:'100%', stopColor:'#6cf2c8', stopOpacity:'0' })
      )
    ),
    h('polyline', { points:`0,${h2} ${pts} ${w},${h2}`, fill:'url(#sg)' }),
    h('polyline', { points:pts, stroke:'#6cf2c8', strokeWidth:'1.5', fill:'none' })
  );
}

function StatCard(s) {
  const target = parseFloat(s.num.replace(/[^\d.]/g, '')) || 0;
  const isRupee = s.num.startsWith('₹');
  const numEl = h('span');
  numEl.textContent = isRupee ? '₹0' : '0';

  // animate on mount
  const ms = 1400;
  let start;
  function tick(t) {
    if (!start) start = t;
    const k = Math.min(1, (t - start) / ms);
    const v = target * (1 - Math.pow(1 - k, 3));
    numEl.textContent = isRupee ? `₹${Math.round(v)}` : `${Math.round(v)}`;
    if (k < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return h('div', { className:'stat' },
    h('div', { className:'stat-num' }, numEl, h('em', null, s.suffix)),
    h('div', { className:'stat-label' }, s.label),
    Spark(s.spark)
  );
}

function Stats() {
  return h('section', {
    id:'stats', className:'page-section',
    style:{ paddingTop:'60px', paddingBottom:'60px', minHeight:'auto' },
    'data-screen-label':'04 Stats'
  },
    h('div', { className:'stats' }, D.stats.map(s => StatCard(s)))
  );
}

// ---- Products ----
function Products(openDetail) {
  return h('section', { id:'products', className:'page-section', 'data-screen-label':'02 Products' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '02 / PRODUCTS'),
        h('h2',   { className:'section-title' }, 'Thirteen lenses, ', h('em', null, 'one stack'), '.')
      ),
      h('div', { className:'section-head-r' },
        'Each Kredo product is purpose-built for one job — and joined to the rest by a shared data layer. Roll any one out in weeks, the platform in months.'
      )
    ),
    h('div', { className:'products-wrap' },
      h('div', { className:'products-grid' },
        D.products.map(p =>
          h('div', {
            className: 'product-card ' + (p.featured ? 'featured' : ''),
            onClick: () => p.featured && openDetail('finlens')
          },
            h('div', { className:'product-icon' }, Icon(p.icon, 20)),
            h('div', null,
              h('div', { className:'product-tag' }, p.tag),
              h('div', { className:'product-name' }, p.name)
            ),
            h('div', { className:'product-desc' }, p.desc),
            h('div', { className:'product-cta' },
              p.featured ? 'Open detailed page' : 'Learn more',
              Icon('arrowR', 12)
            )
          )
        )
      )
    )
  );
}

// ---- Services ----
function Services(openDetail) {
  return h('section', { id:'services', className:'page-section', 'data-screen-label':'03 Services' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '03 / SERVICES'),
        h('h2',   { className:'section-title' }, 'Hands-on ', h('em', null, 'partners'), ', not slide decks.')
      ),
      h('div', { className:'section-head-r' },
        'Implementation, transformation, and ongoing operations — staffed by chartered accountants, senior engineers and ex-CFOs who have lived the work.'
      )
    ),
    h('div', { className:'services-wrap' },
      D.services.map((s, i) =>
        h('div', {
          className: 'service-row ' + (s.featured ? 'featured' : ''),
          onClick: () => s.featured && openDetail('erp')
        },
          h('div', { className:'service-num' }, '0' + (i + 1)),
          h('div', { className:'service-name' }, s.name),
          h('div', { className:'service-desc' }, s.desc),
          h('div', { className:'service-meta' }, s.duration),
          h('div', { className:'service-arrow' }, Icon('arrowR', 14))
        )
      )
    )
  );
}

// ---- About + founders ----
function FounderArt(initials) {
  const seed = initials.charCodeAt(0) + initials.charCodeAt(1);
  const palettes = [
    ['#0e1420','#1c3548','#6cf2c8'],
    ['#10141c','#2c1a40','#4aa3ff'],
    ['#14201c','#1f3a30','#f5c46c'],
    ['#1a1218','#3a1c2e','#ff7ab8'],
  ];
  const p = palettes[seed % palettes.length];

  return h('svg', { viewBox:'0 0 200 250', preserveAspectRatio:'xMidYMid slice' },
    h('defs',
      h('linearGradient', { id:`fg${initials}`, x1:'0', y1:'0', x2:'1', y2:'1' },
        h('stop', { offset:'0%',   stopColor:p[0] }),
        h('stop', { offset:'100%', stopColor:p[1] })
      ),
      h('radialGradient', { id:`fg2${initials}`, cx:'0.5', cy:'0.4', r:'0.6' },
        h('stop', { offset:'0%',   stopColor:p[2], stopOpacity:'0.18' }),
        h('stop', { offset:'100%', stopColor:p[2], stopOpacity:'0' })
      )
    ),
    h('rect',   { width:200, height:250, fill:`url(#fg${initials})` }),
    h('rect',   { width:200, height:250, fill:`url(#fg2${initials})` }),
    h('circle', { cx:100, cy:95, r:36, fill:'none', stroke:p[2], strokeWidth:'1', opacity:'0.6' }),
    h('circle', { cx:100, cy:95, r:22, fill:p[2], opacity:'0.12' }),
    h('path',   { d:'M50 230 C50 180 75 155 100 155 C125 155 150 180 150 230', fill:'none', stroke:p[2], strokeWidth:'1', opacity:'0.5' }),
    h('text',   { x:100, y:105, textAnchor:'middle', fill:p[2], opacity:'0.85', fontFamily:'Anton, sans-serif', fontSize:'42', letterSpacing:'2' }, initials)
  );
}

function About() {
  const fact = (l, r) =>
    h('div', { className:'about-fact' },
      h('span', { className:'about-fact-l' }, l),
      h('span', { className:'about-fact-r' }, r)
    );

  return h('section', { id:'about', className:'page-section', 'data-screen-label':'05 About' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '05 / ABOUT'),
        h('h2',   { className:'section-title' }, 'Built by ', h('em', null, 'operators'), ', for operators.')
      ),
      h('div', { className:'section-head-r' },
        'Kredo Analytics was founded in Bengaluru in 2018 by a group of chartered accountants and engineers tired of explaining their finance stack twice a quarter.'
      )
    ),
    h('div', { className:'about-wrap' },
      h('div', { className:'about-grid' },
        h('div', { className:'about-l' },
          h('p', null, 'We started with one product — a financial reporting tool we needed for our own clients. Today, Kredo runs thirteen products across reporting, compliance, asset, treasury and HR; serves enterprises in India, the US, the UK and the Gulf; and counts among its team some of the most opinionated finance and engineering minds in the country.'),
          h('p', null, 'Our charter is unchanged: replace the spreadsheet, replace the consultant, and give finance teams software that respects their time. We build, we implement, we run — and when something is broken at 2 a.m. on quarter-end, we are awake.')
        ),
        h('div', { className:'about-r' },
          fact('Founded',        '2018 · Bengaluru'),
          fact('Entities',       'India · United States'),
          fact('Team',           '30+ specialists'),
          fact('Products',       '13 in production'),
          fact('Certifications', 'ISO 27001 · Zoho Partner'),
          fact('Industries',     'SaaS · Mfg · Logistics · NBFC')
        )
      ),

      h('div', { className:'section-head', style:{ marginBottom:'40px' } },
        h('div', { className:'section-head-l' },
          h('span', { className:'section-num' }, '— FOUNDING TEAM'),
          h('h3', { className:'section-title', style:{ fontSize:'clamp(32px, 4vw, 64px)' } },
            'Four founders. ', h('em', null, 'One charter.')
          )
        )
      ),
      h('div', { className:'founders' },
        D.founders.map(f =>
          h('div', { className:'founder' },
            h('div', { className:'founder-photo' },
              FounderArt(f.initials),
              h('span', { className:'founder-tag' }, f.tag.toUpperCase())
            ),
            h('div', null,
              h('div', { className:'founder-name' }, f.name),
              h('div', { className:'founder-role' }, f.role)
            )
          )
        )
      )
    )
  );
}

// ---- Clients (varied logo styles + marquee) ----
function ClientLogo(name, idx) {
  const variants = [
    () => h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
      h('svg', { width:16, height:16, viewBox:'0 0 24 24' },
        h('circle', { cx:12, cy:12, r:9, stroke:'currentColor', strokeWidth:2, fill:'none' }),
        h('circle', { cx:12, cy:12, r:3, fill:'currentColor' })
      ),
      h('span', null, name)
    ),
    () => h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
      h('svg', { width:16, height:16, viewBox:'0 0 24 24' },
        h('path', { d:'M3 21 L12 3 L21 21 Z', stroke:'currentColor', strokeWidth:2, fill:'none' })
      ),
      h('span', null, name)
    ),
    () => h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
      h('svg', { width:16, height:16, viewBox:'0 0 24 24' },
        h('rect', { x:4, y:4, width:16, height:16, stroke:'currentColor', strokeWidth:2, fill:'none' }),
        h('path', { d:'M4 4 L20 20', stroke:'currentColor', strokeWidth:2 })
      ),
      h('span', null, name)
    ),
    () => h('span', { style:{ fontFamily:'Anton, sans-serif', fontSize:'24px', letterSpacing:'0.06em' } }, name),
    () => h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' } },
      h('svg', { width:16, height:16, viewBox:'0 0 24 24' },
        h('path', { d:'M4 12 L10 6 L10 18 Z M14 12 L20 6 L20 18 Z', fill:'currentColor' })
      ),
      h('span', null, name)
    ),
    () => h('span', { style:{ fontStyle:'italic', fontFamily:'Instrument Serif, serif', fontSize:'26px' } }, name),
  ];
  return variants[idx % variants.length]();
}

function Clients() {
  // marquee block (rendered 3x)
  function marqueeBlock() {
    const items = D.clients.map(c => h('span', null, c));
    items.push(h('span', { style:{ color:'#6cf2c8' } }, '★'));
    return items;
  }

  return h('section', { id:'clients', className:'page-section', 'data-screen-label':'06 Clients' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '06 / CLIENTS'),
        h('h2',   { className:'section-title' }, 'Trusted by ', h('em', null, 'forty-seven'), ' teams.')
      ),
      h('div', { className:'section-head-r' },
        'From Series-A startups to listed manufacturers — Kredo runs in finance closets and CFO war rooms across two continents.'
      )
    ),
    h('div', { className:'clients-wrap' },
      h('div', { className:'client-grid' },
        D.clients.map((c, i) => h('div', { className:'client' }, ClientLogo(c, i)))
      ),
      h('div', { className:'client-marquee' },
        h('div', { className:'client-marquee-track' },
          marqueeBlock(), marqueeBlock(), marqueeBlock()
        )
      )
    )
  );
}

// ---- Testimonials (carousel) ----
function Testimonials() {
  let i = 0;
  const total = D.testimonials.length;
  let trackEl;

  function go(newIdx) {
    i = Math.max(0, Math.min(total - 1, newIdx));
    if (trackEl) {
      trackEl.scrollTo({
        left: i * (trackEl.offsetWidth / 2 + 12),
        behavior: 'smooth'
      });
    }
  }

  return h('section', { id:'testimonials', className:'page-section', 'data-screen-label':'07 Testimonials' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '07 / VOICES'),
        h('h2',   { className:'section-title' }, 'What ', h('em', null, 'operators'), ' say.')
      )
    ),
    h('div', { className:'testimonials-wrap' },
      h('div', { className:'testimonial-track', ref:(el) => trackEl = el },
        D.testimonials.map(t =>
          h('div', { className:'testimonial' },
            h('div', { className:'testimonial-quote' }, t.quote),
            h('div', { className:'testimonial-foot' },
              h('div', { className:'testimonial-avatar' },
                t.name.split(' ').map(p => p[0]).slice(0, 2).join('')
              ),
              h('div', null,
                h('div', { className:'testimonial-name' }, t.name),
                h('div', { className:'testimonial-role' }, t.role)
              )
            )
          )
        )
      ),
      h('div', { className:'testimonial-controls' },
        h('button', { className:'tcontrol', onClick:() => go(i - 1) },
          h('svg', { width:14, height:14, viewBox:'0 0 24 24' },
            h('path', { d:'M14 6 L8 12 L14 18', stroke:'currentColor', strokeWidth:2, fill:'none' })
          )
        ),
        h('button', { className:'tcontrol', onClick:() => go(i + 1) },
          h('svg', { width:14, height:14, viewBox:'0 0 24 24' },
            h('path', { d:'M10 6 L16 12 L10 18', stroke:'currentColor', strokeWidth:2, fill:'none' })
          )
        )
      )
    )
  );
}

// ---- World Map (dot continents + flight arc + office pins) ----
function WorldMap() {
  // generate stippled continent dots once
  const continents = [
    { x: 8,  y: 25, w: 22, h: 22, density: 0.35 }, // North America
    { x: 22, y: 50, w: 10, h: 22, density: 0.40 }, // South America
    { x: 44, y: 22, w: 10, h: 12, density: 0.45 }, // Europe
    { x: 46, y: 38, w: 13, h: 24, density: 0.50 }, // Africa
    { x: 56, y: 18, w: 30, h: 28, density: 0.40 }, // Asia
    { x: 78, y: 60, w: 12, h: 8,  density: 0.40 }, // Oceania
  ];
  const dots = [];
  for (const c of continents) {
    const cols = Math.floor(c.w * 1.2);
    const rows = Math.floor(c.h * 1.0);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() < c.density) {
          const px = c.x + (i / cols) * c.w + (Math.random() - 0.5) * 0.6;
          const py = c.y + (j / rows) * c.h + (Math.random() - 0.5) * 0.6;
          dots.push({ x: px, y: py });
        }
      }
    }
  }

  return h('svg', { viewBox:'0 0 100 75', preserveAspectRatio:'none', style:{ width:'100%', height:'100%' } },
    h('defs',
      h('radialGradient', { id:'mapglow', cx:'0.5', cy:'0.5', r:'0.7' },
        h('stop', { offset:'0%',   stopColor:'#0a1825', stopOpacity:'1' }),
        h('stop', { offset:'100%', stopColor:'#040810', stopOpacity:'1' })
      )
    ),
    h('rect', { x:0, y:0, width:100, height:75, fill:'url(#mapglow)' }),
    dots.map(d => h('circle', { cx:d.x, cy:d.y, r:'0.28', fill:'rgba(108,242,200,0.45)' })),
    h('path', { d:'M 70.5 65 Q 50 5 22.5 47', stroke:'#6cf2c8', strokeWidth:'0.2', fill:'none', strokeDasharray:'0.6 0.6', opacity:'0.7' })
  );
}

function MapSection() {
  return h('section', { id:'offices', className:'page-section', 'data-screen-label':'08 Offices' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '08 / OFFICES'),
        h('h2',   { className:'section-title' }, 'Two cities, ', h('em', null, 'one team'), '.')
      ),
      h('div', { className:'section-head-r' },
        'Bengaluru is home. Dallas is the bridge. Engineers, accountants and ops staff working overlapping shifts so quarter-close never sleeps.'
      )
    ),
    h('div', { className:'map-wrap' },
      h('div', { className:'map-canvas' },
        WorldMap(),
        D.offices.map(o =>
          h('div', { className:'map-pin', style:{ left:`${o.x}%`, top:`${o.y}%` } },
            h('div', { className:'map-pin-card' },
              h('div', { className:'city' }, o.city),
              h('div', { className:'addr' }, o.addr)
            ),
            h('div', { className:'map-pin-tail' }),
            h('div', { className:'map-pin-dot' })
          )
        )
      )
    )
  );
}

// ---- Demo Section (live KPI dashboard mock) ----
function DemoSection() {
  const tabs = ['Q1', 'Q2', 'Q3', 'Q4 2025'];
  const series = {
    'Q1':      [42, 48, 51, 55, 58, 62, 68, 72, 76, 78, 82, 85],
    'Q2':      [55, 58, 62, 68, 72, 75, 80, 84, 86, 88, 92, 96],
    'Q3':      [70, 74, 78, 80, 82, 86, 88, 92, 94, 98, 100, 105],
    'Q4 2025': [80, 84, 88, 92, 95, 98, 102, 108, 114, 118, 122, 128],
  };
  let activeTab = 'Q4 2025';

  let kpisEl, chartTitleEl, chartEl;
  const tabButtons = {};

  function renderKpis(data) {
    const k = (label, num, delta, down) =>
      h('div', { className:'demo-kpi' },
        h('span', { className:'demo-kpi-label' }, label),
        h('span', { className:'demo-kpi-num'   }, num),
        h('span', { className:'demo-kpi-delta' + (down ? ' down' : '') }, delta)
      );
    return h('div', { className:'demo-kpis' },
      k('Revenue',       `₹${(data[data.length-1] * 1.5).toFixed(1)}Cr`,    '▲ 18.4% QoQ'),
      k('Gross Margin',  `${(58 + (data[0]/4)).toFixed(1)}%`,                '▲ 2.1 pts'),
      k('Burn (mo)',     `₹${(28 - activeTab.length).toFixed(1)}L`,          '▼ 4.8%', true),
      k('Runway',        `${18 + tabs.indexOf(activeTab)*2} mo`,              '▲ extended')
    );
  }

  function renderChart(data) {
    const max = Math.max(...data);
    const w = 880, ht = 200, pad = 14;
    const stepX = (w - pad*2) / (data.length - 1);
    const pts = data.map((v, i) => [pad + i*stepX, ht - pad - (v/max)*(ht - pad*2)]);
    const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ' ' + p[1]).join(' ');
    const area = path + ` L ${pts[pts.length-1][0]} ${ht-pad} L ${pts[0][0]} ${ht-pad} Z`;
    const planPath = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ' ' + (p[1] + 10)).join(' ');
    const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

    return h('svg', { viewBox:`0 0 ${w} ${ht}`, style:{ width:'100%', height:'200px' }, preserveAspectRatio:'none' },
      h('defs',
        h('linearGradient', { id:'aArea', x1:'0', y1:'0', x2:'0', y2:'1' },
          h('stop', { offset:'0%',   stopColor:'#6cf2c8', stopOpacity:'0.4' }),
          h('stop', { offset:'100%', stopColor:'#6cf2c8', stopOpacity:'0' })
        )
      ),
      [0.25, 0.5, 0.75].map(y =>
        h('line', { x1:pad, x2:w-pad, y1:pad + y*(ht-pad*2), y2:pad + y*(ht-pad*2), stroke:'rgba(255,255,255,0.06)', strokeWidth:'1' })
      ),
      h('path', { d:area, fill:'url(#aArea)' }),
      h('path', { d:path, stroke:'#6cf2c8', strokeWidth:'2', fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
      h('path', { d:planPath, stroke:'#4aa3ff', strokeWidth:'1.4', strokeDasharray:'3 4', fill:'none', opacity:'0.6' }),
      pts.map(p => h('circle', { cx:p[0], cy:p[1], r:'2.5', fill:'#6cf2c8' })),
      data.map((_, i) =>
        h('text', { x:pad + i*stepX, y:ht - 1, textAnchor:'middle', fill:'rgba(255,255,255,0.35)', fontSize:'9', fontFamily:'JetBrains Mono, monospace' }, months[i])
      )
    );
  }

  function setTab(t) {
    activeTab = t;
    for (const k in tabButtons) tabButtons[k].classList.toggle('active', k === t);
    const data = series[t];
    // swap KPIs
    const newKpis = renderKpis(data);
    kpisEl.replaceWith(newKpis);
    kpisEl = newKpis;
    // swap chart title + chart svg
    chartTitleEl.textContent = `Revenue trend — ${t}`;
    const newChart = renderChart(data);
    chartEl.replaceWith(newChart);
    chartEl = newChart;
  }

  // initial nodes
  kpisEl  = renderKpis(series[activeTab]);
  chartEl = renderChart(series[activeTab]);
  chartTitleEl = h('span', { className:'demo-chart-title' }, `Revenue trend — ${activeTab}`);

  return h('section', { id:'demo', className:'page-section', 'data-screen-label':'09 Live Demo' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '09 / LIVE'),
        h('h2',   { className:'section-title' }, 'Finlens, ', h('em', null, 'in motion'), '.')
      ),
      h('div', { className:'section-head-r' },
        'A real view from Kredo Finlens — board KPIs, cash flow, and the quarterly trend, switched live below. Click the quarters.'
      )
    ),
    h('div', { className:'demo-wrap' },
      h('div', { className:'demo-bar' },
        h('div', { className:'demo-dots' }, h('span'), h('span'), h('span')),
        h('div', { className:'demo-url' }, '⏷ kredo.in ',
          h('span', { style:{ color:'#6cf2c8' } }, '·'),
          ' finlens · board view'
        ),
        h('div', { style:{ width:'60px' } })
      ),
      h('div', { className:'demo-grid' },
        h('aside', { className:'demo-side' },
          h('div', { className:'demo-side-head' }, 'FINLENS'),
          h('div', { className:'demo-nav active' }, Icon('chart',  14), ' Board View'),
          h('div', { className:'demo-nav' },        Icon('layers', 14), ' Consolidation'),
          h('div', { className:'demo-nav' },        Icon('vault',  14), ' Cash & Bank'),
          h('div', { className:'demo-nav' },        Icon('pie',    14), ' Segments'),
          h('div', { className:'demo-nav' },        Icon('doc',    14), ' Reports'),
          h('div', { className:'demo-side-head', style:{ marginTop:'20px' } }, 'WORKSPACES'),
          h('div', { className:'demo-nav' }, Icon('box', 14), ' Kredo Inc · US'),
          h('div', { className:'demo-nav' }, Icon('box', 14), ' Kredo Pvt · IN')
        ),
        h('div', { className:'demo-main' },
          h('div', { className:'demo-h' },
            h('div', { className:'demo-h-title' }, 'Board View'),
            h('div', { className:'demo-tabs' },
              tabs.map(t => {
                const btn = h('button', {
                  className: 'demo-tab' + (t === activeTab ? ' active' : ''),
                  onClick: () => setTab(t)
                }, t);
                tabButtons[t] = btn;
                return btn;
              })
            )
          ),
          kpisEl,
          h('div', { className:'demo-chart-wrap' },
            h('div', { className:'demo-chart-h' },
              chartTitleEl,
              h('span', { className:'demo-chart-legend' },
                h('span', null, h('span', { className:'legend-dot', style:{ background:'#6cf2c8' } }), 'Actual'),
                h('span', null, h('span', { className:'legend-dot', style:{ background:'#4aa3ff', opacity:'0.7' } }), 'Plan')
              )
            ),
            chartEl
          )
        )
      )
    )
  );
}

// ---- CTA / Contact form ----
function CTA() {
  let nameEl, emailEl, companyEl, needEl, submitBtn;

  function onSubmit(e) {
    e.preventDefault();
    submitBtn.replaceChildren(Icon('check', 14), document.createTextNode(" Sent — we'll be in touch"));
    setTimeout(() => {
      submitBtn.replaceChildren(document.createTextNode('Book a 30-min call '), Icon('arrowR', 14));
    }, 3500);
    nameEl.value = '';
    emailEl.value = '';
    companyEl.value = '';
    needEl.value = '';
  }

  submitBtn = h('button', { className:'cta-submit', type:'submit' },
    'Book a 30-min call ', Icon('arrowR', 14)
  );

  return h('section', { id:'contact', className:'page-section', 'data-screen-label':'10 Contact' },
    h('div', { className:'section-head' },
      h('div', { className:'section-head-l' },
        h('span', { className:'section-num' }, '10 / CONTACT'),
        h('h2',   { className:'section-title' }, "Let's run your ", h('em', null, 'next quarter'), '.')
      )
    ),
    h('div', { className:'cta-block' },
      h('div', null,
        h('div', { className:'cta-headline' },
          'Stop closing books in ', h('em', null, 'weeks'), '.', h('br'),
          'Start in ', h('em', null, 'days'), '.'
        ),
        h('div', { style:{ display:'flex', gap:'32px', marginTop:'32px', flexWrap:'wrap', color:'rgba(255,255,255,0.7)' } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } }, Icon('mail',  16), ' info@kredo.in'),
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } }, Icon('phone', 16), ' +91 95382 70572'),
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } }, Icon('phone', 16), ' +91 98454 08275'),
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } }, Icon('pin',   16), ' Bengaluru · Monroeville, PA')
        )
      ),
      h('form', { className:'cta-form', onSubmit:onSubmit },
        nameEl    = h('input',    { className:'cta-input', placeholder:'Your name',                       required:true }),
        emailEl   = h('input',    { className:'cta-input', placeholder:'Work email',         type:'email', required:true }),
        companyEl = h('input',    { className:'cta-input', placeholder:'Company' }),
        needEl    = h('textarea', { className:'cta-input', placeholder:'What problem are you solving?', rows:'3' }),
        submitBtn
      )
    )
  );
}

// ---- Footer ----
function Footer() {
  return h('footer', { className:'foot' },
    h('div', { className:'foot-grid' },
      h('div', { className:'foot-brand' },
        Logo(),
        h('p', { className:'foot-tag' }, 'Enterprise software, automation and AI for finance, operations and compliance teams. India · United States.')
      ),
      h('div', { className:'foot-col' },
        h('div', { className:'foot-col-h' }, 'Products'),
        h('ul', null, D.products.slice(0, 7).map(p => h('li', null, h('a', null, p.name))))
      ),
      h('div', { className:'foot-col' },
        h('div', { className:'foot-col-h' }, 'Services'),
        h('ul', null, D.services.map(s => h('li', null, h('a', null, s.name))))
      ),
      h('div', { className:'foot-col' },
        h('div', { className:'foot-col-h' }, 'Company'),
        h('ul', null,
          h('li', null, h('a', { onClick:() => scrollToId('about')    }, 'About')),
          h('li', null, h('a', { onClick:() => scrollToId('clients')  }, 'Clients')),
          h('li', null, h('a', { onClick:() => scrollToId('offices')  }, 'Offices')),
          h('li', null, h('a', { onClick:() => scrollToId('contact')  }, 'Contact')),
          h('li', null, h('a', null, 'Careers')),
          h('li', null, h('a', null, 'Privacy'))
        )
      )
    ),
    h('div', { className:'foot-bot' },
      h('div', null, '© 2026 KREDO ANALYTICS PVT LTD · KREDO ANALYTICS INC'),
      h('div', { className:'foot-cert' },
        h('span', { className:'foot-cert-badge' }, Icon('iso',   14), ' ISO 27001'),
        h('span', { className:'foot-cert-badge' }, Icon('check', 14), ' ZOHO PARTNER'),
        h('span', { className:'foot-cert-badge' }, Icon('bolt',  14), ' SOC 2 IN PROGRESS')
      )
    )
  );
}


/* ============== 5. DETAIL OVERLAYS ============== */
let _bodyOverflowSaved = '';
let _activeOverlay = null;
let _onEscKey = null;

function openOverlay(overlayNode) {
  closeOverlay(); // safety: only one at a time
  _bodyOverflowSaved = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  document.body.appendChild(overlayNode);
  _activeOverlay = overlayNode;
  _onEscKey = (e) => { if (e.key === 'Escape') closeOverlay(); };
  window.addEventListener('keydown', _onEscKey);
}
function closeOverlay() {
  if (_activeOverlay) { _activeOverlay.remove(); _activeOverlay = null; }
  if (_onEscKey) { window.removeEventListener('keydown', _onEscKey); _onEscKey = null; }
  document.body.style.overflow = _bodyOverflowSaved;
}

function DetailOverlay(crumb, contentNode) {
  return h('div', { className:'detail-overlay' },
    h('div', { className:'detail-bar' },
      h('button', { className:'detail-close', onClick:closeOverlay },
        Icon('close', 14), ' Close'
      ),
      h('span', { className:'detail-crumb' }, crumb),
      h('div', { style:{ width:'80px' } })
    ),
    h('div', { style:{ flex:'1', padding:'60px 32px 80px' } }, contentNode)
  );
}

function FinlensDetail() {
  const features = [
    { n:'Real-time consolidation', d:'Multi-entity, multi-GAAP, multi-currency books rolled up the second a journal posts.' },
    { n:'Board packs in minutes',  d:'Variance commentary, segment P&Ls, and cash views — auto-generated, fully editable.' },
    { n:'Close in 3 days',         d:'Average customer reduces close cycle from 14 to 3 working days within two quarters.' },
    { n:'Audit-ready vault',       d:'Every report is reproducible. Every change is logged. Every export is signed.' },
    { n:'250+ data sources',       d:'Tally, Zoho, NetSuite, QuickBooks, SAP B1, banks, payment gateways, payroll.' },
    { n:'Forecasts that flex',     d:'Scenarios, drivers, and waterfalls — wired to the same numbers leadership sees.' },
  ];
  const phases = [
    ['01','Connect',  'Plug Finlens into every ledger, bank, and payroll source. Most setups in under a week.'],
    ['02','Map',      'Our team maps your COA, segments and entities — preserving the way your finance team thinks.'],
    ['03','Validate', 'Two-cycle parallel run with your incumbent process. We catch the edge cases.'],
    ['04','Switch',   'Go live. Board, audit, treasury — they all pull from one place.'],
    ['05','Operate',  'Quarter after quarter, with senior support on call.'],
  ];
  const results = [
    ['Close cycle reduction','11 days → 3 days'],
    ['Reporting hours saved','1,400 hrs / quarter'],
    ['Audit findings (avg)', '3 → 0'],
    ['Average payback',      '4.2 months'],
  ];

  const accStyle = { fontFamily:'Instrument Serif, serif', fontStyle:'italic', textTransform:'none', color:'var(--acc)' };

  const content = h('div', { style:{ maxWidth:'1200px', margin:'0 auto' } },
    h('span', { className:'eyebrow' }, h('span', { className:'eyebrow-dot' }), 'FINANCIAL INSIGHTS · FLAGSHIP'),

    h('h1', { style:{ fontFamily:'Anton, sans-serif', fontSize:'clamp(56px, 8vw, 140px)', lineHeight:'0.9', textTransform:'uppercase', color:'#fff', fontWeight:'400', margin:'24px 0 32px' } },
      'KREDO ', h('em', { style:accStyle }, 'Finlens.')
    ),

    h('p', { style:{ fontSize:'20px', lineHeight:'1.55', color:'rgba(255,255,255,0.78)', maxWidth:'760px', marginBottom:'48px' } },
      'The financial insights platform built for multi-entity, multi-currency operators. Consolidate in real time, close in days, and brief the board with one click.'
    ),

    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1px', background:'var(--line)', border:'1px solid var(--line)', borderRadius:'22px', overflow:'hidden', marginBottom:'60px' } },
      features.map(f =>
        h('div', { style:{ background:'rgba(8,10,14,0.7)', backdropFilter:'blur(8px)', padding:'28px 24px', display:'flex', flexDirection:'column', gap:'10px' } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px', color:'var(--acc)' } }, Icon('check', 18)),
          h('div', { style:{ fontSize:'18px', fontWeight:'600', color:'#fff' } }, f.n),
          h('div', { style:{ fontSize:'13px', lineHeight:'1.5', color:'rgba(255,255,255,0.65)' } }, f.d)
        )
      )
    ),

    h('h2', { style:{ fontFamily:'Anton, sans-serif', fontSize:'clamp(36px, 4.5vw, 72px)', textTransform:'uppercase', color:'#fff', fontWeight:'400', marginBottom:'32px' } },
      'How it ', h('em', { style:accStyle }, 'works'), '.'
    ),

    h('div', { style:{ display:'flex', flexDirection:'column', gap:'1px', background:'var(--line)', border:'1px solid var(--line)', borderRadius:'18px', overflow:'hidden', marginBottom:'60px' } },
      phases.map(([n, t, d]) =>
        h('div', { style:{ background:'rgba(8,10,14,0.7)', padding:'24px 28px', display:'grid', gridTemplateColumns:'80px 1fr 2fr', gap:'24px', alignItems:'center' } },
          h('div', { style:{ fontFamily:'Anton, sans-serif', fontSize:'36px', color:'var(--acc)' } }, n),
          h('div', { style:{ fontSize:'18px', fontWeight:'600', color:'#fff' } }, t),
          h('div', { style:{ fontSize:'14px', color:'rgba(255,255,255,0.7)', lineHeight:'1.55' } }, d)
        )
      )
    ),

    h('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'60px' } },
      h('div', { style:{ background:'rgba(8,10,14,0.7)', border:'1px solid var(--line)', borderRadius:'22px', padding:'36px' } },
        h('div', { className:'section-num', style:{ marginBottom:'12px' } }, 'RESULTS · 2025 COHORT'),
        h('div', { style:{ display:'flex', flexDirection:'column', gap:'18px' } },
          results.map(([k, v]) =>
            h('div', { style:{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--line)', paddingBottom:'14px' } },
              h('span', { style:{ color:'var(--muted)', fontFamily:'JetBrains Mono, monospace', fontSize:'11px', letterSpacing:'0.18em' } }, k.toUpperCase()),
              h('span', { style:{ fontFamily:'Anton, sans-serif', fontSize:'22px', color:'#fff' } }, v)
            )
          )
        )
      ),
      h('div', { style:{ background:'linear-gradient(135deg, rgba(108,242,200,0.12), rgba(74,163,255,0.08))', border:'1px solid var(--line-strong)', borderRadius:'22px', padding:'36px', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'24px' } },
        h('div', { className:'testimonial-quote', style:{ fontSize:'24px' } },
          'We moved from quarterly close to a 3-day close. Finlens turned our finance ops from defense to offense.'
        ),
        h('div', null,
          h('div', { style:{ fontWeight:'600', color:'#fff' } }, 'Priya N.'),
          h('div', { style:{ fontSize:'12px', color:'var(--muted)' } }, 'CFO, Series-C SaaS')
        )
      )
    ),

    h('button', { className:'cta-primary', onClick:() => { closeOverlay(); setTimeout(() => scrollToId('contact'), 200); } },
      h('span', { className:'cta-arrow' }, Icon('arrowR', 14)),
      'Book a Finlens demo'
    )
  );

  return DetailOverlay('PRODUCTS / KREDO FINLENS', content);
}

function ERPDetail() {
  const platforms = [
    { label:'ZOHO',            sub:'Premium Partner · 14 modules', glyph:'Z' },
    { label:'ORACLE NETSUITE', sub:'Multi-subsidiary · OneWorld',  glyph:'O' },
    { label:'SAP B1',          sub:'Manufacturing · Trade',         glyph:'S' },
  ];
  const phases = [
    ['01','Discover',  '2 wks',    'Process maps, gap analysis, fit assessment.'],
    ['02','Design',    '3 wks',    'COA, workflows, approval matrix, integrations.'],
    ['03','Configure', '4–8 wks',  'Build, customizations, automations, reports.'],
    ['04','Migrate',   '2–4 wks',  'Data cleansing, mapping, three-cycle parallel.'],
    ['05','Adopt',     'Ongoing',  'Training, hypercare, AMC, optimizations.'],
  ];
  const included = [
    'Dedicated implementation lead',
    'Functional + technical consultants',
    'Data migration with three-cycle parallel',
    'Custom reports & integrations',
    'User training (admin + end-user)',
    '90 days hypercare post go-live',
    '12-month AMC option',
  ];
  const accStyle = { fontFamily:'Instrument Serif, serif', fontStyle:'italic', textTransform:'none', color:'var(--acc)' };

  const content = h('div', { style:{ maxWidth:'1200px', margin:'0 auto' } },
    h('span', { className:'eyebrow' }, h('span', { className:'eyebrow-dot' }), 'SERVICE · 12–24 WEEKS · FIXED-FEE'),

    h('h1', { style:{ fontFamily:'Anton, sans-serif', fontSize:'clamp(56px, 8vw, 140px)', lineHeight:'0.9', textTransform:'uppercase', color:'#fff', fontWeight:'400', margin:'24px 0 32px' } },
      'ERP, ', h('em', { style:accStyle }, 'landed.')
    ),

    h('p', { style:{ fontSize:'20px', lineHeight:'1.55', color:'rgba(255,255,255,0.78)', maxWidth:'760px', marginBottom:'48px' } },
      'We implement Zoho, Oracle NetSuite and SAP Business One end-to-end — scoped, configured, migrated, trained and supported. No surprises, no slide-ware.'
    ),

    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'24px', marginBottom:'60px' } },
      platforms.map(p =>
        h('div', { style:{ background:'rgba(8,10,14,0.7)', border:'1px solid var(--line)', borderRadius:'22px', padding:'32px', display:'flex', flexDirection:'column', gap:'14px' } },
          h('div', { style:{ width:'54px', height:'54px', borderRadius:'14px', background:'linear-gradient(135deg, var(--acc), var(--acc2))', color:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Anton, sans-serif', fontSize:'30px' } }, p.glyph),
          h('div', { style:{ fontSize:'18px', fontWeight:'600', color:'#fff' } }, p.label),
          h('div', { style:{ fontSize:'13px', color:'var(--muted)' } }, p.sub)
        )
      )
    ),

    h('h2', { style:{ fontFamily:'Anton, sans-serif', fontSize:'clamp(36px, 4.5vw, 72px)', textTransform:'uppercase', color:'#fff', fontWeight:'400', marginBottom:'32px' } },
      'The ', h('em', { style:accStyle }, 'five'), ' phases.'
    ),

    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'1px', background:'var(--line)', border:'1px solid var(--line)', borderRadius:'18px', overflow:'hidden', marginBottom:'60px' } },
      phases.map(([n, t, d, desc]) =>
        h('div', { style:{ background:'rgba(8,10,14,0.7)', padding:'28px 22px', display:'flex', flexDirection:'column', gap:'10px' } },
          h('div', { style:{ fontFamily:'Anton, sans-serif', fontSize:'36px', color:'var(--acc)' } }, n),
          h('div', { style:{ fontSize:'16px', fontWeight:'600', color:'#fff' } }, t),
          h('div', { style:{ fontFamily:'JetBrains Mono, monospace', fontSize:'10px', letterSpacing:'0.2em', color:'var(--muted)' } }, d.toUpperCase()),
          h('div', { style:{ fontSize:'12px', color:'rgba(255,255,255,0.65)', lineHeight:'1.5' } }, desc)
        )
      )
    ),

    h('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'60px' } },
      h('div', { style:{ background:'rgba(8,10,14,0.7)', border:'1px solid var(--line)', borderRadius:'22px', padding:'36px' } },
        h('div', { className:'section-num', style:{ marginBottom:'18px' } }, "WHAT'S INCLUDED"),
        h('div', { style:{ display:'flex', flexDirection:'column', gap:'14px' } },
          included.map(x =>
            h('div', { style:{ display:'flex', alignItems:'center', gap:'12px', color:'rgba(255,255,255,0.85)' } },
              h('span', { style:{ color:'var(--acc)' } }, Icon('check', 16)),
              x
            )
          )
        )
      ),
      h('div', { style:{ background:'linear-gradient(135deg, rgba(108,242,200,0.12), rgba(74,163,255,0.08))', border:'1px solid var(--line-strong)', borderRadius:'22px', padding:'36px', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'24px' } },
        h('div', null,
          h('div', { className:'section-num', style:{ marginBottom:'14px' } }, 'FIXED-FEE PRICING'),
          h('div', { style:{ fontFamily:'Anton, sans-serif', fontSize:'64px', color:'#fff', lineHeight:'1' } }, 'From ₹6.5L'),
          h('div', { style:{ fontSize:'13px', color:'var(--muted)', marginTop:'6px' } }, 'Most projects fall between ₹6.5–24L based on modules, entities and integrations.')
        ),
        h('button', { className:'cta-primary', onClick:() => { closeOverlay(); setTimeout(() => scrollToId('contact'), 200); } },
          h('span', { className:'cta-arrow' }, Icon('arrowR', 14)),
          'Get a fixed quote'
        )
      )
    )
  );

  return DetailOverlay('SERVICES / ERP IMPLEMENTATION', content);
}


/* ============== 6. BACKGROUND VIDEO + CURSOR PARALLAX ==============
   Plays one looping video behind everything.
   Floats hero/section text with a smooth lerped cursor offset.
   To change the video file, edit BG_VIDEO below.
*/
function startBackgroundFx() {

  // ---- The one and only background video ----
  // Change this filename to use a different clip. The file must sit
  // in the same folder as index.html / app.js.
  const BG_VIDEO = 'vi1.mp4';

  const v = document.createElement('video');
  v.autoplay = true;
  v.loop = true;
  v.muted = true;
  v.playsInline = true;
  v.setAttribute('playsinline', '');
  v.setAttribute('preload', 'auto');
  v.src = BG_VIDEO;
  v.style.cssText =
    'position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover;' +
    'z-index:0;pointer-events:none;';
  document.body.appendChild(v);
  // Some browsers reject autoplay until you explicitly call play()
  const p = v.play();
  if (p && p.catch) p.catch(() => {});

  // ---- overlays: tint, grain, vignette ----
  const tint = document.createElement('div');
  tint.className = 'bg-tint';
  document.body.appendChild(tint);

  const grain = document.createElement('div');
  grain.className = 'bg-grain';
  grain.innerHTML = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-f">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-f)"/>
    </svg>`;
  document.body.appendChild(grain);

  const vig = document.createElement('div');
  vig.className = 'bg-vignette';
  document.body.appendChild(vig);

  // ---- cursor parallax (smooth lerp) ----
  const PARALLAX = [
    { sel:'.hero-title',     strength:22 },
    { sel:'.hero-body',      strength:10 },
    { sel:'.hero-inner',     strength:14 },
    { sel:'.section-head',   strength:10 },
    { sel:'[data-parallax]', strength:null }, // reads strength from attribute
  ];

  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth  - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function tick() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    for (const { sel, strength } of PARALLAX) {
      document.querySelectorAll(sel).forEach(el => {
        const s = strength != null ? strength : (parseFloat(el.dataset.parallax) || 6);
        el.style.transform = `translate3d(${(-cx * s).toFixed(2)}px, ${(-cy * s).toFixed(2)}px, 0)`;
        el.style.willChange = 'transform';
      });
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}


/* ============== 7. APP ENTRY ============== */
function openDetail(name) {
  if (name === 'finlens') openOverlay(FinlensDetail());
  else if (name === 'erp') openOverlay(ERPDetail());
}

function mount() {
  const root = document.getElementById('root');
  if (!root) return;

  const nav = Nav();

  // Build the page
  root.appendChild(nav.node);
  const main = h('main', null,
    Hero(),
    Stats(),
    Products(openDetail),
    Services(openDetail),
    DemoSection(),
    About(),
    Clients(),
    Testimonials(),
    MapSection(),
    CTA()
  );
  root.appendChild(main);
  root.appendChild(Footer());

  // ---- Scroll-spy for the nav (mirrors original threshold of 200px) ----
  const spyIds = ['home','products','services','about','clients','contact'];
  function onScroll() {
    let cur = 'home';
    for (const id of spyIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 200) cur = id;
    }
    nav.setActive(cur);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Background videos + cursor parallax ----
  startBackgroundFx();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
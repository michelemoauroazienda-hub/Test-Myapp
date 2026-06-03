/* Stock Signals PWA - vanilla JS. */

// === Default watchlist (used only the first time) ==========================
const DEFAULT_WATCHLIST = [
  { symbol: "AAPL",   name: "Apple",            stooq: "aapl.us",  currency: "USD" },
  { symbol: "MSFT",   name: "Microsoft",        stooq: "msft.us",  currency: "USD" },
  { symbol: "GOOGL",  name: "Alphabet",         stooq: "googl.us", currency: "USD" },
  { symbol: "AMZN",   name: "Amazon",           stooq: "amzn.us",  currency: "USD" },
  { symbol: "META",   name: "Meta",             stooq: "meta.us",  currency: "USD" },
  { symbol: "NVDA",   name: "NVIDIA",           stooq: "nvda.us",  currency: "USD" },
  { symbol: "TSLA",   name: "Tesla",            stooq: "tsla.us",  currency: "USD" },
  { symbol: "ENI.MI", name: "Eni",              stooq: "eni.it",   currency: "EUR" },
  { symbol: "ISP.MI", name: "Intesa Sanpaolo",  stooq: "isp.it",   currency: "EUR" },
  { symbol: "SAP.DE", name: "SAP",              stooq: "sap.de",   currency: "EUR" },
  { symbol: "BTC",    name: "Bitcoin",          stooq: "btcusd",   currency: "USD" },
  { symbol: "ETH",    name: "Ethereum",         stooq: "ethusd",   currency: "USD" },
];

// === Searchable catalog (popular symbols) ==================================
// Used by the in-app search. Free-text keyword matches.
const CATALOG = [
  // US tech / mega-cap
  { symbol: "AAPL",  name: "Apple",            stooq: "aapl.us",  currency: "USD" },
  { symbol: "MSFT",  name: "Microsoft",        stooq: "msft.us",  currency: "USD" },
  { symbol: "GOOGL", name: "Alphabet (Google)",stooq: "googl.us", currency: "USD" },
  { symbol: "AMZN",  name: "Amazon",           stooq: "amzn.us",  currency: "USD" },
  { symbol: "META",  name: "Meta Platforms",   stooq: "meta.us",  currency: "USD" },
  { symbol: "NVDA",  name: "NVIDIA",           stooq: "nvda.us",  currency: "USD" },
  { symbol: "TSLA",  name: "Tesla",            stooq: "tsla.us",  currency: "USD" },
  { symbol: "NFLX",  name: "Netflix",          stooq: "nflx.us",  currency: "USD" },
  { symbol: "AMD",   name: "AMD",              stooq: "amd.us",   currency: "USD" },
  { symbol: "INTC",  name: "Intel",            stooq: "intc.us",  currency: "USD" },
  { symbol: "CRM",   name: "Salesforce",       stooq: "crm.us",   currency: "USD" },
  { symbol: "ORCL",  name: "Oracle",           stooq: "orcl.us",  currency: "USD" },
  { symbol: "ADBE",  name: "Adobe",            stooq: "adbe.us",  currency: "USD" },
  { symbol: "DIS",   name: "Walt Disney",      stooq: "dis.us",   currency: "USD" },
  { symbol: "KO",    name: "Coca-Cola",        stooq: "ko.us",    currency: "USD" },
  { symbol: "PEP",   name: "PepsiCo",          stooq: "pep.us",   currency: "USD" },
  { symbol: "JPM",   name: "JPMorgan Chase",   stooq: "jpm.us",   currency: "USD" },
  { symbol: "BAC",   name: "Bank of America",  stooq: "bac.us",   currency: "USD" },
  { symbol: "V",     name: "Visa",             stooq: "v.us",     currency: "USD" },
  { symbol: "MA",    name: "Mastercard",       stooq: "ma.us",    currency: "USD" },
  { symbol: "WMT",   name: "Walmart",          stooq: "wmt.us",   currency: "USD" },
  { symbol: "MCD",   name: "McDonald's",       stooq: "mcd.us",   currency: "USD" },
  { symbol: "BA",    name: "Boeing",           stooq: "ba.us",    currency: "USD" },
  { symbol: "GE",    name: "General Electric", stooq: "ge.us",    currency: "USD" },
  // Italy
  { symbol: "ENI",   name: "Eni",              stooq: "eni.it",   currency: "EUR" },
  { symbol: "ISP",   name: "Intesa Sanpaolo",  stooq: "isp.it",   currency: "EUR" },
  { symbol: "UCG",   name: "UniCredit",        stooq: "ucg.it",   currency: "EUR" },
  { symbol: "ENEL",  name: "Enel",             stooq: "enel.it",  currency: "EUR" },
  { symbol: "STLA",  name: "Stellantis",       stooq: "stla.it",  currency: "EUR" },
  { symbol: "TIT",   name: "Telecom Italia",   stooq: "tit.it",   currency: "EUR" },
  { symbol: "G",     name: "Generali",         stooq: "g.it",     currency: "EUR" },
  { symbol: "MB",    name: "Mediobanca",       stooq: "mb.it",    currency: "EUR" },
  { symbol: "FBK",   name: "FinecoBank",       stooq: "fbk.it",   currency: "EUR" },
  { symbol: "RACE",  name: "Ferrari",          stooq: "race.it",  currency: "EUR" },
  // Germany / Europe
  { symbol: "SAP",   name: "SAP",              stooq: "sap.de",   currency: "EUR" },
  { symbol: "SIE",   name: "Siemens",          stooq: "sie.de",   currency: "EUR" },
  { symbol: "ALV",   name: "Allianz",          stooq: "alv.de",   currency: "EUR" },
  { symbol: "BMW",   name: "BMW",              stooq: "bmw.de",   currency: "EUR" },
  { symbol: "VOW3",  name: "Volkswagen",       stooq: "vow3.de",  currency: "EUR" },
  { symbol: "ASML",  name: "ASML Holding",     stooq: "asml.nl",  currency: "EUR" },
  { symbol: "MC",    name: "LVMH",             stooq: "mc.fr",    currency: "EUR" },
  { symbol: "AIR",   name: "Airbus",           stooq: "air.fr",   currency: "EUR" },
  // UK
  { symbol: "HSBA",  name: "HSBC",             stooq: "hsba.uk",  currency: "GBP" },
  { symbol: "BP",    name: "BP",               stooq: "bp.uk",    currency: "GBP" },
  // Crypto
  { symbol: "BTC",   name: "Bitcoin",          stooq: "btcusd",   currency: "USD" },
  { symbol: "ETH",   name: "Ethereum",         stooq: "ethusd",   currency: "USD" },
  { symbol: "SOL",   name: "Solana",           stooq: "solusd",   currency: "USD" },
  { symbol: "ADA",   name: "Cardano",          stooq: "adausd",   currency: "USD" },
  { symbol: "XRP",   name: "XRP",              stooq: "xrpusd",   currency: "USD" },
];

// === LocalStorage helpers ==================================================
const LS_WATCH = "ss.watchlist.v1";
const LS_CACHE = "ss.cache.v1";

function loadWatchlist() {
  try {
    const raw = localStorage.getItem(LS_WATCH);
    if (!raw) return DEFAULT_WATCHLIST.slice();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_WATCHLIST.slice();
  } catch { return DEFAULT_WATCHLIST.slice(); }
}
function saveWatchlist(list) {
  try { localStorage.setItem(LS_WATCH, JSON.stringify(list)); } catch {}
}
function loadCache() {
  try { return JSON.parse(localStorage.getItem(LS_CACHE) || "{}"); }
  catch { return {}; }
}
function saveCache(obj) {
  try { localStorage.setItem(LS_CACHE, JSON.stringify(obj)); } catch {}
}

// === Data layer ============================================================
// stooq.com does not send CORS headers, so direct fetch() from a browser
// origin (e.g. GitHub Pages) is blocked. We route the CSV request through
// a list of public CORS proxies and use the first one that succeeds.
// Each entry: { url(target) -> proxiedUrl, parse(responseText) -> csvText }
const STOOQ_PROXIES = [
  {
    url: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
    parse: (t) => { try { return JSON.parse(t).contents || ""; } catch { return ""; } },
  },
  {
    url: (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
    parse: (t) => t,
  },
  {
    url: (u) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`,
    parse: (t) => t,
  },
  {
    url: (u) => `https://cors.isomorphic-git.org/${u}`,
    parse: (t) => t,
  },
  {
    url: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    parse: (t) => t,
  },
];

function fetchWithTimeout(url, ms = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { cache: "no-store", signal: ctrl.signal, redirect: "follow" })
    .finally(() => clearTimeout(t));
}

function looksLikeCsv(text) {
  if (!text) return false;
  const head = text.slice(0, 200).toLowerCase();
  if (head.includes("<html") || head.includes("<!doctype")) return false;
  return head.includes("date,") || head.includes("date;") || /\d{4}-\d{2}-\d{2}/.test(head);
}

async function fetchHistory(stooqCode) {
  const target = `https://stooq.com/q/d/l/?s=${encodeURIComponent(stooqCode)}&i=d`;
  let lastErr = null;
  let csv = null;
  for (const p of STOOQ_PROXIES) {
    try {
      const resp = await fetchWithTimeout(p.url(target));
      if (!resp.ok) { lastErr = new Error(`HTTP ${resp.status}`); continue; }
      const body = await resp.text();
      const text = p.parse(body);
      if (!looksLikeCsv(text)) { lastErr = new Error("risposta non valida"); continue; }
      csv = text;
      break;
    } catch (e) {
      lastErr = e;
    }
  }
  if (csv == null) throw lastErr || new Error("rete non disponibile");
  if (csv.trim().toLowerCase().startsWith("no data")) throw new Error("nessun dato");
  const rows = csv.trim().split(/\r?\n/).slice(1);
  const bars = [];
  for (const line of rows) {
    const [date, open, high, low, close, volume] = line.split(",");
    const c = parseFloat(close), h = parseFloat(high), l = parseFloat(low);
    if (Number.isFinite(c) && Number.isFinite(h) && Number.isFinite(l)) {
      bars.push({ date, open: +open, high: h, low: l, close: c, volume: +volume });
    }
  }
  if (bars.length < 2) throw new Error("serie troppo corta");
  return bars;
}

// === Indicators ============================================================
function sma(values, period) {
  if (values.length < period) return NaN;
  let s = 0;
  for (let i = values.length - period; i < values.length; i++) s += values[i];
  return s / period;
}
function rsi(closes, period = 14) {
  if (closes.length <= period) return NaN;
  let gain = 0, loss = 0;
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1];
    if (d >= 0) gain += d; else loss -= d;
  }
  let ag = gain / period, al = loss / period;
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    ag = (ag * (period - 1) + (d > 0 ? d : 0)) / period;
    al = (al * (period - 1) + (d < 0 ? -d : 0)) / period;
  }
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}
function highestHigh(highs, period) {
  const p = Math.min(period, highs.length);
  let m = -Infinity;
  for (let i = highs.length - p; i < highs.length; i++) m = Math.max(m, highs[i]);
  return m;
}
function lowestLow(lows, period) {
  const p = Math.min(period, lows.length);
  let m = Infinity;
  for (let i = lows.length - p; i < lows.length; i++) m = Math.min(m, lows[i]);
  return m;
}

// === Signal engine =========================================================
function evaluate(bars) {
  const closes = bars.map(b => b.close);
  const highs  = bars.map(b => b.high);
  const lows   = bars.map(b => b.low);
  const price  = closes[closes.length - 1];
  const prev   = closes[closes.length - 2];
  const changePct = prev ? ((price - prev) / prev) * 100 : 0;

  const result = {
    price, changePct, signal: "HOLD",
    actionPrice: NaN, targetPrice: NaN,
    reason: "Dati insufficienti", rsi: NaN,
    sma50: NaN, sma200: NaN,
    high20: highs.length ? highestHigh(highs, 20) : NaN,
    low20:  lows.length  ? lowestLow(lows, 20)    : NaN,
  };
  if (closes.length < 50) return result;

  const s50  = sma(closes, 50);
  const s200 = closes.length >= 200 ? sma(closes, 200) : NaN;
  const r    = rsi(closes, 14);
  result.sma50 = s50; result.sma200 = s200; result.rsi = r;
  result.reason = "Nessun segnale chiaro";

  const uptrend   = Number.isFinite(s200) && price > s50 && s50 > s200;
  const downtrend = Number.isFinite(s200) && price < s50 && s50 < s200;

  if (Number.isFinite(r) && r < 30) {
    result.signal = "BUY"; result.actionPrice = price; result.targetPrice = result.high20;
    result.reason = `RSI ipervenduto (${r.toFixed(1)})`;
  } else if (Number.isFinite(r) && r > 70) {
    result.signal = "SELL"; result.actionPrice = price; result.targetPrice = result.low20;
    result.reason = `RSI ipercomprato (${r.toFixed(1)})`;
  } else if (uptrend && r < 70) {
    result.signal = "BUY"; result.actionPrice = price; result.targetPrice = result.high20;
    result.reason = `Trend rialzista, RSI ${r.toFixed(1)}`;
  } else if (downtrend && r > 30) {
    result.signal = "SELL"; result.actionPrice = price; result.targetPrice = result.low20;
    result.reason = `Trend ribassista, RSI ${r.toFixed(1)}`;
  }
  return result;
}

// === Formatting ============================================================
function formatPrice(v, currency) {
  if (!Number.isFinite(v)) return "—";
  const sym = ({ USD: "$", EUR: "€", GBP: "£", JPY: "¥" })[currency] || (currency ? currency + " " : "");
  return sym + v.toFixed(2);
}
function formatPct(p) {
  if (!Number.isFinite(p)) return "—";
  return (p >= 0 ? "+" : "") + p.toFixed(2) + "%";
}
function avatarColor(symbol) {
  let h = 0;
  for (let i = 0; i < symbol.length; i++) h = (h * 31 + symbol.charCodeAt(i)) >>> 0;
  const a = h % 360, b = (h * 7) % 360;
  return `linear-gradient(135deg, hsl(${a},70%,45%), hsl(${b},65%,30%))`;
}

// === Progress ==============================================================
function setProgress(done, total, label) {
  const wrap = document.getElementById("progress");
  wrap.classList.remove("hidden");
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressLabel").textContent = label;
}
function hideProgress() { document.getElementById("progress").classList.add("hidden"); }

// === State =================================================================
let STATE = {
  watchlist: loadWatchlist(),
  rows: [],
  filter: "ALL",
  loading: false,
  fromCache: false,
};

function showSkeletons(n) {
  const c = document.getElementById("cards");
  c.innerHTML = Array.from({ length: n }, () => `<div class="skeleton"></div>`).join("");
}

function renderCards() {
  const c = document.getElementById("cards");
  const filtered = STATE.filter === "ALL"
    ? STATE.rows
    : STATE.rows.filter(r => r.signal === STATE.filter);

  document.getElementById("cntAll").textContent  = STATE.rows.length;
  document.getElementById("cntBuy").textContent  = STATE.rows.filter(r => r.signal === "BUY").length;
  document.getElementById("cntSell").textContent = STATE.rows.filter(r => r.signal === "SELL").length;
  document.getElementById("cntHold").textContent = STATE.rows.filter(r => r.signal === "HOLD").length;

  if (filtered.length === 0) {
    c.innerHTML = STATE.rows.length === 0
      ? `<div class="empty"><div class="empty-emoji">📭</div>La watchlist è vuota.<br/>Tocca <strong>+</strong> per aggiungere titoli.</div>`
      : `<div class="empty"><div class="empty-emoji">🔍</div>Nessun titolo in questa categoria.</div>`;
    return;
  }

  c.innerHTML = filtered.map((r) => {
    const changeCls = r.changePct > 0 ? "change-pos" : r.changePct < 0 ? "change-neg" : "";
    const pillCls   = r.signal === "BUY" ? "pill-buy" : r.signal === "SELL" ? "pill-sell" : "pill-hold";
    let action;
    if (r.signal === "BUY")  action = `<div class="card-action action-buy">COMPRA a ${formatPrice(r.actionPrice, r.currency)}</div>`;
    else if (r.signal === "SELL") action = `<div class="card-action action-sell">VENDI a ${formatPrice(r.actionPrice, r.currency)}</div>`;
    else action = `<div class="card-action action-hold">Nessuna azione</div>`;

    const initials = r.symbol.slice(0, 3).toUpperCase();
    return `
      <article class="card" data-signal="${r.signal}" data-idx="${STATE.rows.indexOf(r)}">
        <div class="card-top-l">
          <div class="avatar" style="background:${avatarColor(r.symbol)}">${initials}</div>
          <div class="card-ident">
            <div class="card-symbol">${r.symbol}</div>
            <div class="card-name">${r.name}</div>
          </div>
        </div>
        <div class="card-top-r">
          <div class="card-price">${formatPrice(r.price, r.currency)}</div>
          <div class="card-change ${changeCls}">${formatPct(r.changePct)}</div>
        </div>
        <div class="card-bottom">
          <span class="pill ${pillCls}">${r.signal}</span>
          ${action}
        </div>
      </article>`;
  }).join("");

  c.querySelectorAll(".card").forEach(el => {
    el.addEventListener("click", () => openDetail(parseInt(el.dataset.idx, 10)));
  });
}

// === Detail view ===========================================================
function openDetail(idx) {
  const r = STATE.rows[idx];
  if (!r) return;
  document.getElementById("listView").classList.add("hidden");
  document.getElementById("detailView").classList.remove("hidden");
  window.scrollTo(0, 0);

  document.getElementById("detailSymbol").textContent = r.symbol;
  document.getElementById("detailName").textContent = r.name;
  document.getElementById("detailPrice").textContent = formatPrice(r.price, r.currency);
  const chgEl = document.getElementById("detailChange");
  chgEl.textContent = formatPct(r.changePct);
  chgEl.className = "price-change " + (r.changePct > 0 ? "change-pos" : r.changePct < 0 ? "change-neg" : "");

  const banner = document.getElementById("signalBanner");
  banner.dataset.signal = r.signal;
  document.getElementById("signalBannerLabel").textContent = "SEGNALE";
  document.getElementById("signalBannerAction").textContent =
    r.signal === "BUY"  ? `COMPRA a ${formatPrice(r.actionPrice, r.currency)}` :
    r.signal === "SELL" ? `VENDI a ${formatPrice(r.actionPrice, r.currency)}` :
                          "Nessuna azione";
  document.getElementById("signalBannerReason").textContent = r.reason;

  document.getElementById("statRsi").textContent    = Number.isFinite(r.rsi) ? r.rsi.toFixed(1) : "—";
  document.getElementById("statSma50").textContent  = formatPrice(r.sma50,  r.currency);
  document.getElementById("statSma200").textContent = formatPrice(r.sma200, r.currency);
  document.getElementById("statTarget").textContent = formatPrice(r.targetPrice, r.currency);
  document.getElementById("statHigh").textContent   = formatPrice(r.high20, r.currency);
  document.getElementById("statLow").textContent    = formatPrice(r.low20,  r.currency);

  drawSparkline(r.history90 || []);
}
function closeDetail() {
  document.getElementById("detailView").classList.add("hidden");
  document.getElementById("listView").classList.remove("hidden");
}

function drawSparkline(closes) {
  const svg = document.getElementById("sparkline");
  if (!closes.length) { svg.innerHTML = ""; return; }
  const W = 320, H = 120, P = 4;
  const min = Math.min(...closes), max = Math.max(...closes);
  const range = max - min || 1;
  const dx = (W - P * 2) / (closes.length - 1 || 1);
  const points = closes.map((c, i) => {
    const x = P + i * dx;
    const y = P + (H - P * 2) * (1 - (c - min) / range);
    return [x, y];
  });
  const d = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const up = closes[closes.length - 1] >= closes[0];
  const color = up ? "#16a34a" : "#dc2626";
  const area = d + ` L${points[points.length-1][0].toFixed(1)},${H-P} L${P},${H-P} Z`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="spkFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#spkFill)" stroke="none"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `;
}

// === Refresh ===============================================================
async function refresh() {
  if (STATE.loading) return;
  if (STATE.watchlist.length === 0) { STATE.rows = []; renderCards(); return; }

  STATE.loading = true;
  STATE.fromCache = false;
  document.getElementById("offlineBar").classList.add("hidden");
  const btn = document.getElementById("refreshBtn");
  btn.disabled = true;
  document.getElementById("errors").textContent = "";
  showSkeletons(STATE.watchlist.length);

  const total = STATE.watchlist.length;
  let done = 0;
  setProgress(0, total, "Inizio...");

  const cache = loadCache();
  const results = [];
  const errors = [];

  for (const w of STATE.watchlist) {
    setProgress(done, total, `Scarico ${w.symbol}...`);
    try {
      const bars = await fetchHistory(w.stooq);
      const ev = evaluate(bars);
      const closes = bars.map(b => b.close);
      const row = { ...w, ...ev, history90: closes.slice(-90) };
      results.push(row);
      cache[w.stooq] = { row, fetchedAt: Date.now() };
    } catch (e) {
      // Try cached fallback for this symbol
      const cached = cache[w.stooq];
      if (cached) {
        results.push({ ...cached.row, _cached: true });
        errors.push(`${w.symbol}: rete KO (uso cache)`);
      } else {
        errors.push(`${w.symbol}: ${e.message}`);
      }
    }
    done++;
    setProgress(done, total, `Elaboro ${w.symbol}...`);
  }

  saveCache(cache);

  STATE.rows = results;
  STATE.fromCache = results.length > 0 && results.every(r => r._cached);
  renderCards();
  document.getElementById("updatedAt").textContent =
    "Aggiornato " + new Date().toLocaleString("it-IT", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
  if (errors.length) document.getElementById("errors").textContent = "Errori: " + errors.join(" · ");
  if (STATE.fromCache || !navigator.onLine) {
    document.getElementById("offlineBar").classList.remove("hidden");
  }

  hideProgress();
  btn.disabled = false;
  STATE.loading = false;
}

// === Manage sheet ==========================================================
function openSheet() {
  document.getElementById("sheetBackdrop").classList.remove("hidden");
  document.getElementById("manageSheet").classList.remove("hidden");
  document.getElementById("searchInput").value = "";
  renderSearchResults("");
  renderWatchlistEditor();
  setTimeout(() => document.getElementById("searchInput").focus(), 100);
}
function closeSheet() {
  document.getElementById("sheetBackdrop").classList.add("hidden");
  document.getElementById("manageSheet").classList.add("hidden");
}

function renderSearchResults(q) {
  const box = document.getElementById("searchResults");
  const query = q.trim().toLowerCase();
  if (!query) {
    box.innerHTML = `<div class="search-empty">Digita per cercare tra ${CATALOG.length} titoli popolari.</div>`;
    return;
  }
  const owned = new Set(STATE.watchlist.map(w => w.stooq));
  const matches = CATALOG.filter(c =>
    c.symbol.toLowerCase().includes(query) ||
    c.name.toLowerCase().includes(query) ||
    c.stooq.toLowerCase().includes(query)
  ).slice(0, 20);

  if (matches.length === 0) {
    box.innerHTML = `<div class="search-empty">Nessun risultato. Usa "Aggiungi codice Stooq manuale" sotto.</div>`;
    return;
  }
  box.innerHTML = matches.map(m => {
    const already = owned.has(m.stooq);
    return `
      <div class="search-item">
        <div class="search-item-info">
          <div class="search-item-sym">${m.symbol} <span style="color:var(--text-mute);font-size:11px;">· ${m.currency}</span></div>
          <div class="search-item-name">${m.name}</div>
        </div>
        <button class="search-item-add" data-stooq="${m.stooq}" ${already ? "disabled" : ""}>
          ${already ? "✓ Aggiunto" : "+ Aggiungi"}
        </button>
      </div>`;
  }).join("");
  box.querySelectorAll(".search-item-add").forEach(btn => {
    btn.addEventListener("click", () => {
      const stooq = btn.dataset.stooq;
      const item = CATALOG.find(c => c.stooq === stooq);
      if (item) addToWatchlist(item);
    });
  });
}

function renderWatchlistEditor() {
  document.getElementById("watchCount").textContent = STATE.watchlist.length;
  const list = document.getElementById("watchlistEditor");
  if (STATE.watchlist.length === 0) {
    list.innerHTML = `<div class="search-empty">Nessun titolo. Aggiungine uno dall'alto.</div>`;
    return;
  }
  list.innerHTML = STATE.watchlist.map((w, i) => `
    <li class="watch-item">
      <div class="watch-item-info">
        <div class="watch-item-sym">${w.symbol} <span style="color:var(--text-mute);font-size:11px;">· ${w.stooq}</span></div>
        <div class="watch-item-name">${w.name}</div>
      </div>
      <button class="watch-item-remove" data-idx="${i}">Rimuovi</button>
    </li>
  `).join("");
  list.querySelectorAll(".watch-item-remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromWatchlist(parseInt(btn.dataset.idx, 10)));
  });
}

function addToWatchlist(item) {
  if (STATE.watchlist.some(w => w.stooq === item.stooq)) return;
  STATE.watchlist.push(item);
  saveWatchlist(STATE.watchlist);
  renderSearchResults(document.getElementById("searchInput").value);
  renderWatchlistEditor();
  refresh();
}
function removeFromWatchlist(idx) {
  STATE.watchlist.splice(idx, 1);
  saveWatchlist(STATE.watchlist);
  renderSearchResults(document.getElementById("searchInput").value);
  renderWatchlistEditor();
  renderCards();
}
function addManual() {
  const symbol = document.getElementById("manualSymbol").value.trim().toUpperCase();
  const stooq  = document.getElementById("manualStooq").value.trim().toLowerCase();
  const name   = document.getElementById("manualName").value.trim() || symbol;
  const currency = document.getElementById("manualCurrency").value;
  if (!symbol || !stooq) { alert("Symbol e codice Stooq sono obbligatori"); return; }
  addToWatchlist({ symbol, stooq, name, currency });
  document.getElementById("manualSymbol").value = "";
  document.getElementById("manualStooq").value  = "";
  document.getElementById("manualName").value   = "";
}

// === Event wiring ==========================================================
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  STATE.filter = btn.dataset.filter;
  renderCards();
});
document.getElementById("refreshBtn").addEventListener("click", refresh);
document.getElementById("backBtn").addEventListener("click", closeDetail);
document.getElementById("fabAdd").addEventListener("click", openSheet);
document.getElementById("sheetClose").addEventListener("click", closeSheet);
document.getElementById("sheetBackdrop").addEventListener("click", closeSheet);
document.getElementById("searchInput").addEventListener("input", (e) => renderSearchResults(e.target.value));
document.getElementById("manualAddBtn").addEventListener("click", addManual);

// Pull-to-refresh
let touchStartY = 0, pulling = false;
window.addEventListener("touchstart", (e) => {
  if (window.scrollY === 0) { touchStartY = e.touches[0].clientY; pulling = true; }
}, { passive: true });
window.addEventListener("touchmove", (e) => {
  if (!pulling) return;
  const dy = e.touches[0].clientY - touchStartY;
  if (dy > 80 && !STATE.loading) { pulling = false; refresh(); }
}, { passive: true });
window.addEventListener("touchend", () => { pulling = false; });

// Offline / online events
window.addEventListener("online",  () => { document.getElementById("offlineBar").classList.add("hidden"); refresh(); });
window.addEventListener("offline", () => { document.getElementById("offlineBar").classList.remove("hidden"); });

// On boot: paint from cache instantly, then refresh from network.
function bootFromCache() {
  const cache = loadCache();
  const rows = [];
  for (const w of STATE.watchlist) {
    if (cache[w.stooq]?.row) rows.push({ ...cache[w.stooq].row, _cached: true });
  }
  if (rows.length) { STATE.rows = rows; renderCards(); }
}

window.addEventListener("DOMContentLoaded", () => {
  bootFromCache();
  refresh();
});

# Stock Signals — PWA

App **mobile** (e desktop) che mostra una watchlist di azioni globali con segnali tecnici
**BUY / SELL / HOLD** e prezzo consigliato. È una **Progressive Web App**: si installa sul
telefono dal browser, niente APK, niente Play Store, **0 €**.

> ⚠️ **Disclaimer**: solo a scopo informativo/didattico. Non è consulenza finanziaria.
> I segnali derivano da regole tecniche classiche (RSI + medie mobili) e possono essere
> errati. Non operare basandoti solo su questo output.

---

## Cosa c'è nel progetto

```
Test app/
├── index.html              ← pagina principale
├── styles.css              ← stile (con dark mode automatica)
├── app.js                  ← logica (fetch, indicatori, segnali, UI, watchlist)
├── manifest.webmanifest    ← rende l'app "installabile"
├── service-worker.js       ← cache offline dell'interfaccia
├── icons/icon.svg          ← icona dell'app
└── README.md               ← questo file
```

> Se trovi anche le cartelle `app/`, `gradle/` e file `*.gradle.kts`, sono residui di una
> vecchia versione Android nativa: **puoi cancellarli**, non servono alla PWA.

---

## Funzionalità

- 📈 **Watchlist di azioni globali** (USA, Italia, Germania, UK, cripto).
- 🎯 **Segnali BUY / SELL / HOLD** con prezzo consigliato espresso in chiaro
  (es. *"COMPRA a $150.20"*).
- 🔍 **Schermata dettaglio** con sparkline 90 giorni, RSI, SMA50/200, target,
  massimo/minimo a 20 sedute.
- ➕ **Gestione watchlist dall'app**: tocca il pulsante **+** in basso a destra,
  cerca tra ~50 titoli popolari o aggiungi un codice Stooq manuale.
- 💾 **Cache offline dei prezzi**: l'ultima istantanea è salvata in locale, se sei
  senza rete vedi comunque i dati con un banner giallo.
- 🌗 **Dark mode automatica** (segue il tema del sistema).
- 🔄 **Pull-to-refresh** e bottone refresh.
- 📊 **Filtri rapidi** per categoria: Tutti / Buy / Sell / Hold.
- 🔌 **Zero dipendenze**: HTML + CSS + JS puro, niente framework.

---

## Logica del segnale

| Condizione                                       | Segnale | Azione                   | Target                    |
|--------------------------------------------------|---------|--------------------------|---------------------------|
| RSI < 30                                         | BUY     | COMPRA al prezzo attuale | massimo ultime 20 sedute  |
| RSI > 70                                         | SELL    | VENDI al prezzo attuale  | minimo  ultime 20 sedute  |
| Prezzo > SMA50 > SMA200, RSI < 70                | BUY     | COMPRA al prezzo attuale | massimo ultime 20 sedute  |
| Prezzo < SMA50 < SMA200, RSI > 30                | SELL    | VENDI al prezzo attuale  | minimo  ultime 20 sedute  |
| altrimenti                                       | HOLD    | Nessuna azione           | —                         |

Sorgente dati: **stooq.com** (CSV gratuito, end-of-day, senza API key, compatibile CORS).

---

## 🚀 Come pubblicarla e installarla sul telefono (passo passo, gratis)

Una PWA per funzionare richiede **HTTPS**. Useremo **GitHub Pages** che è gratuito e
include HTTPS automatico. Tempo richiesto: ~5 minuti.

### 1. Crea un account GitHub (se non ce l'hai)
👉 https://github.com/signup

### 2. Crea un nuovo repository
- Vai su https://github.com/new
- **Repository name**: `stock-signals` (o quello che vuoi)
- Visibility: **Public** (necessario per GitHub Pages gratis)
- ✅ "Add a README" lascialo **disattivo** (ne abbiamo già uno)
- Click **Create repository**

### 3. Carica i file
Nella pagina del repo appena creato:
- Click su **"uploading an existing file"** (link nella schermata vuota)
- Trascina dentro **tutti i file** della cartella `Test app`:
  - `index.html`, `styles.css`, `app.js`
  - `manifest.webmanifest`, `service-worker.js`, `README.md`
  - la cartella `icons/` con dentro `icon.svg`
- Scrivi un messaggio di commit qualsiasi e click **Commit changes**

### 4. Attiva GitHub Pages
- Nel repo, vai in **Settings** → menu sinistro **Pages**
- Sotto "Build and deployment":
  - **Source**: `Deploy from a branch`
  - **Branch**: `main` / `(root)` → **Save**
- Aspetta 1-2 minuti. Ricarica la pagina: in alto vedrai
  `Your site is live at https://TUO-USERNAME.github.io/stock-signals/`

### 5. Installa l'app sul telefono

**Android (Chrome):**
- Apri il link del punto 4 in Chrome.
- Tocca i **tre puntini** in alto a destra → **"Installa app"** (o "Aggiungi a schermata Home").
- Conferma. L'icona compare sulla home come un'app normale.

**iPhone (Safari):**
- Apri il link in Safari.
- Tocca **Condividi** → **"Aggiungi a schermata Home"**.

Tocca l'icona e l'app si apre **a schermo intero**, senza barra del browser.
Al primo avvio parte automaticamente il download dei prezzi con la barra di progresso.

### 6. Aggiornamenti futuri
Ogni volta che modifichi un file su GitHub, ricarica l'app sul telefono: il nuovo codice
arriva da solo. Se non vedi le modifiche, incrementa la versione cache: apri
[service-worker.js](service-worker.js#L2) e cambia `stocksignals-v3` → `v4`.

---

## 🛠️ Provarla in locale prima di pubblicare

Apri PowerShell **dentro la cartella `Test app`** e lancia:

```powershell
# con Python (preinstallato spesso)
python -m http.server 8000

# oppure con Node
npx serve .
```

Poi apri http://localhost:8000 nel browser.

> ⚠️ Non aprire `index.html` con doppio click: il service worker richiede `http://`.

---

## ✏️ Personalizzare la watchlist

**Dall'app** (modo consigliato): tocca **+** in basso a destra → si apre un pannello dove
puoi cercare tra i titoli popolari e aggiungerli/rimuoverli. La tua lista è salvata sul
telefono (localStorage) e sopravvive ai riavvii.

Per aggiungere un titolo **non in catalogo**, espandi "Aggiungi codice Stooq manuale".
Trova il codice cercando il titolo su https://stooq.com: l'URL della quotazione contiene
il codice (es. `stooq.com/q/?s=aapl.us` → `aapl.us`).

Vuoi cambiare anche la **watchlist di default** (quella vista al primo avvio)?
Modifica `DEFAULT_WATCHLIST` in [app.js](app.js#L4).

---

## ❓ FAQ

**Mi serve un PC sempre acceso?** No. Pubblicata su GitHub Pages funziona da sola, h24.

**Funziona offline?** L'interfaccia sì. I prezzi mostrano l'ultima istantanea salvata in
locale, con un banner giallo "⚠ Sei offline".

**Costi nascosti?** Zero. GitHub Pages gratis + Stooq gratis.

**I prezzi sono in tempo reale?** No, sono **end-of-day** (chiusura della seduta
precedente). Per intraday/real-time servirebbe un'API a pagamento.

**Posso aggiungere ISIN / TER?** ISIN: serve un'altra fonte (es. OpenFIGI), si può
aggiungere. TER esiste solo per ETF/fondi, non per azioni singole.

**Quanto sono affidabili i segnali?** Sono regole tecniche didattiche. **Usali per
studio, non per investire alla cieca.**

**Posso usarla anche su PC?** Sì, basta aprire l'URL nel browser. È responsive.

---

## 🔧 Possibili estensioni future

- 🔔 Notifiche push quando un titolo cambia segnale (richiede mini-backend).
- 📊 Backtest storico dei segnali (vedi se la strategia avrebbe funzionato).
- 🔀 Riordino watchlist drag-and-drop.
- 📤 Export/import watchlist (JSON) per sincronizzare tra dispositivi.
- 📈 Più indicatori (MACD, Bande di Bollinger).
- 🎨 Tema chiaro/scuro forzabile manualmente.

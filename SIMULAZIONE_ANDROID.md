# Guida passo-passo: simulare e installare l'app Android

Questa guida ti porta dal **niente installato** al **vedere l'app girare sul PC** (emulatore) e poi sul **tuo telefono**.

Non serve sapere programmare. Segui i passaggi in ordine. Quando un passaggio dice "aspetta", aspetta davvero: i download di Android Studio sono pesanti (la prima volta puoi metterci anche 30-60 minuti totali, dipende dalla tua connessione).

---

## Indice

1. [Cosa ti serve prima di iniziare](#1-cosa-ti-serve-prima-di-iniziare)
2. [Parte 1 — Installare Android Studio](#parte-1--installare-android-studio)
3. [Parte 2 — Aprire il progetto](#parte-2--aprire-il-progetto)
4. [Parte 3 — Creare l'emulatore (telefono virtuale)](#parte-3--creare-lemulatore-telefono-virtuale)
5. [Parte 4 — Avviare l'app sull'emulatore](#parte-4--avviare-lapp-sullemulatore)
6. [Parte 5 — Usare l'app](#parte-5--usare-lapp)
7. [Parte 6 — Installare l'app sul tuo telefono fisico](#parte-6--installare-lapp-sul-tuo-telefono-fisico)
8. [Risoluzione problemi comuni](#risoluzione-problemi-comuni)

---

## 1. Cosa ti serve prima di iniziare

- **Windows 10 o 11** (64-bit) — quello che hai già.
- **Almeno 8 GB di RAM** liberi quando avvii l'emulatore (16 GB totali consigliati).
- **Circa 15 GB liberi sul disco** (Android Studio + SDK + emulatore).
- **Connessione internet** stabile (la prima installazione scarica diversi GB).
- **Pazienza**: la prima volta è lunga, dalla seconda in poi sono pochi secondi.

> Suggerimento: chiudi browser e programmi pesanti durante la prima installazione, così va più veloce.

---

## Parte 1 — Installare Android Studio

### Passo 1.1 — Scarica
1. Apri il browser e vai su: **https://developer.android.com/studio**
2. Clicca il grande bottone **Download Android Studio** (il nome cambia col tempo, ma c'è sempre).
3. Accetta i termini → parte il download del file `.exe` (~1 GB).

### Passo 1.2 — Installa
1. Apri il file `.exe` scaricato.
2. Premi **Next** a ogni schermata, lascia tutte le opzioni di default.
3. Quando ti chiede dove installare, **lascia il percorso proposto**.
4. Aspetta che finisca, poi premi **Finish**.

### Passo 1.3 — Primo avvio (setup wizard)
Si apre Android Studio per la prima volta. Ti fa un "wizard" di configurazione:

1. **Welcome** → Next
2. **Install Type** → scegli **Standard** → Next
3. **Select UI Theme** → scegli quello che preferisci (Light / Dark) → Next
4. **Verify Settings** → Next
5. **License Agreement** → seleziona ogni licenza nella lista a sinistra e clicca **Accept** per ciascuna → Finish

Ora Android Studio scarica i componenti necessari (SDK, emulatore, ecc.).

> ⏱ **Questo passaggio può durare 10-30 minuti.** Lascialo lavorare, non chiudere la finestra.

Quando finisce, premi **Finish**.

---

## Parte 2 — Aprire il progetto

### Passo 2.1 — Apri la cartella del progetto
1. Nella schermata di benvenuto di Android Studio clicca **Open** (o **Open an Existing Project**).
2. Naviga fino a: `C:\Users\GB547KZ\OneDrive - EY\Desktop\Test app`
3. Selezionala (la cartella, non un file dentro) → **OK**.

### Passo 2.2 — Aspetta il "Gradle sync"
Appena aperto il progetto, in basso vedi una barra di progresso con scritte come "Gradle sync", "Downloading…", "Indexing…".

> ⏱ **La prima volta dura 5-15 minuti.** Sta scaricando le librerie del progetto.

Hai finito quando:
- la barra in basso sparisce, oppure
- compare la scritta **"Gradle sync finished"** o **"BUILD SUCCESSFUL"**.

### Passo 2.3 — Se compare il pop-up "Trust Project"
Clicca **Trust Project**.

### Passo 2.4 — Se chiede di aggiornare Gradle / AGP
Clicca **Don't ask again for this project** se compare, oppure semplicemente **Update** se te lo propone. Lascia che faccia.

---

## Parte 3 — Creare l'emulatore (telefono virtuale)

### Passo 3.1 — Apri il Device Manager
In alto, menu **Tools** → **Device Manager**.

Si apre un pannello a destra. Se non vedi nessun device, clicca il bottone **+** (o **Create Device** / **Create Virtual Device**).

### Passo 3.2 — Scegli un modello di telefono
1. Nella lista a sinistra scegli **Phone**.
2. Nella lista al centro scegli **Pixel 7** (o Pixel 6, va bene uguale).
3. Premi **Next**.

### Passo 3.3 — Scegli la versione di Android
1. Compare una lista di "system image". Cerca **API 34** (oppure 33, 35 — l'importante è che sia recente).
2. Accanto al nome c'è probabilmente l'icona **Download** (una freccina): cliccala.
3. Accetta la licenza → **Next** → **Finish**. Parte il download (~1-2 GB).

> ⏱ **5-15 minuti**, dipende dalla connessione.

4. Quando il download finisce, **seleziona** quella riga e premi **Next**.

### Passo 3.4 — Conferma
1. Lascia il nome che propone (es. "Pixel 7 API 34").
2. Premi **Finish**.

Ora vedi il tuo emulatore nella lista del Device Manager.

---

## Parte 4 — Avviare l'app sull'emulatore

### Passo 4.1 — Avvia l'emulatore
Nel Device Manager, accanto al tuo telefono virtuale, clicca l'icona ▶ (play).

> ⏱ La prima accensione dura **1-3 minuti**. Vedi il logo Android e poi la schermata home, come un telefono vero.

### Passo 4.2 — Avvia l'app
1. In alto in Android Studio, accanto al pulsante ▶ verde, c'è un menu a tendina con il nome del device. Verifica che sia selezionato il tuo emulatore (es. "Pixel 7 API 34").
2. A sinistra di quel menu c'è scritto **app**. Lascialo così.
3. Clicca il pulsante ▶ verde (oppure premi **Shift + F10**).

> ⏱ La prima compilazione dura **2-5 minuti**. Le successive sono molto più veloci.

In basso compaiono i log della compilazione (pannello "Build"). Aspetta che finisca.

### Passo 4.3 — Vedi l'app girare!
Quando la build finisce, l'emulatore passa automaticamente in primo piano e mostra la tua app **Stock Signals** già aperta.

Se non si apre da sola, sull'emulatore vai nel menu app e cerca **Stock Signals** (o il nome che vedi nell'icona) e toccala.

---

## Parte 5 — Usare l'app

L'app carica le quotazioni da **Yahoo Finance** (a differenza della versione web, qui **non ci sono problemi di CORS**).

Cosa puoi fare:
- Vedere la lista dei titoli con prezzo, variazione % e segnale BUY/SELL/HOLD.
- Toccare un titolo per vedere il dettaglio (RSI, medie mobili, mini-grafico).
- Toccare il pulsante **+** per aggiungere titoli.
- Tirare giù la lista per fare refresh.

> Se vedi errori di rete: l'emulatore usa la connessione del PC. Verifica che il PC sia online.

---

## Parte 6 — Installare l'app sul tuo telefono fisico

Una volta che funziona sull'emulatore, puoi installarla anche sul tuo telefono Android vero. **Ti serve un cavo USB.**

### Passo 6.1 — Attiva le "Opzioni sviluppatore" sul telefono
1. Sul telefono: **Impostazioni** → **Info sul telefono** (a volte è dentro "Sistema").
2. Cerca la voce **Numero build** (o "Versione build").
3. **Toccala 7 volte di fila.** Dopo qualche tocco compare "ancora X tocchi per diventare sviluppatore".
4. Compare il messaggio "Sei uno sviluppatore!" ✅

### Passo 6.2 — Attiva il Debug USB
1. **Impostazioni** → **Sistema** → **Opzioni sviluppatore** (oppure cerca "sviluppatore" nella barra di ricerca delle impostazioni).
2. Attiva l'interruttore **Debug USB**.
3. Conferma con OK al popup.

### Passo 6.3 — Collega il telefono al PC
1. Collega il telefono al PC con un cavo USB (uno **dati**, non solo ricarica — se non funziona prova un altro cavo).
2. Sul telefono compare un popup: **"Consentire il debug USB?"** → spunta "Consenti sempre da questo computer" → **OK**.

### Passo 6.4 — Verifica che Android Studio lo veda
1. Torna su Android Studio.
2. Nel menu a tendina dei device (in alto, accanto al ▶) ora dovresti vedere anche il tuo telefono reale (es. "Samsung SM-A536B").
3. Selezionalo al posto dell'emulatore.

### Passo 6.5 — Installa l'app sul telefono
1. Premi ▶ (Run).
2. Aspetta la compilazione e l'installazione.
3. Sul telefono si apre automaticamente la tua app **Stock Signals**.

🎉 **Fatto!** L'app è installata sul telefono. Anche scollegando il cavo USB, l'app resta installata e puoi aprirla quando vuoi dal menu app.

### Bonus: aggiornare l'app dopo modifiche al codice
Ogni volta che cambi il codice, basta:
1. Collegare il telefono via USB.
2. Premere ▶ in Android Studio.

L'app si re-installa con le modifiche, senza dover disinstallare la vecchia.

---

## Risoluzione problemi comuni

### "SDK location not found" / "Please configure Android SDK"
- Menu **File** → **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**.
- Verifica che ci sia un percorso (di solito `C:\Users\GB547KZ\AppData\Local\Android\Sdk`).
- Se manca, clicca **Edit** e fai installare lo SDK.

### Gradle sync fallisce
- Menu **File** → **Invalidate Caches** → **Invalidate and Restart**.
- Riapri il progetto. Riprova.

### "HAXM installation failed" / l'emulatore non parte
1. Riavvia il PC ed entra nel BIOS (di solito tasto F2, F10 o Del all'avvio).
2. Cerca la voce **Virtualization Technology** / **VT-x** / **AMD-V** → attivala.
3. Salva ed esci.
4. Se sei su Windows 11: in alternativa puoi usare **Windows Hypervisor Platform** (apri "Attiva o disattiva funzionalità Windows" e attivalo).

### L'emulatore è troppo lento
- Crea un device con meno RAM (in Device Manager → matita → Advanced settings → riduci RAM a 1536 MB).
- Oppure usa direttamente il telefono fisico (Parte 6), è sempre più veloce.

### Il telefono non viene riconosciuto via USB
1. Prova un altro cavo USB (alcuni sono solo per ricarica).
2. Sul telefono cambia la modalità USB da "Solo ricarica" a **"Trasferimento file (MTP)"** (compare nelle notifiche quando colleghi).
3. Su Windows, installa i driver del produttore (Samsung, Xiaomi, ecc.) se necessario.

### Errore "App not installed" sul telefono
- Disinstalla prima la vecchia versione dal telefono, poi reinstalla da Android Studio.

### L'app crasha all'avvio
- In Android Studio in basso, apri il pannello **Logcat**.
- Filtra per il nome dell'app (in alto c'è un menu a tendina con i process).
- Copia le righe rosse e mandamele: ti dico cosa correggere.

### Non vedi nessun dato nell'app
- Controlla la connessione internet del PC (per l'emulatore) o del telefono.
- Yahoo Finance a volte blocca temporaneamente: aspetta 1-2 minuti e fai refresh.

---

## Quando hai bisogno di me

Fammi sapere:
- A quale **passo** sei arrivato.
- Cosa **vedi sullo schermo** (anche uno screenshot va bene se puoi).
- Se compare un **errore**, copia il testo esatto.

Buon lavoro 🚀

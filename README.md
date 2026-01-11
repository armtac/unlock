# UNLOCK - Frontend Prototype

**Sblocca il tuo prossimo passo** - Un'app stile Uber per consulenze rapide e mirate.

## 🎯 Concept

UNLOCK non fa consulenza completa: ti sblocca il dubbio e ti porta al prossimo passo in 20 minuti. Nessun backend, nessun pagamento reale, tutto funziona in locale con localStorage.

## 🚀 Quick Start

```bash
# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
```

Apri il browser su `http://localhost:5173`

## 📱 Features

### Funzionalità Principali
- ✅ **Onboarding**: Selezione lingua e profilo utente
- ✅ **Home Uber-like**: Mappa interattiva + bottom sheet per inserire il dubbio
- ✅ **Intake**: Analisi automatica del bisogno e classificazione in categorie
- ✅ **Matching**: Ricerca e selezione del consulente perfetto
- ✅ **Call**: Video call Jitsi embed con timer 20 minuti + note + concierge routing
- ✅ **Summary**: Next steps generati automaticamente
- ✅ **Rating**: Valutazione consulente con stelle e tag
- ✅ **My Unlocks**: Storico sessioni salvate
- ✅ **Plans**: Visualizzazione piani Basic/Premium (solo UI)

### Tecnologie
- **React 19** + **Vite** (Rolldown)
- **TailwindCSS** per lo styling
- **React Router** per il routing
- **Zustand** per lo state management con persist
- **Leaflet + OpenStreetMap** per le mappe (no API key)
- **Jitsi Meet** pubblico per le video call (no registrazione)

## 🗺️ Routing

| Route | Descrizione |
|-------|-------------|
| `/onboarding` | Setup iniziale: lingua e profilo |
| `/home` | Mappa + input dubbio + urgenza |
| `/intake` | Analisi e classificazione (3-5s) |
| `/matching` | Ricerca consulente (5-12s) |
| `/call` | Video call 20 min con Jitsi |
| `/summary` | Next steps + salvataggio |
| `/rate` | Valutazione consulente |
| `/my-unlocks` | Storico sessioni |
| `/plans` | Piani Basic/Premium |

## 👥 Consulenti Pre-caricati

Il prototipo include 4 consulenti reali + 16 mock:

1. **Camillo Di Giulio** - Procurement Director (Procurement, Manufacturing)
2. **Gaetano Di Corinto** - HR Director (HR, Leadership)
3. **Giustino Obletter** - CFO (Finance, Leadership)
4. **Armando Tacconelli** - Head of Finance IT & Transformation (Finance IT, Manufacturing)

## 🧠 Matching Logic

Il matching avviene **client-side** con questo algoritmo:

1. Analisi keyword nel testo utente
2. Classificazione in categoria (Procurement, HR, Finance, Finance IT, Leadership, Sales, Manufacturing)
3. Filtro consulenti per categoria + lingua
4. Ranking: se keyword "senior" (CFO, business case, etc.) → preferenza Senior
5. Ordinamento per rating
6. Fallback su consulenti generalist se nessun match

## 📞 Call con Jitsi

- **Room name**: generato automaticamente `unlock-{random}-{timestamp}`
- **Timer**: gestito dall'app (countdown 20:00)
- **Concierge routing**: 
  - Bottone "Copy invite" per copiare link + messaggio
  - Bottone "Share" con Web Share API
  - Testo: "Ciao {Nome}, puoi entrare ora nella call UNLOCK? Link: {jitsi_url}"
- **Note**: salvate in localStorage durante la call

## 💾 LocalStorage

Tutto lo stato è persistito in localStorage tramite Zustand persist:

- Preferenze utente (lingua, profilo, piano)
- Sessione corrente (query, categoria, consulente, note)
- Storico sessioni complete con rating e next steps

## 💰 Piani (Solo UI)

### BASIC - 14,99€/mese
- Call illimitate da 20 minuti
- Junior/Mid: 20€ (payout 12€)
- Senior: 40€ (payout 24€)

### PREMIUM - 29,99€/mese
- Tutto di Basic + tariffe ridotte
- Junior/Mid: 16€ (payout 12€)
- Senior: 32€ (payout 24€)

**Nota**: Nessun pagamento reale, solo selezione salvata in localStorage.

## 🎨 Design

- **Mobile-first** responsive
- **Uber-like**: mappa sempre presente, bottom sheet, card consulente
- **Animazioni**: loading, skeleton, slide up, pulse
- **Color scheme**: Primary blue (#0ea5e9) + gradients

## 📁 Struttura Progetto

```
src/
├── data/
│   └── consultants.json      # 20 consulenti (4 reali + 16 mock)
├── pages/
│   ├── Onboarding.jsx
│   ├── Home.jsx
│   ├── Intake.jsx
│   ├── Matching.jsx
│   ├── Call.jsx
│   ├── Summary.jsx
│   ├── Rate.jsx
│   ├── MyUnlocks.jsx
│   └── Plans.jsx
├── store/
│   └── useStore.js            # Zustand store con persist
├── utils/
│   └── matching.js            # Logica matching e next steps
├── App.jsx                    # Router setup
├── main.jsx
└── index.css                  # Tailwind + custom styles
```

## 🔧 Build

```bash
npm run build
npm run preview
```

## ⚠️ Note Importanti

- **Nessun backend**: tutto client-side
- **Nessuna API key**: OpenStreetMap è gratuito, Jitsi è pubblico
- **Nessuna autenticazione**: accesso diretto
- **Prototipo**: i pagamenti sono solo UI, nessuna transazione reale
- **Call gratis**: Jitsi meet.jit.si è pubblico e gratuito

## 🎯 User Flow Completo

1. **Onboarding**: Scegli lingua (IT/EN/ES) + profilo (Manager/Founder/Startup/Altro)
2. **Home**: Inserisci il tuo dubbio + urgenza (Ora/Oggi/Questa settimana)
3. **Intake**: L'app analizza e classifica (3-5s)
4. **Matching**: Trova il consulente perfetto (5-12s)
5. **Call**: 20 minuti di video call con timer + note + invite link
6. **Summary**: Ricevi 3 next steps concreti
7. **Rate**: Valuta con stelle + tag + note
8. **My Unlocks**: Rivedi tutte le tue sessioni

## 📝 License

Prototipo frontend - Solo a scopo dimostrativo

# Klarwert-Website – Redesign v3 (korrigierte Repo-Referenz, verbindliche Verifikation)

Dieser Prompt ist bewusst vollständig ausformuliert – Copy-Texte, Farben, Struktur, Assets sind fertig. Nicht umformulieren, nicht neu gestalten, nicht nach Alternativen suchen. Bei echten technischen Zwängen (siehe "Wenn etwas nicht geht" unten) im Rahmen der genannten Leitplanken selbst entscheiden, nicht nachfragen.

## Was beim letzten Versuch schiefging – nicht wiederholen

Ein vorheriger Durchlauf (schwächeres Modell) hat nur den Text-/Navigations-Layer umgesetzt und praktisch den gesamten visuellen Auftrag ausgelassen: keine Glass Cards, kein Notebook-Mockup, keine Floating-/Scroll-Animationen, kein Datenfluss-Motiv, keine GitHub-Stats, Logo weiterhin kaputt, Astro-Standard-Favicon/Titel nie ersetzt. Wahrscheinliche Hauptursache: der Prompt verlangte, Tailwind CSS **vollständig zu entfernen** – ein großer, riskanter Eingriff in ein bereits funktionierendes Styling-System, den ein schwächeres Modell nur teilweise und fehlerhaft ausgeführt hat, wodurch fast der gesamte bestehende Stil verloren ging, ohne dass der Ersatz vollständig aufgebaut wurde. **Diese Anweisung ist unten korrigiert: Tailwind bleibt erhalten.**

## Repo & Ausgangslage (korrigiert)

- **Website-Repo:** `https://github.com/Klarwert/klarwert.github.io` – eigene GitHub-Organisation "Klarwert", **nicht** der AnselmJo-Account. Repo-Name-Konvention `<owner>.github.io` bedeutet Root-Domain-Deploy: `astro.config.mjs` braucht `site: 'https://klarwert.github.io'` **ohne** `base`-Pfad.
- **App-Repo (Referenz für Screenshots/Feature-Fakten):** `https://github.com/AnselmJo/Klarwert`.
- **Zuerst lesen:** `AGENTS.md` und `CLAUDE.md` im Website-Repo – falls dort Konventionen zu Ordnerstruktur/Namensgebung stehen, haben die Vorrang vor Annahmen in diesem Dokument.
- **Bestehende Struktur laut Repo-README, nicht neu erfinden:** Astro + **Tailwind CSS** (bereits im Einsatz, bleibt), vier Seiten (`Startseite` + `Windows`/`macOS`/`Linux`-Unterseiten), eine vorhandene Download-Button-Komponente mit clientseitiger OS-Erkennung in `src/components/`, zentrale Repo-Referenzen in `src/lib/repo.ts`. Dieses Redesign betrifft die **Startseite** (Hero, Trust-Leiste, Features, So-funktioniert's, Screenshots, FAQ, Footer) – die drei OS-Unterseiten bleiben inhaltlich unverändert, bekommen nur denselben Header/Footer wie die Startseite.
- **Primär-CTA "Jetzt herunterladen" im Hero:** die vorhandene OS-Erkennungs-Komponente wiederverwenden (nicht neu bauen) – zeigt einen großen Button für das erkannte Betriebssystem, darunter ein kleiner Link "Andere Systeme" zu den zwei übrigen. Falls die vorhandene Komponente das nicht leistet: einfache Erkennung über `navigator.userAgent`, Fallback ohne JS = alle drei Optionen sichtbar.
- **Nebenbei, niedrige Priorität:** `Klarwert/klarwert.github.io` hat GPL-3.0 als Lizenz, das App-Repo MIT – für Konsistenz auf MIT ändern, aber nicht falls das den Hauptauftrag verzögert.

**Sofort-Fixes, vor allem anderen, mit Beweis abschließen (siehe Definition of Done):**
1. Logo-Bildlink reparieren (war zuletzt weiterhin kaputt).
2. Browser-Tab-Titel und Favicon ersetzen – aktuell noch Astro-Standard-Icon/Titel, das allein zeigt, dass die Projekt-Konfiguration nie angefasst wurde.

## Definition of Done – jeden Punkt einzeln mit Beleg bestätigen

Nach Abschluss für **jeden** der folgenden Punkte explizit angeben, wo im Code er umgesetzt ist (Datei + kurzer Auszug), nicht nur "erledigt" behaupten. Ein Ergebnis, das nur Fließtext und eine Navigationsleiste zeigt, aber keinen der folgenden Punkte, gilt als **nicht umgesetzt** – unabhängig davon, ob `npm run build` fehlerfrei durchläuft:

- [ ] Logo lädt sichtbar (kein gebrochenes Bild-Icon)
- [ ] Browser-Tab zeigt Klarwert-Favicon + korrekten Titel, nicht Astro-Standard
- [ ] Hero: SVG-Notebook-Mockup mit `klarwert-dashboard-dummy.svg` sichtbar
- [ ] Hero: mindestens 2 der 3 `.glass-card`-Elemente sichtbar mit erkennbarem Blur-Effekt (visuell prüfen, `backdrop-filter` kann in manchen Dev-Umgebungen ohne GPU-Beschleunigung schwach wirken – Code-Vorhandensein zählt)
- [ ] Floating-Animation der Glass Cards läuft (im Browser beobachten, nicht nur Code lesen)
- [ ] Datenfluss-SVG-Linien mit wanderndem Punkt sichtbar (Hero + So-funktioniert's)
- [ ] Feature-Karten als `.glass-card`, nicht als reine Textliste
- [ ] FAQ ist ein funktionierendes Accordion (klickbar, animiert auf/zu)
- [ ] Footer zeigt echte GitHub-Zahlen (Stars/Release/Commit), nicht Platzhaltertext
- [ ] `prefers-reduced-motion` tatsächlich getestet (System-Einstellung umschalten, nicht nur Media Query im Code vorhanden)

## Design-Tokens (exakt diese Werte, keine Interpretation)

```css
--petrol: #123138;       /* primär, Sidebar-äquivalent, Buttons */
--petrol-light: #1d4750; /* Verläufe, sekundäre Akzente */
--charcoal: #262321;     /* Fließtext */
--brick: #b6503a;        /* negativ/Warnung */
--sage: #6f9a6d;         /* positiv/Erfolg */
--gold: #b79a5b;         /* dritter Akzent */
--slate: #6b7a80;        /* neutral */
--paper: #f3efe4;        /* Seitenhintergrund */
--card: #fffdf8;         /* Flächen */
--radius-lg: 16px; --radius-sm: 8px; --radius-pill: 20px;
--font-serif: 'Fraunces', Georgia, serif;   /* Headlines, Google Fonts (500) */
--font-sans: 'Inter', -apple-system, sans-serif; /* Fließtext/UI, 400/500/600/700 */
--font-mono: 'IBM Plex Mono', Consolas, monospace; /* JEDER Geldbetrag/Prozentwert */
```

Google Fonts: Fraunces (500), Inter (400/500/600/700), IBM Plex Mono (400/500) – per `<link>` im Astro-Layout einbinden, `font-display: swap`.

**Tailwind bleibt erhalten.** Die Werte oben zusätzlich in `tailwind.config.mjs` unter `theme.extend` eintragen, damit sie als Utility-Klassen nutzbar sind (`bg-petrol`, `text-slate`, `font-serif`, `rounded-lg` etc.):

```js
// tailwind.config.mjs, theme.extend ergänzen (bestehende Config nicht überschreiben)
colors: {
  petrol: '#123138', 'petrol-light': '#1d4750', charcoal: '#262321',
  brick: '#b6503a', sage: '#6f9a6d', gold: '#b79a5b', slate: '#6b7a80',
  paper: '#f3efe4', card: '#fffdf8',
},
fontFamily: {
  serif: ['Fraunces', 'Georgia', 'serif'],
  sans: ['Inter', '-apple-system', 'sans-serif'],
  mono: ['"IBM Plex Mono"', 'Consolas', 'monospace'],
},
```

Die CSS-Variablen (`:root { --petrol: ...; }`) zusätzlich in einer kleinen `src/styles/tokens.css` anlegen – für die Dinge, die Tailwind-Utilities nicht abdecken (Keyframes, `backdrop-filter`-Kombination in `.glass-card`, SVG-`stroke`-Werte). Beide Systeme koexistieren, keins ersetzt das andere.

## Design-Sprache: "Warmes Glas"

Apples durchscheinende Ebenen-Optik, übersetzt in Klarwerts warme Töne statt Apples Kühl-Palette. Verbindliches Karten-Muster, überall verwendet (Hero-Karten, Feature-Karten, FAQ-Panels – nicht nur im Hero):

```css
.glass-card {
  background: rgba(255, 253, 248, 0.62);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(18, 49, 56, 0.10);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(18, 49, 56, 0.08);
}
```

Maximal 3 gleichzeitig sichtbare `backdrop-filter`-Ebenen pro Viewport (Performance, siehe unten) – zusätzliche dekorative Flächen im Hintergrund ohne Blur lösen, nur mit Transparenz/Farbe.

## Assets (fertig, liegen bereit – nicht neu erzeugen)

- `assets/klarwert-dashboard-dummy.svg` + `.png` + `@2x.png` – Dummy-Screenshot der Übersichtsseite (Sankey-Geldfluss, Donut-Kategorien, KPI-Karten, Transaktionsliste, mit den Design-Tokens oben gebaut). Verwenden für: Hero-Screenshot, Screenshots-Sektion. Deutlich als vorläufig markieren im HTML-Kommentar (`<!-- Platzhalter, ersetzen sobald echte Screenshots vorliegen -->`), aber **nicht** visuell als "Platzhalter" kennzeichnen (kein Wasserzeichen, kein "Demo"-Stempel) – soll wie ein echter Screenshot wirken.
- Logo: `klarwert-logo.svg`, bereits im Repo (Bugfix siehe oben).

## Hero

Volle Bildschirmhöhe (`min-height: 100vh`). Zweispaltig, Headline links, Notebook-Mockup rechts.

**Hintergrund:** `--paper`, plus zwei sehr dezente radiale Verläufe (`radial-gradient`, je < 8 % Deckkraft): Petrol-Ton oben rechts, Gold-Ton unten links. Kein sichtbares Raster.

**Copy (exakt, nicht umformulieren):**

```
Headline (Fraunces 500, --charcoal, max. 2 Zeilen):
"Klarheit über dein Geld.
Bleibt bei dir – sonst nirgends."

Subhead (Inter 400, --slate, darunter):
"Die kostenlose, lokale Finanz-App für Deutschland. CSV-Import,
automatische Kategorisierung, Budgets und Steuer-Vorbereitung –
ohne Cloud, ohne Abo, ohne Konto."

Primär-CTA (gefüllt, --petrol Hintergrund, --paper Text):
"Jetzt herunterladen"

Sekundär-CTA (Ghost, --petrol Rand + Text):
"Quellcode ansehen"

Vertrauenszeile (klein, --slate, direkt unter den Buttons):
"Kostenlos für immer. Kein Konto, keine Cloud, kein Abo."
```

**Rechts:** schlanker SVG-Notebook-Rahmen (selbst bauen, kein Foto-Bezel – Charcoal/Petrol-Töne, ca. 8–10px Randstärke, leicht abgerundete Ecken), Bildschirminhalt = `klarwert-dashboard-dummy.svg`, nimmt ca. 70 % der Hero-Fläche ein. Davor/darüber ragend: **drei `.glass-card`-Elemente**, Inhalt und Position exakt:

```
Karte 1 "Budget" (oben links, leicht über den Notebook-Rand ragend):
  Label "Budget Lebensmittel" (--slate, 12px)
  Wert "312 € / 400 €" (--font-mono, --charcoal, 20px)
  Fortschrittsbalken 78%, Füllfarbe --sage

Karte 2 "Kontostand" (mittig rechts, leicht versetzt):
  Label "Kontostand gesamt" (--slate, 12px)
  Wert "24.180 €" (--font-mono, --petrol, 22px)
  Delta "+2,4 %" (--sage, 12px)

Karte 3 "Monatsübersicht" (unten links, teilweise unter dem Notebook):
  Label "Ausgaben August" (--slate, 12px)
  Wert "2.180 €" (--font-mono, --brick, 20px)
  kleiner Mini-Donut (3 Segmente, --slate/--gold/--sage) daneben, 32px Durchmesser
```

Floating-Animation: jede Karte eigene Dauer (6s/8s/10s) und Phase, ausschließlich `transform: translateY(±6px)` + `opacity`, `ease-in-out`, `infinite alternate`. Nie `filter`/`top`/`left` animieren.

## Datenfluss-Motiv (durchgängig, dreimal verwendet)

Dünne, halbtransparente SVG-Pfade in `--petrol`/`--gold` (1px, `opacity: 0.35`), mit einem kleinen Punkt, der per `stroke-dasharray`/`stroke-dashoffset`-CSS-Animation entlang des Pfads wandert (`animation: flow 4s linear infinite`, Punkt als `<circle>` mit `offset-path` auf denselben Pfad, `offset-distance` animiert 0%→100%). Kein JS für die Bewegung selbst.

Einsatzorte:
1. **Hero:** von einem kleinen Bank-/CSV-Symbol (einfaches Icon, links außen im Hero) durch die drei Glass-Karten ins Notebook.
2. **"So funktioniert's"-Sektion** (siehe unten): zwischen den drei Schritt-Karten.
3. Im Dummy-Screenshot selbst bereits enthalten (Sankey-Diagramm) – bewusste Wiederholung des Motivs zwischen Marketing-Chrome und echtem Produkt-UI.

`@media (prefers-reduced-motion: reduce)`: Punkt-Animation stoppen, Linien bleiben statisch sichtbar.

## Trust-Leiste (direkt unter dem Hero, schmaler Streifen)

Vier Punkte, Icons aus Lucide, Text exakt:

```
✓ 100 % lokal – keine Cloud-Speicherung deiner Finanzdaten
✓ Keine Kontodaten an Dritte – Import per CSV/Excel, keine Bankverbindung
✓ Open Source – der komplette Code ist einsehbar
✓ Kostenlos – für immer, keine Abos, keine Werbung
```

## Features (maximal 6 Karten, `.glass-card`, Lucide-Icon + Titel + Text, exakt)

```
1. Icon: upload | Import & Kategorisierung
   "CSV oder Excel rein, Ordnung raus. Klarwert erkennt Händler und
   Kategorien automatisch – lernt dabei aus deinen eigenen Korrekturen."

2. Icon: repeat | Verträge & Wiederkehrendes
   "Alle Abos und Daueraufträge an einem Ort. Klarwert erkennt
   wiederkehrende Zahlungen automatisch aus deinen Buchungen."

3. Icon: piggy-bank | Sparen nach Zweck
   "Ob Rücklage, Urlaub oder Depot – jedes Sparziel sichtbar,
   mit echtem Fortschritt statt vager Vorsätze."

4. Icon: gauge | Budgets
   "Grenzen setzen, die du auch einhältst – weil du sie siehst,
   bevor der Monat vorbei ist."

5. Icon: file-text | Steuer-Vorbereitung
   "Die Belege für deinen Steuerberater, schon sortiert.
   Kein Ordner-Chaos im März."

6. Icon: calculator | Finanz-Rechner
   "FIRE, Zinseszins, Entnahmeplan – rechne durch, was dein Geld
   in 10, 20, 30 Jahren für dich tun kann."
```

Hover: `translateY(-2px)` + Schatten-Intensität leicht erhöht, keine Farbänderung.

## "So funktioniert's" (3 Schritte, verbunden durch das Datenfluss-Motiv)

```
1. CSV oder Excel exportieren
   "Aus deinem Online-Banking, in ein paar Klicks. Klarwert liest
   die gängigen deutschen Bankformate."

2. Automatisch einordnen lassen
   "Klarwert erkennt Händler, Kategorien und wiederkehrende Zahlungen –
   lokal, ohne dass irgendwas dein Gerät verlässt."

3. Alles auf einen Blick sehen
   "Konten, Budgets, Sparziele und Steuer-Unterlagen – ein Überblick
   statt zehn Excel-Tabellen."
```

## Screenshots-Sektion

Überschrift: "So sieht Klarwert aus". `klarwert-dashboard-dummy.svg` groß, im selben SVG-Notebook-Rahmen wie im Hero (Komponente wiederverwenden). Kein Smartphone-Rahmen.

## FAQ (Accordion, exakter Inhalt)

```
Ist Klarwert wirklich kostenlos?
"Ja, vollständig und für immer. Kein Abo, keine Pro-Version,
keine versteckten Kosten. Klarwert ist Open Source und bleibt es."

Wo werden meine Daten gespeichert?
"Ausschließlich auf deinem Gerät, in einer lokalen Datenbank.
Klarwert hat keine Cloud, keinen Server und kein Login."

Verbindet sich Klarwert mit meiner Bank?
"Nein, bewusst nicht. Du exportierst deine Umsätze als CSV oder Excel
aus deinem Online-Banking und importierst sie manuell – so bleibt die
Kontrolle bei dir, ohne dass du Bankzugangsdaten irgendwo hinterlegst."

Für welche Betriebssysteme gibt es Klarwert?
"Windows, macOS und Linux."

Ist der Code einsehbar?
"Ja, vollständig. Klarwert ist Open Source – du kannst jede Zeile
Code auf GitHub nachlesen."

Unterstützt Klarwert andere Sprachen als Deutsch?
"Aktuell ist Klarwert bewusst auf den deutschen Finanz- und
Steuerkontext ausgelegt. Weitere Sprachen sind vorbereitet,
aber noch nicht aktiv."
```

Toggle: Höhe/Opacity-Transition per CSS, minimales Vanilla-JS nur für den offen/geschlossen-State.

## Footer

Tagline: "Klarwert – deine Finanzen, ganz bei dir." Darunter: Lizenz-Hinweis (MIT), Links zu Issues/Discussions (bestehende Templates wiederverwenden).

**GitHub-Daten (Version, letzter Release, letzter Commit, Stars, Contributors):** Abruf **zur Build-Zeit** in Astro (`fetch` innerhalb der Astro-Komponente, läuft während `astro build` in der bestehenden GitHub Action), Ausgabe als statisches HTML. **Kein Client-seitiger Fetch** – sonst Verstoß gegen "kein unnötiges JavaScript" und Risiko des GitHub-API-Rate-Limits (60 Anfragen/Std./IP unauthentifiziert) bei echtem Besucherverkehr. Werte aktualisieren sich beim nächsten Deploy, nicht live – für diese Kennzahlen unproblematisch.

## Scroll-Animationen (allgemein)

IntersectionObserver + CSS-Transition, kein Scroll-Framework:
- Sections: `translateY(40px) → 0`, `opacity 0 → 1` beim Eintritt in den Viewport.
- Zahlen (Trust-Leiste, KPI-Beispiele): Counter-Animation per `requestAnimationFrame`, keine Library.

## Performance & Accessibility (verbindlich)

- Lighthouse-Ziel > 98. Nur `transform`/`opacity` animieren, nie `filter`/`top`/`left`.
- Maximal 3 gleichzeitige `backdrop-filter`-Ebenen im Viewport.
- SVG statt PNG für Rahmen/Icons wo möglich.
- `@media (prefers-reduced-motion: reduce)`: alle Floating-/Scroll-/Linien-Animationen deaktivieren oder auf Endzustand springen, Inhalt bleibt vollständig sichtbar.
- Desktop-optimiert (kein Anspruch auf Mobile), aber kein hartes Layout-Kollabieren unter ~1280px.
- Kein GSAP, keine zusätzliche Animations-Library.

## Wenn etwas nicht geht

Nur bei echtem technischen Blocker (z. B. `offset-path` in Zielbrowsern nicht unterstützt) selbst eine gleichwertige CSS-only-Lösung wählen und kurz im Commit-Message begründen – nicht nachfragen, nicht das Feature weglassen.

## Vorab geklärte Fragen (nicht nochmal aufwerfen)

- **Styling:** Tailwind **behalten**, Design-Tokens zusätzlich in `tailwind.config.mjs` + `src/styles/tokens.css` (siehe oben) – siehe Korrektur ganz oben im Dokument, das war beim letzten Versuch andersrum falsch spezifiziert.
- **Assets:** keine weiteren Platzhalterbilder generieren, nur die drei `klarwert-dashboard-dummy.*`-Dateien verwenden.
- **Deploy:** bestehenden Workflow im Repo `Klarwert/klarwert.github.io` unverändert weiterverwenden, nicht neu aufsetzen – nur sicherstellen, dass neue Assets/Pfade damit kompatibel sind.
- **Navigation:** schlanker Sticky-Header – Logo links, Anchor-Links "Funktionen" / "So funktioniert's" / "FAQ" mittig, GitHub-Icon-Link + kompakter "Herunterladen"-Button rechts. Transparent, bekommt erst beim Scrollen den `.glass-card`-Blur-Effekt (`backdrop-filter` erst ab `scrollY > 40px` per kleinem Scroll-Listener oder CSS `@scroll-timeline`, falls unterstützt). Gilt nur für die Startseite; die drei OS-Unterseiten bekommen denselben Header/Footer, aber keine eigene Hero-Umsetzung.
- **Internationalisierung:** nicht vorbereiten, ausschließlich Deutsch für den Launch.
- **GitHub-Daten:** natives `fetch()` in einer Astro-Komponente zur Build-Zeit, keine `node-fetch`-Dependency. Kein API-Token nötig (öffentliche Endpunkte, unauthentifiziertes Rate-Limit reicht für einen Build-Lauf pro Deploy).
- **Reduced Motion:** ausschließlich über `@media (prefers-reduced-motion: reduce)`, kein JS-Klassen-Toggle.

## Zusatz: Schreibmaschinen-Effekt (gezielt, nicht im Headline)

Direkt unter dem Subhead im Hero, kleines Element in `--font-mono`, 13px, `--slate`-Vorlabel + `--petrol`-Wert: rotiert per Vanilla-JS (kein Typed.js, ca. 20 Zeilen: Array von Strings, `setInterval`-getriebene Tipp-/Löschanimation über `textContent`) durch echte Kategorisierungs-Beispiele:

```
Miete → Wohnen
Netflix → Freizeit
Rewe → Lebensmittel
Sparplan → Sparen
```

Zeigt das Kern-Feature (automatische Kategorisierung) statt nur zu dekorieren. Bei `prefers-reduced-motion: reduce`: Animation stoppen, erstes Beispiel statisch anzeigen. Bewusst **nicht** im Haupt-Headline verwenden – der feste, einzelne Satz dort ist Teil der ruhig-selbstbewussten Wirkung.

## Abschluss-Check

1. `npm run build` fehlerfrei, `npm run dev` starten, jeden Punkt aus "Definition of Done" oben **im Browser** einzeln durchgehen – nicht nur im Code nachlesen.
2. Screenshot der neuen Seite neben `assets/klarwert-dashboard-dummy.png` halten – wirkt es erkennbar wie dieselbe Marke? Falls nicht: zuerst Petrol/Papier/Fraunces/Mono-Verhältnis prüfen, bevor an der Struktur weitergearbeitet wird.
3. Abschlussbericht enthält für jeden Punkt der Definition of Done eine explizite Zeile "erledigt, siehe [Datei:Zeile]" – ein Bericht ohne diese Zuordnung gilt als unvollständig.

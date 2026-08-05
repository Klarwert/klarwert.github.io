# Klarwert Website

Statische Marketing-/Download-Website für [Klarwert](https://github.com/Klarwert/Klarwert) – gebaut mit [Astro](https://astro.build) + Tailwind CSS, deployt automatisch nach GitHub Pages.

## Entwicklung

```sh
npm install
npm run dev      # Entwicklungsserver mit Hot-Reload
npm run build    # Produktions-Build nach ./dist
npm run preview  # Build lokal ansehen
```

## Struktur

- `src/pages/` – Startseite, `/download` (vollständige Windows/macOS/Linux-Inhalte), `/datenschutz`, sowie `/windows` `/macos` `/linux` als schlanke Redirects auf die jeweilige `/download`-Sektion
- `src/layouts/Layout.astro` – gemeinsames HTML-Grundgerüst inkl. Header/Footer
- `src/components/` – Footer, Download-Buttons (mit clientseitiger OS-Erkennung)
- `src/lib/repo.ts` – zentrale Repo-Referenzen (Releases-/Issue-Links) – **einzige Stelle**, an der die GitHub-Org/Repo-Referenz steht, nirgends hardcoden
- `tests/` – Playwright-Smoke-Tests (`npm test`)

## Deployment

Deployment läuft über `.github/workflows/deploy-website.yml` bei jedem Push auf `main`:
- **Automatisch**: Jeder `git push origin main` triggert einen Build + Deploy nach https://klarwert.github.io/
- **Pages-Konfiguration**: GitHub Pages Settings → Source: `GitHub Actions` (Workflow baut die dist/ automatisch)
- **Verifikation lokal**: `npm run build && npm run preview` zeigt die finale Ausgabe vor dem Push
- **Troubleshooting**: Falls Live-Site veraltet wirkt, alle Browser-Caches clearen (Incognito Mode nutzen) oder `git push origin main` erneut ausführen

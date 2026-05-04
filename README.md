# Nosville

Community site for Nostr — built with [MKStack](https://gitlab.com/soapbox-pub/mkstack).

## Tech Stack

- React + Vite + TypeScript
- TailwindCSS + shadcn/ui
- Nostrify (`@nostrify/react`)
- TanStack Query

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Pushing to `main` triggers automatic deployment via GitHub Actions.

Built files are rsync'd to the production server.

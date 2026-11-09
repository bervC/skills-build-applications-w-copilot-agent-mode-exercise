# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap, and React Router. Start the
frontend with `npm run dev --prefix octofit-tracker/frontend`; Vite serves it on
port 5173.

## API configuration

In Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local`, using the value of the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then sends requests to
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/<collection>/`.
When the variable is missing or blank, requests use
`http://localhost:8000/api/<collection>/` instead. Restart the Vite server after
changing `.env.local`; Vite exposes `VITE_` variables at build time.

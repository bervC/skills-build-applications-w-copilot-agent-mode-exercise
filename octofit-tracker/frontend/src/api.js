const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(collection, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/api/${collection}/`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'data', 'items']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  throw new Error('The API response did not contain a collection of records.')
}

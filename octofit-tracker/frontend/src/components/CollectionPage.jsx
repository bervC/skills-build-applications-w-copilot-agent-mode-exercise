import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value == null || value === '') return '—'
  if (Array.isArray(value)) return value.map(displayValue).join(', ')
  if (typeof value === 'object') {
    return value.name ?? value.title ?? value.email ?? value._id ?? JSON.stringify(value)
  }
  return String(value)
}

function CollectionPage({ title, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint])

  return (
    <main className="container py-4">
      <h1 className="mb-4">{title}</h1>
      {loading && <p role="status">Loading {title.toLowerCase()}…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && records.length === 0 && (
        <p className="alert alert-info">No {title.toLowerCase()} found.</p>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>{columns.map(({ label }) => <th key={label} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${title}-${index}`}>
                  {columns.map(({ key }) => (
                    <td key={key}>{displayValue(record[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default CollectionPage

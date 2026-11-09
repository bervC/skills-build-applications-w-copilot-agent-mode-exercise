import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'exercises', label: 'Exercises' },
]

export default function Workouts() {
  return <CollectionPage title="Workouts" endpoint={endpoint} columns={columns} />
}

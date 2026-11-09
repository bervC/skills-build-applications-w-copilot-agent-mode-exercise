import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'user', label: 'User' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'calories', label: 'Calories' },
  { key: 'date', label: 'Date' },
]

export default function Activities() {
  return <CollectionPage title="Activities" collection="activities" columns={columns} />
}

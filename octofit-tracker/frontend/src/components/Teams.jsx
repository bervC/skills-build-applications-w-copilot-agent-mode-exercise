import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'Description' },
  { key: 'members', label: 'Members' },
]

export default function Teams() {
  return <CollectionPage title="Teams" collection="teams" columns={columns} />
}

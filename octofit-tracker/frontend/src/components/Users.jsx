import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
  { key: 'profile', label: 'Profile' },
]

export default function Users() {
  return <CollectionPage title="Users" collection="users" columns={columns} />
}

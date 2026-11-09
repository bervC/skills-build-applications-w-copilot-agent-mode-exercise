import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'activityCount', label: 'Activities' },
]

export default function Leaderboard() {
  return <CollectionPage title="Leaderboard" collection="leaderboard" columns={columns} />
}

import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function NotFound() {
  return (
    <main className="container py-5">
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <header className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" alt="" width="40" height="40" />
            OctoFit Tracker
          </Link>
          <nav className="navbar-nav flex-row flex-wrap gap-3">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

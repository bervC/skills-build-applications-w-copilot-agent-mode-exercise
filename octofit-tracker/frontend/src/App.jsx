import { Link, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <main className="container py-5">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your activities and keep moving with your team.</p>
    </main>
  )
}

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
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

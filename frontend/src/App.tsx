import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/HomePage'
import { Services } from './components/Services'
import { SingleServicePage } from './components/SingleServicePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<SingleServicePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

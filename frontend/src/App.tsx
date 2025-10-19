import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/HomePage';
import { Services } from './components/Services';
import { SingleServicePage } from './components/SingleServicePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<SingleServicePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;

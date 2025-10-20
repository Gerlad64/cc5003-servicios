import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/HomePage';
import { Services } from './components/Services';
import { SingleServicePage } from './components/SingleServicePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateServiceForm from './components/CreateServiceForm';

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
          <Route path="/services/create" element={<CreateServiceForm />} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/HomePage';
import { Services } from './components/Services';
import { SingleServicePage } from './components/SingleServicePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateServiceForm from './components/CreateServiceForm';
import UserPage from './components/UserPage';
import {useEffect, useState} from "react";
import loginService from "./requests/login"

function App() {
   const [username, setUser] = useState<string | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const user = await loginService.restoreLogin()
            setUser(user?.username);
        }
        checkLogin()
    }, [])
  return (
    <Router>
      <div className="App">
          {username ? <h2>esta es una topbar. Usuario: {username}</h2> : <h2>esta es una topbar: usuario no loggeado</h2>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<SingleServicePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/services/create" element={<CreateServiceForm />} />
          <Route path="/me" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;

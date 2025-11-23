import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';
import { HomePage } from './components/HomePage';
import { Services } from './components/Services';
import { SingleServicePage } from './components/SingleServicePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateServiceForm from './components/CreateServiceForm';
import UserPage from './components/UserPage';
import { TopBar } from './components/TopBar';
import {useEffect, useState} from "react";
import loginService from "./requests/login"
import theme from './theme';

function AppContent() {
   const [username, setUser] = useState<string | null>(null);
   const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            const user = await loginService.restoreLogin()
            setUser(user?.username);
        }
        checkLogin()
    }, [])

    const handleLogout = async () => {
        try {
            await loginService.logout();
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

  return (
    <>
      <TopBar username={username} onLogout={handleLogout} />
      <Box component="main" sx={{ pt: 8 }}>
        <Routes>
          <Route path="/" element={<HomePage username={username} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<SingleServicePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setUser={(user: {username: string}) => setUser(user.username)} />} />
          <Route path="/services/create" element={<CreateServiceForm />} />
          <Route path="/me" element={<UserPage />} />
        </Routes>
      </Box>
    </>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
};

export default App;

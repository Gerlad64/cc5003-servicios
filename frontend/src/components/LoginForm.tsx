import { useState } from "react";
import loginService from "../requests/login";
import { useNavigate, Link } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';

interface LoginProps {
    setUser: (user: {username: string}) => void;
}

const LoginForm = ({setUser} : LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Credenciales inválidas. Por favor, intenta nuevamente.");
    };
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver al inicio
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 600, textAlign: 'center' }}>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<LoginIcon />}
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: '1.1rem',
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.dark'
              }
            }}
          >
            Iniciar Sesión
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              ¿No tienes cuenta?{' '}
              <Link to="/register" style={{ color: '#56A0D2', fontWeight: 500 }}>
                Regístrate aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
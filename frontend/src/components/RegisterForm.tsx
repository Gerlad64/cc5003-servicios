import { useState } from "react";
import userService from "../requests/users";
import { useNavigate, Link } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const navigate = useNavigate();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userObject = {
      username: username,
      password: password,
      name: firstname,
      last_name: lastname,
    };
    userService.createUser(userObject)
        .then(() => {
            navigate('/login');
        })
        .catch((error) => {
        setErrorMessage(error.response?.data?.error);
    });
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  }

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
          Registrarse
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            value={username}
            onChange={handleUsernameChange}
            margin="normal"
            required
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nombre"
                value={firstname}
                onChange={handleFirstnameChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Apellido"
                value={lastname}
                onChange={handleLastnameChange}
                margin="normal"
                required
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<PersonAddIcon />}
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
            Registrarse
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" style={{ color: '#56A0D2', fontWeight: 500 }}>
                Inicia sesión aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
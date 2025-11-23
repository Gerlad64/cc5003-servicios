import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TopBarProps {
  username: string | null;
  onLogout?: () => void;
}

export function TopBar({ username, onLogout }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" elevation={3} sx={{ zIndex: 1100 }}>
      <Toolbar sx={{ px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              mr: 4,
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => navigate('/')}
          >
            🛠️ ServiciosCL
          </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{ textTransform: 'none' }}
              >
                Inicio
              </Button>
              <Button
                color="inherit"
                startIcon={<ListIcon />}
                onClick={() => navigate('/services')}
                sx={{ textTransform: 'none' }}
              >
                Servicios
              </Button>
              {username && (
                <Button
                  color="inherit"
                  startIcon={<AddCircleIcon />}
                  onClick={() => navigate('/services/create')}
                  sx={{ textTransform: 'none', color: 'white' }}
                >
                  Crear Servicio
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {username ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    mr: 1
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#4ade80',
                      boxShadow: '0 0 6px #4ade80'
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {username}
                  </Typography>
                </Box>
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  onClick={() => navigate('/me')}
                  sx={{
                    textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Mi Perfil
                </Button>
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={onLogout}
                  sx={{
                    textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ textTransform: 'none' }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/register')}
                  sx={{
                    textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
  );
}

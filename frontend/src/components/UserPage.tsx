import { useEffect, useState } from "react";
import loginService from "../requests/login";
import userService from "../requests/users";
import type { UserData } from "../model/UserData";
import {
  Container,
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Chip,
  Rating,
  CircularProgress,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import {
  Person as PersonIcon,
  WorkOutline as WorkIcon,
  Star as StarIcon
} from '@mui/icons-material';

const UserPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await loginService.restoreLogin();
        console.log(user);
        setUser(user);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };
    init()
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
      }
  };
  const handleUpload = async () => {
      if (!file) return alert('Por favor selecciona una imagen');
      try {
          const response = await userService.uploadProfilePic(file);
          console.log(response);
      }
      catch (error) {
          console.error(error);
      }
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {!user ? 
        (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <PersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No has iniciado sesión
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Por favor inicia sesión para ver tu perfil
            </Typography>
          </Paper>
        ) : (
          <Box>
            {/* Header del perfil */}

            <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, sm: 'auto' }}>
                  <Avatar
                    src={user.profile_pic_url}
                    alt={`${user.name} ${user.last_name}`}
                    sx={{ 
                      width: 120, 
                      height: 120,
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: 3
                    }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    {user.name} {user.last_name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={user.rating || 0} readOnly precision={0.5} />
                    <Typography variant="body1" color="text.secondary">
                      ({user.rating || 0}/5)
                    </Typography>
                  </Box>

                  <Chip 
                    icon={<WorkIcon />}
                    label={`${user.services?.length || 0} servicio${user.services?.length !== 1 ? 's' : ''} publicado${user.services?.length !== 1 ? 's' : ''}`}
                    color="secondary"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Biografía */}
            <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <PersonIcon /> Acerca de mí
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {user.biography || 'Sin biografía disponible'}
              </Typography>
            </Paper>

            {/* Estadísticas */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {user.services?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Servicios
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <StarIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      {user.rating || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Calificación
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <PersonIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nombre
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
          <input
              type="file"
              accept="image/*" // Solo aceptar imágenes
              onChange={handleFileChange}
              className="my-2"
          />

          <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
              Subir Foto
          </button>
      </Container>
    </Box>
  );
};

export default UserPage;
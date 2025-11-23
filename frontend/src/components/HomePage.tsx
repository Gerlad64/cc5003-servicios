import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Chip,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import serviceReq from '../requests/services';
import reviewService from '../requests/reviews';
import type { ServiceData } from '../model/ServiceData';
import type { ReviewData } from '../model/ReviewData';

interface HomePageProps {
    username?: string | null;
}

interface ServiceWithReviews extends ServiceData {
    reviewCount: number;
    averageRating: number;
}

/**
 * Componente de página principal con navegación a servicios
 */
export function HomePage({ username }: HomePageProps) {
    const [latestServices, setLatestServices] = useState<ServiceWithReviews[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadServicesWithReviews = async () => {
            try {
                // Cargar todos los servicios
                const services = await serviceReq.getAll();
                const last3 = services.slice(-3).reverse();

                // Cargar reviews para cada servicio
                const servicesWithReviews = await Promise.all(
                    last3.map(async (service) => {
                        try {
                            const reviews: ReviewData[] = await reviewService.getByServiceId(service.id);
                            const reviewCount = reviews.length;
                            const averageRating = reviewCount > 0
                                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
                                : service.rating || 0;

                            return {
                                ...service,
                                reviewCount,
                                averageRating: Math.round(averageRating * 10) / 10 // Redondear a 1 decimal
                            };
                        } catch (error) {
                            console.error(`Error loading reviews for service ${service.id}:`, error);
                            return {
                                ...service,
                                reviewCount: 0,
                                averageRating: service.rating || 0
                            };
                        }
                    })
                );

                setLatestServices(servicesWithReviews);
            } catch (error) {
                console.error('Error loading services:', error);
            } finally {
                setLoading(false);
            }
        };

        loadServicesWithReviews();
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #062A79 0%, #56A0D2 100%)',
                    color: 'white',
                    py: 12,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        Encuentra el servicio que necesitas
                    </Typography>
                    
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 5,
                            opacity: 0.95,
                            fontWeight: 300
                        }}
                    >
                        Conectamos a profesionales con personas que necesitan servicios de calidad.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            component={Link}
                            to="/services"
                            variant="contained"
                            size="large"
                            startIcon={<SearchIcon />}
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    bgcolor: '#f0f0f0',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 4
                                },
                                transition: 'all 0.3s'
                            }}
                        >
                            Buscar servicios
                        </Button>
                        
                        {username ? (
                            <Button
                                component={Link}
                                to="/services/create"
                                variant="outlined"
                                size="large"
                                startIcon={<AddCircleIcon />}
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        borderColor: 'white',
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s'
                                }}
                            >
                                Crear servicio
                            </Button>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    size="large"
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255,255,255,0.1)',
                                            transform: 'translateY(-2px)'
                                        },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Iniciar sesión
                                </Button>
                                
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="outlined"
                                    size="large"
                                    startIcon={<PersonAddIcon />}
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255,255,255,0.1)',
                                            transform: 'translateY(-2px)'
                                        },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Registrarse
                                </Button>
                            </>
                        )}
                    </Box>
                </Container>
            </Box>

            {/* Sección de últimos servicios publicados */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 6,
                        color: 'primary.main'
                    }}
                >
                    Últimos servicios publicados
                </Typography>
                
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={60} />
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {latestServices.map((service) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h5"
                                            component="h3"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 600,
                                                color: 'primary.main',
                                                mb: 2
                                            }}
                                        >
                                            {service.name}
                                        </Typography>

                                        {service.category && (
                                            <Chip
                                                label={service.category}
                                                size="small"
                                                sx={{
                                                    mb: 2,
                                                    bgcolor: 'secondary.main',
                                                    color: 'white',
                                                    fontWeight: 500
                                                }}
                                            />
                                        )}

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <LocationOnIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {service.location}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <StarIcon sx={{ mr: 1, fontSize: 18, color: '#FFD700' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {service.averageRating}/5 {service.reviewCount > 0 && `(${service.reviewCount} review${service.reviewCount !== 1 ? 's' : ''})`}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AttachMoneyIcon sx={{ mr: 1, fontSize: 18, color: 'success.main' }} />
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {service.pricing}
                                            </Typography>
                                        </Box>
                                    </CardContent>

                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            component={Link}
                                            to={`/services/${service.id}`}
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                bgcolor: 'secondary.main',
                                                '&:hover': {
                                                    bgcolor: 'secondary.dark'
                                                }
                                            }}
                                        >
                                            Ver detalles
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};
import type { ServiceData } from "../model/ServiceData";
import type { UserData } from "../model/UserData";
import serviceReq from "../requests/services";
import userReq from "../requests/users";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchFilters } from "./SearchFilters";
import type { FilterState } from "./SearchFilters";
import { CategoryTags } from "./CategoryTags";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Chip,
    Grid,
    CircularProgress,
    Alert,
    Paper,
    Divider
} from '@mui/material';
import {
    Person as PersonIcon,
    LocationOn as LocationIcon,
    Star as StarIcon,
    AttachMoney as MoneyIcon,
    Category as CategoryIcon
} from '@mui/icons-material';

import { useServicesStore } from '../serviceStore';

type User = Pick<UserData, "id" | "name" | "profile_pic">;

/**
 * Componente que genera la vista de una lista de servicios
 * @returns Vista de listado de servicios con enlaces para ver detalles
 */
export function Services() {
    // const [services, setServices] = useState<ServiceData[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        searchText: '',
        location: '',
        serviceType: '',
        priceRange: '',
        rating: '',
        deliveryOption: ''
    });
    const serviceStore = useServicesStore();

    // trae todos los servicios y usuarios
    useEffect(() => {
        serviceReq.getAll()
            .then((data_s) => {
                // setServices(data_s); // setea todos los servicios del servidor
                serviceStore.setServices(data_s);
                // setea los usuarios buscando por id
                return userReq.getAll(); // Cambiamos a getAll para obtener todos los usuarios
            })
            .then((data_u: UserData[]) => {
                setUsers(data_u.map((u) => ({ 
                    id: u.id,
                    name: u.name + " " + u.last_name, 
                    profile_pic: u.profile_pic
                })));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading services:', error);
                setError('Error al cargar los servicios');
                setLoading(false);
            })
    }, []);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters)
        // Aquí se implementará la lógica de filtrado en el futuro
        console.log('Filtros aplicados:', newFilters);
    };

    // Función para filtrar servicios
    const filterServices = (services: ServiceData[], filters: FilterState): ServiceData[] => {
        return services.filter((service) => {
            // Filtro por categoría
            if (selectedCategory && service.category !== selectedCategory) {
                return false;
            }

            // Filtro por texto de búsqueda
            if (filters.searchText && !service.name.toLowerCase().includes(filters.searchText.toLowerCase())) {
                return false;
            }

            // Filtro por ubicación
            if (filters.location && service.location !== filters.location) {
                return false;
            }

            // Filtro por rating
            if (filters.rating && service.rating < Number(filters.rating)) {
                return false;
            }

            // Otros filtros según sea necesario...
            
            return true;
        });
    };

    const filteredServices = filterServices(serviceStore.services, filters);

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

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 2, pb: 4 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 700,
                            color: 'primary.main',
                            textAlign: 'center'
                        }}
                    >
                        Lista de Servicios
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ textAlign: 'center', mb: 2 }}
                    >
                        <Link 
                            to="/" 
                            style={{ 
                                textDecoration: 'none', 
                                color: '#56A0D2',
                                fontWeight: 500
                            }}
                        >
                            « Volver al inicio
                        </Link>
                    </Typography>
                </Box>

                {/* Category Tags */}
                <Box sx={{ mb: 3 }}>
                    <CategoryTags 
                        services={serviceStore.services}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />
                </Box>

                <Grid container spacing={3}>
                    {/* Sidebar de filtros */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Paper 
                            elevation={2}
                            sx={{ 
                                p: 3,
                                position: 'sticky',
                                top: 80,
                                maxHeight: 'calc(100vh - 100px)',
                                overflowY: 'auto'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'primary.main',
                                    mb: 2
                                }}
                            >
                                Filtrar servicios
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <SearchFilters onFiltersChange={handleFiltersChange} />
                        </Paper>
                    </Grid>

                    {/* Lista de servicios */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography 
                            variant="body1" 
                            sx={{ mb: 3, color: 'text.secondary' }}
                        >
                            Mostrando <strong>{filteredServices.length}</strong> servicios disponibles
                        </Typography>

                        {filteredServices.length === 0 ? (
                            <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="h6" color="text.secondary">
                                    No se encontraron servicios con los filtros aplicados
                                </Typography>
                            </Paper>
                        ) : (
                            <Grid container spacing={2}>
                                {filteredServices.map((service) => {
                                    const user = users.find((u) => String(u.id) === String(service.user_id));
                                    return (
                                        <Grid size={{ xs: 12 }} key={service.id}>
                                            <Card 
                                                elevation={2}
                                                sx={{
                                                    transition: 'all 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: 6
                                                    }
                                                }}
                                            >
                                                <CardActionArea 
                                                    component={Link} 
                                                    to={`/services/${service.id}`}
                                                >
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                            <Typography 
                                                                variant="h5" 
                                                                component="h2"
                                                                sx={{ 
                                                                    fontWeight: 600,
                                                                    color: 'primary.main',
                                                                    flex: 1
                                                                }}
                                                            >
                                                                {service.name}
                                                            </Typography>
                                                            <Chip 
                                                                icon={<StarIcon />}
                                                                label={`${service.rating}/5`}
                                                                color="warning"
                                                                size="small"
                                                                sx={{ ml: 2 }}
                                                            />
                                                        </Box>

                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                                <PersonIcon sx={{ mr: 0.5, fontSize: 20 }} />
                                                                <Typography variant="body2">
                                                                    Por: {user ? user.name : 'Usuario desconocido'}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                                <LocationIcon sx={{ mr: 0.5, fontSize: 20 }} />
                                                                <Typography variant="body2">
                                                                    {service.location}
                                                                </Typography>
                                                            </Box>

                                                            {service.category && (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                                    <CategoryIcon sx={{ mr: 0.5, fontSize: 20 }} />
                                                                    <Typography variant="body2">
                                                                        {service.category}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                            <MoneyIcon sx={{ mr: 0.5, color: 'success.main' }} />
                                                            <Typography 
                                                                variant="h6" 
                                                                sx={{ 
                                                                    fontWeight: 600,
                                                                    color: 'success.main'
                                                                }}
                                                            >
                                                                {service.pricing}
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};
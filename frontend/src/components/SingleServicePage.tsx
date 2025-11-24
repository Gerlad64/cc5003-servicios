import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SingleService } from './SingleService';
import type { ServiceData } from '../model/ServiceData';
import type { UserData } from '../model/UserData';
import serviceReq from '../requests/services';
import userReq from '../requests/users';
import { ServiceReviews } from "./ServiceReviews";
import { 
    Container, 
    Box, 
    Button, 
    CircularProgress, 
    Alert, 
    Paper,
    //Divider 
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

type User = Pick<UserData, "id" | "name" | "profile_pic_url">;

/**
 * Componente página que muestra un servicio individual
 * Obtiene el ID del servicio desde la URL y carga los datos correspondientes
 */
export function SingleServicePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<ServiceData | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('ID de servicio no válido');
            setLoading(false);
            return;
        };

        const serviceId = id;
        if (!serviceId) {
            setError('ID de servicio no válido');
            setLoading(false);
            return;
        };

        // Cargar el servicio específico
        serviceReq.getbyId(serviceId)
            .then((services) => {
                if (services.length === 0) {
                    setError('Servicio no encontrado');
                    setLoading(false);
                    return;
                };
                
                const foundService = services[0];
                setService(foundService);
                
                // Cargar el usuario asociado
                return userReq.getbyId(foundService.user_id);
            })
            .then((users) => {
                if (users && users.length > 0) {
                    const foundUser = users[0];
                    setUser({
                        id: foundUser.id,
                        name: `${foundUser.name} ${foundUser.last_name}`,
                        profile_pic_url: foundUser.profile_pic_url
                    });
                };
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading service:', error);
                setError('Error al cargar el servicio');
                setLoading(false);
            })
    }, [id]);

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
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
                <Button 
                    variant="contained" 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/services')}
                >
                    Volver a servicios
                </Button>
            </Container>
        );
    }

    if (!service || !user) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    Servicio no encontrado
                </Alert>
                <Button 
                    variant="contained" 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/services')}
                >
                    Volver a servicios
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Button 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/services')}
                    sx={{ mb: 3 }}
                >
                    Volver a servicios
                </Button>
                
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <SingleService 
                        service={service} 
                        user={{ 
                            name: user.name, 
                            profile_pic_url: user.profile_pic_url
                        }}
                    />
                </Paper>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <ServiceReviews serviceId={id!} />
                </Paper>
            </Container>
        </Box>
    )
};
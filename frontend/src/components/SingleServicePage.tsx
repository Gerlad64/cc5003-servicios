import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SingleService } from './SingleService';
import type { ServiceData } from '../model/ServiceData';
import type { UserData } from '../model/UserData';
import serviceReq from '../requests/services';
import userReq from '../requests/users';
import { ServiceReviews } from "./ServiceReviews";

type User = Pick<UserData, "id" | "name" | "profile_pic">;

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

        const serviceId = parseInt(id);
        if (isNaN(serviceId)) {
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
                        profile_pic: foundUser.profile_pic
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
        return <div>Cargando servicio...</div>
    };

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => navigate('/services')}>
                    Volver a servicios
                </button>
            </div>
        )
    };

    if (!service || !user) {
        return (
            <div>
                <p>Servicio no encontrado</p>
                <button onClick={() => navigate('/services')}>
                    Volver a servicios
                </button>
            </div>
        )
    };

    return (
        <div>
            <button onClick={() => navigate('/services')} style={{ marginBottom: '20px' }}>
                ← Volver a servicios
            </button>
            <SingleService 
                service={service} 
                user={{ 
                    name: user.name, 
                    profile_pic: user.profile_pic 
                }}
            />
            <hr />
            <ServiceReviews serviceId={id!} />
        </div>
    )
};
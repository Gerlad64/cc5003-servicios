import type { ServiceData } from "../model/ServiceData";
import type { UserData } from "../model/UserData";
import serviceReq from "../requests/services";
import userReq from "../requests/users";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchFilters } from "./SearchFilters";
import type { FilterState } from "./SearchFilters";

type User = Pick<UserData, "id" | "name" | "profile_pic">;

/**
 * Componente que genera la vista de una lista de servicios
 * @returns Vista de listado de servicios con enlaces para ver detalles
 */
export function Services() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        searchText: '',
        location: '',
        serviceType: '',
        priceRange: '',
        rating: '',
        deliveryOption: ''
    });

    // trae todos los servicios y usuarios
    useEffect(() => {
        serviceReq.getAll()
            .then((data_s) => {
                setServices(data_s); // setea todos los servicios del servidor
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

    if (loading) {
        return <div>Cargando servicios...</div>
    };

    if (error) {
        return <div>Error: {error}</div>
    };

    return (
        <div>
            {/* Header con navegación */}
            <h1>Lista de Servicios</h1>
            <a href="/">Volver al inicio</a>

            <hr />

            {/* Componente de filtros */}
            <SearchFilters onFiltersChange={handleFiltersChange} />

            <hr />

            {/* Contador de resultados */}
            <p>Mostrando {services.length} servicios disponibles</p>

            {/* Lista de servicios */}
            <div>
                {services.map((service) => {
                    const user = users.find((u) => String(u.id) === String(service.user_id));
                    
                    return (
                        <div key={service.id}>
                            <h3>
                                <Link to={`/services/${service.id}`}>
                                    {service.name}
                                </Link>
                            </h3>
                            <p>Por: {user ? user.name : 'Usuario desconocido'}</p>
                            <p>Ubicación: {service.location}</p>
                            <p>Calificación: {service.rating}/5</p>
                            <p>Precio: {service.pricing}</p>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
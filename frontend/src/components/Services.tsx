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

    // Función para filtrar servicios
    const filterServices = (services: ServiceData[], filters: FilterState): ServiceData[] => {
        return services.filter((service) => {
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

    const filteredServices = filterServices(services, filters);

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
            <p>Mostrando {filteredServices.length} servicios disponibles</p>

            {/* Lista de servicios */}
            <div>
                {filteredServices.map((service) => {
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
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
            <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
                <h1>Lista de Servicios</h1>
                <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                    « Volver al inicio
                </Link>
            </div>

            {/* Layout principal con sidebar */}
            <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
                {/* Sidebar de filtros (izquierda) */}
                <aside style={{
                    width: '280px',
                    borderRight: '1px solid #ddd',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    overflowY: 'auto'
                }}>
                    <SearchFilters onFiltersChange={handleFiltersChange} />
                </aside>

                {/* Contenido principal (derecha) */}
                <main style={{
                    flex: 1,
                    padding: '20px',
                    overflowY: 'auto'
                }}>
                    {/* Contador de resultados */}
                    <p style={{ 
                        marginBottom: '20px',
                        fontSize: '16px',
                        color: '#666'
                    }}>
                        Mostrando <strong>{filteredServices.length}</strong> servicios disponibles
                    </p>

                    {/* Lista de servicios */}
                    <div>
                        {filteredServices.length === 0 ? (
                            <p>No se encontraron servicios con los filtros aplicados</p>
                        ) : (
                            filteredServices.map((service) => {
                                const user = users.find((u) => String(u.id) === String(service.user_id));
                                
                                return (
                                    <div 
                                        key={service.id}
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            padding: '15px',
                                            marginBottom: '15px',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <h3 style={{ marginTop: 0 }}>
                                            <Link 
                                                to={`/services/${service.id}`}
                                                style={{ 
                                                    textDecoration: 'none',
                                                    color: '#007bff'
                                                }}
                                            >
                                                {service.name}
                                            </Link>
                                        </h3>
                                        <p style={{ margin: '5px 0', color: '#666' }}>
                                            👤 Por: {user ? user.name : 'Usuario desconocido'}
                                        </p>
                                        <p style={{ margin: '5px 0', color: '#666' }}>
                                            📍 Ubicación: {service.location}
                                        </p>
                                        <p style={{ margin: '5px 0', color: '#666' }}>
                                            ⭐ Calificación: {service.rating}/5
                                        </p>
                                        <p style={{ margin: '5px 0', color: '#666', fontWeight: 'bold' }}>
                                            💰 Precio: {service.pricing}
                                        </p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
};
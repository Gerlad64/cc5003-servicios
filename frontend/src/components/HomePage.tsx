import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import serviceReq from '../requests/services';
import type { ServiceData } from '../model/ServiceData';

/**
 * Componente de página principal con navegación a servicios
 */
export function HomePage() {
    const [latestServices, setLatestServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar los últimos 3 servicios
        serviceReq.getAll()
            .then((services) => {
                // Tomar solo los últimos 3 servicios
                const last3 = services.slice(-3).reverse();
                setLatestServices(last3);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading services:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1>Encuentra el servicio que necesitas</h1>
            
            <p>Conectamos a profesionales con personas que necesitan servicios de calidad.</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Link to="/services">
                    <button>Buscar servicios</button>
                </Link>
                
                <Link to="/login">
                    <button>Iniciar sesión</button>
                </Link>
                
                <Link to="/register">
                    <button>Registrarse</button>
                </Link>
            </div>

            {/* Sección de últimos servicios publicados */}
            <div style={{ marginTop: '40px', width: '100%', maxWidth: '900px' }}>
                <h2>Últimos servicios publicados</h2>
                
                {loading ? (
                    <p>Cargando servicios...</p>
                ) : (
                    <div style={{ 
                        display: 'flex', 
                        gap: '20px', 
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginTop: '20px'
                    }}>
                        {latestServices.map((service) => (
                            <Link 
                                key={service.id} 
                                to={`/services/${service.id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    width: '250px',
                                    textAlign: 'left',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                                >
                                    <h3 style={{ 
                                        margin: '0 0 10px 0',
                                        fontSize: '18px',
                                        color: '#333'
                                    }}>
                                        {service.name}
                                    </h3>
                                    <p style={{ 
                                        margin: '5px 0',
                                        fontSize: '14px',
                                        color: '#666'
                                    }}>
                                        📍 {service.location || 'No especificado'}
                                    </p>
                                    <p style={{ 
                                        margin: '5px 0',
                                        fontSize: '14px',
                                        color: '#666'
                                    }}>
                                        ⭐ {service.rating}/5
                                    </p>
                                    <p style={{ 
                                        margin: '5px 0',
                                        fontSize: '14px',
                                        color: '#666',
                                        fontWeight: 'bold'
                                    }}>
                                        💰 {service.pricing}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                
                {!loading && latestServices.length === 0 && (
                    <p>No hay servicios publicados aún</p>
                )}
            </div>
        </div>
    )
};
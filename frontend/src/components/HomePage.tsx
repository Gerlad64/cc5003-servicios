import { Link } from 'react-router-dom';

/**
 * Componente de página principal con navegación a servicios
 */
export function HomePage() {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center'
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
        </div>
    )
};
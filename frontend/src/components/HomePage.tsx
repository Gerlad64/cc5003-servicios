import { Link } from 'react-router-dom';

/**
 * Componente de página principal con navegación a servicios
 */
export function HomePage() {
    return (
        <div>
            <h1>Encuentra el servicio que necesitas</h1>
            
            <p>Conectamos a profesionales con personas que necesitan servicios de calidad.</p>

            <Link to="/services">
                Buscar servicios
            </Link>
        </div>
    )
};
import { useState } from 'react';

interface FilterProps {
    onFiltersChange?: (filters: FilterState) => void
};

export interface FilterState {
    searchText: string
    location: string
    serviceType: string
    priceRange: string
    rating: string
    deliveryOption: string
};

/**
 * Componente de filtros de búsqueda para servicios
 */
export function SearchFilters({ onFiltersChange }: FilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        searchText: '',
        location: '',
        serviceType: '',
        priceRange: '',
        rating: '',
        deliveryOption: ''
    });

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange?.(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            searchText: '',
            location: '',
            serviceType: '',
            priceRange: '',
            rating: '',
            deliveryOption: ''
        }
        setFilters(clearedFilters);
        onFiltersChange?.(clearedFilters);
    };

    return (
        <div>
            <h3>Filtrar servicios</h3>
            
            {/* Barra de búsqueda principal */}
            <div>
                <input
                    type="text"
                    placeholder="Buscar servicios..."
                    value={filters.searchText}
                    onChange={(e) => handleFilterChange('searchText', e.target.value)}
                />
            </div>

            <br />

            {/* Filtros */}
            <div>
                <label>Ubicación:</label>
                <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="Santiago Centro">Santiago Centro</option>
                    <option value="Las Condes">Las Condes</option>
                    <option value="Providencia">Providencia</option>
                    <option value="Ñuñoa">Ñuñoa</option>
                    <option value="maipu">Maipú</option>
                    <option value="Online">Online</option>
                </select>
            </div>

            <br />

            <div>
                <label>Tipo de servicio:</label>
                <select
                    value={filters.serviceType}
                    onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="programacion">Programación</option>
                    <option value="diseno">Diseño Gráfico</option>
                    <option value="reparaciones">Reparaciones</option>
                    <option value="educacion">Educación</option>
                    <option value="marketing">Marketing</option>
                    <option value="otros">Otros</option>
                </select>
            </div>

            <br />

            <div>
                <label>Precio:</label>
                <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                    <option value="">Cualquier precio</option>
                    <option value="0-10000">Hasta $10.000</option>
                    <option value="10000-25000">$10.000 - $25.000</option>
                    <option value="25000-50000">$25.000 - $50.000</option>
                    <option value="50000+">Más de $50.000</option>
                </select>
            </div>

            <br />

            <div>
                <label>Calificación:</label>
                <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                >
                    <option value="">Cualquiera</option>
                    <option value="5">5 estrellas</option>
                    <option value="4">4+ estrellas</option>
                    <option value="3">3+ estrellas</option>
                </select>
            </div>

            <br />

            <div>
                <label>Modalidad:</label>
                <select
                    value={filters.deliveryOption}
                    onChange={(e) => handleFilterChange('deliveryOption', e.target.value)}
                >
                    <option value="">Cualquiera</option>
                    <option value="domicilio">A domicilio</option>
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                </select>
            </div>

            <br />

            <button onClick={clearFilters}>
                Limpiar filtros
            </button>

            {/* Indicador simple de filtros activos */}
            {Object.values(filters).some(filter => filter !== '') && (
                <p>
                    Filtros activos: {Object.values(filters).filter(filter => filter !== '').length}
                </p>
            )}
        </div>
    )
};
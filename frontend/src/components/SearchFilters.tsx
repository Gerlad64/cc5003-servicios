import { useState } from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Stack
} from '@mui/material';
import { FilterAltOff as ClearIcon } from '@mui/icons-material';

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
        };
        setFilters(clearedFilters);
        onFiltersChange?.(clearedFilters);
    };

    return (
        <Box>
            <Stack spacing={2.5}>
                {/* Barra de búsqueda principal */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Buscar servicios..."
                    value={filters.searchText}
                    onChange={(e) => handleFilterChange('searchText', e.target.value)}
                />

                {/* Filtro de ubicación */}
                <FormControl fullWidth size="small">
                    <InputLabel>Ubicación</InputLabel>
                    <Select
                        value={filters.location}
                        label="Ubicación"
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                        <MenuItem value="">Todas</MenuItem>
                        <MenuItem value="Santiago Centro">Santiago Centro</MenuItem>
                        <MenuItem value="Las Condes">Las Condes</MenuItem>
                        <MenuItem value="Providencia">Providencia</MenuItem>
                        <MenuItem value="Ñuñoa">Ñuñoa</MenuItem>
                        <MenuItem value="Maipú">Maipú</MenuItem>
                        <MenuItem value="Online">Online</MenuItem>
                    </Select>
                </FormControl>

                {/* Filtro de tipo de servicio */}
                <FormControl fullWidth size="small">
                    <InputLabel>Tipo de servicio</InputLabel>
                    <Select
                        value={filters.serviceType}
                        label="Tipo de servicio"
                        onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="programacion">Programación</MenuItem>
                        <MenuItem value="diseno">Diseño Gráfico</MenuItem>
                        <MenuItem value="reparaciones">Reparaciones</MenuItem>
                        <MenuItem value="educacion">Educación</MenuItem>
                        <MenuItem value="marketing">Marketing</MenuItem>
                        <MenuItem value="otros">Otros</MenuItem>
                    </Select>
                </FormControl>

                {/* Filtro de precio */}
                <FormControl fullWidth size="small">
                    <InputLabel>Precio</InputLabel>
                    <Select
                        value={filters.priceRange}
                        label="Precio"
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    >
                        <MenuItem value="">Cualquier precio</MenuItem>
                        <MenuItem value="0-10000">Hasta $10.000</MenuItem>
                        <MenuItem value="10000-25000">$10.000 - $25.000</MenuItem>
                        <MenuItem value="25000-50000">$25.000 - $50.000</MenuItem>
                        <MenuItem value="50000+">Más de $50.000</MenuItem>
                    </Select>
                </FormControl>

                {/* Filtro de calificación */}
                <FormControl fullWidth size="small">
                    <InputLabel>Calificación</InputLabel>
                    <Select
                        value={filters.rating}
                        label="Calificación"
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                    >
                        <MenuItem value="">Cualquiera</MenuItem>
                        <MenuItem value="5">5 estrellas</MenuItem>
                        <MenuItem value="4">4+ estrellas</MenuItem>
                        <MenuItem value="3">3+ estrellas</MenuItem>
                    </Select>
                </FormControl>

                {/* Filtro de modalidad */}
                <FormControl fullWidth size="small">
                    <InputLabel>Modalidad</InputLabel>
                    <Select
                        value={filters.deliveryOption}
                        label="Modalidad"
                        onChange={(e) => handleFilterChange('deliveryOption', e.target.value)}
                    >
                        <MenuItem value="">Cualquiera</MenuItem>
                        <MenuItem value="domicilio">A domicilio</MenuItem>
                        <MenuItem value="presencial">Presencial</MenuItem>
                        <MenuItem value="remoto">Remoto</MenuItem>
                    </Select>
                </FormControl>

                {/* Botón limpiar filtros */}
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ClearIcon />}
                    onClick={clearFilters}
                    sx={{ mt: 1 }}
                >
                    Limpiar filtros
                </Button>
            </Stack>
        </Box>
    )
};
import { useState, useEffect } from "react";
import type { ServiceData } from "../model/ServiceData";

interface CategoryTagsProps {
    services: ServiceData[];
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
}

export function CategoryTags({ services, selectedCategory, onCategorySelect }: CategoryTagsProps) {
    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);

    useEffect(() => {
        // Extraer categorías únicas y contar servicios por categoría
        const categoryMap = new Map<string, number>();
        
        services.forEach(service => {
            if (service.category) {
                const count = categoryMap.get(service.category) || 0;
                categoryMap.set(service.category, count + 1);
            }
        });

        // Convertir a array y ordenar por nombre
        const categoryArray = Array.from(categoryMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));

        setCategories(categoryArray);
    }, [services]);

    const colors = [
        '#062A79', // Catalina Blue
        '#56A0D2', // Carolina Blue
        '#89CFF0', // Baby Blue
        '#5B0A92', // Metallic Violet
        '#3d5ca3', // Catalina Blue light
        '#7eb8dc', // Carolina Blue light
        '#a3daf3', // Baby Blue light
        '#7a3ba8', // Metallic Violet light
        '#041d54', // Catalina Blue dark
        '#3d7093', // Carolina Blue dark
    ];

    const getColorForCategory = (index: number) => {
        return colors[index % colors.length];
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            borderTop: '2px solid #e0e0e0',
            padding: '15px 20px',
            boxShadow: '0 -4px 8px rgba(0,0,0,0.1)',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
        }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
                Categorías
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {/* Botón para mostrar todos */}
                <button
                    onClick={() => onCategorySelect(null)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: selectedCategory === null ? '2px solid #007bff' : '1px solid #ccc',
                        backgroundColor: selectedCategory === null ? '#007bff' : '#f0f0f0',
                        color: selectedCategory === null ? '#fff' : '#333',
                        cursor: 'pointer',
                        fontWeight: selectedCategory === null ? 'bold' : 'normal',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                        if (selectedCategory !== null) {
                            e.currentTarget.style.backgroundColor = '#e0e0e0';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedCategory !== null) {
                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                        }
                    }}
                >
                    Todas las categorías ({services.length})
                </button>

                {/* Botones de categorías */}
                {categories.map((category, index) => (
                    <button
                        key={category.name}
                        onClick={() => onCategorySelect(category.name)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: selectedCategory === category.name ? '2px solid #333' : 'none',
                            backgroundColor: selectedCategory === category.name 
                                ? getColorForCategory(index)
                                : getColorForCategory(index) + 'CC', // Más transparente cuando no está seleccionado
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: selectedCategory === category.name ? 'bold' : 'normal',
                            fontSize: '14px',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                            boxShadow: selectedCategory === category.name 
                                ? '0 2px 6px rgba(0,0,0,0.2)'
                                : '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = selectedCategory === category.name 
                                ? '0 2px 6px rgba(0,0,0,0.2)'
                                : '0 1px 3px rgba(0,0,0,0.1)';
                        }}
                    >
                        {category.name} ({category.count})
                    </button>
                ))}
            </div>
        </div>
    );
}

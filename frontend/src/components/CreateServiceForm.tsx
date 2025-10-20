import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import serviceReq from '../requests/services';

const CreateServiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        schedule: "",
        pricing: "",
        is_delivery: false,
        delivery_scope: "",
        on_location: false,
        contact: {
            whatsapp: "",
            instagram: "",
            telegram: "",
            mail: ""
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name.startsWith("contact.")) {
            const contactField = name.split(".")[1];
            setFormData({
                ...formData,
                contact: {
                    ...formData.contact, [contactField]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const serviceData = {
                ...formData,
                delivery_scope: formData.is_delivery 
                ? formData.delivery_scope.split(",").map(s => s.trim()) 
                : [],
            };

            await serviceReq.create(serviceData);
            alert("Servicio creado exitosamente");
            navigate("/services");
        } catch (error) {
            console.error("Error creating service:", error);
            alert("Error al crear el servicio");
        }
    };

    return (
        <div>
            <h1>Crear Nuevo Servicio</h1>
            <a href="/services">Volver a Servicios</a>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Servicio:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Ubicación:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Horario:</label>
                    <input
                        type="text"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleChange}
                        placeholder="Ej: Lunes a Viernes 9:00-18:00"
                    />
                </div>

                <div>
                    <label>Precios:</label>
                    <input
                        type="text"
                        name="pricing"
                        value={formData.pricing}
                        onChange={handleChange}
                        placeholder="Ej: $20.000 por hora"
                        required
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="is_delivery"
                            checked={formData.is_delivery}
                            onChange={handleChange}
                        />
                        ¿Ofrece servicio a domicilio?
                    </label>
                </div>

                {formData.is_delivery && (
                    <div>
                        <label>Alcance del delivery (separados por comas):</label>
                        <input
                            type="text"
                            name="delivery_scope"
                            value={formData.delivery_scope}
                            onChange={handleChange}
                            placeholder="Ej: Santiago Centro, Las Condes"
                        />
                    </div>
                )}

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="on_location"
                            checked={formData.on_location}
                            onChange={handleChange}
                        />
                        ¿Servicio presencial en ubicación fija?
                    </label>
                </div>

                <h3>Información de Contacto:</h3>

                <div>
                    <label>WhatsApp:</label>
                    <input
                        type="text"
                        name="contact.whatsapp"
                        value={formData.contact.whatsapp}
                        onChange={handleChange}
                        placeholder="+569XXXXXXXX"
                    />
                </div>

                <div>
                    <label>Instagram:</label>
                    <input
                        type="text"
                        name="contact.instagram"
                        value={formData.contact.instagram}
                        onChange={handleChange}
                        placeholder="@tuusuario"
                    />
                </div>

                <div>
                    <label>Telegram:</label>
                    <input
                        type="text"
                        name="contact.telegram"
                        value={formData.contact.telegram}
                        onChange={handleChange}
                        placeholder="@tuusuario"
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="contact.mail"
                        value={formData.contact.mail}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                <button type="submit">Crear Servicio</button>
            </form>
        </div>
    )
};
export default CreateServiceForm;
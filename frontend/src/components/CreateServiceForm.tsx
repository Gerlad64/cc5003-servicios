import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    FormControlLabel,
    Checkbox,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import serviceReq from '../requests/services';
import { useServicesStore } from '../serviceStore';
import type { ServiceData } from '../model/ServiceData';

const CreateServiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
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

    const serviceStore = useServicesStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name.startsWith("contact.")) {
            const contactField = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                contact: {
                    ...prev.contact, 
                    [contactField]: value 
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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
            
            const service: ServiceData = await serviceReq.create(serviceData);
            serviceStore.addService(service);
            alert("Servicio creado exitosamente");
            navigate("/services");
        } catch (error) {
            console.error("Error creating service:", error);
            alert("Error al crear el servicio");
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                component={Link}
                to="/services"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Volver a Servicios
            </Button>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Crear Nuevo Servicio
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Nombre del Servicio"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Categoría"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Ej: Jardinería, Plomería, Educación"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Descripción"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Ubicación"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Horario"
                                name="schedule"
                                value={formData.schedule}
                                onChange={handleChange}
                                placeholder="Ej: Lunes a Viernes 9:00-18:00"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Precios"
                                name="pricing"
                                value={formData.pricing}
                                onChange={handleChange}
                                placeholder="Ej: $20.000 por hora"
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="is_delivery"
                                        checked={formData.is_delivery}
                                        onChange={handleChange}
                                    />
                                }
                                label="¿Ofrece servicio a domicilio?"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="on_location"
                                        checked={formData.on_location}
                                        onChange={handleChange}
                                    />
                                }
                                label="¿Servicio presencial en ubicación fija?"
                            />
                        </Grid>

                        {formData.is_delivery && (
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Alcance del delivery (separados por comas)"
                                    name="delivery_scope"
                                    value={formData.delivery_scope}
                                    onChange={handleChange}
                                    placeholder="Ej: Santiago Centro, Las Condes"
                                />
                            </Grid>
                        )}

                        <Grid size={{ xs: 12 }}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                                Información de Contacto
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="WhatsApp"
                                name="contact.whatsapp"
                                value={formData.contact.whatsapp}
                                onChange={handleChange}
                                placeholder="+569XXXXXXXX"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Instagram"
                                name="contact.instagram"
                                value={formData.contact.instagram}
                                onChange={handleChange}
                                placeholder="@tuusuario"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Telegram"
                                name="contact.telegram"
                                value={formData.contact.telegram}
                                onChange={handleChange}
                                placeholder="@tuusuario"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="contact.mail"
                                value={formData.contact.mail}
                                onChange={handleChange}
                                placeholder="ejemplo@correo.com"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<SaveIcon />}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    bgcolor: 'secondary.main',
                                    '&:hover': {
                                        bgcolor: 'secondary.dark'
                                    }
                                }}
                            >
                                Crear Servicio
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
};
export default CreateServiceForm;
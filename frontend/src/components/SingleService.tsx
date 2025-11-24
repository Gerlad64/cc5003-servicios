import type { ServiceData, Contact } from "../model/ServiceData";

interface HeaderProps {
    title: string
    username: string
    rating: number
    location: string
    profile_pic_url?: string
};

const Header = (props : HeaderProps) => {
    return (
        <div>
            <div>
                {props.profile_pic_url ? (
                    <img 
                        src={props.profile_pic_url}
                        alt={`Perfil de ${props.username}`}
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <div>👤</div>
                )}
                <div>
                    {'★'.repeat(props.rating)}{'☆'.repeat(5 - props.rating)}
                    <span>
                        ({props.rating.toPrecision(2)}/5)
                    </span>
                </div>
            </div>
            <div>
                <h1>{props.title}</h1>
                <p>
                    Por: {props.username}
                </p>
                <p>
                    📍 {props.location}
                </p>
            </div>
        </div>
    )
};

interface PricingProps {
    pricing: string
};

const Pricing = (props : PricingProps) => {
    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #007bff'
        }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Precio</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                {props.pricing}
            </div>
        </div>
    )
};

interface DescriptionProps {
    description: string
};

const Description = (props: DescriptionProps) => {
    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
        }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Descripción</h3>
            <p style={{ margin: '0', lineHeight: '1.6', color: '#666' }}>
                {props.description}
            </p>
        </div>
    )
};

interface ScheduleProps {
    schedule: string
};

const Schedule = (props: ScheduleProps) => {
    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px'
        }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Horario</h3>
            <p style={{ margin: '0', fontSize: '18px', color: '#666' }}>
                🕒 {props.schedule}
            </p>
        </div>
    )
};

interface ContactProps {
    contact: Contact
};

const Contact = (props: ContactProps) => {
    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginTop: '20px',
            color: 'gray'
        }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Contacto</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {props.contact.whatsapp && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>📱</span>
                        <span>WhatsApp: {props.contact.whatsapp}</span>
                    </div>
                )}
                {props.contact.instagram && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>📷</span>
                        <span>Instagram: @{props.contact.instagram}</span>
                    </div>
                )}
                {props.contact.telegram && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>✈️</span>
                        <span>Telegram: @{props.contact.telegram}</span>
                    </div>
                )}
                {props.contact.mail && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>📧</span>
                        <span>Email: {props.contact.mail}</span>
                    </div>
                )}
            </div>
        </div>
    )
};

interface Props {
    service: ServiceData
    user?: {name: string, profile_pic_url?: string}
};

/**
 * Componente que genera la vista de un servicio.
 * Se debe proveer el servicio que se ofrece, el
 * nombre del usuario y su foto de perfil.
 * @param service el servicio que se quiere mostrar 
 * @param user nombre y foto de perfil del usuario
 * entregado como {user: string, profile_pic_url: string}
 * @returns un div con los detalles del servicio
 */
export function SingleService({service, user}: Props) {
    if(user == undefined)
        return (<>{console.log(`SingleService: no user provided for service: ${service.id}`)}</>);
    
    return (
        <div>
            <Header 
                location={service.location || 'Ubicación no especificada'}
                title={service.name}
                username={user.name}
                profile_pic_url={user.profile_pic_url}
                rating={service.rating}
            />
            
            <div>
                <Schedule schedule={service.schedule}/>
                <Pricing pricing={service.pricing}/>
            </div>
            
            <Description description={service.description}/>
            
            {/* Información adicional sobre el servicio */}
            <div>
                <div>
                    <h4>Servicio a domicilio</h4>
                    <span>
                        {service.is_delivery ? '✅ Disponible' : '❌ No disponible'}
                    </span>
                    {service.is_delivery && service.delivery_scope && (
                        <p>
                            Cobertura: {service.delivery_scope}
                        </p>
                    )}
                </div>
                
                <div>
                    <h4>En ubicación específica</h4>
                    <span>
                        {service.on_location ? '✅ Disponible' : '❌ No disponible'}
                    </span>
                </div>
            </div>
            
            <Contact contact={service.contact}/>
        </div>
    )
};
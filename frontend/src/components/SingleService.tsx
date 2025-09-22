import type { ServiceData, Contact } from "../model/ServiceData";

interface HeaderProps {
    title: string
    username: string
    rating: number
    location: string
    profile_pic?: string
}

const Header = (props : HeaderProps) => {

    return (
        <div>
            <ul>
                <li>{/** foto de perfil y rating */}
                    <div>
                        <img src={props.profile_pic}/> 
                        <span>{props.rating}</span> {/** <-- cambiar por estrellas */}
                    </div>
                </li>
                <li>{/** titulo del servicio, nombre y ubicación*/}
                    <div>
                        <h3>{props.title}</h3><br/>
                        <span>{props.username}</span>
                        <span>{props.location}</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

interface PricingProps {
    pricing: string
}

const Pricing = (props : PricingProps) => {
    return (
        <div>
        {props.pricing}
        </div>
    )
}

interface DescriptionProps {
    description: string
}

const Description = (props: DescriptionProps) => {
    return (
        <div>
        {props.description}
        </div>
    )
}

interface ScheduleProps {
    schedule: string
}

const Schedule = (props: ScheduleProps) => {
    return (
        <div>
        {props.schedule}
        </div>
    )
}

interface ContactProps {
    contact: Contact
}

const Contact = (props: ContactProps) => {
    return (
        <div>
        </div>
    )
}

interface Props {
    service: ServiceData
    user?: {name: string, profile_pic?: string}
}
/**
 * Componente que genera la vista de un servicio.
 * Se debe proveer el servicio que se ofrece, el
 * nombre del usuario y su foto de perfil.
 * @param service el servicio que se quiere mostrar 
 * @param user nombre y foto de perfil del usuario
 * entregado como {user: string, profile_pic: string}
 * @returns un div con los detalles del servicio
 */
export function SingleService({service, user}: Props) {
    if(user == undefined)
        return (<>{console.log(`SingleService: no user provided for service: ${service.id}`)}</>);
    
    return (
        <div>
            <Header 
                location={service.location!} // <-- de momento, se asume una locación
                title={service.name}
                username={user.name}
                profile_pic={user.profile_pic}
                rating={service.rating}
            />
            <div>
                <Schedule schedule={service.schedule}/>
                <Pricing pricing={service.pricing}/>
            </div>
            <Description description={service.description}/>
            <Contact contact={service.contact}/>
        </div>
    )
}
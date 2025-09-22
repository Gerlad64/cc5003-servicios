import type { ServiceData } from "../model/ServiceData"
import type { UserData } from "../model/UserData"
import serviceReq from "../requests/services"
import userReq from "../requests/users"
import { useEffect, useState } from "react"
import { SingleService } from "./SingleService"


type User = Pick<UserData, "id" | "name" | "profile_pic">

/**
 * Componente que genera la vista de una lista de servicios
 * @returns ...
 */
export function Services() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    // trae todos los servicios y usuarios
    useEffect(() => {
        serviceReq.getAll().then((data_s) => {
            setServices(data_s); // setea todos los servicios del servidor
            // setea los usuarios buscando por id
            userReq.getbyId(data_s.map((s) => s.user_id)).then( (data_u) => {
                setUsers(data_u.map( (u) => ({ 
                    id: u.id,
                    name: u.name + " " + u.last_name, 
                    profile_pic: u.profile_pic
                })));
            })
        });
    }, []);
    return (
    <div>
        <ul>
        { // listas de servicios
            services.map( (s) => {
                const user = users.find( (u) => u.id==s.id);
                const u = user ? {name: user.name, profile_pic: user.profile_pic} : undefined;
                return (
                    <li key={s.id}>
                        <SingleService service={s} user={u}/>
                    </li>
                )
            })
        }
        </ul>
    </div>
    )
}
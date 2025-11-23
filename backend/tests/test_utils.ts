import Service from "../src/models/service";
import User from "../src/models/user";
import services from "../src/routes/services";
import { Test } from "supertest";
import TestAgent from "supertest/lib/agent";
import Review from "../src/models/review";

const USERS =
    [
        {
            username: "jdoe",
            password: "$2b$10$aJcUj10QQw3YffxuHDmubOOaCt.Ir3LqW5kTET8ypsIdx51h0HXYy",
            name: "John",
            last_name: "Doe",
            biography: "I like turtles",
        },
        {
            username: "jperez",
            password: "$2b$10$bI70RNYdYZPemcensoCSYuC2ngmszhOmHj4QiRiOion6u.CrJfz7K",
            name: "Juan",
            last_name: "Perez",
            biography: "Me gustan las tortugas.",
        },
        {
            username: "jpierre",
            password: '$2b$10$20YgDfVNgPOxaFXcbQkcv.8LS9w2UyP7G6TOQDeHn5CDZSrhZalI.',
            name: "Jean",
            last_name: "Pierre",
            biography: "J'aime les tortues."
        },
        {
            username: "jpetters",
            password: '$2b$10$rGNql4lfxUkyscbuO5M6xOCR75sX41weIY5gsX3nDAmBULDDYeHeq',
            name: "Johann",
            last_name: "Peters",
            biography: "Ich mag es des Tørtüggens "
        }
        ];





const SERVICES =
    [
        {
            "name": "Clases de guitarra acústica",
            "rating": 4.8,
            "is_delivery": false,
            "on_location": true,
            "location": "San Miguel",
            "schedule": "Lunes a viernes de 16:00 a 20:00",
            "description": "Clases personalizadas de guitarra acústica para principiantes y nivel intermedio.",
            "pricing": "Por hora",
            "contact": {
                "whatsapp": "+56912345678",
                "instagram": "guitarra_la_roca",
                "mail": "profeguitarra@example.com"
            }
        },
        {
            "name": "Reparación de bicicletas a domicilio",
            "rating": 5.0,
            "is_delivery": true,
            "delivery_scope": ["Ñuñoa", "Providencia", "Macul"],
            "on_location": false,
            "schedule": "Todos los días de 9:00 a 19:00",
            "description": "Servicio completo de mantención y reparación de bicicletas en la comodidad de tu casa.",
            "pricing": "Presupuesto según reparación",
            "contact": {
                "whatsapp": "+56987654321",
                "telegram": "@bikefixchile"
            }
        },
        {
            "name": "Paseo de perros",
            "rating": 0.0,
            "is_delivery": true,
            "delivery_scope": ["La Reina", "Peñalolén", "Ñuñoa"],
            "on_location": false,
            "schedule": "Lunes a viernes de 7:30 a 12:00",
            "description": "Paseo diario de perros, individual o en grupos pequeños. Servicio responsable y con experiencia.",
            "pricing": "Mensual o por paseo",
            "contact": {
                "whatsapp": "+56911223344",
                "mail": "paseadordeperros@gmail.com"
            }
        },
        {
            "name": "Asesoría en tesis y trabajos universitarios",
            "rating": 0.0,
            "is_delivery": true,
            "delivery_scope": ["Independencia", "San Joaquín", "Estación Central"],
            "on_location": false,
            "schedule": "Horario flexible, previa coordinación",
            "description": "Asesoría académica para la redacción, corrección y presentación de tesis de pregrado y posgrado.",
            "pricing": "Por proyecto o por hora",
            "contact": {
                "mail": "asesoriatesis@protonmail.com",
                "telegram": "@tesis_ayuda"
            }
        }
    ];

/** Elimina datos y luego carga datos de prueba a la base de datos de testing */
const loadUsers = async () => {
    await User.deleteMany({})
    await User.insertMany(USERS);
}

const loadServices = async () => {
    await Service.deleteMany({})
    const users = await User.find({});
    const services = await Service.insertMany(
        SERVICES
            .slice(0, users.length)
            .map((s, i) => ({ ...s, user_id: users[i]._id }))
    );
    services.map((s,i) => {
        const user = users[i];
        user.services.push(s.id);
        user.save();
    });
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}
const servicesInDb = async () => {
    const services = await Service.find({});
    return services.map(s => s.toJSON());
}

const login = async (api: TestAgent<Test>, user: { username: string; password: string }) => {
    const response = await api
        .post("/api/login")
        .send(user);
    const csrfToken = response.headers["x-csrf-token"];
    const setCookie = response.headers["set-cookie"];
    //assert(Array.isArray(setCookie), "Set-Cookie header missing");
    const jwtValue = setCookie[0].match(/token=([^;]+)/)?.[1];
    if (!jwtValue || !csrfToken) throw new Error("Login failed: Missing tokens");
    return { csrfToken, token: jwtValue };
};
// authAgent.ts

export interface IAuthRequest {
    get: (url: string) => Test;
    post: (url: string) => Test;
    put: (url: string) => Test;
    delete: (url: string) => Test;
    patch: (url: string) => Test;
    tokens: { csrfToken: string; token: string }; // Útil si necesitas acceder a los tokens crudos
}

export const authRequest = async (
    api: TestAgent<Test>,
    user: { username: string; password: string }
): Promise<IAuthRequest> => {
    const { csrfToken, token } = await login(api, user);

    const commonHeaders = {
        'Cookie': `token=${token}`,
        'X-CSRF-Token': csrfToken
    };
    return {
        get: (url: string) => api.get(url).set(commonHeaders),
        post: (url: string) => api.post(url).set(commonHeaders),
        put: (url: string) => api.put(url).set(commonHeaders),
        delete: (url: string) => api.delete(url).set(commonHeaders),
        patch: (url: string) => api.patch(url).set(commonHeaders),
        tokens: { csrfToken, token }
    };
};

export const initial = { loadServices, loadUsers, USERS, SERVICES };
export const db = { users: usersInDb, services: servicesInDb };
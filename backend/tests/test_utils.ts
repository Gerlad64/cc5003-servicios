import Service from "../src/models/service";
import User from "../src/models/user";
import mongoose from "mongoose";
const USERS = [
    {
        name: "John",
        last_name: "Doe",
        biography: "I like turtles",
    },
    {
        name: "Juan",
        last_name: "Perez",
        biography: "Me gustan las tortugas.",
    },
    {
        name: "Jean",
        last_name: "Pierre",
        biography: "J'aime les tortues."
    },
    {
        name: "Johann",
        last_name: "Peters",
        biography: "Ich mag es des Tørtüggens "
    }
]

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
            "rating": 4.2,
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
    ]

/** Elimina datos y luego carga datos de prueba a la base de datos de testing */
const load = async (session: mongoose.mongo.ClientSession) => {
    await User.deleteMany({}, {session})
    await Service.deleteMany({}, {session})
    const users = await User.insertMany(USERS);
    await Service.insertMany(
        SERVICES.map((s, i) => ({ ...s, user_id: users[i]._id }))
    , {session});
}

export default {load, USERS, SERVICES};
import {z} from 'zod'

const TareasSchema = z.object(
    {
        "titulo": z.string(),
        "descripcion": z.string().min(20,{
            message: "la descripcion debe de contener al menos 20 caracteres"
        }),
        "completada": z.boolean(),
    }
).strict()

export const ValidateTareasSchema = (tareas) => TareasSchema.safeParse(tareas)

export const ValidatePartialTareasSchema = (tareas) => TareasSchema.partial().safeParse(tareas)
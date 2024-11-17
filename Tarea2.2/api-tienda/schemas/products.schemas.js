import { z } from "zod";

const ProductSchema = z.object({
  nombre: z.string({
    invalid_type_error: "El nombre debe ser un string"
  }).trim().min(1, "El nombre no puede estar vacío").max(40, "El nombre debe tener como máximo 40 caracteres."),
  
  descripcion: z.string({
    invalid_type_error: "La descripcion debe ser un string"
  }).trim().min(1, "La descripcion no puede estar vacía").max(60, "La descripcion debe tener como máximo 60 caracteres."),
  
  precio: z.number()
    .min(1, "El precio debe ser mayor o igual a 1")
    .multipleOf(0.01, "El precio debe ser un múltiplo de 0.01"),
  
  stock: z.number()
    .int("El stock debe ser un número entero")
    .min(1, "El stock debe ser mayor o igual a 1"),
  
  categoria: z.string()
    .trim()
    .min(1, "La categoría no puede estar vacía")
    .max(20, "La categoría debe tener como máximo 20 caracteres.")
}).strict()

export const validateProductSchema = (product) => ProductSchema.safeParse(product)

export const validatePartialProductSchema = (product) => ProductSchema.partial().safeParse(product)


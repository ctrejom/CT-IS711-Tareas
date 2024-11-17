import { z } from "zod";

const ProductSchema = z.object({
  nombre: z.string({
    invalid_type_error: "El nombre debe ser un string"
  }).trim().min(1).max(40, "El nombre debe tener como máximo 40 caracteres."),
  descripcion: z.string({
    invalid_type_error: "La descripcion debe ser un string"
  }).trim().min(1).max(60, 
    "El nombre debe tener como máximo 60 caracteres."),
  precio: z.number().min(0, "El precio debe ser mayor o igual a 0").multipleOf(0.01),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  categoria: z.string().trim().min(1).max(20,"El nombre debe tener como máximo 40 caracteres.")
});

export const validateProductSchema = (product) => ProductSchema.safeParse(product)


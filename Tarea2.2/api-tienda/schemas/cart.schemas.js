import { z } from "zod"

const CartSchema = z.object({
    "usuario_id": z.number().int().min(1),
    "producto_id": z.number().int().min(1),
    "cantidad": z.number().int().min(1)

}).strict()

export const validateCartSchema = (cart) => CartSchema.safeParse(cart)
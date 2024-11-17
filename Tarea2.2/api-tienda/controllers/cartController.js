import connection from "../config/db.js";
import { validateCartSchema } from "../schemas/cart.schemas.js";

export class CartController {

    static getCartByUser(req, res) {
        const {Userid} = req.params
        const consulta = "Select producto_id from carrito where usuario_id = ?"

        try{
            connection.query(consulta, [Userid], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }

                if (results && results.length === 0) {
                    return res.json({
                            message: "Usuario no encontrado"
                        })
                }

                return res.header('Content-Type', 'application/json').status(200).json(results)
            })
        }catch(error){
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }    
            
    }

    static addToCart(req, res) {
        const consulta = "Insert into carrito (usuario_id, producto_id, cantidad) values (?,?,?)"
        const validacionProductoid = "SELECT id FROM productos WHERE id = ?"
        const validacionUsuarioid = "SELECT id FROM usuarios WHERE id = ?"
        const data = req.body
        const { success, error } = validateCartSchema(data)
    
        if (!success) {
            return res.status(400).json({
                message: JSON.parse(error.message)
            })
        }
    
        try {
            const { usuario_id, producto_id, cantidad } = data
    
            connection.query(validacionProductoid, [producto_id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al verificar el producto: " + error,
                    });
                }
    
                if (results.length === 0) {  
                    return res.status(404).json({
                        error: true,
                        message: `Producto no encontrado.`,
                    });
                }
    
                
                connection.query(validacionUsuarioid, [usuario_id], (error, results) => {
                    if (error) {
                        return res.status(400).json({
                            error: true,
                            message: "Ocurrió un error al verificar el usuario: " + error,
                        });
                    }
    
                    if (results.length === 0) {  // Si no se encontró el usuario
                        return res.status(404).json({
                            error: true,
                            message: `Usuario no encontrado.`,
                        });
                    }
    
                    // Si tanto el producto como el usuario existen, se inserta en el carrito
                    connection.query(consulta, [usuario_id, producto_id, cantidad], (error, results) => {
                        if (error) {
                            return res.status(400).json({
                                error: true,
                                message: "Ocurrió un error al obtener los datos: " + error
                            })
                        }
                        return res.header('Content-Type', 'application/json').status(201).json(data)
                    })
                })
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }

    static removeFromCart (req, res) {
        const consulta = "delete from carrito where id = ?"
        const {id} = req.params

        try{
            connection.query(consulta, [id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al borrar los datos " + error
                    })
                }

                if (results && results.length === 0) {
                    return res.json({
                            message: "Carrito no encontrado"
                        })
                }

                return res.status(200).json({
                    success: true,
                    message: "Carrito eliminado exitosamente"
                });
            })
        }catch(error){
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }
    
}

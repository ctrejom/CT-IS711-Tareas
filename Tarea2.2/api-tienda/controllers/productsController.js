import connection from "../config/db.js";
import { validateProductSchema, validatePartialProductSchema} from "../schemas/products.schemas.js";

export class ProductsController{
    static getAllProducts(req, res) {
        const consulta = "SELECT id, nombre, descripcion, precio, stock, categoria, fecha_creacion FROM productos"

        try {
            connection.query(consulta, (error, results) => {

                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los dato: " + error
                    })
                }
                return res.header('Content-Type', 'application/json').status(200).json(results)

            })

        } catch (error) {

            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })

        }
    }

    static getProductById(req, res) {
        const {id} = req.params
        const consulta = "SELECT id, nombre, descripcion, precio, stock, categoria, fecha_creacion FROM productos WHERE id = ?"
        try{
            connection.query(consulta, [id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }

                if (results && results.length === 0) {
                    return res.json({
                            message: "Producto no encontrado"
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

    static createProduct(req, res) {

        const consulta = `INSERT INTO productos (nombre, descripcion, precio, stock, categoria) 
                        VALUES ( ?,?,?,?,? ) `

        const data = req.body
        const { success, error } = validateProductSchema(data)

        if (!success) {
            return res.status(400).json({
                message: JSON.parse(error.message)
            })
        }


        try {

            const { nombre, descripcion, precio, stock, categoria } = data

            connection.query(consulta,[nombre, descripcion, precio, stock, categoria], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }
                return res.header('Content-Type', 'application/json').status(201).json(data)
            })
        } catch (error) {
            res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }

    static updateProduct(req, res) {
        const { id } = req.params;
        const data = req.body
    
        const { success, error } = validatePartialProductSchema(data);
    
        if (!success) {
            return res.status(400).json({
                message: JSON.parse(error.message),
            });
        }
    
        const consulta = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?
            WHERE id = ?`;
    
        const { nombre, descripcion, precio, stock, categoria } = data;
    
        try {
            connection.query(
                consulta,
                [nombre, descripcion, precio, stock, categoria, id], 
                (error, results) => {
                    if (error) {
                        return res.status(400).json({
                            error: true,
                            message: "Ocurrió un error al actualizar los datos: " + error,
                        });
                    }
    
                    if (results && results.length === 0) {
                        return res.status(404).json({
                            error: true,
                            message: `Producto con ID ${id} no encontrado.`,
                        });
                    }
    
                    return res.status(200).json({
                        success: true,
                        message: "Producto actualizado exitosamente",
                        data: { id, ...data },
                    });
                }
            );
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al procesar la solicitud",
            });
        }
    }
    


    static deleteProduct(req, res) {

        const consulta = "delete from productos where id = ?"
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
                            message: "Producto no encontrado"
                        })
                }

                return res.status(200).json({
                    success: true,
                    message: "Producto eliminado exitosamente"
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

    

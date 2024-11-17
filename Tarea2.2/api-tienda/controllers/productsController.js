import connection from "../config/db.js";

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
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(results)

            })

        } catch (error) {

            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })

        }
    }
}
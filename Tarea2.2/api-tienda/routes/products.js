import { Router } from 'express'
import { ProductsController } from '../controllers/productsController.js'

const ProductsRouter = Router()

ProductsRouter.get('/', ProductsController.getAllProducts)
ProductsRouter.get('/:id', ProductsController.getProductById)
ProductsRouter.post('/', ProductsController.createProduct)
ProductsRouter.delete('/:id', ProductsController.deleteProduct)




export default ProductsRouter
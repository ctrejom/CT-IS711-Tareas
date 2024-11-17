import { Router } from 'express'
import { ProductsController } from '../controllers/productsController.js'

const ProductsRouter = Router()

ProductsRouter.get('/', ProductsController.getAllProducts)

export default ProductsRouter
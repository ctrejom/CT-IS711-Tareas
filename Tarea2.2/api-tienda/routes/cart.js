import { Router } from 'express'
import { CartController } from '../controllers/cartController.js'

const CartRouter = Router()

CartRouter.get('/:Userid', CartController.getCartByUser)
CartRouter.post('/', CartController.addToCart)
CartRouter.delete('/:id', CartController.removeFromCart)


export default CartRouter
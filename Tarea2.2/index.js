import express from 'express'
import ProductsRouter from './api-tienda/routes/products.js'
import CartRouter from './api-tienda/routes/cart.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use('/products', ProductsRouter)
app.use('/cart', CartRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
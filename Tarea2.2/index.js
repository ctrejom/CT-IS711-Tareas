import express from 'express'

const app = express()

const PORT = Process.env.PORT || 3000

app.get('/products', (req, res) => {
    res.send('Hola')
})

app.get('/', (req, res) => {
    res.send('Hola')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
import express from 'express'
import tareas from './tareas.json' with {type: 'json'}
import { ValidateTareasSchema } from './tarea_schema.js'
import crypto, { randomUUID } from 'crypto'
import { error } from 'console'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 3000

app.get('/tareas', (req,res) => {
    res.json(tareas)
})

app.post('/tareas', (req,res) => {
    
    const data = req.body 

    if (typeof data.completada === 'string') {
        data.completada = data.completada.toLowerCase() === 'true';
    }

    const {success,error} = ValidateTareasSchema(data)

    if(!success){
         return res.status(400).json({
            message: JSON.parse(error.message)
        })
    }

    

    data.id = randomUUID()
    data.fecha_creacion = new Date()

    tareas.push(data)
    res.json(data);
 
})

app.get('/tareas/:id', (req,res) => {
    
    const { id } = req.params

    const tarea = tareas.find(tarea => tarea.id == id)

    if(!tarea)
    {
        return res.status(400).json({
                message: "Tarea no encontrado"
        })
    }

    res.json(tarea)

})

app.put('/tareas/:id', (req,res) => {
    const data = req.body

    if (typeof data.completada === 'string') {
        data.completada = data.completada.toLowerCase() === 'true';
    }

    const { success, error } = ValidateTareasSchema(data)

    if (!success) {
         return res.status(400).json({
            message: JSON.parse(error.message)
        })
    }

    const { id } = req.params

        const tareaIndex = tareas.findIndex(tarea => tarea.id == id)
 
        if (tareaIndex === -1) {
            res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        //TODO: actualizar en la BBDD
        tareas[tareaIndex] = { ...tareas[tareaIndex], ...data } //simulación

        res.json(tareas[tareaIndex])
})

app.delete('/tareas/:id', (req, res) => {
    const {id} = req.params

    const tareaIndex = tareas.findIndex(tarea => tarea.id == id)

    if (tareaIndex === -1) {
        res.status(404).json({
            message: "no hay tarea que borrar"
        })
    }

    tareas.splice(tareaIndex, 1)

    res.json({
        message: "Se borro la tarea exitosamente"
    })

})


app.use((req, res) =>{
    res.status(404).json({
        message: "La URL ingresada es incorrecta. Solo contamos con las siguientes rutas: /tareas, /tareas/id",
    })
})
app.listen(3000, () => {
    console.log(`Listen from http://localhost:${PORT}`)
})
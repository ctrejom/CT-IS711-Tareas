##Instalacion

1. Instalar dependendencias usadas en la API
    npm install express
    npm install zod

2. Estructura de Archivos
    index.js: Archivo principal donde tenemos configuaras las rutas de la API
    tareas.json: Contiene los datos de nuestra api
    tarea_schema.js: Define el esquema de validación de las tareas utilizando zod.

3. Rutas de la API
    3.1 Obtener Tareas
            GET /tareas
    3.2 Obtener Tareas por su id
            GET /tareas/id
    3.3 Crear una Nueva Tarea
            POST /tareas
                La solicitud debe incluir un objeto JSON con esta estructura de datos
                    {
                        "titulo": "Título de la tarea",
                        "descripcion": "Descripción detallada de al menos 20 caracteres",
                        "completada": true
                    }
    3.4 Actualizar nueva tarea por su id
            PUT /tareas/id
                Sigue la misma estructura de datos que al crear una nueva tarea
    3.5 Eliminar una nueva tarea por su id
            DELETE /tareas/id

4. Ejecucion
    Ingresaremos este comando para ahorrarnos trabajo al guardar
        npm run dev

Este archivo `README.md` debería guiar a los usuarios sobre cómo instalar y ejecutar la API.
    
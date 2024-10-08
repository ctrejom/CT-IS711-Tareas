async function ejecutarConsulta() {
    try {
        const consulta = await consultarBaseDeDatos()
        console.log(consulta)
    } catch (error) {
        console.error("Error al consultar a la base de datos")
    }           
}

function consultarBaseDeDatos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const Nrandom= Math.floor(Math.random() * 100000);
            if(Nrandom %2 === 0)
            {
                resolve("Consulta Exitosa")

            }
            else{
                reject("Error en la Consulta")
            }
        },3000)
    })
}

ejecutarConsulta()
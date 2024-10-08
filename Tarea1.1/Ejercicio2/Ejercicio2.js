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

consultarBaseDeDatos()
    .then(mensaje => {
        console.log(mensaje);
    })
    .catch(error => {
        console.error(error);
    });
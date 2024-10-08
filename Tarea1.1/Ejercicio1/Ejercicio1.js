async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await respuesta.json();
        
        usuarios.forEach(usuario => {
            console.log(`Nombre: ${usuario.name}, Email: ${usuario.email}`);
        });
    }catch (error) {
        console.error('Error al obtener los usuarios:', error);
     }
}
obtenerUsuarios().finally(
    console.log("Final del Primer Ejercicio"),
    console.log("-----------------------------")
)

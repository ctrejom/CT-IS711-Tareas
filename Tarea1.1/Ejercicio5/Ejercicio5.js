const tareas = [];

function agregarTarea(descripcion) {
    const tarea = {
        descripcion: descripcion,
        completada: false
    };
    tareas.push(tarea);
}

function marcarTareaComoCompletada(descripcion) {
    const tarea = tareas.find(t => t.descripcion === descripcion);
    if (tarea) {
        tarea.completada = true;
    }
}


function listarTareasPendientes() {
    const tareasPendientes = tareas.filter(t => !t.completada);
    console.log("Tareas pendientes:");
    tareasPendientes.forEach(t => console.log(t.descripcion));
}


function listarTareasCompletadas() {
    const tareasCompletadas = tareas.filter(t => t.completada);
    console.log("Tareas completadas:");
    tareasCompletadas.forEach(t => console.log(t.descripcion));
}


agregarTarea("Comprar leche");
agregarTarea("Llamar al médico");
agregarTarea("Estudiar JavaScript");

marcarTareaComoCompletada("Comprar leche");

listarTareasPendientes();
listarTareasCompletadas();

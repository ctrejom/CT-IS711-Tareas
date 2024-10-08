const productos = [
    { nombre: "Televisor", precio: 500, categoria: "Electronica" },
    { nombre: "Silla", precio: 100, categoria: "Muebles" },
    { nombre: "Laptop", precio: 800, categoria: "Electronica" },
    { nombre: "Mesa", precio: 200, categoria: "Muebles" },
    { nombre: "Auriculares", precio: 150, categoria: "Electronica" }
]

const Pfiltrados = productos.filter((p) => p.categoria === "Electronica")

const ArrayPFiltrados = Pfiltrados.map((pf) => pf.nombre)

const PTotal = Pfiltrados.reduce((total, p) => total + p.precio, 0);

console.log("Productos filtrados:", Pfiltrados)
console.log("Nombres de los productos filtrados:", ArrayPFiltrados)
console.log("Precio total de los productos filtrados:", PTotal)

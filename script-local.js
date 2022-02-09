// 1ero - obtener el json
// 2do - imprimir productos al html
//3ero - agregar al carrito un producto
//4to - carrito dinamico y persistente (localStorage)
//5ta - eliminar producto del carrito
//6to - imprimir contenido del carrito

$(() => {
    obtenerProductos ();
    imprimirCarrito (carrito);
});
 
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let productos;
function obtenerProductos () {
    // Traer Json con Jquery
    $.get ("productos.json", (respuesta, estado) => {
        productos = respuesta.productos;
        imprimirProductos (productos);
    });
}
function imprimirProductos (array) {
    array.forEach ((prod) => {
        $(".container").append (
            `
            <div class= "producto">
                <div class="info">
                    <img src="${prod.url}" alt= "${prod.nombre}">
                    <div>
                    <h2>${prod.nombre}</h2>
                    <h3>$${prod.precio}</h3>
                    </div>
                </div>
                <button id="${prod.id}" onclick= "agregarAlCarrito(event)">Añadir al carrito</button>
            </div>
            `
        );
    })
}

function agregarAlCarrito (e) {
    let id = Number(e.target.id);
    let productoElegido = productos.find ((p)=> p.id === id);
    console.log (productoElegido);
    carrito.push(productoElegido);

    localStorage.setItem("carrito",JSON.stringify(carrito));

    imprimirCarrito(carrito);
}
function eliminarProducto (e) {
    let id = Number(e.target.id);
    let index = carrito.findIndex ((p)=> p.id === id);
    
    carrito.splice(index, 1)

    imprimirCarrito(carrito);

    localStorage.setItem("carrito",JSON.stringify(carrito));
}


function imprimirCarrito(array) {
	$("#carrito").empty();
	let total = 0;
	array.forEach((prod) => {
		total = total + prod.precio;
		$("#carrito").append(`
        <tr>
            <td>${prod.nombre}</td>
            <td>$${prod.precio}</td>
            <td><button id="${prod.id}" class="eliminar" onclick="eliminarProducto(event)">Eliminar</button></td>
        </tr>
        `);
	});

	$("#carrito").append(`
<span class="total">Total $${total.toFixed(2)}`);
}

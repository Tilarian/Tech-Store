import { Producto, agregarAlCarrito } from "./clases.js";

const arrayDeProductos = [];
let ArrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
let idUniversal = 1;


// PRODUCTOS
const celular1 = new Producto("Samsung Galaxy S23", 1000, "celulares", idUniversal++, "./IMG/celular1.jpg");
arrayDeProductos.push(celular1);

const celular2 = new Producto("Iphone 13", 1000, "celulares", idUniversal++, "./IMG/celular2.jpg");
arrayDeProductos.push(celular2);

const auricular1 = new Producto("Auriculares Hyperx Cloud 2", 1000, "perifericos", idUniversal++, "./IMG/auricular1.jpg");
arrayDeProductos.push(auricular1);

const auricular2 = new Producto("Auriculares Logitech G Pro", 1000, "perifericos", idUniversal++, "./IMG/auricular2.jpg");
arrayDeProductos.push(auricular2);

const consola1 = new Producto("Playstation 5", 1000, "consolas", idUniversal++, "./IMG/consola1.jpg");
arrayDeProductos.push(consola1);

const consola2 = new Producto("Xbox Series X", 1000, "consolas", idUniversal++, "./IMG/consola2.jpg");
arrayDeProductos.push(consola2);

const monitor1 = new Producto("Monitor ASUS Gaming VG279Q 27″ 144hz", 1000, "monitores", idUniversal++, "./IMG/monitor1.jpg");
arrayDeProductos.push(monitor1);

const monitor2 = new Producto("Monitor Samsung UE570 28″ UHD 4K", 1000, "monitores", idUniversal++, "./IMG/monitor2.jpg");
arrayDeProductos.push(monitor2);

const notebook1 = new Producto("Notebook ASUS GL702VI Gaming", 1000, "notebooks", idUniversal++, "./IMG/notebook1.jpg");
arrayDeProductos.push(notebook1);
let productoEncontrado = {};

const app = document.querySelector("#app");
const carritoButton = document.querySelector("#carrito_button");
const input = document.querySelector("#search");

input.addEventListener("input", (event) => {
    console.log(event.target.value)
    productoEncontrado = arrayDeProductos.find(el => el.nombre === event.target.value)

})

input.addEventListener("keypress", (event) => {
    (event.key === "Enter" && productoEncontrado) && console.log("El producto es:", productoEncontrado)
})

// Botón del carrito -- Toastify -- Contador de productos y precio final
carritoButton.addEventListener("click", () => {
    app.innerHTML = '';
    ArrayCarrito.forEach(el => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = ` 
                        <div class="tarjeta_image"><img src="${el.url}" alt=""/></div>
                        <div class="tarjeta_informacion">
                            <span class="tarjeta_nombre">${el.nombre}</span>
                            <span class="tarjeta_precio">$${el.precio}</span>
                        </div>
        `

        app.appendChild(tarjeta);

    }) 

    let total = ArrayCarrito.reduce((contadorProductos,el)=> contadorProductos + el.precio,0)
    
    Toastify({
        text: `Tienes ${ArrayCarrito.length} productos en tu carrito con un total de $${total}.`,
        duration: 3000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
})

arrayDeProductos.forEach((el) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = ` 
                    <div class="tarjeta_image"><img src="${el.url}" alt=""/></div>
                    <div class="tarjeta_informacion">
                        <span class="tarjeta_nombre">${el.nombre}</span>
                        <span class="tarjeta_precio">$${el.precio}</span>
                    </div>
    `




    // Agregar al carrito -- Sweetalert
    const buttonAgregar = document.createElement("button");
    buttonAgregar.innerText = "Agregar";
    buttonAgregar.addEventListener("click", () => {
        agregarAlCarrito(ArrayCarrito,el);
        localStorage.setItem("carrito", JSON.stringify(ArrayCarrito));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se agregó correctamente al carrito el producto' + el.nombre,
            showConfirmButton: false,
            timer: 1500
          })
    })





    tarjeta.appendChild(buttonAgregar);
    app.appendChild(tarjeta);
})

const finalizarCompra = () => {

    ArrayCarrito = []
    localStorage.remove("carrito")

}


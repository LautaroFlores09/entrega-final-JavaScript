let productos=[];
fetch("/JSON/productos.json")
     .then(response=>response.json())
     .then(data=>{
          productos=data;
          cargarProductos(productos);
     })

const contenedorProductos=document.querySelector("#menu");
let botonesAgregar=document.querySelectorAll(".boton-agregar");
const numerito=document.querySelector("#numerito");


function cargarProductos(){
     productos.forEach(producto => {
          const div= document.createElement("div")
          div.classList.add("card_menu")
          div.innerHTML=`
               <img src="${producto.imagen}" alt="${producto.titulo}">
               <div>
                    <h3>${producto.titulo}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet assumenda quidem amet aliquid provident necessitatibus tempore culpa consequuntur dignissimos libero, hic veniam totam quisquam! Laudantium similique consectetur placeat est inventore.</p>
                    <h4>$${producto.precio}</h4>
                    <a id="agregar0" href="#"><button class="boton-agregar" id="${producto.id}">Agregar</button></a>
               </div>
          `;
          contenedorProductos.append(div);
     })
     actualizarBotones ();
}


function actualizarBotones (){
     botonesAgregar=document.querySelectorAll(".boton-agregar")
     botonesAgregar.forEach(boton=>{
          boton.addEventListener("click", agregarAlCarrito)
     })
}

let carrito;
const productosEnCarritoLS =localStorage.getItem("productos-en-carrito")
if(productosEnCarritoLS){
     carrito=JSON.parse(productosEnCarritoLS);
     actualizarNumerito();
}else{
     carrito=[];
}


function agregarAlCarrito(e){
     Toastify({
          text: "PRODUCTO AGREGADO",
          duration: 3000,
          destination: "/pages/carrito.html",
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#fc7200",
            borderRadius:"2rem",
            fontSize:".75rem",
          },
          offset: {
               x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
               y: 5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
             },
          onClick: function(){} // Callback after click
        }).showToast();
     const idBoton= e.currentTarget.id;
     const productoAgregado=productos.find(producto => producto.id === idBoton)
     if(carrito.some(producto=> producto.id===idBoton)){
          const index=carrito.findIndex(producto => producto.id===idBoton)
          carrito[index].cantidad++;
     }else{
          productoAgregado.cantidad=1;
          carrito.push(productoAgregado); 
     }
     actualizarNumerito()
     localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
}

function actualizarNumerito(){
     let nuevoNumerito= carrito.reduce((acc,producto)=>acc + producto.cantidad, 0)
     numerito.innerText=nuevoNumerito;
}


import { obtenerCarrito, guardarCarrito, actualizarBadgeCarrito } from "./util.js";

function crearTarjetaCarrito(p) {
  const art = document.createElement("div");
  art.className = "producto-carrito";
  art.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}" class="producto-imagen">
    <div class="producto-info">
      <h3>${p.title}</h3>
      <p class="producto-precio">$${p.precio.toLocaleString("es-AR")}</p>
      <div class="producto-cantidad">
        <span>Cantidad: ${p.cantidad}</span>
        <div class="controles-cantidad">
          <button class="btn-cantidad" onclick="disminuirCantidad(${p.id})">-</button>
          <span class="cantidad-actual">${p.cantidad}</span>
          <button class="btn-cantidad" onclick="aumentarCantidad(${p.id})">+</button>
        </div>
      </div>
      <p class="producto-subtotal"> Subtotal: $${(p.precio * p.cantidad).toLocaleString("es-AR")}</p>
    </div>
    <button class="btn-eliminar" onclick="eliminarDelCarrito(${p.id})">
        Eliminar
    </button>
  `;
  return art;
}

function mostrarResumenCarrito(carrito) {
  const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
  const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
  
  const resumenHTML = `
    <div class="resumen-carrito">
      <h3>Resumen del Carrito</h3>
      <div class="resumen-linea">
        <span>Productos: ${totalItems}</span>
        <span>Total: $${total.toLocaleString("es-AR")}</span>
      </div>
      <div class="acciones-carrito">
        <button class="btn-vaciar" onclick="vaciarCarrito()">Vaciar Carrito</button>
        <a href="formulario.html" class="btn-comprar" id="btn-comprar">Finalizar Compra</a>
      </div>
    </div>
  `;
  
  return resumenHTML;
}

function renderizarCarrito(productosFiltrados) {
  const cont = document.getElementById("carrito");
  if (!cont) return;
  
  cont.innerHTML = "";
  
  if (productosFiltrados.length === 0) {
    cont.innerHTML = `
      <div class="carrito-vacio">
        <h3>Tu carrito está vacío</h3>
        <p>¡Agrega algunos productos para comenzar a comprar!</p>
        <a href="/IntegradorWEB/index.html" class="btn-seguir-comprando">Seguir Comprando</a>
      </div>
    `;
    return;
  }
  
  // Crear contenedor principal
  const contenedorPrincipal = document.createElement("div");
  contenedorPrincipal.className = "contenedor-carrito";
  
  // Contenedor para los productos
  const productosContainer = document.createElement("div");
  productosContainer.className = "lista-productos-carrito";
  
  productosFiltrados.forEach(p => {
    productosContainer.appendChild(crearTarjetaCarrito(p));
  });
  
  // Agregar resumen
  const resumenContainer = document.createElement("div");
  resumenContainer.innerHTML = mostrarResumenCarrito(productosFiltrados);
  
  contenedorPrincipal.appendChild(productosContainer);
  contenedorPrincipal.appendChild(resumenContainer);
  cont.appendChild(contenedorPrincipal);
}

// Funciones globales para los botones
window.disminuirCantidad = function(productoId) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === productoId);
  
  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      // Si la cantidad es 1, eliminar el producto
      return window.eliminarDelCarrito(productoId);
    }
    guardarCarrito(carrito);
    actualizarBadgeCarrito();
    initCarrito();
  }
}

window.aumentarCantidad = function(productoId) {
  const carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === productoId);
  
  if (producto) {
    producto.cantidad++;
    guardarCarrito(carrito);
    actualizarBadgeCarrito();
    initCarrito();
  }
}

window.eliminarDelCarrito = function(productoId) {
  if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
    const carrito = obtenerCarrito();
    const nuevoCarrito = carrito.filter(p => p.id !== productoId);
    guardarCarrito(nuevoCarrito);
    actualizarBadgeCarrito();
    initCarrito();
  }
}

window.vaciarCarrito = function() {
  if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
    guardarCarrito([]);
    actualizarBadgeCarrito();
    initCarrito();
  }
}


window.finalizarCompra = function() {
  const carrito = obtenerCarrito();
  
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
  
  if (confirm(`¿Confirmar compra por $${total.toLocaleString("es-AR")}?`)) {
    alert('¡Compra realizada con éxito! Gracias por tu compra.');
    guardarCarrito([]);
    actualizarBadgeCarrito();
    initCarrito();
  }
}

export function initCarrito() {
  const cont = document.getElementById("carrito");
  if (!cont) return;
  
  // Renderizar todos los productos del carrito
  const carrito = obtenerCarrito();
  renderizarCarrito(carrito);
}

document.addEventListener("DOMContentLoaded", initCarrito);









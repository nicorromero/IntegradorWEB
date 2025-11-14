
import productos  from "./data.js";
import { obtenerStock, guardarStock, actualizarBadgeCarrito } from "./util.js";
import { agregarAlCarrito } from "./carrito.js"; // importar función de carrito.js

function getParametroId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function renderDetalle(p) {
  const cont = document.getElementById("detalleProducto");
  if (!cont) return;

  cont.innerHTML = `
    <div class="detalle">
      <img src="${p.image}" alt="${p.title}">
      <div class="info">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <p><strong>Categoría:</strong> ${p.category}</p>
        <p><strong>Precio:</strong> $${p.price.toLocaleString("es-AR")}</p>
        <p><strong>Stock:</strong> ${p.stock}</p>
        <button id="btnCarrito" ${p.stock === 0 ? "disabled" : ""}>
          ${p.stock > 0 ? "Agregar al carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  `;

  const btn = document.getElementById("btnCarrito");
  if (btn) {
    btn.addEventListener("click", () => {
      if (p.stock > 0) {
        // --- 1. Agregar al carrito (carrito.js) ---
        agregarAlCarrito(p);

        // --- 2. Actualizar stock ---
        p.stock -= 1;
        let stock = obtenerStock();
        stock[p.id] = p.stock;
        guardarStock(stock);

        // --- 3. Volver a renderizar + badge ---
        renderDetalle(p);
        actualizarBadgeCarrito();
      }
    });
  }
}

function initDetalle() {
  const id = getParametroId();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    document.getElementById("detalleProducto").innerHTML = `<p>Producto no encontrado.</p>`;
    return; // Salimos si no hay producto
  } 

  // Usar stock guardado en localStorage si existe
  const stock = obtenerStock();
  if (stock[producto.id] !== undefined) {
    // 1. Usar stock guardado en localStorage si existe
    producto.stock = stock[producto.id];
  } else {
    // 2. Si no existe, es la primera vez que vemos este producto.
    // Asignamos un stock inicial por defecto (ej: 10)
    // (La API también nos da 'producto.rating.count', ¡podrías usar eso!)
    producto.stock = 10; 
  }

  if (producto) {
    renderDetalle(producto);
  } else {
    document.getElementById("detalleProducto").innerHTML = `<p>Producto no encontrado.</p>`;
  }

  actualizarBadgeCarrito(); // refrescar contador al entrar
}

initDetalle()


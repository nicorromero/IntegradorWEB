
import { productos } from "./data.js";
import { obtenerStock, guardarStock, actualizarBadgeCarrito } from "./util.js";
import { agregarAlCarrito } from "./carrito.js"; // 👈 usamos la función centralizada

function getParametroId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function renderDetalle(p) {
  const cont = document.getElementById("detalleProducto");
  if (!cont) return;

  cont.innerHTML = `
    <div class="detalle">
      <img src="${p.img}" alt="${p.nombre}">
      <div class="info">
        <h2>${p.nombre}</h2>
        <p>${p.descripcion}</p>
        <p><strong>Categoría:</strong> ${p.categoria}</p>
        <p><strong>Precio:</strong> $${p.precio.toLocaleString("es-AR")}</p>
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

  // Usar stock guardado en localStorage si existe
  const stock = obtenerStock();
  if (producto && stock[producto.id] !== undefined) {
    producto.stock = stock[producto.id];
  }

  if (producto) {
    renderDetalle(producto);
  } else {
    document.getElementById("detalleProducto").innerHTML = `<p>Producto no encontrado.</p>`;
  }

  actualizarBadgeCarrito(); // refrescar contador al entrar
}

document.addEventListener("DOMContentLoaded", initDetalle);


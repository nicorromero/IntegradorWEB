

import { obtenerCarrito, guardarCarrito, actualizarBadgeCarrito } from "./util.js";


export function ensureCartButton() {
  const nav = document.querySelector("header nav");
  if (!nav) return;

  let link = nav.querySelector(".cart-link");
  if (!link) {
    link = document.createElement("a");
    link.href = "/IntegradorWEB/pages/carrito.html";
    link.className = "cart-link";
    link.setAttribute("aria-label", "Carrito");
    link.innerHTML = `
      <span class="cart-ico" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A2 2 0 0 0 10 19h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.8-1.1l3.58-7.16A1 1 0 0 0 22 4h-2l-3.6 7H10.25L7 4Z"/>
          <circle cx="10" cy="21" r="1.7"/>
          <circle cx="18" cy="21" r="1.7"/>
        </svg>
      </span>
      <span id="contadorCarrito" class="cart-badge">0</span>
    `;
    nav.appendChild(link);
  }
}


export function updateBadge(n, animate = true) {
  const badge = document.getElementById("contadorCarrito");
  if (!badge) return;

  badge.textContent = n;

  if (animate) {
    badge.classList.remove("bump");
    badge.offsetWidth; 
    badge.classList.add("bump");
  }
}


export function agregarAlCarrito(producto) {
  let carrito = obtenerCarrito();

  const item = carrito.find(p => p.id === producto.id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  actualizarBadgeCarrito();
}

// --- Inicialización global ---
document.addEventListener("DOMContentLoaded", () => {
  ensureCartButton();
  actualizarBadgeCarrito(); // mostrar número correcto apenas se carga la página
});

//--- LOCAL STORAGE ---
export function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function guardarStock(stock) {
  localStorage.setItem("stock", JSON.stringify(stock));
}

export function obtenerStock() {
  return JSON.parse(localStorage.getItem("stock")) || {};
}

// --- BADGE DEL CARRITO ---
export function actualizarBadgeCarrito() {
  const carrito = obtenerCarrito();
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const badge = document.getElementById("contadorCarrito");
  if (badge) badge.textContent = total;
}


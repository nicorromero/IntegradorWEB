import { productos } from "./data.js";


function crearTarjetaProducto(p) {
  const art = document.createElement("div");
  art.className = "producto";
  art.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}">
    <div class="body">
      <h3>${p.nombre}</h3>
      <p class="precio">$ ${p.precio.toLocaleString("es-AR")}</p>
      <a class="btn-detalle" href="pages/producto.html?id=${p.id}" aria-label="Ver detalles de ${p.nombre}">
        Ver detalles
      </a>
    </div>
  `;
  return art;
}

function renderizarProductos(productosFiltrados) {
  const cont = document.getElementById("catalogo");
  if (!cont) return;
  cont.innerHTML = "";
  productosFiltrados.forEach(p => cont.appendChild(crearTarjetaProducto(p)));
}

/*function initCatalogo() {
  const cont = document.getElementById("catalogo");
  if (!cont) return;
  cont.innerHTML ="";
  // Renderizar todos los productos inicialmente
  renderizarProductos(productos);

  // Crear filtros por categoría
  const categorias = [...new Set(productos.map(p => p.categoria))];
  const filtroCont = document.createElement("div");
  filtroCont.className = "filtros";
  filtroCont.innerHTML = `
    <h3>Filtrar por categoría:</h3>
    <button data-categoria="todos">Todos</button>
    ${categorias.map(cat => `<button data-categoria="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>`).join("")}
  `;
  cont.prepend(filtroCont);

  // Manejar clics en los botones de filtro
  filtroCont.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const categoria = e.target.dataset.categoria;
      const productosFiltrados = categoria === "todos" 
        ? productos 
        : productos.filter(p => p.categoria === categoria);
      renderizarProductos(productosFiltrados);
    }
  });
}*/
function initCatalogo() {
  const cont = document.getElementById("catalogo");
  if (!cont) return;

  // Crear contenedor de filtros fuera del contenedor de productos
  const filtroCont = document.createElement("div");
  filtroCont.className = "filtros";
  filtroCont.innerHTML = `
    <h3>Filtrar por categoría:</h3>
    <button data-categoria="todos" class="filtro-activo">Todos</button>
    ${[...new Set(productos.map(p => p.categoria))].map(cat => `
      <button data-categoria="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
    `).join("")}
  `;
  cont.parentNode.insertBefore(filtroCont, cont); // Insertamos los filtros antes del catálogo

  // Renderizar todos los productos inicialmente
  renderizarProductos(productos);

  // Manejar clics en los botones de filtro
  filtroCont.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Remover clase activo de todos los botones
      filtroCont.querySelectorAll("button").forEach(btn => btn.classList.remove("filtro-activo"));
        // Añadir clase activo al botón clicado
      e.target.classList.add("filtro-activo");

      const categoria = e.target.dataset.categoria;
      const productosFiltrados = categoria === "todos" 
        ? productos 
        : productos.filter(p => p.categoria === categoria);
      renderizarProductos(productosFiltrados);
    }
  });
}




document.addEventListener("DOMContentLoaded", initCatalogo)



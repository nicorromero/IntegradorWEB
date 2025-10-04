
import {productos} from "./data.js";

function tomarAleatorios(arr, n = 3) {
  const src = [...arr];

  const enStock = src.filter(p => p.stock > 0);
  const base = enStock.length >= n ? enStock : src;

  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base.slice(0, n);
}

function ContenedorDestacado(p){
    const art = document.createElement("div");
    art.className = "producto";
    art.innerHTML =`
    
    <img src="${p.img}" alt="${p.nombre}">
    <div class="body">
      <h3>${p.nombre}</h3>
      <p class="precio">$ ${p.precio.toLocaleString("es-AR")}</p>
      <a class="btn-detalle" href="./pages/producto.html?id=${p.id}" aria-label="Ver detalles de ${p.nombre}">
        Ver detalles
      </a>
    </div>
  `;
  return art;
}

function initIndex() {
  const cont = document.getElementById("producto");
  if (!cont) return;
  cont.innerHTML = "";

  const destacados = tomarAleatorios(productos, 3);
  destacados.forEach(p => cont.appendChild(ContenedorDestacado(p)));
}

document.addEventListener("DOMContentLoaded", initIndex);


   



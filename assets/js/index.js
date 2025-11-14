
console.log("index.js cargado");

import productos from "./data.js";

console.log("Productos importados:", productos);

function tomarAleatorios(arr, n = 3) {
  const base = [...arr];

  

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
    
    <img src="${p.image}" alt="${p.title}">
    <div class="body">
      <h3>${p.title}</h3>
      <p class="precio">$ ${p.price.toLocaleString("es-AR")}</p>
      <a class="btn-detalle" href="pages/producto.html?id=${p.id}" aria-label="Ver detalles de ${p.title}">
        Ver detalles
      </a>
    </div>
  `;
  return art;
}

function initIndex() {
  console.log("Paso 1: initIndex se ejecutó.");

  const cont = document.getElementById("producto");
  if (!cont) 
    { 
      console.error("ERROR FATAL: No se encontró <div id='producto'>. Revisa tu HTML.");
      return;
    }

  console.log("Paso 2: Se encontró el contenedor #producto.", cont);
  cont.innerHTML = "";

  const destacados = tomarAleatorios(productos, 3);
  
  console.log("Paso 3: Se generaron los productos destacados:", destacados);
  
  destacados.forEach(p => cont.appendChild(ContenedorDestacado(p)));

  console.log("Paso 4: ¡Renderizado completado!");
}

initIndex();

const nav = document.querySelector('#nav');
const abrir = document.querySelector('.abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
    nav.classList.add('visible');
});

cerrar.addEventListener('click', () => {
    nav.classList.remove('visible');
});




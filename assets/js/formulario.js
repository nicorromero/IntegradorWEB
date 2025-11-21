


import { guardarCarrito, actualizarBadgeCarrito } from "./util.js";

const modalGracias = document.getElementById("modal-gracias");
const btnSeguirComprando = document.getElementById("btn-seguir-comprando");

function mostrarMensaje() {
if (modalGracias) {
    modalGracias.style.display = 'flex';
} else {
    console.error('No se encontró el elemento #modal-gracias');
}
}

function OcultarMensaje() {
    if (modalGracias) {
        modalGracias.style.display = 'none';
    } 
    window.location.href = "/index.html"; 
}

if (btnSeguirComprando) {
    btnSeguirComprando.addEventListener('click', OcultarMensaje);
} else {
    console.error('No se encontró el botón de seguir comprando');
}

/* logica del formulario de envio */
document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("detalle-envio");

if(form)  {
    
    form.addEventListener("submit", function (event) {
    event.preventDefault();

    /* Oculta el formulario */
    form.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    /* Guarda los datos del destinatario*/
    localStorage.setItem("datosDestinatario", JSON.stringify(data));
    
    mostrarMensaje();
    
    /* Vacia el carrito */
    guardarCarrito([]);
    actualizarBadgeCarrito();
    
    /*Resetea el formulario*/
    form.reset();
    
    }); 
    } else {
        console.error('No se encontró el formulario de detalle-envio');
    }

});







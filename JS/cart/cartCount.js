/*
  Script que maneja el contador de productos del carrito de compras en la barra de navegacion
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

/*
  Evento: Se encarga de al cargar la pagina mostrar la cantidad de productos seleccionados en el carrito
  en el icono de la barra de navegacion
*/
window.addEventListener("DOMContentLoaded", (event) => {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  if (cartItems) {
    let counter = 0;

    cartItems.forEach(item => {
      counter += item.quantity;
    });

    document.getElementById("cart-count").innerText = counter;
  }
});

const updateCounter = () => {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  if (cartItems) {
    let counter = 0;

    cartItems.forEach(item => {
      counter += item.quantity;
    });

    document.getElementById("cart-count").innerText = counter;
  }
}
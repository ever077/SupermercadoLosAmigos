/*
  Script que se encarga de obtener y mostrar todos los productos cuando se carga el index.html
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

window.addEventListener("DOMContentLoaded", (event) => {
  getAllItems().then(itemList => showItems(itemList));
  // console.log(typeof itemList, itemList);
  // showItems(itemList);
});
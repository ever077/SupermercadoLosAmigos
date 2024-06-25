/*
  Controlador que se encarga de manejar el logueo de los usuarios.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

/*
  ******** Funcionamiento de la pagina********
*/

// Boton "volver" al index.html
document.getElementById("btn-volver").addEventListener("click", (event) => {
  event.preventDefault();
  location.href = "../index.html";
});

/*
  ******** Peticiones a la API REST y manejo del DOM ********
*/
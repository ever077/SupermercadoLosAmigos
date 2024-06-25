/*
  Controlador que se encarga de manejar la creacion de usuarios.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

/*
  ******** Funcionamiento de la pagina********
*/

// Boton "volver" al login.html
document.getElementById("btn-cancelar").addEventListener("click", (event) => {
  event.preventDefault();
  // location.href = "./login.html";
  window.history.back();
});

/*
  ******** Peticiones a la API REST y manejo del DOM ********
*/
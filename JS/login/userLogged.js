/*
  Script que se encarga de mostrar el nombre del usuario logueado y de construir el menu
  desplegable y manejar sus funciones.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

window.addEventListener("DOMContentLoaded", (event) => {
  // Me fijo si en el session storage hay un usuario logueado
  const isLogged = sessionStorage.getItem("isLogged");

  if (isLogged === "true") {
    // Obtengo el usuario logueado
    const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

    // Oculto el icono del usuario
    document.getElementById("user").style.display = "none";

    // Obtengo el div de la parte derecha del encabezado
    const container = document.getElementById("nav-header-right");

    // Creo el div que contiene el nomre del usuario
    const div = document.createElement("div");

    div.classList.add("user-logged");

    const gender = (loggedUser.gender === "male") ? "o" : "a";

    div.innerHTML = `
      <p>¡Bienvenid${gender} <span><a id="logged-user-options" href="#">${loggedUser.name} ${loggedUser.lastName}</a>!</span></p>
    `;

    // Creo el div popup que muestra las opciones del usuario
    const loggedUserPopup = document.createElement("div");
      loggedUserPopup.classList.add("logged-user-popup");
      loggedUserPopup.innerHTML = `
        <ul>
            <li id="user-config" class="user-popup-btn"><i class="fa-solid fa-gear"></i>Configuración</li>
            <li id="user-shopping-history" class="user-popup-btn"><i class="fa-brands fa-shopify"></i>Mis compras</li>
            <li id="user-logout" class="user-popup-btn"><i class="fa-solid fa-share-from-square"></i>Cerrar sesión</li>
        </ul>
      `
    div.appendChild(loggedUserPopup);
    container.appendChild(div);

    // Coloco el listener para mostrar el menu desplegable del usuario logueado
    document.getElementById("logged-user-options").addEventListener("click", (event) => {
      if (loggedUserPopup.style.display === "none" || !loggedUserPopup.style.display) {
        loggedUserPopup.style.display = "flex";
      } else {
        loggedUserPopup.style.display = "none";
      }
    });

    // Coloco el listener para ir a las configuraciones del usuario
    document.getElementById("user-config").addEventListener("click", (event) => {
      const dir = location.href;
      
      // Muestro la pagina del historial de compras
      if (dir.split("/").at(-1).includes("index")) {
        // Si estoy en el index.html
        location.href = "./HTML/actualizarUsuario.html";
      } else {
        // Si estoy en otra pagina
        location.href = "./actualizarUsuario.html";
      }
    });

    // Coloco el listener para ir a las compras del usuario
    document.getElementById("user-shopping-history").addEventListener("click", (event) => {
      const dir = location.href;
      
      // Muestro la pagina del historial de compras
      if (dir.split("/").at(-1).includes("index")) {
        // Si estoy en el index.html
        location.href = "./HTML/historialCompras.html";
      } else {
        // Si estoy en otra pagina
        location.href = "./historialCompras.html";
      }
    });

    // Coloco el listener para hacer logout
    document.getElementById("user-logout").addEventListener("click", (event) => {
      logout();
    });
  }
});

/*
  Funcion:
    Cerrar sesion de un usuario logueado eliminandolo de la session storage y tambien poniendo la
    bandera que indica si hay un usuario logueado en false
*/
const logout = () => {
  sessionStorage.removeItem("loggedUser");
  sessionStorage.removeItem("cartItems");
  sessionStorage.setItem("isLogged", "false");

  // location.replace("./login.html");
  location.reload();
}
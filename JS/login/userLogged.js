
window.addEventListener("load", (event) => {
  // Me fijo si en el session storage hay un usuario logueado
  const isLogged = sessionStorage.getItem("isLogged");

  if (isLogged === "true") {
    // Obtengo el usuario logueado
    const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

    // Oculto el icono del usuario
    document.getElementById("user").style.display = "none";

    // Obtengo el div de la parte derecha del encabezado
    const container = document.getElementById("nav-header-right");

    const div = document.createElement("div");

    div.classList.add("user-logged");
    // div.classList.add("fat");

    const gender = (loggedUser.gender === "male") ? "o" : "a";

    div.innerHTML = `
      <p>¡Bienvenid${gender} <span><a href="#">${loggedUser.name} ${loggedUser.lastName}</a>!</span></p>
    `;

    container.appendChild(div);
  }
});
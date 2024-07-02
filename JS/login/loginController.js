/*
  Controlador que se encarga de manejar el logueo de los usuarios.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

// Constante con la direccion de la API REST
const API_LOGIN_URL = "http://localhost:3000/api/v1.0/user/login";

/*
  ******** Funcionamiento de la pagina ********
*/

// Boton "volver" al index.html
document.getElementById("btn-back").addEventListener("click", (event) => {
  event.preventDefault();
  window.history.back();
});

/*
  ******** Peticiones a la API REST y manejo del DOM ********
*/

// Manejo del envio del formulario para crear un nuevo usuario
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const pass = event.target.password.value;

  // Verifico que no hayan campos vacios
  const emptyValidation = loginEmptyValidation(email, pass);

  if (!emptyValidation) {
    alert("¡No pueden haber campos vacios!");
    return;
  }

  // Verifico que el Email sea valido
  if (!validateEmail(email)) {
    alert("Ingrese un Email válido");
    return;
  }

  fetch(
    API_LOGIN_URL,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    }
  )
  .then(response => response.json())
  .then((data) => {
    if (data.items) {
      // Creo el usuario con sus datos relevantes
      const loggedUser = {
        userId: data.items.userId,
        name: data.items.name,
        lastName: data.items.lastName,
        gender: data.items.gender,
        birthDate: data.items.birthDate,
        email: data.items.email
      };

      setUserLogged(loggedUser);

    } else {
      alert("Usuario o contraseña incorrecto");
    }
  })
  .catch((error) => {
    console.log(error);
  });
});

/*
  Funcion:
    Guardar el usuario logueado en la session storage y tambien bandera que 
    indica si hay un usuario logueado
*/
const setUserLogged = (loggedUser) => {
  // Guardo el usuario en el session storage
  sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  sessionStorage.setItem("isLogged", "true");

  // Muestro la pagina principal
  window.history.back();
  // location.href = "../index.html";
}


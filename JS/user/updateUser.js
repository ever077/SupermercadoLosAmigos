/*
  Script que se encarga de manejar la edicion de datos personales del usuario logueado.
  Maneja el archivo actualizarUsuario.html
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

// Constante con la direccion de la API REST
const API_UPDATE_USER_URL = "http://localhost:3000/api/v1.0/user";

/*
  Funcion:
    Muestra la pagina actualizarUsuario.html con los datos del usuario cargados
*/
window.addEventListener("DOMContentLoaded", (event) => {
  // Obtengo el usuario logueado de la session storage
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  // Obtengo los campos y los lleno con los datos del usuario
  document.getElementById("name").value = loggedUser.name;
  document.getElementById("lastName").value = loggedUser.lastName;
  document.getElementById("email").value = loggedUser.email;

  // Formateo la fecha
  const [y, m, d] = loggedUser.birthDate.split("T")[0].split("-");
  document.getElementById("birthDate").value = `${y}-${m}-${d}`;

  // Coloco el valor del radio button segun el genero del usuario
  if (loggedUser.gender === "male") {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = true;
  }
});

document.getElementById("update-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Obtengo el usuario logueado de la session storage
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  // Obtengo los campos con los datos ingresados
  const name = document.getElementById("name").value || loggedUser.name;
  const lastName = document.getElementById("lastName").value || loggedUser.lastName;
  const gender = document.getElementById("male").checked ? "male" : "female";
  const birthDate = document.getElementById("birthDate").value || loggedUser.birthDate;

  let email = document.getElementById("email").value;
  if ((email.trim().length !== 0) && (!validateEmail(email))) {
    alert("Ingrese un Email válido en el caso que lo quiera modificar. De lo contrario, deje el campo vacío.");
    return;
  }
  email = email || loggedUser.email;

  const updatedUser = {
    name: name,
    lastName: lastName,
    gender: gender,
    birthDate: birthDate,
    email: email,
  }

  const password = document.getElementById("password").value;
  const repeatedPassword = document.getElementById("repeatedPassword").value;
  if ((password.length !== 0 || repeatedPassword.length !== 0) && password !== repeatedPassword)  {
    // Escribio algo en el campo de las contraseñas pero estas no coinciden
    alert("Las contraseñas no coinciden.");
    return;
  }
  if (password.trim().length === 0 || repeatedPassword.trim().length === 0) {
    // No escribio nada en el campo de las contraseñas o hay caracteres de espacios
    updateUser(loggedUser.userId, updatedUser);
  } else {
    // Escribio contraseña y coinciden
    updatedUser.password = password;
    updateUser(loggedUser.userId, updatedUser);
  }

  document.getElementById("update-form").reset();
});

/*
  Funcion: Interactua con la API REST para actualizar un usuario 
*/
const updateUser = (userId, updatedUser) => {
  fetch(
    `${API_UPDATE_USER_URL}/${userId}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedUser)
    }
  )
  .then(response => response.json())
  .then((data) => {
    if (data) {
      // Creo el usuario con sus datos relevantes
      const updatedUser = {
        userId: data.items.userId,
        name: data.items.name,
        lastName: data.items.lastName,
        gender: data.items.gender,
        birthDate: data.items.birthDate,
        email: data.items.email
      };

      // modifico el usuario logeado en la session storage
      sessionStorage.setItem("loggedUser", JSON.stringify(updatedUser));

      alert("El usuario se editó correctamente");

      // Muestro la pagina principal
      // location.href = "../index.html";
      // window.history.go(-(window.history.length - 1));
      // history.pushState(null, document.title, window.location);
      document.location.replace("../index.html");
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

// Boton "volver" al login.html
document.getElementById("btn-cancel").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("update-form").reset();
  location.replace("../index.html");
});
/*
  Controlador que se encarga de manejar la creacion de usuarios.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

// Constante con la direccion de la API REST
const API_REGISTER_URL = "http://localhost:3000/api/v1.0/user/";

/*
  ******** Funcionamiento de la pagina********
*/

// Boton "volver" al login.html
document.getElementById("btn-cancelar").addEventListener("click", (event) => {
  event.preventDefault();
  // location.href = "./login.html";
  // location.replace("./login.html");
  window.history.back();
});

// Boton "volver" al login.html
document.getElementById("btn-login").addEventListener("click", (event) => {
  window.history.go(-1);
});

/*
  ******** Peticiones a la API REST y manejo del DOM ********
*/

// Manejo del envio del formulario para crear un nuevo usuario
document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const lastName = event.target.lastName.value;
  const male = event.target.male.checked;
  const birthDate = event.target.birthDate.value;
  const email = event.target.email.value;
  const pass = event.target.password.value;
  const repeatedPass = event.target.repeatedPassword.value;

  // Verifico que no hayan campos vacios
  const emptyValidation = createUserFormEmptyValidation(name, lastName, birthDate, email, pass, repeatedPass);

  if (!emptyValidation) {
    alert("¡No pueden haber campos vacios!");
    return;
  }

  // Verifico que el Email sea valido
  if (!validateEmail(email)) {
    alert("Ingrese un Email válido");
    return;
  }

  const gender = male ? "male" : "female";

  // Verifico coincidencia de contraseñas
  if (pass !== repeatedPass) {
    alert("¡Las contraseñas no coinciden!");
    return;
  }

  const newUser = {
    name: name,
    lastName: lastName,
    gender: gender,
    birthDate: birthDate,
    email: email,
    password: pass
  }

  fetch(
    API_REGISTER_URL,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser)
    }
  )
  .then(response => response.json())
  .then((data) => {
    if (data) {
      console.log(data);
      alert("El usuario se creó correctamente");

      // Muestro la pagina principal
      location.href = "../index.html";
    }
  })
  .catch((error) => {
    console.log(error);
  });
});
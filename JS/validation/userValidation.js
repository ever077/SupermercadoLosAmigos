/*
  Validaciones de los usuarios.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

/*
  Funcion: Retorna TRUE si los campos no estan vacios o FALSE en caso contrario
*/
const createUserFormEmptyValidation = (name, lastName, birthDate, email, password, repeatedPassword) => {
  if (
    (name.trim().length === 0) || (lastName.trim().length === 0) ||
    (birthDate.trim().length === 0) || (email.trim().length === 0) ||
    (password.trim().length === 0) || (repeatedPassword.trim().length === 0)) {
    return false;
  } else {
    return true;
  }
};

/*
  Funcion: Retorna TRUE si los campos no estan vacios o FALSE en caso contrario
*/
const loginEmptyValidation = (email, password) => {
  if ((email.trim().length === 0) || (password.trim().length === 0)) {
    return false;
  } else {
    return true;
  }
};

/*
  Funcion: Retorna TRUE si el email tiene formato correcto o FALSE en caso contrario
*/
function validateEmail(email) {
  // Verifico que el email no este vacio
  if (email.trim().length === 0) {
    return false;
  }

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email)) {
    return true;
  }
  else {
    return false;
  }
}


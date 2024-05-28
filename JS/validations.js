function isNullOrEmpty(value) {
    if (!value || value === "") {
        return true;
    }
    else {
        return false;
    }
}

function validateEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email) == false) {
        return false;
    }
    else {
        return true;
    }
}

// const btnSubmit = document.getElementById("btn-submit");

// btnSubmit.addEventListener("click", function() {

//     const topic = document.getElementById("topic").value;
//     const name = document.getElementById("name").value;
//     const lastname = document.getElementById("lastname").value;
//     const email = document.getElementById("email").value;

//     if (isNullOrEmpty(topic) || isNullOrEmpty(name) || isNullOrEmpty(lastname) || isNullOrEmpty(email)) {
//         alert("Seleccione un valor");
//     }
//     else if (!validateEmail(email)) {
//         alert("Ingrese un Email valido");
//     }
//     else {
//         alert("Todo correcto");
//     }

// })

document.querySelector('form')
    .addEventListener('submit', e => {
        e.preventDefault();
        // const data = Object.fromEntries(new FormData(e.target));
        // alert(JSON.stringify(data));

        const topic = document.getElementById("topic").value;
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;

        if (isNullOrEmpty(topic)) {
            alert("Por favor, seleccione un asunto.");
        }
        else if (isNullOrEmpty(name)) {
            alert("Pro favor, ingrese su nombre.");
        }
        else if (isNullOrEmpty(lastname)) {
            alert("Por favor, ingrese su apellido.");
        }
        else if (isNullOrEmpty(email)) {
            alert("Por favor, ingrese su email.");
        }
        else if (!validateEmail(email)) {
            alert("Por favor, ingrese un email válido.");
        }
        else {
            alert("Su consulta se ha registrado exitosamente.");
        }
    })

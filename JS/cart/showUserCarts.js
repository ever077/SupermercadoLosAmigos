/*
  Script que se encarga de mostrar todos los carritos del usuario logueado en historialCompras.html
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/


/*
  Evento: Cuando se carga el DOM de historialCompras.html muestra todos los carritos del usuario logueado
*/
window.addEventListener("DOMContentLoaded", (event) => {
  if (sessionStorage.getItem("isLogged") === "false") {
    return;
  }

  // Obtengo el id del usuario logueado
  const userId = JSON.parse(sessionStorage.getItem("loggedUser")).userId;

  getAllCartsFromUser(userId).then((userCartList) => {
    const container = document.getElementById("accordion-carts");

    userCartList.forEach(cart => {
      let totalPrice = 0;
      let totalQuantity = 0;

      const div = document.createElement("div");
      div.classList.add("accordion-item");

      let content = "";

      cart.cartDetail.forEach(cartDetail => {
        totalPrice += cartDetail.price * cartDetail.quantity;
        totalQuantity += cartDetail.quantity;

        content = content + `
          <div class="accordion-body">
            <div class="row">
              <div class="col-2 d-flex justify-content-center align-items-center">
                <img src="${cartDetail.item.image}" alt="${cartDetail.item.name}" width="100px">
              </div>
              <div class="col-7">
                <h5>${cartDetail.item.name}</h5>
                <p>${cartDetail.item.description}</p>
              </div>
              <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                <p>Precio: $${cartDetail.price}</p>
                <p>Cantidad: ${cartDetail.quantity}</p>
              </div>
            </div>
          </div>
        `;
      });

      let header = `
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <div class="row w-100">
              <div class="col-4 d-flex align-items-center">
                <p class="mb-0">Fecha: <span>${cart.date.split("T")[0]}</span></p>
              </div>
              <div class="col-8 d-flex flex-column gap-2 align-items-end justify-content-center pe-4">
                <p class="mb-0">Monto total: <span>$${totalPrice}</span></p>
                <p class="mb-0">Cant. productos: <span>${totalQuantity}</span></p>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      `;

      div.innerHTML = header + content + "</div>";

      container.appendChild(div);
    });
  });
});

/*
  Evento: Click en volver
*/
document.getElementById("btn-back").addEventListener("click", (event) => {
  window.history.back();
});
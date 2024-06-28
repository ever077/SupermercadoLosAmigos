/*
  Script que se encarga de mostrar elementos cuando se inicializa el cart.html
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

/*
  Evento: Cuando se carga el cart.html muestra todos los elementos del carrito
*/
window.addEventListener("load", (event) => {
  const btnBuy = document.getElementById("btn-cart-buy"); // Boton de comprar
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  if (cartItems) {
    if (cartItems.length > 0) {
      // Remuevo el aviso del carrito vacio
      document.getElementById("empty-cart").style.display = "none";

      // Activo el boton comprar
      btnBuy.removeAttribute('disabled');
    }

    // Vacio el contenedor de las tarjetas
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    // Armo las tarjetas para cada producto
    cartItems.forEach(item => {
      const article = document.createElement("article");
      article.classList.add("card-product");
      article.classList.add("product");
      article.innerHTML = `
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p class="description">${item.description}</p>
        <span>$${item.price}</span>
        <div>
        <button class="btn-choice">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="btn-choice">+</button>
        </div>
      `;

      cartContainer.appendChild(article);

      // Pongo listeners a los botones para sumar o quitar cantidad de items

      // Restar cantidad del producto o eliminarlo si la cantidad llega a cero
      article
        .getElementsByTagName("button")[0]
        .addEventListener("click", (event) => {
          const quantity = event.target.parentElement.getElementsByClassName("quantity")[0];

          if (quantity.innerText === "1") {
            // Elimino producto
            const newCartItems = cartItems.filter(i => i.itemId !== item.itemId);
            sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

            if (newCartItems.length === 0) {
              // Coloco el aviso del carrito vacio
              document.getElementById("empty-cart").style.display = "block";

              // Desactivo el boton comprar
              btnBuy.setAttribute('disabled', "true");
            }
            
            // TODO: Ver si puedo eliminar el articulo del DOM en lugar de actualizar
            // En tal caso comprobar si el contador del icono del carrito tambien se actualiza
            location.reload();

          } else {
            // Resto producto
            quantity.innerText = parseInt(quantity.innerText) - 1;
            item.quantity--;
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

            // Actualizo el contador del icono del carrito
            updateCounter();
          }

          // Actualizo el precio total y las cantidades totales de los productos
          updateSummary();
        });

      // Sumar cantidad del producto
      article
        .getElementsByTagName("button")[1]
        .addEventListener("click", (event) => {
          const quantity = event.target.parentElement.getElementsByClassName("quantity")[0];
          quantity.innerText = parseInt(quantity.innerText) + 1;
          item.quantity++;
          sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

          // Actualizo el precio total y las cantidades totales de los productos
          updateSummary();

          // Actualizo el contador del icono del carrito
          updateCounter();
        });
    });

    // Actualizo el precio total y las cantidades totales de los productos
    updateSummary();
  }
});

/*
  Funcion: Actualiza el precio total y la cantidad de productos del carrito
*/
const updateSummary = () => {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  if (cartItems) {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    document.getElementById("price").innerText = totalPrice;
    document.getElementById("quantity").innerText = totalQuantity;
  }
}

/*
  Evento: Guardar el carrito al hacer click en comprar
*/
document.getElementById("btn-cart-buy").addEventListener("click", (event) => {
  // Confirmacion de compra
  let buyCart = confirm("¿Está segur@ de querer realizar la compra?")

  if (buyCart) {
    // Me fijo si en el session storage hay un usuario logueado
    const isLogged = sessionStorage.getItem("isLogged");

    if (isLogged === "true") {
      // Obtengo el usuario logueado
      const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      // obtengo los productos del carrito
      const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

      const cartDetail = [];

      cartItems.forEach(item => {
        const newItem = {
          itemId: item.itemId,
          price: item.price,
          quantity: item.quantity
        }

        cartDetail.push(newItem);
      });

      const newCart = {
        userId: loggedUser.userId,
        active: "true",
        cartDetail: cartDetail
      }

      saveCart(newCart);
    }
  }
});

/*
  Evento: Eliminar carrito al presionar el boton de resetear
*/
document.getElementById("btn-cart-reset").addEventListener("click", (event) => {
  // Vacio el contenedor de las tarjetas
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  // Elimino el carrito del session storage
  sessionStorage.setItem("cartItems", JSON.stringify([]));

  location.reload();
});
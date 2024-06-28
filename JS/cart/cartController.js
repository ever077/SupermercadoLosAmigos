/*
  Controlador que se encarga de manejar las operacionse sobre el carrito.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

// Constante con la direccion de la API REST
const API_URL2 = "http://localhost:3000/api/v1.0/cart/";

/********* Funcionamiento de la pagina y manejo del DOM *********/

/*
  Agrega un item al carrito guardandolo en el session storage
*/
const addToCart = (article, itemId) => {
  // Me fijo si en el session storage hay un usuario logueado
  const isLogged = sessionStorage.getItem("isLogged");

  if (isLogged === "false" || isLogged === null) {
    // Si el usuario NO esta logueado lo envia al inicio de sesion
    location.replace("./HTML/login.html");
    
  } else {
    // Si el usuario esta logueado añade el producto al carrito

    const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  
    if (cartItems) {
      // Si el carrito existe en el session storage
  
      // Me fijo si el item ya esta en el carrito
      const item = cartItems.find(i => i.itemId === itemId);
  
      // Si no esta, lo agrego al session storage
      if (!item) {
        const newItem = {
          itemId: itemId,
          name: article.getElementsByTagName("h3")[0].innerHTML,
          description: article.getElementsByTagName("p")[0].innerHTML,
          price: (article.getElementsByTagName("p")[1].innerHTML).split("$").at(-1),
          image: article.getElementsByTagName("img")[0].src,
          quantity: 1
        };
  
        cartItems.push(newItem);
      }
  
      // Guardo la lista de items del carrito en la session storage
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  
      // Actualizo el contador del icono del carrito
      updateCounter();
  
    } else {
      // Si no existe un carrito en el session storage
  
      // Creo un carrito nuevo que contenga el item
      const newCart = [
        {
          itemId: itemId,
          name: article.getElementsByTagName("h3")[0].innerHTML,
          description: article.getElementsByTagName("p")[0].innerHTML,
          price: (article.getElementsByTagName("p")[1].innerHTML).split("$").at(-1),
          image: article.getElementsByTagName("img")[0].src,
          quantity: 1
        }
      ];
  
      // Guardo el carrito en el session storage
      sessionStorage.setItem("cartItems", JSON.stringify(newCart));
  
      // Actualizo el contador del icono del carrito
      updateCounter();
    }
  }
}

/********* Peticiones a la API REST *********/

/*
  Funcion: Guarda un carrito comprado en la base de datos
  Parametros:
    newCart {
      "userId": {userId} (int),
      "active": {active} (string),
      "cartDetail": [
        {
          "itemId": {itemId} (int),
          "price": {price} (string),
          "quantity": {quantity} (int)
        }
      ]
    }
*/
const saveCart = (newCart) => {
  fetch(
    API_URL2,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newCart)
    }
  )
  .then(response => response.json())
  .then((data) => {
    if (data) {
      alert("El carrito se guardó correctamente");

      // Muestro la pagina principal
      location.href = "../index.html";
    }
  })
  .catch((error) => {
    console.log(error);
  });
}
/*
  Controlador que se encarga de manejar las categorias e items conectandose
  con la API REST creada con Node.js y Express.js.
  Creado por el grupo 18 del curso "Codo a Codo 24258 - 2024"
*/

// Constante con la direccion de la API REST
const API_URL = "http://localhost:3000/api/v1.0/category";

// Constantes con los ID de las categorias
const ID_ALMACEN = "1";
const ID_BEBES = "2";
const ID_HOGAR = "3";
const ID_PERFUMERIA = "4";
const ID_BEBIDAS = "5";
const ID_CONGELADOS = "6";

/***********        EVENT LISTENERS        ***********/

// Obtener items de la categoria: Almacen
document.getElementById("category-almacen").addEventListener("click", (event) => {
  // Hago la peticion a la API para que me liste todos los items de la categoria
  fetch(
    `${API_URL}/${ID_ALMACEN}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((data) => {
    showItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
});

// Obtener items de la categoria: Bebes
document.getElementById("category-bebes").addEventListener("click", (event) => {
  // Hago la peticion a la API para que me liste todos los items de la categoria
  fetch(
    `${API_URL}/${ID_BEBES}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((data) => {
    showItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
});

// Obtener items de la categoria: Hogar
document.getElementById("category-hogar").addEventListener("click", (event) => {
  // Hago la peticion a la API para que me liste todos los items de la categoria
  fetch(
    `${API_URL}/${ID_HOGAR}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((data) => {
    showItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
});

// Obtener items de la categoria: Perfumeria
document.getElementById("category-perfumeria").addEventListener("click", (event) => {
  // Hago la peticion a la API para que me liste todos los items de la categoria
  fetch(
    `${API_URL}/${ID_PERFUMERIA}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((data) => {
    showItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
});

// Obtener items de la categoria: Bebidas
document.getElementById("category-bebidas").addEventListener("click", (event) => {
  // Hago la peticion a la API para que me liste todos los items de la categoria
  fetch(
    `${API_URL}/${ID_BEBIDAS}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((data) => {
    showItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
});

// Obtener items de la categoria: Congelados
document.getElementById("category-congelados").addEventListener("click", (event) => {
  // Hago la peticion a la API para que me liste todos los items de la categoria
  fetch(
    `${API_URL}/${ID_CONGELADOS}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((data) => {
    showItems(data.items);
  })
  .catch((error) => {
    console.error(error);
  });
});

/***********        FUNCIONES        ***********/

/*
  Funcion:
    Muestra los items de una categoria en la pantalla
  Parametros:
    Lista de items de una categoria
    categoryItems [
    {
      "itemId": (int),
      "categoryId": (int),
      "name": (string),
      "description": (string),
      "price": (string),
      "image": (string)
    }
*/
const showItems = (categoryItems) => {
  // Verifico que haya items para mostrar
  if (categoryItems.length > 0) {
    // Obtengo el contenedor de las tarjetas
    const contenedor = document.getElementById("products-container");

    // Vacio el contenedor
    contenedor.innerHTML = "";

    categoryItems.forEach(item => {
      // Creo la tarjeta
      const article = document.createElement("article");
      article.classList.add("product");

      article.innerHTML = `
        <img src="${item.image}" alt="${item.description}">
        <h3>${item.name}</h3>
        <p class="description">${item.description}</p>
        <p>Precio: $${item.price}</p>
        <button class="btn-choice">Agregar al carrito</button>
      `;

      // Agrego el articulo creado al contenedor
      contenedor.appendChild(article);

      // Agrego funcion al boton para que al presionarlo se agrege el item al carrito
      article.getElementsByTagName("button")[0].addEventListener("click", (event) => {
        addToCart(event.target.parentElement, item.itemId);
      });
    });
  }
};

/*
  Funcion: Retorna una lista con todos los items.
*/
const getAllItems = () => {
  // Hago la peticion a la API para que me liste todos los items.
  return fetch(
    `${API_URL}/`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then(data => data.items)
  .catch((error) => {
    console.error(error);
  });
}
function ClickOnFoto(path) {
  document.getElementById("foto-principale").src = path;
}
//funzione per tottenere il prodotto dall'url
function getQueryParam(param) {
  let identification = new URLSearchParams(window.location.search);
  return identification.get(param);
}
//carica dinamicamente il prodotto
const productId = getQueryParam("productid");
console.log("Product ID ", productId);

//chiamata API

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((product) => {
    console.log(product);
    const container = document.getElementById("productDetail");
    container.innerHTML = `
  <div class="conta">
    <div class="row">

      <div class="foto-principale">
          <img class="foto-principale-img" id="foto-principale" src="${product.image}" alt="${product.title}">
        </div>

        <div class="descrizione-prodotto">
            <h1>${product.title}</h1>
            <p><span style="color:black">Categoria:</span> ${product.category}</p>
            <p><span style="color:black">Descrizione:</span> ${product.description}</p>
            <p><span style="color:black">Prezzo:</span> $${product.price}</p>

            <button  class="btn btn-dark" href="Carrello.html" type="button" onClick="addToCart('${productId}')"> Aggiungi al carrello</button>
        </div>
    </div>
  </div>
        `;
  })
  .catch((error) => console.error("Errore nel recupero del prodotto:", error));

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = { quantity : 1};
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${id}  è stato aggiunto al carrello`);
}

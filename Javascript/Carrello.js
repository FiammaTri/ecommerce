const container = document.getElementById("cards-container");

function getCarrello() {
  const URL = `https://fakestoreapi.com/carts/1`;
  fetch(URL)
    .then((res) => res.json())
    .then((json) => {

      json.products.forEach(({productId, quantity}) => {
        createProductCard(productId, quantity)
      });

    });
}

function createProductCard(productId, quantity) {
  const URL = `https://fakestoreapi.com/products/${productId}`;
  fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      container.innerHTML += `
    <div class="card" >
          <img
            src="${json.image}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <div class="text-section">
              <h5 class="card-title">${json.title}</h5>
              <p class="card-text">
                ${json.description}
              </p>
            </div>
            <div class="cta-section">
              <h6 class="card-subtitle">${json.price * quantity}</h6>
              <h6 class="card-subtitle">Qt.${quantity}</h6>
            </div>
          </div>
    `;
    });
}

getCarrello();

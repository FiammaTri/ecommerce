const paymentBtn = document.getElementById("payment-btn");


function getCarrello(id_carrello) {
  const mainContainer = document.getElementById("main-container");
  const total = 0;

  const URL = `https://fakestoreapi.com/carts/${id_carrello}`;
  fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      if (!json) {
        createPaymentCard(0);
        return;
      }

      const promises = json.products.map(({ productId, quantity }) =>
        createProductCard(productId, quantity, total)
      );

      Promise.all(promises).then((data) => {
        let cards = data.map((obj) => obj.html).join("");
        const total = data.reduce((sum, obj) => sum + obj.total, 0);
        
        const container = document.getElementById("cards-container");
        container.innerHTML = cards;
        createPaymentCard(total);
        
      });
    });
}

function createPaymentCard(totale) {
  let paymentContainer = document.getElementById("payment-card");
  paymentContainer.innerHTML = `
  <div class="container-fluid d-flex justify-content-between">
    <h5>Subtotale</h5>
    <p>${totale.toFixed(2)}$</p>
  </div>
  <div class="container-fluid d-flex justify-content-between">
    <h5>Spedizione</h5>
    <p>${(totale * 0.01).toFixed(2)}$</p>
  </div>
  <hr />
  <div class="container-fluid d-flex justify-content-between">
    <h5><span>Totale</span> IVA inclusa</h5>
    <p>${(totale + totale * 0.01).toFixed(2)}$</p>
  </div>
  <button type="button" class="btn btn-primary btn-block w-100 rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Procedi
  </button>
  <div class="row text-center mt-4 mb-2">
    <i class="fa-solid fa-credit-card col-3"></i
    ><i class="fa-solid fa-credit-card col-3"></i
    ><i class="fa-solid fa-credit-card col-3"></i
    ><i class="fa-solid fa-credit-card col-3"></i>
  </div>
  <div class="row text-center">
    <i class="fa-solid fa-credit-card col-3"></i
    ><i class="fa-solid fa-credit-card col-3"></i
    ><i class="fa-solid fa-credit-card col-3"></i
    ><i class="fa-solid fa-credit-card col-3"></i>
  </div>
`;
}

function createProductCard(productId, quantity, total) {
  const URL = `https://fakestoreapi.com/products/${productId}`;
  return fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      return {
        html: `
        <div class="card">
        <img src="${json.image}" class="card-img-top p-3" alt="..." />
        <div class="card-body">
        <div class="text-section">
        <h5 class="card-title">${json.title}</h5>
        <p class="card-text">${json.description}</p>
        </div>
        <div class="cta-section">
        <h6 class="card-subtitle">${(json.price * quantity).toFixed(2)}$</h6>
        <h6 class="card-subtitle">Qt. ${quantity}</h6>
        </div>
        </div>
        </div>
        `,
        total: json.price * quantity,
      };
    });
}

function paymentValidation(event) {
  const paymentForm = document.getElementById("payment-form");

  event.preventDefault();

  const formInputs = paymentForm.querySelectorAll("input[type='text']");

  for (let form of formInputs) {
    if (form.value.trim() == "") {
      window.alert("Fill the form correctly");
      return;
    }
  }

  document.getElementById("modal-close-btn").click();
}

function checkParam() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("cartId")) {
    getCarrello(params.get("cartId"));
  } else if (!params.toString()) {
    createPaymentCard(0);
  }
}



checkParam();
paymentBtn.addEventListener("click", (event) => {
  paymentValidation(event);
});

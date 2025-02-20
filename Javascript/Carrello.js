const paymentBtn = document.getElementById("payment-btn");


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
    ><i class="fa-regular fa-credit-card col-3"></i
    ><i class="fa-brands fa-cc-visa col-3"></i
    ><i class="fa-brands fa-cc-mastercard col-3"></i>
  </div>
  <div class="row text-center">
    <i class="fa-brands fa-cc-paypal col-3"></i
    ><i class="fa-brands fa-cc-apple-pay col-3"></i
    ><i class="fa-brands fa-cc-amazon-pay col-3"></i
    ><i class="fa-brands fa-cc-stripe col-3"></i>
  </div>
`;
}

function createProductCardHtml(product, index, _, quantity = 1) {
  return `
        <div class="card">
          <img src="${product.image}" class="card-img-top p-3" alt="..." />
          <div class="card-body">
             <div class="text-section">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        </div>
        <div class="cta-section">
        <button onclick="deleteProduct(this, ${product.id})" class="btn btn-primary px-2">X</button>
        <div>
        <h6 class="card-subtitle"><span>${(product.price * quantity).toFixed(
          2
        )}</span>$</h6>
        <h6 class="card-subtitle">Qt. ${quantity}</h6>
        </div>
        </div>
        </div>
        </div>
        `
}

function updatePrice() {
  const cards = Array.from(document.querySelectorAll(".card"));
  const totale = cards.reduce(
    (sum, obj) =>
      sum + Number(obj.querySelector(".card-subtitle span").textContent),
    0
  );
  createPaymentCard(totale);
}

function deleteProduct(element, product_id) {
  const card = element.closest(".card");
  let carrelloStorage = JSON.parse(localStorage.getItem("cart"));
  delete carrelloStorage[String(product_id)];
  localStorage.setItem("cart", JSON.stringify(carrelloStorage));
  card.remove();
  updatePrice();
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

  const carrello = JSON.parse(localStorage.getItem("cart"));
  const token = localStorage.getItem("authToken");
  if (token == null) {
    window.alert("Effettua un log in")
    return;
  }
  const header = token ? { Authorization: "Bearer " + token,
    "Content-Type" : "application/json"
   } : {};
  fetch("http://localhost:8080/users/ordini", {
    method: "POST",
    headers: header,
    body: JSON.stringify(carrello)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Qualcosa andato storto');
  }
  return response.json();
  })
  .then(data => {
    localStorage.removeItem("cart");
    console.log("fatto con successo")
  })
  .catch(error => {
    console.error('Errore nel recupero dei nomi:', error);
});
}

paymentBtn.addEventListener("click", (event) => {
  paymentValidation(event);
});


function getCarelloFromArray(objectCarrello) {
  const URL = "https://fakestoreapi.com/products";
  fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      const productsInCarrello = json.filter((element) => Object.keys(objectCarrello).includes(String(element.id)))
      const cards = productsInCarrello.map((product, index, array) => createProductCardHtml(product, index, array, objectCarrello[product.id].quantity)).join("");
      const container = document.getElementById("cards-container");
      container.innerHTML = cards;
      updatePrice();
    });
}

function updateCarrello() {
  
  let carrelloStorage = JSON.parse(localStorage.getItem("cart"));
  if (carrelloStorage !== null) {
    getCarelloFromArray(carrelloStorage)
  } else {
    updatePrice();
  }
}

// esempio();
updateCarrello();

function esempio() {
  const carrello = {
    3: {
      quantity: 5
    },

    10: {
      quantity: 2
    }
  }
  localStorage.setItem("cart", JSON.stringify(carrello))
}

function addItem(key) {
  let carrelloStorage = JSON.parse(localStorage.getItem("cart") || {});
  if (cart[key]) {
      cart[key].quantity += 1; // Se la key esiste, aumenta la quantità
  } else {
      cart[key] = { quantity: 1 }; // Se la key non esiste, la aggiunge con quantità 1
  }
}
const paymentBtn = document.getElementById("payment-btn");

function getCarrello(id_carrello) {
  const mainContainer = document.getElementById("main-container");
  const total = 0;

  const URL = `https://fakestoreapi.com/carts/${id_carrello}`;
  fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      const promises = json.products.map(({ productId, quantity }) =>
        createProductCard(productId, quantity, total)
      );

      Promise.all(promises).then((data) => {
        let cards = data.map((obj) => obj.html).join("");

        const container = document.getElementById("cards-container");
        container.innerHTML = cards;

        updatePrice();
      });
    }).catch((err) =>updatePrice() );
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

function createProductCard(productId, quantity, total) {
  const URL = `https://fakestoreapi.com/products/${productId}`;
  return fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      return {
        html: createProductCardHtml(json, _, _, quantity),
        total: json.price * quantity,
      };
    });
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
        <button onclick="deleteProduct(this)" class="btn btn-primary px-2">X</button>
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

function deleteProduct(element) {
  const card = element.closest(".card");
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

// checkParam();
paymentBtn.addEventListener("click", (event) => {
  paymentValidation(event);
});

// IDEAS

//  ABLE TO CHANGE QUANTITTY AND UPDATE TOTAL PRICE AT THE SAME TIME
// function updateProductQuantity(element, price) {
//   element.previousElementSibling.innerHTML = (price * element.value).toFixed(2) + "$";
//   updatePrice();
// }

// ABLE TO GETCARELLO() FROM AN ARRAY PASSED FROM QUERY STRING
function getCarelloFromArray(arrayCarrello) {
  const URL = "https://fakestoreapi.com/products";
  fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      const productsInCarrello = json.filter((element) => arrayCarrello.includes(element.id))
      const cards = productsInCarrello.map(createProductCardHtml).join("");
      const container = document.getElementById("cards-container");
      container.innerHTML = cards;
      updatePrice();
    });
}

getCarelloFromArray([1,2,3,4,5,6,7])



// Simone 

function getAllProductsCategory(categoria) {
  const URL = "https://fakestoreapi.com/products/category/";
  fetch(URL + categoria)
            .then(res=>res.json())
            .then(json=>{

              console.log(json);
              const container = document.getElementById("gallery");

              for (let product of json){
                console.log(product);
                const card = createCard(product);
                container.appendChild(card);
              }
            })
}

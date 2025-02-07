function ClickOnFoto(path) {
  document.getElementById("foto-principale").src = path;
}

//chiamata API
fetch("https://fakestoreapi.com/products/18")
  .then((res) => res.json())
  .then((product) => {
    console.log(product);
    const container = document.getElementById("productDetail");
    container.innerHTML = `
  <div class="conta">
    <div class="row">
          <img class="foto-principale-img" id="foto-principale" src="${product.image}" alt="${product.title}">
        <div class="descrizione-prodotto">
            <h1>${product.title}</h1>
            <p><span style="color:black">Categoria:</span> ${product.category}</p>
            <p><span style="color:black">Descrizione:</span> ${product.description}</p>
            <p><span style="color:black">Prezzo:</span> $${product.price}</p>
            <button type="button" class="btn btn-dark"> Aggiungi al carrello</button>
        </div>
    </div>
  </div>
        `;
  })

  .catch((error) => console.error("Errore nel recupero del prodotto:", error));

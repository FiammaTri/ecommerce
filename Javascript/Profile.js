// Funzione per caricare il profilo
function loadProfile() {
  // Recupera il token di autenticazione
  const token = localStorage.getItem("authToken");

  // Costruisci gli headers con il token, se esiste
  const headers = token ? { Authorization: "Bearer " + token } : {};

  fetch("http://localhost:8080/users/profile", {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel caricamento del profilo");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(
        "user-name"
      ).textContent = `${data.name} ${data.surname}`;
      document.getElementById("profile-name").textContent = data.name;
      document.getElementById("profile-surname").textContent = data.surname;
      document.getElementById("profile-email").textContent = data.email;
      document.getElementById("profile-piva").textContent = data.piva || "N/A";
      document.getElementById("profile-username").textContent = data.username;
      getOrdini(headers);
    })
    .catch((error) => {
      window.location.href = "Login.html";
      console.error("Errore durante il caricamento del profilo:", error);
    });
}

loadProfile();

function logoutFunction() {
  // prendere il token che sta nel localStorage
  const token = localStorage.getItem("authToken");
  const header = token ? { Authorization: "Bearer " + token } : {};
  // fare una richiesta POST all'endpoint /api/logout
  fetch("http://localhost:8080/api/logout", {
    method: "POST",
    headers: header,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel logout dell'utente");
      }
      return response.json();
    })
    .then((data) => {
      // SE la richiesta va a buon fine
      // eliminiamo il token salvato nel nostro localStorage
      localStorage.removeItem("authToken");
      console.log(data);
      // mi riporta alla pagina di Homepage
      window.location.href = "Homepage.html";
    })
    .catch((error) => {
      console.error("Errore durante il caricamento del profilo:", error);
    });
}

async function getOrdini(header) {
  try {
    const response = await fetch("http://localhost:8080/users/ordini", {
      headers: header,
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero di ordini");
    }

    const data = await response.json();

    for (const ordine of data) {
      const ordine_container = document.createElement("div");
      ordine_container.classList.add(
        "d-flex", "container-fluid", "px-0", "w-auto", "flex-column", "gap-3", "ordine-container"
      );

      const h3_titolo = document.createElement("h3");
      h3_titolo.innerHTML = `Ordine del ${ordine.data_ordine}`;
      ordine_container.appendChild(h3_titolo);

      const cards_container = document.createElement("div");

      cards_container.classList.add(
        "d-flex", "container-fluid", "px-0", "w-auto", "flex-column", "gap-3"
      );
      cards_container.id = "cards-container";

      const cards = ordine.dettagli.map(({ idProdotto, quantita }) =>
        createOrdineCard(idProdotto, quantita) // Assuming this returns a promise
      );
      await Promise.all(cards).then((data) => {
        cards_container.innerHTML += data.join("");
      });

      const ordini_container = document.getElementById("ordini-container");
      ordine_container.appendChild(cards_container);
      ordini_container.appendChild(ordine_container);
    }
  } catch (error) {
    console.error("Errore:", error);
  }
}

function createOrdineCard(idProdotto, quantita) {
  const URL = `https://fakestoreapi.com/products/${idProdotto}`;
  return fetch(URL)
    .then((res) => res.json())
    .then((json) => {
      return ` <div class="card">
            <img src="${json.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
               <div class="text-section">
          <h5 class="card-title">${json.title}</h5>

          <h6 class="card-subtitle"><span>${json.price * quantita}</span>$</h6>
          <h6 class="card-subtitle">Qt. ${quantita}</h6>

          </div>
          </div>
          </div>`
    });
}
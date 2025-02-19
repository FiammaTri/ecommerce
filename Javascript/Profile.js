// Funzione per effettuare il login
function login(username, password) {
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login fallito');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login effettuato:', data);
      printOutput(data); // Stampa i dati della risposta
      // Salva il token nel localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        // Mostra il pulsante Logout e nasconde il form di login
        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("loginForm").style.display = "none";
        loadProfile()
      }
    })
    .catch(error => {
      console.error('Errore nel login:', error);
      printOutput({ error: error.message });
    });
  }
  
  // Funzione per caricare il profilo
  function loadProfile() {
    // Recupera il token di autenticazione
    const token = localStorage.getItem("authToken");
    
    // Costruisci gli headers con il token, se esiste
    const headers = token ? { 'Authorization': 'Bearer ' + token } : {};
  
    fetch("http://localhost:8080/users/profile", {
      method: 'GET',
      headers: headers 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel caricamento del profilo');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dati del profilo:', data);
      
        document.getElementById('user-name').textContent = data.name;
        document.querySelector('.col-sm-9.text-sm-end.text-secondary:nth-child(2)').textContent = data.surname;
        document.querySelector('.col-sm-9.text-sm-end.text-secondary:nth-child(3)').textContent = data.email;
        document.querySelector('.col-sm-9.text-sm-end.text-secondary:nth-child(4)').textContent = data.piva || 'N/A';
        document.querySelector('.col-sm-9.text-sm-end.text-secondary:nth-child(5)').textContent = data.username;
        
        // Aggiorna il nome dell'utente nella parte superiore (dove c'è l'immagine)
        document.querySelector('h4').textContent = `${data.name} ${data.surname}`;
      })
      .catch(error => {
          console.error('Errore durante il caricamento del profilo:', error);
      });
  }


  
  // es di utente
  /* {"id": 1,
    "username": "annina87",
    "name": "anna",
    "surname": "rossi",
    "email": "anna@gmail",
    "piva": null,
    "password": "annapass",
    "token": "ae6f7520-9050-446f-95c9-53a9fc2a566b"}*/ 
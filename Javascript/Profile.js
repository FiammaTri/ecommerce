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
      
        document.getElementById('user-name').textContent = `${data.name} ${data.surname}`;
        document.getElementById('profile-name').textContent = data.name;
        document.getElementById('profile-surname').textContent = data.surname;
        document.getElementById('profile-email').textContent = data.email;
        document.getElementById('profile-piva').textContent = data.piva || 'N/A';
        document.getElementById('profile-username').textContent = data.username;

      })
      .catch(error => {
          window.location.href = "Login.html";
          console.error('Errore durante il caricamento del profilo:', error);
      });
  }

  loadProfile();


  function logoutFunction() {
    // prendere il token che sta nel localStorage
    const token = localStorage.getItem("authToken");
    const header = token ? { 'Authorization': 'Bearer ' + token } : {};
    // fare una richiesta POST all'endpoint /api/logout
    fetch("http://localhost:8080/api/logout", {
      method: "POST",
      headers: header
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore nel logout dell'utente");
      }
      return response.json()
    })
    .then(data => {
            // SE la richiesta va a buon fine
        // eliminiamo il token salvato nel nostro localStorage
        localStorage.removeItem("authToken");
        console.log(data)
        // mi riporta alla pagina di Homepage
        window.location.href="Homepage.html"
    })
    .catch(error => {
      console.error('Errore durante il caricamento del profilo:', error);
  });
  }

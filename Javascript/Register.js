document.getElementById("register-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Impedisce il refresh della pagina

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const username = document.getElementById("username").value.trim();
    const piva = document.getElementById("piva").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const password = document.getElementById("password").value.trim();
    const privacyChecked = document.getElementById("privacy").checked;

    if (!privacyChecked) {
        alert("Devi accettare la Privacy Policy per continuare.");
        return;
    }

    if (!username || !password || !name || !surname || !email || !confirmPassword) {
        alert("Inserisci campi obbligatori!");
        return;
    }

    if (password != confirmPassword) {
        alert("Password diverse");
        return;
    }

    fetch("http://localhost:8080/users/addUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password,
            piva: piva
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore di login');
        }
        return response.json()
    })
    .then(data => {
        window.location.href="Login.html";
    })
    .catch(error => {
        console.error('Errore: ', error);
    });

});
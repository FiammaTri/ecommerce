document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("click", async function (event) {
        event.preventDefault(); // Impedisce il refresh della pagina

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const privacyChecked = document.getElementById("privacy").checked;

        if (!privacyChecked) {
            alert("Devi accettare la Privacy Policy per continuare.");
            return;
        }

        if (!email || !password) {
            alert("Inserisci email e password!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // Salva il token
                alert("Login effettuato con successo!");
                window.location.href = "Profile.html"; // Reindirizza alla pagina protetta
            } else {
                alert(data.message + "Credenziali errate");
            }
        } catch (error) {
            console.error("Errore di login:", error);
            alert("Errore di connessione al server.");
        }
    });
});


    const token = localStorage.getItem("authToken");
    if (token != null) {
        window.location.href="Homepage.html"
    }
    document.getElementById("LoginForm").addEventListener("submit", (event) => {
        event.preventDefault(); // Impedisce il refresh della pagina

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const privacyChecked = document.getElementById("privacy").checked;

        if (!privacyChecked) {
            alert("Devi accettare la Privacy Policy per continuare.");
            return;
        }

        if (!username || !password) {
            alert("Inserisci username e password!");
            return;
        }

        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username" : username,
                "password" : password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore di login');
            }
            return response.json()
        })
        .then(data => {
            const token = data.token;

            //Aggiungere nel mio localStorage
            localStorage.setItem("authToken", token)
            window.location.href= "Homepage.html";
        })
        .catch(error => {
            console.error('Errore: ', error);
        });

    });


fetch('https://fakestoreapi.com/products/15')
    .then(res => res.json())
    .then(json => {
        const card1 = document.getElementById('col-pref-donna')
        const titolo = document.querySelector('#col-pref-donna h5')
        titolo.innerHTML = json.title;
        //const desc = document.querySelector('#col-pref-donna p')
        //desc.innerHTML = json.description;
        const prezzo = document.querySelector('#col-pref-donna span')
        prezzo.innerHTML = json.price;
        const immagine = document.querySelector('#col-pref-donna img')
        immagine.src = json.image;
        const link = document.querySelector('#col-pref-donna a')
        link.href = "Prodotto.html?productid=15"
    })

fetch('https://fakestoreapi.com/products/4')
    .then(res => res.json())
    .then(json => {
        const card1 = document.getElementById('col-pref-uomo')
        const titolo = document.querySelector('#col-pref-uomo h5')
        titolo.innerHTML = json.title;
        //const desc = document.querySelector('#col-pref-uomo p')
        //desc.innerHTML = json.description;
        const prezzo = document.querySelector('#col-pref-uomo span')
        prezzo.innerHTML = json.price;
        const immagine = document.querySelector('#col-pref-uomo img')
        immagine.src = json.image;
        const link = document.querySelector('#col-pref-uomo a')
        link.href = "Prodotto.html?productid=4"
    })

fetch('https://fakestoreapi.com/products/7')
    .then(res => res.json())
    .then(json => {
        const card1 = document.getElementById('col-pref-gioielli')
        const titolo = document.querySelector('#col-pref-gioielli h5')
        titolo.innerHTML = json.title;
        //const desc = document.querySelector('#col-pref-gioielli p')
        //desc.innerHTML = json.description;
        const prezzo = document.querySelector('#col-pref-gioielli span')
        prezzo.innerHTML = json.price;
        const immagine = document.querySelector('#col-pref-gioielli img')
        immagine.src = json.image;
        const link = document.querySelector('#col-pref-gioielli a')
        link.href = "Prodotto.html?productid=7"
    })


fetch('https://fakestoreapi.com/products/12')
    .then(res => res.json())
    .then(json => {
        const card1 = document.getElementById('col-pref-elettro')
        const titolo = document.querySelector('#col-pref-elettro h5')
        titolo.innerHTML = json.title;
        //const desc = document.querySelector('#col-pref-elettro p')
        //desc.innerHTML = json.description;
        const prezzo = document.querySelector('#col-pref-elettro span')
        prezzo.innerHTML = json.price;
        const immagine = document.querySelector('#col-pref-elettro img')
        immagine.src = json.image;
        const link = document.querySelector('#col-pref-elettro a')
        link.href = "Prodotto.html?productid=12"
    })



//metodo per creare le categorie con le card
fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        for (let category of json) {
            const navigazione = document.getElementById("card-cat")
            const nav = document.createElement("div")
            nav.classList.add("col-6", "col-md-3", "col-cat")
            const link = document.createElement("a")
            link.href = "Categoria.html?category=" + category
            const img = document.createElement("img")
            img.classList.add("img-fluid")
            img.alt = category
            const testo = document.createElement("div")
            testo.classList.add("testo-cat")
            const p = document.createElement("p")

            if (category == "women's clothing") {
                img.src = "../Img/abbigliamento-donna.png"
                p.innerHTML = "Abbigliamento donna"
            } else if (category == "men's clothing") {
                img.src = "../Img/abbigliamento-uomo.png"
                p.innerHTML = "Abbigliamento uomo"
            } else if (category == "jewelery") {
                img.src = "../Img/gioielli.png"
                p.innerHTML = "Gioielli"
            } else if (category == "electronics") {
                img.src = "../Img/elettronica.png"
                p.innerHTML = "Elettronica"
            } else {
                img.src = "../Img/abbigliamento-uomo.png"
                p.innerHTML = category
            }

            testo.appendChild(p)
            nav.appendChild(link)
            nav.appendChild(img)
            nav.appendChild(testo)
            navigazione.appendChild(nav)

        }

    })
fetch('https://fakestoreapi.com/products/1') 
            .then(res=>res.json())
            .then(json=>{console.log(json)
                const card1 = document.getElementById('col-pref-donna')
                console.log(card1);
                const titolo = document.querySelector('#col-pref-donna h5')
                console.log(titolo);
                titolo.innerHTML = json.title;
                const desc = document.querySelector('#col-pref-donna p')
                desc.innerHTML = json.description;
                const prezzo = document.querySelector('#col-pref-donna span')
                prezzo.innerHTML = json.price;
                const immagine = document.querySelector('#col-pref-donna img')
                immagine.src = json.image;
            })


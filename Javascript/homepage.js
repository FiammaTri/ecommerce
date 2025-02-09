fetch('https://fakestoreapi.com/products/15') 
            .then(res=>res.json())
            .then(json=>{console.log(json)
                const card1 = document.getElementById('col-pref-donna')
                console.log(card1);
                const titolo = document.querySelector('#col-pref-donna h5')
                console.log(titolo);
                titolo.innerHTML = json.title;
                //const desc = document.querySelector('#col-pref-donna p')
                //desc.innerHTML = json.description;
                const prezzo = document.querySelector('#col-pref-donna span')
                prezzo.innerHTML = json.price;
                const immagine = document.querySelector('#col-pref-donna img')
                immagine.src = json.image;
            })

            fetch('https://fakestoreapi.com/products/4') 
            .then(res=>res.json())
            .then(json=>{console.log(json)
                const card1 = document.getElementById('col-pref-uomo')
                console.log(card1);
                const titolo = document.querySelector('#col-pref-uomo h5')
                console.log(titolo);
                titolo.innerHTML = json.title;
                //const desc = document.querySelector('#col-pref-uomo p')
                //desc.innerHTML = json.description;
                const prezzo = document.querySelector('#col-pref-uomo span')
                prezzo.innerHTML = json.price;
                const immagine = document.querySelector('#col-pref-uomo img')
                immagine.src = json.image;
            })
            
            fetch('https://fakestoreapi.com/products/6') 
            .then(res=>res.json())
            .then(json=>{console.log(json)
                const card1 = document.getElementById('col-pref-gioielli')
                console.log(card1);
                const titolo = document.querySelector('#col-pref-gioielli h5')
                console.log(titolo);
                titolo.innerHTML = json.title;
                //const desc = document.querySelector('#col-pref-gioielli p')
                //desc.innerHTML = json.description;
                const prezzo = document.querySelector('#col-pref-gioielli span')
                prezzo.innerHTML = json.price;
                const immagine = document.querySelector('#col-pref-gioielli img')
                immagine.src = json.image;
            })


            fetch('https://fakestoreapi.com/products/11') 
            .then(res=>res.json())
            .then(json=>{console.log(json)
                const card1 = document.getElementById('col-pref-elettro')
                console.log(card1);
                const titolo = document.querySelector('#col-pref-elettro h5')
                console.log(titolo);
                titolo.innerHTML = json.title;
                //const desc = document.querySelector('#col-pref-elettro p')
                //desc.innerHTML = json.description;
                const prezzo = document.querySelector('#col-pref-elettro span')
                prezzo.innerHTML = json.price;
                const immagine = document.querySelector('#col-pref-elettro img')
                immagine.src = json.image;
            })


   //metodo per creare le categorie nel navbar
   fetch('https://fakestoreapi.com/products/categories')
   .then(res => res.json())
   .then(json => {
       console.log(json)
       for (let category of json) {
           const navigazione = document.getElementById("nav-bar-cat")
           
           //console.log(category)
           const nav = document.createElement("div");
           nav.classList.add("col-sm-6","col-md-2","navcat");
           const link = document.createElement("a");
           link.classList.add("nav-link");
           link.href = "Categoria.html?category="+category;
           if (category == "women's clothing") {
               link.innerHTML = "Donna"
           } else if (category == "men's clothing") {
               link.innerHTML = "Uomo"
           } else if (category == "jewelery") {
               link.innerHTML = "Gioielli"
           } else if (category == "electronics") {
               link.innerHTML = "Elettronica"
           } else {
               link.innerHTML = category
           } 
           nav.appendChild(link)
           navigazione.appendChild(nav)
           
       }
   })

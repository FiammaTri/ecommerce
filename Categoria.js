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
     function getAllProducts(){
      fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              json.forEach(function(i){
                createCardElement(i);
              });
            }
          )
     }
           
 function getProductsCategory(category){
    fetch('https://fakestoreapi.com/products/category/'+category)
    .then(res=>res.json())
    .then(json=>{
      json.forEach(function(i){
        createCardElement(i);
      });
    });
 }
   
             
  function getParams(){
    const parametri= new URLSearchParams(window.location.search);
    return parametri.get('category');
  }   
 let param= getParams();
 if(param==null){
  getAllProducts();
 }else{
  getProductsCategory(param);
 }
     
          






  function createCardElement(product) {


    let gallery=document.getElementById('gallery');

    let downpart=document.createElement('div');
    let contenitore = document.createElement('div');
    contenitore.style.width='400px';
    contenitore.classList.add('card');
  
   let bottone=document.createElement('button');
   bottone.style.color.purple;
   
   bottone.innerHTML="Specifiche";
   bottone.addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = 'prova.html';
    
  });
  


    let image = document.createElement('img');
    image.style.width='200px';
    image.style.height='250px';
    image.style.textAlign='center';
    image.src= product.image;
    image.alt=product.title;
    image.classList.add('cards');

    contenitore.appendChild(image);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let paragraph = document.createElement('p');
    paragraph.classList.add('description');
    paragraph.textContent=product.description;
  
    
    
    let price = document.createElement('p');
    price.classList.add('price');
    price.textContent=product.price+"€";
    downpart.appendChild(price);
    downpart.appendChild(paragraph);
    cardBody.appendChild(downpart);
   
    cardBody.appendChild(bottone);
    contenitore.appendChild(cardBody);
    gallery.appendChild(contenitore);
    

  }

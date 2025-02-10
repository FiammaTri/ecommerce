 fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              json.forEach(function(i){
                createCardElement(i);
              });
            }
          )
           
          
           
              
           
            
          






  function createCardElement(product) {


    let gallery=document.getElementById('gallery');


    let contenitore = document.createElement('div');
    contenitore.style.width='400px';
    contenitore.classList.add('card');
  




    let image = document.createElement('img');
    image.style.width='200px';
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
    price.textContent=product.price;

    cardBody.appendChild(price);
    cardBody.appendChild(paragraph);
    contenitore.appendChild(cardBody);
    gallery.appendChild(contenitore);
  }

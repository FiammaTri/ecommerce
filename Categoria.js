/*function createCards(json) {
    const gallery = document.getElementById('gallery');
  
    json.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      // Aggiungi gli elementi della card
      const title = document.createElement('h2');
      title.textContent = item.title;
      card.appendChild(title);
  
      const description = document.createElement('p');
      description.textContent = item.description;
      card.appendChild(description);
  
      container.appendChild(card);
    });
  }
*/
  function createCardElement(gallery) {
    let src = document.createElement('div');
    div.image.add('image');
    
    let title = document.createElement('h1');
    title.card.add('title');
    title.textContent = json.title;
    
    let price = document.createElement('p');
    price.classList.add('price');
    price.textContent = json.price;

    let category = document.createElement('p');
    category.classList.add('category');
    category.textContent = json.category;

    let description = document.createElement('p');
    description.classList.add('price');
    description.textContent = json.description;
    
    div.appendChild(title);
    div.appendChild(body);
    
    return div;
  }

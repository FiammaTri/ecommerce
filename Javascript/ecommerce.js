 function ClickOnFoto(path){
    document.getElementById("foto-principale").src=path;
} 

function getProducts(prodotto){
    fetch('https://fakestoreapi.com/products/6')
    .then(res => res.json())
    for(let i of json)
        console.log(i.json)
    .then(json => console.log(json));
}
getProducts();
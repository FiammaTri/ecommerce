function calcoloTotaleCostoQuantita(event, element) {
    var section = element.closest(".cta-section")
    var prezzo = section.querySelector("h6")
    prezzo.innerHTML = event.target.value * 10 + "$";
}
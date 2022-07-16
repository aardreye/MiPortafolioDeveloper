let cargarDatos = () => {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=2b3efed7a835463998b26290266cff81&includenutrition=true')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.results);
            /*data.forEach(element => {
                console.log('element');
                /*if (value == element.id_autor){
                    let plantilla = `<div class="col-lg-3">
                                        <div class="test-inner ">
                                            <div class="test-author-thumb d-flex">
                                                <div class="test-author-info">
                                                    <h4>${autor}</h4>                                            
                                                </div>
                                            </div>
                                            <span>${element.texto}</span>
                                            <i class="fa fa-quote-right"></i>
                                        </div>
                                    </div>`
                    document.querySelector('#frases').innerHTML += plantilla;
                }*
            }); */
        })
        .catch(console.error);
}

document.addEventListener('DOMContentLoaded', (event) =>{
    cargarDatos();
});
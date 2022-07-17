let cargarDatos = () => {
    fetch('../JSON/api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
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

/*
let cargarDatos = () => {
    //alert('Mensaje de alerta');
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            console.log(xml);

            let escritores = xml.querySelectorAll('escritor');

            for( let escritor of escritores){
                let id = escritor.querySelector('id').textContent;
                let nombre = escritor.querySelector('nombre').textContent;
                let contenido = `<option value="${id}">
                                ${nombre}
                                </option>`;
                document.querySelector('select').innerHTML += contenido;
            }
        })
        .catch(console.error);
}

document.addEventListener('DOMContentLoaded', (event) =>{
    cargarDatos();
});

let etiqueta_select = document.querySelector('select');

etiqueta_select.addEventListener('change', (event) => {
    console.log(event);
    fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let frases = data.frases;
            let value = event.target.value;
            let autor = event.target.text;
            console.log(value)
            console.log(autor);
            frases.forEach(element => {
                if (value == element.id_autor){
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
                }
            });
        })
        .catch(console.error);
});
*/
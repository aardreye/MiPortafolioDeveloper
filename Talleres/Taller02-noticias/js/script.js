// Implemente un buscador de noticias, para esto deberá:

// 1. Cuando se cargue el documento, haga una petición a "https://dataserverdaw.herokuapp.com/noticias/fuente/" 
const url1 = 'https://dataserverdaw.herokuapp.com/noticias/fuente/';

//DOMContentLoaded espera a que cargue únicamente el html para ejecutar el código
window.addEventListener('DOMContentLoaded', function(){
    // Realizamos la petición y guardamos la promesa
    peticion1 = fetch(url1)
    .then(response => response.json())
    // 2. Procese la respuesta y agregue etiquetas <option> a la etiqueta select#tipo
    .then(data => { //response es el objeto de respuesta de la petición realizada
    /** Código que procesa la respuesta **/
        const tipo = document.querySelector('#tipo'); // retorna 0 o 1 elementos
    //Generar una nueva etiqueta `<option value="-source-">-source-</option>`
        const nuevaEtiqueta = document.createElement('OPTION');
        nuevaEtiqueta.classList.add('opcion');
        nuevaEtiqueta.value = '-source-'
        nuevaEtiqueta.textContent = '-source-'
    
        //Agregar la etiqueta en el html
        const contenedor = document.querySelector('select'); // retorna 0 o 1 elementos
        contenedor.appendChild(nuevaEtiqueta);   
        tipo.innerHTML = `<option value="-source-">-source-</option>`     
    });
});

// 3. Al seleccionar un tipo de noticias, haga un petición a "https://dataserverdaw.herokuapp.com/noticias/xml"
const url2 = 'https://dataserverdaw.herokuapp.com/noticias/xml';
window.addEventListener('load', function(){ //load espera a que cargue el html y todos los doc que dependen de el(js, css, img, etc) para ejecutar el código
    const noticia = document.querySelector('.opcion');
    noticia.addEventListener('click',function(evento){
        peticion2 = fetch(url2)
        // 4. Procese la respuesta y muestre solo las noticias de source seleccionado
        .then(function(response){

        });
    });    
});

// 5. Utilice las etiquetas plantilla.txt para reemplazar 
// 	-title- por el valor de "title"
// 	-description- por el valor de "description"
// 	-url- por el valor de "url"
// 	-author- por el valor de "author"
// 6. Coloque las noticias en la etiqueta div#respuesta
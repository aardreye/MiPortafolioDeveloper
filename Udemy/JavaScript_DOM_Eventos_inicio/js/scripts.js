//FORMAS COMUNES DE SELECCIONAR CONTENIDO
//querySelector
const heading = document.querySelector('.header__texto h2'); // retorna 0 o 1 elementos
heading.textContent = 'nueva modificación';
heading.classList.add('nueva-clase');
heading.classList.remove('nueva-clase');
console.log(heading);

//querySelectorAll
const enlaces = document.querySelectorAll('.navegacion a'); // retorna todos los elementos seleccionados
console.log(enlaces[0]); //el primer enlace

enlaces[0].textContent = 'Nuevo Texto para enlaces';
enlaces[0].href = 'http://google.com';

//getElementById
const heading2 =document.getElementById('prueba');

//Generar un nuevo enlace
const nuevoEnlace = document.createElement('A');
nuevoEnlace.href = 'nuevo-enlace.html';
nuevoEnlace.classList.add('navegacion__enlace');
nuevoEnlace.textContent = 'Tienda';
console.log(nuevoEnlace);

//Agregar el nuevo enlace en el html
const navegacion = document.querySelector('.navegacion');
navegacion.appendChild(nuevoEnlace);


//Eventos
console.log(1);

window.addEventListener('load', function(){ //load espera a que cargue el html y todos los doc que dependen de el(js, css, img, etc) para ejecutar el código
    console.log(2);
}); //addEventListener espera a que ocurra el evento asociado para ejecutar el siguiente código

window.onload = function() { //hace lo mismo que window.addEventListener('load'...
    console.log(3);
}

document.addEventListener('DOMContentLoaded', function(){ //DOMContentLoaded solo espera a que cargue el html para ejecutar el código
    console.log(4);
});

console.log(5);

//Seleccionar un elemento y asociarle un evento
const btnEnviar = document.querySelector('.boton--primario');
btnEnviar.addEventListener('click', function(evento){
    console.log(evento);
    console.log('Enviando formulario');
});

//Evento de los imputs y texareas

const nombre = document.querySelector('#nombre');
nombre,addEventListener('input', function(){
    console.log('escribiendo...')
})
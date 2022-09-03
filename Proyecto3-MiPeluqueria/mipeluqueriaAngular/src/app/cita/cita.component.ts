import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
})
export class CitaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  id: '',
  nombre: '',
  fecha: '',
  hora: '',
  servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // Muestra y oculta las secciones
  tabs(); // Cambia la sección cuando se presionen los tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaSiguiente(); 
  paginaAnterior();

  consultarAPI(); // Consulta la API en el backend de Express
}

function mostrarSeccion() {
  // Ocultar la sección que tenga la clase de mostrar
  const seccionAnterior = document.querySelector('.mostrar');
  if(seccionAnterior) {
      seccionAnterior.classList.remove('mostrar');
  }

  // Seleccionar la sección con el paso...
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector) as HTMLElement;
  seccion.classList.add('mostrar');

  // Quita la clase de actual al tab anterior
  const tabAnterior = document.querySelector('.actual');
  if(tabAnterior) {
    tabAnterior.classList.remove('actual');
  }

  // Resalta el tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`) as HTMLElement;
  tab.classList.add('actual');
}

function tabs() {
  // Agrega y cambia la variable de paso según el tab seleccionado
  const botones = document.querySelectorAll('.tabs button') ;
  botones.forEach( boton  => {
    boton.addEventListener('click', function (e) {
      e.preventDefault();
      //paso = parseInt(((e.target as HTMLElement).dataset as DOMStringMap)['paso'] ?? "");
      const target = e.target as HTMLElement;
      const dataset = target.dataset as DOMStringMap;
      paso = parseInt(dataset['paso'] ?? "");    
      mostrarSeccion();
      botonesPaginador(); 
    });
  });
}

 function botonesPaginador() {
  const paginaAnterior = document.querySelector('#anterior') as HTMLElement;
  const paginaSiguiente = document.querySelector('#siguiente') as HTMLElement;

  if(paso === 1) {
      paginaAnterior.classList.add('ocultar');
      paginaSiguiente.classList.remove('ocultar');
  } else if (paso === 3) {
      paginaAnterior.classList.remove('ocultar');
      paginaSiguiente.classList.add('ocultar');
       //mostrarResumen();
  } else {
      paginaAnterior.classList.remove('ocultar');
      paginaSiguiente.classList.remove('ocultar');
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector('#anterior') as HTMLElement;
  paginaAnterior.addEventListener('click', function() {
    if(paso <= pasoInicial) return;
    paso--; 
    botonesPaginador();
  })
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector('#siguiente') as HTMLElement;
  paginaSiguiente.addEventListener('click', function() {
    if(paso >= pasoFinal) return;
    paso++;    
    botonesPaginador();
  })
}

async function consultarAPI() {
  try {
    const url = 'http://localhost:3000/api/servicios';
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios: any[]) {
  console.log(servicios)
    servicios.forEach( (servicio: { idservicios: any; nombre: any; precio: any; }) => {
      const { idservicios, nombre, precio } = servicio;

      const nombreServicio = document.createElement('P');
      nombreServicio.classList.add('nombre-servicio');
      nombreServicio.textContent = nombre;

      const precioServicio = document.createElement('P');
      precioServicio.classList.add('precio-servicio');
      precioServicio.textContent = `$${precio}`;

      const servicioDiv = document.createElement('DIV');
      servicioDiv.classList.add('servicio');
      servicioDiv.dataset['idServicio'] = idservicios;
      servicioDiv.onclick = function() {
        seleccionarServicio(servicio);
      } 

      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      let idservicio = document.querySelector('#servicios') as HTMLElement;
      idservicio.appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio: { idservicios: any; nombre: any; precio: any }) {
  //const { idservicios } = servicio;
  const { servicios } = cita;

  // // Identificar el elemento al que se le da click
  // const divServicio = document.querySelector(`[data-id-servicio="${idservicios}"]`);

  // // Comprobar si un servicio ya fue agregado 
  // if( servicios.some( agregado => (agregado as { idservicios: any; nombre: any; precio: any; }).idservicios === idservicios ) ) {
  //     // Eliminarlo
  //     cita.servicios = servicios.filter( agregado => (agregado as { idservicios: any; nombre: any; precio: any; }).idservicios !== idservicios );
  //     divServicio?.classList.remove('seleccionado');
  // } else {
  //     // Agregarlo
      cita.servicios = [...servicios, servicio];
      //divServicio.classList.add('seleccionado');
  }
  // console.log(cita);
}

/* const button = document.getElementById('btn');

button?.addEventListener('click', function (event) {
  console.log('button clicked');
  console.log(event);
  console.log(event.target);
}); */
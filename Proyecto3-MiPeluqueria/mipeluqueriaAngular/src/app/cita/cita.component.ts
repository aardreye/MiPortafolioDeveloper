import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
})
export class CitaComponent implements OnInit {

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);
  fecha = this.hoy.toISOString().split('T')[0];
  
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
  servicios: new Array<{ idservicios: any; nombre: any; precio: any; }>()
}

document.addEventListener('DOMContentLoaded', function() {
  iniciarApp();
})

function iniciarApp() {
  mostrarSeccion(); // Muestra y oculta las secciones
  tabs(); // Cambia la sección cuando se presionen los tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaSiguiente(); 
  paginaAnterior();

  consultarAPI(); // Consulta la API en el backend de Express
  
  idCliente();
  nombreCliente(); // Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); // Añade la fecha de la cita en el objeto
  seleccionarHora(); // Añade la hora de la cita en el objeto

  //mostrarResumen(); // Muestra el resumen de la cita
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
      mostrarResumen();
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
  //console.log(servicios)
  servicios.forEach( (servicio: { idservicios: any; nombre: any; precio: any; }) => {
    /*nuestro servivio*/
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
  const { idservicios } = servicio;
  const { servicios } = cita;

  // Identificar el elemento al que se le da click
  const divServicio = document.querySelector(`[data-id-servicio="${idservicios}"]`) as HTMLElement;

  // Comprobar si un servicio ya fue agregado 
  if( servicios.some( agregado => (agregado as { idservicios: any; nombre: any; precio: any; }).idservicios === idservicios ) ) {
    // Eliminarlo
    cita.servicios = servicios.filter( agregado => (agregado as { idservicios: any; nombre: any; precio: any; }).idservicios !== idservicios );
    divServicio.classList.remove('seleccionado');
  } else {
    // Agregarlo
    cita.servicios = [...servicios, servicio];
    divServicio.classList.add('seleccionado');
  }

  console.log(cita);
}

function idCliente() {
  let elementoid = document.querySelector('#id') as HTMLInputElement;
  cita.id = elementoid.value;
}

function nombreCliente() {
  let elementonombre = document.querySelector('#nombre') as HTMLInputElement;
  cita.nombre = elementonombre.value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector('#fecha') as HTMLInputElement;
  inputFecha.addEventListener('input', function(e) {
    const dia = new Date((e.target as HTMLInputElement).value).getUTCDay();
    if( [6, 0].includes(dia) ) {
      (e.target as HTMLInputElement).value = '';
      mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
    } else {
      cita.fecha = (e.target as HTMLInputElement).value;
    }      
  });
}

function seleccionarHora() {
  const inputHora = document.querySelector('#hora') as HTMLInputElement;
  inputHora.addEventListener('input', function(e) {
    const horaCita = (e.target as HTMLInputElement).value;
    const hora = parseInt(horaCita.split(":")[0]);
    if(hora < 10 || hora > 18) {
        (e.target as HTMLInputElement).value = '';
        mostrarAlerta('Hora No Válida', 'error', '.formulario');
    } else {
        cita.hora = (e.target as HTMLInputElement).value;
        // console.log(cita);
    }
  })
}

function mostrarAlerta(mensaje: any, tipo: any, elemento: any, desaparece = true) {

  // Previene que se generen más de 1 alerta
  const alertaPrevia = document.querySelector('.alerta');
  if(alertaPrevia) {
      alertaPrevia.remove();
  }

  // Scripting para crear la alerta
  const alerta = document.createElement('DIV');
  alerta.textContent = mensaje;
  alerta.classList.add('alerta');
  alerta.classList.add(tipo);

  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  if(desaparece) {
      // Eliminar la alerta
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }

}

function mostrarResumen() {
  const resumen = document.querySelector('.contenido-resumen') as HTMLElement;

  //Limpiar el contenido de Resumen
  while(resumen.firstChild){
    resumen.removeChild(resumen.firstChild);
  }

  if(Object.values(cita).includes('') || cita.servicios.length === 0 ) {
    mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);
    return;
  }

  // Formatear el div de resumen
  const {nombre, fecha, hora, servicios} = cita;

  // Heading para Servicios en Resumen
  const headingServicios = document.createElement('H3');
  headingServicios.textContent = 'Resumen de Servicios';
  resumen.appendChild(headingServicios);

  //Iterando y mostrando los servicios
  servicios.forEach(servicio => {
    const {precio, nombre } = servicio;
    const contenedorServicio = document.createElement('DIV');
    contenedorServicio.classList.add('contenedor-servicio');

    const textoServicio = document.createElement('P');
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement('P');
    precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  // Heading para Cita en Resumen
  const headingCita = document.createElement('H3');
  headingCita.textContent = 'Resumen de Cita';
  resumen.appendChild(headingCita);

  const nombreCliente = document.createElement('P');
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  // Formatear la fecha en español
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const year = fechaObj.getFullYear();

  const fechaUTC = new Date( Date.UTC(year, mes, dia));
  
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', (opciones as {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}));

  const fechaCita = document.createElement('P');
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

  const horaCita = document.createElement('P');
  horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;
  
  // Boton para Crear una cita
  const botonReservar = document.createElement('BUTTON');
  botonReservar.classList.add('boton');
  botonReservar.textContent = 'Reservar Cita';
  botonReservar.onclick = reservarCita;
  
  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);

  resumen.appendChild(botonReservar);
}

async function reservarCita() {
  
  const { nombre, fecha, hora, servicios, id } = cita;

  //const idServicios = servicios.map( servicio => servicio.id );
  // console.log(idServicios);

  const datos = new FormData();
  
  datos.append('fecha', fecha);
  datos.append('hora', hora );
  datos.append('usuarioId', id);
  //datos.append('servicios', idServicios);

  // console.log([...datos]);

  try {
      // Petición hacia la api
      const url = 'http://localhost:3000/api/citas'
      const respuesta = await fetch(url, {
          method: 'POST',
          body: datos
      });

      const resultado = await respuesta.json();
      console.log(resultado);
      
      if(resultado.resultado) {
/*           Swal.fire({
              icon: 'success',
              title: 'Cita Creada',
              text: 'Tu cita fue creada correctamente',
              button: 'OK'
          }).then( () => {
              setTimeout(() => {
                  window.location.reload();
              }, 3000);
          }) */
      }
  } catch (error) {
/*       Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar la cita'
      }) */
  }
}
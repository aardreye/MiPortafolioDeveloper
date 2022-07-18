let items =[]
let restaurantes = [];
var contadores = {};
var menu_restaurante = [];

/**CARGAR LOS OPTION A RESTAURANTES*/
let cargarRestaurantes = () => {
    fetch("https://api.spoonacular.com/food/menuItems/search?apiKey=ff3d5efec10841cabd0e2611fbbe1489&query=burger&number=50")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let menuItems = data.menuItems;        
        menuItems.forEach(menu => {
          items.push(menu);
          let restaurante = menu.restaurantChain;            
          if (restaurantes.includes(restaurante)){
            contadores[restaurante] += 1;
            return;
          }else{
            restaurantes.push(restaurante);
            contadores[restaurante] = 1;
            let plantilla = `<option value="${restaurante}">${restaurante}</option>`
            document.querySelector('#restaurantes').innerHTML += plantilla;
          }    
        });
        console.log(restaurantes);
      })
      .catch(console.error);
}

window.addEventListener('load', (event) => {
  cargarRestaurantes()
});

const id_restaurantes = document.querySelector('#restaurantes');

/*AGREGAR LOS OPTION AL MENU */
id_restaurantes.addEventListener('change', (event) => {
  document.querySelector('.menu').innerHTML = `<option value= "" label="Elije una opción" selected disabled>Elije una opción</option>`
  menu_restaurante = [];
  let name_restaurant = event.target.value;
  for(let item of items){
    if(name_restaurant == item.restaurantChain){
      menu_restaurante.push(item);
      let titulo = item.title;
      let id = item.id;
      let plantilla_menu = `<option value="${titulo}" id="${id}">${titulo}</option>`;
      document.querySelector('.menu').innerHTML += plantilla_menu;         
    }      
  }
})

const id_menu = document.querySelector('.menu');

/*LLENAR EL DASHBOARD*/
id_menu.addEventListener('change', (event) => {
  let link = 'https://api.spoonacular.com/food/menuItems/';
  let id = '';
  menu_restaurante.forEach(element => {
    if (element.title == event.target.value)
      id += element.id;
  });
  let clave = '?apiKey=ff3d5efec10841cabd0e2611fbbe1489';
  let url = link+id+clave;

  /*document.querySelector('.informacion-nutricional').innerHTML = `<h5 class="m-b-20">Información nutricional</h5>
                                                                  <p class="m-b-0">Calorias totales:<span class="f-right">.......kcal</span></p>                                        
                                                                  <p class="m-b-0">Proteínas aproximadas:<span class="f-right">............g</span></p>
                                                                  <p class="m-b-0">Carbohidratos:<span class="f-right">............g</span></p>
                                                                  <p class="m-b-0">Fibras:<span class="f-right">............g</span>></p>`;
  
  document.querySelector('.nutrientes').innerHTML = ` <h5 class="m-b-20">Nutrientes</h5>
                                                      <p class="m-b-0">Fibras:<span class="f-right">...........g</span></p>
                                                      <p class="m-b-0">Sodio:<span class="f-right">.......mg</span></p>
                                                      <p class="m-b-0">Azucar:<span class="f-right">...........g</span></p>
                                                      <p class="m-b-0">Carbohidratos netos:<span class="f-right">...........g</span></p>`;
  
  document.querySelector('.grasas').innerHTML = ` <h5 class="m-b-20">Grasas</h5>
                                                  <p class="m-b-0">Colesterol:<span class="f-right">.......mg</span></p>
                                                  <p class="m-b-0">Grasas:<span class="f-right">...........g</span></p>
                                                  <p class="m-b-0">Grasas saturadas:<span class="f-right">...........g</span></p>
                                                  <p class="m-b-0">Grasas trans:<span class="f-right">...........g</span></p>`;
  
  document.querySelector('.porcentajes_diarios').innerHTML = `<h5 class="m-b-20">Porcentajes diarios necesarios</h5>
                                                              <p class="m-b-0">Carbohidratos:<span class="f-right">...........%</span></p>
                                                              <p class="m-b-0">Calorias:<span class="f-right">...........%</span></p>
                                                              <p class="m-b-0">Fibras:<span class="f-right">...........%</span></p>
                                                              <p class="m-b-0">Proteínas:<span class="f-right">...........%</span></p>`;
*/
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {      
      let nutricion = data.nutrition;
      let nutrientes = nutricion.nutrients;
      
      /*INFORMACION NUTRICIONAL*/
      let calorias = nutricion.calories;      
      let proteinas = nutricion.protein;
      let carbohidratos = nutricion.carbs;
      let Carbohidratos_netos = nutrientes[10].amount;
      let plantilla_informacion_nutricional = `<h5 class="m-b-20">Información nutricional</h5>
                                               <p class="m-b-0">Calorias totales:<span class="f-right">${calorias}kcal</span></p>
                                               <p class="m-b-0">Proteínas aproximadas:<span class="f-right">${proteinas}g</span></p>
                                               <p class="m-b-0">Carbohidratos:<span class="f-right">${carbohidratos}g</span></p>
                                               <p class="m-b-0">Carbohidratos netos:<span class="f-right">${Carbohidratos_netos}g</span></p>`;
      document.querySelector('.informacion-nutricional').innerHTML = plantilla_informacion_nutricional;
      
      /*NUTRIENTES*/            
      let fibras = nutrientes[6].amount;
      let sodio = nutrientes[8].amount;
      let azucar = nutrientes[9].amount;      
      let plantilla_nutrientes = `<h5 class="m-b-20">Nutrientes</h5>
                                  <p class="m-b-0">Fibras:<span class="f-right">${fibras}g</span></p>
                                  <p class="m-b-0">Sodio:<span class="f-right">${sodio}mg</span></p>
                                  <p class="m-b-0">Azucar:<span class="f-right">${azucar}g</span></p>
                                  <p class="m-b-0">Carbohidratos netos:<span class="f-right">${Carbohidratos_netos}g</span></p>`;
      document.querySelector('.nutrientes').innerHTML = plantilla_nutrientes;
      
      /*GRASAS*/
      let colesterol = nutrientes[1].amount;
      let grasas = nutricion.fat;
      let grasas_saturadas = nutrientes[4].amount;
      let grasas_trans = nutrientes[5].amount;
      let plantilla_grasas = `<h5 class="m-b-20">Grasas</h5>
                              <p class="m-b-0">Colesterol:<span class="f-right">${colesterol}mg</span></p>
                              <p class="m-b-0">Grasas:<span class="f-right">${grasas}g</span></p>
                              <p class="m-b-0">Grasas saturadas:<span class="f-right">${grasas_saturadas}g</span></p>
                              <p class="m-b-0">Grasas trans:<span class="f-right">${grasas_trans}g</span></p>`;
      document.querySelector('.grasas').innerHTML = plantilla_grasas;

      /*Porcentajes diarios necesarios*/
      let p_carbohidratos = nutrientes[1].percentOfDailyNeeds;
      let p_calorias = nutrientes[2].percentOfDailyNeeds;
      let p_fibras = nutrientes[6].percentOfDailyNeeds;
      let p_proteinas = nutrientes[7].percentOfDailyNeeds;
      let plantilla_porcentajes_diarios =  `<h5 class="m-b-20">Porcentajes diarios necesarios</h5>
                                            <p class="m-b-0">Carbohidratos:<span class="f-right">${p_carbohidratos}%</span></p>
                                            <p class="m-b-0">Calorias:<span class="f-right">${p_calorias}%</span></p>
                                            <p class="m-b-0">Fibras:<span class="f-right">${p_fibras}%</span></p>
                                            <p class="m-b-0">Proteínas:<span class="f-right">${p_proteinas}%</span></p>`;
      document.querySelector('.porcentajes_diarios').innerHTML = plantilla_porcentajes_diarios;
    
    /*INSERTAR IMAGEN*/
    let imagenes = data.images;
    link_imagen = imagenes[1];
    plantilla_imagen = `<img src="${link_imagen}" alt="">`
    document.querySelector('.insertar-imagen').innerHTML = plantilla_imagen
    
    })
    .catch(console.error)
})
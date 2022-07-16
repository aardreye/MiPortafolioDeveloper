
let cargarDatos = () => {
    fetch("https://dataserverdaw.herokuapp.com/noticias/fuente/")
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        let x=0
        let fuente=data.newssources
        for(elem in fuente){
            //console.log(fuente[x])
            nombre=fuente[x].source
            x++
            let plantilla = `<option value= "${nombre}">${nombre}</option>`
            document.querySelector('#tipo').innerHTML += plantilla;
        }

      })
      .catch(console.error);
}

let cargarInfo=(tipo)=>{
    
    //editorial = document.getElementById("tipo").value;
    
    fetch("https://dataserverdaw.herokuapp.com/noticias/xml")
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        let noticias = xml.getElementsByTagName('new');
        //console.log(noticias)
        for(let noticia of noticias){
            let name = noticia.getElementsByTagName('source_name')[0].textContent
            if(name === tipo){
                let titulo= noticia.getElementsByTagName('title')[0].textContent
                let descrip= noticia.getElementsByTagName('description')[0].textContent
                let url= noticia.getElementsByTagName('url')[0].textContent
                let autor= noticia.getElementsByTagName('author')[0].textContent
                //console.log(autor)

                let plantilla = `<div class="col">
                                    <strong>${titulo} </strong>${descrip}<a href="${url}"> ${autor}</a>
                                </div>`;
                document.getElementById('respuesta').innerHTML +=plantilla;
            }

        }
        
      })
      .catch(console.error);
}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
});
  
window.addEventListener('change', (event) => {
    tipo=document.getElementById("tipo").value;
    console.log(cargarInfo(tipo))
    /*document.getElementById('respuesta').innerHTML = "";*/
  }
  )
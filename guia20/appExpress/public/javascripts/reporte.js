let cargarDatos = (productoNombreOfSelect) => {
    fetch("https://productos-375bf-default-rtdb.firebaseio.com/collection.json")
      .then(response => response.json())
      .then(data => {
        let registros = data;
        console.log(registros);
        console.log("select: " + productoNombreOfSelect);
        for(let registro of registros){
            let productoNombreOfJson = registro.productoNombre;
            console.log("Json: " + productoNombreOfJson);
            if(productoNombreOfSelect === productoNombreOfJson){
                console.log(productoNombreOfSelect === productoNombreOfJson);
                let id = registro.id;
                let nombre = registro.comprador.nombre;
                let apellido = registro.comprador.apellido;
                let fecha = registro.fechaCompra;
                let valor = registro.valor;
                console.log(nombre);
                console.log(apellido);
                console.log(fecha);
                console.log(valor);
                let plantilla = `
                                <tr>  
                                    <td>${id}</td>
                                    <td>${nombre} ${apellido} </td>
                                    <td>${fecha} </td>
                                    <td>${valor} </td>
                                    <td>producto.createdAt.toLocaleDateString('en-US') </td>
                                    <td>  
                                        <a href="#" class="settings" title="Settings" data-toggle="tooltip"><i class="material-icons">&#xE8B8;</i></a>  
                                        <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a>  
                                </td>  
                                </tr>  
                                `;
                document.querySelector('#insertar').innerHTML += plantilla;
            }
        }        
      })
      .catch(console.error);
}
  
window.addEventListener('change', (event) => {
    producto = document.getElementById("formulario__campo").value;
    cargarDatos(producto);
    document.querySelector('#insertar').innerHTML = "";
  }
  )
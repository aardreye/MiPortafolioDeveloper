const peticion1 = 'https://dataserverdaw.herokuapp.com/recetas';

document.addEventListener('DOMContentLoaded', (event) =>{
        fetch(peticion1)
            .then(response => response.json())
            .then(data => {
                let recipes = data.recipes;
                console.log(recipes);
            })
});
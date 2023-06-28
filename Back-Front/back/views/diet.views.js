import { createPage } from "../pages/utils.js"

function createDietList(diet){ //PRUEBA
    let html = `<h1>Dietas</h1>`
    html += `<ul>`
  
    for( let i = 0; i < diet.length; i++){
        html += `<li>${diet[i].name} <a href="/diet/${diet[i]._id}">Ver</a> <a href="/diet/${diet[i]._id}/edit">Modificar</a> <a href="/diet/${diet[i]._id}/delete">Eliminar</a></li>`
      }
    html += `</ul>`
    
    return createPage('Dietas', html)
  }
  
  function createDietPage(diet){
    let html = `<h1>${diet.name}</h1>`
    html += `<p>${diet.description}</p>`
    html += `<p>Calorías: ${diet.calories}</p>`
    
    return createPage(diet.name, html)
  
  }

  function createDietFormPage(){ //Prueba
    let html = `<h1>Agregar dieta</h1>`
    html +=`<form action="/diet/new" method="POST">`
    html += `<input type="text" name="name" placeholder="Nombre">`
    html += `<input type="text" name="calories" placeholder="Calorias">`
    html += `<input type="text" name="description" placeholder="Descripción">`
    html += `<button type="submit">"Crear"</button>`
    html += `</form>`
    
    return createPage('Cargar dieta', html)
  }

  function editDietFormPage(diet){ //prueba
    let html = `<h1>modificar dieta</h1>`
    html +=`<form action="/diet/${diet._id}/edit" method="POST">
    <input type="text" name="name" placeholder="Nombre" value="${diet.name}">
    <input type="text" name="calories" placeholder="Calorias" value="${diet.calories}">
    <input type="text" name="description" placeholder="Descripción" value="${diet.description}">
   <button type="submit">Modificar</button>
    </form>`
    return createPage('Modificar dieta', html)
  }



  function deleteDietPage(diet) {
    let html = `<h1>${diet.name}</h1>`
    html += `<p>Precio: $${diet.calories}</p>`
    html += `<p>${diet.description}</p>`

    html += `<form action="/diet/${diet._id}/delete" method="POST">
    <p>Esta seguro de que quiere eliminarlo?</p>
        <button type="submit">Elimnar</button>
    </form>`

    return createPage(diet.name, html)
}


  export{
    createDietList,
    createDietPage,
    createPage,
    createDietFormPage, //Prueba
    editDietFormPage, //Prueba
    deleteDietPage,
  }
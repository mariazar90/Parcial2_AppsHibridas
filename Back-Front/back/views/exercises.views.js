import { createPage } from "../pages/utils.js"

function createExercisesList(exercises){ //PRUEBA
    let html = `<h1>Ejercicios</h1>`
    html += `<ul>`
  
    for( let i = 0; i < exercises.length; i++){
        html += `<li>${exercises[i].name} <a href="/diet/${exercises[i]._id}">Ver</a> <a href="/exercises/${exercises[i]._id}/edit">Modificar</a> <a href="/exercises/${exercises[i]._id}/delete">Eliminar</a></li>`
      }
    html += `</ul>`
    
    return createPage('Ejercicios', html)
  }
  
  function createExercisePage(exercise){
    let html = `<h1>${exercise.name}</h1>`
    html += `<p>${exercise.description}</p>`
    
    return createPage(exercise.name, html)
  
  }

  function createExerciseFormPage(){ //Prueba
    let html = `<h1>Agregar ejercicio</h1>`
    html +=`<form action="/exercises/new" method="POST">`
    html += `<input type="text" name="name" placeholder="Nombre">`
    html += `<input type="text" name="description" placeholder="Descripción">`
    html += `<button type="submit">"Crear"</button>`
    html += `</form>`
    
    return createPage('Cargar ejercicio', html)
  }

  function editExerciseFormPage(exercise){ //prueba
    let html = `<h1>modificar ejercicio</h1>`
    html +=`<form action="/exercises/${exercise._id}/edit" method="POST">
    <input type="text" name="name" placeholder="Nombre" value="${exercise.name}">
    <input type="text" name="description" placeholder="Descripción" value="${exercise.description}">
   <button type="submit">Modificar</button>
    </form>`
    return createPage('Modificar ejercicio', html)
  }



  function deleteExercisePage(exercise) {
    let html = `<h1>${exercise.name}</h1>`
    html += `<p>${exercise.description}</p>`

    html += `<form action="/exercises/${exercise._id}/delete" method="POST">
    <p>Esta seguro de que quiere eliminarlo?</p>
        <button type="submit">Elimnar</button>
    </form>`

    return createPage(exercise.name, html)
}


  export{
    createExercisesList,
    createExercisePage,
    createPage,
    createExerciseFormPage, //Prueba
    editExerciseFormPage, //Prueba
    deleteExercisePage,
  }
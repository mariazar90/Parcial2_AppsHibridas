import * as service from '../services/exercises.services.js';
import * as view from '../views/exercises.views.js';

function getExercises(req,res){
    service.getExercises({deleted : true})
    .then(function(exercise){
      res.send(view.createExerciseList(exercise))
    })
  }

function getExercisebyId(req,res){
    let idExercise = req.params.idExercise
  
   service.getExercisebyId(idExercise)
    .then(function(exercise){
      if(exercise){
        res.send(view.createExercisePage(exercise))
      }
      else{
        res.send(view.createPage('Error','<p>No encontrado</p>'))
      }
    })
  }

  function createExerciseFormPage(req, res){ //prueba
    res.send(view.createExerciseFormPage())
  }

  function createExercise(req,res){ //prueba
    const exercise = {
      name : req.body.name,
      description: req.body.description,
    }

    service.createExercise(exercise) //prueba
      .then(function(newExercise){
        res.send(view.createPage('Nuevo ejercicio', `<p>Producto ${newExercise.name}</p>`))
      })
      .catch(function(error){
        res.send(view.createPage('error'))
      })
  }

  function editExerciseForm(req, res){
    const id = req.params.idExercise

    service.getExercisebyId(id)
      .then(function(exercise){
        if(exercise){
          res.send(view.editExerciseFormPage(exercise))
        }
        else{
          res.send(view.createPage('no se encontró', '<h2>No se cargò</h2>'))
        }
      })
  }

  function editExercise(req, res){
    const id = req.params.idExercise

    const exercise = {
      name: req.body.name,
      calories: req.body.calories,
    }

    service.editExercise(id, exercise)
    .then(function(exercise){
      if(exercise){
        res.send(view.createPage('Ejercicio Modificado'))
      }
      else{
        res.send(view.createPage('error'))
      }
    })
  }


  function deleteExercisePage(req, res) {
    const id = req.params.idExercise

    service.getExercisebyId(id)
        .then(function (exercise) {
            if (exercise) {
                res.send(view.deleteExercisePage(ezercise))
            }
            else {
                res.send(view.createPage('No se encontro!', '<h1>No se encontro</h1>'))
            }
        })
}

  function deleteExercise(req, res) {
    const id = req.params.idExercise

    service.deleteExercise(id)
    .then(function(exercise) {
        if (exercise) {
            res.send(view.createPage('Ejercicio elminado', `<h2>Ejercicio ${exercise.id}</h2>`))
        } else {
            res.send(view.createPage('No se encontró el ejercicio', '<h1>No se encontró el ejercicio</h1>'))
        }
    })
}

  export{
    getExercises,
    getExercisebyId,
    createExerciseFormPage, //Prueba
    createExercise, //Prueba
    editExerciseForm, //Prueba
    editExercise,
    deleteExercisePage,
    deleteExercise
  }
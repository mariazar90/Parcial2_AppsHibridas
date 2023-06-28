import * as service from '../services/diet.services.js';
import * as view from '../views/diet.views.js';

function getDiet(req,res){
    service.getDiet({deleted : true})
    .then(function(diet){
      res.send(view.createDietList(diet))
    })
  }

function getDietbyId(req,res){
    let idDiet = req.params.idDiet
  
   service.getDietbyId(idDiet)
    .then(function(diet){
      if(diet){
        res.send(view.createDietPage(diet))
      }
      else{
        res.send(view.createPage('Error','<p>No encontrado</p>'))
      }
    })
  }

  function createDietFormPage(req, res){ //prueba
    res.send(view.createDietFormPage())
  }

  function createDiet(req,res){ //prueba
    const diet = {
      name : req.body.name,
      description: req.body.description,
      calories: req.body.calories,
    }

    service.createDiet(diet) //prueba
      .then(function(newDiet){
        res.send(view.createPage('Nueva dieta', `<p>Producto ${newDiet.name}</p>`))
      })
      .catch(function(error){
        res.send(view.createPage('error'))
      })
  }

  function editDietForm(req, res){
    const id = req.params.idDiet

    service.getDietbyId(id)
      .then(function(diet){
        if(diet){
          res.send(view.editDietFormPage(diet))
        }
        else{
          res.send(view.createPage('no se encontró', '<h2>No se cargò</h2>'))
        }
      })
  }

  function editDiet(req, res){
    const id = req.params.idDiet

    const diet = {
      name: req.body.name,
      calories: req.body.calories,
      description: req.body.description,
    }

    service.editDiet(id, diet)
    .then(function(diet){
      if(diet){
        res.send(view.createPage('Dieta Modificada'))
      }
      else{
        res.send(view.createPage('error'))
      }
    })
  }


  function deleteDietPage(req, res) {
    const id = req.params.idDiet

    service.getDietbyId(id)
        .then(function (diet) {
            if (diet) {
                res.send(view.deleteDietPage(diet))
            }
            else {
                res.send(view.createPage('No se encontro!', '<h1>No se encontro</h1>'))
            }
        })
}

  function deleteDiet(req, res) {
    const id = req.params.idDiet

    service.deleteDiet(id)
    .then(function(diet) {
        if (diet) {
            res.send(view.createPage('dieta elminada', `<h2>dieta ${diet.id}</h2>`))
        } else {
            res.send(view.createPage('No se encontró dieta', '<h1>No se encontró la dieta</h1>'))
        }
    })
}

  export{
    getDiet,
    getDietbyId,
    createDietFormPage, //Prueba
    createDiet, //Prueba
    editDietForm, //Prueba
    editDiet,
    deleteDietPage,
    deleteDiet
  }
import * as services from '../../services/routines.services.js';

function getRoutines(req, res){
    services.getRoutines({ deleted: true })
    .then(function (routines){
        res.status(200).json(routines);
    })
}

function getRoutineById(req, res){
    let idRoutine = req.params.idRoutine
    services.getRoutinesById(idRoutine)
      .then(function (routine){
          if(routine){
              res.status(200).json(routine)
          }else{
              res.status(404).json({error: {message:`Rutina id ${idRoutine} no encontrada` }});
          }
      })
}

function createRoutines(req, res){
    const routine = {
        name: req.body.name,
        description: req.body.description,
        routine: req.body.routine,
    };
    services.createRoutine(routine)
        .then(function (newRoutine){
            res.status(201).json(newRoutine)
        })
}

function replaceRoutines(req, res){
    const idRoutine = req.params.idRoutine;
    const routine = {
        name: req.body.name,
        description: req.body.description,
        routine: req.body.routine,
    };
    services.editRoutine(idRoutine, routine)
      .then(function (routine){
          if(routine){
              res.status(200).json(routine)
          }else{
              res.status(404).json({error: {message:`Rutina id ${idRoutine} no encontrada` }});
          }
      })
}

function deleteRoutines(req, res){
    const idRoutine = req.params.idRoutine;

    services.deleteRoutine(idRoutine)
      .then(function (routine){
          if(routine){
              res.status(200).json(routine)
          }else{
              res.status(404).json({error: {message:`Rutina id ${idRoutine} no encontrada` }});
          }
      })
}

export {
    getRoutines,
    getRoutineById,
    replaceRoutines,
    createRoutines,
    deleteRoutines
}
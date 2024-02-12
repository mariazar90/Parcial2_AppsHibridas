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

function foundExercise(routine, idExercise, newExercise, action){
    let edited = false
    const removeAll = []
    for (let i = 0; i < routine.routine.length; i++) {
        const element = routine.routine[i];
        let remove = null
        for (let j = 0; j < element.exercises.length; j++) {
            if(element.exercises[j]._id == idExercise){
                edited = true
                if(action == 'edit') element.exercises[j] = {_id: idExercise, ...newExercise}
                else remove=j
            }
        }
        //Si el bloque queda sin ejercicios se elimina el bloque
        if(action == 'delete' && remove !== null){
            element.exercises.splice(remove,1)
            if(element.exercises.length==0) removeAll.push(i)
        }
    }
    //Si la rutina queda sin bloques se elimina la rutina
    if(removeAll.length >0){
        removeAll.forEach(index => {
            routine.routine.splice(index,1)
        });
    }
    return edited? routine : false
}

async function editRoutinesByExerciseId(idExercise, newExercise, action){
    let routines = null
    await services.getRoutines({ deleted: true })
    .then(function (allRoutines){
        routines= allRoutines
    })
    await Promise.all(routines.map(routine => {
        const editedRoutine = foundExercise(routine, idExercise, newExercise, action)
        
        if (editedRoutine){
            services.editRoutine(editedRoutine._id, editedRoutine)
            .then(function (routine){
                if(routine){
                    return true
                }else{
                    return false
                }
            })
        }
    }));
}

function createRoutines(req, res){
    const routine = {
        name: req.body.name,
        description: req.body.description,
        routine: req.body.routine,
        user_id: req.account._id
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
    deleteRoutines,
    editRoutinesByExerciseId
}
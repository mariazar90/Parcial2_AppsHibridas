import * as service from '../../services/exercises.services.js'
import {editRoutinesByExerciseId} from './routines.api.controllers.js'
function getExercises(req,res){
    service.getExercises({deleted:true})
        .then(function(exercises){
            res.status(200).json(exercises)
        })
}

function getExercisebyId(req,res){
    const idExercise = req.params.idExercise

    service.getExercisebyId(idExercise)
        .then(function(exercise){
            if(exercise){
                res.status(200).json(exercise)
            }
            else{
                res.status(400).json({error:{message:'No se encontró el ejercicio'}})
            }
        })
}


function editExercise(req, res){
    const idExercise = req.params.idExercise;
    const exercise = {
        name: req.body.name,
        description: req.body.description,
    };

    service.editExercise(idExercise,exercise)
        .then(async function (newExercise){
            if(newExercise){
                await editRoutinesByExerciseId(idExercise, newExercise, 'edit')
                res.status(200).json(newExercise)
            }else{
                res.status(404).json({error: {message:`Ejercicio id ${idExercise} no encontrado` }});
            }
        })
}

function createExercise(req, res){
    const exercise = {
        name: req.body.name,
        description: req.body.description,
    };
    service.createExercise(exercise)
        .then(function (newExercise){
            res.status(201).json(newExercise)
        })
}

function deleteExercise(req, res){
    const idExercise = req.params.idExercise;
    service.deleteExercise(idExercise)
    .then(async function (exercise){
        if(exercise){
            await editRoutinesByExerciseId(idExercise, null, 'delete')
            res.status(200).json(exercise)
        }else{
            res.status(404).json({error: {message:`Ejercicio id ${idExercise} no encontrado` }});
        }
    })
}

export {
    getExercises,
    getExercisebyId,
    createExercise,
    editExercise,
    deleteExercise
}
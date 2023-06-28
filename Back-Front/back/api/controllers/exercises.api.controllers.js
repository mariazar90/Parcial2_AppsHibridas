import * as service from '../../services/exercises.services.js'

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

export {
    getExercises,
    getExercisebyId
}
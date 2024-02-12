import * as excercisesSchemas from '../schemas/exercises.schemas.js';

function validateExercises(req, res, next){
    return excercisesSchemas.exercises.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((exercises) => {
            res.body = exercises;
            next();
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

export {
    validateExercises
}
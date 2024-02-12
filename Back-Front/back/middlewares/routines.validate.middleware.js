import * as routineSchemas from '../schemas/routine.schemas.js';

function validateRoutine(req, res, next){
    return routineSchemas.routine.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((routine) => {
            res.body = routine;
            next();
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

export {
    validateRoutine
}
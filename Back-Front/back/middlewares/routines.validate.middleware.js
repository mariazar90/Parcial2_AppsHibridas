import * as routineSchemas from '../schemas/routine.schemas.js';

function validateRoutine(req, res, next){
    console.log("validateRoutine...", req.body)
    console.log("routineSchemas.routine...", routineSchemas.routine)
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
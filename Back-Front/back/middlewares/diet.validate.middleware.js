import * as dietSchemas from '../schemas/diet.schemas.js';

function validateDiet(req, res, next){
    return dietSchemas.diet.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((diet) => {
            res.body = diet;
            next();
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

export {
    validateDiet
}
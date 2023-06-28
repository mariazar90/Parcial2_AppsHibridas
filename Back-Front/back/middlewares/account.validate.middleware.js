import * as accountSchemas from '../schemas/account.schemas.js';

function validateAccount(req, res, next){
    return accountSchemas.account.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((account) => {
            res.body = account;
            next();
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

export {
    validateAccount
}
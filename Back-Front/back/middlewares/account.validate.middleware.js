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

function validateProfile(req, res, next){
    return accountSchemas.profile.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((profile) => {
            res.body = profile;
            next();
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}
function validateUpdateProfile(req, res, next){
    return accountSchemas.updateProfile.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((profile) => {
            res.body = profile;
            next();
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}
export {
    validateAccount,
    validateUpdateProfile,
    validateProfile
}
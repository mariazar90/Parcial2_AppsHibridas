import * as services from "../../services/account.services.js";
import * as tokenServices from "../../services/session.services.js";

async function getAccount(req, res){
    const token = req.headers['auth-token']
    return services.getAccount(token)
        .then((account) => {
            res.status(200).json(account);
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        })
}

async function createAccount(req, res){
    return services.createAccount(req.body)
        .then(() => {
            res.status(201).json({ message: "Cuenta creada correctamente."});
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        })
}

async function login(req, res){
    return services.login(req.body)
        .then(async (account) => {
            return { token: await tokenServices.createToken(account), account }
        })
        .then((auth) => {
            res.status(200).json(auth)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message }})
        })
}

async function logout(req, res){
    const token = req.headers['auth-token']

    return tokenServices.removeToken(token)
        .then(() => {
            res.status(200).json({ message: "Sesion cerrada correctamente"})
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message }})
        })
}

async function updateUser(req, res){
    const token = req.headers['auth-token']
    const usuario = req.body
    
    services.updateUser(token, usuario)
        .then(function (usuario) {
            if (usuario) {
                res.status(200).json(usuario)
            } else {
                res.status(404).json({error: {message: `No se encontró ningún usuario con el id ${id}.`}})
            }
        })
}

export {
    getAccount,
    createAccount,
    login,
    logout,
    updateUser
}
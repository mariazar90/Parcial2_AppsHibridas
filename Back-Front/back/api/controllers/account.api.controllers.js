import * as services from "../../services/account.services.js";
import * as tokenServices from "../../services/session.services.js";
import * as profileServices from "../../services/profile.services.js";
import {secret, secretRestore} from "../../config.js";

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
        .then(async (account) => {
            return await profileServices.createProfile(account, {email:req.body.email})
        })
        .then((profile) => {
            res.status(201).json({ message: "Cuenta creada correctamente."});
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        })
}

async function createProfile(req, res) {
    return profileServices.createProfile(req.account, req.body)
        .then(()=> {
            res.status(201).json({ message: "Perfil creado correctamente."})
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message }})
        })
}

async function getProfile(req, res) {
    return profileServices.getProfile(req.account._id)
        .then((profile)=> {
            res.status(200).json(profile)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message }})
        })
}

async function updateProfile(req, res){
    return profileServices.updateProfile(req.account, req.body)

        .then((profile)=> {
            res.status(200).json(profile)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message }})
        })
    
}

async function login(req, res){
    return services.login(req.body)
        .then(async (account) => {
            return { token: await tokenServices.createToken(account, secret), account }
        })
        .then((auth) => {
            res.status(200).json(auth)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message }})
        })
}

async function restore(req, res){
    return services.restoreAccount(req.body)
        .then(async (account) => {

            const token = await tokenServices.createToken(account, secretRestore);
            const verificationLink = `http://localhost:2023/new-password/${token}`;
            //enviar email
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

async function createPassword(req, res){
    const token = req.headers['auth-token']
    const usuario = req.body
    
    services.restorePassword(token, usuario)
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
    restore,
    createAccount,
    createProfile,
    getProfile,
    updateProfile,
    login,
    logout,
    updateUser,
    createPassword
}
import * as tokenService from '../services/session.services.js';
import {secret} from "../config.js";

async function tokenVerify(req, res, next){
    const token = req.headers['auth-token'];
    if(!token) return res.status(401).json({ error: { message: "No se ha enviado el token" }});
    const account = await tokenService.verifyToken(token, secret);
    if(!account) return res.status(401).json({ error: { message: "Token invalido" }})
    req.account = account;
    next();
}

export {
    tokenVerify
}
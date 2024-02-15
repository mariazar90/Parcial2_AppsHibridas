import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {secret, secretRestore} from "../config.js";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("APLICACIONESHIBRIDAS");

async function getHash(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function getAccount(token){
    await client.connect();
    const payload = jwt.verify(token, secret);
    const account = await db.collection('accounts').findOne({_id: new ObjectId(payload._id)});
    return {...account, password: null}
}

async function createAccount(account){
    await client.connect();

    const accountExist = await db.collection('accounts').findOne({userName: account.userName});
    if(accountExist) throw new Error('La cuenta ya existe, intente con otro nombre de usuario');
    
    const newAccount = { userName:account.userName, password: account.password, role: 'user' };
    newAccount.password = await getHash(account.password);

    const {insertedId} = await db.collection('accounts').insertOne(newAccount);
    return {_id:insertedId, userName:account.userName, password: null}
}

async function login(account){
    await client.connect();

    const accountExist = await db.collection('accounts').findOne({userName: account.userName });
    if(!accountExist) throw new Error('La cuenta no existe!');
    
    const isMatch = await bcrypt.compare(account.password, accountExist.password);
    if(!isMatch) throw new Error('Password incorrecto!'); 

    return { ...accountExist, password: undefined };
}

async function restoreAccount(account){
    await client.connect();

    const accountExist = await db.collection('accounts').findOne({userName: account.userName });
    if(!accountExist) throw new Error('La cuenta no existe!');

    return { ...accountExist, password: undefined };
}

async function updateUser(token, usuario, secretVerify = secret){
    await client.connect();
    const payload = jwt.verify(token, secretVerify);

    await db.collection('accounts').updateOne({_id: new ObjectId(payload._id)}, {$set: usuario});

    return usuario
}

async function changePassword(token, usuario){
    const newAccount = { ...usuario };
    newAccount.password = await getHash(usuario.password);

    await updateUser(token, newAccount, secretRestore)
    return { ...newAccount, password: undefined };
}

export {
    createAccount,
    getAccount,
    login,
    updateUser,
    restoreAccount,
    changePassword
}
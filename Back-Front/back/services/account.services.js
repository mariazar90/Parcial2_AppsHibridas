import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("APLICACIONESHIBRIDAS");

async function getAccount(token){
    await client.connect();
    const payload = jwt.verify(token, "CLAVE SECRETA");
    const account = await db.collection('accounts').findOne({_id: new ObjectId(payload._id)});
    return {...account, password: null}
}

async function createAccount(account){
    await client.connect();

    const accountExist = await db.collection('accounts').findOne({userName: account.userName});
    if(accountExist) throw new Error('La cuenta ya existe, intente con otro nombre de usuario');
    
    const newAccount = { ...account };
    const salt = await bcrypt.genSalt(10);
    newAccount.password = await bcrypt.hash(account.password, salt);

    await db.collection('accounts').insertOne(newAccount);
}

async function login(account){
    await client.connect();

    const accountExist = await db.collection('accounts').findOne({userName: account.userName });
    if(!accountExist) throw new Error('La cuenta no existe!');
    
    const isMatch = await bcrypt.compare(account.password, accountExist.password);
    if(!isMatch) throw new Error('Password incorrecto!'); 

    return { ...accountExist, password: undefined };
}

async function updateUser(token, usuario){
    await client.connect();
    const payload = jwt.verify(token, "CLAVE SECRETA");

    await db.collection('accounts').updateOne({_id: new ObjectId(payload._id)}, {$set: usuario});

    return usuario
}

export {
    createAccount,
    getAccount,
    login,
    updateUser
}
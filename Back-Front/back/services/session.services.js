import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("APLICACIONESHIBRIDAS");

async function createToken(account, secret){
    await client.connect()
    const token = jwt.sign(account, secret);
    await db.collection("Session").insertOne({ token, account_id: new ObjectId(account._id) });
    return token;
}

async function verifyToken(token, secret){
    try {
        await client.connect()
        const payload = jwt.verify(token, secret);
        const activeSession = await db.collection("Session").findOne({ token, account_id: new ObjectId(payload._id) });
        if(!activeSession) return null;
        return payload;
    } catch (error) {
        return null;
    }
}

async function removeToken(token){
    await client.connect();
    await db.collection("Session").deleteOne({ token });
}

export {
    createToken,
    verifyToken,
    removeToken
}
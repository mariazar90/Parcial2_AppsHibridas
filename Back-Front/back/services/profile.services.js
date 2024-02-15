import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {secret, secretRestore} from "../config.js";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("APLICACIONESHIBRIDAS");

async function createProfile(account, profile){
    console.log("account:", account)
    const newProfile = {
        ...profile,
        username: account.userName,
        _id: new ObjectId(account._id)
    }
    await client.connect();
    const searchedProfile = await db.collection('profiles').findOne({_id: newProfile._id});

    if(searchedProfile){
        throw new Error("Esta cuenta ya tiene un perfil asociado.")
    }

    await db.collection('profiles').insertOne(newProfile);
}

async function updateProfile(account, profile){
    await client.connect();
    console.log("id:", account._id)
    const searchedProfile = await db.collection('profiles').findOne({_id: new ObjectId(account._id)});
    console.log("searchedProfile:", searchedProfile)
    if(!searchedProfile){
        throw new Error("Esta cuenta no tiene un perfil asociado.")
    }
    await db.collection('profiles').updateOne({_id: new ObjectId(account._id)}, {$set: profile});

    return {...searchedProfile, ...profile}
}

async function getProfile(idProfile){
    await client.connect();

    const profile = await db.collection('profiles').findOne({_id: new ObjectId(idProfile)});

    if(!profile){
        throw new Error("Esta cuenta no tiene un perfil asociado.")
    }

    return profile;
}

export {
    createProfile,
    updateProfile,
    getProfile,
}
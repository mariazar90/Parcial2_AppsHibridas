import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("APLICACIONESHIBRIDAS")

async function getRoutines(){
    await client.connect()
    return db.collection("Rutinas").find({deleted: { $ne: true }}).toArray();
}

async function getRoutinesById(id){
    await client.connect()
    return db.collection("Rutinas").findOne({_id: new ObjectId(id)})
}

async function editRoutine(idRoutine, routine){
    await client.connect()
    await db.collection("Rutinas").updateOne({ _id: new ObjectId(idRoutine) }, {$set: routine})
    return routine
}

// async function replaceRoutine(idRoutine, routine){
//     await client.connect()
//     await db.collection("Rutinas").replaceOne({ _id: new ObjectId(idRoutine) }, routine)
//     return routine
// }

async function createRoutine(routine){
    const newRoutine = {...routine, user_id: new ObjectId(routine.user_id)}
    await client.connect()
    await db.collection("Rutinas").insertOne(newRoutine);
    return routine;
}

async function deleteRoutine(idRoutine){
    await client.connect()
    await db.collection("Rutinas").deleteOne({ _id: new ObjectId(idRoutine)})
    return idRoutine;
}

export {
    getRoutines,
    getRoutinesById,
    createRoutine,
    editRoutine,
    //replaceRoutine,
    deleteRoutine
}
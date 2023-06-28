import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("APLICACIONESHIBRIDAS")

async function getExercises(filter={}){
  await client.connect()
  return db.collection("Ejercicios").find({deleted: { $ne: true}}).toArray()
  }
  
async function getExercisebyId(id){
  await client.connect()
  return db.collection("Ejercicios").findOne({_id: new ObjectId(id)})
  }
  
export{
    getExercises,
    getExercisebyId,
}

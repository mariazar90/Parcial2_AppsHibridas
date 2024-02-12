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
  
  async function editExercise(exerciseId, exercise){
    await client.connect()
    await db.collection("Ejercicios").updateOne({ _id: new ObjectId(exerciseId) }, {$set: exercise});
    return exercise
  }

async function createExercise(exercise){
  await client.connect()
  await db.collection("Ejercicios").insertOne(exercise);
  return exercise;
}

async function deleteExercise(exercise){
  await client.connect()
  await db.collection("Ejercicios").deleteOne({ _id: new ObjectId(exercise)})
  return exercise;
}
  
export{
    getExercises,
    getExercisebyId,
    createExercise,
    editExercise,
    deleteExercise
}

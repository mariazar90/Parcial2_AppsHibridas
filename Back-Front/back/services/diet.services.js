import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("APLICACIONESHIBRIDAS")

async function getDiet(filter={}){
  await client.connect()
  return db.collection("Dietas").find({deleted: { $ne: true}}).toArray()
  }
  
async function getDietbyId(id){
  await client.connect()
  return db.collection("Dietas").findOne({_id: new ObjectId(id)})
  }
  
async function editDiet(dietId, diet){
  await client.connect()
  await db.collection("Dietas").updateOne({ _id: new ObjectId(dietId) }, {$set: diet});
  return diet
}

async function createDiet(diet){
  await client.connect()
  await db.collection("Dietas").insertOne(diet);
  return diet;
}
async function deleteDiet(diet){
  await client.connect()
  await db.collection("Dietas").deleteOne({ _id: new ObjectId(diet)})
  return diet;
}
  
export{
    getDiet,
    getDietbyId,
    editDiet,
    createDiet,
    deleteDiet
}

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
  
export{
    getDiet,
    getDietbyId,
}

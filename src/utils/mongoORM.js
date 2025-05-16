import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const uri = process.env.MONGO_DATABASE_PRODUCTS.replace(
    "<PASSWORD>",
    process.env.MONGO_PASSWORD_PRODUCTS
    ).replace("<USER>", process.env.MONGO_USER_PRODUCTS);

const client = new MongoClient(uri);
const dbName = process.env.DATABASE_NAME;



// Connect to MongoDB
const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conexion a base de datos USERS exitosa ✓');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

// CRUD Operations
const createDocument = async (data, collectionName) => {
  const db = client.db(dbName);
  return await db.collection(collectionName).insertOne(data);
};

const getDocumentbyId = async (id, collectionName) => {
  const db = client.db(dbName);
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
};

const deleteDocument = async (collectionName, query) => {
  const db = client.db(dbName);
  return await db.collection(collectionName).deleteOne(query);
};

const getDocument = async (collectionName, query) => {
  const db = client.db(dbName);
  return await db.collection(collectionName).findOne(query);
};

const getCollection = async (collectionName) => {
  const db = client.db(dbName);
  return await db.collection(collectionName).find().toArray();
};

const updateDocument = async (data, collectionName, query) => {
  const db = client.db(dbName);
  return await db.collection(collectionName).updateOne(query, { $set: data });
};

export { connectDB, deleteDocument ,createDocument, getDocumentbyId, getDocument, updateDocument, getCollection };
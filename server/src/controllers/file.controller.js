import Page from "../models/page.model.js";
import { MongoClient,ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// Connection URL
const url = process.env.MONGODB_URI; // replace with your MongoDB connection string
const client = new MongoClient(url);

export const saveHtmlAndCss = async (req, res) => {
    const {id_user,username,email,htmlCode,cssCode,edition_time,edition_date } = req.body;

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database and collection
        const db = client.db('magneto-proyecto'); // replace with your database name
        const collection = db.collection('pages'); // replace with your collection name

        const existingPage = await collection.findOne({ id_user });

        if (existingPage) {
            await collection.updateOne({ id_user }, { $set: { htmlCode, cssCode,edition_date,edition_time,approval_status:"Pendiente",checked:false } });
        } else {
            const newPage = new Page({ id_user, username, email, htmlCode, cssCode,edition_time,edition_date });
            const result = await collection.insertOne(newPage);
        }
        //const result = await collection.insertOne(doc);
        res.status(200).send({ message: 'File saved successfully' });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send({ message: 'Failed to save file' });
    }
};
export const getPageRequests=async(req,res)=>{
    try{
        await client.connect();
        const db = client.db('magneto-proyecto'); // replace with your database name
        const collection = db.collection('pages'); // replace with your collection name
        const pages = await collection.find({}).toArray();
        res.status(200).send({pages});
    }catch(error){
        console.error(`Error: ${error}`);
        res.status(500).send({ message: 'Failed to get pages' });
    }
};
export const getCodePage=async(req,res)=>{
    const {id}=req.body
    try{
        await client.connect();
        const db = client.db('magneto-proyecto'); // replace with your database name
        const collection = db.collection('pages'); // replace with 
        const idp = new ObjectId(id);
        const checked=true
        const page = await collection.findOne({ _id: idp });
        await collection.updateOne({ _id:idp }, { $set: { checked } });
        res.status(200).send({page});
    }catch(error){
        console.error(`Error: ${error}`);
        res.status(500).send({ message: 'Failed to get the page code' });
    }
};
export const approvePage=async(req,res)=>{
    const {id}=req.body
    try{
        await client.connect();
        const db = client.db('magneto-proyecto'); // replace with your database name
        const collection = db.collection('pages'); // replace with 
        const idp = new ObjectId(id);
        const approval_status="Aprobado"
        await collection.updateOne({ _id:idp }, { $set: { approval_status } });
        res.status(200).send();
    }catch(error){
        console.error(`Error: ${error}`);
        res.status(500).send({ message: 'Failed approving the page' });
    }
};
export const rejectPage=async(req,res)=>{
    const {id}=req.body
    try{
        await client.connect();
        const db = client.db('magneto-proyecto'); // replace with your database name
        const collection = db.collection('pages'); // replace with 
        const idp = new ObjectId(id);
        const approval_status="Rechazado"
        await collection.updateOne({ _id:idp }, { $set: { approval_status } });
        res.status(200).send();
    }catch(error){
        console.error(`Error: ${error}`);
        res.status(500).send({ message: 'Failed approving the page' });
    }
};
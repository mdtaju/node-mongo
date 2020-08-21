const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
const uri = process.env.DB_URI;
let client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/getAppointment', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("newOne").collection("appointment");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
    });
});

app.post('/appointment', (req, res) => {
    const appointment = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("newOne").collection("appointment");
        collection.insertOne(appointment, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
    });
});

app.listen(4200, () => console.log('Listenting to port 4200'));
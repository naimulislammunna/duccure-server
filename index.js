const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('server running nowwww');
} );
app.get('/users', (req, res) =>{
    res.send('users  nowwww');
} );

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l95yc9m.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const productCollection = client.db('doctor3').collection('service3');
        const reviewCollection = client.db('review').collection('review1');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query).limit(3);
            const service = await cursor.toArray();
            res.send(service);
        })
        app.get('/service/all', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        })
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await productCollection.findOne(query);
            res.send(service);
        })

        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        })

        app.post('/review', async (req, res) =>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })
    }
    finally{

    }
}
run(err => console.log(err));

app.listen(port, () =>{
    console.log('Server runnnnnnigggggg', port);
})
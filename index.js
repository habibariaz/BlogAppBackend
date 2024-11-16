import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import Connection from './database/db.js'
import Router from './route/Route.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(cors(
    { origin: 'http://localhost:3000' }
));    //cors used for POST method 

app.use(bodyParser.json({ extended: true }))     //bodyParser.json() specifically parses incoming requests with JSON payloads, making the data available in req.body.
app.use(bodyParser.urlencoded({ extended: true })) //middleware parses URL-encoded data from the client, such as form submissions where the data is encoded in key-value pairs in the URL format

app.use('/', Router);

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is Running Successfully on PORT ${PORT}`))

const username = process.env.DB_Username;
const password = process.env.DB_Password;

Connection(username, password);
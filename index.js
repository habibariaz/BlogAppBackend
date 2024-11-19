import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import Connection from './database/db.js'
import Router from './route/Route.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

// const corsOptions = {
//     'Access-Control-Allow-Origin': 'https://blog-app-umber-psi.vercel.app',
//     'Access-Control-Allow-Credentials': true,
//     // origin: 'https://blog-app-umber-psi.vercel.app', // Allow frontend origins
//     'methods': ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     'credentials': true, // Allow cookies and Authorization headers
//     'allowedHeaders': ['Authorization', 'Content-Type'],
// };

const corsOptions = {
    origin: 'https://blog-app-umber-psi.vercel.app', // Specify the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and Authorization headers
    allowedHeaders: ['Authorization', 'Content-Type'], // Specify allowed headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // For handling preflight requests

app.use(bodyParser.json({ extended: true }))     //bodyParser.json() specifically parses incoming requests with JSON payloads, making the data available in req.body.
app.use(bodyParser.urlencoded({ extended: true })) //middleware parses URL-encoded data from the client, such as form submissions where the data is encoded in key-value pairs in the URL format

app.use('/', Router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is Running Successfully on PORT ${PORT}`))

const username = process.env.DB_Username;
const password = process.env.DB_Password;

const URL = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@blogapp.bqsqi.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`

Connection(URL);

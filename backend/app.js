import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes/user.route.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use(router);

async function connectDb() {
    await mongoose.connect('mongodb://localhost:27017', {
        dbName: 'UserDb',
    });
}

connectDb().catch((err) => console.error(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
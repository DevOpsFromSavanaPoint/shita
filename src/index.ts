import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT || 2812;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})




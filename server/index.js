import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, ()=>{
   console.log('Connected to MongoDB');
})

//api routes starts here

//api routes ends here

app.listen(5000, ()=>{
    console.log(`Server is ruuning on port ${PORT}`);
})
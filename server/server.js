import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js"
import userRotuer from "./routes/userRoute.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
// server.js or index.js
import { File } from 'node:buffer';
globalThis.File = File;
const app = express()
const PORT = process.env.PORT || 3000;


await connectDB()
app.use(express.json())
app.use(cors({

    origin: "*", // ya '*' sab allow karne ke liye
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use('/api/users', userRotuer)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)
app.get('/', (req, res) => {
    res.send("Server is Running")
})

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})
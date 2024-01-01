import express from "express";
const app = express()
const Port = 4000
import ConnectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

//database config
ConnectDb()

//middleware
app.use(express.json())

//routes
app.use('/api', authRoutes);

app.use(express.static(path.join(__dirname,'./client/build')))


app.get('/' , (req,res) => {
    res.send("welcome to home page")
})

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './client/bulid/index.html'));
})

//listen port
app.listen(Port,() => {
    console.log(`server is listening this ${Port}`)
})
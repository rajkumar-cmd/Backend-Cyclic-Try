const express=require("express");
const {connection}=require("./config/db");
const {userRouter}=require("./routes/User.route");
const {notesRouter}=require("./routes/Notes.route");
const {authenticate}=require("./middleware/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()

const app=express();
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",notesRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Trouble catching the DB")
        console.log(err)
    }
    console.log(`running at ${process.env.port}`);
})
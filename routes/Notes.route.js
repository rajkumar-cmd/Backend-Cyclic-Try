const express = require("express")
const { NoteModel } = require("../models/notes.model")
const notesRouter = express.Router()

//for all the following things authentication is required.
notesRouter.get("/", async(req, res) => {
    //logic to get the notes
    const notes=await NoteModel.find()
    res.send(notes)
    console.log("notes")
})

notesRouter.post("/create", async (req, res) => {
    const payload = req.body
    try{
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send({ "msg": "Note Created" })
    }catch(err){
        console.log(err);
    }
})

notesRouter.patch("/update/:id", async (req, res) => {
    console.log("update")
    const payload = req.body
    const id=req.params.id;
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    //logic to update the notes

    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Update the note")
        }
    }catch(err){
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
})

notesRouter.delete("/delete/:id", async (req, res) => {
    //logic to delete the notes
    const id=req.params.id;
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    //logic to update the notes

    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("Update the note")
        }
    }catch(err){
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {
    notesRouter
}
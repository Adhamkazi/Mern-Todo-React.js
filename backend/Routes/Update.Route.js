const express = require('express');
const { TodoModel } = require('../Modals/Todo.Modal');

const updateRouter = express.Router();


updateRouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id;
    const payload =req.body;
    try {
        await TodoModel.findByIdAndUpdate({_id:ID}, payload)
        res.send({ "msg": `Todo has been updated with id : ${ID} ` })
    } catch (error) {
        res.send({ "msg": "cannot update Todo data", "error": error.message })
    }
})


module.exports={
    updateRouter
}
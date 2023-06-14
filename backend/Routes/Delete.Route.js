const express = require('express');
const { TodoModel } = require('../Modals/Todo.Modal');

const deleteRouter = express.Router();

deleteRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id;
    try {
        await TodoModel.findByIdAndDelete({_id:ID});
        res.send({ "msg": `Todo has been Deleted with ${ID} ` })
    } catch (error) {
        res.send({ "msg": "cannot delete Todo data", "error": error.message })   
    }
})

module.exports={
    deleteRouter
}
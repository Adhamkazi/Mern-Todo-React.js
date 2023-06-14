const express = require('express');
const { TodoModel } = require('../Modals/Todo.Modal');

const postRouter = express.Router();


postRouter.post("/post",async(req,res)=>{
try {
    const todo = await TodoModel(req.body);
    await todo.save();
    res.send("Todo has been Added successfully")
} catch (error) {
    res.send({ "msg": "unable to add Todo", "error": error.message })
}
})


module.exports ={
    postRouter  
}
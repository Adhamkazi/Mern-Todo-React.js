const express = require('express');
const { TodoModel } = require('../Modals/Todo.Modal');


const getRouter = express.Router();

getRouter.get('/',async(req,res)=>{
let query = req.query;

try {
    const todos = await TodoModel.find(query);
    res.send(todos);
} catch (error) {
    res.send({ "msg": "unable to get the Todo data", "error": error.message })
}
})


module.exports={
    getRouter
}
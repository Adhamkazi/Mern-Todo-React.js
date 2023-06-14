const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
},
{
    versionKey:false
})


const TodoModel = mongoose.model("todo",TodoSchema)

module.exports = {TodoModel}
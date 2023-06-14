require('dotenv').config()
const express = require('express');
const { connection } = require('./db');
const { getRouter } = require('./Routes/Get.Route');
const { postRouter } = require('./Routes/Post.Route');
const { deleteRouter } = require('./Routes/Delete.Route');
const { updateRouter } = require('./Routes/Update.Route');
const cors = require("cors")
const app = express();
app.use(express.json());

app.use(cors())


 app.get("/",(req,res)=>{
    res.send("Todos")
 })
app.use("/todo",getRouter);
app.use("/todo",postRouter);
app.use("/todo",deleteRouter)
app.use("/todo",updateRouter)


app.listen(8080,async()=>{
try {
    await connection
    console.log("Connected to Db");
} catch (error) {
    console.log({"Erros":error.message})
}
console.log(`Server is runing on 8080`)
})
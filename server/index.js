const express =require("express")
const http=require("http")
const {Server}=require("socket.io")
const connectDb =require("./configs/db.js")
const {databaseUri}=require("./configs/var.js")


const app=express()
const router=express.Router()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"*"
    }
})

router.get("/health",(req,res)=>{
    return res.status(200).json({
        message:"server working"
    })

})

app.use("/",router)

io.on("connection",(socket)=>{
console.log("user connected ",socket.id)

socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
})

})

connectDb(databaseUri)


app.listen(3000,()=>{
    console.log("server listening on port 3000")
})


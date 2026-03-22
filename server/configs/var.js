const dotenv =require("dotenv")
dotenv.config()

const requiredEnvs=["MONGO_URI","PORT"]

requiredEnvs.forEach((key)=>{
    if(!process.env[key]){
        console.log("missing key",key)
        process.exit(1)
    }
})

const databaseUri=process.env.MONGO_URI
const port=process.env.PORT

module.exports={databaseUri,port}

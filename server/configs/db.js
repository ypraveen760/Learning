const mongoose =require("mongoose")

let retries=0;
const maxRetries=5

const connectDb=(async(uri)=>{
    try {
        mongoose.set("strictQuery",true)
         const conn= await mongoose.connect(uri,{
            autoIndex:false,
            serverSelectionTimeoutMS:5000,
         })
            console.log("connected to database",conn.connection.host)
    } catch (error) {
        retries++;
        console.log(`error connecting database retries${retries}`,error.message)

        if(retries<maxRetries){
            console.log("retring in 5 second retry=",retries)
            setTimeout(()=>connectDb(uri),5000)
        }else{
            console.log(`max retry attempt exceed ${retries} ,exiting`)
             process.exit(1);

        }
        
    }
})

module.exports=connectDb
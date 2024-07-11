import mongoose from "mongoose";

//db connection
export async function db(){
    try {
      let client=await mongoose.connect(process.env.MONGO_URL)  
      console.log(`db connected on ${client.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

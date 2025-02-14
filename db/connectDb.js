import mongoose from "mongoose";
const connectDb = async () => {
  if(mongoose.connections[0].readyState){
    console.log("MongoDb already Connected");
    return;
  }
    try {

      const conn = await mongoose.connect(`mongodb://localhost:27017/chai`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000, // 5 seconds timeout
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

export default connectDb

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDb() {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URL}/${process.env.APP_NAME}`)
      .then(connectionInstance => {
        console.log(
          `MongoDB connection successful Instance Name ${connectionInstance.connection.host}`
        );
      })
      .catch(error => {
        console.error('MongoDB connection error:', error);
      });
  } catch (error) {
    console.log(error);
  }
}

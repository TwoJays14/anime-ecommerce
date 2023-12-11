import mongoose from 'mongoose';

let isConnected = false; // track connection status
let connection: typeof mongoose | null = null; // store connection object
export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    if (process.env.MONGODB_URI) {
      connection = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB,
      });
      isConnected = true;
    }
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to DB', error);
  }
};

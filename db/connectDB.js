
import mongoose from "mongoose";

const connectDB = async (DBURL, DBNAME) => {
  try {
    console.log("Connecting to DB:", DBURL, DBNAME); // Debugging
    await mongoose.connect(DBURL, {
      dbName: DBNAME,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error occurred while connecting to DB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
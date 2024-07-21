import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
    logger.info("connected to db successfully.");
  } catch (error) {
    logger.error("Could not connect to db");
    logger.error(error);
    // info
    process.exit(1);
  }
}

export default connect;

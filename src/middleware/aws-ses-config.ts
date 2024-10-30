const AWS = require('aws-sdk');
import dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const SES_CONFIG = {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION
}

export const AWS_SES = new AWS.SES(SES_CONFIG);


import { infer, object, string } from "zod";

const envVariables = object({
  S3_BUCKET_NAME: string(),
  BUCKET_REGION: string(),
  ACCESS_KEY: string(),
  SECRET_ACCESS_KEY: string(),
  PORT: string(),
  DB_URI: string(),
  SALT_WORK_FACTOR: string(),
  ACCESS_TOKEN_TTL: string(),
  REFRESH_TOKEN_TTL: string(),
  ORIGIN: string(),
  S3_BUCKET_URL: string(),
  PRIVATE_KEY: string(),
  PUBLIC_KEY: string(),
  NODE_ENV: string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends infer<typeof envVariables> {}
  }
}

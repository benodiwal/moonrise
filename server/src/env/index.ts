import { z } from 'zod';
import { config } from 'dotenv';

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  CLIENT_ORIGIN: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_REGION: z.string(),
  S3_BUCKET_NAME: z.string(),
});

export const parseEnv = (): void => {
  config();
  envSchema.parse(process.env);
};

const getEnvVar = (key: keyof z.infer<typeof envSchema>): string => {
  return process.env[key] as string;
};

export default getEnvVar;

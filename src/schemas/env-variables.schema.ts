import z from 'zod';

export const envVariablesSchema = z.object({
  APP_PORT: z.coerce.number().int().min(1).max(65535),
  APP_HOST: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number().int().min(1).max(65535),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

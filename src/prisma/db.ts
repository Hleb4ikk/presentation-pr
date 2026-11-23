import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

export const DATABASE_URL =
  `postgresql://${POSTGRES_USER}:${encodeURIComponent(POSTGRES_PASSWORD!)}` +
  `@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export const db = postgres({
  contract,
  url: DATABASE_URL,
});

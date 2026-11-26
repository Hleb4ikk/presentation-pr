import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };
import { DatabaseConfiguration } from '../interfaces/configuration.js';

export const contract = contractFromJson<Contract>(contractJson);

export const buildDatabaseUrl = (params: DatabaseConfiguration): string =>
  `postgresql://${params.user}:${encodeURIComponent(params.password)}` +
  `@${params.host}:${params.port}/${params.database}`;

export const createDbClient = (params: DatabaseConfiguration) =>
  postgres({
    contract,
    url: buildDatabaseUrl(params),
  });

export type DbClient = ReturnType<typeof createDbClient>;

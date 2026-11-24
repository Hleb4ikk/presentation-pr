import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

const connection =
  `postgresql://${POSTGRES_USER}:${encodeURIComponent(POSTGRES_PASSWORD!)}` +
  `@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection,
    },
  }),
});

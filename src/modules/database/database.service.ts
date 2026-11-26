import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createDbClient, DbClient } from '../../prisma/db.js';
import { ConfigService } from '../config/config.service.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public readonly client: DbClient;

  constructor(configService: ConfigService) {
    this.client = createDbClient(configService.database);
  }

  async onModuleInit() {
    await this.client.connect();
  }
  async onModuleDestroy() {
    await this.client.close();
  }
}

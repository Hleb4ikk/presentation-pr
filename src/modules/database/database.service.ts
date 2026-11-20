import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { db } from '../../prisma/db.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public readonly client = db;

  async onModuleInit() {
    await this.client.connect();
  }
  async onModuleDestroy() {
    await this.client.close();
  }
}

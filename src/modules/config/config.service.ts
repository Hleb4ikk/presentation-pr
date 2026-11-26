import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import {
  AppConfiguration,
  DatabaseConfiguration,
} from '../../interfaces/configuration.js';

@Injectable()
export class ConfigService {
  readonly app: AppConfiguration;
  readonly database: DatabaseConfiguration;

  constructor(private configService: NestConfigService) {
    this.app = {
      port: this.configService.getOrThrow('APP_PORT'),
      host: this.configService.getOrThrow('APP_HOST'),
    };
    this.database = {
      host: this.configService.getOrThrow('POSTGRES_HOST'),
      port: this.configService.getOrThrow('POSTGRES_PORT'),
      user: this.configService.getOrThrow('POSTGRES_USER'),
      password: this.configService.getOrThrow('POSTGRES_PASSWORD'),
      database: this.configService.getOrThrow('POSTGRES_DB'),
    };
  }
}

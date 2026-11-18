import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module.js';

@Module({
  imports: [ConfigModule],
  providers: [],
})
export class AppModule {}

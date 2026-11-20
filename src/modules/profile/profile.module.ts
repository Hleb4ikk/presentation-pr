import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  providers: [ProfileResolver],
  exports: [ProfileResolver],
})
export class ProfileModule {}

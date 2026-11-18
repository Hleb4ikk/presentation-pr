import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';

@Module({
  providers: [ProfileResolver],
  exports: [ProfileResolver],
})
export class ProfileModule {}

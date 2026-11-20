import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';
import { DatabaseModule } from '../database/database.module.js';
import { SkillModule } from '../skill/skill.module.js';

@Module({
  imports: [DatabaseModule, SkillModule],
  providers: [ProfileResolver],
  exports: [ProfileResolver],
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { SkillDataLoader } from './skill.data-loader.js';
import { SkillRepository } from './skill.repository.js';
import { SkillService } from './skill.service.js';

@Module({
  imports: [DatabaseModule],
  providers: [SkillDataLoader, SkillRepository, SkillService],
  exports: [SkillDataLoader, SkillService],
})
export class SkillModule {}

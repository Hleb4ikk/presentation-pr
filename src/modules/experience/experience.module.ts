import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ExperienceService } from './experience.service.js';
import { ExperienceRepository } from './experience.repository.js';
import { ExperienceDataLoader } from './experience.data-loader.js';

@Module({
  imports: [DatabaseModule],
  providers: [ExperienceService, ExperienceRepository, ExperienceDataLoader],
  exports: [ExperienceDataLoader, ExperienceService],
})
export class ExperienceModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { AchievementService } from './achievement.service.js';
import { AchievementRepository } from './achievement.repository.js';
import { AchievementDataLoader } from './achievement.data-loader.js';

@Module({
  imports: [DatabaseModule],
  providers: [AchievementService, AchievementRepository, AchievementDataLoader],
  exports: [AchievementDataLoader, AchievementService],
})
export class AchievementModule {}

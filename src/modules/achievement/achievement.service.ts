import { Injectable } from '@nestjs/common';
import { AchievementRepository } from './achievement.repository.js';
import { Achievement } from '../../types/Achievement.js';

@Injectable()
export class AchievementService {
  constructor(private readonly achievementRepository: AchievementRepository) {}

  async fetchAchievementsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Achievement[]> {
    return await this.achievementRepository.getAchievementsByProfileIds(
      profileIds,
    );
  }
}

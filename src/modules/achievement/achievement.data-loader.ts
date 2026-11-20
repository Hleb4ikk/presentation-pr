import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { AchievementService } from './achievement.service.js';
import { Achievement } from '../../types/Achievement.js';

@Injectable({ scope: Scope.REQUEST })
export class AchievementDataLoader {
  constructor(private readonly achievementService: AchievementService) {}

  private readonly loader = new DataLoader<string, Achievement[]>(
    async (profileIds: readonly string[]) => {
      const allAchievements: Achievement[] =
        await this.achievementService.fetchAchievementsByProfileIds(profileIds);

      return profileIds.map((id) =>
        allAchievements.filter((achievement) => achievement.profile_id === id),
      );
    },
  );

  async loadByProfileId(profileId: string): Promise<Achievement[]> {
    return this.loader.load(profileId);
  }
}

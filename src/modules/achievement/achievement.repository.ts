import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Achievement } from '../../types/Achievement.js';

@Injectable()
export class AchievementRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAchievementsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Achievement[]> {
    return await this.databaseService.client.orm.public.Achievement.select(
      'id',
      'title',
      'description',
      'profile_id',
      'experience_id',
    )
      .where((s) => s.profile_id.in(profileIds))
      .all();
  }
}

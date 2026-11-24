import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Experience } from '../../types/Experience.js';

@Injectable()
export class ExperienceRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getExperienceByProfileIds(
    profileIds: readonly string[],
  ): Promise<Experience[]> {
    const rawExperience =
      await this.databaseService.client.orm.public.Experience.select(
        'id',
        'company_name',
        'position',
        'start_date',
        'end_date',
        'profile_id',
      )
        .where((s) => s.profile_id.in(profileIds))
        .all();
    return rawExperience.map((experience) => ({
      ...experience,
      start_date: new Date(experience.start_date),
      end_date: new Date(experience.end_date),
    }));
  }
}

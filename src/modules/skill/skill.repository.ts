import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Skill } from '../../types/Skill.js';

@Injectable()
export class SkillRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getSkillsByProfileIds(profileIds: readonly string[]): Promise<Skill[]> {
    return await this.databaseService.client.orm.public.Skill.select(
      'id',
      'name',
      'profile_id',
    )
      .where((s) => s.profile_id.in(profileIds))
      .all();
  }
}

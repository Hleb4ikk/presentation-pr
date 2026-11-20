import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Project } from '../../types/Project.js';

@Injectable()
export class ProjectRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProjectsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Project[]> {
    return await this.databaseService.client.orm.public.Project.select(
      'id',
      'name',
      'url',
      'profile_id',
    )
      .where((s) => s.profile_id.in(profileIds))
      .all();
  }
}

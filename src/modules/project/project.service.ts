import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository.js';
import { Project } from '../../types/Project.js';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async fetchProjectsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Project[]> {
    return await this.projectRepository.getProjectsByProfileIds(profileIds);
  }
}

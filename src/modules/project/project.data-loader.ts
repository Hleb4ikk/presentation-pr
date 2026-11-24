import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ProjectService } from './project.service.js';
import { Project } from '../../types/Project.js';

@Injectable({ scope: Scope.REQUEST })
export class ProjectDataLoader {
  constructor(private readonly projectService: ProjectService) {}

  private readonly loader = new DataLoader<string, Project[]>(
    async (profileIds: readonly string[]) => {
      const allProjects: Project[] =
        await this.projectService.fetchProjectsByProfileIds(profileIds);

      return profileIds.map((id) =>
        allProjects.filter((project) => project.profile_id === id),
      );
    },
  );

  async loadByProfileId(profileId: string): Promise<Project[]> {
    return this.loader.load(profileId);
  }
}

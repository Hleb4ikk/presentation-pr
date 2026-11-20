import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ExperienceService } from './experience.service.js';
import { Experience } from '../../types/Experience.js';

@Injectable({ scope: Scope.REQUEST })
export class ExperienceDataLoader {
  constructor(private readonly experienceService: ExperienceService) {}

  private readonly loader = new DataLoader<string, Experience[]>(
    async (profileIds: readonly string[]) => {
      const allExperience: Experience[] =
        await this.experienceService.fetchExperienceByProfileIds(profileIds);

      return profileIds.map((id) =>
        allExperience.filter((experience) => experience.profile_id === id),
      );
    },
  );

  async loadByProfileId(profileId: string): Promise<Experience[]> {
    return this.loader.load(profileId);
  }
}

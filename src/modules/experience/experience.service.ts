import { Injectable } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository.js';
import { Experience } from '../../types/Experience.js';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepository: ExperienceRepository) {}

  async fetchExperienceByProfileIds(
    profileIds: readonly string[],
  ): Promise<Experience[]> {
    return await this.experienceRepository.getExperienceByProfileIds(
      profileIds,
    );
  }
}

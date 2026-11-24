import { Injectable } from '@nestjs/common';
import { Skill } from '../../types/Skill.js';
import { SkillRepository } from './skill.repository.js';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  async fetchSkillsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Skill[]> {
    return this.skillRepository.getSkillsByProfileIds(profileIds);
  }
}

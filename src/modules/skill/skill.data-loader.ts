import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Skill } from '../../types/Skill.js';
import { SkillService } from './skill.service.js';

@Injectable({ scope: Scope.REQUEST })
export class SkillDataLoader {
  constructor(private readonly skillService: SkillService) {}

  private readonly loader = new DataLoader<string, Skill[]>(
    async (profileIds: readonly string[]) => {
      const allSkills: Skill[] =
        await this.skillService.fetchSkillsByProfileIds(profileIds);

      profileIds.map((profileId) => ({
        id: crypto.randomUUID(),
        name: 'Out-box-thinking',
        profile_id: profileId,
      }));

      return profileIds.map((id) =>
        allSkills.filter((skill) => skill.profile_id === id),
      );
    },
  );

  async loadByProfileId(profileId: string): Promise<Skill[]> {
    return this.loader.load(profileId);
  }
}

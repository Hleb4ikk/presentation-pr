import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import type { Profile } from '../../types/Profile.js';
import type { Skill } from '../../types/Skill.js';
import { SkillDataLoader } from '../skill/skill.data-loader.js';

@Resolver('Profile')
export class ProfileResolver {
  constructor(readonly skillDataLoader: SkillDataLoader) {}

  @Query('profile')
  getProfile(@Args('id') id: string): Omit<Profile, 'skills'> {
    const experience_id = crypto.randomUUID();
    return {
      id,
      name: 'Hleb Niunko',
      description: 'Hello my name is Hleb',
      projects: [
        {
          id: crypto.randomUUID(),
          name: 'Film planner',
          url: null,
          profile_id: id,
        },
      ],
      social_media: [
        {
          id: crypto.randomUUID(),
          name: 'linkedIn',
          url: 'https://www.linkedin.com/in/hleb-niunko-9416a434a/',
          profile_id: id,
        },
      ],
      experience: [
        {
          id: experience_id,
          company_name: 'TwelveDevs',
          position: 'fullstack-developer',
          start_date: new Date(Date.now()),
          end_date: new Date(Date.now()),
          profile_id: id,
        },
      ],
      achievements: [
        {
          id: crypto.randomUUID(),
          title: 'Upscale big service',
          description: 'Very very hard realization',
          experience_id,
          profile_id: id,
        },
      ],
    };
  }

  @ResolveField('skills')
  async getSkills(@Parent() profile: { id: string }): Promise<Skill[]> {
    return await this.skillDataLoader.loadByProfileId(profile.id);
  }
}

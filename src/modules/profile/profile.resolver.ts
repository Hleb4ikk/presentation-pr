import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import type { Profile } from '../../types/Profile.js';
import type { Skill } from '../../types/Skill.js';
import { SkillDataLoader } from '../skill/skill.data-loader.js';
import { Experience } from '../../types/Experience.js';
import { ExperienceDataLoader } from '../experience/experience.data-loader.js';
import { SocialMediaDataLoader } from '../social-media/social-media.data-loader.js';
import { SocialMedia } from '../../types/SocialMedia.js';
import { AchievementDataLoader } from '../achievement/achievement.data-loader.js';
import { Achievement } from '../../types/Achievement.js';

@Resolver('Profile')
export class ProfileResolver {
  constructor(
    readonly skillDataLoader: SkillDataLoader,
    readonly experienceDataLoader: ExperienceDataLoader,
    readonly socialMediaLoader: SocialMediaDataLoader,
    readonly achievementDataLoader: AchievementDataLoader,
  ) {}

  @Query('profile')
  getProfile(
    @Args('id') id: string,
  ): Omit<Profile, 'skills' | 'experience' | 'social_media' | 'achievements'> {
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
    };
  }

  @ResolveField('skills')
  async getSkills(@Parent() profile: { id: string }): Promise<Skill[]> {
    return await this.skillDataLoader.loadByProfileId(profile.id);
  }

  @ResolveField('experience')
  async getExperience(
    @Parent() profile: { id: string },
  ): Promise<Experience[]> {
    return await this.experienceDataLoader.loadByProfileId(profile.id);
  }

  @ResolveField('social_media')
  async getSocialMedia(
    @Parent() profile: { id: string },
  ): Promise<SocialMedia[]> {
    return await this.socialMediaLoader.loadByProfileId(profile.id);
  }

  @ResolveField('achievements')
  async getAchievements(
    @Parent() profile: { id: string },
  ): Promise<Achievement[]> {
    return await this.achievementDataLoader.loadByProfileId(profile.id);
  }
}

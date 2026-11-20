import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';
import { DatabaseModule } from '../database/database.module.js';
import { SkillModule } from '../skill/skill.module.js';
import { ExperienceModule } from '../experience/experience.module.js';
import { SocialMediaModule } from '../social-media/social-media.module.js';
import { AchievementModule } from '../achievement/achievement.module.js';

@Module({
  imports: [
    DatabaseModule,
    SkillModule,
    ExperienceModule,
    SocialMediaModule,
    AchievementModule,
  ],
  providers: [ProfileResolver],
  exports: [ProfileResolver],
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';
import { DatabaseModule } from '../database/database.module.js';
import { SkillModule } from '../skill/skill.module.js';
import { ExperienceModule } from '../experience/experience.module.js';
import { SocialMediaModule } from '../social-media/social-media.module.js';
import { AchievementModule } from '../achievement/achievement.module.js';
import { ProjectModule } from '../project/project.module.js';
import { ProfileService } from './profile.service.js';
import { ProfileRepository } from './profile.repository.js';

@Module({
  imports: [
    DatabaseModule,
    SkillModule,
    ExperienceModule,
    SocialMediaModule,
    AchievementModule,
    ProjectModule,
  ],
  providers: [ProfileResolver, ProfileService, ProfileRepository],
  exports: [ProfileResolver],
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { SocialMediaService } from './social-media.service.js';
import { SocialMediaRepository } from './social-media.repository.js';
import { SocialMediaDataLoader } from './social-media.data-loader.js';

@Module({
  imports: [DatabaseModule],
  providers: [SocialMediaService, SocialMediaRepository, SocialMediaDataLoader],
  exports: [SocialMediaDataLoader, SocialMediaService],
})
export class SocialMediaModule {}

import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { SocialMediaService } from './social-media.service.js';
import { SocialMedia } from '../../types/SocialMedia.js';

@Injectable({ scope: Scope.REQUEST })
export class SocialMediaDataLoader {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  private readonly loader = new DataLoader<string, SocialMedia[]>(
    async (profileIds: readonly string[]) => {
      const allSocialMedia: SocialMedia[] =
        await this.socialMediaService.fetchSocialMediaByProfileIds(profileIds);

      return profileIds.map((id) =>
        allSocialMedia.filter((socialMedia) => socialMedia.profile_id === id),
      );
    },
  );

  async loadByProfileId(profileId: string): Promise<SocialMedia[]> {
    return this.loader.load(profileId);
  }
}

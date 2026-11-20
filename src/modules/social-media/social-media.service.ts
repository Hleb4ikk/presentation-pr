import { Injectable } from '@nestjs/common';
import { SocialMediaRepository } from './social-media.repository.js';
import { SocialMedia } from '../../types/SocialMedia.js';

@Injectable()
export class SocialMediaService {
  constructor(private readonly socialMediaRepository: SocialMediaRepository) {}

  async fetchSocialMediaByProfileIds(
    profileIds: readonly string[],
  ): Promise<SocialMedia[]> {
    return await this.socialMediaRepository.getSocialMediaByProfileIds(
      profileIds,
    );
  }
}

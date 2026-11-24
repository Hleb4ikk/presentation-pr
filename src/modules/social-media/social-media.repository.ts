import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { SocialMedia } from '../../types/SocialMedia.js';

@Injectable()
export class SocialMediaRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getSocialMediaByProfileIds(
    profileIds: readonly string[],
  ): Promise<SocialMedia[]> {
    return await this.databaseService.client.orm.public.SocialMedia.select(
      'id',
      'name',
      'url',
      'profile_id',
    )
      .where((s) => s.profile_id.in(profileIds))
      .all();
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Profile } from '../../types/Profile.js';

type ProfileRow = Pick<Profile, 'id' | 'name' | 'description'>;

@Injectable()
export class ProfileRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProfileById(id: string): Promise<ProfileRow | null> {
    return await this.databaseService.client.orm.public.Profile.select(
      'id',
      'name',
      'description',
    )
      .where((p) => p.id.eq(id))
      .first();
  }

  async getFirstProfile(): Promise<ProfileRow | null> {
    return await this.databaseService.client.orm.public.Profile.select(
      'id',
      'name',
      'description',
    )
      .limit(1)
      .first();
  }
}

import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ProfileRepository } from './profile.repository.js';
import { Profile } from '../../types/Profile.js';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async fetchProfile(
    id?: string,
  ): Promise<Pick<Profile, 'id' | 'name' | 'description'>> {
    const profile = id
      ? await this.profileRepository.getProfileById(id)
      : await this.profileRepository.getFirstProfile();

    if (!profile) {
      throw new GraphQLError('Profile not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    return profile;
  }
}

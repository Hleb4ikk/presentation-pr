import { Resolver, Query, Args } from '@nestjs/graphql';
import type { Profile } from '../../types/Profile.js';

@Resolver()
export class ProfileResolver {
  @Query('profile')
  getProfile(@Args('id') id: string): Profile {
    const experience_id = crypto.randomUUID();
    return {
      id,
      name: 'Hleb Niunko',
      description: 'Hello my name is Hleb',
      skills: [
        { id: crypto.randomUUID(), name: 'Out-box-thinking', profile_id: id },
      ],
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
}

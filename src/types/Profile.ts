import { Skill } from './Skill.js';
import { Project } from './Project.js';
import { SocialMedia } from './SocialMedia.js';
import { Experience } from './Experience.js';
import { Achievement } from './Achievement.js';
export type Profile = {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  projects: Project[];
  social_media: SocialMedia[];
  experience: Experience[];
  achievements: Achievement[];
};

import 'dotenv/config';
import { db } from './prisma/db.js';

const PROFILE_NAME = 'Hleb Niunko';

const PROFILE_DESCRIPTION =
  'Creative and detail-oriented Full-Stack Developer with a strong foundation ' +
  'in both frontend and backend development. Experienced in building scalable ' +
  'applications using technologies such as React, TypeScript, Node.js, and NestJS. ' +
  'Skilled in working with databases (PostgreSQL, Supabase), caching layers ' +
  '(Redis), and integrating external APIs. Confident in designing application ' +
  'architecture, developing clean and reliable code, and delivering end-to-end ' +
  'solutions. Passionate about learning new technologies, improving development ' +
  'workflows, and contributing to impactful, high-quality projects.';

const SKILLS = [
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'Git',
  'GitHub',
  'React.js',
  'Next.js',
  'Express.js',
  'Nest.js',
  'JWT',
  'OAuth 2.0',
  'HTTP',
  'REST API',
  'Drizzle ORM',
  'Prisma ORM',
  'Redux Toolkit',
  'SCSS',
  'Tailwind CSS',
  'CSS Modules',
  'Docker',
  'PostgreSQL',
  'Redis',
  'Cloudflare R2',
  'Vitest',
  'Jest',
  'Playwright',
];

async function clearExistingProfile(): Promise<void> {
  const existing = await db.orm.public.Profile.where((p) =>
    p.name.eq(PROFILE_NAME),
  ).first();

  if (!existing) return;

  await db.orm.public.Profile.where((p) => p.id.eq(existing.id)).deleteAll();

  console.log(`Removed existing profile ${existing.id}`);
}

async function main(): Promise<void> {
  await db.connect();

  await clearExistingProfile();

  const profileId = crypto.randomUUID();

  const profile = await db.orm.public.Profile.create({
    id: profileId,
    name: PROFILE_NAME,
    description: PROFILE_DESCRIPTION,
    experiences: (experience) =>
      experience.create([
        {
          company_name: 'TWELVEDEVS',
          position: 'Fullstack developer',
          start_date: '2025-06-01',
          end_date: '2026-11-01',
          achievements: (achievement) =>
            achievement.create([
              {
                title: 'Internal Enterprise Platform',
                profile_id: profileId,
                description:
                  'Implemented organization-based authentication using OAuth ' +
                  '2.0 and Microsoft Azure AD. Developed a tagging system to ' +
                  'improve item search and organization. Improved responsive ' +
                  'UI for smaller screens and mobile devices. Contributed to ' +
                  'RESTful API development and background task automation.',
              },
              {
                title: 'Invoice Generation Microservice System',
                profile_id: profileId,
                description:
                  'Developed a microservice-based invoice generation system. ' +
                  'Implemented asynchronous communication using BullMQ and ' +
                  'Redis Streams. Built PDF generation workflows and automated ' +
                  'email delivery integration.',
              },
            ]),
        },
        {
          company_name: 'Zrobim-site.by',
          position: 'Fullstack developer',
          start_date: '2026-07-01',
          end_date: '2026-08-31',
          achievements: (achievement) =>
            achievement.create([
              {
                title: 'Platform for managing the filming process',
                profile_id: profileId,
                description:
                  'React/TypeScript SPA with rich domain logic. Built a ' +
                  'reusable UI component library. Complex forms validated ' +
                  'with react-hook-form + Zod. Interactive UX for a real ' +
                  'production workflow. Localization and role-based UI.',
              },
            ]),
        },
      ]),
    projects: (project) =>
      project.create([
        { name: 'URL Shortener & Analytics Platform', url: null },
        { name: 'Currency Exchange API', url: null },
      ]),
    skills: (skill) => skill.create(SKILLS.map((name) => ({ name }))),
    social_media: (socialMedia) =>
      socialMedia.create([
        { name: 'GitHub', url: 'https://github.com/hleb4ikk' },
        { name: 'Email', url: 'mailto:nunkogleb348@gmail.com' },
      ]),
  });

  console.log(
    `Seeded profile ${profile.id}: 2 experiences, 3 achievements, ` +
      `2 projects, ${SKILLS.length} skills, 2 social links`,
  );
}

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(() => db.close());

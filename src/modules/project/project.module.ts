import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ProjectService } from './project.service.js';
import { ProjectRepository } from './project.repository.js';
import { ProjectDataLoader } from './project.data-loader.js';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectService, ProjectRepository, ProjectDataLoader],
  exports: [ProjectDataLoader, ProjectService],
})
export class ProjectModule {}

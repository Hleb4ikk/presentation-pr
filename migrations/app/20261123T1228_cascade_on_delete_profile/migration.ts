#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/82c721c72f9bf3de98197fb6f7d94d0959ab282d12e59f93ce257fef42c49e60/contract';
import startContract from '../../snapshots/82c721c72f9bf3de98197fb6f7d94d0959ab282d12e59f93ce257fef42c49e60/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/dc9ea2e1b5912681c396316640951272f9bfa546d8742728fb4fc5b8e191ac2c/contract';
import endContract from '../../snapshots/dc9ea2e1b5912681c396316640951272f9bfa546d8742728fb4fc5b8e191ac2c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'achievements',
        constraint: 'achievements_profile_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'experiences',
        constraint: 'experiences_profile_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'projects',
        constraint: 'projects_profile_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'skills',
        constraint: 'skills_profile_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'social_media',
        constraint: 'social_media_profile_id_fkey',
        kind: 'foreignKey',
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'achievements',
        foreignKey: {
          name: 'achievements_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'experiences',
        foreignKey: {
          name: 'experiences_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projects',
        foreignKey: {
          name: 'projects_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skills',
        foreignKey: {
          name: 'skills_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'social_media',
        foreignKey: {
          name: 'social_media_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

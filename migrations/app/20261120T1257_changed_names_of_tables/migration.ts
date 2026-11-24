#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/49779c1264f42b6949338d8f183172cdb9328490fe9036270eb57a3b4b16327f/contract';
import startContract from '../../snapshots/49779c1264f42b6949338d8f183172cdb9328490fe9036270eb57a3b4b16327f/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/82c721c72f9bf3de98197fb6f7d94d0959ab282d12e59f93ce257fef42c49e60/contract';
import endContract from '../../snapshots/82c721c72f9bf3de98197fb6f7d94d0959ab282d12e59f93ce257fef42c49e60/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Achievement' }),
      this.dropTable({ schema: 'public', table: 'Experience' }),
      this.dropTable({ schema: 'public', table: 'Project' }),
      this.dropTable({ schema: 'public', table: 'Skill' }),
      this.dropTable({ schema: 'public', table: 'SocialMedia' }),
      this.dropTable({ schema: 'public', table: 'Profile' }),
      this.createTable({
        schema: 'public',
        table: 'achievements',
        columns: [
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('experience_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('profile_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'experiences',
        columns: [
          col('company_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('end_date', 'date', { notNull: true, codecRef: { codecId: 'pg/date-string@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('position', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profile_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('start_date', 'date', { notNull: true, codecRef: { codecId: 'pg/date-string@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'profiles',
        columns: [
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'projects',
        columns: [
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profile_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skills',
        columns: [
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profile_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'social_media',
        columns: [
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profile_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'achievements',
        index: 'achievements_experience_id_idx_9b808d03',
        columns: ['experience_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'achievements',
        index: 'achievements_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'experiences',
        index: 'experiences_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projects',
        index: 'projects_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'skills',
        index: 'skills_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'social_media',
        index: 'social_media_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'achievements',
        foreignKey: {
          name: 'achievements_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'achievements',
        foreignKey: {
          name: 'achievements_experience_id_fkey',
          columns: ['experience_id'],
          references: { schema: 'public', table: 'experiences', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'experiences',
        foreignKey: {
          name: 'experiences_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projects',
        foreignKey: {
          name: 'projects_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skills',
        foreignKey: {
          name: 'skills_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'social_media',
        foreignKey: {
          name: 'social_media_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'profiles', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

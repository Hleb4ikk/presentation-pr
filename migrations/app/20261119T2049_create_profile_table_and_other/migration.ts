#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/49779c1264f42b6949338d8f183172cdb9328490fe9036270eb57a3b4b16327f/contract';
import endContract from '../../snapshots/49779c1264f42b6949338d8f183172cdb9328490fe9036270eb57a3b4b16327f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Achievement',
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
        table: 'Experience',
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
        table: 'Profile',
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
        table: 'Project',
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
        table: 'Skill',
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
        table: 'SocialMedia',
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
        table: 'Achievement',
        index: 'Achievement_experience_id_idx_9b808d03',
        columns: ['experience_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Achievement',
        index: 'Achievement_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Experience',
        index: 'Experience_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Project',
        index: 'Project_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Skill',
        index: 'Skill_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SocialMedia',
        index: 'SocialMedia_profile_id_idx_ff36b76a',
        columns: ['profile_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Achievement',
        foreignKey: {
          name: 'Achievement_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Achievement',
        foreignKey: {
          name: 'Achievement_experience_id_fkey',
          columns: ['experience_id'],
          references: { schema: 'public', table: 'Experience', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Experience',
        foreignKey: {
          name: 'Experience_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Project',
        foreignKey: {
          name: 'Project_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Skill',
        foreignKey: {
          name: 'Skill_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SocialMedia',
        foreignKey: {
          name: 'SocialMedia_profile_id_fkey',
          columns: ['profile_id'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

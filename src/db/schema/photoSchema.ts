import { InferModel } from 'drizzle-orm'
import { pgTable, integer, varchar, serial } from 'drizzle-orm/pg-core'
import { albums } from './albums'

const defaultUrl =
  'https://photo-drop.onrender.com/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2'

export const photoSchema = pgTable('photoSchema', {
  id: serial('id').primaryKey(),
  albumId: integer('album_id')
    .notNull()
    .references(() => albums.id),
  name: varchar('name', { length: 50 }),
  people: varchar('people').array().default([]),
  originalResizedUrl: varchar('original_resized_url').notNull().default(defaultUrl),
  watermarkResizedUrl: varchar('watermark_resized_url').notNull().default(defaultUrl),
  originalUrl: varchar('original_url').notNull().default(defaultUrl),
  watermarkUrl: varchar('watermark_url').notNull().default(defaultUrl),
})

export type TPhotos = InferModel<typeof photoSchema>
export type TNewPhotos = InferModel<typeof photoSchema, 'insert'>
// export type TablePhotos = typeof photoSchema

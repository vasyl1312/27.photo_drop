import { InferModel } from 'drizzle-orm'
import { pgTable, integer, varchar, serial } from 'drizzle-orm/pg-core'
import { photographersSchema } from './photographer'

export const albums = pgTable('albums', {
  id: serial('id').primaryKey(),
  owner: integer('owner')
    .notNull()
    .references(() => photographersSchema.id),
  name: varchar('name', { length: 50 }).notNull(),
  counterPhoto: integer('counter_photo').notNull().default(0),
  location: varchar('location', { length: 250 }).notNull(),
  createdAt: varchar('created_at', { length: 25 }).notNull(),
})

export type TAlbums = InferModel<typeof albums>
export type TNewAlbums = InferModel<typeof albums, 'insert'>
export type TableAlbums = typeof albums

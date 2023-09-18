import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const photosSchema = pgTable('photos', {
  id: serial('id').primaryKey(),
  phone: varchar('phone').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

import { pgTable, serial, varchar, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const photographersSchema = pgTable('photographers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 50 }).notNull(),
  password: varchar('password').notNull(),
  login: varchar('login', { length: 50 }).notNull(),
})

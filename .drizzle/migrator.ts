import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()
;(async () => {
  const DB_URL = process.env.DATABASE_URL
  try {
    if (!DB_URL) throw new Error('database connection data missing')

    const pool = new Pool({
      connectionString: DB_URL,
      ssl: true,
    })
    const db = drizzle(pool, { logger: true })

    console.log('drizzle-orm migrate START')

    await migrate(db, { migrationsFolder: `${__dirname}/migrations` })

    console.log('drizzle-orm migrate FINISH')
    process.exit(0)
  } catch (error) {
    console.log('drizzle-orm migrate error \n', error)
    process.exit(1)
  }
})()

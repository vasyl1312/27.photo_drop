import express from 'express'
import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 5001
const connectionString = process.env.DATABASE_URL
const client = new Client({ connectionString })

client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })

import connect from '../db/dbConnect'
import { sql } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
const router = express.Router()

const loginRouter = () => {
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { login, password } = req.body

      if (!login || !password) {
        return res.status(400).json({ error: 'Login and password is required' })
      }
    
      const db = await connect()
      const query = sql`
        SELECT id, login, password
        FROM photographers
        WHERE login = ${login}
      `

      const userResult = await db.execute(query)
      const user = userResult.rows[0]

      if (!user || password !== user.password) {
        return res
          .status(401)
          .json({ error: 'User not found with the provided login or password is not correct' })
      }

      const token = jwt.sign({ userId: user.id }, `${process.env.SECRET_KEY}`, {
        expiresIn: '1h',
      })

      user.token = token

      return res.status(200).json({ id: user.id, token: user.token })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).send('Internal Server Error')
    }
  })

  return router
}

export default loginRouter

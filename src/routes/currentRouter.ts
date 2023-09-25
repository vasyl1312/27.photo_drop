import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
const router = express.Router()

interface DecodedToken {
  userId: number
  iat: number
  exp: number
}

const currentRouter = () => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '')

      if (!token) {
        return res.status(401).json({ error: 'Token is required' })
      }

      try {
        const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as DecodedToken
        const userId = decoded.userId

        return res.status(200).json({ id: userId })
      } catch (error) {
        return res.status(403).json({ message: 'Not authorized' })
      }
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).send('Internal Server Error')
    }
  })

  return router
}

export default currentRouter

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { sql } from 'drizzle-orm'
import { albums, TNewAlbums } from '../db/schema/albums'
import { photographersSchema } from '../db/schema/photographer'
import connect from '../db/dbConnect'

interface DecodedToken {
  userId: number
  iat: number
  exp: number
}

const createAlbumController = async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Token is required' })
    }
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as DecodedToken
    const userId = decoded.userId

    const db = await connect()
    const user = await db
      .select()
      .from(photographersSchema)
      .where(sql`${photographersSchema.id} = ${userId}`)
      .execute()

    if (!user || user.length === 0) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    const { albumName, location, date } = req.body
    const newAlbum: TNewAlbums = {
      owner: userId,
      name: albumName,
      location: location,
      createdAt: date,
    }
    const insertResult = await db.insert(albums).values(newAlbum).returning().execute()

    if (insertResult.length > 0) {
      const albumId = insertResult[0].id
      return res.status(201).json({ ...newAlbum, id: albumId })
    } else {
      return res.status(500).json({ error: 'Failed to retrieve the album ID' })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default createAlbumController

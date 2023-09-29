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

const listAlbumsController = async (req: Request, res: Response) => {
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

    const allAlbums = await db.select().from(albums).execute()

    const albumsPerPage = 20
    const maxPage = Math.ceil(allAlbums.length / albumsPerPage)

    const page = parseInt(req.query.page as string) || 1
    const startIdx = (page - 1) * albumsPerPage
    const endIdx = startIdx + albumsPerPage
    const pagedAlbums = allAlbums.slice(startIdx, endIdx)

    const response = {
      maxPage,
      albums: pagedAlbums,
    }

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default listAlbumsController

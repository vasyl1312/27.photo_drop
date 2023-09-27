import connect from '../db/dbConnect'
import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
import { sql } from 'drizzle-orm'
import { albums, TNewAlbums } from '../db/schema/albums'
import { photographersSchema } from '../db/schema/photographer'
import { uploadFile, getFileStream } from '../AWS/s3'
import multer from 'multer'

const router = express.Router()

interface DecodedToken {
  userId: number
  iat: number
  exp: number
}

const upload = multer({ dest: 'uploads/' })

const albumsRouter = () => {
  router.post('/', async (req: Request, res: Response) => {
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
  })

  router.get('/', async (req: Request, res: Response) => {
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
  })

  router.post('/:id/photos', upload.single('image'), async (req: Request, res: Response) => {
    try {
      const albumId = req.params.id
      const file = req.file
      console.log(file)

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const result = await uploadFile(file)
      console.log(result)

      return res.status(200).json({ albumId })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).send('Internal Server Error')
    }
  })

  router.get('/:id/photos/:key', (req, res) => {
    //http://localhost:5000/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2
    console.log(req.params)
    const albumId = req.params.id
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
  })

  return router
}

export default albumsRouter

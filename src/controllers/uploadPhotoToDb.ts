import jwt from 'jsonwebtoken'
import { sql } from 'drizzle-orm'
import { Request, Response } from 'express'
import { albums } from '../db/schema/albums'
import { generatePresignedUrl } from '../AWS/helper'
import { photoSchema, TNewPhotos } from '../db/schema/photoSchema'

import connect from '../db/dbConnect'

interface DecodedToken {
  userId: number
  iat: number
  exp: number
}

const uploadPhotoToDb = async (req: Request, res: Response) => {
  try {
    const albumId = req.params.id
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Token is required' })
    }

    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as DecodedToken
    const db = await connect()
    const existingAlbum = await db
      .select()
      .from(albums)
      .where(sql`${albums.id} = ${albumId}`)
      .execute()

    if (!existingAlbum) {
      return res.status(403).json({ error: 'Not found an album' })
    }
    const { files } = req.body

    const newPhotos: TNewPhotos[] = files.map((file: any) => ({
      albumId,
      name: file.fileName,
      people: file.phoneNumbers.map((phoneNumber: string) => phoneNumber),
    }))

    const insertResult = await db.insert(photoSchema).values(newPhotos).returning().execute()

    if (insertResult.length > 0) {
      const photoIds = insertResult.map((result) => result.id)
      const currentCounter = existingAlbum[0].counterPhoto

      const newCounter = currentCounter + 1

      await db
        .update(albums)
        .set({ counterPhoto: newCounter })
        .where(sql`${albums.id} = ${albumId}`)
        .execute()

      const photoUrls = await Promise.all(
        newPhotos.map(async (photo, index) => {
          try {
            if (photo && photo.name) {
              const photoId = photoIds[index]
              let photoName = `${albumId}_${photoId}`

              if (insertResult[index]?.name !== null) {
                const fileNameParts = insertResult[index].name?.split('.')
                const fileExtension = fileNameParts?.pop()
                if (fileExtension) {
                  photoName += `.${fileExtension}`
                }
              }

              const url = await generatePresignedUrl(photoName)
              const nameFile = files[index].fileName
              return { nameFile, url }
            } else {
              throw new Error('Photo`s name not found')
            }
          } catch (error) {
            return { name: photo.name || '', error: 'Error generating photo' }
          }
        })
      )

      return res.status(201).json({ photos: photoUrls })
    } else {
      return res.status(500).json({ error: 'Failed to retrieve the photo ID' })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default uploadPhotoToDb

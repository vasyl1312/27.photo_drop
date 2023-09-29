// import jwt from 'jsonwebtoken'
// import { sql } from 'drizzle-orm'
// import { Request, Response } from 'express'
// import { albums } from '../db/schema/albums'
// import { photoSchema, TNewPhotos } from '../db/schema/photoSchema'
// import connect from '../db/dbConnect'

// interface DecodedToken {
//   userId: number
//   iat: number
//   exp: number
// }

// const uploadPhotoToDb = async (req: Request, res: Response) => {
//   try {
//     const albumId = req.params.id
//     const token = req.header('Authorization')?.replace('Bearer ', '')
//     if (!token) {
//       return res.status(401).json({ error: 'Token is required' })
//     }

//     const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as DecodedToken
//     const db = await connect()
//     const existingAlbum = await db
//       .select()
//       .from(albums)
//       .where(sql`${albums.id} = ${albumId}`)
//       .execute()

//     if (!existingAlbum) {
//       return res.status(403).json({ error: 'Not found an album' })
//     }
//     const { files } = req.body

//     const newPhotos: TNewPhotos[] = files.map((file: any) => ({
//       albumId,
//       name: file.fileName,
//       people: file.phoneNumbers.map((phoneNumber: string) => phoneNumber),
//     }))

//     const insertResult = await db.insert(photoSchema).values(newPhotos).returning().execute()

//     if (insertResult.length > 0) {
//       const photoId = insertResult[0].id
//       const currentCounter = existingAlbum[0].counterPhoto

//       const newCounter = currentCounter + 1

//       await db
//         .update(albums)
//         .set({ counterPhoto: newCounter })
//         .where(sql`${albums.id} = ${albumId}`)
//         .execute()

//       return res.status(201).json({ ...newPhotos, id: photoId })
//     } else {
//       return res.status(500).json({ error: 'Failed to retrieve the photo ID' })
//     }
//   } catch (error) {
//     console.error('Error:', error)
//     return res.status(500).send('Internal Server Error')
//   }
// }

// export default uploadPhotoToDb
import jwt from 'jsonwebtoken'
import { sql } from 'drizzle-orm'
import { Request, Response } from 'express'
import { albums } from '../db/schema/albums'
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
      const photoId = insertResult[0].id
      const currentCounter = existingAlbum[0].counterPhoto

      const newCounter = currentCounter + 1

      await db
        .update(albums)
        .set({ counterPhoto: newCounter })
        .where(sql`${albums.id} = ${albumId}`)
        .execute()

      return res.status(201).json({ ...newPhotos, id: photoId })
    } else {
      return res.status(500).json({ error: 'Failed to retrieve the photo ID' })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default uploadPhotoToDb

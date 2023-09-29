import { Request, Response } from 'express'
import { getFileStream } from '../AWS/s3'

const getPhotoController = (req: Request, res: Response) => {
  try {
    const albumId = req.params.id
    const key = req.params.key

    const readStream = getFileStream(key)

    return readStream.pipe(res)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default getPhotoController

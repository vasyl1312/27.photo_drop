import { Request, Response } from 'express'
import multer from 'multer'
import { uploadFile } from '../AWS/s3'

const upload = multer({ dest: 'uploads/' })

const uploadPhotoToS3 = async (req: Request, res: Response) => {
  try {
    const albumId = req.params.id
    const file = req.file

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
}

export default uploadPhotoToS3

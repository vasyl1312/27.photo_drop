import { Request, Response } from 'express'
// import { S3Client } from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
// import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

// const s3Client = new S3Client({ region: 'eu-central-1' })
// const bucket = 'photo-drop-3-updated'

// async function getSignedDownloadUrl(path: any) {
//   let command = new GetObjectCommand({ Bucket: bucket, Key: path })
//   return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
// }

// async function getSignedUploadUrl(path: any) {
//   let command = new PutObjectCommand({ Bucket: bucket, Key: path })
//   return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
// }

// const uploadPhotoToDb_2 = async (req: Request, res: Response) => {
//   try {
//     let inputURL = await getSignedDownloadUrl('original/photos/22_118.png')
//     let uploadURL = await getSignedUploadUrl('original/photos/22_118.png')

//     return { inputURL, uploadURL }
//   } catch (error) {
//     console.error('Error:', error)
//     return res.status(500).send('Internal Server Error')
//   }
// }

const uploadPhotoToDb_2 = (req: Request, res: Response) => {
  try {
    console.log('imageUrl')
    let imageUrl = 'ssss'
    // const imageUrl = await getSignedUrl(
    //   s3Client,
    //   new GetObjectCommand({
    //     Bucket: bucketName,
    //     Key: 'original/photos/22_118.png',
    //   }),
    //   { expiresIn: 60 } // 60 seconds
    // )
    // console.log(imageUrl)
    return imageUrl
    // res.send(imageUrl)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default uploadPhotoToDb_2

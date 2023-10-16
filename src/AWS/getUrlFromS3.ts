import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'

const bucket = process.env.AWS_BUCKET_NAME_STORAGE

const s3ClientConfig: S3ClientConfig = {
  region: `${process.env.AWS_BUCKET_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY1}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY1}`,
  },
}

const s3Client = new S3Client(s3ClientConfig)

async function getSignedDownloadUrl(path: any) {
  let command = new GetObjectCommand({ Bucket: bucket, Key: path })
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

const uploadPhotoToDb_2 = async (photoName: string) => {
  try {
    const photoUrlOrig = await getSignedDownloadUrl(`original/${photoName}`)
    const photoUrlTrum = await getSignedDownloadUrl(`thumbnails/${photoName}`)
    const photoUrlOrigWater = await getSignedDownloadUrl(`watermarked_original/${photoName}`)
    const photoUrlTrumWater = await getSignedDownloadUrl(`watermarked_thumbnails/${photoName}`)

    return { photoUrlOrig, photoUrlTrum, photoUrlOrigWater, photoUrlTrumWater }
  } catch (error) {
    console.error('Error:', error)
    return error
  }
}

export default uploadPhotoToDb_2

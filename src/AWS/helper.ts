import AWS from 'aws-sdk'
import * as dotenv from 'dotenv'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY1
const secretAccessKey = process.env.AWS_SECRET_KEY1

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
})

export const generatePresignedUrl = async (photoName: string) => {
  const folderName = 'photos/' // Задайте бажаний шлях до папки
  const key = folderName + photoName // Комбінуємо шлях до папки та ім'я файлу

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 3600,
  }

  try {
    const url = await s3.getSignedUrlPromise('getObject', params)
    return url
  } catch (error) {
    console.error('Помилка при генерації Pre-Signed URL:', error)
    throw error
  }
}

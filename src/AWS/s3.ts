import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { S3 } from 'aws-sdk'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY1
const secretAccessKey = process.env.AWS_SECRET_KEY1

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

// Uploads a file to S3
function uploadFile(file: Express.Multer.File) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams: S3.Types.PutObjectRequest = {
    Bucket: bucketName!,
    Body: fileStream,
    Key: file.filename,
  }

  return s3.upload(uploadParams).promise()
}

// Downloads a file from S3
function getFileStream(fileKey: string) {
  if (!bucketName) {
    throw new Error('Bucket name is not defined.')
  }

  const downloadParams: S3.Types.GetObjectRequest = {
    Key: fileKey,
    Bucket: bucketName,
  }

  return s3.getObject(downloadParams).createReadStream()
}

export { uploadFile, getFileStream }

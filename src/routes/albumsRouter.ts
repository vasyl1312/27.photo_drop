import multer from 'multer'
import express from 'express'
import uploadPhotoToDb from '../controllers/uploadPhotoToDb'
import getPhotoController from '../controllers/getPhotoController'
import listAlbumsController from '../controllers/listAlbumsController'
import createAlbumController from '../controllers/createAlbumController'
// import uploadPhotoToS3 from '../controllers/uploadPhotoToS3'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', listAlbumsController)
router.post('/', createAlbumController)
router.get('/:id/photos/:key', getPhotoController) //http://localhost:5000/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2 temporal
router.post('/:id/photos', uploadPhotoToDb)
//post('/:id/photos', upload.single('image'), uploadPhotoToS3)//upload photo to s3

export default router

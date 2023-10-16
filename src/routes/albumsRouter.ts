import express from 'express'
import uploadPhotoToDb from '../controllers/uploadPhotoToDb'
import getPhotoController from '../controllers/getPhotoController'
import listAlbumsController from '../controllers/listAlbumsController'
import createAlbumController from '../controllers/createAlbumController'
import uploadPhotoToDb_2 from '../AWS/getUrlFromS3'

const router = express.Router()

router.get('/', listAlbumsController)
router.post('/', createAlbumController)
router.get('/:id/photos/:key', getPhotoController)
router.post('/:id/photos', uploadPhotoToDb)
router.get('/test', uploadPhotoToDb_2)

export default router

import multer from 'multer'
import express from 'express'
import uploadPhotoToDb from '../controllers/uploadPhotoToDb'
import getPhotoController from '../controllers/getPhotoController'
import listAlbumsController from '../controllers/listAlbumsController'
import createAlbumController from '../controllers/createAlbumController'
import uploadPhotoToDb_2 from '../AWS/getUrlFromS3'
// import uploadPhotoToS3 from '../controllers/uploadPhotoToS3'
const router = express.Router()

router.get('/', listAlbumsController)
router.post('/', createAlbumController)
router.get('/:id/photos/:key', getPhotoController) //http://localhost:5000/albums/7/photos/01a3597bc0eedbd0ac15da64a928a0d2 temporal
router.post('/:id/photos', uploadPhotoToDb)
// router.get('/:id/test', uploadPhotoToDb_2)
router.get('/i', (req, res) => {
  res.send('hello!')
})

export default router

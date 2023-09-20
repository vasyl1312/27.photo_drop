import express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
const router = express.Router()

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css' //styles for swagger

router.use('*.css', (req, res, next) => {
  res.set('Content-Type', 'text/css')
  next()
})

router.get('/', swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }))
router.use('/', swaggerUi.serve)

export const swaggerRouter = router

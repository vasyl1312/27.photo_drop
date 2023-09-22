import express from 'express'
<<<<<<< HEAD
import * as swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const router = express.Router()

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocs))
=======
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
const router = express.Router()

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css' //styles for swagger

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
  },
  apis: ['src/routes/*.ts'],
}

const specs = swaggerJsDoc(options)
router.use('/', swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }))
>>>>>>> 65a3447a17d3dd4a30e16d5e7f3b7915c73dd50f

export const swaggerRouter = router

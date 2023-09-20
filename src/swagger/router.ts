import express from 'express'
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

export const swaggerRouter = router

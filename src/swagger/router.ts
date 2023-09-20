import express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
const router = express.Router()

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css' //styles for swagger

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }))

export const swaggerRouter = router

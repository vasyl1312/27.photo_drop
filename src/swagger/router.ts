import express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const router = express.Router()

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocs))

export const swaggerRouter = router

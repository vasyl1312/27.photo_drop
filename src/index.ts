import cors from 'cors'
import express from 'express'
import loginRouter from './routes/loginRouter'
import albumsRouter from './routes/albumsRouter'
import currentRouter from './routes/currentRouter'
import { swaggerRouter } from './swagger/router'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5001
app.use('/login', loginRouter())
app.use('/albums', albumsRouter())
app.use('/current', currentRouter())
app.use('/api_docs', swaggerRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import benefitsRoutes from '../../src/routes/benefits.routes'
import { errorHandler } from '../../src/middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'https://www.konsi.com.br' }))

app.use('/benefits', benefitsRoutes)

app.use(errorHandler)

export default app

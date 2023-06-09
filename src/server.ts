import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'
import benefitsRoutes from './routes/benefits.routes'
import swaggerUi from 'swagger-ui-express'
import { spec } from './swagger'

export const app = express()

app.use(express.json())
app.use(cors({ origin: 'https://www.konsi.com.br' }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))

app.use('/benefits', benefitsRoutes)

app.use(errorHandler)
app.listen(3000, async () => {
  console.log(`rodando na porta ${process.env.PORT || 3000}`)
})

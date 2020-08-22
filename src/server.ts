import express, { Request, Response, } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

// TODO - DEPLOY
// TODO - MAILER
const app = express()

// CONFIGS
app.use(express.json())
dotenv.config()
mongoose.connect(String(process.env.MONGO_URI))

// ROTAS
// import docsRoute from './routes/doc';
import authRoute from './routes/auth';
import itemsRoute from './routes/items';
// import userRoute from './routes/user';

// NAMESPACES
// app.use('/docs', docsRoute)
app.use('/auth', authRoute)
// app.use('/user', userRoute)
app.use('/items', itemsRoute)

app.get('/', (request: Request, response: Response) => {
    return response.json({ Olar: "Estou vivo" })
})


app.listen(process.env.PORT || 3333)
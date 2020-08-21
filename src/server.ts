import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

// TODO - DEPLOY
// TODO - MAILER

// ROTAS
import docsRoute from './routes/doc';
import authRoute from './routes/auth';
import itemsRoute from './routes/items';
import userRoute from './routes/user';

const app = express()

// CONFIGS
app.use(express.json())
dotenv.config()
mongoose.connect(String(process.env.MONGO_URI))

// NAMESPACES
app.use('/docs', docsRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/items', itemsRoute)

app.get('/', (request, response) => {
    return response.json({ Olar: "Estou vivo" })
})


app.listen(process.env.PORT || 3333)
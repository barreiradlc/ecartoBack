import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

const app = express()

// CONFIGS
app.use(express.json())
dotenv.config()
mongoose.connect(String(process.env.MONGO_URI), { useNewUrlParser: true, useUnifiedTopology: true })

// ROTAS
// import docsRoute from './routes/doc';
import authRoute from './routes/auth';
import itemsRoute from './routes/items';
import userRoute from './routes/user';

// NAMESPACES
// app.use('/docs', docsRoute)
app.use('/auth/v2', authRoute)
app.use('/items', itemsRoute)
app.use('/user', userRoute)

app.get('/', (request: express.Request, response: express.Response) => {
    console.log(request.headers)
    return response.json({ Olar: "Estou vivo" })
})

app.listen(process.env.PORT || 3333)
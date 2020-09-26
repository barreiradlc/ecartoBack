import { Router, Response, Request } from 'express'
import fs from 'fs'

import User from "../controllers/User";
import { validToken } from '../middlewares/Auth'
const cgConfig = require('../utils/gcConfig')

const userController = new User()
const router = Router()

// TODO - DOC
// TODO - MODELS
// TODO - SERVICES
// TODO - TESTS

router.get('/doc', (request: Request, response: Response) => {
    fs.readFile('./src/docs/apiDocUser.json', (err: any, data: any) => {
        if(err){
            return response.status(400).json({
                erro: err
            })
        }
        response.json(JSON.parse(data))
    })
})

// ROTAS NÃO AUTENTICADAS
router.post('/', userController.newPassword )

router.use(validToken)

router.get('/', userController.profile )
router.put('/', cgConfig.single(`file`), userController.editProfile )
router.post('/editPassword', userController.editPassword )

export default router
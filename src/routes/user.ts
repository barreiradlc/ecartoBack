import { Router } from 'express'
console.log('1')

import User from "../controllers/User";
console.log('2')

import { validToken } from '../middlewares/Auth'
console.log('3')
const cgConfig = require('../utils/gcConfig')

console.log('4')
const userController = new User()

console.log('5')
const router = Router()

console.log('6')

// TODO - DOC
// TODO - CONTROLER (1)         
// TODO - MODELS
// TODO - SERVICES
// TODO - TESTS

// router.get('/', (response, request) => {
//     request.json({
//         "Aviso": "Rota de ções de usuário"
//     })
// })

router.use(validToken)

router.get('/', userController.profile )
router.put('/', cgConfig.single(`file`), userController.editProfile )
// router.patch('/' /* ação de edição de senha */ )

export default router
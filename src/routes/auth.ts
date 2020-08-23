import { Router } from 'express';
import Auth from "../controllers/Auth";

const authController = new Auth()

const router = Router()

// TODO - DOC
// TODO - CONTROLER (3)
// TODO - MODELS
// TODO - SERVICES
// TODO - TESTS

// router.get('/', (request: Request, response: Response) => {
//     return response.json({
//         "Aviso": "Rota  de autenticação"
//     })
// })

router.post('/login', authController.login)
router.post('/register', authController.register )
// router.post('/recoverPassword' /* ação de recuperação de senha */ )
// router.post('/changePassword' /* ação de recuperação de senha */ )
// router.post('/logout' /* ação de saída */ )


export default router
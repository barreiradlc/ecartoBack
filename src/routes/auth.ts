import { Router } from 'express';
import Auth from "../controllers/Auth";

const authController = new Auth()
const router = Router()

// TODO - DOC
// TODO - SERVICES
// TODO - TESTS

// router.get('/', (request: Request, response: Response) => {
//     return response.json({
//         "Aviso": "Rota  de autenticação"
//     })
// })

router.post('/login', authController.login)
router.post('/register', authController.register )

export default router
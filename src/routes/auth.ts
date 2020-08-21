import { Router } from 'express'

const router = Router()

// TODO - DOC
// TODO - CONTROLER (4)
// TODO - MODELS
// TODO - SERVICES
// TODO - TESTS

router.get('/', (response, request) => {
    request.json({
        "Aviso": "Rota  de autenticação"
    })
})

router.post('/login' /* ação de login */ )
router.post('/register' /* ação de cadastro */ )
router.post('/recoverPassword' /* ação de recuperação de senha */ )
router.post('/logout' /* ação de saída */ )


export default router
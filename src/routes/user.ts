import { Router } from 'express'

const router = Router()

// TODO - DOC
// TODO - CONTROLER (3)
// TODO - MODELS
// TODO - SERVICES
// TODO - TESTS

router.get('/', (response, request) => {
    request.json({
        "Aviso": "Rota de ções de usuário"
    })
})

router.get('/' /* ação de visualização de perfil */ )
router.put('/' /* ação de edição de perfil */ )
router.patch('/' /* ação de edição de senha */ )

export default router
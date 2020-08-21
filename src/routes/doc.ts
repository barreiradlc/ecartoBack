import { Router } from 'express'

const router = Router()

// TODO - DOC
// TODO - CONTROLER (2)

router.get('/', (response, request) => {
    request.json({
        "Aviso": "Rota de documentação"
    })
})

router.get('/auth' /* doc de autenticação */ )
router.get('/user' /* doc de ações de usuário */ )
router.get('/items' /* doc de itens */ )


export default router
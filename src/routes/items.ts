import { Router } from 'express'

const router = Router()

// TODO - DOC
// TODO - CONTROLER (5)
// TODO - MODELS 
// TODO - SERVICES
// TODO - TESTS

router.get('/', (response, request) => {
    request.json({
        "Aviso": "Rota de items"
    })
})

router.get('/list' /* ação de listagem baseado em distancia*/ )
router.get('/:id' /* ação de detalhes */ )
router.post('/' /* ação de criação */ )
router.put('/:id' /* ação de edição */ )
router.delete('/:id' /* ação de deleção */ )

export default router
import { Request, Response, Router } from 'express'
import { validToken } from '../middlewares/Auth'
import Item from '../controllers/Item'
const router = Router()

const itemController = new Item()

// TODO - DOC
// TODO - SERVICES
// TODO - TESTS

// router.get('/', (request: Request, response: Response) => {
//     return response.json({
//         "Aviso": "Rota de items"        
//     })
// })

router.use(validToken)

router.post('/', itemController.create )
router.get('/list', itemController.list )

router.get('/:id', itemController.show )
router.put('/:id', itemController.update )
router.delete('/:id', itemController.delete )

export default router
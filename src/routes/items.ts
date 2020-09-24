import { Router } from 'express'
import Item from '../controllers/Item'
import { validToken } from '../middlewares/Auth'
const router = Router()

const itemController = new Item()

// TODO - DOC
// TODO - SERVICES
// TODO - TESTS

router.use(validToken);

router.post('/', itemController.create)
router.get('/list', itemController.list)

router.get('/:id', itemController.show)
router.put('/:id', itemController.update)
router.delete('/:id', itemController.delete)

export default router
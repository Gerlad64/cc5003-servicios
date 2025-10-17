
import express from 'express'
/* controllers */
import service from '../controllers/service'

const router = express.Router();

router.get('/', service.getAll);
router.get('/:id', service.getById);

export default router;
import express from 'express'
import users from '../controllers/user'

const router = express.Router();

router.get('/', users.getAll);
router.post('/', users.createOne);

export default router;
import express from 'express'
import users from '../controllers/user'
import uploadMiddleware from '../middlewares/uploadMiddleware'

const router = express.Router();

router.get('/', users.getAll);
router.get('/:id', users.getById);
router.post('/', users.createOne);
router.put('/:id', users.updateInfo);
router.put('/:id/profile', uploadMiddleware.single('profile'),users.updateProfilePic);

export default router;
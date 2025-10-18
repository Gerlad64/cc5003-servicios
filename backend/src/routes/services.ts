
import express from 'express'
/* controllers */
import services from '../controllers/service'
import {authenticate} from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/', services.getAll);
router.get('/:id', services.getById);

router.post('/', authenticate, services.createOne);

export default router;
import express from 'express'
import testing from '../controllers/testing'

const router = express.Router();

router.post("/", testing.reset);

export default router;
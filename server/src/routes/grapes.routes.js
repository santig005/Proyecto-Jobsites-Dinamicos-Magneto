import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();

router.get('/grapes', authRequired, (req, res) => {
    res.send('Hello World')
})

export default router
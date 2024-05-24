import {Router} from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { saveHtmlAndCss,getPageRequests } from '../controllers/file.controller.js';
import {authRequired} from '../middlewares/validateToken.js'
const router = Router();

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile', authRequired, profile)
router.post('/save', saveHtmlAndCss );
router.get('/admin',getPageRequests);


export default router
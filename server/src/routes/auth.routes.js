import {Router} from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { saveHtmlAndCss,getPageRequests,getCodePage,approvePage,rejectPage, savePage, loadPage } from '../controllers/file.controller.js';
import {authRequired} from '../middlewares/validateToken.js'
const router = Router();

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile', authRequired, profile)
router.post('/save', saveHtmlAndCss );
router.get('/admin',getPageRequests);
router.post('/getcode',getCodePage)
router.post('/approvepage',approvePage)
router.post('/rejectpage',rejectPage)

router.post('/save-page', savePage)
router.get('/load-page',loadPage)


export default router
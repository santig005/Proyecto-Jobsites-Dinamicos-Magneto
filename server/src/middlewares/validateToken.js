import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET
export const authRequired = (req, res, next) => {
    const {token} = req.cookies
    if (!token) return res.sendStatus(401).json({message: 'Unauthorized'})
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json({message: 'Invalid token'})
        
        req.user = user
    
        next()
    })

}
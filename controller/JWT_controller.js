import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

//this function is middleware
export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // console.log("token is null")
        return response.status(401).json({ msg: 'token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            // console.log("token is invalid")
            return response.status(403).json({ msg: 'invalid token' })
        }

        request.user = user;
        next();
    })
}


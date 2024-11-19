import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

//this function is middleware
// export const authenticateToken = (request, response, next) => {
//     const authHeader = request.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) {
//         // console.log("token is null")
//         return response.status(401).json({ msg: 'token is missing' });
//     }

//     jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
//         if (error) {
//             // console.log("token is invalid")
//             return response.status(403).json({ msg: 'invalid token' })
//         }

//         request.user = user;
//         next();
//     })
// }

export const authenticateToken = (request, response, next) => {
    // Retrieve the authorization header
    const authHeader = request.headers['authorization'];

    // Ensure the authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization header is missing or improperly formatted.');
        return response.status(400).json({ msg: 'Authorization header must be in the format: Bearer <token>' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    if (!token) {
        console.error('Token is missing from the authorization header.');
        return response.status(401).json({ msg: 'Authorization token is missing.' });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            console.error('Invalid or expired token:', error.message);
            return response.status(403).json({ msg: 'Authorization token is invalid or expired.' });
        }

        console.log('Token is valid. User:', user);

        // Attach user data to the request object for use in the next middleware/route
        request.user = user;
        next();
    });
};


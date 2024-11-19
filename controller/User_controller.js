import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Token from '../modal/token.js'
import User from '../modal/User.js'

dotenv.config()

//Signup API
// export const signup = async (request, response) => {
//     try {

//         //password convert in hashed format
//         const hasedPassword = await bcrypt.hash(request.body.password, 10);

//         //request data from frontend
//         const user = {
//             name: request.body.name,
//             username: request.body.username,
//             password: hasedPassword
//         }

//         //creating user and save the save in db
//         const newUser = new User(user);
//         await newUser.save();

//         return response.status(200).json({ msg: "Signup Successfully!!!", userId: newUser._id });
//         // return response.status(200).json({ msg: "Signup Successfully!!!" })

//     } catch (error) {
//         console.error("Error during signup:", error);
//         return response.status(500).json({ msg: "Error in Signup!!!" })
//     }
// }

export const signup = async (request, response) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username: request.body.username });

        if (existingUser) {
            return response.status(400).json({ msg: 'Username already taken, please choose a different one.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        // Create the user object
        const user = {
            name: request.body.name,
            username: request.body.username,
            password: hashedPassword
        };

        // Create new user and save to the database
        const newUser = new User(user);
        await newUser.save();

        // Return response with user data (excluding password)
        return response.status(200).json({
            msg: 'Signup Successfully!!!',
            userId: newUser._id,
            username: newUser.username
        });

    } catch (error) {
        console.error("Error during signup:", error);
        return response.status(500).json({ msg: 'Error during signup. Please try again later.' });
    }
};

export const loginUser = async (request, response) => {

    let user = await User.findOne({ username: request.body.username });
    console.log(user)

    if (!user) {
        return response.status(400).json({ msg: "Username does not match...!!!" })
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        console.log("password matched", match)

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken })
            await newToken.save();

            sessionStorage.setItem('accessToken', accessToken);
            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })

        } else {
            return response.status(400).json({ msg: "Password Does Not Match...!!!" })
        }

    } catch (error) {
        return response.status(500).json({ msg: "Error While Login User...!!!" })

    }
}


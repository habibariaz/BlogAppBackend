import mongoose from "mongoose"

const Connection = async (username, password) => {

    const URL = `mongodb+srv://${username}:${password}@blogapp.bqsqi.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`

    try {
        await mongoose.connect(URL)
        console.log("DB Connected Successfully!!!")
    } catch (error) {
        console.log("Error in connecting DB!!!!", error)
    }
}

export default Connection;
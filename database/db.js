import mongoose from "mongoose"

const Connection = async (URL) => {
// const URL = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@blogapp.bqsqi.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`
    // const URL = `mongodb+srv://${username}:${password}@blogapp.bqsqi.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`

    try {
        // await mongoose.connect(URL)
        await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
        console.log("DB Connected Successfully!!!")
    } catch (error) {
        console.log("Error in connecting DB!!!!", error)
    }
}

export default Connection;

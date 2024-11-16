import mongoose from "mongoose"

const Connection = async (URL) => {


    try {
        await mongoose.connect(URL)
        console.log("DB Connected Successfully!!!")
    } catch (error) {
        console.log("Error in connecting DB!!!!", error)
    }
}

export default Connection;
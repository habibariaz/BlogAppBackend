import mongoose from 'mongoose';

//Table for signup user values
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//mongoose.model() is a Mongoose function that defines and compiles a model based on a given schema.
const user = mongoose.model('user', userSchema);

export default user;
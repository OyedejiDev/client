import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://lh3.googleusercontent.com/a/ACg8ocKFETinkCBES-q1hi4Bf6e70jW-jw0MG4UhznRdr43NxNkKr0Dv=s96-c",
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
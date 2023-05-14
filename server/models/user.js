import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 25,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 25,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 25,
        },
        password: {
            type: String,
            required: true,
            unique: true,
            min: 5,
        },
        picturepath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        veiwedprofile: Number,
        impressions: Number,
    },
    {timestamps: true}
);

const user = mongoose.model("User", UserSchema);
export default user;
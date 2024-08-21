import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    name:{ type: String, required: true},
    // password: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    solvedWords: { type:Number, default:0 },
    lastAttempt: { type: Date, default: null },
    streak : { type: Number, required: true}
},{timestamps: true});

export default mongoose.model("User", userSchema);
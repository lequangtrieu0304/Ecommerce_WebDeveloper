import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
    phone: { type: String, require: true },
    birthday: { type: String, require:true },
    image: { type: String, require: true },
    address: { type: String, require: true },
    sex: { type: String, require: true }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

export default User;
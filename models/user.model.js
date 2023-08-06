import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: "email cannot be empty",
        unique: true
    },
    password: {
        type: String,
        required: "password cannot be empty",
    }
})
userSchema.pre('save', function (next) {
    if (this.isModified("password") || this.isNew) {
        bcrypt.hash(this.password, 10, (hashError, hash) => {
            if (hashError) return next(hashError)

            this.password = hash
            next()
        })
    } else {
        return next()
    }
});

userSchema.methods.comparePassword = async (password) => {
    if (!password) throw new Error("password is required");
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        return err;
    }
}

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
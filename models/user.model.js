import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: "email cannot be empty"
    },
    password: {
        type: String,
        required: "password cannot be empty",
    }
})
userSchema.pre('save', (next) => {
    if (this.isMOdified("password")) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    }
});
userSchema.methods.comparePassword = async (password) => {
    if (!password) return new Error("password is required");
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        return err;
    }
}

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
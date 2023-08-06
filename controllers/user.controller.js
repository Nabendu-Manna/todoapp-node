import UserModel from "../models/user.model.js";

class UserController {
    static userList = async (req, res) => {
        try {
            const users = await UserModel.find({}, { projection: { _id: true, email: true } })
            res.send({
                user_list: users
            });
        } catch (err) {
            res.status(400).send({ error: err })
        }
    }

    static user = async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id)
            res.send({ user: user })
        } catch (err) {
            res.status(404).send({ error: err })
        }
    }

    static createUser = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = new UserModel({
                email: email,
                password: password,
            })
            const result = await user.save()
            res.status(201).send(result)
        } catch (err) {
            res.status(400).send({ error: err })
        }
    }

    static updateUser = async (req, res) => {
        try {
            const result = await UserModel.findByIdAndUpdate(req.params.id, req.body)
            res.status(202).send(result)
        } catch (err) {
            res.status(404).send({ error: err })
        }
    }

    static deleteUser= async (req, res) => {
        try {
            const result = await UserModel.findByIdAndDelete(req.params.id)
            res.status(204).send(result)
        } catch (err) {
            res.status(404).send({ error: err })
        }
    }

}

export default UserController;
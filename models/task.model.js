import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title cannot be blank"
    },
    details: {
        type: String,
        required: "Details cannot be blank"
    },
    status: {
        type: String,
        default: "pending",
        required: "Status cannot be blank"
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: 'Must have created at date - default value is the created date'
    }
});

const TaskModel = mongoose.model("task", tasksSchema);

export default TaskModel;
const asycHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const mongoose = require("mongoose");

const getTasks = asycHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
});

const setTask = asycHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please enter a text");
    }
    const task = await Task.create({ text: req.body.text, user: req.user.id });
    res.status(200).json(task);
});

const updateTask = asycHandler(async (req, res) => {
    const id = req.params.id;
    let task = mongoose.Types.ObjectId.isValid(id) && await Task.findById(id);
    if (!task) {
        res.status(400);
        throw new Error("No such task");
    }
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("You are not authorized to update this task");
    }
    task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(task);
});

const deleteTask = asycHandler(async (req, res) => {
    const id = req.params.id;
    let task = mongoose.Types.ObjectId.isValid(id) && await Task.findById(id);
    if (!task) {
        res.status(400);
        throw new Error("No such task");
    }
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("You are not authorized to delete this task");
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ id });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
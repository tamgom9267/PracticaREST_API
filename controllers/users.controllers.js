import User from "../models/users.model.js";

export const getUsers = async (req, res) => {
    // Implementation for getting all users
    const users = await User.find();
    res.json(users);
};

export const getUser = async (req, res) => {
    // Implementation for getting a single user
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
};

export const createUser = async (req, res) => {
    // Implementation for creating a new user
    const { name, username, password } = req.body;
    const newUser = new User({ name, username, password });
    await newUser.save();
    res.status(201).json(newUser);
};

export const putUser = async (req, res) => {
    // Implementation for updating a user
    const { id } = req.params;
    const { name, username, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, username, password }, { new: true });
    res.json(user);
};

export const delUser = async (req, res) => {
    // Implementation for deleting a user
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};
import User from "../models/users.model.js";
import { getSalt, hashPassword } from "../utils/hash.js";

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
    const { name, username, password } = req.body;
    const salt = getSalt();
    const hashedPassword = hashPassword(password, salt);
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
};

export const putUser = async (req, res) => {
    const { id } = req.params;
    const { name, username, password } = req.body;
    const updatedData = {};

    if (name) updatedData.name = name;
    if (username) updatedData.username = username;
    if (password) {
        const salt = getSalt();
        updatedData.password = hashPassword(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(user);
};

export const delUser = async (req, res) => {
    // Implementation for deleting a user
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};
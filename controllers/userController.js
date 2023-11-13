import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";

import { registerSchema, loginSchema, updateSchema } from "../utils/schemaValidator.js";

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            first_name,
            last_name,
            email,
            phone,
            password: passwordHash
        }); 
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await User.findByPk(id);
        console.log(user)
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;
        const { id } = req.params;
    
        const { error } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
    
        let passwordHash;
        if (password) {
            const salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(password, salt);
        }
    
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        await user.update({
            first_name: first_name || user.first_name,
            last_name: last_name || user.last_name,
            email: email || user.email,
            phone: phone || user.phone,
            password: passwordHash || user.password
        }, { where: { id: id } });
    

        // Send socket.io event for push notification
        const io = req.app.get("io");

        io.emit('userUpdated', { id , message: 'User updated' });

        // just for testing
        io.emit('userUpdated', console.log("Notification: User updated"));
    
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
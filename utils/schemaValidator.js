import Joi from "joi";

export const registerSchema = Joi.object({
    first_name: Joi.string().min(3).max(60).required(),
    last_name: Joi.string().min(3).max(60),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(30).required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});

export const updateSchema = Joi.object({
    first_name: Joi.string().min(3).max(60),
    last_name: Joi.string().min(3).max(60),
    email: Joi.string().email(),
    phone: Joi.string().min(6).max(30),
    password: Joi.string().min(6).max(30)
});
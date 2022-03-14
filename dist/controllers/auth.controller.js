"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const validations_1 = require("../validations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { error } = (0, validations_1.signupValidation)(req.body);
    if (error)
        return res.status(400).json({ message: error.message });
    const emailExists = await user_model_1.default.findOne({ email: req.body.email.toString() });
    if (emailExists)
        return res.status(400).json({ message: "Email already exists" });
    try {
        const newUser = new user_model_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        newUser.password = await newUser.encryptPassword(newUser.password);
        const savedUser = await newUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env["TOKEN_SECRET"] || "uphold", {
            expiresIn: "10h",
        });
        delete savedUser.password;
        res.header("auth-token", token).json(savedUser);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { error } = (0, validations_1.signinValidation)(req.body);
    if (error)
        return res.status(400).json({ message: error.message });
    const user = await user_model_1.default.findOne({ email: req.body.email.toString() });
    if (!user)
        return res.status(400).json({ message: "Email or Password is wrong" });
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json({ message: "Invalid Password" });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env["TOKEN_SECRET"] || "uphold");
    res.header("auth-token", token).json({ token: token });
};
exports.signin = signin;
const profile = async (req, res) => {
    const user = await user_model_1.default.findById(req.params.id, { password: 0 });
    if (!user) {
        return res.status(404).json({ message: "No User found" });
    }
    res.json(user);
};
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map
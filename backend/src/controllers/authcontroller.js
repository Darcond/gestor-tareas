const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: "Usuario ya existe" });

        user = new User({ username, password });
        await user.save();

        const token = jwt.sign({ usuarioId: user._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ msg: "Credenciales incorrectas" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ msg: "Credenciales incorrectas" });

        const token = jwt.sign({ usuarioId: user._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

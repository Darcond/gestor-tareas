const Usuario = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) return res.status(400).json({ msg: "Usuario ya existe" });

    usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    const token = jwt.sign({ usuarioId: usuario._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ msg: "Credenciales incorrectas" });

    const isMatch = await usuario.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: "Credenciales incorrectas" });

    const token = jwt.sign({ usuarioId: usuario._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

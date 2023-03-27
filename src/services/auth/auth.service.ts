const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Função para gerar um token JWT
function generateToken(user) {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
}

// Controlador de registro de usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    // Cria um novo usuário
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Gera um token JWT para o usuário recém-criado
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

// Controlador de login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
    }

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
    }

    // Gera um token JWT para o usuário autenticado
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};


const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, isAdmin: user.isAdmin },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashed });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== config.adminEmail || password !== config.adminPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    let admin = await User.findOne({ where: { email, isAdmin: true } });
    if (!admin) {
      admin = await User.create({ fullName: 'Admin', email, password: await bcrypt.hash(password, 10), isAdmin: true });
    }
    const token = generateToken(admin);
    res.json({ user: admin, token });
  } catch (err) {
    res.status(500).json({ error: 'Admin login failed' });
  }
};

exports.logout = async (req, res) => {
  // JWT logout is handled client-side by deleting the token
  res.json({ message: 'Logged out' });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}; 
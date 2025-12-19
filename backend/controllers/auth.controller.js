import { allQuery, runQuery, getQuery } from '../db/init-db.js';
import { hashPassword, verifyPassword, validateEmail, validateInput } from '../utils/validation.js';
import { generateToken } from '../middlewares/auth.middleware.js';

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const errors = validateInput({ name, email, password }, ['name', 'email', 'password']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const existingUser = await getQuery('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await hashPassword(password);

    const result = await runQuery(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'student']
    );

    const newUser = await getQuery('SELECT id, name, email, role FROM users WHERE id = ?', [result.id]);
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const errors = validateInput({ email, password }, ['email', 'password']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    const user = await getQuery('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const user = await getQuery(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

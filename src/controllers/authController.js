const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Return the created user with status 201 (Created)
    res.status(201).json(user);
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Authenticate a user and return a JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      // If user not found, return 404 (Not Found)
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // If password is incorrect, return 401 (Unauthorized)
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Return the user and token
    res.json({ user, token });
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// Middleware function to authenticate the token
module.exports = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (!authHeader) {
    // If no token is provided, return 401 (Unauthorized)
    return res.status(401).send({ error: 'No token provided' });
  }

  // Split the authorization header into parts
  const parts = authHeader.split(' ');

  // Check if the authorization header is correctly formatted
  if (parts.length !== 2) {
    // If the token format is incorrect, return 401 (Unauthorized)
    return res.status(401).send({ error: 'Token error' });
  }

  // Destructure the parts into scheme and token
  const [scheme, token] = parts;

  // Check if the scheme is 'Bearer'
  if (!/^Bearer$/i.test(scheme)) {
    // If the scheme is not 'Bearer', return 401 (Unauthorized)
    return res.status(401).send({ error: 'Token malformatted' });
  }

  // Verify the token
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    // Check if there was an error verifying the token
    if (err) {
      // If the token is invalid, return 401 (Unauthorized)
      return res.status(401).send({ error: 'Token invalid' });
    }

    // Save the decoded user ID to the request object
    req.userId = decoded.id;
    
    // Call the next middleware function
    return next();
  });
};

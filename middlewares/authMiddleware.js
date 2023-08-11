// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
    console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }
  try {
    const decodedToken = jwt.verify(token, 'aW50dWl0', { algorithms: ['HS256'] });
    req.userId = decodedToken.userId; // Add userId to the request for further use
    next();
  } catch (error) {
    console.log('Invalid access token:', error.message);
    return res.status(401).json({ error: 'Invalid access token' });
  }
};

module.exports = authMiddleware;

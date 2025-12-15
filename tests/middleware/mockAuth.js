// Mock authentication middleware for Jest tests
const mockAuth = (mockUser) => (req, res, next) => {
  req.isAuthenticated = () => true;      // Always authenticated
  req.user = mockUser;                   // Inject the mock user
  next();
};

module.exports = mockAuth;

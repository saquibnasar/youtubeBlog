const { validateToken } = require("../services/authentication");

const checkForAuthCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      next();
    }
    try {
      const playload = validateToken(tokenCookieValue);
      req.user = playload;
    } catch (err) {}
    next();
  };
};

module.exports = {
  checkForAuthCookie,
};

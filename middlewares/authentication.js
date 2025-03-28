const { validateToken } = require("../services/authentication");

const checkForAuthCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const playload = validateToken(tokenCookieValue);
      req.user = playload;
    } catch (err) {}
    return next();
  };
};

module.exports = {
  checkForAuthCookie,
};

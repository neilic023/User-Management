const jwt = require('jsonwebtoken');

//middleware funkcija za zastitu endpointa i verifikaciju
module.exports = function (req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    res.status(200);
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

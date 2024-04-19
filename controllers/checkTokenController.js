const jwt = require('jsonwebtoken');

const checkToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "not token" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).send({ message: "have token", token: decode });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = checkToken;
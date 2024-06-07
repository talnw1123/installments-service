const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token : ", token);

    // If user don't have token => denied access
    if(!token) return res.sendStatus(401)

    const decode = jwt.verify(token, process.env.SECRET_KEY)
    
    res.status(200).send({token: decode})
    next();
}

module.exports = auth
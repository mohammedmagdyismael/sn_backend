const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req ,res, next)=>{

    //get token from header
    const token = req.header('x-auth-token')

    //check if no token
    if(!token){
        return res.status(401).json({msg:'No Token, auth denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('JWTsecret'))
        req.user = decoded.user
        next();
    }
    catch(error){
        res.status(401).json({msg:'Token denied'})
    }

}
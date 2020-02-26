const User = require('../../../models/User')
const JWT = require('jsonwebtoken')
const config = require('config')
const bcryptjs = require('bcryptjs')
const {validationResult } = require('express-validator');

exports.postAuth =  async (req,res)=>{  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {password,email} = req.body;

    try{
    //check user existance
    let user = await User.findOne({email:email})
     
     if (!user) {
        return res.status(400).json({
            error:[{msg:'User Not Found'}]
        })
    }
     
    const isMatch = bcryptjs.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            error:[{msg:'Invalid Cred.'}]
        })
    }
    
    //return JWT
    const payload = {
        user:{id:user.id}
    };
    

    JWT.sign(
        payload,
        config.get('JWTsecret'),
        {expiresIn:360000},
        (err,token)=>{
            console.log("payload")
            if(err) throw err;
            res.json({token});
        } 
        )
     }

 
    catch(e){
        console.error(e)
    }


    next()
}
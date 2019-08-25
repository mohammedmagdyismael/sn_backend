const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const JWT = require('jsonwebtoken')
const config = require('config')
const bcryptjs = require('bcryptjs')
const { check, validationResult } = require('express-validator');


//@route Get    /api/users
//@desc         Test Route
//@access       Public

router.get('/',auth, async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(error){
        console.error(error.messsage)
        res.status(500).send('Server Error')
    }
});

router.post('/',[ 
    check('password','8 alpha-numerical password is required').exists(),
    check('email','email is required').isEmail()
],async (req,res)=>{  
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
 
})

module.exports = router;
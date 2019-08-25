const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcryptjs = require('bcryptjs')
const JWT = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');



//@route Get    /api/users
//@desc         Test Route
//@access       Public

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('password','8 alpha-numerical password is required').isLength({min:8}),
    check('email','email is required').isEmail()
],async (req,res)=>{  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,password,email} = req.body;

    try{
    //check user existance
    let user = await User.findOne({email:email})
     
     if (user) {
        return res.status(400).json({
            error:[{msg:'User is already found'}]
        })
    }
    //get user gravatar
    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    

    user = new User ({
        name,
        email,
        avatar,
        password
    })

    //encrypt password
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)
    await user.save();
    
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
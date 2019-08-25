const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const postUser = require('./users_POST.controller')



//@route Get    /api/users
//@desc         Test Route
//@access       Public
router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('password','8 alpha-numerical password is required').isLength({min:8}),
    check('email','email is required').isEmail()
], (req,res,next)=>{postUser.postUser(req,res,next)})

module.exports = router;
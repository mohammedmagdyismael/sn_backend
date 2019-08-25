const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth') 
const { check } = require('express-validator');

const getAuth = require('./auth_GET.controller')
const postAuth = require('./auth_POST.controller')


//@route Get    /api/users
//@desc         Test Route
//@access       Public
router.get('/',auth, (req,res,next)=>getAuth.getAuth(req,res,next) );

router.post('/',[ 
    check('password','8 alpha-numerical password is required').exists(),
    check('email','email is required').isEmail()
], (req,res,next)=>postAuth.postAuth(req,res,next))

module.exports = router;
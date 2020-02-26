const express = require('express')
const router = express.Router()
const postPosts = require('./Posts_Controller/posts_POST.controller')
const auth = require('../../middleware/auth')
const {check} = require('express-validator/check')


//@route Get    /api/users
//@desc         Test Route
//@access       Public
router.get('/',[
    auth,
    [
       check('text', 'Text is Required').not().isEmpty()
    ]
] , (req,res,next) => postPosts.postPosts(req,res,next))

module.exports = router;
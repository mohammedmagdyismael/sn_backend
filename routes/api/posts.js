const express = require('express')
const router = express.Router()
const getPosts = require('./posts_GET.controller')


//@route Get    /api/users
//@desc         Test Route
//@access       Public
router.get('/', (req,res,next) => getPosts.getPosts(req,res,next))

module.exports = router;
const express = require('express')
const router = express.Router()


//@route Get    /api/users
//@desc         Test Route
//@access       Public

router.get('/',(req,res)=>{
    return res.send("post Uers")
})

module.exports = router;
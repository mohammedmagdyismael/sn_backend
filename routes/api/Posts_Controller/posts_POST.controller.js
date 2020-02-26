const {validationResult} = require('express-validator/check')

const Profile  = require('../../../models/Profile')
const Post  = require('../../../models/Post')
const User  = require('../../../models/User')

/* exports.postPosts = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{

        const user = await User.findById(req.user.id).select('-password')
        const post = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    })
    const post = await post.save()
}
catch(error){
    return res.status(500).send('Error')
}

    next()
} */
const User = require('../../models/User')

exports.getAuth = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(error){
        console.error(error.messsage)
        res.status(500).send('Server Error')
    }
    next()
}
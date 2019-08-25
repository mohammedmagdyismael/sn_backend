const Profile  = require('../../models/Profile')

exports.getProfile = async(req,res,next)=>{
    try{
      const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
  
      if(!profile){
        return res.status(400).json({error:[{msg:'No Profile for this user'}]})
      }
          
      res.json(profile);
    }
    catch(error){
      
    }

    next()
  }
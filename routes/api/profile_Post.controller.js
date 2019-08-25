const Profile  = require('../../models/Profile')
const {validationResult } = require('express-validator');

exports.postProfile = async (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({user:req.user.id})
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set : profileFields},
                {new :true}
            )
            return res.json(profile)
        }

        //create
        profile = new Profile(profileFields)
        await Profile.save()

    }
    catch(error){

    }

    next()
}
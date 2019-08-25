const Profile  = require('../../models/Profile')

exports.deleteEducation = async (req, res, next) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
  
      //Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
  
      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    next()
  }
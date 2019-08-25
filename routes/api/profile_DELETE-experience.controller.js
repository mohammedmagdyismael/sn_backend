const Profile  = require('../../models/Profile')

exports.deleteExperience = async (req, res, next) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
  
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
  
      profile.experience.splice(removeIndex, 1);
  
      await profile.save();
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    next()
  }
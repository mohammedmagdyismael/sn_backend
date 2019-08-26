const Profile  = require('../../../models/Profile')

exports.getAllProfiles = async (req, res, next) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    next()
  }
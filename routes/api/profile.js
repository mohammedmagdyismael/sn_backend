const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile  = require('../../models/Profile')
const { check, validationResult } = require('express-validator');

const getProfile_me = require('./profile_GET-me.controller')
const getProfile_all = require('./profile_GET-allprofiles.controller')
const getProfile_user = require('./profile_GET-user.controller')
const postProfile = require('./profile_Post.controller')
const postProfile_experience = require('./profile_PUT-experience.controller')
const deleteProfile = require('./profile_DELETE.controller')

//@route Get    /api/profile/me
//@desc         Test Route
//@access       Private
router.get('/me',auth, (req,res,next) =>{getProfile_me.getProfile_me(req,res,next)})

router.post('/', [auth , 
    [
        check('status','Status is Required').not().isEmpty(),
        check('Skills','SKills is Required').not().isEmpty()
    ]
], (req,res,next)=>{postProfile.postProfile(req,res,next)}
)

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', ()=>getProfile_all.getAllProfiles(req,res,next));

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', (req,res,next)=>getProfile_user.getUser(req,res,next));

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, (req,res,next)=>deleteProfile.deleteProfile(req,res,next) );

router.put('/experience',
    [auth,
      [
        check('title', 'Title is required')
          .not()
          .isEmpty(),
        check('company', 'Company is required')
          .not()
          .isEmpty(),
        check('from', 'From date is required')
          .not()
          .isEmpty()
      ]
    ],
    (req,res,next)=>postProfile_experience.putExperience(req,res,next)
  );



router.delete('/experience/:exp_id', auth, async (req, res) => {
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
    });


    router.put(
      '/education',
      [
        auth,
        [
          check('school', 'School is required')
            .not()
            .isEmpty(),
          check('degree', 'Degree is required')
            .not()
            .isEmpty(),
          check('fieldofstudy', 'Field of study is required')
            .not()
            .isEmpty(),
          check('from', 'From date is required')
            .not()
            .isEmpty()
        ]
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        } = req.body;
    
        const newEdu = {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        };
    
        try {
          const profile = await Profile.findOne({ user: req.user.id });
    
          profile.education.unshift(newEdu);
    
          await profile.save();
    
          res.json(profile);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    );


router.delete('/education/:edu_id', auth, async (req, res) => {
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
});


// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check } = require('express-validator');

const getProfile_me = require('./Profile_Controller/profile_GET-me.controller')
const getProfile_all = require('./Profile_Controller/profile_GET-allprofiles.controller')
const getProfile_user = require('./Profile_Controller/profile_GET-user.controller')
const getProfile_githubrepos = require('./Profile_Controller/profile_GET-githubrepos.controller')
const postProfile = require('./Profile_Controller/profile_POST.controller')
const putProfile_experience = require('./Profile_Controller/profile_PUT-experience.controller')
const deleteProfile_experience = require('./Profile_Controller/profile_DELETE-experience.controller')
const deleteProfile = require('./Profile_Controller/profile_DELETE.controller')
const putEducation = require('./Profile_Controller/profile_PUT-education.controller')
const deleteEducation = require('./Profile_Controller/profile_DELETE-education.controller')

//@route Get    /api/profile/me
//@desc         Test Route
//@access       Private
router.get('/me',auth, (req,res,next) =>{getProfile_me.getProfile_me(req,res,next)})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Private
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

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
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
    (req,res,next)=>putProfile_experience.putExperience(req,res,next)
  );

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/experience/:exp_id', auth, (req,res,next)=>deleteProfile_experience.deleteExperience(req,res,next));


// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
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
      (req,res,next)=>putEducation.putEducation(req,res,next)
    );

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/education/:edu_id', auth, (req,res,next)=>deleteEducation.deleteEducation(req,res,next));

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', (req,res,next)=>getProfile_githubrepos.getGithubRep(req,res,next));

module.exports = router;
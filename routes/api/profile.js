const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Post');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.statis(500).send('Serveur error');
    }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post('/', [auth, [
    check('firstname', 'firstname is required')
    .not()
    .isEmpty(),
    check('lastname', 'lastname is required')
    .not()
    .isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstname,
        lastname,
        age,
        website,
        location,
        bio,
        twitter,
        facebook,
        linkedin
    } = req.body;

    // Profil object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (firstname) profileFields.firstname = firstname;
    if (lastname) profileFields.lastname = lastname;
    if (age) profileFields.age = age;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;

    // build social array
    profileFields.social = {};

    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;


    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //update profile

            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

            return res.json(profile);
        }

        // Create profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('serveur error');
    }
});

// @route GET api/profile/user/:user_id
// @desc Get profiles by user id
// @access Public
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('serveur error');
    }
});

// @route DELETE api/profile
// @desc Delete profile, users & posts
// @access Private
router.delete('/', auth, async(req, res) => {
    try {
        // remove user posts
        await Post.deleteMany({ user: req.user.id });

        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        
        // remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User has been delete' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('serveur error');
    }
});

// @route PUT api/profile/stories
// @desc Add stories to profile
// @access Private
router.put('/stories', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('story', 'Story content is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        story
    } = req.body;

    const newExp = {
        title,
        story
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.stories.unshift(newExp);

        await profile.save()

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});


// @route DELETE api/profile/stories/:story_id
// @desc Delete a story from profile
// @access Private
router.delete('/stories/:story_id', auth, async(req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.stories.map(item => item.id).indexOf(req.params.story_id);

        profile.stories.splice(removeIndex, 1)

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;
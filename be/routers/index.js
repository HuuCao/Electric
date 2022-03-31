const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/recipe', require('./recipe'));
router.use('/blog', require('./blog'));
router.use('/package', require('./package'));

module.exports = router;

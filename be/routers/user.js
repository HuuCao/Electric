const router = require('express').Router();
const {
    updateUser,
    getUser,
    getUserByRole,
    getAllUser,
    updatePackage
} = require('../controllers/user');
const {auth} = require("../middleware/auth");

router.route('/:id').patch(auth(),updateUser);
router.route('/package/:id').patch(auth(),updatePackage);
router.route('/').get(auth(),getUser);
router.route('/roleuser').get(auth(),getUserByRole);
router.route('/getalluser').get(auth(),getAllUser);

module.exports = router;
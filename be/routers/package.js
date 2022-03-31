const router = require('express').Router();
const {
    createPackage,
    getAllPackage,
    updatePackage
} = require('../controllers/package');
const {auth} = require("../middleware/auth");

router.route('/:id').patch(auth(),updatePackage);
router.route('/create').post(auth(),createPackage);
router.route('/getall').get(auth(),getAllPackage);

module.exports = router;
const router = require('express').Router();
const {
    createRecipe,
    getAllRecipe,
    updateRecipe
} = require('../controllers/recipe');
const {auth} = require("../middleware/auth");

router.route('/:id').patch(auth(),updateRecipe);
router.route('/create').post(auth(),createRecipe);
router.route('/getallrecipe').get(auth(),getAllRecipe);

module.exports = router;
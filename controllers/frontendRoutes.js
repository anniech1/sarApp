const router = require('express').Router();
const { Recipe, User, Regions, Dietary } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: Recipe,
          attributes: ['dish_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const allrecipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('addrecipe', { 
      allrecipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

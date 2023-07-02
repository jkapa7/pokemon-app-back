const { Recipe, Diet } = require("../db");

const postRecipeController = async (
  name,
  image,
  summary,
  health_score,
  step_by_step,
  diet_type
) => {
  let newRecipe = await Recipe.create({
    name,
    image,
    summary,
    health_score,
    step_by_step,
  });

  let dietDb = await Diet.findOne({
    where: {
      name: diet_type,
    },
  });

  if (dietDb) {
    await newRecipe.addDiet(dietDb);
  }

  return newRecipe;
};

module.exports = postRecipeController;

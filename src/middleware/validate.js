const validate = (req, res, next) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    req.body;
  if (!name) return res.status(400).json({ error: "Mising name" });
  if (!image) return res.status(400).json({ error: "Mising image" });
  if (!life) return res.status(400).json({ error: "Mising life" });
  if (!attack) return res.status(400).json({ error: "Mising attack" });
  if (!defense) return res.status(400).json({ error: "Mising defense" });
  if (!speed) return res.status(400).json({ error: "Mising speed" });
  if (!height) return res.status(400).json({ error: "Mising height" });
  if (!weight) return res.status(400).json({ error: "Mising weight" });
  if (!types) return res.status(400).json({ error: "Mising types" });

  next();
};

module.exports = validate;

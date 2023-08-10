const initValidation = (req, res, next) => {
  req.errors = [];
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) req.errors.push("Mising name");
  next();
};

const validateImage = (req, res, next) => {
  const { image } = req.body;
  if (!image) req.errors.push("Mising image");
  next();
};

const validateLife = (req, res, next) => {
  const { life } = req.body;
  if (!life) req.errors.push("Mising life");
  next();
};

const validateAttack = (req, res, next) => {
  const { attack } = req.body;
  if (!attack) req.errors.push("Mising attack");
  next();
};

const validateDefense = (req, res, next) => {
  const { defense } = req.body;
  if (!defense) req.errors.push("Mising defense");
  next();
};

const validateSpeed = (req, res, next) => {
  const { speed } = req.body;
  if (!speed) req.errors.push("Mising speed");
  next();
};

const validateHeight = (req, res, next) => {
  const { height } = req.body;
  if (!height) req.errors.push("Mising height");
  next();
};

const validateWeight = (req, res, next) => {
  const { weight } = req.body;
  if (!weight) req.errors.push("Mising weight");
  next();
};

const validateTypes = (req, res, next) => {
  const { types } = req.body;
  if (!types) req.errors.push("Mising types");
  next();
};

const validateErrors = (req, res, next) => {
  if (req.errors.length) {
    res.status(400).json(req.errors);
  } else {
    next();
  }
};

//EXPORTO EN UN ARRAY, PARA QUE PASAN POR TODAS LAS VALIDACIONES EN ORDEN.
module.exports = [
  initValidation,
  validateName,
  validateImage,
  validateLife,
  validateAttack,
  validateDefense,
  validateSpeed,
  validateHeight,
  validateWeight,
  validateTypes,
  validateErrors,
];

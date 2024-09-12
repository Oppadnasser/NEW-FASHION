import bcrypt from "bcrypt";

const saltrounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltrounds);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

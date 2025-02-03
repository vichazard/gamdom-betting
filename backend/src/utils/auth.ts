import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: string | object | Buffer) => {
  const token = jwt.sign(payload, `${config.key.secret}`, {
    expiresIn: `${config.key.expiresIn}`,
  });

  return token;
};

export const validateToken = (token: string) => {
  const validatedToken = jwt.verify(token, `${config.key.secret}`);

  return validatedToken;
};

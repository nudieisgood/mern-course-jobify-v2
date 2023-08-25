import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("Authentication Invalid");

  try {
    //這裡可以達到token 過期而無法verify 而res error to front end
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //attach the user to req object then it will next to following controllers
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;

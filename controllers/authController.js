import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import attachCookie from "../utilits/attachCookies.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide correct value.");
  }

  const isEmailExists = await User.findOne({ email });

  if (isEmailExists) {
    throw new BadRequestError("Email already exists, please try again.");
  }

  const user = await User.create(req.body);

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    location: user.location,
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
      location: user.location,
    },
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide correct value");

  //User model password 有標記 select會讓findOne 的user 不會帶有password
  //但在此我們需要user有password讓後續comparePW 使用, 要在findOne加上
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) throw new UnauthenticatedError("Invalid Credentials");

  const isMatch = await user.comparePW(password);
  if (!isMatch) throw new UnauthenticatedError("Invalid Credentials");

  const token = user.createJWT();

  attachCookie({ res, token });

  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, location: user.location });
};
export const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    req.body,
    { new: true }
  );

  //making new token after update user (非強制)
  const token = updatedUser.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    user: updatedUser,
    location: updatedUser.location,
  });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

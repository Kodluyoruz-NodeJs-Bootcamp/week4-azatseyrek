import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { User } from "../entity/user.entity";
import { getManager } from "typeorm";

// create json web token
const maxAge = 10 * 60; // for expiresIn parameter

// we are going to use this createToken function inside the User.create  !!!
const createToken = (id: string, browserInfo: string): string =>
  jwt.sign({ id, browserInfo }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const browserInfo = req.headers["user-agent"];

  try {
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({ email });

    const isPasswordRight = bcrypt.compare(password, user.password);

    if (isPasswordRight) {
      const token = createToken(user.id, browserInfo);

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user.id });
    } else {
      res.redirect(301, "login");
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

export const register: RequestHandler = async (req, res) => {
  const { email, password, name, surname } = req.body;
  const browserInfo = req.headers["user-agent"];

  try {
    const repository = getManager().getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await repository.save({
      email,
      password: hashedPassword,
      name,
      surname,
    });
    const token = createToken(user.id, browserInfo);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); //cookie uses miliseconds as unit so we multiply by 1000
    res.status(201).json({ user: user.id });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

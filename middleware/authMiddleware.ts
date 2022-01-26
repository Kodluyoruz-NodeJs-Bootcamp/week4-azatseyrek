import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;
  req.session.browserInfo = req.headers["user-agent"];
  // check json web token exists & is verified

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_KEY,
      (err: VerifyErrors, decodedToken: any) => {
        if (decodedToken.browserInfo === req.headers["user-agent"]) {
          console.log(decodedToken);
          console.log(req.session);
          next();
        } else {
          console.log(err);

          res.redirect("/login");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

// check current user
export const checkUser: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_KEY,
      async (err: VerifyErrors, decodedToken: any) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken);
          const repository = getManager().getRepository(User);
          let user = await repository.find({id: decodedToken.id})
          res.locals.user = user;
          let allUser = await repository.find()
          res.locals.allUser = allUser;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

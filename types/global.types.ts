import {NextFunction, Request, Response} from 'express'

// module.exports.signupGet = (req, res) => {
//     res.render("signup");
//   };

type middleware = (req:Request, res:Response, next:NextFunction) => void;


const login:middleware = (req, res, next) => {
        
}
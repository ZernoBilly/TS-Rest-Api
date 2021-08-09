import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Users from '../models/users';
import signJWT from '../functions/signJWT';

import logging from '../config/logging';

const NAMESPACE = 'Users';

//Validate user
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'User authorized');

    return res.status(200).json({
        message: 'Authorized'
    });
};

//Register user
const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        const _user = new Users({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

//Login user
const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    Users.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            bcrypt.compare(password, users[0].password, (error, result) => {
                if (error) {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(401).json({
                        message: 'Unauthorized'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            logging.error(NAMESPACE, 'Unable to sign token', _error);

                            return res.status(401).json({
                                message: 'Unauthorized',
                                error: _error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Authentication success',
                                token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    Users.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getUser = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, register, login, getAllUsers, getUser };

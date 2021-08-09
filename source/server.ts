import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';

import projectCardRoutes from './routes/projectCards';
import userRoutes from './routes/users';

const NAMESPACE = 'Server';
const app = express();

//Logging the request
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

//Parse the request
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());

//Rules of API
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'Options') {
        res.header('Acces-Control_allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

//Routes
app.use('/api/projectCards', projectCardRoutes);
app.use('/api/users', userRoutes);

//Error handling
app.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

//Create Server
app.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

//Connect to MongoDB
mongoose
    .connect(config.mongo.url.projectCards, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to MongoDB!');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

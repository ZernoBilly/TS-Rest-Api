import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USER_PASSWORD_CLUSTER = process.env.MONGO_USER_PASSWORD_CLUSTER;
const MONGO_PROJECTCARDS_DATABASE = process.env.MONGO_PROJECTCARDS_DATABASE;

const MONGO = {
    options: MONGO_OPTIONS,
    url: {
        projectCards: `${MONGO_USER_PASSWORD_CLUSTER}${MONGO_PROJECTCARDS_DATABASE}`
    }
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5001;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const config = {
    mongo: MONGO,
    server: SERVER
};
export default config;

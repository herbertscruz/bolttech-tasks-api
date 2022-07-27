import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'local';

dotenv.config({ path: `${__dirname}/.env.${nodeEnv}` });

const env = {
  NODE_ENV: nodeEnv,
  API: {
    PORT: Number(process.env.API_PORT) || 3000,
    CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'crypto_token',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'jwt_token',
    TTL_MINUTES: process.env.JWT_TTL_MINUTES || 30,
  },
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: Number(process.env.DB_PORT) || 3306,
    USERNAME: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DATABASE: process.env.DB_DATABASE || 'bolttech_tasks',
    LOGGING: ['prodution', 'prod'].includes(nodeEnv),
  },
  ERROR: {
    E001: 'System error',
    E002: 'User not found',
    E003: "User not allowed to query another user's data",
    E004: "User not allowed to update another user's data",
    E005: "User not allowed to change another user's password",
    E006: 'No token provided.',
  },
  CONSTANTS: {},
};

export default env;

import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'local';

dotenv.config({ path: `${__dirname}/.env.${nodeEnv}` });

const env = {
  NODE_ENV: nodeEnv,
  API: {
    PORT: Number(process.env.API_PORT) || 3000,
    CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'crypto_token',
    WEB_APP_URL: process.env.WEB_APP_URL || 'http://localhost:8080',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'jwt_token',
    TTL_MINUTES: parseInt(process.env.JWT_TTL_MINUTES ?? '30'),
    RENEW_TTL_MINUTES: parseInt(process.env.JWT_RENEW_TTL_MINUTES ?? '10'),
  },
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: Number(process.env.DB_PORT) || 3306,
    USERNAME: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASS || 'root',
    DATABASE: process.env.DB_DATABASE || 'bolttech_tasks',
    LOGGING: ['prodution', 'prod'].includes(nodeEnv),
  },
  EMAIL: {
    FROM: process.env.EMAIL_FROM || 'sac@bolttech.com',
    HOST: process.env.EMAIL_HOST || 'app.debugmail.io',
    PORT: parseInt(process.env.EMAIL_PORT ?? '25'),
    AUTH_USER: process.env.EMAIL_AUTH_USER || 'herbertscruz@gmail.com',
    AUTH_PASS:
      process.env.EMAIL_AUTH_PASS || '2d866a50-1dd7-11eb-aa51-995a00adea5e',
  },
  ERROR: {
    E001: 'System error',
    E002: 'User not found',
    E003: "User not allowed to query another user's data",
    E004: "User not allowed to update another user's data",
    E005: "User not allowed to change another user's password",
    E006: 'No token provided',
    E007: 'Invalid email or password',
  },
  CONSTANTS: {},
};

export default env;

import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'local';

dotenv.config({ path: `${__dirname}/.env.${nodeEnv}` });

const env = {
  NODE_ENV: nodeEnv,
  API: {
    PORT: Number(process.env.API_PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'jwt_token',
    CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'crypto_token',
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
  },
  CONSTANTS: {},
};

export default env;
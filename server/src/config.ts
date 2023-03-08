// export const MONGO_DATABASE_URL = `mongodb://dev:dev@localhost:27017/dev?authSource=admin`;
export const MONGO_DATABASE_NAME = "dev";
export const SECRET_KEY = process.env.SECRET_KEY!;
export const defaultConf = {
  corsOrigin: "http://localhost:3000",
};
export const REDIS_CONFIG = {
  REDIS_ENDPOINTS: process.env.REDIS_ENDPOINTS?.split(/[,;]/g),
  REDIS_NAME: process.env.REDIS_NAME || "",
  REDIS_HOST: process.env.REDIS_HOST || "",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  REDIS_USERNAME: process.env.REDIS_USERNAME || "",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  REDIS_SENTINELS_URLS: process.env.REDIS_SENTINELS_URLS || "",
  REDIS_SENTINEL_PASSWORD: process.env.REDIS_SENTINEL_PASSWORD || "",
  REDIS_PREFIX: process.env.REDIS_PREFIX || "",
  REDIS_DB: process.env.REDIS_DB || "0",
};

export const NODE_MAILER_CONFIG = {
  HOSTNAME: process.env.HOSTNAME || "",
  USERNAME: process.env.USERNAME || "",
  PASSWORD: process.env.PASSWORD || "",
  FROM: process.env.FROM || ""
};
export const MONGO_DATABASE_URL = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@atlascluster.4rvi6o4.mongodb.net/chatdb?authSource=admin`;

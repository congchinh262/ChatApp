import Redis from "ioredis";
import { REDIS_CONFIG } from "../config";

export const redisClient = new Redis({
    ...(REDIS_CONFIG.REDIS_ENDPOINTS
      ? {
        sentinels: REDIS_CONFIG.REDIS_ENDPOINTS.map((endpoint) => new URL(endpoint)).map(
          ({ hostname, port }) => ({ host: hostname, port: +port })
        ),
        name: REDIS_CONFIG.REDIS_NAME
      }
      : { host: REDIS_CONFIG.REDIS_HOST, port: Number(REDIS_CONFIG.REDIS_PORT) }),
    username: REDIS_CONFIG.REDIS_USERNAME,
    password: REDIS_CONFIG.REDIS_PASSWORD,
    sentinelPassword: REDIS_CONFIG.REDIS_SENTINEL_PASSWORD,
    // keyPrefix: REDIS_PREFIX,
    db: +REDIS_CONFIG.REDIS_DB
  });
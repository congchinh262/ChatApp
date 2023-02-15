import logger, { levels } from "pino";
import moment from "moment";

export const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: ()=>`,"[Time": ${moment().format('YYYY-MM-DD HH:mm:ss')}]`
});
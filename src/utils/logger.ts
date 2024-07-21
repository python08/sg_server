import { pino } from "pino";
import dayjs from "dayjs";

const transport = {
  target: "pino-pretty",
  options: { colorize: true },
};

const log = pino({
  transport,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

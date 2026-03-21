import config from "@config/config.json" with { type: "json" };

const enabled = config.global.logging;

// add the prefix to the message before running whatever function
function createLogger(fn: (...args: any[]) => void, prefix: string) {
  if (!enabled) {
    return () => {};
  }

  return (...args: any[]) => {
    fn(`${prefix}`, ...args);
  };
}

// export an object containing all logging functions
export const logger = {
  error: createLogger(console.error, "[ERROR]"),
  warn: createLogger(console.warn, "[WARN]"),
  info: createLogger(console.log, "[INFO]"),
};

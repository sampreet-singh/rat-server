import config from "@config/config.json" with { type: "json" };

const enabled = config.global.logging;

// add the prefix to the message before running whatever function
function create_logger(fn: (...args: any[]) => void, prefix: string) {
  if (!enabled) {
    return () => {};
  }

  return (...args: any[]) => {
    fn(`${prefix}`, ...args);
  };
}

// export an object containing all logging functions
export const logger = {
  error: create_logger(console.error, "[ERROR]"),
  warn: create_logger(console.warn, "[WARN]"),
  info: create_logger(console.log, "[INFO]"),
};

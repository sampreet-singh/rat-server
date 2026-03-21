import { t } from "@src/i18n/index.js";
import "dotenv/config";

export function resolveEnvironmentVariable(value: string): string {
  if (!value.startsWith("$")) {
    return value;
  }

  const envName = value.slice(1);
  const envValue = process.env[envName];

  if (!envValue) {
    throw new Error(t("env.missing_variable", { name: envName }));
  }

  return envValue;
}

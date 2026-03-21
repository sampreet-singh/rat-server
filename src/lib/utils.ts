import { t } from "@src/i18n/index.js";
import "dotenv/config";

export function resolve_environment_variable(value: string): string {
  if (!value.startsWith("$")) {
    return value;
  }

  const env_name = value.slice(1);
  const env_value = process.env[env_name];

  if (!env_value) {
    throw new Error(t("errors.missing_variable", { name: env_name }));
  }

  return env_value;
}

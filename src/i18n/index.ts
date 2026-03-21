import { logger } from "@src/lib/logger.js";
import en from "./en.json" with { type: "json" };

const languages = { en };

export type Lang = keyof typeof languages;

let current_lang: Lang = "en";

export function set_language(lang: string) {
  if (!(lang in languages)) {
    logger.warn(t("i18n.invalid_language", { lang }));
    current_lang = "en";
    return;
  }

  current_lang = lang as Lang;
  logger.info(t("i18n.language_set", { lang }));
}

export function t(
  key: string,
  vars?: Record<string, string | number | undefined>,
): string {
  const value = key
    .split(".")
    .reduce<any>((obj, k) => obj?.[k], languages[current_lang]);

  if (typeof value !== "string") {
    return key;
  }

  if (!vars) {
    return value;
  }

  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
    value,
  );
}

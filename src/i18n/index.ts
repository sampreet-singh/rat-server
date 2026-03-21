import { logger } from "@src/lib/logger.js";
import en from "./en.json" with { type: "json" };

const languages = { en };

export type Lang = keyof typeof languages;

let currentLang: Lang = "en";

export function setLanguage(lang: string) {
  if (!(lang in languages)) {
    logger.warn(t("i18n.invalid_language", { lang }));
    currentLang = "en";
    return;
  }

  currentLang = lang as Lang;
  logger.info(t("i18n.language_set", { lang }));
}

export function t(
  key: string,
  vars?: Record<string, string | number | undefined>,
): string {
  const value = key
    .split(".")
    .reduce<any>((obj, k) => obj?.[k], languages[currentLang]);

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

import "dotenv/config";

export function resolveEnvironmentVariable(value: string): string {
  if (!value.startsWith("$")) return value;

  const envName = value.slice(1);
  const envValue = process.env[envName];

  if (!envValue) {
    throw new Error(`Environment variable '${envName}' not found`);
  }

  return envValue;
}

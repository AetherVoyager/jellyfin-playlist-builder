import { randomUUID } from 'crypto';

const appName = 'Jellyfin Playlist Builder';
const appVersion = '1.0.0';
const deviceId = randomUUID();

const ENV_KEYS = {
  serverUrl: 'JELLYFIN_SERVER_URL',
  apiKey: 'JELLYFIN_API_KEY',
  userId: 'JELLYFIN_USER_ID',
};

interface AppConfig extends EnvConfig {
  appName: string;
  appVersion: string;
  deviceId: string;
}

export const getAppConfig: () => AppConfig = () => {
  const envConfig = getEnvConfig();
  return {
    appName,
    appVersion,
    deviceId,
    ...envConfig,
  };
};

interface EnvConfig {
  serverUrl: string;
  apiKey: string;
  userId: string;
}

const getEnvConfig: () => EnvConfig = () => {
  const keys = Object.keys(ENV_KEYS);
  return keys.reduce((config: any, key) => {
    config[key] = getEnvValue(key);
    return config;
  }, {});
};

const getEnvValue = (key: string, defaultValue?: any) => {
  const value = process.env[key];
  if (value) {
    return value;
  }

  if (!value && defaultValue) {
    return defaultValue;
  }

  throw new Error(`Missing environment variable: ${key}`);
};

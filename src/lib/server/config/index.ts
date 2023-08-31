import {
  MONGODB_URI,
  WEBHOOK_SECRET,
  GITHUB_APP_ID,
  GITHUB_PRIVATE_KEY,
  GITHUB_CLIENT_SECRET,
  GITHUB_TOKEN,
  TRIGGER_API_KEY,
  TRIGGER_API_URL
} from '$env/static/private';

type Config = {
  mongoDBUri: string;
  mongoDBName: string;
  webhookSecret: string;
  github: {
    appId: string;
    clientSecret: string;
    privateKey: string;
    token: string;
  };
  triggerDev: {
    apiKey: string;
    apiUrl: string;
  };
};

const config: Config = {
  webhookSecret: WEBHOOK_SECRET,
  mongoDBUri: MONGODB_URI,
  mongoDBName: 'data',
  github: {
    appId: GITHUB_APP_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    privateKey: GITHUB_PRIVATE_KEY,
    token: GITHUB_TOKEN
  },
  triggerDev: {
    apiKey: TRIGGER_API_KEY,
    apiUrl: TRIGGER_API_URL
  }
};

export default config;

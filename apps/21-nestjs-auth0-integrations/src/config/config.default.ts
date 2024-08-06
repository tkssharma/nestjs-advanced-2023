import { ConfigData } from './config.interface';

// tslint:disable:no-hardcoded-credentials

export const DEFAULT_CONFIG: ConfigData = {
  env: 'production',
  db: {
    url: process.env.DATABASE_URL,
  },
  port: 3000,
  swagger: {
    username: '',
    password: '',
  },
  metabase: {
    siteUrl: '',
    secretKey: '',
  },
  azure: {
    fileUpload: {
      connectionString: '',
      containerName: '',
    },
  },
  auth: {
    jwksuri: 'https://auth.example.io/.well-known/jwks.json',
    audience: 'https://example.com/v1',
    tokenIssuer: 'https://auth.example.io/',
    authProvider: 'auth0',
  },
  logLevel: 'info',
  newRelicKey: '',
};

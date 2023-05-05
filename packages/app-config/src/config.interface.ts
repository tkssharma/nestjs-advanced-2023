export interface ConfigDatabase {
  url: string;
}

export interface ConfigSwagger {
  username: string;
  password: string;
}

export interface UserServiceConfigOptions {
  host: string;
  port: number;
}

export interface EmailConfig {
  service_name: string;
  username: string;
  password: string;
}

export interface ApiConfig {
  apiUrl: string;
  apiKey: string;
}

export interface ConfigData {
  env: string;

  port: number;

  db: ConfigDatabase;

  swagger: ConfigSwagger;

  logLevel: string;

  email: EmailConfig;

  externalApi: ApiConfig;
}

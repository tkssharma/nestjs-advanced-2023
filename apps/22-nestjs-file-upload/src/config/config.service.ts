import { Injectable } from '@nestjs/common';
import { urlJoin } from 'url-join-ts';
import { DEFAULT_CONFIG } from './config.default';

import {
  AzureConfig,
  ConfigAuthData,
  ConfigData,
  ConfigDBData,
  MetabaseConfig,
  SwaggerUserConfig,
} from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: parseInt(env.PORT!, 10),
      db: this.parseDbConfigFromEnv(env, DEFAULT_CONFIG.db),
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      newRelicKey: env.NEW_RELIC_KEY || DEFAULT_CONFIG.newRelicKey,
      auth: this.parseAuthConfigFromEnv(env),
      azure: this.parseAzureConfigFromEnv(env, DEFAULT_CONFIG.azure),
      swagger: this.parseSwaggerConfigFromEnv(env, DEFAULT_CONFIG.swagger),
      metabase: this.parseMetabaseConfigFromEnv(env),
    };
  }
  private parseMetabaseConfigFromEnv(env: NodeJS.ProcessEnv): MetabaseConfig {
    return {
      siteUrl: env.METABASE_SITE_URL,
      secretKey: env.METABASE_SECRET_KEY,
    };
  }
  private parseAzureConfigFromEnv(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<AzureConfig>,
  ): AzureConfig {
    return {
      fileUpload: {
        connectionString:
          env.AZURE_FILE_STORAGE_CONNECTION_STRING ||
          defaultConfig.fileUpload.connectionString,
        containerName:
          env.AZURE_FILE_STORAGE_CONTAINER_NAME ||
          defaultConfig.fileUpload.containerName,
      },
    };
  }
  private parseSwaggerConfigFromEnv(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<SwaggerUserConfig>,
  ): SwaggerUserConfig {
    return {
      username: env.SWAGGER_USERNAME || defaultConfig.username,
      password: env.SWAGGER_PASSWORD || defaultConfig.password,
    };
  }
  private parseDbConfigFromEnv(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDBData>,
  ): ConfigDBData {
    return {
      url: env.DATABASE_URL || defaultConfig.url,
    };
  }

  private parseAuthConfigFromEnv(env: NodeJS.ProcessEnv): ConfigAuthData {
    let jwksUrl =
      env.AUTH0_JWKS_URL || env.JWKS_URI || DEFAULT_CONFIG.auth.jwksuri;
    if (!/\/\.well-known\/jwks\.json$/i.test(jwksUrl)) {
      jwksUrl = urlJoin(jwksUrl, '.well-known', 'jwks.json');
    }
    return {
      jwksuri: jwksUrl,
      audience:
        env.AUTH0_AUDIENCE_URL || env.AUDIENCE || DEFAULT_CONFIG.auth.audience,
      tokenIssuer:
        env.AUTH0_TOKEN_ISSUER_URL ||
        env.TOKEN_ISSUER ||
        DEFAULT_CONFIG.auth.tokenIssuer,
      authProvider: env.AUTH_PROVIDER || DEFAULT_CONFIG.auth.authProvider,
    };
  }

  /**
   * Retrieves the config.
   * @returns immutable view of the config data
   */
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}

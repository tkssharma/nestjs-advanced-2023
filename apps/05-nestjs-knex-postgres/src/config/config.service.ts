import { Injectable } from '@nestjs/common';
import { urlJoin } from 'url-join-ts';
import { DEFAULT_CONFIG } from './config.default';

import {
  AzureConfig,
  ConfigAuthData,
  ConfigAuthorizationData,
  ConfigData,
  ConfigDBData,
  NeutrinoConfig,
  PlatformAPIs,
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
      db: this.parseDbConfigFromEnv(env, DEFAULT_CONFIG.db),
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      newRelicKey: env.NEW_RELIC_KEY || DEFAULT_CONFIG.newRelicKey,
      auth: this.parseAuthConfigFromEnv(env),
      azure: this.parseAzureConfigFromEnv(env, DEFAULT_CONFIG.azure),
      authorization: this.parseAuthorizationConfigFromEnv(env),
      neutrino: this.parseNeutrinoConfigFromEnv(env, DEFAULT_CONFIG.neutrino),
      platformApis: this.parseNotificationsConfigFromEnv(env),
    };
  }
  private parseNeutrinoConfigFromEnv(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<NeutrinoConfig>,
  ) {
    return {
      provider: env.VALIDATE_DATA_PROVIDER || defaultConfig.provider,
      user_id: env.NEUTRINO_USER_ID || defaultConfig.user_id,
      api_key: env.NEUTRINO_API_KEY || defaultConfig.api_key,
    };
  }
  private parseAzureConfigFromEnv(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<AzureConfig>,
  ): AzureConfig {
    return {
      searchLogUpload: {
        connectionString:
          env.AZURE_SEARCH_LOG_STORAGE_CONNECTION_STRING ||
          defaultConfig.searchLogUpload.connectionString,
        containerName:
          env.AZURE_SEARCH_LOG_STORAGE_CONTAINER_NAME ||
          defaultConfig.searchLogUpload.containerName,
      },
      logoUpload: {
        connectionString:
          env.AZURE_LOGO_STORAGE_CONNECTION_STRING ||
          defaultConfig.logoUpload.connectionString,
        containerName:
          env.AZURE_LOGO_STORAGE_CONTAINER_NAME ||
          defaultConfig.logoUpload.containerName,
      },
    };
  }
  private parseAuthorizationConfigFromEnv(
    env: NodeJS.ProcessEnv,
  ): ConfigAuthorizationData {
    return {
      baseUrl: env.BOUNCER_BASE_URL || '',
      serviceClientToken: env.BOUNCER_SERVICE_CLIENT_TOKEN || '',
    };
  }

  private parseNotificationsConfigFromEnv(
    env: NodeJS.ProcessEnv,
  ): PlatformAPIs {
    return {
      baseUrl: env.PLATFORM_API_SERVICE_ACTIONS_URL || '',
      token: env.PLATFORM_API_SERVICE_ACTIONS_TOKEN || '',
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

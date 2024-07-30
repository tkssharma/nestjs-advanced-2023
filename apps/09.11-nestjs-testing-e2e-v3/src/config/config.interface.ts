/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  url?: string;
}
export interface FileUpload {
  connectionString?: string;
  containerName?: string;
}
export interface SwaggerUserConfig {
  username?: string;
  password?: string;
}

export interface MetabaseConfig {
  siteUrl?: string;
  secretKey?: string;
}
export interface AzureConfig {
  fileUpload: FileUpload;
}
export interface ConfigAuthData {
  /** The JWKS URI to use. */
  jwksuri: string;

  /** The Auth audience to use. */
  audience?: string;

  /** The Auth token Issuer to use. */
  tokenIssuer: string;

  /** The Auth provider Issuer to use. */
  authProvider: string;
}

export interface ConfigAuthorizationData {
  baseUrl: string;
  serviceClientToken: string;
}

export interface Notifications {
  baseUrl: string;
  token: string;
}

/**
 * Configuration data for the app.
 */
export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'production'
   */
  env: string;

  port: number;

  auth: ConfigAuthData;

  /** Database connection details. */
  db: ConfigDBData;

  azure: AzureConfig;

  swagger: SwaggerUserConfig;

  metabase: MetabaseConfig;
  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  /** The New Relic key to use. */
  newRelicKey?: string;
}

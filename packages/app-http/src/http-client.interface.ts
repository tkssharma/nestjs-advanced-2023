import { ModuleMetadata, Type } from "@nestjs/common";

export interface HttpClientModuleOptions {
  apiKey: string;
  apiUrl: string;
}

export interface HttpClientModuleFactory {
  createHttpModuleOptions: () =>
    | Promise<HttpClientModuleOptions>
    | HttpClientModuleOptions;
}

export interface HttpClientModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<HttpClientModuleFactory>;
  useExisting?: Type<HttpClientModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpClientModuleOptions> | HttpClientModuleOptions;
}

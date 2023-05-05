import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import {
  HttpClientModuleAsyncOptions,
  HttpClientModuleFactory,
  HttpClientModuleOptions,
} from "./http-client.interface";
import {
  HTTP_CLIENT_MODULE_OPTIONS,
  HTTP_CLIENT_TOKEN,
} from "./http-client.constants";
import {
  createHttpClientProvider,
  getHttpClientModuleOptions,
} from "./http-client.provider";

@Global()
@Module({})
export class HttpClientModule {
  public static forRoot(options: HttpClientModuleOptions): DynamicModule {
    const provider: Provider = createHttpClientProvider(options);
    return {
      module: HttpClientModule,
      providers: [provider],
      exports: [provider],
    };
  }
  public static forRootAsync(
    options: HttpClientModuleAsyncOptions
  ): DynamicModule {
    const provider: Provider = {
      inject: [HTTP_CLIENT_MODULE_OPTIONS],
      provide: HTTP_CLIENT_TOKEN,
      useFactory: async (options: HttpClientModuleOptions) => {
        return getHttpClientModuleOptions(options);
      },
    };
    return {
      module: HttpClientModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), provider],
      exports: [provider],
    };
  }
  private static createAsyncProviders(
    options: HttpClientModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<HttpClientModuleFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }
  private static createAsyncOptionsProvider(
    options: HttpClientModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_CLIENT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass ||
        options.useExisting) as Type<HttpClientModuleFactory>,
    ];

    return {
      provide: HTTP_CLIENT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpClientModuleFactory) =>
        await optionsFactory.createHttpModuleOptions(),
      inject,
    };
  }
}

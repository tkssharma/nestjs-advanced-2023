import { Provider } from "@nestjs/common";
import { HttpClientModuleOptions } from "./http-client.interface";
import { HTTP_CLIENT_TOKEN } from "./http-client.constants";
import { HttpClientService } from "./http-client.service";

export const getHttpClientModuleOptions = (
  options: HttpClientModuleOptions
): HttpClientService => {
  return new HttpClientService(options);
};

export function createHttpClientProvider(
  options: HttpClientModuleOptions
): Provider {
  return {
    provide: HTTP_CLIENT_TOKEN,
    useValue: getHttpClientModuleOptions(options),
  };
}

import { ModuleMetadata } from "@nestjs/common";
import { FactoryProvider } from "@nestjs/common/interfaces/modules/provider.interface";

export const EMAIL_CONFIG_OPTIONS = "EMAIL_CONFIG_OPTIONS";

export interface EmailOptions {
  service: string;
  user: string;
  pass: string;
}

type EmailAsyncOptions = Pick<ModuleMetadata, "imports"> &
  Pick<FactoryProvider<EmailOptions>, "useFactory" | "inject">;

export default EmailAsyncOptions;

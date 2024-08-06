import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    const config = new ConfigService();
    config.loadFromEnv();
    return config;
  },
};

@Module({
  imports: [],
  controllers: [],
  providers: [configFactory],
  exports: [configFactory],
})
export class ConfigModule {}

import { Module, Type } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigModule } from '../../config/config.module';

export const ALL_SERVICES = fs
  .readdirSync(path.join(path.dirname(__filename), 'services'))
  .filter(
    (file) =>
      (path.extname(file) === '.js' || path.extname(file) === '.ts') &&
      !file.endsWith('.d.ts'),
  )
  .filter((file) => file.indexOf('.spec') === -1)
  .map((file) => require(`./services/${file}`).default as Type<any>);
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [...ALL_SERVICES],
  exports: [...ALL_SERVICES],
})
export class AuthModule {}

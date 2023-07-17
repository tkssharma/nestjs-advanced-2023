import { Module, Type } from '@nestjs/common';
import { DbModule } from '../../db/db.module';
import * as fs from 'fs';
import * as path from 'path';
import { UsersController } from './controllers/user.controller';

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
  imports: [DbModule.forRoot()],
  providers: [...ALL_SERVICES],
  exports: [...ALL_SERVICES],
  controllers: [UsersController],
})
export class DomainModule {}

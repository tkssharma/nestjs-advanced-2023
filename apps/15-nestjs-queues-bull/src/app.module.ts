import { Module } from '@nestjs/common';
import { AutomobileModule } from './automobile/automobile.module';
import { DBModule } from './db.module';
import { Vehicle } from './automobile/vehicle';

// app to store CSV vehicle 100000 data in database

@Module({
  imports: [
    AutomobileModule,
    DBModule.forRoot({
      entities: [Vehicle],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

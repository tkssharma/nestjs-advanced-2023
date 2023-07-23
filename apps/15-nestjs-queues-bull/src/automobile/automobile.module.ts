import { Module } from '@nestjs/common';
import { AutomobileController } from './automobile.controller';
import { AutomobileService } from './automobile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle';
import { BullModule } from '@nestjs/bull';
import { UploadProcessor } from './processors/upload.processor';

@Module({
  controllers: [AutomobileController],
  providers: [AutomobileService, UploadProcessor],
  imports: [
    // step-0 redis container
    TypeOrmModule.forFeature([Vehicle]),
    // step-1
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // step-2
    BullModule.registerQueue({
      name: 'upload-queue',
    }),
  ],
})
export class AutomobileModule {}

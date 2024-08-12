// Package.
import { Global, Module } from '@nestjs/common';

// Internal.
import { AppConfigModule } from '@lib/config';
import AWSS3Service from './aws-s3.service';

// Code.
@Global()
@Module({
  imports: [AppConfigModule],
  providers: [AWSS3Service],
  exports: [AWSS3Service],
})
export class AWSS3Module {}

// Package.
import { Global, Module } from '@nestjs/common';

// Internal.
import AWSS3Service from './aws-s3.service';

// Code.
@Global()
@Module({
  imports: [],
  providers: [AWSS3Service],
  exports: [AWSS3Service],
})
export class AWSS3Module {}

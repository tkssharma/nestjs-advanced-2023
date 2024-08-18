// Package.
import { S3, config } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

// Internal.

// Code.
@Injectable()
export default class AWSS3Service {
  private client: AWS.S3;

  constructor() {
    this.client = new S3({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS!,
      },
    });
  }

  async upload(file: any, key: string, originalname: string) {
    // TODO: ideally the bucket must be parametrized here
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file,
    };
    const uploadResponse = await this.client.upload(params).promise();

    const url = await this.getPresignedUrl(key, originalname);
    return { ...uploadResponse, url };
  }

  async get(bucket: string, key: string) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return await this.client.getObject(params).promise();
  }

  async getPresignedUrl(key: string, originalname: string) {
    // TODO: ideally the bucket must be parametrized here
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 60 * 60 * 24 * 7,
      ResponseContentDisposition:
        'attachment; filename ="' + originalname + '"',
    };
    return await this.client.getSignedUrlPromise('getObject', params);
  }

  async isPreSignedUrlExpired(url: string) {
    const parsedUrl = new URL(url);
    // get access to URLSearchParams object
    const search_params = parsedUrl.searchParams;

    if (!search_params.has('X-Amz-Expires')) {
      return true;
    }
    const urlGeneratedDate = search_params.get('X-Amz-Date');
    const parsedGeneratedDate = moment(urlGeneratedDate, 'YYYYMMDDTHHmmssZ');
    const expirationTime = search_params.get('X-Amz-Expires') || '';

    const expirationDate = parsedGeneratedDate.add(
      parseInt(expirationTime),
      'seconds',
    );
    return moment().isAfter(expirationDate);
  }
}

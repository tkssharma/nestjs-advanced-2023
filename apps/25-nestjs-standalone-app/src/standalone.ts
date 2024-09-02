// Package.
require('module-alias/register');
import { SNSHandler, SNSEvent, Context } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RestaurantService } from '@domain/restaurant/services/restaurant.service';
import { INestApplicationContext } from '@nestjs/common';

let cachedApp: INestApplicationContext | undefined;

export const bootstrap = async (context: Context) => {
  // for lambda it will be inside cache after first invoke
  // so we don't need to initlize nestjs app everytime !!
  if (!cachedApp) {
    const app = await NestFactory.createApplicationContext(AppModule);
    cachedApp = app;
  }
  return cachedApp;
};

export const handle: SNSHandler = async (event: SNSEvent, context: Context) => {
  try {
    // this can be a simple sns lambda handler !!
    console.log(event, context);
    cachedApp = await bootstrap(context);
    const eventHandler = cachedApp.get(RestaurantService);
    await eventHandler.search({
      page: 1,
      limit: 30,
      latitude: '',
      longitude: '',
      search_text: '',
    });
  } catch (err) {
    throw err;
  }
};

handle();

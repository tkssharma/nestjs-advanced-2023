'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require('@nestjs/common');
var sequelize_1 = require('@nestjs/sequelize');
var app_controller_1 = require('./app.controller');
var app_service_1 = require('./app.service');
var users_module_1 = require('./modules/users/users.module');
var auth_module_1 = require('./modules/auth/auth.module');
var posts_module_1 = require('./modules/posts/posts.module');
var post_entity_1 = require('./modules/posts/post.entity');
var user_entity_1 = require('./modules/users/user.entity');
var AppModule = /** @class */ (function () {
  function AppModule() {}
  AppModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [
          sequelize_1.SequelizeModule.forRoot({
            dialect: 'postgres',
            uri: process.env.DATABASE_URL,
            models: [user_entity_1.User, post_entity_1.Post],
          }),
          users_module_1.UsersModule,
          auth_module_1.AuthModule,
          posts_module_1.PostsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
      }),
    ],
    AppModule,
  );
  return AppModule;
})();
exports.AppModule = AppModule;

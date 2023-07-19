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
exports.UsersModule = void 0;
var common_1 = require('@nestjs/common');
var users_service_1 = require('./users.service');
var sequelize_1 = require('@nestjs/sequelize');
var user_entity_1 = require('./user.entity');
var UsersModule = /** @class */ (function () {
  function UsersModule() {}
  UsersModule = __decorate(
    [
      (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_entity_1.User])],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
      }),
    ],
    UsersModule,
  );
  return UsersModule;
})();
exports.UsersModule = UsersModule;

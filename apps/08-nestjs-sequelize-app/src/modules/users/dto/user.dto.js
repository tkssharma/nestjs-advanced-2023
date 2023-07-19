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
exports.UserDto = void 0;
var class_validator_1 = require('class-validator');
var Gender;
(function (Gender) {
  Gender['MALE'] = 'male';
  Gender['FEMALE'] = 'female';
})(Gender || (Gender = {}));
var UserDto = /** @class */ (function () {
  function UserDto() {}
  __decorate([(0, class_validator_1.IsNotEmpty)()], UserDto.prototype, 'name');
  __decorate(
    [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsEmail)()],
    UserDto.prototype,
    'email',
  );
  __decorate(
    [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(6)],
    UserDto.prototype,
    'password',
  );
  __decorate(
    [
      (0, class_validator_1.IsNotEmpty)(),
      (0, class_validator_1.IsEnum)(Gender, {
        message: 'gender must be either male or female',
      }),
    ],
    UserDto.prototype,
    'gender',
  );
  return UserDto;
})();
exports.UserDto = UserDto;

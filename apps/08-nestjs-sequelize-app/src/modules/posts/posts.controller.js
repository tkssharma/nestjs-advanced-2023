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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.PostsController = void 0;
var common_1 = require('@nestjs/common');
var passport_1 = require('@nestjs/passport');
var PostsController = /** @class */ (function () {
  function PostsController(postService) {
    this.postService = postService;
  }
  PostsController.prototype.findAll = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.postService.findAll()];
          case 1:
            // get all posts in the db
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  PostsController.prototype.findOne = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var post;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.postService.findOne(id)];
          case 1:
            post = _a.sent();
            // if the post doesn't exit in the db, throw a 404 error
            if (!post) {
              throw new common_1.NotFoundException("This Post doesn't exist");
            }
            // if post exist, return the post
            return [2 /*return*/, post];
        }
      });
    });
  };
  PostsController.prototype.create = function (post, req) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.postService.create(post, req.user.id)];
          case 1:
            // create a new post and return the newly created post
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  PostsController.prototype.update = function (id, post, req) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, numberOfAffectedRows, updatedPost;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.postService.update(id, post, req.user.id),
            ];
          case 1:
            (_a = _b.sent()),
              (numberOfAffectedRows = _a.numberOfAffectedRows),
              (updatedPost = _a.updatedPost);
            // if the number of row affected is zero, it means the post doesn't exist in our db
            if (numberOfAffectedRows === 0) {
              throw new common_1.NotFoundException("This Post doesn't exist");
            }
            // return the updated post
            return [2 /*return*/, updatedPost];
        }
      });
    });
  };
  PostsController.prototype.remove = function (id, req) {
    return __awaiter(this, void 0, void 0, function () {
      var deleted;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.postService['delete'](id, req.user.id)];
          case 1:
            deleted = _a.sent();
            // if the number of row affected is zero, then the post doesn't exist in our db
            if (deleted === 0) {
              throw new common_1.NotFoundException("This Post doesn't exist");
            }
            // return success message
            return [2 /*return*/, 'Successfully deleted'];
        }
      });
    });
  };
  __decorate([(0, common_1.Get)()], PostsController.prototype, 'findAll');
  __decorate(
    [(0, common_1.Get)(':id'), __param(0, (0, common_1.Param)('id'))],
    PostsController.prototype,
    'findOne',
  );
  __decorate(
    [
      (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
      (0, common_1.Post)(),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, common_1.Request)()),
    ],
    PostsController.prototype,
    'create',
  );
  __decorate(
    [
      (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
      (0, common_1.Put)(':id'),
      __param(0, (0, common_1.Param)('id')),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, common_1.Request)()),
    ],
    PostsController.prototype,
    'update',
  );
  __decorate(
    [
      (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
      (0, common_1.Delete)(':id'),
      __param(0, (0, common_1.Param)('id')),
      __param(1, (0, common_1.Request)()),
    ],
    PostsController.prototype,
    'remove',
  );
  PostsController = __decorate(
    [(0, common_1.Controller)('posts')],
    PostsController,
  );
  return PostsController;
})();
exports.PostsController = PostsController;

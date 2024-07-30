import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDatabase();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'subham@gmail.com',
      password: '123@Subham78_StrongPass',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/local/signup').expectStatus(400);
      });
      it('should throw if password does not contain a special character', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            email: 'subham@gmail.com',
            password: 'PasswordWithoutSpecialChar1',
          })
          .expectStatus(400);
      });
      it('should throw if password does not contain an uppercase letter', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            email: 'subham@gmail.com',
            password: 'passwordwithoutuppercase1!',
          })
          .expectStatus(400);
      });
      it('should throw if password does not contain a lowercase letter', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            email: 'subham@gmail.com',
            password: 'PASSWORDWITHOUTLOWERCASE1!',
          })
          .expectStatus(400);
      });
      it('should throw if password does not contain a number', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            email: 'subham@gmail.com',
            password: 'PasswordWithoutNumber!',
          })
          .expectStatus(400);
      });
      it('should throw if password is the same as email', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody({
            email: 'subham@gmail.com',
            password: 'subham@gmail.com',
          })
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/local/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/local/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/local/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/local/signin').expectStatus(400);
      });
      it('should signin', async () => {
        await pactum
          .spec()
          .post('/auth/local/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('access_token', 'access_token')
          .stores('refresh_token', 'refresh_token');
      });
    });
    describe('should refresh tokens', () => {
      it('should throw if no token provided', async () => {
        await pactum.spec().post('/auth/refresh').expectStatus(401);
      });
      it('should refresh tokens', async () => {
        await pactum
          .spec()
          .post('/auth/refresh')
          .withHeaders({ Authorization: 'Bearer $S{refresh_token}' })
          .expectStatus(200);
      });
    });
    describe('Logout', () => {
      it('should throw if no token provided', async () => {
        await pactum.spec().post('/auth/local/signout').expectStatus(401);
      });
      it('should logout', async () => {
        await pactum
          .spec()
          .post('/auth/local/signout')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Subham',
          email: 'maitysubham4041@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });
});

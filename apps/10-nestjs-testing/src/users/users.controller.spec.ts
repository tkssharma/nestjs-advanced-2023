import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    // arrange
    const createUserDto = {
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    } as CreateUserDto;

    const user = {
      id: Date.now(),
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    } as User;

    jest.spyOn(mockUsersService, 'create').mockReturnValue(user);

    // act
    const result = await controller.create(createUserDto);

    // assert
    expect(mockUsersService.create).toBeCalled();
    expect(mockUsersService.create).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    //arrange
    const user = {
      id: Date.now(),
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };
    const users = [user];
    jest.spyOn(mockUsersService, 'findAll').mockReturnValue(users);

    //act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUsersService.findAll).toBeCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    //arrange
    const id = '1';
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUsersService, 'findOne').mockReturnValue(user);

    //act
    const result = await controller.findOne(id);

    expect(result).toEqual(user);
    expect(mockUsersService.findOne).toBeCalled();
    expect(mockUsersService.findOne).toBeCalledWith(+id);
  });

  it('update => should find a user by a given id and update its data', async () => {
    //arrange
    const id = '1';
    const updateUserDto = {
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    } as UpdateUserDto;
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUsersService, 'update').mockReturnValue(user);

    //act
    const result = await controller.update(id, updateUserDto);

    expect(result).toEqual(user);
    expect(mockUsersService.update).toBeCalled();
    expect(mockUsersService.update).toBeCalledWith(+id, updateUserDto);
  });
});

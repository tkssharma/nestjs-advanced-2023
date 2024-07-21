import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    // arrange
    const createUserDto = {
      firstname: 'ok',
      lastname: 'ok',
      email: 'ok@email.com',
    } as CreateUserDto;

    const user = {
      id: Date.now(),
      firstname: 'ok',
      lastname: 'ok',
      email: 'ok@email.com',
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act
    const result = await service.create(createUserDto);

    // assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    //arrange
    const user = {
      id: Date.now(),
      firstname: 'ok',
      lastname: 'ok',
      email: 'ok@email.com',
    };
    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toBeCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const user = {
      id: 1,
      firstname: 'ok',
      lastname: 'ok',
      email: 'ok@email.com',
    };

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    //act
    const result = await service.findOne(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const user = {
      id: 1,
      firstname: 'ok',
      lastname: 'ok',
      email: 'ok@email.com',
    };

    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);

    //act
    const result = await service.remove(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toBeCalled();
    expect(mockUserRepository.delete).toBeCalledWith(id);
  });
});

import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { TCat } from './entities/cat.entity';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsService', () => {
  let service: CatsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get(CatsService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it('should return all cats', () => {
    const data: TCat[] = [
      {
        name: 'cat #1',
        age: 10,
        breed: 'Russian',
        id: 1,
      },
    ];
    const response: AxiosResponse<TCat[]> = {
      data,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
      config: undefined,
    };
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: [
          {
            name: 'cat #1',
            age: 10,
            breed: 'Russian',
            id: 1,
          },
        ],
        headers: {},
        config: undefined,
        status: 200,
        statusText: 'OK',
      }),
    );
    service.findAll().subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });

  it('should return one cat by Id', () => {
    const data: TCat = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 1,
    };
    const response: AxiosResponse<TCat> = {
      data,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
      config: undefined,
    };
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: {
          name: 'cat #1',
          age: 10,
          breed: 'Russian',
          id: 1,
        },
        headers: {},
        config: undefined,
        status: 200,
        statusText: 'OK',
      }),
    );
    service.findOne(3).subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });

  it('should create a new cat', () => {
    const data: TCat = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 1,
    };
    let createCatDto: CreateCatDto = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
    };

    const response: AxiosResponse<TCat> = {
      data,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
      config: undefined,
    };
    jest.spyOn(httpService, 'post').mockReturnValue(of(response));

    service.create(createCatDto).subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });
});

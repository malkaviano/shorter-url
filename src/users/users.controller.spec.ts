import { Test, TestingModule } from '@nestjs/testing';

import { mock, when, instance } from 'ts-mockito';

import { UsersController } from './users.controller';
import { UserService } from '../services/user.service';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    let mockedUserService: UserService = mock(UserService);

    let service: UserService = instance(mockedUserService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide: UserService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { mock, when, instance } from 'ts-mockito';

import { UsersController } from './users.controller';
import { UserService } from '../services/user.service';
import { UrlService } from '../services/url.service';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    let mockedUserService: UserService = mock(UserService);
    let mockedUrlService: UrlService = mock(UrlService);


    let userService: UserService = instance(mockedUserService);
    let urlService: UrlService = instance(mockedUrlService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: UrlService,
          useValue: urlService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

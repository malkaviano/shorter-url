import { Test, TestingModule } from '@nestjs/testing';

import { mock, instance, when } from 'ts-mockito';

import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    let mockedUserService: UserService = mock(UserService);

    when(mockedUserService.deleteUser('xpto')).thenResolve(true);
    when(mockedUserService.deleteUser('notfound')).thenResolve(false);

    let service: UserService = instance(mockedUserService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        {
          provide: UserService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#deleteUser', () => {
    describe('when user is found', () => {
      it('returns { status: "deleted" }', async () => {
        await expect(controller.deleteUser('xpto')).resolves.toEqual({ status: 'deleted ' });
      });
    });

    describe('when user is not found', () => {
      it('throws', async () => {
        await expect(controller.deleteUser('notfound')).rejects.toThrow();
      });
    });
  });
});

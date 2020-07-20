import { Test, TestingModule } from '@nestjs/testing';

import { when, mock, instance } from 'ts-mockito';

import { UserService } from './user.service';
import { RepositoryService } from './repository.service';
import { User } from '../entities/user.entity';
import { UserIdOutput } from '../dtos/user-id.output';

describe('UserService', () => {
  let service: UserService;
  const mockedRepository: RepositoryService = mock(RepositoryService);

  beforeEach(async () => {
    const repository: RepositoryService = instance(mockedRepository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: RepositoryService,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#deleteUser', () => {
    describe('when user is found', () => {
      it('returns true', async () => {
        when(mockedRepository.findUser('xpto')).thenResolve({ id: 1, userId: 'xpto', urls: [] });
        when(mockedRepository.deleteUser('xpto')).thenResolve(true);

        await expect(service.deleteUser('xpto')).resolves.toEqual(true);
      });
    });

    describe('when user is not found', () => {
      it('returns false', async () => {
        when(mockedRepository.deleteUser('notfound')).thenResolve(false);

        await expect(service.deleteUser('notfound')).resolves.toEqual(false);
      });
    });
  });

  describe('#getUser', () => {
    describe('when user exists', () => {
      it('returns user', async () => {
        const expected: User = {
          id: 1,
          userId: 'someuser',
          urls: []
        };

        when(mockedRepository.findUser('someuser')).thenResolve(expected);

        await expect(service.getUser('someuser')).resolves.toEqual(expected);
      });
    });

    describe('when user does not exist', () => {
      it('returns null', async () => {
        when(mockedRepository.findUser('notfound')).thenResolve(null);

        await expect(service.getUser('notfound')).resolves.toEqual(null);
      });
    });
  });

  describe('#createUser', () => {
    describe('when userId already exists', () => {
      it('returns null', async () => {
        when(mockedRepository.createUser('someuser')).thenResolve(null);

        await expect(service.createUser('someuser')).resolves.toEqual(null);
      });
    });

    describe('when new userId', () => {
      const userId: UserIdOutput = {
        userId: 'someuser'
      };

      it('returns User', async () => {
        when(mockedRepository.createUser('someuser')).thenResolve(userId);

        await expect(service.createUser('someuser')).resolves.toEqual(userId);
      });
    });
  });
});

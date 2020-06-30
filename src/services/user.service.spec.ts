import { Test, TestingModule } from '@nestjs/testing';

import { when, mock, instance, anything } from 'ts-mockito';

import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let mockedUserRepository: UserRepository = mock(UserRepository);

  beforeEach(async () => {
    let repository: UserRepository = instance(mockedUserRepository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
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
        when(mockedUserRepository.delete(anything())).thenResolve(
          {
            raw: [],
            affected: 1
          }
        );

        await expect(service.deleteUser('xpto')).resolves.toEqual(true);
      });
    });

    describe('when user is not found', () => {
      it('returns false', async () => {
        when(mockedUserRepository.delete(anything())).thenResolve(
          {
            raw: [],
            affected: 0
          }
        );

        await expect(service.deleteUser('notfound')).resolves.toEqual(false);
      });

      it('returns false', async () => {
        when(mockedUserRepository.delete(anything())).thenResolve(
          {
            raw: [],
            affected: null,
          }
        );

        await expect(service.deleteUser('null')).resolves.toEqual(false);
      });

      it('returns false', async () => {
        when(mockedUserRepository.delete(anything())).thenReject(
          new Error("something went wrong")
        );

        await expect(service.deleteUser('throws')).resolves.toEqual(false);
      });
    });
  });
});

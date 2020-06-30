import { Test, TestingModule } from '@nestjs/testing';

import { when, mock, instance, anything } from 'ts-mockito';

import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let mockedRepository: UserRepository = mock(UserRepository);

  beforeEach(async () => {
    let repository: UserRepository = instance(mockedRepository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
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
        when(mockedRepository.delete(anything())).thenResolve(
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
        when(mockedRepository.delete(anything())).thenResolve(
          {
            raw: [],
            affected: 0
          }
        );

        await expect(service.deleteUser('notfound')).resolves.toEqual(false);
      });

      it('returns false', async () => {
        when(mockedRepository.delete(anything())).thenResolve(
          {
            raw: [],
            affected: null,
          }
        );

        await expect(service.deleteUser('null')).resolves.toEqual(false);
      });

      it('returns false', async () => {
        when(mockedRepository.delete(anything())).thenReject(
          new Error("something went wrong")
        );

        await expect(service.deleteUser('throws')).resolves.toEqual(false);
      });
    });
  });

  describe('#getUser', () => {
    describe('when user exists', () => {
      it('returns user', async () => {
        when(mockedRepository.findOne(anything(), anything())).thenResolve(
          {
            id: 1,
            userId: 'someuser',
            urls: []
          }
        );

        await expect(service.getUser('someuser')).resolves.toEqual({
          id: 1,
          userId: 'someuser',
          urls: []
        });
      });
    });
  });

  describe('#createUser', () => {
    describe('when user exists', () => {
      it('throws', async () => {
        when(mockedRepository.save(anything())).thenReject(
          new Error("user already exists")
        );

        await expect(service.createUser('someuser')).rejects.toThrow();
      });
    });

    describe('when new user', () => {
      it('throws', async () => {
        when(mockedRepository.save(anything())).thenResolve(
          {
            id: 1,
            userId: 'someuser'
          }
        );

        await expect(service.createUser('someuser')).resolves.toEqual({
          userId: 'someuser'
        });
      });
    });
  });
});

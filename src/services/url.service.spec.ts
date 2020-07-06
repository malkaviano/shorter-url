import { Test, TestingModule } from '@nestjs/testing';

import { mock, instance, when } from 'ts-mockito';

import { UrlService } from './url.service';
import { User } from '../entities/user.entity';
import { RepositoryService } from './repository.service';
import { Url } from '../entities/url.entity';
import { UrlOutput } from '../dtos/url.output';

describe('UrlService', () => {
  let service: UrlService;
  let mockedRepository: RepositoryService = mock(RepositoryService);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: RepositoryService,
          useValue: instance(mockedRepository),
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#createUrl', () => {
    it('returns Url created', async () => {
        const obj: Url = {
          id: 0,
          url: 'http://xpto.com/blahblahblah',
          shortUrl: 'http://xpto.com/blah',
          hits: 0,
          user: new User()
        };

        const expected: UrlOutput = {
          id: 1,
          url: 'http://xpto.com/blahblahblah',
          shortUrl: 'http://xpto.com/blah',
          hits: 0
        };

        when(mockedRepository.saveUrl(obj)).thenResolve(expected);

        await expect(service.createUrl(new User(), 'http://xpto.com/blahblahblah'))
          .resolves.toEqual(expected);
    });
  });
});

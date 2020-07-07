import { Test, TestingModule } from '@nestjs/testing';

import { mock, instance, when, anything } from 'ts-mockito';

import { UrlService } from './url.service';
import { User } from '../entities/user.entity';
import { RepositoryService } from './repository.service';
import { Url } from '../entities/url.entity';
import { UrlOutput } from '../dtos/url.output';
import { ShortenerService } from './shortener.service';

describe('UrlService', () => {
  let service: UrlService;
  let mockedRepository: RepositoryService = mock(RepositoryService);
  let mockedShortner: ShortenerService = mock(ShortenerService);

  beforeEach(async () => {
    when(mockedShortner.generateSegment(anything())).thenReturn('abcdefgh');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: RepositoryService,
          useValue: instance(mockedRepository),
        },
        {
          provide: ShortenerService,
          useValue: instance(mockedShortner),
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
          shortUrl: 'http://xpto.com/abcdefgh',
          hits: 0,
          user: new User()
        };

        const expected: UrlOutput = {
          id: 1,
          url: 'http://xpto.com/blahblahblah',
          shortUrl: 'http://xpto.com/abcdefgh',
          hits: 0
        };

        when(mockedRepository.saveUrl(anything())).thenResolve(null).thenResolve(null).thenResolve(expected);

        await expect(service.createUrl(new User(), 'http://xpto.com/blahblahblah'))
          .resolves.toEqual(expected);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { mock, instance, when, anything } from 'ts-mockito';

import { UrlService } from './url.service';
import { UrlRepository } from '../repositories/url.repository';
import { User } from '../entities/user.entity';

describe('UrlService', () => {
  let service: UrlService;
  let mockedRepository: UrlRepository = mock(UrlRepository);

  beforeEach(async () => {
    let repository: UrlRepository = instance(mockedRepository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: UrlRepository,
          useValue: repository,
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
        when(mockedRepository.save(anything())).thenResolve(
          {
            id: 1,
            url: 'http://xpto.com/blahblahblah',
            shortUrl: 'http://xpto.com/blah',
            hits: 0,
            user: new User()
          }
        );

        await expect(service.createUrl(new User(), 'http://xpto.com/blahblahblah', 'http://xpto.com/blah'))
          .resolves.toEqual(
          {
            id: 1,
            url: 'http://xpto.com/blahblahblah',
            shortUrl: 'http://xpto.com/blah',
            hits: 0,
          }
        )
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { mock, instance } from 'ts-mockito';

import { UrlService } from './url.service';
import { UrlRepository } from '../repositories/url.repository';

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
});

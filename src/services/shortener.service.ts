import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShortenerService {
    public generateSegment(url: string): string {
        return uuidv4().substring(0, 8);
    }
}

import { ApiProperty } from '@nestjs/swagger';

import { Length } from 'class-validator';

export class UrlInput {
    @ApiProperty()
    @Length(5, 250)
    url: string;
}
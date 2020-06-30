import { ApiProperty } from '@nestjs/swagger';

import { Length } from 'class-validator';

export class UserUrlInput {
    @ApiProperty()
    @Length(5, 250)
    url: string;
}
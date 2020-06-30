import { ApiProperty } from '@nestjs/swagger';

import { Length } from 'class-validator';

export class UserInput {
    @ApiProperty()
    @Length(5, 10)
    userId: string;
}
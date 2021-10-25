import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class createUsersDto {
    @IsString({message: 'Должно быть строкой'})
    @ApiProperty({example: 'username@mail.com', description: 'Email users'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @IsString({message: 'Должно быть строкой'})
    @ApiProperty({example: 'qwerRWWQ1234', description: 'Very hard password'})
    @Length(4, 16, {message: 'Должно быть строкой от 4 до 16 символов'})
    readonly password: string;
}
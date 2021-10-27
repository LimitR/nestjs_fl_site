import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createUsersDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/login')
    login(@Body() userDto: createUsersDto){

        return this.authService.login(userDto)

    }

    @Post('/registration')
    registration(@Body() userDto: createUsersDto){

        return this.authService.registration(userDto)

    }





}

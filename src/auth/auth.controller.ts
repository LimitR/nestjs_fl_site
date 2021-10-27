import { Body, Controller, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import { createUsersDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import {Users} from "../users/users.model";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiResponse({status: 200})
    @Post('/login')
    login(@Body() userDto: createUsersDto){
        return this.authService.login(userDto)
    }

    @ApiResponse({status: 200})
    @Post('/registration')
    registration(@Body() userDto: createUsersDto) {
        return this.authService.registration(userDto)
    }

}

import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role-auth.decarator';
import { RoleGuard } from 'src/auth/role.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from 'src/roles/roles.model';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { createUsersDto } from './dto/create-users.dto';
import { Users } from './users.model';
import { UsersService } from './users.service';


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: Users})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: createUsersDto){
        return this.usersService.createUsers(userDto)
    }




    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [Users]})
    @Role("ADMIN")
    @UseGuards(RoleGuard)
    @Get()
    getAll(): Promise<Users[]>{
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Role("ADMIN")
    @UseGuards(RoleGuard)
    @Post('/role')
    addRole(@Body() dto: addRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Role("ADMIN")
    @UseGuards(RoleGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.usersService.ban(dto);
    }

}

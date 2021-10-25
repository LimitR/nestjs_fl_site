import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUsersDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/users.model';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService
        ){}

   async login(userDto: createUsersDto){

    const user = await this.validateUser(userDto)
    return this.generateToken(user)
    }

   async registration(userDto: createUsersDto){
    const candidate = await this.userService.getUsersByEmail(userDto.email);
    if(candidate){
        throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUsers({...userDto, password: hashPassword});
    return this.generateToken(user)


    }

    async generateToken(user: Users){
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }


    private async validateUser(userDto: createUsersDto) {
        const user = await this.userService.getUsersByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
    }
}

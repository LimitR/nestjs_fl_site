import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUsersDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/users.model';
import * as nodemailer from 'nodemailer';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { ConfigModule } from '@nestjs/config';
import {v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
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
    const token = uuidv4()
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    })

    await transporter.sendMail({
        from: 'flomaster.root.ru@gmail.com',
        to: userDto.email,
        subject: 'Регистрация на сайте',
        text: 'sefesfe',
        html: `<div><a href="${process.env.API_URL}/users/active/${hashPassword}"></a>${process.env.API_URL}/users/active/${token}</div>`
    })
    
    const user = await this.userService.createUsers({...userDto, password: hashPassword, token: token});
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


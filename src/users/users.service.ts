import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { ActiveUserDto } from './dto/actived-user.dto';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { createUsersDto } from './dto/create-users.dto';
import { Users } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(Users) private userRepository: typeof Users,
                                    private roleService: RolesService
    ) {}

    async createUsers(dto: createUsersDto){
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role];
        return user;
    }

    async getAllUsers(){

        const user = await this.userRepository.findAll({include: {all: true}});
        return user

    }


    async getUsersByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user
    }

    async addRole(dto: addRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role && user){
            await user.$add('roles', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдена', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto){
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user){
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)

        }
        user.banned = true;
        user.banRequest = dto.banRequest;
        await user.save();
        return user;
    }

    async asctived(link: string){
        const user = await this.userRepository.findOne({where: {token: link}})
        if(!user){
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
         user.active = true;
        await user.save()
        return user
    }

}

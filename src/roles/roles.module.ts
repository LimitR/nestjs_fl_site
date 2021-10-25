import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Roles } from './roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './user-role.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Roles, Users, UserRoles])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}

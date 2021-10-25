import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users/users.controller';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.model';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';
import { UserRoles } from './roles/user-role.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module(
  {
    controllers: [AuthController],
    providers: [FilesService, AuthService],
    imports: [
      ConfigModule.forRoot({
      envFilePath: '.env'
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRESQL_HOST,
        port: Number(process.env.POSTGRESQL_PORT),
        username: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DB_NAME,
        models: [Users, Product, Roles, UserRoles],
        autoLoadModels: true
      }),
      UsersModule,
      ProductModule,
      FilesModule,
      RolesModule,
      AuthModule,
    ]
  }
)
export class AppModule{}
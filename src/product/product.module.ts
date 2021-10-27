import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { RolesModule } from 'src/roles/roles.module';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthModule } from 'src/auth/auth.module';
import {FilesModule} from "../files/files.module";

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    SequelizeModule.forFeature([Product]),
    RolesModule,
    forwardRef(()=> AuthModule),
      FilesModule
  ]

})
export class ProductModule {}


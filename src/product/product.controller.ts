import {Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/role-auth.decarator';
import { RoleGuard } from 'src/auth/role.guard';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Товары')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){

    }

    // @Role("ADMIN")
    // @UseGuards(RoleGuard)
    @Post('/add')
    @UseInterceptors(FileInterceptor('img'))
    create(@Body() productDto: createProductDto,
           @UploadedFile() img){
        return this.productService.createProduct(productDto, img);
    }

    @Role("ADMIN")
    @UseGuards(RoleGuard)
    @Post('/update')
    update(@Body() productDto: updateProductDto){
        return this.productService.updateProduct(productDto);
    }


    @Get()
    getAll(){
        return this.productService.getAllProduct()
    }
}

 
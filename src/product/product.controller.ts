import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/auth/role-auth.decarator';
import { RoleGuard } from 'src/auth/role.guard';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){

    }


    @Post('/add')
    create(@Body() productDto: createProductDto){
        return this.productService.createProduct(productDto);
    }

    @Post('/update')
    update(@Body() productDto: updateProductDto){
        return this.productService.updateProduct(productDto);
    }


    @Get()
    getAll(){
        return this.productService.getAllProduct()
    }
}

 
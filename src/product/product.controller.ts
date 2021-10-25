import { Body, Controller, Get, Post } from '@nestjs/common';
import { createProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){

    }

    @Post()
    create(@Body() productDto: createProductDto){
        return this.productService.createProduct(productDto);
    }


    @Get()
    getAll(){
        return this.productService.getAllProduct()
    }
}


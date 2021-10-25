import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createProductDto } from './dto/create-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository: typeof Product) {}

    async createProduct(dto: createProductDto){
        const product = await this.productRepository.create(dto);
        return product;
    }

    async getAllProduct(){
        const product = await this.productRepository.findAll();
        return product;
    }
}

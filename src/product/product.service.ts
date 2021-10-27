import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import {FilesService} from "../files/files.service";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository: typeof Product,
                private  fileServise: FilesService) {}

    async createProduct(dto: createProductDto, img){
        const fileName = await this.fileServise.createFileImg(img);
        const product = await this.productRepository.create({...dto, img: fileName});
        return product;
    }

    async updateProduct(dto: updateProductDto){
        const product = await this.productRepository.findByPk(dto.productId)
        if(dto.hasOwnProperty('title')){
            product.title = dto.title
        }
        if(dto.hasOwnProperty('prise')){
            product.prise = dto.prise
        }
        if(dto.hasOwnProperty('img')){
            product.img = dto.img
        }
        if(dto.hasOwnProperty('description_product')){
            product.description_product = dto.description_product
        }

        await product.save()
        return product
    }

    async getAllProduct(){
        const product = await this.productRepository.findAll();
        return product;
    }
}


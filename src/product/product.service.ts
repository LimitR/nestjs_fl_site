import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import {FilesService} from "../files/files.service";
import {createSomeProduct} from "./dto/createSome-product.dto";
import {ProductSome} from "./someProduct.model";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository: typeof Product,
                @InjectModel(ProductSome) private productSomeRepository: typeof ProductSome,
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

    async createSomeProduct(dto: createSomeProduct, img){

        const fileName = await this.fileServise.createFileImg(img);
        const product = await this.productSomeRepository.create({...dto, img: fileName});
        return product
    }

    async getAllProduct(){
        const product = await this.productRepository.findAll();
        return product;
    }

    async getOneProduct(id){
        let _id: number = +id;
        const product = await  this.productRepository.findOne({where: {id: _id}})
        if(!product){
            throw new HttpException('?????????? ???? ????????????', HttpStatus.NOT_FOUND)
        }
        return product
    }
}


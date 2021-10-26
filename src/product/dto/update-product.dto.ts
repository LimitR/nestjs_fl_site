import { ApiProperty } from "@nestjs/swagger";

export class updateProductDto {

    readonly productId: number;

    @ApiProperty({example: 'Роза', description: 'Name product'})
    readonly title: string;
    
    @ApiProperty({example: '1000', description: 'Product prise'})
    readonly prise: string;

    @ApiProperty({example: './img/default.png', description: 'Директория или ссылка на изображение'})
    readonly img: string;

    @ApiProperty({example: 'Красная роза, очень красивая', description: 'Описание товара'})
    readonly description_product: string
}
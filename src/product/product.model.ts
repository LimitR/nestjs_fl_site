import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface ProductCreationAttrs {
    title: string,
    prise: string,
    img: string,
    description_product: string
}



@Table(
    {
        tableName: 'product_plant_2'
    }
)
export class Product extends Model<Product, ProductCreationAttrs> {
    @ApiProperty({example: 1, description: 'Номер таблицы'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Роза', description: 'Название продукта'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: '1000', description: 'Стоимость в рублях'})
    @Column({type: DataType.STRING, allowNull: false})
    prise: string;

    @ApiProperty({example: 'Комнатные цветы', description: 'Описание продукта'})
    @Column({type: DataType.TEXT, allowNull: false, defaultValue: 'Мы не придумали что написать об этом товаре'})
    description_product: string

    @ApiProperty({example: '0 - красивоцветущие', description: 'От 0 до 4, где 4 - плодовые'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    using: number

    @ApiProperty({example: '0 - прямой солнечный свет', description: 'От 0 до 4, где 4 - тень'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    light: number

    @ApiProperty({example: '0 - влажность воздуха', description: 'От 0 до 4, где 4 - содержать в аквариуме'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    watering_air: number

    @ApiProperty({example: '0 - сухой грунт', description: 'От 0 до 4, где 4 - постоянный уровень воды'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    watering: number

    @ApiProperty({example: '0 - выносливые', description: 'От 0 до 2, где 2 - капризные'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    endurance: number

    @ApiProperty({example: '0 - не ядовитые', description: 'От 0 до 3, где 3 - сильно ядовитые'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    wariness: number

    @ApiProperty({example: true, description: 'Есть ли товар в наличии'})
    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: true})
    available: boolean;

    @ApiProperty({example: true, description: 'Есть ли скидка на товар'})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    discount: boolean;

    @ApiProperty({example: '2000', description: 'Стоимость до скидки'})
    @Column({type: DataType.STRING, allowNull: true})
    old_prise: string;

    @ApiProperty({example: './img/default.png', description: 'Ссылка на товар'})
    @Column({type: DataType.STRING, allowNull: true, defaultValue: './img/default.png'})
    img: string
}
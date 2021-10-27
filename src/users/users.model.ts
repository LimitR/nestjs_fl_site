import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Roles } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-role.model";


interface UserCreationAttrs {
    email: string,
    password: string
}



@Table(
    {
        tableName: 'users_relise'
    }
)
export class Users extends Model<Users, UserCreationAttrs> {
    @ApiProperty({example: 1, description: 'Номер таблицы'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'username@mail.com', description: 'Email users'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'qwerRWWQ1234', description: 'Very hard password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: true, description: 'Если пользователь заблокирован'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'SPAM', description: 'Причина блокировки пользователя'})
    @Column({type: DataType.STRING, allowNull: true})
    banRequest: string;

    @ApiProperty({example: 'sefes-fesfse-fesfesf-esfe', description: 'Уникальный токен для верификации почты'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    token: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    active: boolean;

    @ApiProperty({example: 'USER', description: 'Роль пользователя'})
    @BelongsToMany(()=> Roles, ()=> UserRoles)
    roles: Roles[]
}
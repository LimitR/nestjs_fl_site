import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { Roles } from "./roles.model";






@Table(
    {
        tableName: 'user_roles',
        createdAt: false,
        updatedAt: false
    }
)
export class UserRoles extends Model<UserRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=> Roles)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(()=> Users)
    @Column({type: DataType.INTEGER})
    userId: number;

}
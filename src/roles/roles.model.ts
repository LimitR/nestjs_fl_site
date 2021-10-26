import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { UserRoles } from "./user-role.model";


interface RolesCreationAttrs {
    value: string,
    description: string
}



@Table(
    {
        tableName: 'roles_relise'
    }
)
export class Roles extends Model<Roles, RolesCreationAttrs> {
    @ApiProperty({example: 1, description: 'Номер таблицы'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Email users'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Very hard password'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(()=> Users, ()=> UserRoles)
    users: Users[]
}
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";



interface ProfileCreationAttrs {
    email: string;
    userId: number

}

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING})
    firstname: string;

    @Column({ type: DataType.STRING})
    lastname: string;

    @Column({ type: DataType.INTEGER})
    age: number;

    @Column({ type: DataType.STRING})
    currency: string;

    @Column({ type: DataType.STRING})
    country: string;

    @Column({ type: DataType.STRING})
    city: string;

    @Column({ type: DataType.STRING})
    avatar: string;

    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User)
    user: User

}



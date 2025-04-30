import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";



interface ArticleDraftHeaderCreationAttrs {
    title: string;
    subtitle: string;
    userId: number;
    image: string;
}


@Table({ tableName: 'article-draft-header' , createdAt: false, updatedAt: false})
export class ArticleDraftHeader extends Model<ArticleDraftHeader, ArticleDraftHeaderCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    subtitle: string;

    @Column({ type: DataType.STRING })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    user: User
}
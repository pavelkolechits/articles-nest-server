import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";



interface ArticleDraftCreationAttrs {
    title: string;
    subtitle: string;
    userId: number;
    image: string;
}


@Table({ tableName: 'article-drafts' , createdAt: false, updatedAt: false})
export class ArticleDraft extends Model<ArticleDraft, ArticleDraftCreationAttrs> {
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
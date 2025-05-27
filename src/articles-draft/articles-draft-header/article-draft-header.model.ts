import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { ArticleDraftCode } from "../article-draft-code/article-draft-code.model";
import { ArticleDraftImg } from "../article-draft-img/article-draft-img-block.model";
import { ArticleDraftText } from "../article-draft-text/article-draft-text.model";



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

}
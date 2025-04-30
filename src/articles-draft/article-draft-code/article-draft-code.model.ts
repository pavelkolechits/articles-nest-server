import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ArticleDraftHeader } from "../articles-draft-header/article-draft-header.model";

interface ArticleDraftCodeCreationAttrs {
    blockId: number; 
    title?: string;
    code: string;
    type: string;
    articleId: number;
}


@Table({ tableName: 'article-draft-code' , createdAt: false, updatedAt: false})
export class ArticleDraftCode extends Model<ArticleDraftCode, ArticleDraftCodeCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.TEXT })
    code: string;

    @Column({ type: DataType.STRING })
    type: string;

    @ForeignKey(() => ArticleDraftHeader)
    @Column({ type: DataType.INTEGER })
    articleId: number;

    @Column({ type: DataType.INTEGER })
    blockId: number;

    @BelongsTo(() => ArticleDraftHeader)
    article: ArticleDraftHeader
}
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ArticleDraftHeader } from "../articles-draft-header/article-draft-header.model";

interface ArticleDraftTextCreationAttrs {
    blockId: number; 
    title?: string;
    text: string;
    articleId: number;
}


@Table({ tableName: 'article-draft-text' , createdAt: false, updatedAt: false})
export class ArticleDraftText extends Model<ArticleDraftText, ArticleDraftTextCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.TEXT })
    text: string;

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
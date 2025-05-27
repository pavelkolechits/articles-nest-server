import { Table, Column, DataType, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { Article } from "../articles.model";

interface ArticleTextCreationAttrs {
    blockId: string; 
    title?: string;
    text: string;
    articleId: number;
    type: string
}

@Table({ tableName: 'article-text' , createdAt: false, updatedAt: false})
export class ArticleText extends Model<ArticleText, ArticleTextCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    type: string;

    @Column({ type: DataType.TEXT })
    text: string;

    @ForeignKey(() => Article)
    @Column({ type: DataType.INTEGER })
    articleId: number;

    @Column({ type: DataType.STRING })
    blockId: string;

    @BelongsTo(() => Article)
    article: Article
}
import { Table, Column, DataType, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { ArticleDraftHeader } from "src/articles-draft/articles-draft-header/article-draft-header.model";
import { Article } from "../articles.model";

interface ArticleImgCreationAttrs {
    blockId: string; 
    title?: string;
    src: string;
    articleId: number;
    type: string
}



@Table({ tableName: 'article-img' , createdAt: false, updatedAt: false})
export class ArticleImg extends Model<ArticleImg, ArticleImgCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    src: string;

    @Column({ type: DataType.STRING })
    type: string;

    @ForeignKey(() => Article)
    @Column({ type: DataType.INTEGER })
    articleId: number;

    @Column({ type: DataType.STRING })
    blockId: string;

    @BelongsTo(() => Article)
    article: Article
}
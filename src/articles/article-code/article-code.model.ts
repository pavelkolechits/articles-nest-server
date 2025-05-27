import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Article } from "../articles.model";


interface ArticleCodeCreationAttrs {
    blockId: string; 
    title?: string;
    code: string;
    type: string;
    articleId: number;
}



@Table({ tableName: 'article-code' , createdAt: false, updatedAt: false})
export class ArticleCode extends Model<ArticleCode, ArticleCodeCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.TEXT })
    code: string;

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
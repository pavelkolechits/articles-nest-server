import { Table, Column, DataType, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { ArticleDraftHeader } from "src/articles-draft/articles-draft-header/article-draft-header.model";

interface ArticleDraftImgCreationAttrs {
    blockId: number; 
    title?: string;
    image: string;
    articleId: number;
}


@Table({ tableName: 'article-draft-img' , createdAt: false, updatedAt: false})
export class ArticleDraftImg extends Model<ArticleDraftImg, ArticleDraftImgCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    image: string;

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
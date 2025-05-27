import { Table, Column, DataType, Model, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface ArticleCreationAttrs {
    title: string;
    subtitle: string;
    userId: number;
    image: string;
}

@Table({ tableName: 'articles' , createdAt: false, updatedAt: false})
export class Article extends Model<Article, ArticleCreationAttrs> {


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
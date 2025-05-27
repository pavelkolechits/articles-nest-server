import { Table, Column, DataType, Model, ForeignKey, AllowNull } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface ArticleCreationAttrs {
    title: string;
    subtitle: string;
    userId: number;
    image: string;
    views: number;
    type: Array<string>
}

@Table({ tableName: 'articles', updatedAt: false})
export class Article extends Model<Article, ArticleCreationAttrs> {


    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    subtitle: string;

    @Column({ type: DataType.STRING })
    image: string;

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    type: Array<string>;

    @Column({ type: DataType.NUMBER , allowNull: false})
    views: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;


}
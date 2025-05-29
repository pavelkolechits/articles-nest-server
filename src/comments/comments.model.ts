import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";
import { User } from "src/users/users.model";

interface CommentCreationAttrs {
    text: string;
    userId: number;
    articleId: number
}

@Table({ tableName: 'comments', updatedAt: false })
export class Comment extends Model<Comment, CommentCreationAttrs> {


    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.TEXT  })
    text: string;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @Column({ type: DataType.INTEGER })
    articleId: number

    @BelongsTo(() => Profile)
    author: Profile
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private articleCommentRepository: typeof Comment) { }

    async createComment(dto: CommentDto) {
        const comment = await this.articleCommentRepository.create(dto)
        return comment
    }

    async getComments(articleId) {
        const comments = await this.articleCommentRepository.findAll({ 
            where: { articleId }, 
            include: { all: true, attributes: ['firstname', 'lastname', 'avatar'] } 
        })
        return comments
    }
}

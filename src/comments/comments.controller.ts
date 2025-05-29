import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService){}

    @Post()
    createComment(@Body() dto: CommentDto) {
       return this.commentsService.createComment(dto)
    }

    @Get('/:id')
    getComments(@Param('id') articleId: number ) {
       return this.commentsService.getComments(articleId)
    }
}

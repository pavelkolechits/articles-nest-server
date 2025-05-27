import { Body, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { ArticleDraftTextService } from './article-draft-text.service';
import { CreateArticleTextDto } from './dto/create-article-text.dto';




@Controller('text')
export class ArticleDraftTextController {
    constructor(private articleDraftTextService: ArticleDraftTextService) { }

    @Post()
    createArticleTextBlock(
        @Body() articleTextDto: CreateArticleTextDto,
    ) {
        return this.articleDraftTextService.createArticleText(articleTextDto)
    }

    @Put()
    updateArticleText(
        @Body() articleTextDto: CreateArticleTextDto,
    ) {
        return this.articleDraftTextService.updateArticleText(articleTextDto)
    }

    @Delete()
    deleteArticleText(
        @Body() data: { articleId: number , blockId: string }
    ) {

        return this.articleDraftTextService.deleteArticleText(data)
    }

}
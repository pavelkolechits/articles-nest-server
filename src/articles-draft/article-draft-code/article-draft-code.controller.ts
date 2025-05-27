import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ArticleDraftCodeService } from './article-draft-code.service';
import { CreateArticleCodeDto } from './dto/create-article-code.dto';




@Controller('code')
export class ArticleDraftCodeController {
    constructor(private articleDraftCodeService: ArticleDraftCodeService) { }

    @Post()
    createArticleCode(
        @Body() articleCodeDto: CreateArticleCodeDto,
    ) {
        return this.articleDraftCodeService.createArticleCode(articleCodeDto)
    }

    @Put()
    updateArticleCode(
        @Body() articleCodeDto: CreateArticleCodeDto,
    ) {
        return this.articleDraftCodeService.updateArticleCode(articleCodeDto)
    }

    @Delete()
    deleteArticleText(
        @Body() data: { articleId: number, blockId: string }
    ) {

        return this.articleDraftCodeService.deleteArticleCode(data)
    }

}
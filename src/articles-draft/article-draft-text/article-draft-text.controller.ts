import { Body, Controller, Post, Put } from '@nestjs/common';
import { ArticleTextService } from './article-draft-text.service';
import { CreateArticleTextDto } from './dto/create-article-text.dto';




@Controller('text')
export class ArticleTextController {
    constructor(private articleTextService: ArticleTextService) { }

    @Post()
    createArticleTextBlock(
        @Body() articleTextDto: CreateArticleTextDto,
    ) {
        return this.articleTextService.createArticleText(articleTextDto)
    }

    @Put()
    updateArticleText(
        @Body() articleTextDto: CreateArticleTextDto,
    ) {
        return this.articleTextService.updateArticleText(articleTextDto)
    }

}
import { Body, Controller, Post, Put } from '@nestjs/common';
import { ArticleCodeService } from './article-draft-code.service';
import { CreateArticleCodeDto } from './dto/create-article-code.dto';




@Controller('code')
export class ArticleCodeController {
    constructor(private articleCodeService: ArticleCodeService) { }

    @Post()
    createArticleCode(
        @Body() articleCodeDto: CreateArticleCodeDto,
    ) {
        return this.articleCodeService.createArticleCode(articleCodeDto)
    }

    @Put()
    updateArticleCode(
        @Body() articleCodeDto: CreateArticleCodeDto,
    ) {
        return this.articleCodeService.updateArticleCode(articleCodeDto)
    }

}
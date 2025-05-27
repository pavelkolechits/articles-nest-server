import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(private articleService: ArticlesService) { }
    @Post()
    createArticleHeader(
        @Body() articleDto: ArticleDto,
    ) {
        return this.articleService.createArticle(articleDto)
    }

    @Get()
    getArticles() {
        return this.articleService.getArticles()
    }

    @Get('/:id')

    getArticle(@Param('id') id: number) {
        console.log(id)
        return this.articleService.getArticle(id)
    }
}

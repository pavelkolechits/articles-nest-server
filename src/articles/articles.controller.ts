import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
    getArticles(
        @Query('page') page: number , 
        @Query('limit') limit: number,
        @Query('sort') sort: string,
        @Query('order') order: string,
        @Query('q') search: string,
        
    ){
        console.log(page, limit, sort, order)
        return this.articleService.getArticles(page, limit, sort, order, search)
    }

    @Get('/:id')

    getArticle(@Param('id') id: number) {
        return this.articleService.getArticle(id)
    }
}

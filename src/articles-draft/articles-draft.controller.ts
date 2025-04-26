import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArticleHeaderDto } from './dto/create-article-header.dto';
import { ArticleDraftService } from './articles-draft.service';

@Controller('articles')
export class ArticlesDraftController {
    constructor(private articlesDraftService: ArticleDraftService) { }

      @Post()
        @UseInterceptors(FileInterceptor('image'))
        createArticleHeader(
            @Body() articleHeaderDto: CreateArticleHeaderDto,
            @UploadedFile() image
        ) {
            return this.articlesDraftService.createArticleHeader(articleHeaderDto, image)
        }

        @Put()
        @UseInterceptors(FileInterceptor('image'))
        updateArticleHeader(
            @Body() articleHeaderDto: CreateArticleHeaderDto,
            @UploadedFile() image
        ) {
            return this.articlesDraftService.updateArticleHeader(articleHeaderDto, image)
        }

}

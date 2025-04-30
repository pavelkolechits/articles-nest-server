import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArticleHeaderDto } from './dto/create-article-header.dto';
import { ArticleDraftHeaderService } from './article-draft-header.service';

@Controller('create_draft')
export class ArticleDraftHeaderController {
    constructor(private articleDraftHeaderService: ArticleDraftHeaderService) { }

      @Post()
        @UseInterceptors(FileInterceptor('image'))
        createArticleHeader(
            @Body() articleHeaderDto: CreateArticleHeaderDto,
            @UploadedFile() image
        ) {
            return this.articleDraftHeaderService.createArticleHeader(articleHeaderDto, image)
        }

        @Put()
        @UseInterceptors(FileInterceptor('image'))
        updateArticleHeader(
            @Body() articleHeaderDto: CreateArticleHeaderDto,
            @UploadedFile() image
        ) {
            return this.articleDraftHeaderService.updateArticleHeader(articleHeaderDto, image)
        }

        @Get('/:id')
        getArticleDraft(
            @Param('id') id: number,
        ) {
            return this.articleDraftHeaderService.getArticleDraft(id)
        }

}

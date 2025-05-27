import { Body, Controller, Delete, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleDraftImgService } from './article-draft-img.service';
import { CreateArticleImgDto } from './dto/create-article-img.dto';


@Controller('img')
export class ArticleDraftImgController {
    constructor(private articleImgService: ArticleDraftImgService) { }


    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createArticleImgBlock(
        @Body() articleImgDto: CreateArticleImgDto,
        @UploadedFile() image
    ) {
        return this.articleImgService.createArticleImg(articleImgDto, image)
    }

    @Put()
    @UseInterceptors(FileInterceptor('image'))
    updateArticleImg(
        @Body() articleImgDto: CreateArticleImgDto,
        @UploadedFile() image
    ) {
        return this.articleImgService.updateArticleImg(articleImgDto, image)
    }

    @Delete()
        deleteArticleText(
            @Body() data: { articleId: number , blockId: string }
        ) {
    
            return this.articleImgService.deleteArticleImg(data)
        }

}
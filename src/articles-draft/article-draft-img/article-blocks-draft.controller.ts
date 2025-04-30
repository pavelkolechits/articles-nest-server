import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleImgService } from './article-draft-img.service';
import { CreateArticleImgDto } from './dto/create-article-img.dto';


@Controller('img')
export class ArticleImgController {
    constructor(private articleImgService: ArticleImgService) { }

    
    @Post()
     @UseInterceptors(FileInterceptor('image'))
     createArticleImgBlock(
       @Body() articleImgDto: CreateArticleImgDto,
       @UploadedFile() image

   ) {
       return this.articleImgService.createArticleImg(articleImgDto, image)
   }

}
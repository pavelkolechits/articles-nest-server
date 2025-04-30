import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleDraftImg } from './article-draft-img-block.model';
import { FilesService } from 'src/files/files.service';
import { CreateArticleImgDto } from './dto/create-article-img.dto';

@Injectable()
export class ArticleImgService {
    constructor(
        @InjectModel(ArticleDraftImg)
        private articleImgRepository: typeof ArticleDraftImg,
        private fileService: FilesService,

    ) { }

   
 

    async createArticleImg(dto: CreateArticleImgDto, image: any) {

        const fileName = await this.fileService.createFile(image);

        const imgBlock = await this.articleImgRepository.create({
            ...dto, image: fileName
        })
        return imgBlock
    }

    async getArticleImg(articleId: number) {
        const imgBlock = await this.articleImgRepository.findAll({ where: { articleId }})
        return imgBlock
    }
}

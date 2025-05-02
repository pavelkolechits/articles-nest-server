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

    async updateArticleImg(dto: CreateArticleImgDto, image: any) {
        if (!image) {
            const imgBlock = await this.articleImgRepository.update(
                { title: dto.title},
                {
                    where: { articleId: dto.articleId, blockId: dto.blockId },
                    returning: true
                })
                const block = imgBlock[1][0].dataValues

                const payload = {
                    id: block.blockId,
                    title: block.title,
                    image: block.image,
                    type: 'IMAGE'
                }
    
            return payload

        } else {
            const fileName = await this.fileService.createFile(image);
            const imgBlock = await this.articleImgRepository.update(
                { title: dto.title, image: fileName },
                {
                    where: { articleId: dto.articleId, blockId: dto.blockId },
                    returning: true
                })
                const block = imgBlock[1][0].dataValues

                const payload = {
                    id: block.blockId,
                    title: block.title,
                    image: block.image,
                    type: 'IMAGE'
                }
    
            return payload
        }
    }

    async getArticleImg(articleId: number) {
        const imgBlocks = await this.articleImgRepository.findAll({
            where: { articleId },
            attributes: ['blockId', 'title', 'image']
        })


        const payload = imgBlocks.map((block) => {
            return {
                id: block.dataValues.blockId,
                image: process.env.URL + block.dataValues.image,
                title: block.dataValues.title,
                type: 'IMAGE'
            }
        })

        return payload
    }
}

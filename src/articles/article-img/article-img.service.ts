import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleImg } from './article-img.model';
import { ArticleImgDto } from '../dto/article-img.dto';

@Injectable()
export class ArticleImgService {
    constructor(@InjectModel(ArticleImg) private articleImgRepository: typeof ArticleImg) { }

    async createImg(dto: ArticleImgDto) {
        const payload = { blockId: dto.id, src: dto.src, title: dto.title, type: dto.type, articleId: dto.articleId }
        const img = await this.articleImgRepository.create(payload)

        return img
    }

    async getImg(articleId: number) {
        const imgBlocks = await this.articleImgRepository.findAll({ where: { articleId } })

        const resultBlocks = imgBlocks.map((block) => {
            return {
                id: block.dataValues.blockId,
                title: block.dataValues.title,
                type: 'IMAGE',
                src: block.dataValues.src
            }
        })

        return resultBlocks

    }
}

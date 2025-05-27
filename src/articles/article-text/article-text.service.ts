import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleText } from './article-text.model';
import { ArticleTextDto } from '../dto/article-text.dto';

@Injectable()
export class ArticleTextService {
    constructor(@InjectModel(ArticleText) private articleTextRepository: typeof ArticleText){}


    async createText(dto: ArticleTextDto) {

        const payload = {blockId: dto.id, text: dto.text, title: dto.title, type: dto.type, articleId: dto.articleId}
        const text = await this.articleTextRepository.create(payload)
        return text
    }

    async getText(articleId: number) {
        const textBlocks = await this.articleTextRepository.findAll({where: {articleId}})

        const resultBlocks = textBlocks.map((block) => {
            return {
                id: block.dataValues.blockId,
                title: block.dataValues.title,
                type: 'TEXT',
                text: block.dataValues.text
            }
        })

        return resultBlocks

    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleDraftText } from './article-draft-text.model';
import { CreateArticleTextDto } from './dto/create-article-text.dto';


@Injectable()
export class ArticleTextService {
    constructor(
        @InjectModel(ArticleDraftText)
        private articleTextRepository: typeof ArticleDraftText,

    ) { }

    async createArticleText(dto: CreateArticleTextDto) {
        const textBlock = await this.articleTextRepository.create(dto)
        return textBlock
    }

    async updateArticleText(dto: CreateArticleTextDto) {
        const textBlock = await this.articleTextRepository.update(
            {title: dto.title, text: dto.text},
            {
                where: { blockId: dto.blockId, articleId: dto.articleId },
                returning: true
            },)

            const block = textBlock[1][0].dataValues

            const payload = {
                id: block.blockId,
                title: block.title,
                text: block.text,
                type: 'TEXT'
            }

        return payload

    }

    async getArticleText(articleId: number) {
        const textBlocks = await this.articleTextRepository.findAll({
            where: { articleId },
            attributes: ['blockId', 'title', 'text']

        })

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

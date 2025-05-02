import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleDraftCode } from './article-draft-code.model';
import { CreateArticleCodeDto } from './dto/create-article-code.dto';


@Injectable()
export class ArticleCodeService {
    constructor(
        @InjectModel(ArticleDraftCode)
        private articleCodeRepository: typeof ArticleDraftCode,

    ) { }


    async createArticleCode(dto: CreateArticleCodeDto) {
        const codeBlock = await this.articleCodeRepository.create(dto)
        return codeBlock
    }
      async updateArticleCode(dto: CreateArticleCodeDto) {
           const codeBlock = await this.articleCodeRepository.update(
                {code: dto.code},
                { where: { blockId: dto.blockId, articleId: dto.articleId }, returning: true })

                const block = codeBlock[1][0].dataValues

                const payload = {
                    id: block.blockId,
                    code: block.code,
                    type: 'CODE'
                }
    
            return payload
        }

    async getArticleCode(articleId: number) {
        const codeBlocks = await this.articleCodeRepository.findAll({ 
            where: { articleId },
            attributes: [ 'blockId', 'code']
        })

        const payload = codeBlocks.map((block) => {
            return {
                id: block.dataValues.blockId,
                type: 'CODE',
                code: block.dataValues.code
            }
        })
        return payload
    }

}

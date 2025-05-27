import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleCode } from './article-code.model';
import { ArticleCodeDto } from '../dto/article-code.dto';

@Injectable()
export class ArticleCodeService {
    constructor(@InjectModel(ArticleCode) private articleCodeRepository: typeof ArticleCode) { }


    async createCode(dto: ArticleCodeDto) {
        const payload = { blockId: dto.id, type: dto.type, code: dto.code, articleId: dto.articleId }
        const code = await this.articleCodeRepository.create(payload)
        return code
    }

    async getCode(articleId: number) {
        const codeBlocks = await this.articleCodeRepository.findAll({ where: { articleId } })

        const resultBlocks = codeBlocks.map((block) => {
            return {
                id: block.dataValues.blockId,
                type: 'IMAGE',
                code: block.dataValues.code
            }
        })

        return resultBlocks

    }
}

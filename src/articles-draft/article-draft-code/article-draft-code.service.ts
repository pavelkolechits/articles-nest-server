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

    async getArticleCode(articleId: number) {
        const codeBlock = await this.articleCodeRepository.findAll({ where: { articleId }})
        return codeBlock
    }

}

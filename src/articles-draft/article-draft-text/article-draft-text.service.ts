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

    async getArticleText(articleId: number) {
        const textBlock = await this.articleTextRepository.findAll({ where: { articleId }})
        return textBlock
    }

}

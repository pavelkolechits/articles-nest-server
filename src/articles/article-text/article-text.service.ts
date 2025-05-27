import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleText } from './article-text.model';
import { ArticleTextDto } from '../dto/article-text.dto';

@Injectable()
export class ArticleTextService {
    constructor(@InjectModel(ArticleText) private articleTextRepository: typeof ArticleText){}


    async createText(dto: ArticleTextDto) {
        const text = await this.articleTextRepository.create(dto)
        return text
    }
}

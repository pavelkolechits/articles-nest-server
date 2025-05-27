import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleCode } from './article-code.model';
import { ArticleCodeDto } from '../dto/article-code.dto';

@Injectable()
export class ArticleCodeService {
    constructor(@InjectModel(ArticleCode) private articleCodeRepository: typeof ArticleCode) {}


    async createCode(dto: ArticleCodeDto) {
        const code = await this.articleCodeRepository.create(dto)
        return code
    }
}

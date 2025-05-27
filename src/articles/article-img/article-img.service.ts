import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleImg } from './article-img.model';
import { ArticleImgDto } from '../dto/article-img.dto';

@Injectable()
export class ArticleImgService {
    constructor(@InjectModel(ArticleImg) private articleImgRepository: typeof ArticleImg){}

    async createImg(dto: ArticleImgDto) {

        const img = await this.articleImgRepository.create(dto)

        return img
    }
}

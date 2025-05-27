import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './articles.model';
import { ArticleDto } from './dto/article.dto';
import { ArticleImgDto } from './dto/article-img.dto';
import { ArticleTextDto } from './dto/article-text.dto';
import { ArticleCodeDto } from './dto/article-code.dto';
import { ArticleTextService } from './article-text/article-text.service';
import { ArticleImgService } from './article-img/article-img.service';
import { ArticleCodeService } from './article-code/article-code.service';


@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article) private articleRepository: typeof Article,
        private articleTextService: ArticleTextService,
        private articleImgService: ArticleImgService,
        private articleCodeService: ArticleCodeService

    ) { }


    async createArticle(dto: ArticleDto) {

        try {
            const articleHeader = await this.articleRepository.create({
                title: dto.title,
                image: dto.image,
                userId: dto.userId,
                subtitle: dto.subtitle
            })

            const blocks = dto.blocks

            await this.createArticleBlock(blocks)

            return articleHeader.dataValues.id

        } catch (err: unknown) {
            return err
        }

    }

    async createArticleBlock(blocks: Array<ArticleImgDto | ArticleTextDto | ArticleCodeDto>) {

        for (const block of blocks) {
            if (block.type === 'TEXT') {
                await this.articleTextService.createText(block as ArticleTextDto)
            }
            if (block.type === 'CODE') {
                await this.articleCodeService.createCode(block as ArticleCodeDto)
            }
            if (block.type === 'IMAGE') {
                await this.articleImgService.createImg(block as ArticleImgDto)
            }
        }
    }

    async getArticles() {
        const articles = await this.articleRepository.findAll({
            attributes: {
                exclude: ['blocks']
            }
        })
        return articles
    }

    async getArticle(articleId) {
        const article = await this.articleRepository.findOne({ where: articleId, include: { all: true } })
        return article
    }

}

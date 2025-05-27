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
                subtitle: dto.subtitle,
                views: dto.views,
                type: dto.type,
            })

            const blocks = dto.blocks
            const articleId = articleHeader.dataValues.id

            await this.createArticleBlock(blocks, articleId)

            return articleId

        } catch (err: unknown) {
            return err
        }

    }

    async createArticleBlock(blocks: Array<ArticleImgDto | ArticleTextDto | ArticleCodeDto>, articleId: number) {

        for (const block of blocks) {

            if (block.type === 'TEXT') {
                await this.articleTextService.createText({ ...block as ArticleTextDto, articleId })
            }
            if (block.type === 'CODE') {
                await this.articleCodeService.createCode({ ...block as ArticleCodeDto, articleId })
            }
            if (block.type === 'IMAGE') {
                await this.articleImgService.createImg({ ...block as ArticleImgDto, articleId })
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

    async getArticle(articleId: number) {

        const article = await this.articleRepository.findOne({ where: { id: articleId }, include: { all: true } })

        if (!article) {
            throw new Error('Article not found')
        }
        await this.articleRepository.update({ views: article.dataValues.views + 1 }, { where: { id: articleId } })

        const articleTextBlocks = await this.articleTextService.getText(articleId) || []
        const articleImgBlocks = await this.articleImgService.getImg(articleId) || []
        const articleCodeBlocks = await this.articleCodeService.getCode(articleId) || []
        const blocks = [...articleTextBlocks, ...articleCodeBlocks, ...articleImgBlocks].sort((a, b) => Number(a.id) - Number(b.id))

        const payload = {
            id: article?.dataValues.id,
            title: article?.dataValues.title,
            subtitle: article?.dataValues.subtitle,
            image: article?.dataValues.image,
            createdAt: article?.dataValues.createdAt,
            views: article?.dataValues.views + 1,
            type: article.dataValues.type,
            blocks
        }

        return payload
    }

}

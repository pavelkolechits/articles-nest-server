import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArticleDraftHeader } from './article-draft-header.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateArticleHeaderDto } from './dto/create-article-header.dto';
import { ArticleDraftTextService } from '../article-draft-text/article-draft-text.service';
import { ArticleDraftImgService } from '../article-draft-img/article-draft-img.service';
import { ArticleDraftCodeService } from '../article-draft-code/article-draft-code.service';


@Injectable()
export class ArticleDraftHeaderService {
    constructor(
        @InjectModel(ArticleDraftHeader)
        private articleDraftHeaderRepository: typeof ArticleDraftHeader,
        private articleTextService: ArticleDraftTextService,
        private articleImgService: ArticleDraftImgService,
        private articleCodeService: ArticleDraftCodeService,
        private fileService: FilesService) { }

    async createArticleHeader(dto: CreateArticleHeaderDto, image: any) {

        const article = await this.articleDraftHeaderRepository.findOne({ where: { userId: dto.userId } })

        if (article) {
            throw new HttpException('draft has been created, use update', HttpStatus.BAD_REQUEST)
        }

        const fileName = await this.fileService.createFile(image);

        const articleHeader = await this.articleDraftHeaderRepository.create(
            { ...dto, image: fileName }
        )
        return articleHeader;
    }
    async updateArticleHeader(dto: CreateArticleHeaderDto, image: any) {

        if (!image) {
            const articleHeader = await this.articleDraftHeaderRepository.update(
                { ...dto },
                {
                    where: { id: dto.id },
                    returning: true
                })

            return articleHeader[1][0];
        } else {
            const fileName = await this.fileService.createFile(image);
            const articleHeader = await this.articleDraftHeaderRepository.update(
                { ...dto, image: fileName },
                {
                    where: { id: dto.id },
                    returning: true
                })

            return articleHeader[1][0];
        }
    }

    async getArticleDraft(userId: number) {
        const header = await this.articleDraftHeaderRepository.findOne({ where: { userId }, include: { all: true }})


        if (!header?.dataValues.id) {
            throw new Error('Article not found')
        }
        const articleTextBlocks = await this.articleTextService.getArticleText(header?.dataValues.id) || []
        const articleImgBlocks = await this.articleImgService.getArticleImg(header?.dataValues.id) || []
        const articleCodeBlocks = await this.articleCodeService.getArticleCode(header?.dataValues.id) || []
        const blocks = [...articleCodeBlocks, ...articleImgBlocks, ...articleTextBlocks].sort((a, b) => Number(a.id) - Number(b.id))


        const articleData = {
            image: process.env.URL + header.dataValues.image,
            id: header.dataValues.id,
            title: header.dataValues.title,
            subtitle: header.dataValues.subtitle
        }

        return {
            ...articleData,
            blocks
        }
    }

}

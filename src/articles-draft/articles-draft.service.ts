import { Injectable } from '@nestjs/common';
import { ArticleDraft } from './articles-draft.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateArticleHeaderDto } from './dto/create-article-header.dto';

@Injectable()
export class ArticleDraftService {
    constructor(@InjectModel(ArticleDraft) private articleDraftRepository: typeof ArticleDraft,
        private fileService: FilesService) { }

    async createArticleHeader(dto: CreateArticleHeaderDto, image: any) {

        const fileName = await this.fileService.createFile(image);

        const articleHeader = await this.articleDraftRepository.create(
            { ...dto, image: fileName }
        )
        return articleHeader;
    }
    async updateArticleHeader(dto: CreateArticleHeaderDto, image: any) {

        if (!image) {
            const articleHeader = await this.articleDraftRepository.update(
                { ...dto },
                {
                    where: { id: dto.id },
                    returning: true
                })

            return articleHeader[1][0];
        } else {
            const fileName = await this.fileService.createFile(image);
            const articleHeader = await this.articleDraftRepository.update(
                { ...dto, image: fileName },
                {
                    where: {  id: dto.id },
                    returning: true
                })

            return articleHeader[1][0];
        }

    }
}

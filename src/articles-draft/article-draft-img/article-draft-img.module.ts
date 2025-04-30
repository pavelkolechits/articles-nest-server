import { Module } from '@nestjs/common';
import { ArticleImgController } from './article-blocks-draft.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleDraftImg } from './article-draft-img-block.model';
import { ArticleImgService } from './article-draft-img.service';
import { FilesModule } from 'src/files/files.module';


@Module({
  providers: [ArticleImgService],
  controllers: [ArticleImgController],
   imports: [
      SequelizeModule.forFeature([ ArticleDraftImg]),
      FilesModule,
    ],
    exports:[ArticleImgService]
})
export class ArticleDraftImgModule {}

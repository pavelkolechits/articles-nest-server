import { Module } from '@nestjs/common';
import { ArticleDraftImgController } from './article-draft-img.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleDraftImg } from './article-draft-img-block.model';
import { ArticleDraftImgService } from './article-draft-img.service';
import { FilesModule } from 'src/files/files.module';


@Module({
  providers: [ArticleDraftImgService],
  controllers: [ArticleDraftImgController],
   imports: [
      SequelizeModule.forFeature([ ArticleDraftImg]),
      FilesModule,
    ],
    exports:[ArticleDraftImgService]
})
export class ArticleDraftImgModule {}

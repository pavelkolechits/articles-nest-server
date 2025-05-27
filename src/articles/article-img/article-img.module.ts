import { Module } from '@nestjs/common';
import { ArticleImgService } from './article-img.service';
import { ArticleImgController } from './article-img.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleImg } from './article-img.model';

@Module({
  providers: [ArticleImgService],
  controllers: [ArticleImgController],
  imports: [
    SequelizeModule.forFeature([ArticleImg])
  ],
  exports: [ArticleImgService]
})
export class ArticleImgModule {}

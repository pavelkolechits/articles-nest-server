import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleDraftText } from './article-draft-text.model';
import { ArticleTextService } from './article-draft-text.service';
import { ArticleTextController } from './article-draft-text.controller';



@Module({
  providers: [ArticleTextService],
  controllers: [ArticleTextController],
  imports: [
    SequelizeModule.forFeature([ArticleDraftText]),
  ],
  exports: [ArticleTextService]
})
export class ArticleDraftTextModule { }

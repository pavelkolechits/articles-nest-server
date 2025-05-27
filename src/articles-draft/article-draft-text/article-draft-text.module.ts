import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleDraftText } from './article-draft-text.model';
import { ArticleDraftTextService } from './article-draft-text.service';
import { ArticleDraftTextController } from './article-draft-text.controller';



@Module({
  providers: [ArticleDraftTextService],
  controllers: [ArticleDraftTextController],
  imports: [
    SequelizeModule.forFeature([ArticleDraftText]),
  ],
  exports: [ArticleDraftTextService]
})
export class ArticleDraftTextModule { }

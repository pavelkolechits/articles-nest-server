import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleDraftCode } from './article-draft-code.model';
import { ArticleCodeService } from './article-draft-code.service';
import {  ArticleCodeController } from './article-draft-code.controller';



@Module({
  providers: [ArticleCodeService],
  controllers: [ArticleCodeController],
  imports: [
    SequelizeModule.forFeature([ArticleDraftCode]),
  ],
  exports: [ArticleCodeService]
})
export class ArticleDraftCodeModule { }

import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleDraftCode } from './article-draft-code.model';
import { ArticleDraftCodeService } from './article-draft-code.service';
import {  ArticleDraftCodeController } from './article-draft-code.controller';



@Module({
  providers: [ArticleDraftCodeService],
  controllers: [ArticleDraftCodeController],
  imports: [
    SequelizeModule.forFeature([ArticleDraftCode]),
  ],
  exports: [ArticleDraftCodeService]
})
export class ArticleDraftCodeModule { }

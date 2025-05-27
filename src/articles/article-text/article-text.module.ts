import { Module } from '@nestjs/common';
import { ArticleTextController } from './article-text.controller';
import { ArticleTextService } from './article-text.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleText } from './article-text.model';

@Module({
  controllers: [ArticleTextController],
  providers: [ArticleTextService],
  imports: [
    SequelizeModule.forFeature([ArticleText])
  ],
  exports: [ArticleTextService]
})
export class ArticleTextModule {}

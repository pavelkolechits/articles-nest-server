import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Article } from './articles.model';
import { ArticlesService } from './articles.service';
import { ArticleCodeModule } from './article-code/article-code.module';
import { ArticleTextModule } from './article-text/article-text.module';
import { ArticleImgModule } from './article-img/article-img.module';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article,]),
    ArticleCodeModule, ArticleTextModule, ArticleImgModule
  ],
  exports: [ArticlesService]
})
export class ArticlesModule {}

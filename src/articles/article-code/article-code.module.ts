import { Module } from '@nestjs/common';
import { ArticleCodeService } from './article-code.service';
import { ArticleCodeController } from './article-code.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleCode } from './article-code.model';

@Module({
  providers: [ArticleCodeService],
  controllers: [ArticleCodeController],
  imports: [
    SequelizeModule.forFeature([ArticleCode])
  ],
  exports: [ArticleCodeService]
})
export class ArticleCodeModule {}

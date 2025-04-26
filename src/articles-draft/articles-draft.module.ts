import { Module } from '@nestjs/common';
import { ArticlesDraftController } from './articles-draft.controller';
import { ArticleDraftService } from './articles-draft.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { ArticleDraft } from './articles-draft.model';

@Module({
  controllers: [ArticlesDraftController],
  providers: [ArticleDraftService],
  imports: [
    SequelizeModule.forFeature([User, ArticleDraft]),
    FilesModule,
  ],
  exports:[ArticleDraftService]
})
export class ArticleDraftsModule { }

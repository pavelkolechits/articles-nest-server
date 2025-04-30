import { Module } from '@nestjs/common';
import { ArticleDraftHeaderController } from './article-draft-header.controller';
import { ArticleDraftHeaderService } from './article-draft-header.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { ArticleDraftHeader } from './article-draft-header.model';
import { ArticleDraftTextModule } from '../article-draft-text/article-draft-text.module';
import { ArticleDraftCodeModule } from '../article-draft-code/article-draft-code.module';
import { ArticleDraftImgModule } from '../article-draft-img/article-draft-img.module';


@Module({
  controllers: [ArticleDraftHeaderController],
  providers: [ArticleDraftHeaderService],
  imports: [
    SequelizeModule.forFeature([User, ArticleDraftHeader]),
    FilesModule,
    ArticleDraftTextModule,
    ArticleDraftCodeModule,
    ArticleDraftImgModule,


  ],
  exports: [ArticleDraftHeaderService]
})
export class ArticleDraftHeaderModule { }

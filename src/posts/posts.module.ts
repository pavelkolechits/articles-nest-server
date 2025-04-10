import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule
  ]
})
export class PostsModule { }

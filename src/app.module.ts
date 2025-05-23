import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProfilesModule } from './profiles/profiles.module';
import { ArticleDraftHeaderModule } from './articles-draft/articles-draft-header/article-draft-header.module';
import * as path from 'path';
import { ArticleDraftTextModule } from './articles-draft/article-draft-text/article-draft-text.module';
import { ArticleDraftImgModule } from './articles-draft/article-draft-img/article-draft-img.module';
import { ArticleDraftCodeModule } from './articles-draft/article-draft-code/article-draft-code.module';





@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [User, UserRoles, Role, Post],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        ProfilesModule,
        ArticleDraftHeaderModule,
        ArticleDraftTextModule,
        ArticleDraftImgModule,
        ArticleDraftCodeModule

    ],
})
export class AppModule { }

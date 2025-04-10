import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { ProfilesService } from 'src/profiles/profiles.service'
import { Profile } from './profiles.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [
      SequelizeModule.forFeature([User, Profile]),
      FilesModule
    ],
    exports:[ProfilesService]
})
export class ProfilesModule {}

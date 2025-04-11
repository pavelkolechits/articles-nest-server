import { forwardRef, Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { ProfilesService } from 'src/profiles/profiles.service'
import { Profile } from './profiles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [
      SequelizeModule.forFeature([User, Profile]),
      FilesModule,
      forwardRef(() => AuthModule)
    ],
    exports:[ProfilesService]
})
export class ProfilesModule {}

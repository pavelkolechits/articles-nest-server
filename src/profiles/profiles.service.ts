import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { FilesService } from 'src/files/files.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private pofileRepository: typeof Profile,
        private fileService: FilesService) { }

    async createProfile({ email, userId }: CreateProfileDto) {
        const profile = await this.pofileRepository.create({ email, userId })
        return profile;
    }

    async getProfile(userId: number) {
        const profile = await this.pofileRepository.findOne({ where: { userId } })
        return profile
    }

    async updateProfile(profileDto: CreateProfileDto, id: number) {
        const profile = await this.pofileRepository.update({...profileDto}, { where: { userId: id }, returning: true })
        return profile[1][0]
    }

    async updateAvatar(id: number, image: any) {
        const fileName = await this.fileService.createFile(image);
       const avatar = await this.pofileRepository.update({avatar: fileName}, { where: { userId: id },  returning: true })
       return avatar[1][0].dataValues.avatar
   }
}
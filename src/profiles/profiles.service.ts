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
    async getProfile() {

    }
    async updateProfile() {

    }
}
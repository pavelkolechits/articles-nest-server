import { Body, Controller, Get, Param, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) { }


    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getProfile(@Param('id') id: number) {
        return this.profilesService.getProfile(id)
    }
    
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    updateProfile(
        @Body() profileDto: CreateProfileDto,
        @Param('id') id: number,
    ) {
        return this.profilesService.updateProfile(profileDto, id)
    }

    // @UseGuards(JwtAuthGuard)
    @Put('/:id/image')
    @UseInterceptors(FileInterceptor('image'))
    updateAvatar(
        @Param('id') id: number,
        @UploadedFile() image
    ) {
        return this.profilesService.updateAvatar( id, image)
    }
}

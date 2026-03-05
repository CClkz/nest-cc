import { Controller, Get, Query } from '@nestjs/common';
import { AnimationService } from './animation.service';
import { GetKidAnimationsDto } from './dto/get-kid-animations.dto';

@Controller('animation')
export class AnimationController {
  constructor(private readonly animationService: AnimationService) {}

  @Get()
  getAnimations() {
    return this.animationService.getAnimations();
  }

  @Get('kid')
  getKidAnimations(
    @Query('ageGroup') ageGroup?: string,
    @Query('genre') genre?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    // 将字符串参数转换为适当的类型，并构建 DTO 对象
    const options: GetKidAnimationsDto = {};
    if (ageGroup) options.ageGroup = ageGroup;
    if (genre) options.genre = genre;
    if (limit) options.limit = parseInt(limit, 10);
    if (page) options.page = parseInt(page, 10);

    return this.animationService.getKidAnimations(options);
  }

  @Get('async')
  getAsync() {
    return this.animationService.getAsync();
  }
}

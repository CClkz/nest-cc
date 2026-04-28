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
  getKidAnimations(@Query() options: GetKidAnimationsDto) {
    return this.animationService.getKidAnimations(options);
  }

  @Get('async')
  getAsync() {
    return this.animationService.getAsync();
  }
}

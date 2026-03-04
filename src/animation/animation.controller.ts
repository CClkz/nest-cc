import { Controller, Get } from '@nestjs/common';
import { AnimationService } from './animation.service';

@Controller('animation')
export class AnimationController {
  constructor(private readonly animationService: AnimationService) {}

  @Get()
  getAnimations() {
    return this.animationService.getAnimations();
  }

  @Get('kid')
  getKidAnimations() {
    return this.animationService.getKidAnimations();
  }
}

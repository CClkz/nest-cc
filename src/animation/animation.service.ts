import { Injectable } from '@nestjs/common';
import { GetKidAnimationsDto } from './dto/get-kid-animations.dto';

@Injectable()
export class AnimationService {
  getAnimations(): object {
    // 基础数据
    return [
      {
        id: 1,
        title: 'Dragon Ball',
        genre: 'Action',
        year: 1986,
        rating: 9.2,
      },
      {
        id: 2,
        title: 'Pokemon',
        genre: 'Adventure',
        year: 1997,
        rating: 8.9,
      },
      {
        id: 3,
        title: 'Sailor Moon',
        genre: 'Magical Girl',
        year: 1992,
        rating: 8.5,
      },
      {
        id: 4,
        title: 'Naruto',
        genre: 'Shounen',
        year: 2002,
        rating: 9.0,
      },
      {
        id: 5,
        title: 'One Piece',
        genre: 'Adventure',
        year: 1999,
        rating: 9.8,
      },
    ];
  }

  getKidAnimations(options?: GetKidAnimationsDto): object {
    console.log('getKidAnimations options:', options);
    return {
      code: 0,
      message: 'Kid-Friendly Animation API',
      total: 5,
      data: [
        {
          id: 1,
          title: 'Peppa Pig',
          ageGroup: '2-6 years',
          genre: 'Comedy',
          year: 2004,
        },
        {
          id: 2,
          title: 'Paw Patrol',
          ageGroup: '3-7 years',
          genre: 'Adventure',
          year: 2013,
        },
        {
          id: 3,
          title: 'Bluey',
          ageGroup: '3-8 years',
          genre: 'Family',
          year: 2018,
        },
        {
          id: 4,
          title: 'Doraemon',
          ageGroup: '4-10 years',
          genre: 'Sci-Fi',
          year: 1979,
        },
        {
          id: 5,
          title: 'Crayon Shin-chan',
          ageGroup: '6-12 years',
          genre: 'Comedy',
          year: 1990,
        },
      ],
    };
  }

  getAsync(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('3 seconds have passed');
      }, 3000);
    }).then(() => {
      return 'hello world';
    });
  }
}

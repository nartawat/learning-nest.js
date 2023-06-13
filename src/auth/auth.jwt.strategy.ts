import { UserEntity } from './auth.entity';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private authRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ควรเก็บเป็นไฟล์ และเข้าถึงยาก
      secretOrKey: 'boom',
    });
  }

  // เป็น callback เมื่อใช้ @UseGuards(AuthGuard()) เพื่อ validate token
  async validate(payload) {
    const { username } = payload;
    const user = await this.authRepo.findOneBy({ username: username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

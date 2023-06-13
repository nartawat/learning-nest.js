import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(body: AuthDto) {
    const { username, password } = body;
    const salt = bcrypt.genSaltSync();
    const user = new UserEntity();
    user.username = username;
    user.salt = salt;
    user.password = await bcrypt.hash(password, salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Error, this username already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async signIn(body: AuthDto) {
    const { username, password } = body;
    const user = await this.authRepo.findOneBy({ username: username });
    if (user && (await user.verifyPassword(password))) {
      const payload = { username };
      console.log(payload);

      const token = await this.jwtService.sign(payload);
      return token;
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}

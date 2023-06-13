import { UserEntity } from './auth.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // ใส่เพื่อ validate dto ก่อน post
  signUp(@Body() body: AuthDto) {
    return this.authenService.signUp(body);
  }

  @Post('/signin')
  signIn(@Body() body: AuthDto) {
    return this.authenService.signIn(body);
  }

  @Get('/test')
  // decorator ตัวช่วยให้ อ่าน req ได้ง่ายขึ้น
  @UseGuards(AuthGuard())
  test(@GetUsername() username) {
    return username;
  }
}

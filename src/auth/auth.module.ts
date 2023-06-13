import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtStrategy } from './auth.jwt.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // ควรเก็บเป็นไฟล์ และเข้าถึงยาก
      secret: 'boom',
      signOptions: {
        expiresIn: 5000,
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtStrategy],
  exports: [AuthJwtStrategy, PassportModule],
})
export class AuthModule {}

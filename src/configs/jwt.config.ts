import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET') || '2a503824cd7c6bdd36efa37b020f1599294934a1884bce2df16822a2ad79e4502312590854d1c0590a00a6db6e959a49f557879c2d50f0e14129a99490032a3e27c1ef0e5fcd20eb6b01db562141890055cc1a60d817cf8c63ec095d06b77e7e22b316d6db58afb77e6c3e5f687e1718e11c99615d0825220aeeea703974365a763cde52037e28fc0ceb5e235a3dbcd997a05106234b1470d27f3c769caa287326c620ba5825430a02cbbf49e5db2c1d0cd19b89d0f2c140345d9d411a90da882ffeb7437511fa6801459c800f86f1ce3a24185b287d000cf65857d164725040a2dfb075a8d5706c0496ef70344b4baaf64b2211d37da13b623c4094dc5c9b75',
  verifyOptions: {
    ignoreExpiration: false,
  },
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRES') || "12h",
  }
});

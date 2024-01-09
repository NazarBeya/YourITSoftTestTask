import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY as string,
    });
  }

  async validate(payload: JwtPayload) {
    const user = {
      ID: payload.ID,
      name: payload.name,
      lastName: payload.lastName,
      role: payload.role,
    };
    return user;
  }
}
